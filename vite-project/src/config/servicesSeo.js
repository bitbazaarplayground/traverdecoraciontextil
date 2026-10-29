import { CONTACT } from "./contact.js";
import { getCanonicalPath, PUBLIC_ROUTES } from "./publicRoutes.js";

const SITE_URL = "https://www.traverdecoraciontextil.es";
const SERVICES_PATH = "/services";
const servicesRoute = PUBLIC_ROUTES.find(
  ({ path }) => path === SERVICES_PATH
);

if (!servicesRoute) {
  throw new Error(`Missing public route manifest entry: ${SERVICES_PATH}`);
}

/**
 * Approved services-hub metadata shared by the legacy Helmet implementation
 * and the isolated Framework Mode route module. The path comes from the
 * public route manifest so it cannot drift from the prerender target.
 */
export const SERVICES_SEO = {
  path: servicesRoute.path,
  canonical: `${SITE_URL}${servicesRoute.canonicalPath}`,
  title:
    "Servicios de cortinas, toldos, automatización y decoración textil en Castellón y Valencia",
  description:
    "Explora nuestros servicios de cortinas y estores, toldos, automatización, venecianas, panel japonés, mosquiteras y limpieza. Soluciones a medida con asesoramiento, medición e instalación profesional en Castellón y Valencia.",
  robots: "index,follow",
  siteName: CONTACT.siteName || "Traver Decoración Textil",
  ogType: "website",
  ogLocale: "es_ES",
  ogImage: `${SITE_URL}/og.png`,
  ogImageAlt: "Servicios de Traver Decoración Textil en Castellón y Valencia",
  ogImageWidth: "1200",
  ogImageHeight: "630",
  twitterCard: "summary_large_image",
};

const SERVICE_LIST_ITEMS = [
  { name: "Cortinas & Estores", path: "/cortinas-estores" },
  { name: "Toldos & Protección Solar", path: "/toldos-proteccion-solar" },
  { name: "Automatización", path: "/automatizacion" },
  { name: "Proyectos a Medida", path: "/propuestas" },
  { name: "Panel japonés & Verticales", path: "/panel-japones" },
  { name: "Venecianas", path: "/venecianas" },
  { name: "Mosquiteras", path: "/mosquiteras" },
  { name: "Limpieza", path: "/limpieza" },
];

export const SERVICES_PAGE_JSON_LD = [
  {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${SERVICES_SEO.canonical}#collectionpage`,
    url: SERVICES_SEO.canonical,
    name: SERVICES_SEO.title,
    description: SERVICES_SEO.description,
    inLanguage: "es-ES",
    isPartOf: {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: SERVICES_SEO.siteName,
    },
    about: { "@id": `${SITE_URL}/#business` },
    mainEntity: {
      "@type": "ItemList",
      itemListOrder: "https://schema.org/ItemListOrderAscending",
      numberOfItems: SERVICE_LIST_ITEMS.length,
      itemListElement: SERVICE_LIST_ITEMS.map(({ name, path }, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name,
        url: `${SITE_URL}${getCanonicalPath(path)}`,
      })),
    },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: SERVICES_SEO.ogImage,
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${SERVICES_SEO.canonical}#breadcrumb`,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Inicio",
        item: `${SITE_URL}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Servicios",
        item: SERVICES_SEO.canonical,
      },
    ],
  },
];

export function getServicesMetaDescriptors() {
  return [
    { title: SERVICES_SEO.title },
    { name: "description", content: SERVICES_SEO.description },
    { name: "robots", content: SERVICES_SEO.robots },
    {
      tagName: "link",
      rel: "canonical",
      href: SERVICES_SEO.canonical,
    },
    { property: "og:site_name", content: SERVICES_SEO.siteName },
    { property: "og:type", content: SERVICES_SEO.ogType },
    { property: "og:locale", content: SERVICES_SEO.ogLocale },
    { property: "og:url", content: SERVICES_SEO.canonical },
    { property: "og:title", content: SERVICES_SEO.title },
    { property: "og:description", content: SERVICES_SEO.description },
    { property: "og:image", content: SERVICES_SEO.ogImage },
    { property: "og:image:alt", content: SERVICES_SEO.ogImageAlt },
    { property: "og:image:width", content: SERVICES_SEO.ogImageWidth },
    { property: "og:image:height", content: SERVICES_SEO.ogImageHeight },
    { name: "twitter:card", content: SERVICES_SEO.twitterCard },
    { name: "twitter:title", content: SERVICES_SEO.title },
    { name: "twitter:description", content: SERVICES_SEO.description },
    { name: "twitter:image", content: SERVICES_SEO.ogImage },
    { name: "twitter:image:alt", content: SERVICES_SEO.ogImageAlt },
    { "script:ld+json": SERVICES_PAGE_JSON_LD },
  ];
}
