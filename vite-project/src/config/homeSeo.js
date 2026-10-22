import { CONTACT } from "./contact.js";
import { PUBLIC_ROUTES } from "./publicRoutes.js";

const SITE_URL = "https://www.traverdecoraciontextil.es";
const HOME_PATH = "/";
const homeRoute = PUBLIC_ROUTES.find(({ path }) => path === HOME_PATH);

if (!homeRoute) {
  throw new Error(`Missing public route manifest entry: ${HOME_PATH}`);
}

/**
 * Approved homepage metadata shared by the legacy Helmet implementation and
 * the isolated Framework Mode route module. The path comes from the public
 * route manifest so it cannot drift from the prerender target.
 */
export const HOME_SEO = {
  path: homeRoute.path,
  canonical: `${SITE_URL}/`,
  title:
    "Cortinas, toldos y automatización en Castellón | Traver Decoración Textil",
  description:
    "Cortinas, estores, toldos y automatización a medida en Castellón. Decoración textil y protección solar con medición, asesoramiento e instalación profesional.",
  robots: "index,follow",
  siteName: CONTACT.siteName || "Traver Decoración Textil",
  ogType: "website",
  ogLocale: "es_ES",
  ogImage: `${SITE_URL}/og.png`,
  ogImageAlt: "Traver Decoración Textil — cortinas y toldos a medida",
  ogImageWidth: "1200",
  ogImageHeight: "630",
  logo: `${SITE_URL}/logo.png`,
  twitterCard: "summary_large_image",
};

export const HOME_PAGE_JSON_LD = [
  {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": `${HOME_SEO.canonical}#business`,
    name: HOME_SEO.siteName,
    url: HOME_SEO.canonical,
    description: HOME_SEO.description,
    image: HOME_SEO.ogImage,
    logo: HOME_SEO.logo,
    email: CONTACT.email,
    telephone: CONTACT.phoneLandline,
    address: {
      "@type": "PostalAddress",
      ...CONTACT.address,
    },
    areaServed: [
      { "@type": "City", name: "Almassora" },
      { "@type": "City", name: "Castellón de la Plana" },
      { "@type": "AdministrativeArea", name: "Castellón" },
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: `+${CONTACT.whatsappNumber}`,
        contactType: "customer support",
        availableLanguage: ["es"],
        url: CONTACT.whatsappUrl,
      },
      {
        "@type": "ContactPoint",
        telephone: CONTACT.phoneLandline,
        contactType: "customer support",
        availableLanguage: ["es"],
      },
    ],
    sameAs: [CONTACT.facebookUrl],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: `${SITE_URL}/`,
    name: HOME_SEO.siteName,
    inLanguage: "es-ES",
    publisher: { "@id": `${HOME_SEO.canonical}#business` },
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${HOME_SEO.canonical}#webpage`,
    url: HOME_SEO.canonical,
    name: HOME_SEO.title,
    description: HOME_SEO.description,
    inLanguage: "es-ES",
    isPartOf: { "@id": `${SITE_URL}/#website` },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: HOME_SEO.ogImage,
    },
    about: { "@id": `${HOME_SEO.canonical}#business` },
  },
];

export function getHomeMetaDescriptors() {
  return [
    { title: HOME_SEO.title },
    { name: "description", content: HOME_SEO.description },
    { name: "robots", content: HOME_SEO.robots },
    {
      tagName: "link",
      rel: "canonical",
      href: HOME_SEO.canonical,
    },
    { property: "og:site_name", content: HOME_SEO.siteName },
    { property: "og:type", content: HOME_SEO.ogType },
    { property: "og:locale", content: HOME_SEO.ogLocale },
    { property: "og:url", content: HOME_SEO.canonical },
    { property: "og:title", content: HOME_SEO.title },
    { property: "og:description", content: HOME_SEO.description },
    { property: "og:image", content: HOME_SEO.ogImage },
    { property: "og:image:alt", content: HOME_SEO.ogImageAlt },
    { property: "og:image:width", content: HOME_SEO.ogImageWidth },
    { property: "og:image:height", content: HOME_SEO.ogImageHeight },
    { name: "twitter:card", content: HOME_SEO.twitterCard },
    { name: "twitter:title", content: HOME_SEO.title },
    { name: "twitter:description", content: HOME_SEO.description },
    { name: "twitter:image", content: HOME_SEO.ogImage },
    { name: "twitter:image:alt", content: HOME_SEO.ogImageAlt },
    { "script:ld+json": HOME_PAGE_JSON_LD },
  ];
}
