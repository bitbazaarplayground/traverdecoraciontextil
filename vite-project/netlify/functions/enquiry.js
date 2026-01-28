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

// ✅ ONE SOURCE OF TRUTH for customer_key (used for lookup everywhere)
// Prefer email (stable). Otherwise digits-only phone (stable even with +34/spaces).
function makeCustomerKey({ phone, email }) {
  const e = String(email || "")
    .trim()
    .toLowerCase();
  if (e) return e;

  const p = String(phone || "").trim();
  const digits = p.replace(/\D/g, ""); // keep digits only
  return digits;
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

    const cleanMeetingMode = String(meeting_mode || "")
      .trim()
      .toLowerCase();
    const allowedModes = ["remoto", "tienda", "domicilio", "otro"];

    if (!customer_name || !phone || !allowedModes.includes(cleanMeetingMode)) {
      return json(400, {
        error: "Invalid customer_name, phone or meeting_mode",
      });
    }

    // ✅ Compute customer_key deterministically
    const customer_key = makeCustomerKey({ phone, email });

    if (!customer_key) {
      return json(400, { error: "Could not compute customer_key" });
    }

    // 1) Insert enquiry booking
    const inserted = await supabaseInsert({
      url: SUPABASE_URL,
      serviceKey: SERVICE_KEY,
      table: "bookings",
      row: {
        status: "enquiry",
        meeting_mode: cleanMeetingMode,
        pack,
        customer_name,
        phone,
        email,
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

    // 2) Upsert customer row (schema: customers.name, NOT customer_name)
    //    IMPORTANT: don't overwrite pipeline status if admin already set it.
    await supabaseUpsert({
      url: SUPABASE_URL,
      serviceKey: SERVICE_KEY,
      table: "customers",
      onConflict: "customer_key",
      row: {
        customer_key,
        name: customer_name,
        phone,
        email,
        city: null,
        updated_at: new Date().toISOString(),
      },
    });

    // 3) Netlify email (non-blocking)
    try {
      await submitToNetlifyForms("asesoramiento", {
        meeting_mode: cleanMeetingMode,
        pack,
        nombre: customer_name,
        telefono: phone,
        email: email || "",
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
