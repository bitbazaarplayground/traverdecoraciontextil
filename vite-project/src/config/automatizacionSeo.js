import { CONTACT } from "./contact.js";
import { getCanonicalPath, PUBLIC_ROUTES } from "./publicRoutes.js";

const SITE_URL = "https://www.traverdecoraciontextil.es";

function getPublicRoute(path) {
  const route = PUBLIC_ROUTES.find((candidate) => candidate.path === path);

  if (!route) {
    throw new Error(`Missing public route manifest entry: ${path}`);
  }

  return route;
}

function createSeo(path, metadata) {
  const route = getPublicRoute(path);

  return {
    path: route.path,
    canonical: `${SITE_URL}${route.canonicalPath}`,
    robots: "index,follow",
    siteName: CONTACT.siteName || "Traver Decoración Textil",
    ogType: "website",
    ogLocale: "es_ES",
    ogImage: `${SITE_URL}/og.png`,
    twitterCard: "summary_large_image",
    ...metadata,
  };
}

function createFaqJsonLd(seo, items) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${seo.canonical}#faq`,
    mainEntity: items.map(({ q, aText }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: {
        "@type": "Answer",
        text: aText,
      },
    })),
  };
}

function getMetaDescriptors({ seo, pageJsonLd, faqJsonLd, heroPreload }) {
  const descriptors = [
    { title: seo.title },
    { name: "description", content: seo.description },
    { name: "robots", content: seo.robots },
    { tagName: "link", rel: "canonical", href: seo.canonical },
  ];

  if (heroPreload) {
    descriptors.push({
      tagName: "link",
      rel: "preload",
      as: "image",
      href: heroPreload.href,
      imageSrcSet: heroPreload.imageSrcSet,
      imageSizes: heroPreload.imageSizes,
    });
  }

  descriptors.push(
    { property: "og:site_name", content: seo.siteName },
    { property: "og:type", content: seo.ogType },
    { property: "og:locale", content: seo.ogLocale },
    { property: "og:url", content: seo.canonical },
    { property: "og:title", content: seo.title },
    { property: "og:description", content: seo.description },
    { property: "og:image", content: seo.ogImage },
    { property: "og:image:alt", content: seo.ogImageAlt }
  );

  if (seo.ogImageWidth && seo.ogImageHeight) {
    descriptors.push(
      { property: "og:image:width", content: seo.ogImageWidth },
      { property: "og:image:height", content: seo.ogImageHeight }
    );
  }

  descriptors.push(
    { name: "twitter:card", content: seo.twitterCard },
    { name: "twitter:title", content: seo.title },
    { name: "twitter:description", content: seo.description },
    { name: "twitter:image", content: seo.ogImage },
    { name: "twitter:image:alt", content: seo.ogImageAlt },
    { "script:ld+json": pageJsonLd },
    { "script:ld+json": faqJsonLd }
  );

  return descriptors;
}

const businessId = `${SITE_URL}/#business`;

export const AUTOMATIZACION_SEO = createSeo("/automatizacion", {
  title:
    "Automatización Somfy en Castellón | Cortinas, estores, persianas y toldos motorizados",
  description:
    "Automatización Somfy en Castellón para cortinas, estores, persianas y toldos motorizados. Sensores, escenas y control por app con instalación profesional y asesoramiento a medida.",
  ogImageAlt: "Automatización Somfy para cortinas y toldos a medida",
  ogImageWidth: "1200",
  ogImageHeight: "630",
});

export const AUTOMATIZACION_PAGE_JSON_LD = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${AUTOMATIZACION_SEO.canonical}#service`,
    name: "Automatización Somfy",
    serviceType: "Automatización de cortinas, estores, persianas y toldos",
    image: AUTOMATIZACION_SEO.ogImage,
    brand: { "@type": "Brand", name: "Somfy" },
    provider: {
      "@type": "HomeAndConstructionBusiness",
      "@id": businessId,
      name: AUTOMATIZACION_SEO.siteName,
      url: `${SITE_URL}/`,
      telephone: CONTACT.phoneLandline,
    },
    areaServed: [
      { "@type": "City", name: "Almassora" },
      { "@type": "City", name: "Castellón de la Plana" },
      { "@type": "AdministrativeArea", name: "Castellón" },
    ],
    url: AUTOMATIZACION_SEO.canonical,
    description: AUTOMATIZACION_SEO.description,
  },
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${AUTOMATIZACION_SEO.canonical}#webpage`,
    url: AUTOMATIZACION_SEO.canonical,
    name: AUTOMATIZACION_SEO.title,
    description: AUTOMATIZACION_SEO.description,
    inLanguage: "es-ES",
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${AUTOMATIZACION_SEO.canonical}#service` },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: AUTOMATIZACION_SEO.ogImage,
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${AUTOMATIZACION_SEO.canonical}#breadcrumb`,
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
        name: "Automatización",
        item: AUTOMATIZACION_SEO.canonical,
      },
    ],
  },
];

