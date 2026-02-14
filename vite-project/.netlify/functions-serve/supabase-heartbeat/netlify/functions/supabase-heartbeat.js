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

// netlify/functions/supabase-heartbeat.js
var supabase_heartbeat_exports = {};
__export(supabase_heartbeat_exports, {
  handler: () => handler
});
module.exports = __toCommonJS(supabase_heartbeat_exports);
async function handler() {
  try {
    const SUPABASE_URL = process.env.SUPABASE_URL;
    const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;
    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
      return {
        statusCode: 500,
        body: "Missing SUPABASE_URL or SUPABASE_ANON_KEY env vars"
      };
    }
    const res = await fetch(`${SUPABASE_URL}/rest/v1/heartbeat?id=eq.1`, {
      method: "PATCH",
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal"
      },
      body: JSON.stringify({ updated_at: (/* @__PURE__ */ new Date()).toISOString() })
    });
    if (!res.ok) {
      const text = await res.text();
      return {
        statusCode: 500,
        body: `Heartbeat failed: ${text}`
      };
    }
    return { statusCode: 200, body: "Heartbeat OK" };
  } catch (err) {
    return {
      statusCode: 500,
      body: `Heartbeat error: ${err?.message || "unknown"}`
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  handler
});
//# sourceMappingURL=supabase-heartbeat.js.map
