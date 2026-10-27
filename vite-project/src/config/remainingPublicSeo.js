import { CONTACT } from "./contact.js";
import { PUBLIC_ROUTES } from "./publicRoutes.js";

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
    canonical: `${SITE_URL}${route.path}`,
    siteName: CONTACT.siteName || "Traver Decoración Textil",
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

function getMetaDescriptors({ seo, pageJsonLd, faqJsonLd }) {
  const descriptors = [
    { title: seo.title },
    { name: "description", content: seo.description },
  ];

  if (seo.robots) {
    descriptors.push({ name: "robots", content: seo.robots });
  }

  descriptors.push({
    tagName: "link",
    rel: "canonical",
    href: seo.canonical,
  });

  if (seo.ogSiteName) {
    descriptors.push({ property: "og:site_name", content: seo.siteName });
  }

  if (seo.ogLocale) {
    descriptors.push({ property: "og:locale", content: seo.ogLocale });
  }

  descriptors.push(
    { property: "og:type", content: seo.ogType },
    { property: "og:url", content: seo.canonical },
    { property: "og:title", content: seo.title },
    { property: "og:description", content: seo.description }
  );

  if (seo.ogImage) {
    descriptors.push(
      { property: "og:image", content: seo.ogImage },
      { property: "og:image:alt", content: seo.ogImageAlt }
    );

    if (seo.ogImageWidth && seo.ogImageHeight) {
      descriptors.push(
        { property: "og:image:width", content: seo.ogImageWidth },
        { property: "og:image:height", content: seo.ogImageHeight }
      );
    }
  }

  descriptors.push(
    { name: "twitter:card", content: seo.twitterCard },
    { name: "twitter:title", content: seo.title },
    { name: "twitter:description", content: seo.description }
  );

  if (seo.ogImage) {
    descriptors.push(
      { name: "twitter:image", content: seo.ogImage },
      { name: "twitter:image:alt", content: seo.ogImageAlt }
    );
  }

  descriptors.push({ "script:ld+json": pageJsonLd });

  if (faqJsonLd) {
    descriptors.push({ "script:ld+json": faqJsonLd });
  }

  return descriptors;
}

const BUSINESS_ID = `${SITE_URL}/#business`;
const WEBSITE_ID = `${SITE_URL}/#website`;

export const PROPUESTAS_SEO = createSeo("/propuestas", {
  title:
    "Propuestas a medida de cortinas, toldos y automatización en Castellón y Valencia",
  description:
    "Explora propuestas a medida para dormitorio, salón/comedor y confort con automatización. Cortinas, toldos, tejidos y sistemas con asesoramiento, medición e instalación profesional en Castellón y Valencia.",
  robots: "index,follow",
  ogType: "website",
  ogLocale: "es_ES",
  ogSiteName: true,
  ogImage: `${SITE_URL}/og.png`,
  ogImageAlt: "Propuestas a medida de Traver Decoración Textil",
  ogImageWidth: "1200",
  ogImageHeight: "630",
  twitterCard: "summary_large_image",
});

const PROPUESTAS_PACK_ITEMS = [
  {
    name: "Descanso bien resuelto (Dormitorio)",
    url: `${PROPUESTAS_SEO.canonical}#pack-dormitorio`,
  },
  {
    name: "Espacio que se vive (Salón / Comedor)",
    url: `${PROPUESTAS_SEO.canonical}#pack-salon`,
  },
  {
    name: "La casa funciona sola (Confort + Automatización)",
    url: `${PROPUESTAS_SEO.canonical}#pack-automatizacion`,
  },
];