export const AUTOMATIZACION_FAQ_ITEMS = [
  {
    q: "¿Se puede empezar por una zona y ampliar después?",
    a: "Sí. Diseñamos una base sólida (motores + control) para que puedas añadir estancias o productos sin rehacerlo todo.",
    aText:
      "Sí. Diseñamos una base sólida (motores + control) para que puedas añadir estancias o productos sin rehacerlo todo.",
  },
  {
    q: "¿La instalación se nota? (cajas, cableado, estética)",
    a: "Nuestro enfoque es “estética primero”: solución discreta, remates limpios y configuración final para que solo se vea el resultado.",
    aText:
      "Nuestro enfoque es “estética primero”: solución discreta, remates limpios y configuración final para que solo se vea el resultado.",
  },
  {
    q: "¿Necesito domótica completa para usar Somfy?",
    a: "No. Puedes empezar con app, mando o escenas simples. Si quieres integrar más adelante, lo dejamos preparado.",
    aText:
      "No. Puedes empezar con app, mando o escenas simples. Si quieres integrar más adelante, lo dejamos preparado.",
  },
  {
    q: "¿Se puede automatizar una instalación que ya tengo en casa?",
    a: "En muchos casos, sí. Estudiamos el tipo de cortina, estor, persiana o toldo existente y te proponemos la opción más adecuada para motorizarlo o renovarlo con una solución más completa.",
    aText:
      "En muchos casos, sí. Estudiamos el tipo de cortina, estor, persiana o toldo existente y te proponemos la opción más adecuada para motorizarlo o renovarlo con una solución más completa.",
  },
  {
    q: "¿Hace falta obra para automatizar cortinas, estores o toldos?",
    a: "No siempre. Depende del producto y de la instalación existente. En muchos casos podemos plantear una solución limpia y discreta, minimizando la intervención y respetando la estética del espacio.",
    aText:
      "No siempre. Depende del producto y de la instalación existente. En muchos casos podemos plantear una solución limpia y discreta, minimizando la intervención y respetando la estética del espacio.",
  },
  {
    q: "¿Qué productos se pueden automatizar?",
    a: "Trabajamos soluciones de automatización para cortinas, estores, persianas y toldos, adaptando motores, controles y escenas al uso real de cada espacio.",
    aText:
      "Trabajamos soluciones de automatización para cortinas, estores, persianas y toldos, adaptando motores, controles y escenas al uso real de cada espacio.",
  },
];

export const AUTOMATIZACION_FAQ_JSON_LD = createFaqJsonLd(
  AUTOMATIZACION_SEO,
  AUTOMATIZACION_FAQ_ITEMS
);

export const AUTOMATIZACION_COMPLETA_SEO = createSeo(
  "/automatizacion/completa",
  {
    title:
      "Automatización integral Somfy | Casa inteligente con cortinas y toldos en Castellón y Valencia",
    description:
      "Automatización integral Somfy para vivienda: cortinas, estores, persianas y toldos con sensores, escenas y control por app. Instalación profesional en Castellón y Valencia. Presupuesto orientativo y asesoramiento.",
    ogImageAlt:
      "Automatización integral Somfy para cortinas, estores, persianas y toldos",
    ogImageWidth: "1200",
    ogImageHeight: "630",
  }
);

export const AUTOMATIZACION_COMPLETA_HERO_PRELOAD = {
  href: "/automatizacion/domotica1-800.webp",
  imageSrcSet:
    "/automatizacion/domotica1-400.webp 400w, /automatizacion/domotica1-600.webp 600w, /automatizacion/domotica1-800.webp 800w, /automatizacion/domotica1-1200.webp 1200w",
  imageSizes: "100vw",
};

export const AUTOMATIZACION_COMPLETA_PAGE_JSON_LD = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${AUTOMATIZACION_COMPLETA_SEO.canonical}#service`,
    name: "Automatización integral Somfy",
    serviceType:
      "Automatización integral de cortinas, estores, persianas y toldos",
    provider: {
      "@type": "HomeAndConstructionBusiness",
      "@id": businessId,
      name: AUTOMATIZACION_COMPLETA_SEO.siteName,
      url: `${SITE_URL}/`,
      telephone: CONTACT.phoneLandline,
    },
    areaServed: [
      { "@type": "AdministrativeArea", name: "Castellón" },
      { "@type": "AdministrativeArea", name: "Valencia" },
    ],
    url: AUTOMATIZACION_COMPLETA_SEO.canonical,
    description: AUTOMATIZACION_COMPLETA_SEO.description,
  },
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${AUTOMATIZACION_COMPLETA_SEO.canonical}#webpage`,
    url: AUTOMATIZACION_COMPLETA_SEO.canonical,
    name: AUTOMATIZACION_COMPLETA_SEO.title,
    description: AUTOMATIZACION_COMPLETA_SEO.description,
    inLanguage: "es-ES",
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${AUTOMATIZACION_COMPLETA_SEO.canonical}#service` },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: AUTOMATIZACION_COMPLETA_SEO.ogImage,
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${AUTOMATIZACION_COMPLETA_SEO.canonical}#breadcrumb`,
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
        name: "Automatización completa",
        item: AUTOMATIZACION_COMPLETA_SEO.canonical,
      },
    ],
  },
];

