function json(statusCode, body) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
    },
    body: JSON.stringify(body),
  };
}

function getAllowedEmails() {
  const raw = process.env.VITE_ADMIN_EMAILS || "";
  return raw
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
}

// Verify the Supabase JWT and return the user (email)
async function getUserFromJwt({ supabaseUrl, serviceKey, jwt }) {
  const res = await fetch(`${supabaseUrl}/auth/v1/user`, {
    headers: {
      apikey: serviceKey,
      Authorization: `Bearer ${jwt}`,
    },
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
      "Content-Type": "application/json",
    },
  });
  const text = await res.text();
  if (!res.ok) throw new Error(text || `Supabase GET failed: ${res.status}`);
  return text ? JSON.parse(text) : [];
}

// Same customer_key logic as your frontend
function toCustomerKey(bk) {
  const email = String(bk?.email || "")
    .trim()
    .toLowerCase();
  if (email) return email;

  const phone = String(bk?.phone || "").trim();
  const digits = phone.replace(/\D/g, "");
  return digits;
}

export async function handler(event) {
  try {
    const SUPABASE_URL = process.env.SUPABASE_URL;
    const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!SUPABASE_URL || !SERVICE_KEY) {
      return json(500, {
        error: "Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY",
      });
    }

    const authHeader =
      event.headers.authorization || event.headers.Authorization || "";
    const jwt = authHeader.startsWith("Bearer ")
      ? authHeader.slice("Bearer ".length)
      : null;

    if (!jwt) return json(401, { error: "Missing Authorization token" });

    // Validate user via Supabase Auth API
    const { user, error } = await getUserFromJwt({
      supabaseUrl: SUPABASE_URL,
      serviceKey: SERVICE_KEY,
      jwt,
    });

    if (error || !user?.email) return json(401, { error: "Invalid session" });

    // Allow-list
    const allow = getAllowedEmails();
    const email = user.email.toLowerCase();
    if (allow.length && !allow.includes(email)) {
      return json(403, { error: "Not authorized" });
    }

    const qs = new URLSearchParams(event.queryStringParameters || {});
    const limit = Math.min(Number(qs.get("limit") || 200), 500);

    // Fetch bookings + blackouts
    const bookings = await supabaseRestGet({
      supabaseUrl: SUPABASE_URL,
      serviceKey: SERVICE_KEY,
      path: `bookings?select=*&status=eq.reserved&order=start_time.asc&limit=${limit}`,
    });

    const enquiries = await supabaseRestGet({
      supabaseUrl: SUPABASE_URL,
      serviceKey: SERVICE_KEY,
      path: `bookings?select=*&status=eq.enquiry&order=created_at.desc&limit=${limit}`,
    });

    const blackouts = await supabaseRestGet({
      supabaseUrl: SUPABASE_URL,
      serviceKey: SERVICE_KEY,
      path: `blackouts?select=*&order=start_time.asc&limit=${limit}`,
    });

    // Fetch customer statuses (small table, safe to grab all)
    // If you expect thousands later, we can optimize with an `in.(...)` filter.
    const customers = await supabaseRestGet({
      supabaseUrl: SUPABASE_URL,
      serviceKey: SERVICE_KEY,
      path: `customers?select=customer_key,status,updated_at&limit=2000`,
    });

    const statusByKey = new Map();
    for (const c of customers || []) {
      const k = String(c.customer_key || "")
        .trim()
        .toLowerCase();
      if (!k) continue;
      statusByKey.set(k, c.status);
    }

    // Merge into bookings response:
    // - add `customer_key` (computed)
    // - add `status` (from customers table if exists, else fallback to booking.status_admin)
    const bookingsMerged = (bookings || []).map((bk) => {
      const customer_key = toCustomerKey(bk);
      const statusFromCustomers = customer_key
        ? statusByKey.get(customer_key)
        : null;

      return {
        ...bk,
        customer_key,
        status: statusFromCustomers || bk.status_admin || "nuevo",
      };
    });

    return json(200, {
      ok: true,
      bookings: bookingsMerged,
      enquiries,
      blackouts,
    });
  } catch (e) {
    return json(500, { error: e.message || "Internal error" });
  }
}
