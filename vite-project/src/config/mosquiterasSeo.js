import { CONTACT } from "./contact.js";
import { PUBLIC_ROUTES } from "./publicRoutes.js";

const SITE_URL = "https://www.traverdecoraciontextil.es";
const MOSQUITERAS_PATH = "/mosquiteras";
const mosquiterasRoute = PUBLIC_ROUTES.find(
  ({ path }) => path === MOSQUITERAS_PATH
);

if (!mosquiterasRoute) {
  throw new Error(`Missing public route manifest entry: ${MOSQUITERAS_PATH}`);
}

export const MOSQUITERAS_SEO = {
  path: mosquiterasRoute.path,
  canonical: `${SITE_URL}${mosquiterasRoute.path}`,
  title: `Mosquiteras a medida en Castellón | ${CONTACT.siteName}`,
  description:
    "Mosquiteras a medida en Castellón y provincia para ventanas, balconeras y puertas. Instalación profesional; también atendemos proyectos en Valencia.",
  robots: "index,follow",
  siteName: CONTACT.siteName,
  ogType: "website",
  ogLocale: "es_ES",
  ogImage: `${SITE_URL}/og.png`,
  ogImageAlt:
    "Mosquiteras a medida en Castellón — Traver Decoración Textil",
  ogImageWidth: "1200",
  ogImageHeight: "630",
  twitterCard: "summary_large_image",
};

export const MOSQUITERAS_HERO_PRELOAD = {
  href: "/mosquiteras/terraceMosquitonet-800.webp",
  imageSrcSet:
    "/mosquiteras/terraceMosquitonet-600.webp 768w, /mosquiteras/terraceMosquitonet-800.webp 1280w, /mosquiteras/terraceMosquitonet-1200.webp 1920w",
  imageSizes: "100vw",
};

const businessId = `${SITE_URL}/#business`;

export const MOSQUITERAS_PAGE_JSON_LD = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${MOSQUITERAS_SEO.canonical}#webpage`,
    url: MOSQUITERAS_SEO.canonical,
    name: MOSQUITERAS_SEO.title,
    description: MOSQUITERAS_SEO.description,
    inLanguage: "es-ES",
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": businessId },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: MOSQUITERAS_SEO.ogImage,
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${MOSQUITERAS_SEO.canonical}#service`,
    name: "Mosquiteras a medida en Castellón",
    serviceType: "Instalación de mosquiteras",
    provider: { "@id": businessId },
    areaServed: [
      { "@type": "City", name: "Castellón de la Plana" },
      { "@type": "AdministrativeArea", name: "Provincia de Castellón" },
      { "@type": "AdministrativeArea", name: "Valencia" },
    ],
    url: MOSQUITERAS_SEO.canonical,
    description: MOSQUITERAS_SEO.description,
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${MOSQUITERAS_SEO.canonical}#breadcrumbs`,
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
        name: "Mosquiteras",
        item: MOSQUITERAS_SEO.canonical,
      },
    ],
  },
];

