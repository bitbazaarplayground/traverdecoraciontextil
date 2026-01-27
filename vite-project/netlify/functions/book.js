// netlify/functions/book.js

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

function overlaps(aStartMs, aEndMs, bStartMs, bEndMs) {
  return aStartMs < bEndMs && aEndMs > bStartMs;
}

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

// ✅ Submit to Netlify Forms so Netlify triggers email notifications
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
    if (event.httpMethod !== "POST") {
      return json(405, { error: "Use POST" });
    }

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

    // Required fields
    const {
      pack = "Sin especificar",
      customer_name,
      phone,
      email = null,
      contact_preference = "WhatsApp",
      message = "",
      home_visit = false,
      address_line1 = null,
      postal_code = null,
      city = null,
      address_notes = null,

      // IMPORTANT: client should send start as UTC ISO from availability endpoint
      start, // e.g. "2026-01-21T08:00:00.000Z"
    } = payload;

    if (!customer_name || !phone || !start) {
      return json(400, { error: "Missing customer_name, phone, or start" });
    }

    if (home_visit) {
      if (!address_line1 || !postal_code || !city) {
        return json(400, {
          error:
            "Missing address fields for home_visit (address_line1, postal_code, city)",
        });
      }
    }

    const startDate = new Date(start);
    if (Number.isNaN(startDate.getTime())) {
      return json(400, { error: "Invalid start datetime" });
    }

    // Enforce lead time (2 days) - server-side re-check
    const leadTimeDays = 2;
    const minStart = Date.now() + leadTimeDays * 24 * 60 * 60_000;
    if (startDate.getTime() < minStart) {
      return json(400, {
        error: "Selected slot is too soon (lead time enforced).",
      });
    }

    // Booking blocks 2 hours
    const blockMinutes = 120;
    const endDate = new Date(startDate.getTime() + blockMinutes * 60_000);

    const startIso = startDate.toISOString();
    const endIso = endDate.toISOString();

    // Pull any overlapping bookings & blackouts in the slot window
    // Query: start_time < end AND end_time > start
    const bookings = await supabaseGet({
      url: SUPABASE_URL,
      serviceKey: SERVICE_KEY,
      path:
        `bookings?select=id,start_time,end_time,status` +
        `&status=eq.reserved` +
        `&start_time=lt.${encodeURIComponent(endIso)}` +
        `&end_time=gt.${encodeURIComponent(startIso)}`,
    });

    const blackouts = await supabaseGet({
      url: SUPABASE_URL,
      serviceKey: SERVICE_KEY,
      path:
        `blackouts?select=id,start_time,end_time,reason` +
        `&start_time=lt.${encodeURIComponent(endIso)}` +
        `&end_time=gt.${encodeURIComponent(startIso)}`,
    });

    // Double-check overlaps (defensive)
    const startMs = startDate.getTime();
    const endMs = endDate.getTime();

    const busy = []
      .concat(
        bookings.map((b) => ({
          kind: "booking",
          startMs: new Date(b.start_time).getTime(),
          endMs: new Date(b.end_time).getTime(),
        }))
      )
      .concat(
        blackouts.map((b) => ({
          kind: "blackout",
          startMs: new Date(b.start_time).getTime(),
          endMs: new Date(b.end_time).getTime(),
        }))
      );

    const blocked = busy.some((r) =>
      overlaps(startMs, endMs, r.startMs, r.endMs)
    );
    if (blocked) {
      return json(409, {
        error: "Slot unavailable",
        code: "SLOT_TAKEN",
      });
    }

    // 1) Insert booking into Supabase (Admin)
    const inserted = await supabaseInsert({
      url: SUPABASE_URL,
      serviceKey: SERVICE_KEY,
      table: "bookings",
      row: {
        status: "reserved",
        pack,
        customer_name,
        phone,
        email,
        contact_preference,
        home_visit: !!home_visit,
        address_line1,
        postal_code,
        city,
        address_notes,
        start_time: startIso,
        end_time: endIso,
        message,
      },
    });

    // 2) Also submit to Netlify Forms (Email notifications)
    //    IMPORTANT: don't fail the booking if Netlify Forms fails.
    let netlifyWarning = null;
    try {
      await submitToNetlifyForms("asesoramiento", {
        meeting_mode: home_visit ? "domicilio" : "tienda",
        pack,
        nombre: customer_name,
        telefono: phone,
        email: email || "",
        preferencia: contact_preference,
        mensaje: message || "",
        start_time: startIso,
        end_time: endIso,
        address_line1: address_line1 || "",
        postal_code: postal_code || "",
        city: city || "",
        address_notes: address_notes || "",
        kind: "booking",
      });
    } catch (e) {
      netlifyWarning = e?.message || String(e);
    }

    return json(200, {
      ok: true,
      booking: inserted?.[0] || null,
      start: startIso,
      end: endIso,
      blockMinutes,
      netlifyWarning, // ✅ useful for debugging if emails aren't coming
    });
  } catch (err) {
    return json(500, { error: err?.message || "Unknown error" });
  }
}
