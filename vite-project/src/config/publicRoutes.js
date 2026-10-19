/**
 * Public, indexable routes shared by browser code and Node build scripts.
 *
 * Keep the sitemap-enabled routes in the existing sitemap order. Legal pages
 * remain public and eligible for future prerendering, but are intentionally
 * excluded from the sitemap until that policy changes.
 */
export const PUBLIC_ROUTES = [
  { path: "/", includeInSitemap: true, prerender: true },
  { path: "/propuestas", includeInSitemap: true, prerender: true },
  { path: "/automatizacion", includeInSitemap: true, prerender: true },
  {
    path: "/automatizacion/completa",
    includeInSitemap: true,
    prerender: true,
  },
  {
    path: "/automatizacion/individual",
    includeInSitemap: true,
    prerender: true,
  },
  { path: "/contact", includeInSitemap: true, prerender: true },
  { path: "/panel-japones", includeInSitemap: true, prerender: true },
  { path: "/venecianas", includeInSitemap: true, prerender: true },
  { path: "/cortinas-estores", includeInSitemap: true, prerender: true },
  {
    path: "/toldos-proteccion-solar",
    includeInSitemap: true,
    prerender: true,
  },
  { path: "/mosquiteras", includeInSitemap: true, prerender: true },
  { path: "/services", includeInSitemap: true, prerender: true },
  { path: "/limpieza", includeInSitemap: true, prerender: true },
  { path: "/nosotros", includeInSitemap: true, prerender: true },
  { path: "/aviso-legal", includeInSitemap: false, prerender: true },
  {
    path: "/politica-privacidad",
    includeInSitemap: false,
    prerender: true,
  },
  { path: "/politica-cookies", includeInSitemap: false, prerender: true },
];
