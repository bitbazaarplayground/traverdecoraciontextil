import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { PUBLIC_ROUTES } from "../src/config/publicRoutes.js";
import {
  createSitemapXml,
  getSitemapPaths,
  SITE_URL,
} from "./generate-seo-files.mjs";

const EXPECTED_PUBLIC_PATHS = [
  "/",
  "/propuestas",
  "/automatizacion",
  "/automatizacion/completa",
  "/automatizacion/individual",
  "/contact",
  "/nosotros",
  "/panel-japones",
  "/venecianas",
  "/cortinas-estores",
  "/toldos-proteccion-solar",
  "/mosquiteras",
  "/services",
  "/limpieza",
  "/aviso-legal",
  "/politica-privacidad",
  "/politica-cookies",
];

const EXPECTED_SITEMAP_PATHS = [
  "/",
  "/propuestas/",
  "/automatizacion/",
  "/automatizacion/completa/",
  "/automatizacion/individual/",
  "/contact/",
  "/panel-japones/",
  "/venecianas/",
  "/cortinas-estores/",
  "/toldos-proteccion-solar/",
  "/mosquiteras/",
  "/services/",
  "/limpieza/",
  "/nosotros/",
];

const manifestPaths = PUBLIC_ROUTES.map((route) => route.path);
const manifestCanonicalPaths = PUBLIC_ROUTES.map((route) => route.canonicalPath);
const sitemapPaths = getSitemapPaths();

assert.equal(
  new Set(manifestPaths).size,
  manifestPaths.length,
  "Public route paths must be unique"
);
assert.equal(
  new Set(manifestCanonicalPaths).size,
  manifestCanonicalPaths.length,
  "Public route canonical paths must be unique"
);
assert.deepEqual(
  [...manifestPaths].sort(),
  [...EXPECTED_PUBLIC_PATHS].sort(),
  "The manifest must contain exactly the 17 intended public routes"
);
assert.deepEqual(
  sitemapPaths,
  EXPECTED_SITEMAP_PATHS,
  "The sitemap must contain exactly the intended 14 paths in its existing order"
);
assert.deepEqual(
  sitemapPaths,
  PUBLIC_ROUTES.filter((route) => route.includeInSitemap).map(
    (route) => route.canonicalPath
  ),
  "Sitemap paths must be derived from the shared public-route manifest"
);
assert.deepEqual(
  getSitemapPaths([
    {
      path: "/manifest-check",
      canonicalPath: "/manifest-check/",
      includeInSitemap: true,
    },
  ]),
  ["/manifest-check/"],
  "The sitemap generator must derive paths from its supplied manifest"
);

for (const excludedPath of [
  "/admin",
  "/admin/reset-password",
  "/auth/callback",
  "/toldos-proteccionsolar",
]) {
  assert.ok(
    !manifestPaths.includes(excludedPath),
    `${excludedPath} must not be a public route`
  );
  assert.ok(
    !sitemapPaths.includes(excludedPath),
    `${excludedPath} must not appear in the sitemap`
  );
}

const expectedSitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${EXPECTED_SITEMAP_PATHS.map(
  (route) => `  <url>
    <loc>${SITE_URL}${route}</loc>
  </url>`
).join("\n")}
</urlset>
`;

assert.equal(
  createSitemapXml(),
  expectedSitemapXml,
  "Generated sitemap XML must retain the expected domain, paths, order, and no lastmod values"
);
assert.ok(
  !createSitemapXml().includes("<lastmod>"),
  "The sitemap must not fabricate lastmod values"
);

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const sitemapPath = path.join(scriptDir, "..", "public", "sitemap.xml");
assert.equal(
  fs.readFileSync(sitemapPath, "utf8"),
  expectedSitemapXml,
  "The committed sitemap output must match the shared manifest"
);

console.log("✅ SEO route manifest and sitemap validation passed");
