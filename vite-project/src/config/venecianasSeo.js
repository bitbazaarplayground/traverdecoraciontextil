import { CONTACT } from "./contact.js";
import { getCanonicalPath, PUBLIC_ROUTES } from "./publicRoutes.js";

const SITE_URL = "https://www.traverdecoraciontextil.es";
const VENECIANAS_PATH = "/venecianas";
const venecianasRoute = PUBLIC_ROUTES.find(({ path }) => path === VENECIANAS_PATH);

if (!venecianasRoute) {
  throw new Error(`Missing public route manifest entry: ${VENECIANAS_PATH}`);
}

export const VENECIANAS_SEO = {
  path: venecianasRoute.path,
  canonical: `${SITE_URL}${venecianasRoute.canonicalPath}`,
  title:
    "Venecianas a medida | Traver Decoración Textil (Castellón y Valencia)",
  description:
    "Venecianas a medida en Almassora: controla la luz con precisión y gana privacidad sin perder claridad. Opciones en aluminio y madera, medición e instalación profesional en Castellón y Valencia.",
  robots: "index,follow",
  siteName: CONTACT.siteName,
  ogType: "website",
  ogLocale: "es_ES",
  ogImage: `${SITE_URL}/og.png`,
  ogImageAlt: "Venecianas a medida — Traver Decoración Textil",
  twitterCard: "summary_large_image",
};

export const VENECIANAS_FAQ_ITEMS = [
  {
    q: "¿Qué veneciana elegir: aluminio o madera?",
    a: "Aluminio es ideal para baños, cocinas o uso intensivo por su resistencia y mantenimiento. La madera aporta calidez y un acabado más decorativo en salones o despachos.",
    aText:
      "Aluminio es ideal para baños, cocinas o uso intensivo por su resistencia y mantenimiento. La madera aporta calidez y un acabado más decorativo en salones o despachos.",
  },
  {
    q: "¿Se puede regular la privacidad sin perder luz?",
    a: "Sí. La gran ventaja es orientar las lamas: filtras la entrada de luz y controlas las vistas, manteniendo claridad en el interior.",
    aText:
      "Sí. La gran ventaja es orientar las lamas: filtras la entrada de luz y controlas las vistas, manteniendo claridad en el interior.",
  },
  {
    q: "¿Qué ancho de lama recomendáis?",
    a: "Depende del tamaño de la ventana y del estilo. Lamas más anchas se ven más “arquitectónicas” y limpias; lamas más estrechas son discretas y técnicas.",
    aText:
      "Depende del tamaño de la ventana y del estilo. Lamas más anchas se ven más “arquitectónicas” y limpias; lamas más estrechas son discretas y técnicas.",
  },
  {
    q: "¿Hacéis medición e instalación?",
    a: "Sí. Medimos, aconsejamos color y accionamiento, y realizamos una instalación limpia para que el resultado quede alineado y cómodo en el día a día.",
    aText:
      "Sí. Medimos, aconsejamos color y accionamiento, y realizamos una instalación limpia para que el resultado quede alineado y cómodo en el día a día.",
  },
  {
    q: "¿Son una buena opción para oficina?",
    a: "Mucho. Ayudan a evitar reflejos en pantallas, controlan el deslumbramiento y permiten un ajuste fino según la hora del día.",
    aText:
      "Mucho. Ayudan a evitar reflejos en pantallas, controlan el deslumbramiento y permiten un ajuste fino según la hora del día.",
  },
];

export const VENECIANAS_PAGE_JSON_LD = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${VENECIANAS_SEO.canonical}#webpage`,
    url: VENECIANAS_SEO.canonical,
    name: VENECIANAS_SEO.title,
    description: VENECIANAS_SEO.description,
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
        name: "Venecianas",
        item: VENECIANAS_SEO.canonical,
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${VENECIANAS_SEO.canonical}#service`,
    name: "Venecianas a medida",
    description: VENECIANAS_SEO.description,
    areaServed: [
      { "@type": "AdministrativeArea", name: "Castellón" },
      { "@type": "AdministrativeArea", name: "Valencia" },
    ],
    provider: {
      "@type": "LocalBusiness",
      name: VENECIANAS_SEO.siteName,
      url: `${SITE_URL}/`,
      telephone: CONTACT.phoneLandline,
      email: CONTACT.email,
      address: { "@type": "PostalAddress", ...CONTACT.address },
    },
  },
];

export const VENECIANAS_FAQ_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: VENECIANAS_FAQ_ITEMS.map(({ q, aText }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: aText },
  })),
  "@id": `${VENECIANAS_SEO.canonical}#faq`,
};

export function getVenecianasMetaDescriptors() {
  return [
    { title: VENECIANAS_SEO.title },
    { name: "description", content: VENECIANAS_SEO.description },
    { name: "robots", content: VENECIANAS_SEO.robots },
    { tagName: "link", rel: "canonical", href: VENECIANAS_SEO.canonical },
    { property: "og:site_name", content: VENECIANAS_SEO.siteName },
    { property: "og:type", content: VENECIANAS_SEO.ogType },
    { property: "og:locale", content: VENECIANAS_SEO.ogLocale },
    { property: "og:url", content: VENECIANAS_SEO.canonical },
    { property: "og:title", content: VENECIANAS_SEO.title },
    { property: "og:description", content: VENECIANAS_SEO.description },
    { property: "og:image", content: VENECIANAS_SEO.ogImage },
    { property: "og:image:alt", content: VENECIANAS_SEO.ogImageAlt },
    { name: "twitter:card", content: VENECIANAS_SEO.twitterCard },
    { name: "twitter:title", content: VENECIANAS_SEO.title },
    { name: "twitter:description", content: VENECIANAS_SEO.description },
    { name: "twitter:image", content: VENECIANAS_SEO.ogImage },
    { name: "twitter:image:alt", content: VENECIANAS_SEO.ogImageAlt },
    { "script:ld+json": VENECIANAS_PAGE_JSON_LD },
    { "script:ld+json": VENECIANAS_FAQ_JSON_LD },
  ];
}
