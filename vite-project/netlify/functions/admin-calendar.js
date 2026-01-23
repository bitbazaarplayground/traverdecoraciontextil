// netlify/functions/admin-calendar.js
// GET  /.netlify/functions/admin-calendar?from=ISO&to=ISO
// POST /.netlify/functions/admin-calendar   { blocks: [{start_time,end_time,reason}] }
// DELETE /.netlify/functions/admin-calendar { id }

import { createClient } from "@supabase/supabase-js";

function json(statusCode, body) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      // ✅ CORS (helps localhost dev)
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Allow-Methods": "GET,POST,DELETE,OPTIONS",
    },
    body: JSON.stringify(body, null, 2),
  };
}

function getBearerToken(event) {
  const h = event.headers?.authorization || event.headers?.Authorization || "";
  const m = String(h).match(/^Bearer\s+(.+)$/i);
  return m ? m[1] : null;
}

export async function handler(event) {
  try {
    if (event.httpMethod === "OPTIONS") return json(200, { ok: true });

    const SUPABASE_URL = process.env.SUPABASE_URL;
    const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!SUPABASE_URL || !SERVICE_KEY) {
      return json(500, {
        error: "Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY",
      });
    }

    const supabase = createClient(SUPABASE_URL, SERVICE_KEY, {
      auth: { persistSession: false },
    });

    // ✅ Auth: verify user from the JWT sent by your frontend
    const token = getBearerToken(event);
    if (!token) return json(401, { error: "Missing Bearer token" });

    const { data: userData, error: userErr } = await supabase.auth.getUser(
      token
    );
    if (userErr || !userData?.user)
      return json(401, { error: "Invalid session" });

    const user = userData.user;

    // ✅ Admin gate: must exist in admin_users table
    const { data: adminRow, error: adminErr } = await supabase
      .from("admin_users")
      .select("user_id")
      .eq("user_id", user.id)
      .maybeSingle();

    if (adminErr) return json(500, { error: adminErr.message });
    if (!adminRow) return json(403, { error: "Access denied (not admin)" });

    // =========================
    // GET: bookings + blackouts
    // =========================
    if (event.httpMethod === "GET") {
      const qs = event.queryStringParameters || {};
      const from = qs.from;
      const to = qs.to;

      if (!from || !to) {
        return json(400, { error: "Missing from/to query params" });
      }

      // overlap condition: start < to AND end > from
      const bookingsQ = supabase
        .from("bookings")
        .select("id, customer_name, pack, start_time, end_time, status")
        .eq("status", "reserved")
        .lt("start_time", to)
        .gt("end_time", from)
        .order("start_time", { ascending: true });

      const blackoutsQ = supabase
        .from("blackouts")
        .select("id, reason, start_time, end_time")
        .lt("start_time", to)
        .gt("end_time", from)
        .order("start_time", { ascending: true });

      const [
        { data: bookings, error: bErr },
        { data: blackouts, error: blErr },
      ] = await Promise.all([bookingsQ, blackoutsQ]);

      if (bErr) return json(500, { error: bErr.message });
      if (blErr) return json(500, { error: blErr.message });

      return json(200, {
        ok: true,
        bookings: bookings || [],
        blackouts: blackouts || [],
      });
    }

    // =========================
    // POST: create blackouts
    // =========================
    if (event.httpMethod === "POST") {
      let body = {};
      try {
        body = JSON.parse(event.body || "{}");
      } catch {
        return json(400, { error: "Invalid JSON body" });
      }

      const blocks = Array.isArray(body.blocks) ? body.blocks : [];
      if (!blocks.length) return json(400, { error: "blocks[] is required" });

      // minimal validation
      const rows = blocks.map((b) => ({
        start_time: b.start_time,
        end_time: b.end_time,
        reason: b.reason || "Bloqueado",
      }));

      for (const r of rows) {
        if (!r.start_time || !r.end_time)
          return json(400, { error: "start_time and end_time are required" });
        if (new Date(r.end_time) <= new Date(r.start_time)) {
          return json(400, { error: "end_time must be after start_time" });
        }
      }

      const { data, error } = await supabase
        .from("blackouts")
        .insert(rows)
        .select("id, reason, start_time, end_time");
      if (error) return json(500, { error: error.message });

      return json(200, { ok: true, inserted: data || [] });
    }

    // =========================
    // DELETE: delete blackout
    // =========================
    if (event.httpMethod === "DELETE") {
      let body = {};
      try {
        body = JSON.parse(event.body || "{}");
      } catch {
        return json(400, { error: "Invalid JSON body" });
      }

      const id = body.id;
      if (!id) return json(400, { error: "Missing id" });

      const { error } = await supabase.from("blackouts").delete().eq("id", id);
      if (error) return json(500, { error: error.message });

      return json(200, { ok: true });
    }

    return json(405, { error: "Method not allowed" });
  } catch (err) {
    return json(500, { error: err?.message || "Unknown error" });
  }
}
