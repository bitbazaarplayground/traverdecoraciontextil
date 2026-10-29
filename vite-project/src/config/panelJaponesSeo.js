import { CONTACT, PRIMARY_SERVICE_AREA_SERVED } from "./contact.js";
import { getCanonicalPath, PUBLIC_ROUTES } from "./publicRoutes.js";

const SITE_URL = "https://www.traverdecoraciontextil.es";
const PANEL_JAPONES_PATH = "/panel-japones";
const panelJaponesRoute = PUBLIC_ROUTES.find(
  ({ path }) => path === PANEL_JAPONES_PATH
);

if (!panelJaponesRoute) {
  throw new Error(`Missing public route manifest entry: ${PANEL_JAPONES_PATH}`);
}

export const PANEL_JAPONES_SEO = {
  path: panelJaponesRoute.path,
  canonical: `${SITE_URL}${panelJaponesRoute.canonicalPath}`,
  title:
    "Panel japonés a medida | Traver Decoración Textil (Castellón y Valencia)",
  description:
    "Panel japonés a medida en Castellón y Valencia: perfecto para ventanales y puertas correderas. Tejidos seleccionados, medición e instalación profesional en Almassora.",
  robots: "index,follow",
  siteName: CONTACT.siteName,
  ogType: "website",
  ogLocale: "es_ES",
  ogImage: `${SITE_URL}/og.png`,
  ogImageAlt: "Panel japonés a medida — Traver Decoración Textil",
  twitterCard: "summary_large_image",
};

export const PANEL_JAPONES_FAQ_ITEMS = [
  {
    q: "¿Cuándo es mejor elegir panel japonés?",
    a: "Es ideal para ventanales grandes, puertas correderas y estancias de estética moderna. Funciona muy bien cuando quieres líneas rectas, orden visual y control de luz por zonas.",
    aText:
      "Es ideal para ventanales grandes, puertas correderas y estancias de estética moderna. Funciona muy bien cuando quieres líneas rectas, orden visual y control de luz por zonas.",
  },
  {
    q: "¿Se puede combinar con visillo o tejidos traslúcidos?",
    a: "Sí. Podemos plantear paneles traslúcidos para tamizar luz o combinaciones (panel traslúcido + tejido más opaco) para conseguir privacidad y ambiente según el momento del día.",
    aText:
      "Sí. Podemos plantear paneles traslúcidos para tamizar luz o combinaciones (panel traslúcido + tejido más opaco) para conseguir privacidad y ambiente según el momento del día.",
  },
  {
    q: "¿Cómo se define el número de paneles y el solape?",
    a: "Depende del ancho, del tipo de apertura y del efecto visual. Te proponemos una distribución equilibrada (paneles + solapes) para que el movimiento sea limpio y la caída quede perfecta.",
    aText:
      "Depende del ancho, del tipo de apertura y del efecto visual. Te proponemos una distribución equilibrada (paneles + solapes) para que el movimiento sea limpio y la caída quede perfecta.",
  },
  {
    q: "¿Hacéis medición e instalación en Castellón y Valencia?",
    a: "Sí. Realizamos visita, medición y montaje profesional para que el panel deslice suave y el remate quede alineado.",
    aText:
      "Sí. Realizamos visita, medición y montaje profesional para que el panel deslice suave y el remate quede alineado.",
  },
  {
    q: "¿Qué mantenimiento requiere?",
    a: "Según el tejido, puede ser limpieza puntual o lavado siguiendo la recomendación del fabricante. Te aconsejamos el material más adecuado si hay cocina, mascotas o mucho uso diario.",
    aText:
      "Según el tejido, puede ser limpieza puntual o lavado siguiendo la recomendación del fabricante. Te aconsejamos el material más adecuado si hay cocina, mascotas o mucho uso diario.",
  },
];

export const PANEL_JAPONES_PAGE_JSON_LD = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${PANEL_JAPONES_SEO.canonical}#webpage`,
    url: PANEL_JAPONES_SEO.canonical,
    name: PANEL_JAPONES_SEO.title,
    description: PANEL_JAPONES_SEO.description,
    inLanguage: "es-ES",
    isPartOf: { "@id": `${SITE_URL}/#website` },
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: `${SITE_URL}/` },
      {
        "@type": "ListItem",
        position: 2,
        name: "Servicios",
        item: `${SITE_URL}${getCanonicalPath("/services")}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Panel japonés",
        item: PANEL_JAPONES_SEO.canonical,
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${PANEL_JAPONES_SEO.canonical}#service`,
    name: "Panel japonés a medida",
    description: PANEL_JAPONES_SEO.description,
    areaServed: PRIMARY_SERVICE_AREA_SERVED,
    provider: {
      "@type": "LocalBusiness",
      name: PANEL_JAPONES_SEO.siteName,
      url: `${SITE_URL}/`,
      telephone: CONTACT.phoneLandline,
      email: CONTACT.email,
      address: { "@type": "PostalAddress", ...CONTACT.address },
    },
  },
];

export const PANEL_JAPONES_FAQ_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: PANEL_JAPONES_FAQ_ITEMS.map(({ q, aText }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: aText },
  })),
  "@id": `${PANEL_JAPONES_SEO.canonical}#faq`,
};

export function getPanelJaponesMetaDescriptors() {
  return [
    { title: PANEL_JAPONES_SEO.title },
    { name: "description", content: PANEL_JAPONES_SEO.description },
    { name: "robots", content: PANEL_JAPONES_SEO.robots },
    { tagName: "link", rel: "canonical", href: PANEL_JAPONES_SEO.canonical },
    { property: "og:site_name", content: PANEL_JAPONES_SEO.siteName },
    { property: "og:type", content: PANEL_JAPONES_SEO.ogType },
    { property: "og:locale", content: PANEL_JAPONES_SEO.ogLocale },
    { property: "og:url", content: PANEL_JAPONES_SEO.canonical },
    { property: "og:title", content: PANEL_JAPONES_SEO.title },
    { property: "og:description", content: PANEL_JAPONES_SEO.description },
    { property: "og:image", content: PANEL_JAPONES_SEO.ogImage },
    { property: "og:image:alt", content: PANEL_JAPONES_SEO.ogImageAlt },
    { name: "twitter:card", content: PANEL_JAPONES_SEO.twitterCard },
    { name: "twitter:title", content: PANEL_JAPONES_SEO.title },
    { name: "twitter:description", content: PANEL_JAPONES_SEO.description },
    { name: "twitter:image", content: PANEL_JAPONES_SEO.ogImage },
    { name: "twitter:image:alt", content: PANEL_JAPONES_SEO.ogImageAlt },
    { "script:ld+json": PANEL_JAPONES_PAGE_JSON_LD },
    { "script:ld+json": PANEL_JAPONES_FAQ_JSON_LD },
  ];
}