export const MOSQUITERAS_FAQ_ITEMS = [
  {
    q: "¿Qué tipo de mosquitera es mejor para mi ventana o puerta?",
    a: "Depende del tipo de apertura, del espacio disponible y de la frecuencia de uso. Las enrollables suelen funcionar muy bien en ventanas de uso diario; las correderas, en balconeras y ventanales; las plisadas, en accesos al exterior; y las fijas, en huecos donde no necesitas apertura de la mosquitera.",
    aText:
      "Depende del tipo de apertura, del espacio disponible y de la frecuencia de uso. Las enrollables suelen funcionar muy bien en ventanas de uso diario; las correderas, en balconeras y ventanales; las plisadas, en accesos al exterior; y las fijas, en huecos donde no necesitas apertura de la mosquitera.",
  },
  {
    q: "¿Se pueden instalar sin hacer obra?",
    a: "Sí. En la mayoría de los casos la instalación es limpia, rápida y sin obra, adaptando el sistema al hueco y al tipo de carpintería existente.",
    aText:
      "Sí. En la mayoría de los casos la instalación es limpia, rápida y sin obra, adaptando el sistema al hueco y al tipo de carpintería existente.",
  },
  {
    q: "¿Son compatibles con persianas y ventanas oscilobatientes?",
    a: "En muchos casos sí, pero depende del espacio disponible y del sistema existente. Por eso recomendamos revisar cada hueco antes de decidir la solución final.",
    aText:
      "En muchos casos sí, pero depende del espacio disponible y del sistema existente. Por eso recomendamos revisar cada hueco antes de decidir la solución final.",
  },
  {
    q: "¿Qué mantenimiento necesitan?",
    a: "Muy poco. Normalmente basta con una limpieza suave periódica para retirar polvo y mantener la malla en buen estado. Te indicamos también el sistema más adecuado si hay mascotas o uso intensivo.",
    aText:
      "Muy poco. Normalmente basta con una limpieza suave periódica para retirar polvo y mantener la malla en buen estado. Te indicamos también el sistema más adecuado si hay mascotas o uso intensivo.",
  },
  {
    q: "¿Instaláis mosquiteras en Castellón y provincia?",
    a: "Sí. Nuestra zona principal de trabajo es Castellón y provincia. Realizamos medición e instalación profesional para asegurar un ajuste preciso, un funcionamiento cómodo y unos remates limpios. También podemos valorar proyectos en Valencia.",
    aText:
      "Sí. Nuestra zona principal de trabajo es Castellón y provincia. Realizamos medición e instalación profesional para asegurar un ajuste preciso, un funcionamiento cómodo y unos remates limpios. También podemos valorar proyectos en Valencia.",
  },
];

export const MOSQUITERAS_FAQ_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${MOSQUITERAS_SEO.canonical}#faq`,
  mainEntity: MOSQUITERAS_FAQ_ITEMS.map(({ q, aText }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: {
      "@type": "Answer",
      text: aText,
    },
  })),
};

export function getMosquiterasMetaDescriptors() {
  return [
    { title: MOSQUITERAS_SEO.title },
    { name: "description", content: MOSQUITERAS_SEO.description },
    { name: "robots", content: MOSQUITERAS_SEO.robots },
    {
      tagName: "link",
      rel: "canonical",
      href: MOSQUITERAS_SEO.canonical,
    },
    {
      tagName: "link",
      rel: "preload",
      as: "image",
      href: MOSQUITERAS_HERO_PRELOAD.href,
      imageSrcSet: MOSQUITERAS_HERO_PRELOAD.imageSrcSet,
      imageSizes: MOSQUITERAS_HERO_PRELOAD.imageSizes,
    },
    { property: "og:site_name", content: MOSQUITERAS_SEO.siteName },
    { property: "og:type", content: MOSQUITERAS_SEO.ogType },
    { property: "og:locale", content: MOSQUITERAS_SEO.ogLocale },
    { property: "og:url", content: MOSQUITERAS_SEO.canonical },
    { property: "og:title", content: MOSQUITERAS_SEO.title },
    { property: "og:description", content: MOSQUITERAS_SEO.description },
    { property: "og:image", content: MOSQUITERAS_SEO.ogImage },
    { property: "og:image:alt", content: MOSQUITERAS_SEO.ogImageAlt },
    { property: "og:image:width", content: MOSQUITERAS_SEO.ogImageWidth },
    { property: "og:image:height", content: MOSQUITERAS_SEO.ogImageHeight },
    { name: "twitter:card", content: MOSQUITERAS_SEO.twitterCard },
    { name: "twitter:title", content: MOSQUITERAS_SEO.title },
    { name: "twitter:description", content: MOSQUITERAS_SEO.description },
    { name: "twitter:image", content: MOSQUITERAS_SEO.ogImage },
    { name: "twitter:image:alt", content: MOSQUITERAS_SEO.ogImageAlt },
    { "script:ld+json": MOSQUITERAS_PAGE_JSON_LD },
    { "script:ld+json": MOSQUITERAS_FAQ_JSON_LD },
  ];
}