export const PROPUESTAS_FAQ_ITEMS = [
  {
    q: "¿Qué incluye exactamente una visita técnica?",
    a: "Revisamos el espacio, tomamos medidas, valoramos luz, privacidad, uso diario y estilo, y te orientamos sobre tejidos, sistemas y acabados para proponerte una solución realista.",
    aText:
      "Revisamos el espacio, tomamos medidas, valoramos luz, privacidad, uso diario y estilo, y te orientamos sobre tejidos, sistemas y acabados para proponerte una solución realista.",
  },
  {
    q: "¿Puedo empezar por una sola estancia?",
    a: "Sí, y es una forma excelente de comprobar el resultado. Mucha gente empieza por salón o dormitorio y luego unifica el resto con la misma línea estética.",
    aText:
      "Sí, y es una forma excelente de comprobar el resultado. Mucha gente empieza por salón o dormitorio y luego unifica el resto con la misma línea estética.",
  },
  {
    q: "¿La automatización es solo “domótica”?",
    a: "No. Es confort y protección: controlar luz, sombra y privacidad sin esfuerzo. Si quieres, lo dejamos automático; si prefieres, lo controlas tú desde mando, app o escenas.",
    aText:
      "No. Es confort y protección: controlar luz, sombra y privacidad sin esfuerzo. Si quieres, lo dejamos automático; si prefieres, lo controlas tú desde mando, app o escenas.",
  },
  {
    q: "¿En qué zonas trabajáis?",
    a: "Principalmente Castellón y alrededores, y proyectos seleccionados en Valencia según alcance. Cuéntanos tu ubicación y te diremos disponibilidad real.",
    aText:
      "Principalmente Castellón y alrededores, y proyectos seleccionados en Valencia según alcance. Cuéntanos tu ubicación y te diremos disponibilidad real.",
  },
  {
    q: "¿Esto son precios cerrados?",
    a: "No. Son propuestas orientativas para decidir el enfoque. Cada vivienda cambia por medidas, tejidos, sistemas y acabados. Te damos una propuesta ajustada tras la visita técnica.",
    aText:
      "No. Son propuestas orientativas para decidir el enfoque. Cada vivienda cambia por medidas, tejidos, sistemas y acabados. Te damos una propuesta ajustada tras la visita técnica.",
  },
];

export const PROPUESTAS_PAGE_JSON_LD = [
  {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${PROPUESTAS_SEO.canonical}#collectionpage`,
    url: PROPUESTAS_SEO.canonical,
    name: PROPUESTAS_SEO.title,
    description: PROPUESTAS_SEO.description,
    inLanguage: "es-ES",
    isPartOf: {
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      url: `${SITE_URL}/`,
      name: PROPUESTAS_SEO.siteName,
    },
    about: { "@id": BUSINESS_ID },
    mainEntity: {
      "@type": "ItemList",
      itemListOrder: "https://schema.org/ItemListOrderAscending",
      numberOfItems: PROPUESTAS_PACK_ITEMS.length,
      itemListElement: PROPUESTAS_PACK_ITEMS.map(({ name, url }, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name,
        url,
      })),
    },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: PROPUESTAS_SEO.ogImage,
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${PROPUESTAS_SEO.canonical}#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: `${SITE_URL}/` },
      {
        "@type": "ListItem",
        position: 2,
        name: "Propuestas",
        item: PROPUESTAS_SEO.canonical,
      },
    ],
  },
];

export const PROPUESTAS_FAQ_JSON_LD = createFaqJsonLd(
  PROPUESTAS_SEO,
  PROPUESTAS_FAQ_ITEMS
);

export function getPropuestasMetaDescriptors() {
  return getMetaDescriptors({
    seo: PROPUESTAS_SEO,
    pageJsonLd: PROPUESTAS_PAGE_JSON_LD,
    faqJsonLd: PROPUESTAS_FAQ_JSON_LD,
  });
}

export const NOSOTROS_SEO = createSeo("/nosotros", {
  title:
    "Nosotros | Traver Decoración Textil, tradición y detalle desde 1989",
  description:
    "Conoce Traver Decoración Textil, empresa fundada en 1989 especializada en toldos, cortinas, tapizados, papeles pintados y decoración textil en Castellón. Soluciones a medida para viviendas y espacios profesionales.",
  robots: "index,follow",
  ogType: "website",
  ogLocale: "es_ES",
  ogSiteName: true,
  ogImage: `${SITE_URL}/og.png`,
  ogImageAlt:
    "Traver Decoración Textil, tradición, detalle y diseño desde 1989",
  ogImageWidth: "1200",
  ogImageHeight: "630",
  twitterCard: "summary_large_image",
});

