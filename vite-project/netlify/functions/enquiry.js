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
  if (!res.ok) throw new Error(`Supabase INSERT failed: ${res.status} ${text}`);
  return text ? JSON.parse(text) : [];
}

// ✅ Netlify Forms submission (triggers Netlify email notifications)
async function submitToNetlifyForms(formName, fields) {
  const siteUrl = process.env.URL || process.env.DEPLOY_PRIME_URL;
  if (!siteUrl) throw new Error("Missing site URL env (URL/DEPLOY_PRIME_URL)");

  const body = new URLSearchParams({
    "form-name": formName,
    ...fields,
  }).toString();

  const res = await fetch(siteUrl + "/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });

  // Netlify often responds 200/302. Treat non-2xx/3xx as failure.
  if (!(res.status >= 200 && res.status < 400)) {
    const t = await res.text().catch(() => "");
    throw new Error(`Netlify Forms submit failed: ${res.status} ${t}`);
  }

  return true;
}

export async function handler(event) {
  try {
    if (event.httpMethod !== "POST") return json(405, { error: "Use POST" });

    const SUPABASE_URL = process.env.SUPABASE_URL;
    const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!SUPABASE_URL || !SERVICE_KEY) {
      return json(500, {
        error: "Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY",
      });
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
      meeting_mode, // "remoto" | "otro"
    } = payload;

    if (!customer_name || !phone || !meeting_mode) {
      return json(400, {
        error: "Missing customer_name, phone, or meeting_mode",
      });
    }

    if (!["remoto", "otro"].includes(meeting_mode)) {
      return json(400, { error: "meeting_mode must be 'remoto' or 'otro'" });
    }

    // 1) Insert into Supabase so Admin sees it
    const inserted = await supabaseInsert({
      url: SUPABASE_URL,
      serviceKey: SERVICE_KEY,
      table: "bookings",
      row: {
        status: "enquiry",
        pack,
        customer_name,
        phone,
        email,
        contact_preference,
        home_visit: false,
        address_line1: null,
        postal_code: null,
        city: null,
        address_notes: null,
        start_time: null,
        end_time: null,
        message,
      },
    });

    // 2) Submit to Netlify Forms so Netlify sends emails
    // (Don't fail the whole request if Netlify email fails)
    let netlifyWarning = null;
    try {
      await submitToNetlifyForms("asesoramiento", {
        meeting_mode,
        pack,
        nombre: customer_name,
        telefono: phone,
        email: email || "",
        preferencia: contact_preference,
        mensaje: message || "",
        // helpful for Admin/Email filtering:
        kind: "enquiry",
      });
    } catch (e) {
      netlifyWarning = e?.message || String(e);
    }

    return json(200, {
      ok: true,
      enquiry: inserted?.[0] || null,
      netlifyWarning,
    });
  } catch (err) {
    return json(500, { error: err?.message || "Unknown error" });
  }
}
