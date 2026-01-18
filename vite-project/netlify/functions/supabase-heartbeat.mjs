export const config = {
  // Runs once a day at 09:05 Europe/London-ish (Netlify uses UTC internally)
  // If you want it more frequent, we can do every 12h.
  schedule: "5 9 * * *",
};

export default async (req, context) => {
  try {
    const SUPABASE_URL = process.env.SUPABASE_URL;
    const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
      return new Response("Missing SUPABASE env vars", { status: 500 });
    }

    // Update heartbeat row (counts as DB activity)
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
      return new Response(`Heartbeat failed: ${text}`, { status: 500 });
    }

    return new Response("Heartbeat OK", { status: 200 });
  } catch (err) {
    return new Response(`Heartbeat error: ${err?.message || "unknown"}`, {
      status: 500,
    });
  }
};
