import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

function json(statusCode, body) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json",
      // CORS (handy if you ever call from different origin)
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Allow-Methods": "GET,POST,PATCH,DELETE,OPTIONS",
    },
    body: JSON.stringify(body),
  };
}

function getBearerToken(event) {
  const h = event.headers?.authorization || event.headers?.Authorization || "";
  const match = h.match(/^Bearer\s+(.+)$/i);
  return match ? match[1] : null;
}

function safeFilename(name) {
  return String(name || "image")
    .trim()
    .replace(/[^\w.\-]+/g, "_");
}

export async function handler(event) {
  try {
    if (event.httpMethod === "OPTIONS") {
      return json(200, { ok: true });
    }

    if (!SUPABASE_URL || !SERVICE_KEY) {
      return json(500, {
        error: "Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY",
      });
    }

    const supabase = createClient(SUPABASE_URL, SERVICE_KEY);

    // 1) Verify admin JWT from client
    const token = getBearerToken(event);
    if (!token) return json(401, { error: "Missing Authorization token" });

    const { data: userData, error: userErr } = await supabase.auth.getUser(
      token
    );
    if (userErr || !userData?.user)
      return json(401, { error: "Invalid token" });

    // 2) Enforce allowlist using env VITE_ADMIN_EMAILS
    const allowRaw = process.env.VITE_ADMIN_EMAILS || "";
    const allow = allowRaw
      .split(",")
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean);

    const email = (userData.user.email || "").toLowerCase();
    if (allow.length && (!email || !allow.includes(email))) {
      return json(403, { error: "Not authorized" });
    }

    const bucket = "customer-images";

    // ---------- LIST (GET) ----------
    // GET /.netlify/functions/admin-customer-images?key=customer_key
    if (event.httpMethod === "GET") {
      const key = (event.queryStringParameters?.key || "").trim().toLowerCase();
      if (!key) return json(400, { error: "Missing key" });

      // 1) Read metadata rows for customer
      const { data: rows, error: rowsErr } = await supabase
        .from("customer_images")
        .select(
          "id, customer_key, path, filename, content_type, caption, created_at"
        )
        .eq("customer_key", key)
        .order("created_at", { ascending: false })
        .limit(200);

      if (rowsErr) return json(500, { error: rowsErr.message });

      const paths = (rows || []).map((r) => r.path).filter(Boolean);

      // 2) Create signed URLs for each path
      const signed = await Promise.all(
        paths.map(async (p) => {
          const { data, error: signErr } = await supabase.storage
            .from(bucket)
            .createSignedUrl(p, 60 * 60); // 1 hour

          if (signErr) return { path: p, url: null, error: signErr.message };
          return { path: p, url: data.signedUrl };
        })
      );

      // 3) Merge signed URLs back into rows
      const urlMap = new Map(signed.map((s) => [s.path, s.url]));
      const images = (rows || []).map((r) => ({
        ...r,
        url: urlMap.get(r.path) || null,
      }));

      return json(200, { images });
    }

    // Parse JSON body for write operations
    const body = event.body ? JSON.parse(event.body) : null;

    // ---------- UPLOAD (POST) ----------
    // POST body: { key, filename, contentType, base64, caption? }
    if (event.httpMethod === "POST") {
      const key = (body?.key || "").trim().toLowerCase();
      const filename = safeFilename(body?.filename || "");
      const contentType = body?.contentType || "image/jpeg";
      const base64 = body?.base64 || "";
      const caption = String(body?.caption || "").trim();

      if (!key) return json(400, { error: "Missing key" });
      if (!filename) return json(400, { error: "Missing filename" });
      if (!base64) return json(400, { error: "Missing base64" });

      const buffer = Buffer.from(base64, "base64");
      const path = `${key}/${Date.now()}-${filename}`;

      // 1) Upload to storage
      const { error: uploadErr } = await supabase.storage
        .from(bucket)
        .upload(path, buffer, { contentType, upsert: false });

      if (uploadErr) return json(500, { error: uploadErr.message });

      // 2) Insert metadata row
      const { data: inserted, error: insErr } = await supabase
        .from("customer_images")
        .insert({
          customer_key: key,
          path,
          filename,
          content_type: contentType,
          caption,
          created_by: userData.user.id,
        })
        .select(
          "id, customer_key, path, filename, content_type, caption, created_at"
        )
        .single();

      if (insErr) {
        // If metadata insert fails, clean up the uploaded file to avoid orphans
        await supabase.storage.from(bucket).remove([path]);
        return json(500, { error: insErr.message });
      }

      // 3) Signed URL for preview
      const { data: signed, error: signErr } = await supabase.storage
        .from(bucket)
        .createSignedUrl(path, 60 * 60);

      return json(200, {
        image: {
          ...inserted,
          url: signErr ? null : signed.signedUrl,
        },
      });
    }

    // ---------- UPDATE CAPTION (PATCH) ----------
    // PATCH body: { id, caption }
    if (event.httpMethod === "PATCH") {
      const id = body?.id;
      const caption = String(body?.caption || "").trim();

      if (!id) return json(400, { error: "Missing id" });

      const { data: updated, error: updErr } = await supabase
        .from("customer_images")
        .update({ caption })
        .eq("id", id)
        .select(
          "id, customer_key, path, filename, content_type, caption, created_at"
        )
        .single();

      if (updErr) return json(500, { error: updErr.message });

      // refresh signed URL
      const { data: signed, error: signErr } = await supabase.storage
        .from(bucket)
        .createSignedUrl(updated.path, 60 * 60);

      return json(200, {
        image: { ...updated, url: signErr ? null : signed.signedUrl },
      });
    }

    // ---------- DELETE (DELETE) ----------
    // DELETE body: { id }
    if (event.httpMethod === "DELETE") {
      const id = body?.id;
      if (!id) return json(400, { error: "Missing id" });

      // 1) Get row (to know storage path)
      const { data: row, error: rowErr } = await supabase
        .from("customer_images")
        .select("id, path")
        .eq("id", id)
        .single();

      if (rowErr || !row?.path) return json(404, { error: "Not found" });

      // 2) Remove file from storage
      const { error: rmErr } = await supabase.storage
        .from(bucket)
        .remove([row.path]);

      if (rmErr) return json(500, { error: rmErr.message });

      // 3) Remove metadata row
      const { error: delErr } = await supabase
        .from("customer_images")
        .delete()
        .eq("id", id);

      if (delErr) return json(500, { error: delErr.message });

      return json(200, { ok: true });
    }

    return json(405, { error: "Method not allowed" });
  } catch (e) {
    return json(500, { error: e.message || "Server error" });
  }
}
