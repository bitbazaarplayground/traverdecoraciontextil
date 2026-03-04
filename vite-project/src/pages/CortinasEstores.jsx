import { useMemo } from "react";
import { Helmet } from "react-helmet-async";
import styled from "styled-components";
import cortinaM from "../assets/CortinasEstores/cortinaM.webp";
import customerM from "../assets/CortinasEstores/customerM.webp";
import estorM from "../assets/CortinasEstores/estorM.webp";
import ContactCTA from "../components/ContactCTA";
import SlickCarouselLazy from "../components/SlickCarouselLazy";
import FaqAccordion from "../components/faq/FaqAccordion";
import { CONTACT } from "../config/contact";
import StickyCtaButton from "../mobile/StickyCtaButton";
// Assets
import heroImg from "../assets/CortinasEstores/carousel/cortinas1.webp";

import cortina2 from "../assets/CortinasEstores/carousel/cortinas2.webp";
import cortina3 from "../assets/CortinasEstores/carousel/cortinas3.webp";
import cortina4 from "../assets/CortinasEstores/carousel/cortinas4.webp";
import cortina5 from "../assets/CortinasEstores/carousel/cortinas5.webp";
import cortina6 from "../assets/CortinasEstores/carousel/cortinas6.webp";

// Inspiracion
import blackoutImg from "../assets/CortinasEstores/inspiracion/blackout.webp";
import chenilleImg from "../assets/CortinasEstores/inspiracion/chenille.webp";
import linenImg from "../assets/CortinasEstores/inspiracion/linen.webp";
import patternedImg from "../assets/CortinasEstores/inspiracion/patterned.webp";
import sheerImg from "../assets/CortinasEstores/inspiracion/sheer.webp";
import velvetImg from "../assets/CortinasEstores/inspiracion/velvet.webp";

import EnfoqueSlider from "../components/EnfoqueSlider";
import ComplementosVentana from "../components/ventanas/ComplementosVentana";

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

  /* Control hero size across screens */
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
  backface-visibility: hidden;
  will-change: transform;

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
   FEATURE STRIP (MATCH SCREENSHOT)
========================= */

const Features = styled.section`
  background: #f6f6f7;
  border-top: 1px solid rgba(17, 17, 17, 0.08);
  border-bottom: 1px solid rgba(17, 17, 17, 0.08);

  /* Hide this strip on very large screens */
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

  /* Vertical dividers always (desktop + mobile) */
  &:not(:first-child) {
    border-left: 1px solid rgba(17, 17, 17, 0.12);
  }

  @media (max-width: 900px) {
    padding: 14px 8px;

    /* dividers slightly softer on mobile */
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
  /* Slick dots – match homepage (primary color) */
  .slick-dots {
    position: relative;
    margin-top: 1.25rem;
  }

  .slick-dots li {
    margin: 0 4px;
  }

  .slick-dots li button:before {
    font-size: 8px; /* controls bullet size */
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
   FABRICS / HANDMADE SECTION
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
   FAQ (UI)
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
   SHARED SECTION HEADERS (match AutomatizacionIndividual)
========================= */

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

/* Same idea as your other pages: primary pink touch via span */
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
   STATIC DATA (avoid rebuild every render)
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
        address: {
          "@type": "PostalAddress",
          ...CONTACT.address,
        },
      },
    }),
    [baseUrl, canonical, siteName, description]
  );

  const jsonLd = useMemo(
    () => [webPageJsonLd, breadcrumbJsonLd, serviceJsonLd],
    [webPageJsonLd, breadcrumbJsonLd, serviceJsonLd]
  );

  // ✅ memoized settings (so SlickCarouselLazy can stay stable)
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

  // ✅ memoized images list
  const images = useMemo(
    () => [cortina2, cortina3, cortina4, cortina5, cortina6],
    []
  );

  return (
    <Page>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href={canonical} />

        {/* ✅ Preload hero bg (no visual change, helps LCP) */}
        <link rel="preload" as="image" href={heroImg} fetchpriority="high" />

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
          <HeroImg src={heroImg} alt="" />
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
              <img src={cortinaM} alt="" />
            </FeatureIcon>

            <FeatureTitle>Cortinas a Medida</FeatureTitle>
            <FeatureText>
              Diseños personalizados y tejidos de calidad
            </FeatureText>
          </Feature>

          <Feature>
            <FeatureIcon aria-hidden="true">
              <img src={estorM} alt="" />
            </FeatureIcon>
            <FeatureTitle>Estores Motorizados</FeatureTitle>
            <FeatureText>Estores eléctricos y automatizados</FeatureText>
          </Feature>

          <Feature>
            <FeatureIcon aria-hidden="true">
              <img src={customerM} alt="" />
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
                  src={linenImg}
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
                  src={sheerImg}
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
                  src={velvetImg}
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
                  src={blackoutImg}
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
                  src={patternedImg}
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
                  src={chenilleImg}
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

      {/* SISTEMAS + ENFOQUE */}
      <ComplementosVentana id="sistemas" />
      <EnfoqueSlider onOpenAsesoramiento={onOpenAsesoramiento} />

      {/* ✅ CAROUSEL (Lazy-loaded Slick wrapper) */}
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
