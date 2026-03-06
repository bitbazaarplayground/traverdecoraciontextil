// CortinasEstores.jsx
import { useMemo } from "react";
import { Helmet } from "react-helmet-async";
import styled from "styled-components";
import cortinaM from "../assets/CortinasEstores/cortinaM.webp";
import customerM from "../assets/CortinasEstores/customerM.webp";
import estorM from "../assets/CortinasEstores/estorM.webp";
import ContactCTA from "../components/ContactCTA";
import EnfoqueSlider from "../components/EnfoqueSlider";
import SlickCarouselLazy from "../components/SlickCarouselLazy";
import FaqAccordion from "../components/faq/FaqAccordion";
import ComplementosVentana from "../components/ventanas/ComplementosVentana";
import { CONTACT } from "../config/contact";
import StickyCtaButton from "../mobile/StickyCtaButton";

/* =========================
   HERO (use 768/1280/1920)
========================= */
import hero_1280 from "../assets/CortinasEstores/carousel/cortinas1-1280.webp";
import hero_1920 from "../assets/CortinasEstores/carousel/cortinas1-1920.webp";
import hero_768 from "../assets/CortinasEstores/carousel/cortinas1-768.webp";

/* =========================
   CAROUSEL IMAGES (480/768/1100)
   (we pass an object per slide so SlickCarouselLazy can use srcSet)
========================= */
import cortina2_1100 from "../assets/CortinasEstores/carousel/cortinas2-1100.webp";
import cortina2_480 from "../assets/CortinasEstores/carousel/cortinas2-480.webp";
import cortina2_768 from "../assets/CortinasEstores/carousel/cortinas2-768.webp";

import cortina3_1100 from "../assets/CortinasEstores/carousel/cortinas3-1100.webp";
import cortina3_480 from "../assets/CortinasEstores/carousel/cortinas3-480.webp";
import cortina3_768 from "../assets/CortinasEstores/carousel/cortinas3-768.webp";

import cortina4_1100 from "../assets/CortinasEstores/carousel/cortinas4-1100.webp";
import cortina4_480 from "../assets/CortinasEstores/carousel/cortinas4-480.webp";
import cortina4_768 from "../assets/CortinasEstores/carousel/cortinas4-768.webp";

import cortina5_1100 from "../assets/CortinasEstores/carousel/cortinas5-1100.webp";
import cortina5_480 from "../assets/CortinasEstores/carousel/cortinas5-480.webp";
import cortina5_768 from "../assets/CortinasEstores/carousel/cortinas5-768.webp";

import cortina6_1100 from "../assets/CortinasEstores/carousel/cortinas6-1100.webp";
import cortina6_480 from "../assets/CortinasEstores/carousel/cortinas6-480.webp";
import cortina6_768 from "../assets/CortinasEstores/carousel/cortinas6-768.webp";

/* =========================
   INSPIRACIÓN (480/768/1100)
========================= */
import blackout_1100 from "../assets/CortinasEstores/inspiracion/blackout-1100.webp";
import blackout_480 from "../assets/CortinasEstores/inspiracion/blackout-480.webp";
import blackout_768 from "../assets/CortinasEstores/inspiracion/blackout-768.webp";

import chenille_1100 from "../assets/CortinasEstores/inspiracion/chenille-1100.webp";
import chenille_480 from "../assets/CortinasEstores/inspiracion/chenille-480.webp";
import chenille_768 from "../assets/CortinasEstores/inspiracion/chenille-768.webp";

import linen_1100 from "../assets/CortinasEstores/inspiracion/linen-1100.webp";
import linen_480 from "../assets/CortinasEstores/inspiracion/linen-480.webp";
import linen_768 from "../assets/CortinasEstores/inspiracion/linen-768.webp";

import patterned_1100 from "../assets/CortinasEstores/inspiracion/patterned-1100.webp";
import patterned_480 from "../assets/CortinasEstores/inspiracion/patterned-480.webp";
import patterned_768 from "../assets/CortinasEstores/inspiracion/patterned-768.webp";

