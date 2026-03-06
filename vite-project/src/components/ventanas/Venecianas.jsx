// src/pages/servicios/Venecianas.jsx
import { useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { CONTACT } from "../../config/contact";
import { trackEvent } from "../../lib/analytics";

import ContactCTA from "../../components/ContactCTA";
import SlickCarouselLazy from "../../components/SlickCarouselLazy";
import FaqAccordion from "../../components/faq/FaqAccordion";
import ComplementosVentana from "../../components/ventanas/ComplementosVentana";
import StickyCtaButton from "../../mobile/StickyCtaButton";

/* IMAGES (venecianas) */
import bano1 from "../../assets/venecianas/bano1.webp";
import cocina1 from "../../assets/venecianas/cocina1.webp";
import oficina1 from "../../assets/venecianas/oficina1.webp";
import oficina2 from "../../assets/venecianas/oficina2.webp";
import venecianaMaderaOficina from "../../assets/venecianas/venecianaMaderaOficina.webp";
// Hero
const hero_768 = "/venecianas/oficina2-768.webp";
const hero_1280 = "/venecianas/oficina2-1280.webp";
const hero_1920 = "/venecianas/oficina2-1920.webp";
// ComplementosVentana
import { getComplementosItems } from "../../data/complementosVentana";
/* =========================
   PAGE
========================= */

const Page = styled.main`
  width: 100%;
  background: #fff;
  color: #151515;
  font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial,
    "Helvetica Neue", sans-serif;
`;

/* =========================
   HERO (premium)
========================= */

const Hero = styled.section`
  position: relative;
  margin-top: 3.5rem;
  height: clamp(360px, 46vh, 590px);
  display: grid;
  place-items: center;
  padding: 0 2rem;
  text-align: center;
  color: #fff;
  overflow: hidden;

  @media (max-width: 768px) {
    height: clamp(320px, 50vh, 520px);
    padding: 0 1.5rem;
  }
`;

const HeroMedia = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
`;

const HeroImg = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 55%;
  transform: translateZ(0) scale(1.05);
  backface-visibility: hidden;
  will-change: transform;
`;

const HeroOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(rgba(10, 0, 0, 0.38), rgba(0, 0, 0, 0.28));
`;

const HeroInner = styled.div`
  position: relative;
  z-index: 1;
  max-width: 940px;
`;

const HeroEyebrow = styled.p`
  font-size: 0.85rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  opacity: 0.9;
  margin-bottom: 1.15rem;
`;

const HeroTitle = styled.h1`
  margin: 0;
  font-size: 3.35rem;
  font-weight: 600;
  line-height: 1.12;
  letter-spacing: -0.02em;

  span {
    color: ${({ theme }) => theme.colors.primary};
  }

  @media (max-width: 768px) {
    font-size: 2.25rem;
  }
`;

const HeroText = styled.p`
  margin: 1.1rem auto 0;
  max-width: 72ch;
  font-size: 1.15rem;
  line-height: 1.7;
  opacity: 0.92;
`;

/* =========================
   FEATURE STRIP
========================= */

const Features = styled.section`
  background: #f6f6f7;
  border-top: 1px solid rgba(17, 17, 17, 0.08);
  border-bottom: 1px solid rgba(17, 17, 17, 0.08);
`;

const FeaturesGrid = styled.div`
  max-width: 1180px;
  margin: 0 auto;
  padding: clamp(10px, 2vw, 18px);
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
    gap: 8px;
  }
`;

const Feature = styled.article`
  text-align: center;
  padding: 16px 10px;

  &:not(:first-child) {
    border-left: 1px solid rgba(17, 17, 17, 0.12);
  }

  @media (max-width: 860px) {
    text-align: left;
    border-left: none !important;
    border-top: 1px solid rgba(17, 17, 17, 0.1);
    padding: 14px 8px;

    &:first-child {
      border-top: none;
    }
  }
`;

const FeatureTitle = styled.h3`
  margin: 0;
  font-size: 0.98rem;
  font-weight: 800;
  color: rgba(17, 17, 17, 0.92);
`;

const FeatureText = styled.p`
  margin: 6px 0 0;
  font-size: 0.9rem;
  line-height: 1.45;
  color: rgba(17, 17, 17, 0.62);
`;

/* =========================
   SHARED SECTION HEADERS
========================= */

const SectionTop = styled.div`
  max-width: 980px;
  margin: 0 auto 1.5rem;
  text-align: left;
