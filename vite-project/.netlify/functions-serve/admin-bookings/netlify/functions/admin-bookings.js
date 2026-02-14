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

// netlify/functions/admin-bookings.js
var admin_bookings_exports = {};
__export(admin_bookings_exports, {
  handler: () => handler
});
module.exports = __toCommonJS(admin_bookings_exports);
function json(statusCode, body) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store"
    },
    body: JSON.stringify(body)
  };
}
function getAllowedEmails() {
  const raw = process.env.VITE_ADMIN_EMAILS || "";
  return raw.split(",").map((s) => s.trim().toLowerCase()).filter(Boolean);
}
async function getUserFromJwt({ supabaseUrl, serviceKey, jwt }) {
  const res = await fetch(`${supabaseUrl}/auth/v1/user`, {
    headers: {
      apikey: serviceKey,
      Authorization: `Bearer ${jwt}`
    }
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) return { user: null, error: data };
  return { user: data, error: null };
}
async function supabaseRestGet({ supabaseUrl, serviceKey, path }) {
  const res = await fetch(`${supabaseUrl}/rest/v1/${path}`, {
    headers: {
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
      "Content-Type": "application/json"
    }
  });
  const text = await res.text();
  if (!res.ok) throw new Error(text || `Supabase GET failed: ${res.status}`);
  return text ? JSON.parse(text) : [];
}
function digitsOnly(value) {
  return String(value || "").replace(/\D+/g, "");
}
function normalizeKey(raw) {
  const v = String(raw || "").trim();
  if (!v) return "";
  if (v.includes("@")) return v.toLowerCase();
  return digitsOnly(v);
}
function getCustomerKey(bk) {
  const fromDb = normalizeKey(bk?.customer_key);
  if (fromDb) return fromDb;
  const email = normalizeKey(bk?.email);
  if (email) return email;
  const phone = normalizeKey(bk?.phone);
  return phone;
}
async function handler(event) {
  try {
    let mergeRow = function(bk) {
      const customer_key = getCustomerKey(bk);
      const customer_status = customer_key ? statusByKey.get(customer_key) || bk.status_admin || "nuevo" : bk.status_admin || "nuevo";
      return {
        ...bk,
        customer_key,
        customer_status
        // ✅ pipeline status lives here
      };
    };
    const SUPABASE_URL = process.env.SUPABASE_URL;
    const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!SUPABASE_URL || !SERVICE_KEY) {
      return json(500, {
        error: "Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY"
      });
    }
    const authHeader = event.headers.authorization || event.headers.Authorization || "";
    const jwt = authHeader.startsWith("Bearer ") ? authHeader.slice("Bearer ".length) : null;
    if (!jwt) return json(401, { error: "Missing Authorization token" });
    const { user, error } = await getUserFromJwt({
      supabaseUrl: SUPABASE_URL,
      serviceKey: SERVICE_KEY,
      jwt
    });
    if (error || !user?.email) return json(401, { error: "Invalid session" });
    const allow = getAllowedEmails();
    const email = user.email.toLowerCase();
    if (allow.length && !allow.includes(email)) {
      return json(403, { error: "Not authorized" });
    }
    const qs = new URLSearchParams(event.queryStringParameters || {});
    const limit = Math.min(Number(qs.get("limit") || 200), 500);
    const bookings = await supabaseRestGet({
      supabaseUrl: SUPABASE_URL,
      serviceKey: SERVICE_KEY,
      path: `bookings?select=*&status=eq.reserved&order=start_time.asc&limit=${limit}`
    });
    const enquiries = await supabaseRestGet({
      supabaseUrl: SUPABASE_URL,
      serviceKey: SERVICE_KEY,
      path: `bookings?select=*&status=eq.enquiry&order=created_at.desc&limit=${limit}`
    });
    const blackouts = await supabaseRestGet({
      supabaseUrl: SUPABASE_URL,
      serviceKey: SERVICE_KEY,
      path: `blackouts?select=*&order=start_time.asc&limit=${limit}`
    });
    const customers = await supabaseRestGet({
      supabaseUrl: SUPABASE_URL,
      serviceKey: SERVICE_KEY,
      path: `customers?select=customer_key,status,updated_at&limit=2000`
    });
    const statusByKey = /* @__PURE__ */ new Map();
    for (const c of customers || []) {
      const k = normalizeKey(c.customer_key);
      if (!k) continue;
      statusByKey.set(k, (c.status || "nuevo").trim().toLowerCase());
    }
    const bookingsMerged = (bookings || []).map(mergeRow);
    const enquiriesMerged = (enquiries || []).map(mergeRow);
    return json(200, {
      ok: true,
      bookings: bookingsMerged,
      enquiries: enquiriesMerged,
      blackouts
    });
  } catch (e) {
    return json(500, { error: e.message || "Internal error" });
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  handler
});
//# sourceMappingURL=admin-bookings.js.map
