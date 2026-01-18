exports.handler = async function handler() {
  try {
    const SUPABASE_URL = process.env.SUPABASE_URL;
    const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
      return {
        statusCode: 500,
        body: "Missing SUPABASE_URL or SUPABASE_ANON_KEY env vars",
      };
    }

    // PATCH heartbeat row (counts as DB activity)
    const res = await fetch(`${SUPABASE_URL}/rest/v1/heartbeat?id=eq.1`, {
      method: "PATCH",
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({ updated_at: new Date().toISOString() }),
    });

    if (!res.ok) {
      const text = await res.text();
      return {
        statusCode: 500,
        body: `Heartbeat failed: ${text}`,
      };
    }

    return { statusCode: 200, body: "Heartbeat OK" };
  } catch (err) {
    return {
      statusCode: 500,
      body: `Heartbeat error: ${err?.message || "unknown"}`,
    };
  }
};
