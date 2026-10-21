const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Administrative functions are disabled unless they are explicitly enabled
 * with a server-only, valid allowlist. Do not fall back to VITE_* variables:
 * those values are intended for browser builds and must not grant access to
 * customer data.
 */
export function getAdminAccessConfig(env = globalThis.process?.env ?? {}) {
  if (env.ADMIN_FEATURE_ENABLED !== "true") return null;

  const rawEmails = env.ADMIN_EMAILS;
  if (typeof rawEmails !== "string" || !rawEmails.trim()) return null;

  const emails = rawEmails.split(",").map((value) => value.trim().toLowerCase());
  if (
    !emails.length ||
    emails.some((email) => !EMAIL_PATTERN.test(email)) ||
    new Set(emails).size !== emails.length
  ) {
    return null;
  }

  return { emails: new Set(emails) };
}

export function getBearerToken(event) {
  const header = event.headers?.authorization || event.headers?.Authorization || "";
  const match = String(header).match(/^Bearer\s+(.+)$/i);
  return match ? match[1].trim() : null;
}

export function isAllowedAdminEmail(config, email) {
  return Boolean(
    config &&
      typeof email === "string" &&
      config.emails.has(email.trim().toLowerCase())
  );
}
