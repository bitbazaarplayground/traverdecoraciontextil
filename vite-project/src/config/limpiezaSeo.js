import { CONTACT, PRIMARY_SERVICE_AREA_SERVED } from "./contact.js";
import { PUBLIC_ROUTES } from "./publicRoutes.js";

const SITE_URL = "https://www.traverdecoraciontextil.es";
const LIMPIEZA_PATH = "/limpieza";
const limpiezaRoute = PUBLIC_ROUTES.find(({ path }) => path === LIMPIEZA_PATH);

if (!limpiezaRoute) {
  throw new Error(`Missing public route manifest entry: ${LIMPIEZA_PATH}`);
}

export const LIMPIEZA_SEO = {
  path: limpiezaRoute.path,
  canonical: `${SITE_URL}${limpiezaRoute.canonicalPath}`,
  title:
    "Limpieza de cortinas y textiles decorativos | Traver Decoración Textil",
  description:
    "Servicio profesional de limpieza y mantenimiento para cortinas, visillos y textiles decorativos, con opción de desmontaje, limpieza y montaje a domicilio.",
  robots: "index,follow,max-image-preview:large",
  siteName: CONTACT.siteName || "Traver Decoración Textil",
  ogType: "website",
  ogLocale: "es_ES",
  ogImage: `${SITE_URL}/limpieza/limpieza-1280.webp`,
  ogImageAlt:
    "Servicio de limpieza y mantenimiento de cortinas y textiles decorativos",
  ogImageWidth: "1280",
  ogImageHeight: "720",
  twitterCard: "summary_large_image",
};

export const LIMPIEZA_FAQ_ITEMS = [
  {
    q: "¿Qué tipo de cortinas y textiles podéis limpiar?",
    a: "Trabajamos con cortinas, visillos y otros textiles decorativos, siempre valorando previamente el tipo de tejido, la confección y el sistema de instalación para aplicar el cuidado más adecuado.",
    aText:
      "Trabajamos con cortinas, visillos y otros textiles decorativos, siempre valorando previamente el tipo de tejido, la confección y el sistema de instalación para aplicar el cuidado más adecuado.",
  },
  {
    q: "¿Incluye desmontaje y montaje?",
    a: "Sí. Puedes elegir una opción básica de limpieza o el servicio completo a domicilio, que incluye desplazamiento, descolgado, limpieza y colocación de nuevo.",
    aText:
      "Sí. Puedes elegir una opción básica de limpieza o el servicio completo a domicilio, que incluye desplazamiento, descolgado, limpieza y colocación de nuevo.",
  },
  {
    q: "¿Los precios son fijos?",
    a: "Los importes mostrados son precios base desde los que partir. Algunas piezas especiales, medidas grandes o tejidos delicados pueden requerir una valoración previa.",
    aText:
      "Los importes mostrados son precios base desde los que partir. Algunas piezas especiales, medidas grandes o tejidos delicados pueden requerir valoración previa.",
  },
  {
    q: "¿Puedo solicitar solo la limpieza sin visita a domicilio?",
    a: "Sí. Si no necesitas desmontaje ni montaje, puedes contratar únicamente la limpieza de la pieza.",
    aText:
      "Sí. Si no necesitas desmontaje ni montaje, puedes contratar únicamente la limpieza de la pieza.",
  },
  {
    q: "¿Este servicio es útil como mantenimiento periódico?",
    a: "Sí. Es una muy buena opción para viviendas habituales, segundas residencias o espacios donde se quiere conservar la presencia del textil en perfecto estado durante más tiempo.",
    aText:
      "Sí. Es una muy buena opción para viviendas habituales, segundas residencias o espacios donde se quiere conservar la presencia del textil en perfecto estado durante más tiempo.",
  },
];

export const LIMPIEZA_PAGE_JSON_LD = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${LIMPIEZA_SEO.canonical}#service`,
    name: "Limpieza y mantenimiento de textiles decorativos",
    serviceType: "Limpieza de cortinas y textiles decorativos",
    description: LIMPIEZA_SEO.description,
    url: LIMPIEZA_SEO.canonical,
    image: LIMPIEZA_SEO.ogImage,
    areaServed: PRIMARY_SERVICE_AREA_SERVED,
    provider: {
      "@type": "LocalBusiness",
      name: LIMPIEZA_SEO.siteName,
      url: SITE_URL,
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${LIMPIEZA_SEO.canonical}#webpage`,
    url: LIMPIEZA_SEO.canonical,
    name: LIMPIEZA_SEO.title,
    description: LIMPIEZA_SEO.description,
    inLanguage: "es-ES",
    isPartOf: {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: LIMPIEZA_SEO.siteName,
    },
    about: { "@id": `${LIMPIEZA_SEO.canonical}#service` },
    primaryImageOfPage: { "@type": "ImageObject", url: LIMPIEZA_SEO.ogImage },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: LIMPIEZA_FAQ_ITEMS.map(({ q, aText }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: aText },
    })),
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: `${SITE_URL}/` },
      {
        "@type": "ListItem",
        position: 2,
        name: "Limpieza",
        item: LIMPIEZA_SEO.canonical,
      },
    ],
  },
];

export function getLimpiezaMetaDescriptors() {
  return [
    { title: LIMPIEZA_SEO.title },
    { name: "description", content: LIMPIEZA_SEO.description },
    { name: "robots", content: LIMPIEZA_SEO.robots },
    { tagName: "link", rel: "canonical", href: LIMPIEZA_SEO.canonical },
    { property: "og:site_name", content: LIMPIEZA_SEO.siteName },
    { property: "og:type", content: LIMPIEZA_SEO.ogType },
    { property: "og:locale", content: LIMPIEZA_SEO.ogLocale },
    { property: "og:url", content: LIMPIEZA_SEO.canonical },
    { property: "og:title", content: LIMPIEZA_SEO.title },
    { property: "og:description", content: LIMPIEZA_SEO.description },
    { property: "og:image", content: LIMPIEZA_SEO.ogImage },
    { property: "og:image:alt", content: LIMPIEZA_SEO.ogImageAlt },
    { property: "og:image:width", content: LIMPIEZA_SEO.ogImageWidth },
    { property: "og:image:height", content: LIMPIEZA_SEO.ogImageHeight },
    { name: "twitter:card", content: LIMPIEZA_SEO.twitterCard },
    { name: "twitter:title", content: LIMPIEZA_SEO.title },
    { name: "twitter:description", content: LIMPIEZA_SEO.description },
    { name: "twitter:image", content: LIMPIEZA_SEO.ogImage },
    { name: "twitter:image:alt", content: LIMPIEZA_SEO.ogImageAlt },
    { "script:ld+json": LIMPIEZA_PAGE_JSON_LD },
  ];
}
