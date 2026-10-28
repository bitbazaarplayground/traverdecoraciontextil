import fs from "node:fs";
import path from "node:path";
import { argv } from "node:process";
import { fileURLToPath } from "node:url";
import { PUBLIC_ROUTES } from "../src/config/publicRoutes.js";

export const SITE_URL = "https://www.traverdecoraciontextil.es";

export function getSitemapPaths(routes = PUBLIC_ROUTES) {
  return routes
    .filter((route) => route.includeInSitemap)
    .map((route) => route.path);
}

export function createSitemapXml(routes = getSitemapPaths()) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (r) => `  <url>
    <loc>${SITE_URL}${r}</loc>
  </url>`
  )
  .join("\n")}
</urlset>
`;
}

export function createRobotsTxt() {
  return `User-agent: *
Allow: /

Disallow: /admin
Disallow: /admin/
Disallow: /auth
Disallow: /auth/

Sitemap: ${SITE_URL}/sitemap.xml
`;
}

export function writeSeoFiles(publicDir = path.resolve("public")) {
  fs.writeFileSync(
    path.join(publicDir, "sitemap.xml"),
    createSitemapXml()
  );
  fs.writeFileSync(path.join(publicDir, "robots.txt"), createRobotsTxt());
}

const isDirectExecution =
  argv[1] && path.resolve(argv[1]) === fileURLToPath(import.meta.url);

if (isDirectExecution) {
  writeSeoFiles();
  console.log("✅ Generated robots.txt and sitemap.xml for:", SITE_URL);
}