// The Vite SPA retains the exact existing pair while Framework Mode adds the
// route's static breadcrumb through the descriptor above.
export const AUTOMATIZACION_COMPLETA_LEGACY_PAGE_JSON_LD =
  AUTOMATIZACION_COMPLETA_PAGE_JSON_LD.slice(0, 2);

export const AUTOMATIZACION_COMPLETA_FAQ_ITEMS = [
  {
    q: "¿Por qué elegir Traver en lugar de una franquicia?",
    aText:
      "Porque aquí no solo compras el producto: tienes asesoramiento, medición, instalación profesional, configuración y soporte. En automatización la diferencia suele estar en el montaje, ajustes y postventa.",
  },
  {
    q: "¿Los precios son cerrados?",
    aText:
      "Los packs son precios desde. El coste final depende de medidas, tejido, tipo de motor, marca y extras (sensores, centralización, control móvil).",
  },
  {
    q: "¿Cuánto tarda la instalación?",
    aText:
      "Normalmente 1 día para packs pequeños y 1–2 días para viviendas completas, según el número de elementos.",
  },
  {
    q: "¿Se puede controlar desde el móvil?",
    aText:
      "Sí, en muchos casos. Depende del sistema y la marca elegidos. En la visita te proponemos la opción adecuada para tu presupuesto.",
  },
  {
    q: "¿Qué incluye siempre Traver?",
    aText:
      "Medición, asesoramiento, instalación, puesta en marcha, ajustes y soporte post-instalación.",
  },
];

export const AUTOMATIZACION_COMPLETA_FAQ_JSON_LD = createFaqJsonLd(
  AUTOMATIZACION_COMPLETA_SEO,
  AUTOMATIZACION_COMPLETA_FAQ_ITEMS
);

export const AUTOMATIZACION_INDIVIDUAL_SEO = createSeo(
  "/automatizacion/individual",
  {
    title:
      "Automatización individual | Cortinas, screens y toldos motorizados en Castellón y Valencia",
    description:
      "Automatiza por zonas: cortinas y estores motorizados, screens y persianas, o toldos con WiFi y app. Instalación profesional, configuración guiada y soporte en Castellón y Valencia.",
    ogImageAlt: "Automatización toldos y cortinas — Traver Decoración Textil",
  }
);

export const AUTOMATIZACION_INDIVIDUAL_HERO_PRELOAD = {
  href: "/automatizacion/heroInd-800.webp",
  imageSrcSet:
    "/automatizacion/heroInd-400.webp 400w, /automatizacion/heroInd-600.webp 600w, /automatizacion/heroInd-800.webp 800w, /automatizacion/heroInd-1200.webp 1200w",
  imageSizes: "100vw",
};

const AUTOMATIZACION_INDIVIDUAL_SERVICE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${AUTOMATIZACION_INDIVIDUAL_SEO.canonical}#service`,
  name: "Automatización individual",
  areaServed: CONTACT.areaServed?.map((name) => ({
    "@type": "AdministrativeArea",
    name,
  })),
  provider: {
    "@type": "Organization",
    name: AUTOMATIZACION_INDIVIDUAL_SEO.siteName,
    telephone: CONTACT.phoneLandline,
    email: CONTACT.email,
    url: `${SITE_URL}/`,
  },
  url: AUTOMATIZACION_INDIVIDUAL_SEO.canonical,
  description: AUTOMATIZACION_INDIVIDUAL_SEO.description,
};

export const AUTOMATIZACION_INDIVIDUAL_PAGE_JSON_LD = [
  AUTOMATIZACION_INDIVIDUAL_SERVICE_JSON_LD,
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${AUTOMATIZACION_INDIVIDUAL_SEO.canonical}#webpage`,
    url: AUTOMATIZACION_INDIVIDUAL_SEO.canonical,
    name: AUTOMATIZACION_INDIVIDUAL_SEO.title,
    description: AUTOMATIZACION_INDIVIDUAL_SEO.description,
    inLanguage: "es-ES",
    isPartOf: {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: AUTOMATIZACION_INDIVIDUAL_SEO.siteName,
    },
    about: { "@id": `${AUTOMATIZACION_INDIVIDUAL_SEO.canonical}#service` },
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${AUTOMATIZACION_INDIVIDUAL_SEO.canonical}#breadcrumb`,
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
        name: "Automatización individual",
        item: AUTOMATIZACION_INDIVIDUAL_SEO.canonical,
      },
    ],
  },
];