import sheer_1100 from "../assets/CortinasEstores/inspiracion/sheer-1100.webp";
import sheer_480 from "../assets/CortinasEstores/inspiracion/sheer-480.webp";
import sheer_768 from "../assets/CortinasEstores/inspiracion/sheer-768.webp";

import velvet_1100 from "../assets/CortinasEstores/inspiracion/velvet-1100.webp";
import velvet_480 from "../assets/CortinasEstores/inspiracion/velvet-480.webp";
import velvet_768 from "../assets/CortinasEstores/inspiracion/velvet-768.webp";

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
   HERO
========================= */

const Hero = styled.section`
  position: relative;
  margin-top: 3.5rem;
  height: clamp(360px, 45vh, 560px);
  display: grid;
  place-items: center;
  padding: 0 2rem;
  text-align: center;
  color: #fff;
  overflow: hidden;

  @media (max-width: 768px) {
    height: clamp(320px, 48vh, 480px);
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
  object-position: center 85%;
  transform: translateZ(0) scale(1.04);

  @media (max-width: 768px) {
    object-position: center 75%;
    transform: scale(1.01);
  }
`;

const HeroOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(rgba(10, 0, 0, 0.35), rgba(0, 0, 0, 0.25));
`;

const HeroInner = styled.div`
  position: relative;
  z-index: 1;
  max-width: 820px;
`;

const HeroEyebrow = styled.p`
  font-size: 0.85rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  opacity: 0.85;
  margin-bottom: 1.2rem;
`;

const HeroTitle = styled.h1`
  font-size: 3.4rem;
  font-weight: 600;
  line-height: 1.15;
  margin-bottom: 1.4rem;

  span {
    color: ${({ theme }) => theme.colors.primary};
  }

  @media (max-width: 768px) {
    font-size: 2.3rem;
  }
`;

const HeroText = styled.p`
  font-size: 1.15rem;
  line-height: 1.7;
  opacity: 0.9;
`;

/* =========================
   FEATURE STRIP
========================= */

const Features = styled.section`
  background: #f6f6f7;
  border-top: 1px solid rgba(17, 17, 17, 0.08);
  border-bottom: 1px solid rgba(17, 17, 17, 0.08);

  @media (min-width: 1400px) {
    display: none;
  }
`;

const FeaturesGrid = styled.div`
  max-width: 1180px;
  margin: 0 auto;
  padding: clamp(10px, 2vw, 18px);
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  @media (max-width: 900px) {
    gap: 8px;
  }
`;

const Feature = styled.article`
  text-align: center;
  padding: 16px 10px;

  &:not(:first-child) {
    border-left: 1px solid rgba(17, 17, 17, 0.12);
  }

  @media (max-width: 900px) {
    padding: 14px 8px;
    &:not(:first-child) {
      border-left: 1px solid rgba(17, 17, 17, 0.1);
    }
  }
`;

const FeatureIcon = styled.div`
  width: 52px;
  height: 52px;
  margin: 0 auto 10px;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    display: block;
    filter: contrast(1.08);
  }

  @media (max-width: 900px) {
    width: 46px;
    height: 46px;
  }
`;

const FeatureTitle = styled.h3`
  margin: 0;
  font-size: 0.95rem;
  font-weight: 700;
  color: rgba(17, 17, 17, 0.92);

  @media (max-width: 900px) {
    font-size: 0.82rem;
    line-height: 1.15;
  }
`;

const FeatureText = styled.p`
  margin: 6px 0 0;
  font-size: 0.83rem;
  line-height: 1.35;
  color: rgba(17, 17, 17, 0.62);

  @media (max-width: 900px) {
    display: none;
  }
`;

/* =========================
   CAROUSEL
========================= */

const CarouselSection = styled.section`
  padding: 4rem 0rem;
  margin-top: -2rem;

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
    .slick-dots li button:before {
      font-size: 7px;
    }
  }
`;

/* =========================
   FABRICS / HANDMADE
========================= */

const FabricsSection = styled.section`
  padding: 5.5rem 2rem;
  background: #fff;

  @media (max-width: 768px) {
    padding: 3.5rem 1.5rem;
  }
