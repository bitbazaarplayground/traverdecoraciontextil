import assert from "node:assert/strict";
import test from "node:test";

import { handler as adminBookings } from "../netlify/functions/admin-bookings.js";
import { handler as adminCalendar } from "../netlify/functions/admin-calendar.js";
import { handler as adminCustomerImages } from "../netlify/functions/admin-customer-images.js";

const ADMIN_HANDLERS = [
  ["admin-bookings", adminBookings],
  ["admin-calendar", adminCalendar],
  ["admin-customer-images", adminCustomerImages],
];

const ENV_KEYS = [
  "ADMIN_FEATURE_ENABLED",
  "ADMIN_EMAILS",
  "SUPABASE_URL",
  "SUPABASE_SERVICE_ROLE_KEY",
];

async function withEnvironment(values, callback) {
  const original = Object.fromEntries(ENV_KEYS.map((key) => [key, process.env[key]]));

  try {
    for (const key of ENV_KEYS) {
      if (values[key] === undefined) delete process.env[key];
      else process.env[key] = values[key];
    }
    return await callback();
  } finally {
    for (const key of ENV_KEYS) {
      if (original[key] === undefined) delete process.env[key];
      else process.env[key] = original[key];
    }
  }
}

async function withoutNetwork(callback) {
  const originalFetch = globalThis.fetch;
  let calls = 0;
  globalThis.fetch = async () => {
    calls += 1;
    throw new Error("Tests must not contact Supabase");
  };

  try {
    const result = await callback();
    assert.equal(calls, 0, "request must be rejected before any network call");
    return result;
  } finally {
    globalThis.fetch = originalFetch;
  }
}

async function withSupabaseAuthMock({ status, body }, callback) {
  const originalFetch = globalThis.fetch;
  const requests = [];
  globalThis.fetch = async (input) => {
    const url = typeof input === "string" ? input : input.url;
    requests.push(url);

    if (!url.endsWith("/auth/v1/user")) {
      throw new Error(`Unexpected admin data request: ${url}`);
    }

    return new Response(JSON.stringify(body), {
      status,
      headers: { "Content-Type": "application/json" },
    });
  };

  try {
    await callback(requests);
  } finally {
    globalThis.fetch = originalFetch;
  }
}

function event(headers = {}) {
  return { httpMethod: "GET", headers, queryStringParameters: {} };
}

test("all admin functions default-deny missing and malformed access configuration", async () => {
  for (const [name, handler] of ADMIN_HANDLERS) {
    for (const config of [
      {},
      { ADMIN_FEATURE_ENABLED: "true", ADMIN_EMAILS: "" },
      { ADMIN_FEATURE_ENABLED: "true", ADMIN_EMAILS: "not-an-email" },
      {
        ADMIN_FEATURE_ENABLED: "true",
        ADMIN_EMAILS: "admin@example.test, admin@example.test",
      },
      { ADMIN_FEATURE_ENABLED: "false", ADMIN_EMAILS: "admin@example.test" },
    ]) {
      await withEnvironment(config, async () => {
        const response = await withoutNetwork(() => handler(event({ Authorization: "Bearer ignored" })));
        assert.equal(response.statusCode, 403, `${name} must deny invalid configuration`);
        assert.deepEqual(JSON.parse(response.body), {
          error: "Administrative access is disabled",
        });
      });
    }
  }
});

test("all admin functions reject missing or malformed bearer tokens before Supabase", async () => {
  const enabled = {
    ADMIN_FEATURE_ENABLED: "true",
    ADMIN_EMAILS: "admin@example.test",
    SUPABASE_URL: "https://example.invalid",
    SUPABASE_SERVICE_ROLE_KEY: "test-service-role-key",
  };

  for (const [name, handler] of ADMIN_HANDLERS) {
    for (const headers of [{}, { Authorization: "Basic ignored" }, { Authorization: "Bearer " }]) {
      await withEnvironment(enabled, async () => {
        const response = await withoutNetwork(() => handler(event(headers)));
        assert.equal(response.statusCode, 401, `${name} must require a bearer token`);
        assert.deepEqual(JSON.parse(response.body), {
          error: "Missing Authorization token",
        });
      });
    }
  }
});

test("all admin functions fail closed when their server-only Supabase configuration is absent", async () => {
  const accessOnly = {
    ADMIN_FEATURE_ENABLED: "true",
    ADMIN_EMAILS: "admin@example.test",
  };

  for (const [name, handler] of ADMIN_HANDLERS) {
    await withEnvironment(accessOnly, async () => {
      const response = await withoutNetwork(() =>
        handler(event({ Authorization: "Bearer test-token" }))
      );
      assert.equal(
        response.statusCode,
        503,
        `${name} must not attempt access without server credentials`
      );
      assert.deepEqual(JSON.parse(response.body), {
        error: "Administrative service unavailable",
      });
    });
  }
});

test("all admin functions reject forged and expired bearer tokens before data access", async () => {
  const enabled = {
    ADMIN_FEATURE_ENABLED: "true",
    ADMIN_EMAILS: "admin@example.test",
    SUPABASE_URL: "https://supabase.example.test",
    SUPABASE_SERVICE_ROLE_KEY: "test-service-role-key",
  };

  for (const [tokenType, token, errorBody] of [
    [
      "forged",
      "eyJhbGciOiJIUzI1NiJ9.forged-payload.invalid-signature",
      { message: "JWT signature is invalid" },
    ],
    [
      "expired",
      "eyJhbGciOiJIUzI1NiJ9.expired-payload.expired-signature",
      { message: "JWT expired" },
    ],
  ]) {
    for (const [name, handler] of ADMIN_HANDLERS) {
      await withEnvironment(enabled, async () => {
        await withSupabaseAuthMock({ status: 401, body: errorBody }, async (requests) => {
          const response = await handler(
            event({
              Authorization: `Bearer ${token}`,
              "X-Admin-Email": "admin@example.test",
            })
          );
          assert.equal(response.statusCode, 401, `${name} must reject a ${tokenType} token`);
          assert.deepEqual(requests, ["https://supabase.example.test/auth/v1/user"]);
        });
      });
    }
  }
});

test("all admin functions authorize Supabase's verified user identity, not a client-provided email", async () => {
  const enabled = {
    ADMIN_FEATURE_ENABLED: "true",
    ADMIN_EMAILS: "admin@example.test",
    SUPABASE_URL: "https://supabase.example.test",
    SUPABASE_SERVICE_ROLE_KEY: "test-service-role-key",
  };

  for (const [name, handler] of ADMIN_HANDLERS) {
    await withEnvironment(enabled, async () => {
      await withSupabaseAuthMock(
        {
          status: 200,
          body: { id: "unlisted-user", email: "attacker@example.test" },
        },
        async (requests) => {
          const response = await handler(
            event({
              Authorization: "Bearer verified-but-unlisted-token",
              "X-Admin-Email": "admin@example.test",
            })
          );
          assert.equal(response.statusCode, 403, `${name} must deny an unlisted verified user`);
          assert.deepEqual(requests, ["https://supabase.example.test/auth/v1/user"]);
        }
      );
    });
  }
});
