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

    const payload = JSON.parse(event.body || "{}");
    console.log("[enquiry] payload:", payload);

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

    // Insert into Supabase
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
        start_time: null,
        end_time: null,
        message,
      },
    });

    console.log("[enquiry] inserted:", inserted[0]);

    // Send Netlify email (non-blocking)
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
      console.warn("[enquiry] netlify email failed:", e.message);
    }

    return json(200, {
      ok: true,
      enquiry: inserted[0],
    });
  } catch (err) {
    console.error("[enquiry] error:", err);
    return json(500, { error: err.message || "Unknown error" });
  }
}