export const NOSOTROS_FAQ_ITEMS = [
  {
    q: "¿Qué tipo de proyectos realizamos?",
    a: "Trabajamos tanto para clientes particulares como para espacios profesionales. Hemos participado en proyectos para viviendas, colegios, alojamientos turísticos, Airbnb, hoteles y otros entornos que buscan soluciones textiles, funcionalidad y una estética cuidada.",
    aText:
      "Trabajamos tanto para clientes particulares como para espacios profesionales. Hemos participado en proyectos para viviendas, colegios, alojamientos turísticos, Airbnb, hoteles y otros entornos que buscan soluciones textiles, funcionalidad y una estética cuidada.",
  },
  {
    q: "¿En qué estamos especializados?",
    a: "Estamos especializados en toldos, cortinas, tapizados, papeles pintados y soluciones de decoración textil e interiorismo, siempre adaptándonos a las necesidades de cada espacio. Buscamos equilibrio entre diseño, confort, durabilidad y una instalación profesional.",
    aText:
      "Estamos especializados en toldos, cortinas, tapizados, papeles pintados y soluciones de decoración textil e interiorismo, siempre adaptándonos a las necesidades de cada espacio. Buscamos equilibrio entre diseño, confort, durabilidad y una instalación profesional.",
  },
  {
    q: "¿Trabajamos proyectos a medida?",
    a: "Sí. Cada proyecto se estudia de forma personalizada para ofrecer una propuesta adaptada al estilo, al uso del espacio y a las necesidades reales del cliente.",
    aText:
      "Sí. Cada proyecto se estudia de forma personalizada para ofrecer una propuesta adaptada al estilo, al uso del espacio y a las necesidades reales del cliente.",
  },
  {
    q: "¿Qué nos diferencia?",
    a: "La experiencia de una empresa fundada en 1989, la atención cercana, el cuidado por el detalle y la combinación de funcionalidad con una estética elegante y duradera.",
    aText:
      "La experiencia de una empresa fundada en 1989, la atención cercana, el cuidado por el detalle y la combinación de funcionalidad con una estética elegante y duradera.",
  },
  {
    q: "¿Dónde estamos y en qué zonas trabajamos?",
    a: "Estamos en Almassora, Castellón, y trabajamos principalmente en Castellón y alrededores, además de proyectos seleccionados según alcance.",
    aText:
      "Estamos en Almassora, Castellón, y trabajamos principalmente en Castellón y alrededores, además de proyectos seleccionados según alcance.",
  },
];

export const NOSOTROS_PAGE_JSON_LD = [
  {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${NOSOTROS_SEO.canonical}#aboutpage`,
    url: NOSOTROS_SEO.canonical,
    name: NOSOTROS_SEO.title,
    description: NOSOTROS_SEO.description,
    inLanguage: "es-ES",
    isPartOf: {
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      url: `${SITE_URL}/`,
      name: NOSOTROS_SEO.siteName,
    },
    about: { "@id": BUSINESS_ID },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: NOSOTROS_SEO.ogImage,
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": BUSINESS_ID,
    name: NOSOTROS_SEO.siteName,
    url: `${SITE_URL}/`,
    logo: `${SITE_URL}/favicon.png`,
    image: NOSOTROS_SEO.ogImage,
    foundingDate: "1989",
    telephone: CONTACT.phoneLandline,
    email: CONTACT.email,
    address: {
      "@type": "PostalAddress",
      ...CONTACT.address,
    },
    description: NOSOTROS_SEO.description,
    areaServed: {
      "@type": "Place",
      name: "Castellón",
    },
    knowsAbout: [
      "Toldos",
      "Cortinas",
      "Tapizados",
      "Papeles pintados",
      "Decoración textil",
      "Interiorismo",
      "Instalación profesional",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: `${SITE_URL}/` },
      {
        "@type": "ListItem",
        position: 2,
        name: "Nosotros",
        item: NOSOTROS_SEO.canonical,
      },
    ],
  },
];

export const NOSOTROS_FAQ_JSON_LD = createFaqJsonLd(
  NOSOTROS_SEO,
  NOSOTROS_FAQ_ITEMS
);

export function getNosotrosMetaDescriptors() {
  return getMetaDescriptors({
    seo: NOSOTROS_SEO,
    pageJsonLd: NOSOTROS_PAGE_JSON_LD,
    faqJsonLd: NOSOTROS_FAQ_JSON_LD,
  });
}

export const CONTACT_SEO = createSeo("/contact", {
  title: "Contacto | Cortinas, toldos y automatización en Castellón",
  description:
    "Contacta con Traver Decoración Textil para cortinas, toldos y automatización en Castellón. Asesoramiento, medición e instalación profesional sin compromiso.",
  robots: "index,follow",
  ogType: "website",
  ogLocale: "es_ES",
  ogSiteName: true,
  ogImage: `${SITE_URL}/og.png`,
  ogImageAlt: `Contacto ${CONTACT.siteName} en ${CONTACT.address.addressLocality} (${CONTACT.address.addressRegion})`,
  ogImageWidth: "1200",
  ogImageHeight: "630",
  twitterCard: "summary_large_image",
});