// Preserve the existing Vite schema shape, where Service is nested in the
// page's `about` property. Framework Mode emits the linked entities above.
export const AUTOMATIZACION_INDIVIDUAL_LEGACY_PAGE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${AUTOMATIZACION_INDIVIDUAL_SEO.canonical}#webpage`,
  url: AUTOMATIZACION_INDIVIDUAL_SEO.canonical,
  name: AUTOMATIZACION_INDIVIDUAL_SEO.title,
  description: AUTOMATIZACION_INDIVIDUAL_SEO.description,
  inLanguage: "es-ES",
  isPartOf: {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: `${SITE_URL}/`,
    name: AUTOMATIZACION_INDIVIDUAL_SEO.siteName,
  },
  about: {
    "@type": "Service",
    name: "Automatización individual",
    areaServed: CONTACT.areaServed?.map((name) => ({
      "@type": "AdministrativeArea",
      name,
    })),
    provider: {
      "@type": "Organization",
      name: AUTOMATIZACION_INDIVIDUAL_SEO.siteName,
      telephone: CONTACT.phoneLandline,
      email: CONTACT.email,
      url: `${SITE_URL}/`,
    },
  },
};

export const AUTOMATIZACION_INDIVIDUAL_FAQ_ITEMS = [
  {
    q: "¿Puedo empezar solo con una estancia y ampliar después?",
    a: "Sí. Puedes motorizar una cortina, un screen o un toldo en una sola estancia y ampliar más adelante. Diseñamos la base para que futuras automatizaciones queden integradas y fáciles de usar.",
    aText:
      "Sí. Puedes motorizar una cortina, un screen o un toldo en una sola estancia y ampliar más adelante. Diseñamos la base para que futuras automatizaciones queden integradas y fáciles de usar.",
  },
  {
    q: "¿Necesito hacer obra para motorizar cortinas o persianas?",
    a: "En la mayoría de casos no es necesaria obra. Buscamos una instalación limpia y discreta, cuidando cableado, remates y ajustes para que solo se note el resultado.",
    aText:
      "En la mayoría de casos no es necesaria obra. Buscamos una instalación limpia y discreta, cuidando cableado, remates y ajustes para que solo se note el resultado.",
  },
  {
    q: "¿Se controla con mando, con móvil o con ambos?",
    a: "Depende del sistema elegido. Podemos configurar control por mando, por app móvil o ambas opciones. En la visita te recomendamos la solución adecuada según uso y presupuesto.",
    aText:
      "Depende del sistema elegido. Podemos configurar control por mando, por app móvil o ambas opciones. En la visita te recomendamos la solución adecuada según uso y presupuesto.",
  },
  {
    q: "¿Cuánto tarda la instalación?",
    a: "En la mayoría de proyectos de automatización por estancia, la instalación se realiza en una sola visita. El tiempo final depende de las medidas y del número de elementos a motorizar.",
    aText:
      "En la mayoría de proyectos de automatización por estancia, la instalación se realiza en una sola visita. El tiempo final depende de las medidas y del número de elementos a motorizar.",
  },
];

export const AUTOMATIZACION_INDIVIDUAL_FAQ_JSON_LD = createFaqJsonLd(
  AUTOMATIZACION_INDIVIDUAL_SEO,
  AUTOMATIZACION_INDIVIDUAL_FAQ_ITEMS
);

export function getAutomatizacionMetaDescriptors() {
  return getMetaDescriptors({
    seo: AUTOMATIZACION_SEO,
    pageJsonLd: AUTOMATIZACION_PAGE_JSON_LD,
    faqJsonLd: AUTOMATIZACION_FAQ_JSON_LD,
  });
}

export function getAutomatizacionCompletaMetaDescriptors() {
  return getMetaDescriptors({
    seo: AUTOMATIZACION_COMPLETA_SEO,
    pageJsonLd: AUTOMATIZACION_COMPLETA_PAGE_JSON_LD,
    faqJsonLd: AUTOMATIZACION_COMPLETA_FAQ_JSON_LD,
    heroPreload: AUTOMATIZACION_COMPLETA_HERO_PRELOAD,
  });
}

export function getAutomatizacionIndividualMetaDescriptors() {
  return getMetaDescriptors({
    seo: AUTOMATIZACION_INDIVIDUAL_SEO,
    pageJsonLd: AUTOMATIZACION_INDIVIDUAL_PAGE_JSON_LD,
    faqJsonLd: AUTOMATIZACION_INDIVIDUAL_FAQ_JSON_LD,
    heroPreload: AUTOMATIZACION_INDIVIDUAL_HERO_PRELOAD,
  });
}