`;

const FabricsInner = styled.div`
  max-width: 1100px;
  margin: 0 auto;
`;

const FabricsHeader = styled.div`
  max-width: 720px;
  margin: 0 auto 4rem;
  text-align: center;
`;

const FabricsTitle = styled.h2`
  font-size: 2.2rem;
  font-weight: 600;
  color: #121212;
  margin-bottom: 1.2rem;

  span {
    color: ${({ theme }) => theme.colors.primary};
  }
  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const FabricsIntro = styled.p`
  font-size: 1.05rem;
  line-height: 1.7;
  color: #555;
`;

const FabricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2.5rem;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const FabricItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
`;

const FabricImageWrapper = styled.div`
  width: 100%;
  height: 220px;
  border-radius: 18px;
  overflow: hidden;

  @media (max-width: 768px) {
    height: 200px;
  }
`;

const FabricImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;

  ${FabricItem}:hover & {
    transform: scale(1.04);
  }
`;

const FabricName = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  color: #222;
  margin-bottom: 0.4rem;
`;

const FabricDescription = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: #555;
`;

const HandmadeNote = styled.div`
  max-width: 820px;
  margin: 7rem auto 1rem;
  font-size: 1.05rem;
  line-height: 1.7;
  color: #444;
  text-align: center;
  strong {
    font-weight: 600;
    color: #222;
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

const SectionTop = styled.div`
  max-width: 860px;
  margin: 0 0 1.35rem 0;
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
  margin: 0.75rem 0;
  font-size: 1.08rem;
  line-height: 1.7;
  color: rgba(17, 17, 17, 0.62);
  max-width: 70ch;