export const CONTACT_PAGE_JSON_LD = [
  {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": `${CONTACT_SEO.canonical}#contactpage`,
    url: CONTACT_SEO.canonical,
    name: CONTACT_SEO.title,
    description: CONTACT_SEO.description,
    inLanguage: "es-ES",
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": BUSINESS_ID },
  },
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": BUSINESS_ID,
    name: CONTACT_SEO.siteName,
    url: `${SITE_URL}/`,
    telephone: CONTACT.phoneLandline,
    address: {
      "@type": "PostalAddress",
      ...CONTACT.address,
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: CONTACT.phoneLandline,
        contactType: "customer support",
        availableLanguage: ["es"],
      },
      {
        "@type": "ContactPoint",
        telephone: `+${CONTACT.whatsappNumber.slice(0, 2)} ${CONTACT.whatsappNumber.slice(2, 5)} ${CONTACT.whatsappNumber.slice(5, 8)} ${CONTACT.whatsappNumber.slice(8)}`,
        contactType: "customer support",
        availableLanguage: ["es"],
        url: CONTACT.whatsappUrl,
      },
    ],
    sameAs: [CONTACT.facebookUrl],
    areaServed: [
      { "@type": "City", name: "Almassora" },
      { "@type": "City", name: "Castellón de la Plana" },
      { "@type": "AdministrativeArea", name: "Castellón" },
    ],
  },
];

export function getContactMetaDescriptors() {
  return getMetaDescriptors({
    seo: CONTACT_SEO,
    pageJsonLd: CONTACT_PAGE_JSON_LD,
  });
}

export const AVISO_LEGAL_SEO = createSeo("/aviso-legal", {
  title: `Aviso legal | ${CONTACT.siteName}`,
  description:
    "Aviso legal del sitio web de Traver Decoración Textil. Información del titular, condiciones de uso y datos de contacto.",
  ogType: "website",
  twitterCard: "summary",
});

export const AVISO_LEGAL_PAGE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: AVISO_LEGAL_SEO.title,
  url: AVISO_LEGAL_SEO.canonical,
  isPartOf: {
    "@type": "WebSite",
    name: AVISO_LEGAL_SEO.siteName,
    url: `${SITE_URL}/`,
  },
};

export function getAvisoLegalMetaDescriptors() {
  return getMetaDescriptors({
    seo: AVISO_LEGAL_SEO,
    pageJsonLd: AVISO_LEGAL_PAGE_JSON_LD,
  });
}

export const POLITICA_PRIVACIDAD_SEO = createSeo("/politica-privacidad", {
  title: `Política de privacidad | ${CONTACT.siteName}`,
  description:
    "Información sobre el tratamiento de datos personales, finalidades, base legal, conservación, destinatarios y derechos del usuario.",
  ogType: "article",
  twitterCard: "summary",
});

export const POLITICA_PRIVACIDAD_PAGE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: POLITICA_PRIVACIDAD_SEO.title,
  url: POLITICA_PRIVACIDAD_SEO.canonical,
  isPartOf: {
    "@type": "WebSite",
    name: POLITICA_PRIVACIDAD_SEO.siteName,
    url: `${SITE_URL}/`,
  },
};

export function getPoliticaPrivacidadMetaDescriptors() {
  return getMetaDescriptors({
    seo: POLITICA_PRIVACIDAD_SEO,
    pageJsonLd: POLITICA_PRIVACIDAD_PAGE_JSON_LD,
  });
}

export const POLITICA_COOKIES_SEO = createSeo("/politica-cookies", {
  title: `Política de cookies | ${CONTACT.siteName}`,
  description:
    "Información sobre las cookies y tecnologías similares utilizadas en esta web, su finalidad, gestión del consentimiento y forma de configuración.",
  ogType: "article",
  twitterCard: "summary",
});

export const POLITICA_COOKIES_PAGE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: POLITICA_COOKIES_SEO.title,
  url: POLITICA_COOKIES_SEO.canonical,
  description: POLITICA_COOKIES_SEO.description,
  isPartOf: {
    "@type": "WebSite",
    name: POLITICA_COOKIES_SEO.siteName,
    url: `${SITE_URL}/`,
  },
};

export function getPoliticaCookiesMetaDescriptors() {
  return getMetaDescriptors({
    seo: POLITICA_COOKIES_SEO,
    pageJsonLd: POLITICA_COOKIES_PAGE_JSON_LD,
  });
}