`;

const Kicker = styled.p`
  margin: 0 0 0.55rem 0;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  font-size: 0.82rem;
  color: rgba(17, 17, 17, 0.55);
  position: relative;
  display: inline-block;
  padding-bottom: 0.55rem;

  &:after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0.1rem;
    width: 48px;
    height: 1px;
    background: rgba(196, 151, 98, 0.65);
  }
`;

const SectionTitle = styled.h2`
  margin: 0;
  font-size: 2.15rem;
  line-height: 1.12;
  letter-spacing: -0.02em;
  color: rgba(17, 17, 17, 0.96);

  span {
    color: ${({ theme }) => theme.colors.primary};
  }

  @media (max-width: 768px) {
    font-size: 1.7rem;
  }
`;

const SectionLead = styled.p`
  margin: 0.75rem 0 0;
  font-size: 1.08rem;
  line-height: 1.7;
  color: rgba(17, 17, 17, 0.62);
  max-width: 75ch;
`;

/* =========================
   WHY / USE CASES (cards)
========================= */

const WhySection = styled.section`
  padding: clamp(3.5rem, 5vw, 5.5rem) 0;
  background: #fff;
`;

const WhyInner = styled.div`
  width: min(1120px, calc(100% - 3rem));
  margin: 0 auto;

  @media (max-width: 768px) {
    width: min(1120px, calc(100% - 2rem));
  }
`;

const WhyGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.2rem;
  margin-top: 1.75rem;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

const WhyCard = styled.article`
  border-radius: 18px;
  background: linear-gradient(180deg, #ffffff, #fbfbfb);
  border: 1px solid rgba(15, 23, 42, 0.08);
  padding: 1.3rem 1.25rem;
  box-shadow: 0 16px 50px rgba(0, 0, 0, 0.06);
`;

const WhyTitle = styled.h3`
  margin: 0 0 0.6rem 0;
  font-size: 1.05rem;
  font-weight: 800;
  color: rgba(17, 17, 17, 0.92);
`;

const WhyText = styled.p`
  margin: 0;
  font-size: 0.98rem;
  line-height: 1.65;
  color: rgba(17, 17, 17, 0.62);
`;

/* =========================
   SPLIT SECTION (image + copy)
========================= */

const SplitSection = styled.section`
  padding: 0 0 clamp(3.5rem, 5vw, 5.5rem);
  background: #fff;
`;

const SplitInner = styled.div`
  width: min(1120px, calc(100% - 3rem));
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  gap: 2rem;
  align-items: center;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
    gap: 1.25rem;
  }

  @media (max-width: 768px) {
    width: min(1120px, calc(100% - 2rem));
  }
`;

const SplitMedia = styled.div`
  border-radius: 22px;
  overflow: hidden;
  background: #eee;
  box-shadow: 0 24px 70px rgba(0, 0, 0, 0.1);
`;

const SplitImg = styled.img`
  width: 100%;
  height: 100%;
  display: block;
  aspect-ratio: 16 / 11;
  object-fit: cover;
`;

const Points = styled.ul`
  margin: 1.1rem 0 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 0.7rem;
`;

const Point = styled.li`
  display: grid;
  grid-template-columns: 18px 1fr;
  gap: 0.75rem;
  align-items: start;
  font-size: 1rem;
  line-height: 1.65;
  color: rgba(17, 17, 17, 0.62);

  &::before {
    content: "✓";
    font-weight: 900;
    color: ${({ theme }) => theme.colors.primary};
    line-height: 1.1;
    margin-top: 2px;
  }
`;

/* =========================
   CAROUSEL
========================= */

const CarouselSection = styled.section`
  padding: 4rem 0;
  background: #fafafa;
  border-top: 1px solid rgba(15, 23, 42, 0.08);
  border-bottom: 1px solid rgba(15, 23, 42, 0.08);

  .slick-dots {
    position: relative;
    margin-top: 1.25rem;
  }
  .slick-dots li {
    margin: 0 4px;
  }
  .slick-dots li button:before {
    font-size: 8px;
    opacity: 0.35;
    color: rgba(17, 17, 17, 0.55);
    transition: transform 180ms ease, opacity 180ms ease, color 180ms ease;
  }
  .slick-dots li.slick-active button:before {
    opacity: 0.95;
    transform: scale(1.15);
    color: ${({ theme }) => theme.colors.primary};
  }

  @media (max-width: 768px) {
    padding: 3.25rem 0;

    .slick-dots li button:before {
      font-size: 7px;
    }
  }