`;

/* =========================
   STATIC DATA
========================= */

const FAQ_ITEMS = [
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

/* =========================
   COMPONENT
========================= */

export default function CortinasEstoresPremium({ onOpenAsesoramiento }) {
  const baseUrl = (
    import.meta.env.VITE_SITE_URL || window.location.origin
  ).replace(/\/$/, "");

  const canonical = `${baseUrl}/cortinas-estores`;
  const siteName = CONTACT.siteName;

  const title =
    "Cortinas y estores a medida | Traver Decoración Textil (Castellón y Valencia)";
  const description =
    "Cortinas y estores a medida en Almassora: tejidos seleccionados, caída impecable y control de luz y privacidad. Medición y instalación profesional en Castellón y Valencia.";

  const ogImage = `${baseUrl}/og.png`;
  const ogImageAlt = "Cortinas y estores a medida — Traver Decoración Textil";

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
          name: "Cortinas y Estores",
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
      name: "Cortinas y estores a medida",
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
      speed: 600,
      autoplay: true,
      autoplaySpeed: 3500,
    }),
    []
  );

  // ✅ Now pass rich objects so SlickCarouselLazy can render srcSet
  const images = useMemo(
    () => [
      {
        src: cortina2_768,
        srcSet: `${cortina2_480} 480w, ${cortina2_768} 768w, ${cortina2_1100} 1100w`,
      },
      {
        src: cortina3_768,
        srcSet: `${cortina3_480} 480w, ${cortina3_768} 768w, ${cortina3_1100} 1100w`,
      },
      {
        src: cortina4_768,
        srcSet: `${cortina4_480} 480w, ${cortina4_768} 768w, ${cortina4_1100} 1100w`,
      },
      {
        src: cortina5_768,
        srcSet: `${cortina5_480} 480w, ${cortina5_768} 768w, ${cortina5_1100} 1100w`,
      },
      {
        src: cortina6_768,
        srcSet: `${cortina6_480} 480w, ${cortina6_768} 768w, ${cortina6_1100} 1100w`,
      },
    ],
    []
  );

  // Used by “Inspiración” images
  const fabricSizes =
    "(max-width: 900px) calc(100vw - 3rem), (max-width: 1200px) 30vw, 340px";

  return (
    <Page>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href={canonical} />

        {/* ✅ Preload hero responsively (prevents mobile preloading a huge file) */}
        <link
          rel="preload"
          as="image"
          href={hero_1280}
          imagesrcset={`${hero_768} 768w, ${hero_1280} 1280w, ${hero_1920} 1920w`}
          imagesizes="100vw"
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
            alt=""
            aria-hidden="true"
            loading="eager"
            decoding="async"
            fetchpriority="high"
          />
          <HeroOverlay />
        </HeroMedia>

        <HeroInner>
          <HeroEyebrow>Decoración textil a medida</HeroEyebrow>
          <HeroTitle>
            Cortinas & <span>Estores</span>
          </HeroTitle>
          <HeroText>
            Diseñamos soluciones que regulan la luz, aportan privacidad y elevan
            la estética de cada espacio con equilibrio y elegancia.
          </HeroText>
        </HeroInner>
      </Hero>

      <Features>
        <FeaturesGrid>
          <Feature>
            <FeatureIcon aria-hidden="true">
              <img
                src={cortinaM}
                alt=""
                aria-hidden="true"
                width="52"
                height="52"
                loading="lazy"
                decoding="async"
              />
            </FeatureIcon>
            <FeatureTitle>Cortinas a Medida</FeatureTitle>
            <FeatureText>
              Diseños personalizados y tejidos de calidad
            </FeatureText>
          </Feature>

          <Feature>
            <FeatureIcon aria-hidden="true">
              <img
                src={estorM}
                alt=""
                aria-hidden="true"
                width="52"
                height="52"
                loading="lazy"
                decoding="async"
              />
            </FeatureIcon>
            <FeatureTitle>Estores Motorizados</FeatureTitle>
            <FeatureText>Estores eléctricos y automatizados</FeatureText>
          </Feature>

          <Feature>
            <FeatureIcon aria-hidden="true">
              <img
                src={customerM}
                alt=""
                aria-hidden="true"
                width="52"
                height="52"
                loading="lazy"
                decoding="async"
              />
            </FeatureIcon>
            <FeatureTitle>Asesoramiento Profesional</FeatureTitle>
            <FeatureText>Expertos en decoración de interiores</FeatureText>
          </Feature>
        </FeaturesGrid>
      </Features>

      {/* FABRICS & HANDMADE */}
      <FabricsSection>
        <FabricsInner>
          <FabricsHeader>
            <FabricsTitle>
              <span>Inspiración</span> que empieza en el tejido
            </FabricsTitle>
            <FabricsIntro>
              Detrás de cada cortina hay una decisión, una textura y una forma
              de entender la luz. Diseñamos y confeccionamos cada proyecto a
              medida, cuidando cada detalle para lograr espacios equilibrados y
              acogedores.
            </FabricsIntro>
          </FabricsHeader>

          <FabricsGrid>
            <FabricItem>
              <FabricImageWrapper>
                <FabricImage
                  src={linen_768}
                  srcSet={`${linen_480} 480w, ${linen_768} 768w, ${linen_1100} 1100w`}
                  sizes={fabricSizes}
                  width="1100"
                  height="733"
                  alt="Cortinas de lino a medida"
                  loading="lazy"
                  decoding="async"
                />
              </FabricImageWrapper>
              <FabricName>Lino</FabricName>
              <FabricDescription>
                Natural, ligero y elegante. Ideal para ambientes relajados,
                luminosos y atemporales.
              </FabricDescription>
            </FabricItem>

            <FabricItem>
              <FabricImageWrapper>
                <FabricImage
                  src={sheer_768}
                  srcSet={`${sheer_480} 480w, ${sheer_768} 768w, ${sheer_1100} 1100w`}
                  sizes={fabricSizes}
                  width="1100"
                  height="733"
                  alt="Visillos a medida"
                  loading="lazy"
                  decoding="async"
                />
              </FabricImageWrapper>
              <FabricName>Visillos</FabricName>
              <FabricDescription>
                Suavizan la luz sin bloquearla, aportando privacidad y amplitud
                en zonas comunes.
              </FabricDescription>
            </FabricItem>

            <FabricItem>
              <FabricImageWrapper>
                <FabricImage
                  src={velvet_768}
                  srcSet={`${velvet_480} 480w, ${velvet_768} 768w, ${velvet_1100} 1100w`}
                  sizes={fabricSizes}
                  width="1100"
                  height="733"
                  alt="Cortinas de terciopelo a medida"
                  loading="lazy"
                  decoding="async"
                />
              </FabricImageWrapper>
              <FabricName>Terciopelo</FabricName>
              <FabricDescription>
                Textura rica y sofisticada que aporta carácter y profundidad en
                estancias principales.
              </FabricDescription>
            </FabricItem>

            <FabricItem>
              <FabricImageWrapper>
                <FabricImage
                  src={blackout_768}
                  srcSet={`${blackout_480} 480w, ${blackout_768} 768w, ${blackout_1100} 1100w`}
                  sizes={fabricSizes}
                  width="1100"
                  height="733"
                  alt="Cortinas térmicas y blackout a medida"
                  loading="lazy"
                  decoding="async"
                />
              </FabricImageWrapper>
              <FabricName>Térmicas / blackout</FabricName>
              <FabricDescription>
                Para mejorar el confort, reducir entrada de luz y ayudar a
                regular temperatura.
              </FabricDescription>
            </FabricItem>

            <FabricItem>
              <FabricImageWrapper>
                <FabricImage
                  src={patterned_768}
                  srcSet={`${patterned_480} 480w, ${patterned_768} 768w, ${patterned_1100} 1100w`}
                  sizes={fabricSizes}
                  width="1100"
                  height="733"
                  alt="Cortinas con tejidos estampados"
                  loading="lazy"
                  decoding="async"
                />
              </FabricImageWrapper>
              <FabricName>Tejidos estampados</FabricName>
              <FabricDescription>
                Aportan personalidad y estilo, adaptándose al carácter de cada
                espacio.
              </FabricDescription>
            </FabricItem>

            <FabricItem>
              <FabricImageWrapper>
                <FabricImage
                  src={chenille_768}
                  srcSet={`${chenille_480} 480w, ${chenille_768} 768w, ${chenille_1100} 1100w`}
                  sizes={fabricSizes}
                  width="1100"
                  height="733"
                  alt="Cortinas técnicas y chenille"
                  loading="lazy"
                  decoding="async"
                />
              </FabricImageWrapper>
              <FabricName>Técnicas</FabricName>
              <FabricDescription>
                Funcionales y discretas para grandes ventanales o necesidades de
                control solar.
              </FabricDescription>
            </FabricItem>
          </FabricsGrid>

          <HandmadeNote>
            <strong>
              Cada cortina se confecciona a medida por personas, no por
              máquinas.
            </strong>{" "}
            Por eso el ajuste, la caída y el acabado final marcan la diferencia
            frente a soluciones estándar.
          </HandmadeNote>
        </FabricsInner>
      </FabricsSection>

      <ContactCTA onOpenAsesoramiento={onOpenAsesoramiento} />

      <ComplementosVentana id="sistemas" />
      <EnfoqueSlider onOpenAsesoramiento={onOpenAsesoramiento} />

      {/* CAROUSEL */}
      <CarouselSection>
        <SlickCarouselLazy images={images} settings={sliderSettings} />
      </CarouselSection>

      {/* FAQ */}
      <FAQSection>
        <FAQInner>
          <SectionTop>
            <Kicker>FAQ</Kicker>
            <SectionTitle>
              Preguntas <span>frecuentes</span>
            </SectionTitle>
            <SectionLead>
              Resolvemos lo importante antes de la visita: tiempos, tejidos,
              medición e instalación.
            </SectionLead>
          </SectionTop>

          <FaqAccordion
            items={FAQ_ITEMS}
            withSchema={true}
            canonicalUrl={canonical}
            defaultOpenIndex={-1}
            ariaLabel="Preguntas frecuentes sobre cortinas y estores"
          />
        </FAQInner>
      </FAQSection>

      <StickyCtaButton message="Hola, me gustaría más información sobre cortinas y estores. Gracias." />
    </Page>
  );
}
