// netlify/functions/enquiry.js
// Server-side validation + normalized customer_key + atomic rate-limit via RPC allow_request
// ✅ IMPORTANT: bookings rows now store customer_key so enquiries merge in admin history.

function json(statusCode, bodyObj) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
    },
    body: JSON.stringify(bodyObj, null, 2),
  };
}

async function supabaseInsert({ url, serviceKey, table, row }) {
  const res = await fetch(`${url}/rest/v1/${table}`, {
    method: "POST",
    headers: {
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
    body: JSON.stringify(row),
  });

  const text = await res.text();
  if (!res.ok) throw new Error(`Supabase INSERT failed: ${res.status} ${text}`);
  return text ? JSON.parse(text) : [];
}

async function supabaseUpsert({ url, serviceKey, table, row, onConflict }) {
  const res = await fetch(
    `${url}/rest/v1/${table}?on_conflict=${encodeURIComponent(onConflict)}`,
    {
      method: "POST",
      headers: {
        apikey: serviceKey,
        Authorization: `Bearer ${serviceKey}`,
        "Content-Type": "application/json",
        Prefer: "resolution=merge-duplicates,return=representation",
      },
      body: JSON.stringify(row),
    }
  );

  const text = await res.text();
  if (!res.ok) throw new Error(`Supabase UPSERT failed: ${res.status} ${text}`);
  return text ? JSON.parse(text) : [];
}

// Netlify Forms submit (emails)
async function submitToNetlifyForms(formName, fields) {
  const siteUrl = process.env.URL || process.env.DEPLOY_PRIME_URL;
  if (!siteUrl) throw new Error("Missing site URL env");

  const body = new URLSearchParams({
    "form-name": formName,
    ...fields,
  }).toString();

  const res = await fetch(siteUrl + "/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });

  // Netlify often returns 200/302
  if (!(res.status >= 200 && res.status < 400)) {
    const t = await res.text().catch(() => "");
    throw new Error(`Netlify Forms submit failed: ${res.status} ${t}`);
  }
}

function normalizeSpanishPhone(input) {
  const digits = String(input || "").replace(/\D/g, "");
  // Spain numbers: 9 digits, start 6/7/8/9 (mobile/landline)
  if (!/^[6789]\d{8}$/.test(digits)) return null;
  return digits;
}

function parseRpcBoolean(rpcJson) {
  // can be: true | false | [{ allow_request: true }] | { allow_request: true }
  if (rpcJson === true || rpcJson === false) return rpcJson;
  if (Array.isArray(rpcJson)) return rpcJson[0]?.allow_request;
  return rpcJson?.allow_request;
}

async function rateLimitHourly({
  supabaseUrl,
  serviceKey,
  customer_key,
  maxPerHour = 2,
}) {
  const rpcRes = await fetch(`${supabaseUrl}/rest/v1/rpc/allow_request`, {
    method: "POST",
    headers: {
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      p_customer_key: customer_key,
      p_max: maxPerHour,
      p_window_minutes: 60,
    }),
  });

  const rpcJson = await rpcRes.json().catch(() => null);
  const allowed = parseRpcBoolean(rpcJson);

  if (!rpcRes.ok || allowed !== true) {
    return {
      ok: false,
      statusCode: 429,
      body: {
        error: "Has alcanzado el límite: máximo 2 solicitudes por hora.",
        code: "RATE_LIMIT_HOURLY",
      },
    };
  }

  return { ok: true };
}

export async function handler(event) {
  try {
    if (event.httpMethod !== "POST") return json(405, { error: "Use POST" });

    const SUPABASE_URL = process.env.SUPABASE_URL;
    const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!SUPABASE_URL || !SERVICE_KEY) {
      return json(500, { error: "Missing Supabase env vars" });
    }

    let payload;
    try {
      payload = JSON.parse(event.body || "{}");
    } catch {
      return json(400, { error: "Invalid JSON body" });
    }

    const {
      pack = "Sin especificar",
      customer_name,
      phone,
      email = null,
      contact_preference = "WhatsApp",
      message = "",
      meeting_mode,
    } = payload;

    // ---- Validate + normalize ----
    const name = String(customer_name || "").trim();
    const emailLower = email ? String(email).trim().toLowerCase() : null;
    const phoneNorm = phone ? normalizeSpanishPhone(phone) : null;

    // ✅ Canonical key: email first, else phone (digits)
    const customer_key = emailLower || phoneNorm;

    if (!name) return json(400, { error: "Missing customer_name" });
    if (!customer_key) {
      return json(400, {
        error: "Provide a valid Spanish phone or a valid email",
      });
    }

    const cleanMeetingMode = String(meeting_mode || "")
      .trim()
      .toLowerCase();
    const allowedModes = ["remoto", "tienda", "domicilio", "otro"];
    if (!allowedModes.includes(cleanMeetingMode)) {
      return json(400, { error: "Invalid meeting_mode" });
    }

    const pref = String(contact_preference || "WhatsApp").trim();

    // ---- Rate limit (atomic, hourly) ----
    const rl = await rateLimitHourly({
      supabaseUrl: SUPABASE_URL,
      serviceKey: SERVICE_KEY,
      customer_key,
      maxPerHour: 2,
    });
    if (!rl.ok) return json(rl.statusCode, rl.body);

    // ---- 1) Insert enquiry row in bookings ----
    // ✅ IMPORTANT: write customer_key to bookings (so admin can merge history reliably)
    const inserted = await supabaseInsert({
      url: SUPABASE_URL,
      serviceKey: SERVICE_KEY,
      table: "bookings",
      row: {
        customer_key,
        status: "enquiry",
        meeting_mode: cleanMeetingMode,
        pack,
        customer_name: name,
        phone: phoneNorm, // store normalized digits or null
        email: emailLower, // store lowercase or null
        contact_preference: pref,
        home_visit: cleanMeetingMode === "domicilio",
        address_line1: null,
        postal_code: null,
        city: null,
        address_notes: null,
        start_time: null,
        end_time: null,
        message,
      },
    });

    // ---- 1b) Insert contact history row (for timeline / names / messages) ----
    await supabaseInsert({
      url: SUPABASE_URL,
      serviceKey: SERVICE_KEY,
      table: "customer_contacts",
      row: {
        customer_key,
        customer_name: name,
        phone: phoneNorm,
        email: emailLower,
        message,
        source: "enquiry",
      },
    });

    // ---- 2) Upsert customer row ----
    await supabaseUpsert({
      url: SUPABASE_URL,
      serviceKey: SERVICE_KEY,
      table: "customers",
      onConflict: "customer_key",
      row: {
        customer_key,
        name,
        phone: phoneNorm,
        email: emailLower,
        updated_at: new Date().toISOString(),
      },
    });

    // ---- 3) Netlify email (non-blocking) ----
    try {
      await submitToNetlifyForms("asesoramiento", {
        meeting_mode: cleanMeetingMode,
        pack,
        nombre: name,
        telefono: phoneNorm || "",
        email: emailLower || "",
        preferencia: pref,
        mensaje: message || "",
        kind: "enquiry",
      });
    } catch (e) {
      console.warn("[enquiry] netlify email failed:", e?.message || String(e));
    }

    return json(200, {
      ok: true,
      enquiry: inserted?.[0] || null,
      customer_key,
    });
  } catch (err) {
    console.error("[enquiry] error:", err);
    return json(500, { error: err?.message || "Unknown error" });
  }
}
