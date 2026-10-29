/**
 * Public, indexable routes shared by browser code and Node build scripts.
 *
 * Keep the sitemap-enabled routes in the existing sitemap order. Legal pages
 * remain public and eligible for future prerendering, but are intentionally
 * excluded from the sitemap until that policy changes.
 */
function canonicalPath(path) {
  return path === "/" ? path : `${path.replace(/\/+$/, "")}/`;
}

function publicRoute(path, options) {
  return { path, canonicalPath: canonicalPath(path), ...options };
}

export const PUBLIC_ROUTES = [
  publicRoute("/", { includeInSitemap: true, prerender: true }),
  publicRoute("/propuestas", { includeInSitemap: true, prerender: true }),
  publicRoute("/automatizacion", { includeInSitemap: true, prerender: true }),
  publicRoute("/automatizacion/completa", {
    includeInSitemap: true,
    prerender: true,
  }),
  publicRoute("/automatizacion/individual", {
    includeInSitemap: true,
    prerender: true,
  }),
  publicRoute("/contact", { includeInSitemap: true, prerender: true }),
  publicRoute("/panel-japones", { includeInSitemap: true, prerender: true }),
  publicRoute("/venecianas", { includeInSitemap: true, prerender: true }),
  publicRoute("/cortinas-estores", { includeInSitemap: true, prerender: true }),
  publicRoute("/toldos-proteccion-solar", {
    includeInSitemap: true,
    prerender: true,
  }),
  publicRoute("/mosquiteras", { includeInSitemap: true, prerender: true }),
  publicRoute("/services", { includeInSitemap: true, prerender: true }),
  publicRoute("/limpieza", { includeInSitemap: true, prerender: true }),
  publicRoute("/nosotros", { includeInSitemap: true, prerender: true }),
  publicRoute("/aviso-legal", { includeInSitemap: false, prerender: true }),
  publicRoute("/politica-privacidad", {
    includeInSitemap: false,
    prerender: true,
  }),
  publicRoute("/politica-cookies", {
    includeInSitemap: false,
    prerender: true,
  }),
];

export function getCanonicalPath(pathname) {
  const normalizedPath = canonicalPath(pathname).replace(/\/$/, "") || "/";
  const route = PUBLIC_ROUTES.find(({ path }) => path === normalizedPath);

  return route?.canonicalPath ?? canonicalPath(normalizedPath);
}
