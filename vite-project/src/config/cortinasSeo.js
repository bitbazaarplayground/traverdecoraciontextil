import { CONTACT } from "./contact.js";
import { PUBLIC_ROUTES } from "./publicRoutes.js";

const SITE_URL = "https://www.traverdecoraciontextil.es";
const CORTINAS_PATH = "/cortinas-estores";
const cortinasRoute = PUBLIC_ROUTES.find(
  ({ path }) => path === CORTINAS_PATH
);

if (!cortinasRoute) {
  throw new Error(`Missing public route manifest entry: ${CORTINAS_PATH}`);
}

/**
 * Approved cortinas metadata shared by the legacy Helmet implementation and
 * the isolated Framework Mode route module. The route path comes from the
 * public route manifest so it cannot drift from the prerender target.
 */
export const CORTINAS_SEO = {
  path: cortinasRoute.path,
  canonical: `${SITE_URL}${cortinasRoute.path}`,
  title: "Cortinas y estores a medida en Castellón | Medición e instalación",
  description:
    "Cortinas y estores a medida en Castellón: tejidos seleccionados, control de luz y privacidad, medición e instalación profesional para viviendas y negocios.",
  robots: "index,follow",
  siteName: CONTACT.siteName,
  ogType: "website",
  ogLocale: "es_ES",
  ogImage: `${SITE_URL}/og.png`,
  ogImageAlt: "Cortinas y estores a medida — Traver Decoración Textil",
  twitterCard: "summary_large_image",
};

export const CORTINAS_HERO_PRELOAD = {
  href: "/cortinas-estores/cortinas1-1280.webp",
  imagesrcset:
    "/cortinas-estores/cortinas1-768.webp 768w, /cortinas-estores/cortinas1-1280.webp 1280w, /cortinas-estores/cortinas1-1920.webp 1920w",
  imagesizes: "100vw",
};

export const CORTINAS_PAGE_JSON_LD = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${CORTINAS_SEO.canonical}#webpage`,
    url: CORTINAS_SEO.canonical,
    name: CORTINAS_SEO.title,
    description: CORTINAS_SEO.description,
    inLanguage: "es-ES",
    isPartOf: { "@id": `${SITE_URL}/#website` },
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
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
        item: `${SITE_URL}/services`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Cortinas y Estores",
        item: CORTINAS_SEO.canonical,
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${CORTINAS_SEO.canonical}#service`,
    name: "Cortinas y estores a medida",
    description: CORTINAS_SEO.description,
    areaServed: [
      { "@type": "City", name: "Almassora" },
      { "@type": "City", name: "Castellón de la Plana" },
      { "@type": "AdministrativeArea", name: "Castellón" },
    ],
    provider: {
      "@type": "LocalBusiness",
      name: CORTINAS_SEO.siteName,
      url: `${SITE_URL}/`,
      telephone: CONTACT.phoneLandline,
      email: CONTACT.email,
      address: { "@type": "PostalAddress", ...CONTACT.address },
    },
  },
];

export const CORTINAS_FAQ_ITEMS = [
  {
    q: "¿Qué diferencia hay entre cortinas y estores?",
    a: "Las cortinas aportan más presencia textil y caída decorativa; los estores son más minimalistas y prácticos para controlar luz en ventanas con poco espacio. Te recomendamos según uso, estilo y orientación.",
    aText:
      "Las cortinas aportan más presencia textil y caída decorativa; los estores son más minimalistas y prácticos para controlar luz en ventanas con poco espacio. Te recomendamos según uso, estilo y orientación.",
  },
  {
    q: "¿Hacéis visita y medición en casa?",
    a: "Sí. La medición precisa es clave para que el resultado quede perfecto. Te asesoramos sobre tejido, confección y sistema antes de fabricar.",
    aText:
      "Sí. La medición precisa es clave para que el resultado quede perfecto. Te asesoramos sobre tejido, confección y sistema antes de fabricar.",
  },
  {
    q: "¿Tenéis opciones térmicas o blackout?",
    a: "Sí. Hay tejidos térmicos y blackout para reducir entrada de luz y mejorar confort. En dormitorios solemos proponer combinaciones (visillo + blackout) para flexibilidad.",
    aText:
      "Sí. Hay tejidos térmicos y blackout para reducir entrada de luz y mejorar confort. En dormitorios solemos proponer combinaciones (visillo + blackout) para flexibilidad.",
  },
  {
    q: "¿Cuánto tarda el proceso?",
    a: "Depende del tejido y la confección. Tras la visita y la elección, te confirmamos plazos reales de fabricación e instalación.",
    aText:
      "Depende del tejido y la confección. Tras la visita y la elección, te confirmamos plazos reales de fabricación e instalación.",
  },
  {
    q: "¿Instaláis también rieles y sistemas?",
    a: "Sí. Instalamos rieles, barras y sistemas de estor con una puesta a punto final para que el movimiento sea suave y limpio.",
    aText:
      "Sí. Instalamos rieles, barras y sistemas de estor con una puesta a punto final para que el movimiento sea suave y limpio.",
  },
];

export const CORTINAS_FAQ_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: CORTINAS_FAQ_ITEMS.map(({ q, aText }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: {
      "@type": "Answer",
      text: aText,
    },
  })),
  "@id": `${CORTINAS_SEO.canonical}#faq`,
};

export function getCortinasMetaDescriptors() {
  return [
    { title: CORTINAS_SEO.title },
    { name: "description", content: CORTINAS_SEO.description },
    { name: "robots", content: CORTINAS_SEO.robots },
    {
      tagName: "link",
      rel: "canonical",
      href: CORTINAS_SEO.canonical,
    },
    {
      tagName: "link",
      rel: "preload",
      as: "image",
      href: CORTINAS_HERO_PRELOAD.href,
      imageSrcSet: CORTINAS_HERO_PRELOAD.imagesrcset,
      imageSizes: CORTINAS_HERO_PRELOAD.imagesizes,
    },
    { property: "og:site_name", content: CORTINAS_SEO.siteName },
    { property: "og:type", content: CORTINAS_SEO.ogType },
    { property: "og:locale", content: CORTINAS_SEO.ogLocale },
    { property: "og:url", content: CORTINAS_SEO.canonical },
    { property: "og:title", content: CORTINAS_SEO.title },
    { property: "og:description", content: CORTINAS_SEO.description },
    { property: "og:image", content: CORTINAS_SEO.ogImage },
    { property: "og:image:alt", content: CORTINAS_SEO.ogImageAlt },
    { name: "twitter:card", content: CORTINAS_SEO.twitterCard },
    { name: "twitter:title", content: CORTINAS_SEO.title },
    { name: "twitter:description", content: CORTINAS_SEO.description },
    { name: "twitter:image", content: CORTINAS_SEO.ogImage },
    { name: "twitter:image:alt", content: CORTINAS_SEO.ogImageAlt },
    { "script:ld+json": CORTINAS_PAGE_JSON_LD },
    { "script:ld+json": CORTINAS_FAQ_JSON_LD },
  ];
}
