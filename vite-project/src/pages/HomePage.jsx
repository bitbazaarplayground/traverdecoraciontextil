// src/pages/HomePage.jsx
import { lazy, Suspense, useEffect } from "react";
import { Helmet } from "react-helmet-async";

import Hero from "../components/Hero";
import LazyOnVisible from "../components/LazyOnVisible";

import { HOME_PAGE_JSON_LD, HOME_SEO } from "../config/homeSeo.js";

// Lazy sections (below the hero)
const ServicesSection = lazy(() => import("../components/ServicesSection"));
const Process = lazy(() => import("../components/Process"));
const ContactCTAHome = lazy(() => import("../components/ContactCTAHome"));

const GalleryCarousel = lazy(() => import("../components/GalleryCarousel"));
const BrandLogos = lazy(() => import("../components/BrandLogos"));
const HomeFAQ = lazy(() => import("../components/HomeFAQ"));

export default function HomePage({
  onOpenAsesoramiento,
  includeHelmet = true,
}) {
  // Warm up the first below-the-fold chunks after initial paint (idle if possible)
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;

    // don't warm on mobile
    if (window.matchMedia("(max-width: 768px)").matches) return;

    const warm = () => {
      import("../components/ServicesSection");
      import("../components/Process");
      import("../components/ContactCTAHome");
    };

    let id;
    if ("requestIdleCallback" in window) {
      id = window.requestIdleCallback(warm, { timeout: 1500 });
      return () => window.cancelIdleCallback(id);
    }

    id = window.setTimeout(warm, 800);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <>
      {includeHelmet && (
        <Helmet>
          <title>{HOME_SEO.title}</title>

          <meta name="description" content={HOME_SEO.description} />
          <meta name="robots" content={HOME_SEO.robots} />
          <link rel="canonical" href={HOME_SEO.canonical} />

          {/* Open Graph */}
          <meta property="og:site_name" content={HOME_SEO.siteName} />
          <meta property="og:type" content={HOME_SEO.ogType} />
          <meta property="og:locale" content={HOME_SEO.ogLocale} />
          <meta property="og:url" content={HOME_SEO.canonical} />
          <meta property="og:title" content={HOME_SEO.title} />
          <meta property="og:description" content={HOME_SEO.description} />
          <meta property="og:image" content={HOME_SEO.ogImage} />
          <meta property="og:image:alt" content={HOME_SEO.ogImageAlt} />
          <meta property="og:image:width" content={HOME_SEO.ogImageWidth} />
          <meta property="og:image:height" content={HOME_SEO.ogImageHeight} />

          {/* Twitter */}
          <meta name="twitter:card" content={HOME_SEO.twitterCard} />
          <meta name="twitter:title" content={HOME_SEO.title} />
          <meta name="twitter:description" content={HOME_SEO.description} />
          <meta name="twitter:image" content={HOME_SEO.ogImage} />
          <meta name="twitter:image:alt" content={HOME_SEO.ogImageAlt} />

          {/* JSON-LD */}
          <script type="application/ld+json">
            {JSON.stringify(HOME_PAGE_JSON_LD)}
          </script>
        </Helmet>
      )}

      <Hero onOpenAsesoramiento={onOpenAsesoramiento} />

      <LazyOnVisible
        rootMargin="0px 0px"
        minHeight={600}
        idle
        idleTimeout={1200}
      >
        <Suspense fallback={null}>
          <ServicesSection />
        </Suspense>
      </LazyOnVisible>

      <LazyOnVisible rootMargin="0px 0px" minHeight={500} idle>
        <Suspense fallback={null}>
          <Process />
        </Suspense>
      </LazyOnVisible>

      <LazyOnVisible rootMargin="0px 0px" minHeight={420} idle>
        <Suspense fallback={null}>
          <ContactCTAHome onOpenAsesoramiento={onOpenAsesoramiento} />
        </Suspense>
      </LazyOnVisible>

      <LazyOnVisible rootMargin="100px 0px" minHeight={520} idle>
        <Suspense fallback={null}>
          <GalleryCarousel />
          <BrandLogos />
          <HomeFAQ onOpenAsesoramiento={onOpenAsesoramiento} />
        </Suspense>
      </LazyOnVisible>
    </>
  );
}
