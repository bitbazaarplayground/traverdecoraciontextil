var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// netlify/functions/book.js
var book_exports = {};
__export(book_exports, {
  handler: () => handler
});
module.exports = __toCommonJS(book_exports);
function json(statusCode, bodyObj) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store"
    },
    body: JSON.stringify(bodyObj, null, 2)
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
      "Content-Type": "application/json"
    }
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
      Prefer: "return=representation"
    },
    body: JSON.stringify(row)
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
        Prefer: "resolution=merge-duplicates,return=representation"
      },
      body: JSON.stringify(row)
    }
  );
  const text = await res.text();
  if (!res.ok) throw new Error(`Supabase UPSERT failed: ${res.status} ${text}`);
  return text ? JSON.parse(text) : [];
}
async function submitToNetlifyForms(formName, fields) {
  const siteUrl = process.env.URL || process.env.DEPLOY_PRIME_URL;
  if (!siteUrl) throw new Error("Missing site URL env (URL/DEPLOY_PRIME_URL)");
  const body = new URLSearchParams({
    "form-name": formName,
    ...fields
  }).toString();
  const res = await fetch(siteUrl + "/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body
  });
  if (!(res.status >= 200 && res.status < 400)) {
    const t = await res.text().catch(() => "");
    throw new Error(`Netlify Forms submit failed: ${res.status} ${t}`);
  }
  return true;
}
function normalizeSpanishPhone(input) {
  const digits = String(input || "").replace(/\D/g, "");
  if (!/^[6789]\d{8}$/.test(digits)) return null;
  return digits;
}
function parseRpcBoolean(rpcJson) {
  if (rpcJson === true || rpcJson === false) return rpcJson;
  if (Array.isArray(rpcJson)) return rpcJson[0]?.allow_request;
  return rpcJson?.allow_request;
}
async function rateLimitHourly({
  supabaseUrl,
  serviceKey,
  customer_key,
  maxPerHour = 2
}) {
  const rpcRes = await fetch(`${supabaseUrl}/rest/v1/rpc/allow_request`, {
    method: "POST",
    headers: {
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      p_customer_key: customer_key,
      p_max: maxPerHour,
      p_window_minutes: 60
    })
  });
  const rpcJson = await rpcRes.json().catch(() => null);
  const allowed = parseRpcBoolean(rpcJson);
  if (!rpcRes.ok || allowed !== true) {
    return {
      ok: false,
      statusCode: 429,
      body: {
        error: "Has alcanzado el l\xEDmite: m\xE1ximo 2 solicitudes por hora.",
        code: "RATE_LIMIT_HOURLY"
      }
    };
  }
  return { ok: true };
}
async function handler(event) {
  try {
    if (event.httpMethod !== "POST") {
      return json(405, { error: "Use POST" });
    }
    const SUPABASE_URL = process.env.SUPABASE_URL;
    const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!SUPABASE_URL || !SERVICE_KEY) {
      return json(500, {
        error: "Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY"
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
      home_visit = false,
      address_line1 = null,
      postal_code = null,
      city = null,
      address_notes = null,
      start
      // client sends UTC ISO from availability endpoint
    } = payload;
    const name = String(customer_name || "").trim();
    if (!name) return json(400, { error: "Missing customer_name" });
    const phoneNorm = normalizeSpanishPhone(phone);
    if (!phoneNorm) {
      return json(400, {
        error: "Provide a valid Spanish phone number (9 digits, starts 6/7/8/9)"
      });
    }
    const emailLower = email ? String(email).trim().toLowerCase() : null;
    const customer_key = emailLower || phoneNorm;
    if (!start) return json(400, { error: "Missing start" });
    if (home_visit) {
      if (!address_line1 || !postal_code || !city) {
        return json(400, {
          error: "Missing address fields for home_visit (address_line1, postal_code, city)"
        });
      }
    }
    const startDate = new Date(start);
    if (Number.isNaN(startDate.getTime())) {
      return json(400, { error: "Invalid start datetime" });
    }
    const leadTimeDays = 2;
    const minStart = Date.now() + leadTimeDays * 24 * 60 * 6e4;
    if (startDate.getTime() < minStart) {
      return json(400, {
        error: "Selected slot is too soon (lead time enforced)."
      });
    }
    const pref = String(contact_preference || "WhatsApp").trim();
    const rl = await rateLimitHourly({
      supabaseUrl: SUPABASE_URL,
      serviceKey: SERVICE_KEY,
      customer_key,
      maxPerHour: 2
    });
    if (!rl.ok) return json(rl.statusCode, rl.body);
    const blockMinutes = 120;
    const endDate = new Date(startDate.getTime() + blockMinutes * 6e4);
    const startIso = startDate.toISOString();
    const endIso = endDate.toISOString();
    const reserved = await supabaseGet({
      url: SUPABASE_URL,
      serviceKey: SERVICE_KEY,
      path: `bookings?select=id,start_time,end_time,status&status=eq.reserved&start_time=lt.${encodeURIComponent(endIso)}&end_time=gt.${encodeURIComponent(startIso)}`
    });
    const blackouts = await supabaseGet({
      url: SUPABASE_URL,
      serviceKey: SERVICE_KEY,
      path: `blackouts?select=id,start_time,end_time,reason&start_time=lt.${encodeURIComponent(endIso)}&end_time=gt.${encodeURIComponent(startIso)}`
    });
    const startMs = startDate.getTime();
    const endMs = endDate.getTime();
    const busy = [].concat(
      reserved.map((b) => ({
        kind: "booking",
        startMs: new Date(b.start_time).getTime(),
        endMs: new Date(b.end_time).getTime()
      }))
    ).concat(
      blackouts.map((b) => ({
        kind: "blackout",
        startMs: new Date(b.start_time).getTime(),
        endMs: new Date(b.end_time).getTime()
      }))
    );
    const blocked = busy.some(
      (r) => overlaps(startMs, endMs, r.startMs, r.endMs)
    );
    if (blocked) {
      return json(409, {
        error: "Slot unavailable",
        code: "SLOT_TAKEN"
      });
    }
    const inserted = await supabaseInsert({
      url: SUPABASE_URL,
      serviceKey: SERVICE_KEY,
      table: "bookings",
      row: {
        customer_key,
        status: "reserved",
        meeting_mode: home_visit ? "domicilio" : "tienda",
        pack,
        customer_name: name,
        phone: phoneNorm,
        // normalized digits or null
        email: emailLower,
        // lowercase or null
        contact_preference: pref,
        home_visit: !!home_visit,
        address_line1,
        postal_code,
        city,
        address_notes,
        start_time: startIso,
        end_time: endIso,
        message
      }
    });
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
        source: "booking"
      }
    });
    await supabaseUpsert({
      url: SUPABASE_URL,
      serviceKey: SERVICE_KEY,
      table: "customers",
      onConflict: "customer_key",
      row: {
        customer_key,
        status: "nuevo",
        name,
        phone: phoneNorm,
        email: emailLower,
        city: city || null,
        updated_at: (/* @__PURE__ */ new Date()).toISOString()
      }
    });
    let netlifyWarning = null;
    try {
      await submitToNetlifyForms("asesoramiento", {
        meeting_mode: home_visit ? "domicilio" : "tienda",
        pack,
        nombre: name,
        telefono: phoneNorm || "",
        email: emailLower || "",
        preferencia: pref,
        mensaje: message || "",
        start_time: startIso,
        end_time: endIso,
        address_line1: address_line1 || "",
        postal_code: postal_code || "",
        city: city || "",
        address_notes: address_notes || "",
        kind: "booking"
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
      customer_key,
      netlifyWarning
    });
  } catch (err) {
    return json(500, { error: err?.message || "Unknown error" });
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  handler
});
//# sourceMappingURL=book.js.map
