// netlify/functions/enquiry.js

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
  if (!res.ok) {
    throw new Error(`Supabase INSERT failed: ${res.status} ${text}`);
  }

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

// ✅ NEW: Supabase GET helper (for rate-limit checks)
async function supabaseGet({ url, serviceKey, path }) {
  const res = await fetch(`${url}/rest/v1/${path}`, {
    headers: {
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
      "Content-Type": "application/json",
    },
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`Supabase GET failed: ${res.status} ${text}`);
  return text ? JSON.parse(text) : [];
}

// ✅ Netlify Forms submit (emails)
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

  if (!(res.status >= 200 && res.status < 400)) {
    const t = await res.text().catch(() => "");
    throw new Error(`Netlify Forms submit failed: ${res.status} ${t}`);
  }
}

export async function handler(event) {
  try {
    if (event.httpMethod !== "POST") {
      return json(405, { error: "Use POST" });
    }

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

    // ✅ REPLACED validation block (server-side)
    const name = String(customer_name || "").trim();
    const emailLower = email ? String(email).trim().toLowerCase() : null;

    function normalizeSpanishPhone(input) {
      const digits = String(input || "").replace(/\D/g, "");
      if (!/^[6789]\d{8}$/.test(digits)) return null;
      return digits;
    }

    const phoneNorm = phone ? normalizeSpanishPhone(phone) : null;
    const customer_key = phoneNorm || emailLower;

    if (!name) {
      return json(400, { error: "Missing customer_name" });
    }
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

    // ✅ Rate limit: max 2 enquiries/reserved per day for same phone/email
    const startOfTodayUtc = new Date();
    startOfTodayUtc.setUTCHours(0, 0, 0, 0);
    const todayIso = startOfTodayUtc.toISOString();

    const filterKey = phoneNorm
      ? `phone=eq.${encodeURIComponent(phoneNorm)}`
      : `email=eq.${encodeURIComponent(emailLower)}`;

    const recent = await supabaseGet({
      url: SUPABASE_URL,
      serviceKey: SERVICE_KEY,
      path:
        `bookings?select=id,status,created_at&` +
        `${filterKey}` +
        `&created_at=gte.${encodeURIComponent(todayIso)}` +
        `&status=in.(enquiry,reserved)` +
        `&limit=3`,
    });

    if ((recent || []).length >= 2) {
      return json(429, {
        error:
          "Has alcanzado el límite de solicitudes de hoy. Por favor, inténtalo mañana o contáctanos por WhatsApp.",
        code: "RATE_LIMIT_DAILY",
      });
    }

    // 1) Insert enquiry booking (✅ normalized phone/email)
    const inserted = await supabaseInsert({
      url: SUPABASE_URL,
      serviceKey: SERVICE_KEY,
      table: "bookings",
      row: {
        status: "enquiry",
        meeting_mode: cleanMeetingMode,
        pack,
        customer_name: name,
        phone: phoneNorm,
        email: emailLower,
        contact_preference,
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

    // 2) Upsert customer row (✅ normalized + consistent customer_key)
    //    IMPORTANT: don't overwrite pipeline status if admin already set it.
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
        city: null,
        updated_at: new Date().toISOString(),
      },
    });

    // 3) Netlify email (non-blocking)
    try {
      await submitToNetlifyForms("asesoramiento", {
        meeting_mode: cleanMeetingMode,
        pack,
        nombre: name,
        telefono: phoneNorm || "",
        email: emailLower || "",
        mensaje: message || "",
        kind: "enquiry",
      });
    } catch (e) {
      console.warn("[enquiry] netlify email failed:", e?.message || String(e));
    }

    return json(200, {
      ok: true,
      enquiry: inserted?.[0] || null,
      customer_key, // ✅ useful for debugging in the response
    });
  } catch (err) {
    console.error("[enquiry] error:", err);
    return json(500, { error: err?.message || "Unknown error" });
  }
}
