import { CONTACT, PRIMARY_SERVICE_AREA_SERVED } from "./contact.js";
import { PUBLIC_ROUTES } from "./publicRoutes.js";

const SITE_URL = "https://www.traverdecoraciontextil.es";
const TOLDOS_PATH = "/toldos-proteccion-solar";
const toldosRoute = PUBLIC_ROUTES.find(({ path }) => path === TOLDOS_PATH);

if (!toldosRoute) {
  throw new Error(`Missing public route manifest entry: ${TOLDOS_PATH}`);
}

/**
 * Approved toldos metadata shared by the legacy Helmet implementation and the
 * isolated Framework Mode route module. The route path comes from the public
 * route manifest so it cannot drift from the prerender target.
 */
export const TOLDOS_SEO = {
  path: toldosRoute.path,
  canonical: `${SITE_URL}${toldosRoute.canonicalPath}`,
  title: "Toldos en Castellón | Toldos a medida e instalación profesional",
  description:
    "Instalamos toldos en Castellón y alrededores: toldos extensibles, cofre, verticales, pérgolas y soluciones de protección solar a medida para terrazas, balcones, jardines y negocios.",
  robots: "index,follow",
  siteName: CONTACT.siteName,
  ogType: "website",
  ogLocale: "es_ES",
  ogImage: `${SITE_URL}/og.png`,
  ogImageAlt:
    "Toldos a medida y protección solar en Castellón — Traver Decoración Textil",
  ogImageWidth: "1200",
  ogImageHeight: "630",
  twitterCard: "summary_large_image",
};

const businessId = `${SITE_URL}/#business`;

export const TOLDOS_PAGE_JSON_LD = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${TOLDOS_SEO.canonical}#webpage`,
    url: TOLDOS_SEO.canonical,
    name: TOLDOS_SEO.title,
    description: TOLDOS_SEO.description,
    inLanguage: "es-ES",
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": businessId },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: TOLDOS_SEO.ogImage,
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${TOLDOS_SEO.canonical}#breadcrumbs`,
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
        name: "Toldos y protección solar",
        item: TOLDOS_SEO.canonical,
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${TOLDOS_SEO.canonical}#service`,
    name: "Instalación de toldos en Castellón",
    serviceType:
      "Toldos a medida, instalación de toldos y protección solar exterior",
    provider: { "@id": businessId },
    areaServed: PRIMARY_SERVICE_AREA_SERVED,
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      url: TOLDOS_SEO.canonical,
    },
  },
];

export const TOLDOS_FAQ_ITEMS = [
  {
    q: "¿Qué tipo de toldo necesito: extensible o cofre?",
    a: "Depende de la exposición, del uso diario y del nivel de protección que busques. El toldo cofre protege el tejido y el mecanismo cuando está recogido, mientras que el extensible ofrece una solución ligera y muy versátil para terrazas y balcones.",
    aText:
      "Depende de la exposición, del uso diario y del nivel de protección que busques. El toldo cofre protege el tejido y el mecanismo cuando está recogido, mientras que el extensible ofrece una solución ligera y muy versátil para terrazas y balcones.",
  },
  {
    q: "¿Instaláis toldos en viviendas y negocios?",
    a: "Sí. Instalamos toldos a medida tanto en viviendas como en locales, restaurantes, cafeterías, terrazas comerciales y otros espacios exteriores que necesiten protección solar.",
    aText:
      "Sí. Instalamos toldos a medida tanto en viviendas como en locales, restaurantes, cafeterías, terrazas comerciales y otros espacios exteriores que necesiten protección solar.",
  },
  {
    q: "¿Se puede motorizar un toldo?",
    a: "Sí. Podemos instalar toldos motorizados con mando, app, sensores de viento o sol y opciones de automatización. También te asesoramos si quieres integrar el sistema con otros productos del hogar o del negocio.",
    aText:
      "Sí. Podemos instalar toldos motorizados con mando, app, sensores de viento o sol y opciones de automatización. También te asesoramos si quieres integrar el sistema con otros productos del hogar o del negocio.",
  },
  {
    q: "¿Incluís visita, medición e instalación?",
    a: "Sí. Realizamos visita, medición, propuesta y una instalación profesional adaptada al tipo de fachada, estructura o espacio exterior.",
    aText:
      "Sí. Realizamos visita, medición, propuesta y una instalación profesional adaptada al tipo de fachada, estructura o espacio exterior.",
  },
  {
    q: "¿Qué pasa si hace viento?",
    a: "Podemos incorporar sensores de viento para que el toldo se recoja automáticamente cuando detecta rachas, reduciendo riesgos y mejorando la protección del sistema.",
    aText:
      "Podemos incorporar sensores de viento para que el toldo se recoja automáticamente cuando detecta rachas, reduciendo riesgos y mejorando la protección del sistema.",
  },
  {
    q: "¿Trabajáis en Castellón y alrededores?",
    a: "Sí. Realizamos instalaciones de toldos en Castellón y zonas cercanas, estudiando cada caso para recomendar la solución más adecuada según orientación, uso y medidas.",
    aText:
      "Sí. Realizamos instalaciones de toldos en Castellón y zonas cercanas, estudiando cada caso para recomendar la solución más adecuada según orientación, uso y medidas.",
  },
];

export const TOLDOS_FAQ_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${TOLDOS_SEO.canonical}#faq`,
  mainEntity: TOLDOS_FAQ_ITEMS.map(({ q, aText }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: {
      "@type": "Answer",
      text: aText,
    },
  })),
};

export function getToldosMetaDescriptors() {
  return [
    { title: TOLDOS_SEO.title },
    { name: "description", content: TOLDOS_SEO.description },
    { name: "robots", content: TOLDOS_SEO.robots },
    {
      tagName: "link",
      rel: "canonical",
      href: TOLDOS_SEO.canonical,
    },
    { property: "og:site_name", content: TOLDOS_SEO.siteName },
    { property: "og:type", content: TOLDOS_SEO.ogType },
    { property: "og:locale", content: TOLDOS_SEO.ogLocale },
    { property: "og:url", content: TOLDOS_SEO.canonical },
    { property: "og:title", content: TOLDOS_SEO.title },
    { property: "og:description", content: TOLDOS_SEO.description },
    { property: "og:image", content: TOLDOS_SEO.ogImage },
    { property: "og:image:alt", content: TOLDOS_SEO.ogImageAlt },
    { property: "og:image:width", content: TOLDOS_SEO.ogImageWidth },
    { property: "og:image:height", content: TOLDOS_SEO.ogImageHeight },
    { name: "twitter:card", content: TOLDOS_SEO.twitterCard },
    { name: "twitter:title", content: TOLDOS_SEO.title },
    { name: "twitter:description", content: TOLDOS_SEO.description },
    { name: "twitter:image", content: TOLDOS_SEO.ogImage },
    { name: "twitter:image:alt", content: TOLDOS_SEO.ogImageAlt },
    { "script:ld+json": TOLDOS_PAGE_JSON_LD },
    { "script:ld+json": TOLDOS_FAQ_JSON_LD },
  ];
}