`;

const CarouselInner = styled.div`
  width: min(1120px, calc(100% - 3rem));
  margin: 0 auto;

  @media (max-width: 768px) {
    width: min(1120px, calc(100% - 2rem));
  }
`;

/* =========================
   VALUE / CTA CARD
========================= */

const ValueSection = styled.section`
  padding: clamp(3.5rem, 5vw, 5.5rem) 0;
  background: #fff;
`;

const ValueInner = styled.div`
  width: min(1120px, calc(100% - 3rem));
  margin: 0 auto;

  @media (max-width: 768px) {
    width: min(1120px, calc(100% - 2rem));
  }
`;

const ValueCard = styled.div`
  border-radius: 26px;
  background: rgba(255, 255, 255, 0.78);
  padding: 2.6rem 2.3rem;
  box-shadow: 0 32px 90px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(15, 23, 42, 0.08);

  @media (max-width: 520px) {
    padding: 2.1rem 1.4rem;
  }
`;

const ValueTitle = styled.h2`
  margin: 0 0 0.9rem;
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: rgba(17, 17, 17, 0.95);

  span {
    color: ${({ theme }) => theme.colors.primary};
  }

  @media (max-width: 768px) {
    font-size: 1.7rem;
  }
`;

const ValueText = styled.p`
  margin: 0;
  max-width: 78ch;
  font-size: 1.06rem;
  line-height: 1.75;
  color: rgba(17, 17, 17, 0.62);
`;

const CtaRow = styled.div`
  display: flex;
  gap: 0.9rem;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 1.7rem;
`;

const PrimaryCTA = styled(Link)`
  display: inline-flex;
  padding: 0.95rem 2.1rem;
  border-radius: 999px;
  background: #111;
  color: #fff;
  text-decoration: none;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-size: 0.75rem;
  transition: transform 0.25s ease, opacity 0.25s ease;

  &:hover {
    transform: translateY(-1px);
    opacity: 0.92;
  }
`;

const SecondaryCTA = styled.a`
  display: inline-flex;
  padding: 0.95rem 1.4rem;
  border-radius: 999px;
  background: rgba(17, 17, 17, 0.06);
  color: rgba(17, 17, 17, 0.9);
  text-decoration: none;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-size: 0.72rem;
  transition: transform 0.25s ease, background 0.25s ease;

  &:hover {
    transform: translateY(-1px);
    background: rgba(17, 17, 17, 0.085);
  }
`;

/* =========================
   FAQ
========================= */

const FAQSection = styled.section`
  padding: clamp(3.5rem, 5vw, 5.5rem) 0;
  background: #fafafa;
  border-top: 1px solid rgba(15, 23, 42, 0.08);
`;

const FAQInner = styled.div`
  width: min(1120px, calc(100% - 3rem));
  margin: 0 auto;

  @media (max-width: 768px) {
    width: min(1120px, calc(100% - 2rem));
  }
