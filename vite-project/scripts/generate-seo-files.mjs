import fs from "node:fs";
import path from "node:path";

const siteUrlRaw = process.env.VITE_SITE_URL || "http://localhost:5173";
const siteUrl = siteUrlRaw.replace(/\/$/, "");

const routes = [
  "/",
  "/propuestas",
  "/automatizacion",
  "/automatizacion/completa",
  "/automatizacion/individual",
  "/contact",
  "/panel-japones",
  "/venecianas",
  "/cortinas-estores",
  "/toldos-proteccionsolar",
  "/mosquiteras",
  "/services",
  "/aviso-legal",
  "/politica-privacidad",
  "/politica-cookies",
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (r) => `  <url>
    <loc>${siteUrl}${r}</loc>
  </url>`
  )
  .join("\n")}
</urlset>
`;

const robots = `User-agent: *
Allow: /

Disallow: /admin
Disallow: /admin/
Disallow: /auth
Disallow: /auth/

Sitemap: ${siteUrl}/sitemap.xml
`;

const publicDir = path.resolve("public");
fs.writeFileSync(path.join(publicDir, "sitemap.xml"), sitemap);
fs.writeFileSync(path.join(publicDir, "robots.txt"), robots);

console.log("✅ Generated robots.txt and sitemap.xml for:", siteUrl);
