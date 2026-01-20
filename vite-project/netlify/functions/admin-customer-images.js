import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

function json(statusCode, body) {
  return {
    statusCode,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };
}

function getBearerToken(event) {
  const h = event.headers?.authorization || event.headers?.Authorization || "";
  const match = h.match(/^Bearer\s+(.+)$/i);
  return match ? match[1] : null;
}

export async function handler(event) {
  try {
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

    // Optional: enforce allowlist using env VITE_ADMIN_EMAILS (reuse your frontend list)
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

    // ---------- LIST ----------
    if (event.httpMethod === "GET") {
      const key = (event.queryStringParameters?.key || "").trim().toLowerCase();
      if (!key) return json(400, { error: "Missing key" });

      const { data: files, error } = await supabase.storage
        .from(bucket)
        .list(key, {
          limit: 100,
          sortBy: { column: "created_at", order: "desc" },
        });

      if (error) return json(500, { error: error.message });

      // Create signed URLs so admin can preview private images
      const paths = (files || [])
        .filter((f) => f?.name && f.name !== ".emptyFolderPlaceholder")
        .map((f) => `${key}/${f.name}`);

      const signed = await Promise.all(
        paths.map(async (p) => {
          const { data, error: signErr } = await supabase.storage
            .from(bucket)
            .createSignedUrl(p, 60 * 60); // 1 hour
          if (signErr) return { path: p, url: null, error: signErr.message };
          return { path: p, url: data.signedUrl };
        })
      );

      return json(200, { images: signed });
    }

    // ---------- UPLOAD ----------
    if (event.httpMethod === "POST") {
      // Expect JSON body: { key, filename, contentType, base64 }
      const body = event.body ? JSON.parse(event.body) : null;
      const key = (body?.key || "").trim().toLowerCase();
      const filename = (body?.filename || "").trim();
      const contentType = body?.contentType || "image/jpeg";
      const base64 = body?.base64 || "";

      if (!key) return json(400, { error: "Missing key" });
      if (!filename) return json(400, { error: "Missing filename" });
      if (!base64) return json(400, { error: "Missing base64" });

      const buffer = Buffer.from(base64, "base64");
      const safeName = filename.replace(/[^\w.\-]+/g, "_");
      const path = `${key}/${Date.now()}-${safeName}`;

      const { error } = await supabase.storage
        .from(bucket)
        .upload(path, buffer, { contentType, upsert: false });

      if (error) return json(500, { error: error.message });

      const { data: signed, error: signErr } = await supabase.storage
        .from(bucket)
        .createSignedUrl(path, 60 * 60);

      if (signErr) return json(200, { path, url: null });
      return json(200, { path, url: signed.signedUrl });
    }

    return json(405, { error: "Method not allowed" });
  } catch (e) {
    return json(500, { error: e.message || "Server error" });
  }
}
