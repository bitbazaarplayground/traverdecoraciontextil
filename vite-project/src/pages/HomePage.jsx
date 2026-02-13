// src/pages/HomePage.jsx
import { lazy, Suspense } from "react";
import { Helmet } from "react-helmet-async";

import Hero from "../components/Hero";
import LazyOnVisible from "../components/LazyOnVisible";

import { CONTACT } from "../config/contact";
import { homeFaq } from "../content/homeFaq";

// Lazy sections (below the hero)
const ServicesSection = lazy(() => import("../components/ServicesSection"));
const Process = lazy(() => import("../components/Process"));
const ContactCTAHome = lazy(() => import("../components/ContactCTAHome"));

const GalleryCarousel = lazy(() => import("../components/GalleryCarousel"));
const BrandLogos = lazy(() => import("../components/BrandLogos"));
const HomeFAQ = lazy(() => import("../components/HomeFAQ"));

export default function HomePage({ onOpenAsesoramiento }) {
  const baseUrl = (
    import.meta.env.VITE_SITE_URL || window.location.origin
  ).replace(/\/$/, "");
  const canonical = `${baseUrl}/`;

  // Prefer centralized contact + brand data
  const siteName = CONTACT.siteName || "Traver Decoración Textil";
  const ogImage = `${baseUrl}/og.png`;
  const ogImageAlt = "Traver Decoración Textil — cortinas y toldos a medida";
  const logo = `${baseUrl}/logo.png`;

  const title =
    "Traver Decoración Textil | Cortinas, toldos y más en Castellón y Valencia";
  const description =
    "Decoración textil y protección solar a medida en Castellón y Valencia: cortinas, estores, toldos, venecianas, panel japonés, automatización y mosquiteras. Medición e instalación profesional.";

  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": `${canonical}#business`,
    name: siteName,
    url: canonical,
    description,
    image: ogImage,
    logo,
    email: CONTACT.email,
    telephone: CONTACT.phoneLandline, // display format
    address: {
      "@type": "PostalAddress",
      ...CONTACT.address,
    },
    areaServed: [
      { "@type": "AdministrativeArea", name: "Castellón" },
      { "@type": "AdministrativeArea", name: "Valencia" },
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
  };

  const webSiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${baseUrl}/#website`,
    url: `${baseUrl}/`,
    name: siteName,
    inLanguage: "es-ES",
    publisher: { "@id": `${canonical}#business` },
    potentialAction: {
      "@type": "SearchAction",
      target: `${baseUrl}/?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${canonical}#webpage`,
    url: canonical,
    name: title,
    description,
    inLanguage: "es-ES",
    isPartOf: { "@id": `${baseUrl}/#website` },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: ogImage,
    },
    about: { "@id": `${canonical}#business` },
  };

  const faqPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${canonical}#faq`,
    mainEntity: homeFaq.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };

  const jsonLd = [
    localBusinessJsonLd,
    webSiteJsonLd,
    webPageJsonLd,
    faqPageJsonLd,
  ];

  return (
    <>
      <Helmet>
        <title>{title}</title>

        <meta name="description" content={description} />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href={canonical} />

        {/* Open Graph */}
        <meta property="og:site_name" content={siteName} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="es_ES" />
        <meta property="og:url" content={canonical} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:alt" content={ogImageAlt} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />
        <meta name="twitter:image:alt" content={ogImageAlt} />

        {/* JSON-LD */}
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <Hero onOpenAsesoramiento={onOpenAsesoramiento} />

      {/* Keep these *tight* so they don't load during LCP */}
      <LazyOnVisible rootMargin="400px 0px" minHeight={600} deferMs={0}>
        <Suspense fallback={null}>
          <ServicesSection />
        </Suspense>
      </LazyOnVisible>

      <LazyOnVisible rootMargin="400px 0px" minHeight={500} deferMs={0}>
        <Suspense fallback={null}>
          <Process />
        </Suspense>
      </LazyOnVisible>

      <LazyOnVisible rootMargin="500px 0px" minHeight={420} deferMs={200}>
        <Suspense fallback={null}>
          <ContactCTAHome onOpenAsesoramiento={onOpenAsesoramiento} />
        </Suspense>
      </LazyOnVisible>

      <LazyOnVisible rootMargin="600px 0px" minHeight={520} deferMs={300}>
        <Suspense fallback={null}>
          <GalleryCarousel />
          <BrandLogos />
          <HomeFAQ onOpenAsesoramiento={onOpenAsesoramiento} />
        </Suspense>
      </LazyOnVisible>
    </>
  );
}
