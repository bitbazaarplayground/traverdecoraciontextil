import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { PUBLIC_ROUTES } from "../src/config/publicRoutes.js";

const SITE_URL = "https://www.traverdecoraciontextil.es";
const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const clientDir = path.join(scriptDir, "..", "build-framework-poc", "client");
const formsPath = path.join(clientDir, "netlify-forms.html");

const formsBlueprint = fs.readFileSync(formsPath, "utf8");
const expectedFormFields = {
  asesoramiento: [
    "form-name",
    "bot-field",
    "nombre",
    "telefono",
    "email",
    "preferencia",
    "mensaje",
    "meeting_mode",
    "pack",
    "kind",
    "start_time",
    "end_time",
    "address_line1",
    "postal_code",
    "city",
    "address_notes",
  ],
  "quick-enquiry": [
    "form-name",
    "bot-field",
    "nombre",
    "telefono",
    "email",
    "preferencia",
    "pack",
    "source",
    "page",
    "mensaje",
    "privacidad",
  ],
};
const canonicalPublicPaths = new Map(
  PUBLIC_ROUTES.map((route) => [route.path, route.canonicalPath])
);

function assertCanonicalSchemaUrls(value, routePath) {
  if (Array.isArray(value)) {
    value.forEach((item) => assertCanonicalSchemaUrls(item, routePath));
    return;
  }

  if (!value || typeof value !== "object") return;

  for (const nestedValue of Object.values(value)) {
    if (typeof nestedValue === "string" && nestedValue.startsWith(SITE_URL)) {
      const url = new URL(nestedValue);
      const routePathWithoutTrailingSlash =
        url.pathname === "/" ? "/" : url.pathname.replace(/\/+$/, "");
      const canonicalPath = canonicalPublicPaths.get(routePathWithoutTrailingSlash);

      if (canonicalPath) {
        assert.equal(
          url.pathname,
          canonicalPath,
          `${routePath} schema must use the canonical URL path for ${nestedValue}`
        );
      }
    } else {
      assertCanonicalSchemaUrls(nestedValue, routePath);
    }
  }
}

for (const [name, fields] of Object.entries(expectedFormFields)) {
  const formStart = formsBlueprint.indexOf(`<form\n        name="${name}"`);
  const formEnd = formsBlueprint.indexOf("</form>", formStart);
  const form = formsBlueprint.slice(formStart, formEnd);

  assert.ok(formStart !== -1, `Missing Netlify form blueprint: ${name}`);
  assert.match(form, /data-netlify="true"/);
  assert.match(form, /data-netlify-honeypot="bot-field"/);

  for (const field of fields) {
    assert.match(form, new RegExp(`name="${field}"`));
  }
}

for (const route of PUBLIC_ROUTES.filter(({ prerender }) => prerender)) {
  const relativeFile = route.path === "/" ? "index.html" : `${route.path.slice(1)}/index.html`;
  const documentPath = path.join(clientDir, relativeFile);
  const document = fs.readFileSync(documentPath, "utf8");
  const canonical = `${SITE_URL}${route.canonicalPath}`;

  assert.ok(!document.includes("\0"), `${route.path} must not contain NUL bytes`);
  assert.equal((document.match(/<title>/g) ?? []).length, 1, `${route.path} must have one title`);
  assert.equal(
    (document.match(/<meta name="description"/g) ?? []).length,
    1,
    `${route.path} must have one meta description`
  );
  assert.equal(
    (document.match(/rel="canonical"/g) ?? []).length,
    1,
    `${route.path} must have one canonical`
  );
  assert.equal(
    (document.match(/property="og:url"/g) ?? []).length,
    1,
    `${route.path} must have one og:url`
  );
  assert.ok(document.includes(`rel="canonical" href="${canonical}"`));
  assert.ok(document.includes(`property="og:url" content="${canonical}"`));
  assert.match(document, /<h1\b/);
  assert.match(document, /<link rel="stylesheet" href="\/fonts\.css"/);
  assert.match(document, /data-framework-styled-components="server"/);
  assert.ok(
    !document.includes("data-netlify"),
    `${route.path} must not put Netlify form detection markup in the React document`
  );

  for (const match of document.matchAll(/<a\b[^>]*\bhref="([^"]+)"/g)) {
    const href = match[1];
    const pathname = href.split(/[?#]/, 1)[0];
    const canonicalPath = canonicalPublicPaths.get(pathname);

    if (canonicalPath) {
      assert.ok(
        href.startsWith(canonicalPath),
        `${route.path} must link to ${canonicalPath}, not ${href}`
      );
    }
  }

  const jsonLdScripts = [
    ...document.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g),
  ];
  assert.ok(jsonLdScripts.length > 0, `${route.path} must include JSON-LD`);
  jsonLdScripts.forEach((match) => {
    let jsonLd;
    assert.doesNotThrow(() => {
      jsonLd = JSON.parse(match[1]);
    }, `${route.path} has invalid JSON-LD`);
    assertCanonicalSchemaUrls(jsonLd, route.path);
  });
}

console.log("✅ Framework static HTML and Netlify Forms blueprint validation passed");