`;

/* =========================
   DATA
========================= */

const FAQ_ITEMS = [
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

/* =========================
   COMPONENT
========================= */

export default function Venecianas({ onOpenAsesoramiento }) {
  const baseUrl = (
    import.meta.env.VITE_SITE_URL || window.location.origin
  ).replace(/\/$/, "");

  const canonical = `${baseUrl}/venecianas`;
  const siteName = CONTACT.siteName;

  const title =
    "Venecianas a medida | Traver Decoración Textil (Castellón y Valencia)";
  const description =
    "Venecianas a medida en Almassora: controla la luz con precisión y gana privacidad sin perder claridad. Opciones en aluminio y madera, medición e instalación profesional en Castellón y Valencia.";

  const ogImage = `${baseUrl}/og.png`;
  const ogImageAlt = "Venecianas a medida — Traver Decoración Textil";

  const breadcrumbJsonLd = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Inicio",
          item: `${baseUrl}/`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Servicios",
          item: `${baseUrl}/services`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Venecianas",
          item: canonical,
        },
      ],
    }),
    [baseUrl, canonical]
  );

  const webPageJsonLd = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${canonical}#webpage`,
      url: canonical,
      name: title,
      description,
      inLanguage: "es-ES",
      isPartOf: { "@id": `${baseUrl}/#website` },
    }),
    [baseUrl, canonical, title, description]
  );

  const serviceJsonLd = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${canonical}#service`,
      name: "Venecianas a medida",
      description,
      areaServed: [
        { "@type": "AdministrativeArea", name: "Castellón" },
        { "@type": "AdministrativeArea", name: "Valencia" },
      ],
      provider: {
        "@type": "LocalBusiness",
        name: siteName,
        url: `${baseUrl}/`,
        telephone: CONTACT.phoneLandline,
        email: CONTACT.email,
        address: { "@type": "PostalAddress", ...CONTACT.address },
      },
    }),
    [baseUrl, canonical, siteName, description]
  );

  const jsonLd = useMemo(
    () => [webPageJsonLd, breadcrumbJsonLd, serviceJsonLd],
    [webPageJsonLd, breadcrumbJsonLd, serviceJsonLd]
  );

  const sliderSettings = useMemo(
    () => ({
      dots: true,
      arrows: false,
      infinite: true,
      speed: 650,
      autoplay: true,
      autoplaySpeed: 3600,
    }),
    []
  );

  const carouselImages = useMemo(
    () => [venecianaMaderaOficina, oficina1, oficina2, cocina1, bano1],
    []
  );

  // Complementos
  const complementosItems = getComplementosItems("venecianas");

  const PACK_LABEL = "Venecianas";
  const PACK_QUERY = "venecianas";
  const CTA_SOURCE = "venecianas_cta";

  const handleOpenCta = (e) => {
    trackEvent("open_quick_enquiry", { source: CTA_SOURCE, pack: PACK_LABEL });

    if (typeof onOpenAsesoramiento === "function") {
      e.preventDefault();
      onOpenAsesoramiento(PACK_LABEL, CTA_SOURCE);
    }
  };

  const handleCall = () => {
    trackEvent("click_call", { source: "venecianas_call" });
  };

  return (
    <Page>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href={canonical} />

        {/* Preload hero (LCP) */}
        <link
          rel="preload"
          as="image"
          href={hero_1280}
          imageSrcSet={`${hero_768} 768w, ${hero_1280} 1280w, ${hero_1920} 1920w`}
          imageSizes="100vw"
          fetchpriority="high"
        />

        {/* Open Graph */}
        <meta property="og:site_name" content={siteName} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="es_ES" />
        <meta property="og:url" content={canonical} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:alt" content={ogImageAlt} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />
        <meta name="twitter:image:alt" content={ogImageAlt} />

        {/* JSON-LD */}
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      {/* HERO */}
      <Hero>
        <HeroMedia aria-hidden="true">
          <HeroImg
            src={hero_1280}
            srcSet={`${hero_768} 768w, ${hero_1280} 1280w, ${hero_1920} 1920w`}
            sizes="100vw"
            width="1920"
            height="1080"
            loading="eager"
            decoding="async"
            fetchPriority="high"
            alt=""
          />
          <HeroOverlay />
        </HeroMedia>

        <HeroInner>
          <HeroEyebrow>Interior · Control de luz</HeroEyebrow>
          <HeroTitle>
            Venecianas <span>a medida</span>
          </HeroTitle>
          <HeroText>
            Regulación precisa: orientas las lamas para filtrar luz, reducir
            reflejos y ajustar privacidad sin perder claridad. Perfectas en
            oficinas, cocinas y baños por su mantenimiento y orden visual.
          </HeroText>
        </HeroInner>
      </Hero>

      {/* FEATURES */}
      <Features>
        <FeaturesGrid>
          <Feature>
            <FeatureTitle>Control milimétrico</FeatureTitle>
            <FeatureText>
              Ajusta el ángulo de lama para confort visual y privacidad.
            </FeatureText>
          </Feature>

          <Feature>
            <FeatureTitle>Materiales con criterio</FeatureTitle>
            <FeatureText>
              Aluminio para zonas húmedas; madera para un acabado cálido.
            </FeatureText>
          </Feature>

          <Feature>
            <FeatureTitle>Instalación limpia</FeatureTitle>
            <FeatureText>
              Medición precisa, encaje perfecto y remates discretos.
            </FeatureText>
          </Feature>
        </FeaturesGrid>
      </Features>

      {/* WHY */}
      <WhySection>
        <WhyInner>
          <SectionTop>
            <Kicker>Por qué funciona</Kicker>
            <SectionTitle>
              Una solución <span>técnica</span> que se ve elegante
            </SectionTitle>
            <SectionLead>
              Las venecianas te permiten “dibujar” la luz: abres, cierras u
              orientas para que el espacio sea cómodo a cualquier hora.
            </SectionLead>
          </SectionTop>

          <WhyGrid>
            <WhyCard>
              <WhyTitle>Reflejos bajo control</WhyTitle>
              <WhyText>
                En despachos y pantallas, el ajuste de lama reduce
                deslumbramientos sin oscurecer la estancia.
              </WhyText>
            </WhyCard>

            <WhyCard>
              <WhyTitle>Privacidad regulable</WhyTitle>
              <WhyText>
                Mantienes entrada de luz mientras bloqueas vistas directas desde
                el exterior.
              </WhyText>
            </WhyCard>

            <WhyCard>
              <WhyTitle>Fácil mantenimiento</WhyTitle>
              <WhyText>
                Especialmente en aluminio: ideal para cocinas y baños por su
                limpieza rápida y resistencia.
              </WhyText>
            </WhyCard>
          </WhyGrid>
        </WhyInner>
      </WhySection>

      {/* SPLIT */}
      <SplitSection>
        <SplitInner>
          <SplitMedia>
            <SplitImg
              src={venecianaMaderaOficina}
              alt="Veneciana de madera en oficina: calidez y control de luz"
              loading="lazy"
              decoding="async"
            />
          </SplitMedia>

          <div>
            <SectionTop style={{ margin: 0 }}>
              <Kicker>Qué decidimos contigo</Kicker>
              <SectionTitle>
                Lama, color y <span>accionamiento</span>
              </SectionTitle>
              <SectionLead>
                El resultado premium no es solo “poner una veneciana”: es elegir
                proporciones y acabado para que se integre con tu espacio.
              </SectionLead>
            </SectionTop>

            <Points aria-label="Puntos clave de venecianas a medida">
              <Point>Recomendación de material según uso y humedad.</Point>
              <Point>
                Elección de ancho de lama según escala de la ventana.
              </Point>
              <Point>Color y remates para integrarse con el mobiliario.</Point>
            </Points>
          </div>
        </SplitInner>
      </SplitSection>

      {/* CONTACT CTA */}
      <ContactCTA onOpenAsesoramiento={onOpenAsesoramiento} />

      {/* COMPLEMENTOS */}
      <ComplementosVentana
        id="sistemas"
        items={complementosItems}
        title={
          <>
            Otros productos <span>para tu ventana</span>
          </>
        }
        lead="Complementos que combinan con venecianas para resolver luz, privacidad y confort."
      />

      {/* CAROUSEL */}
      <CarouselSection>
        <CarouselInner>
          <SectionTop>
            <Kicker>Inspiración</Kicker>
            <SectionTitle>
              Venecianas en <span>espacios reales</span>
            </SectionTitle>
            <SectionLead>
              Oficina, cocina y baño: soluciones limpias y prácticas con un
              control de luz muy preciso.
            </SectionLead>
          </SectionTop>

          <SlickCarouselLazy
            images={carouselImages}
            settings={sliderSettings}
          />
        </CarouselInner>
      </CarouselSection>

      {/* VALUE + CTA */}
      <ValueSection>
        <ValueInner>
          <ValueCard>
            <ValueTitle>
              Te preparamos una <span>propuesta</span>
            </ValueTitle>
            <ValueText>
              Te aconsejamos material (aluminio o madera), ancho de lama, color
              y accionamiento. Medimos e instalamos en Castellón y Valencia para
              que el resultado quede alineado, limpio y cómodo.
            </ValueText>

            <CtaRow>
              <PrimaryCTA
                to={`/contact?pack=${PACK_QUERY}`}
                onClick={handleOpenCta}
              >
                Solicitar propuesta
              </PrimaryCTA>

              <SecondaryCTA
                href={`tel:${CONTACT.phoneLandline}`}
                onClick={handleCall}
              >
                Llamar
              </SecondaryCTA>
            </CtaRow>
          </ValueCard>
        </ValueInner>
      </ValueSection>

      {/* FAQ */}
      <FAQSection>
        <FAQInner>
          <SectionTop>
            <Kicker>FAQ</Kicker>
            <SectionTitle>
              Preguntas <span>frecuentes</span>
            </SectionTitle>
            <SectionLead>
              Lo esencial antes de elegir: materiales, lamas, privacidad e
              instalación.
            </SectionLead>
          </SectionTop>

          <FaqAccordion
            items={FAQ_ITEMS}
            withSchema={true}
            canonicalUrl={canonical}
            defaultOpenIndex={-1}
            ariaLabel="Preguntas frecuentes sobre venecianas a medida"
          />
        </FAQInner>
      </FAQSection>

      <StickyCtaButton message="Hola, me gustaría información sobre venecianas a medida. Gracias." />
    </Page>
  );
}
