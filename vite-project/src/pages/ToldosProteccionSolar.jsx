import { useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import styled from "styled-components";
import ServiceHero from "../components/heroes/ServiceHero";
import { trackCtaClick, trackOpenQuickEnquiry } from "../lib/analytics";
import StickyCtaButton from "../mobile/StickyCtaButton";

/* =========================
   COMPONENTS
========================= */
import FaqAccordion from "../components/faq/FaqAccordion";
import AwningAccessories from "../components/toldos/AwningAccessories";
import SectionIntro from "../components/ui/SectionIntro";

import { CONTACT } from "../config/contact";

/* =========================
   IMAGES
========================= */
import toldoCofre1200 from "../assets/toldos/cofre-1200.webp";
import toldoCofre400 from "../assets/toldos/cofre-400.webp";
import toldoCofre600 from "../assets/toldos/cofre-600.webp";
import toldoCofre800 from "../assets/toldos/cofre-800.webp";

import hosteleria1200 from "../assets/toldos/hosteleria-1200.webp";
import hosteleria400 from "../assets/toldos/hosteleria-400.webp";
import hosteleria600 from "../assets/toldos/hosteleria-600.webp";
import hosteleria800 from "../assets/toldos/hosteleria-800.webp";

import pergola1200 from "../assets/toldos/pergola-1200.webp";
import pergola400 from "../assets/toldos/pergola-400.webp";
import pergola600 from "../assets/toldos/pergola-600.webp";
import pergola800 from "../assets/toldos/pergola-800.webp";

import toldoExtensible1200 from "../assets/toldos/toldo1-1200.webp";
import toldoExtensible400 from "../assets/toldos/toldo1-400.webp";
import toldoExtensible600 from "../assets/toldos/toldo1-600.webp";
import toldoExtensible800 from "../assets/toldos/toldo1-800.webp";

import toldoVertical1200 from "../assets/toldos/toldos-verticales-1200.webp";
import toldoVertical400 from "../assets/toldos/toldos-verticales-400.webp";
import toldoVertical600 from "../assets/toldos/toldos-verticales-600.webp";
import toldoVertical800 from "../assets/toldos/toldos-verticales-800.webp";

import sail1200 from "../assets/toldos/vela-1200.webp";
import sail400 from "../assets/toldos/vela-400.webp";
import sail600 from "../assets/toldos/vela-600.webp";
import sail800 from "../assets/toldos/vela-800.webp";

/* HERO */
const hero_480 = "/toldosProteccionSolar/toldo2-480.webp";
const hero_768 = "/toldosProteccionSolar/toldo2-768.webp";
const hero_1280 = "/toldosProteccionSolar/toldo2-1280.webp";
const hero_1920 = "/toldosProteccionSolar/toldo2-1920.webp";

/* extras */
import lightSensorImg from "../assets/toldos/extrasToldo/LightSensor.webp";
import calentadorImg from "../assets/toldos/extrasToldo/calentador.webp";
import tahomaImg from "../assets/toldos/extrasToldo/tahoma.webp";
import toldoLEDImg from "../assets/toldos/extrasToldo/toldoLED.webp";
import windSensorImg from "../assets/toldos/extrasToldo/windSensor.webp";

/* CTA */
import ctaImg from "../assets/Automatizacion/cortinaMotorizada.webp";

/* =========================
   IMAGE HELPERS
========================= */

const responsiveImages = {
  toldoCofre: {
    400: toldoCofre400,
    600: toldoCofre600,
    800: toldoCofre800,
    1200: toldoCofre1200,
  },
  hosteleria: {
    400: hosteleria400,
    600: hosteleria600,
    800: hosteleria800,
    1200: hosteleria1200,
  },
  pergola: {
    400: pergola400,
    600: pergola600,
    800: pergola800,
    1200: pergola1200,
  },
  toldoExtensible: {
    400: toldoExtensible400,
    600: toldoExtensible600,
    800: toldoExtensible800,
    1200: toldoExtensible1200,
  },
  toldoVertical: {
    400: toldoVertical400,
    600: toldoVertical600,
    800: toldoVertical800,
    1200: toldoVertical1200,
  },
  sail: {
    400: sail400,
    600: sail600,
    800: sail800,
    1200: sail1200,
  },
};

const getSrcSet = (images) =>
  `${images[400]} 400w, ${images[600]} 600w, ${images[800]} 800w, ${images[1200]} 1200w`;

const CARD_IMAGE_SIZES =
  "(max-width: 767px) 100vw, (max-width: 979px) 50vw, 540px";

/* =========================
   STYLES
========================= */

const Page = styled.main`
  width: 100%;
  background: #fff;
  color: #111;
`;

/* HERO */

const BlockSpacer = styled.div`
  margin-top: 3.25rem;

  @media (max-width: 768px) {
    margin-top: 2.4rem;
  }
`;

/* SECTION SHELL */

const Section = styled.section`
  padding: 5.5rem 2rem;

  @media (max-width: 768px) {
    padding: 3.8rem 1.5rem;
  }
`;

const SectionInner = styled.div`
  max-width: 1120px;
  margin: 0 auto;
`;

const IntroHeader = styled.div`
  max-width: 720px;
  margin: 0 auto 2.4rem;
  text-align: center;

  @media (max-width: 768px) {
    margin-bottom: 2rem;
  }
`;

const IntroTitle = styled.h2`
  margin: 0 0 1rem;
  font-size: 2.2rem;
  font-weight: 600;
  line-height: 1.12;
  color: #121212;

  span {
    color: ${({ theme }) => theme.colors.primary};
  }

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const IntroText = styled.p`
  margin: 0;
  font-size: 1.05rem;
  line-height: 1.7;
  color: rgba(17, 17, 17, 0.62);
`;

/* BENEFITS */

const BenefitsStrip = styled.div`
  margin: 2rem auto 2.25rem;
  max-width: 980px;
  padding: 1.25rem 1.2rem;
  border-radius: 18px;
  border: 1px solid rgba(17, 17, 17, 0.08);
  background: #fafafa;
  display: grid;
  gap: 0.75rem;

  @media (min-width: 900px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 1.1rem;
    padding: 1.25rem 1.35rem;
  }
`;

const Benefit = styled.p`
  margin: 0;
  font-size: 0.98rem;
  line-height: 1.6;
  color: rgba(17, 17, 17, 0.72);

  strong {
    color: rgba(17, 17, 17, 0.9);
    font-weight: 750;
  }
`;

const InlineSeoNote = styled.p`
  margin: 1.5rem 0 0;
  font-size: 1rem;
  line-height: 1.7;
  color: rgba(17, 17, 17, 0.68);

  a {
    color: ${({ theme }) => theme.colors.primary};
    font-weight: 650;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }
`;

const SeoBlock = styled.div`
  margin-top: 1.4rem;
  padding: 1.2rem 1.25rem;
  border-radius: 22px;
  background: rgba(17, 17, 17, 0.03);
  border: 1px solid rgba(17, 17, 17, 0.06);
`;

const SeoTitle = styled.h2`
  margin: 0 0 0.6rem;
  font-size: 1.2rem;
  font-weight: 800;
  color: rgba(17, 17, 17, 0.92);
`;

const SeoText = styled.p`
  margin: 0;
  line-height: 1.75;
  color: rgba(17, 17, 17, 0.68);

  & + & {
    margin-top: 0.8rem;
  }
`;

/* GRID */

const Grid = styled.div`
  display: grid;
  gap: 1.25rem;

  @media (min-width: 980px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Card = styled.article`
  border-radius: 22px;
  overflow: hidden;
  background: #fff;
  border: 1px solid rgba(17, 17, 17, 0.08);
  box-shadow: 0 24px 70px rgba(0, 0, 0, 0.08);
  transform: translateY(0);
  transition: transform 0.25s ease, box-shadow 0.25s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 34px 95px rgba(0, 0, 0, 0.12);
  }
  @media (hover: hover) and (pointer: fine) {
    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 34px 95px rgba(0, 0, 0, 0.12);
    }
  }
`;

const CardMedia = styled.div`
  position: relative;
  height: 240px;
  overflow: hidden;

  @media (max-width: 768px) {
    height: 210px;
  }
`;

const CardImage = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(1.01);
  transition: transform 0.6s ease;

  ${Card}:hover & {
    transform: scale(1.06);
  }
`;

const CardOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.04),
    rgba(0, 0, 0, 0.55)
  );
`;

const CardBadge = styled.div`
  position: absolute;
  top: 16px;
  left: 16px;
  z-index: 2;
  padding: 0.48rem 0.8rem;
  border-radius: 999px;
  font-size: 0.78rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  background: rgba(255, 255, 255, 0.9);
  color: rgba(17, 17, 17, 0.75);
`;

const CardContent = styled.div`
  padding: 1.8rem 1.75rem 1.65rem;

  @media (max-width: 768px) {
    padding: 1.55rem 1.45rem 1.4rem;
  }
`;

const CardTitle = styled.h3`
  font-size: 1.45rem;
  font-weight: 750;
  margin: 0 0 0.55rem;
  color: #111;
`;

const ValueLine = styled.p`
  margin: 0 0 0.95rem;
  font-size: 1.02rem;
  font-weight: 650;
  color: rgba(17, 17, 17, 0.8);
`;

const CardText = styled.p`
  margin: 0;
  font-size: 1.02rem;
  line-height: 1.7;
  color: rgba(17, 17, 17, 0.68);
`;

const SectionTight = styled(Section)`
  padding-top: 3.25rem;

  @media (max-width: 768px) {
    padding-top: 2.6rem;
  }
`;

const AccessoriesWrap = styled.div`
  margin-top: 3.25rem;

  @media (max-width: 768px) {
    margin-top: 2.4rem;
  }
`;

/* CTA */

const AutomationCTA = styled.section`
  padding: 0 2rem 5rem;

  @media (max-width: 768px) {
    padding: 0 1.5rem 4rem;
  }
`;

const AutomationCTAInner = styled.div`
  position: relative;
  max-width: 1120px;
  margin: 0 auto;
  border-radius: 24px;
  overflow: hidden;
  border: 1px solid rgba(17, 17, 17, 0.08);
  box-shadow: 0 26px 70px rgba(0, 0, 0, 0.12);
  display: grid;
  gap: 1.6rem;
  padding: 2.2rem 2rem;

  @media (min-width: 980px) {
    grid-template-columns: 1.25fr 0.75fr;
    align-items: center;
    padding: 2.6rem 2.4rem;
    gap: 2rem;
  }
`;

const AutomationCTABg = styled.div`
  position: absolute;
  inset: 0;
  background-image: url(${ctaImg});
  background-size: cover;
  background-position: center;
  z-index: 0;
`;

const AutomationCTAOverlay = styled.div`
  position: absolute;
  inset: -2px;
  background: radial-gradient(
      1100px 600px at 35% 35%,
      rgba(0, 0, 0, 0.35),
      rgba(0, 0, 0, 0.86)
    ),
    linear-gradient(to bottom, rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.25));
  z-index: 1;
  pointer-events: none;
`;

const AutomationLeft = styled.div`
  position: relative;
  z-index: 2;
  color: rgba(255, 255, 255, 0.95);
`;

const AutomationRight = styled.div`
  position: relative;
  z-index: 2;
  display: grid;
  gap: 0.9rem;

  @media (min-width: 980px) {
    justify-items: end;
    text-align: right;
  }
`;

const AutomationKicker = styled.p`
  margin: 0 0 0.6rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  font-size: 0.82rem;
  color: rgba(255, 255, 255, 0.78);
`;

const AutomationHeadline = styled.h2`
  margin: 0 0 0.85rem;
  font-size: 2.05rem;
  line-height: 1.12;
  font-weight: 750;
  letter-spacing: -0.02em;

  span {
    color: ${({ theme }) => theme.colors.primary};
  }

  @media (max-width: 768px) {
    font-size: 1.75rem;
  }
`;

const AutomationCopy = styled.p`
  margin: 0;
  max-width: 68ch;
  font-size: 1.05rem;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.82);
`;

const AutomationProof = styled.p`
  margin: 1rem 0 0;
  font-size: 0.98rem;
  line-height: 1.55;
  color: rgba(255, 255, 255, 0.82);
`;

const AutomationButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.85rem;
  align-items: stretch;

  @media (max-width: 979px) {
    flex-direction: column;
    width: 100%;
  }

  @media (min-width: 980px) {
    justify-content: flex-end;
  }
`;

const AutomationPrimary = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.55rem;
  padding: 0.95rem 1.6rem;
  min-width: 220px;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.primary};
  color: #0b0c0f;
  font-weight: 900;
  text-decoration: none;
  transition: transform 0.25s ease, opacity 0.25s ease;

  @media (max-width: 979px) {
    width: 100%;
  }

  &:hover {
    opacity: 0.92;
    transform: translateY(-1px);
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.18);
  }
`;

const AutomationSecondary = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.55rem;
  padding: 0.95rem 1.6rem;
  min-width: 220px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.16);
  color: rgba(255, 255, 255, 0.92);
  font-weight: 750;
  text-decoration: none;
  transition: transform 0.25s ease, background 0.25s ease;

  @media (max-width: 979px) {
    width: 100%;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.12);
    transform: translateY(-1px);
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.18);
  }
`;

/* DATA */

const FAQ_ITEMS = [
  {
    q: "¿Qué tipo de toldo necesito: extensible o cofre?",
    a: "Depende de la exposición y del uso. El toldo cofre protege el tejido y el mecanismo cuando está recogido (más durabilidad y acabado limpio). El extensible es ideal si buscas ligereza y sombra regulable.",
    aText:
      "Depende de la exposición y del uso. El toldo cofre protege el tejido y el mecanismo cuando está recogido (más durabilidad y acabado limpio). El extensible es ideal si buscas ligereza y sombra regulable.",
  },
  {
    q: "¿Qué pasa si hace viento?",
    a: "Podemos incluir sensor de viento para que el toldo se recoja automáticamente ante rachas. Así se reduce el riesgo de golpes y tensiones.",
    aText:
      "Podemos incluir sensor de viento para que el toldo se recoja automáticamente ante rachas. Así se reduce el riesgo de golpes y tensiones.",
  },
  {
    q: "¿Se puede motorizar un toldo?",
    a: "Sí. Hay opciones con mando, app y escenas. Si quieres, lo dejamos preparado para automatización (sensores y control inteligente) desde el principio.",
    aText:
      "Sí. Hay opciones con mando, app y escenas. Si quieres, lo dejamos preparado para automatización (sensores y control inteligente) desde el principio.",
  },
  {
    q: "¿Incluís visita, medición e instalación?",
    a: "Sí. Medimos en tu espacio, te asesoramos y hacemos una instalación limpia con ajuste final para que el toldo funcione suave y seguro.",
    aText:
      "Sí. Medimos en tu espacio, te asesoramos y hacemos una instalación limpia con ajuste final para que el toldo funcione suave y seguro.",
  },
  {
    q: "¿Cuánto tarda el proceso?",
    a: "Tras la visita y la elección, te confirmamos plazos reales de fabricación e instalación según sistema y tejido.",
    aText:
      "Tras la visita y la elección, te confirmamos plazos reales de fabricación e instalación según sistema y tejido.",
  },
];

const CARD_ITEMS = [
  {
    badge: "Terrazas",
    title: "Toldos extensibles",
    value: "Sombra regulable con estética ligera.",
    text: "Ideales para terrazas y balcones. Permiten ajustar la proyección según el momento del día y el uso del espacio.",
    images: responsiveImages.toldoExtensible,
    alt: "Toldo extensible instalado en terraza",
  },
  {
    badge: "Alta protección",
    title: "Toldos cofre",
    value: "Acabado limpio, mecanismo protegido.",
    text: "Sistemas robustos y duraderos. El tejido y los brazos quedan resguardados, cuidando el conjunto y alargando su vida útil.",
    images: responsiveImages.toldoCofre,
    alt: "Toldo cofre instalado en fachada",
  },
  {
    badge: "Privacidad",
    title: "Toldos verticales / screen",
    value: "Control solar y privacidad con discreción.",
    text: "Perfectos para porches, cerramientos y grandes ventanales. Filtran la luz, reducen el calor y aumentan el confort.",
    images: responsiveImages.toldoVertical,
    alt: "Toldo vertical o screen en exterior",
  },
  {
    badge: "Negocio",
    title: "Toldos para hostelería",
    value: "Resistencia, presencia y funcionalidad.",
    text: "Soluciones para terrazas comerciales con tejidos y estructuras pensadas para el uso intensivo y la imagen del local.",
    images: responsiveImages.hosteleria,
    alt: "Toldo para hostelería en terraza comercial",
  },
];

const SECONDARY_ITEMS = [
  {
    badge: "Estructura",
    title: "Pérgolas",
    value: "Arquitectura exterior con presencia.",
    text: "Estructuras elegantes para crear espacios exteriores habitables, con soluciones adaptadas a cada entorno.",
    images: responsiveImages.pergola,
    alt: "Pérgola instalada en exterior",
  },
  {
    badge: "Ligereza",
    title: "Velas de sombra",
    value: "Diseño contemporáneo y sombra flexible.",
    text: "Soluciones ligeras para jardines y zonas abiertas, con un resultado limpio y moderno.",
    images: responsiveImages.sail,
    alt: "Vela de sombra en jardín",
  },
];

/* PAGE */

export default function ToldosProteccionSolar({ onOpenAsesoramiento }) {
  const baseUrl = "https://www.traverdecoraciontextil.es";

  const canonical = `${baseUrl}/toldos-proteccion-solar`;
  const siteName = CONTACT.siteName;

  const title =
    "Toldos en Castellón | Instalación de toldos y protección solar a medida";
  const description =
    "Instalación de toldos en Castellón a medida: toldos extensibles, cofre, verticales, pérgolas y protección solar para terrazas, balcones y negocios. Visita e instalación profesional.";
  const ogImage = `${baseUrl}/og.png`;
  const ogImageAlt =
    "Toldos y protección solar a medida — Traver Decoración Textil";

  const businessId = `${baseUrl}/#business`;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${canonical}#webpage`,
      url: canonical,
      name: title,
      description,
      inLanguage: "es-ES",
      isPartOf: { "@id": `${baseUrl}/#website` },
      about: { "@id": businessId },
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: ogImage,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "@id": `${canonical}#breadcrumbs`,
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
          name: "Toldos y protección solar",
          item: canonical,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${canonical}#service`,
      name: "Instalación de toldos y protección solar en Castellón",
      serviceType:
        "Instalación de toldos a medida, protección solar y sistemas de sombra",
      provider: { "@id": businessId },
      areaServed: [
        { "@type": "City", name: "Almassora" },
        { "@type": "City", name: "Castellón de la Plana" },
        { "@type": "AdministrativeArea", name: "Castellón" },
        { "@type": "AdministrativeArea", name: "Valencia" },
      ],
      offers: {
        "@type": "Offer",
        availability: "https://schema.org/InStock",
        url: canonical,
      },
    },
  ];

  const faqItems = useMemo(() => FAQ_ITEMS, []);

  return (
    <Page>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href={canonical} />

        {/* Hero preload is already handled in index.html */}

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

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />
        <meta name="twitter:image:alt" content={ogImageAlt} />

        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <ServiceHero
        eyebrow="Protección solar · Exterior"
        title={
          <>
            Toldos & <span>Protección solar</span>
          </>
        }
        subtitle="Disfruta de tu terraza todo el año con soluciones de sombra elegantes, duraderas y adaptadas a tu espacio."
        hero480={hero_480}
        hero768={hero_768}
        hero1280={hero_1280}
        hero1920={hero_1920}
        primaryLabel="Solicitar propuesta"
        primaryTrackSource="toldos_proteccion_solar"
        primaryPack="Toldos"
        primaryCtaName="solicitar_propuesta"
        secondaryLabel="Ver tipos de toldos"
        secondaryHref="#tipos"
        onOpenAsesoramiento={onOpenAsesoramiento}
      />

      <Section id="tipos">
        <SectionInner>
          <IntroHeader>
            <IntroTitle>
              Toldos <span>a medida</span>
            </IntroTitle>

            <IntroText>
              Instalamos toldos en Castellón para terrazas, balcones, jardines,
              fachadas y negocios. Te asesoramos para elegir entre toldos
              extensibles, toldos cofre, sistemas verticales, pérgolas y otras
              soluciones de protección solar según la orientación, el uso del
              espacio y el resultado estético que buscas.
            </IntroText>
          </IntroHeader>

          <Grid>
            {CARD_ITEMS.map((item) => (
              <Card key={item.title}>
                <CardMedia>
                  <CardImage
                    src={item.images[600]}
                    srcSet={getSrcSet(item.images)}
                    sizes={CARD_IMAGE_SIZES}
                    alt={item.alt}
                    loading="lazy"
                    decoding="async"
                  />
                  <CardOverlay />
                  <CardBadge>{item.badge}</CardBadge>
                </CardMedia>

                <CardContent>
                  <CardTitle>{item.title}</CardTitle>
                  <ValueLine>{item.value}</ValueLine>
                  <CardText>{item.text}</CardText>
                </CardContent>
              </Card>
            ))}
          </Grid>

          <SectionInner>
            <BlockSpacer>
              <IntroHeader>
                <IntroTitle>
                  Instalación de <span>toldos en Castellón</span>
                </IntroTitle>
                <IntroText>
                  Realizamos instalación de toldos en Castellón y alrededores,
                  estudiando la orientación solar, el tipo de fachada y el uso
                  del espacio para recomendar la solución más adecuada.
                  Trabajamos tanto en viviendas como en negocios, con
                  instalación segura, limpia y duradera.
                </IntroText>
              </IntroHeader>
            </BlockSpacer>
          </SectionInner>

          <BlockSpacer>
            <SectionIntro
              kicker="Complementos"
              title={
                <>
                  Otras <span>soluciones</span> de sombra
                </>
              }
              lead={
                <>
                  Cuando el proyecto lo exige, combinamos toldos con sistemas
                  estructurales para crear exterior habitable todo el año.
                </>
              }
            />
          </BlockSpacer>

          <Grid>
            {SECONDARY_ITEMS.map((item) => (
              <Card key={item.title}>
                <CardMedia>
                  <CardImage
                    src={item.images[600]}
                    srcSet={getSrcSet(item.images)}
                    sizes={CARD_IMAGE_SIZES}
                    alt={item.alt}
                    loading="lazy"
                    decoding="async"
                  />
                  <CardOverlay />
                  <CardBadge>{item.badge}</CardBadge>
                </CardMedia>

                <CardContent>
                  <CardTitle>{item.title}</CardTitle>
                  <ValueLine>{item.value}</ValueLine>
                  <CardText>{item.text}</CardText>
                </CardContent>
              </Card>
            ))}
          </Grid>
          <InlineSeoNote>
            Si buscas un sistema más avanzado, también puedes ver nuestras
            soluciones de{" "}
            <Link to="/automatizacion">
              automatización para toldos y cortinas
            </Link>
            .
          </InlineSeoNote>
          <BlockSpacer>
            <SectionIntro
              kicker="Accesorios"
              title={
                <>
                  Accesorios <span>premium</span> para tu toldo
                </>
              }
              lead="Sensores, iluminación y confort para una terraza perfecta."
            />
          </BlockSpacer>

          <AccessoriesWrap>
            <AwningAccessories
              items={[
                {
                  key: "smart",
                  title: "Tecnología inteligente",
                  description: "Automatiza tu toldo con control avanzado.",
                  image: tahomaImg,
                  size: "big",
                },
                {
                  key: "led",
                  title: "LED ambiente",
                  description: "Luz cálida integrada para noches exteriores.",
                  image: toldoLEDImg,
                },
                {
                  key: "wind",
                  title: "Sensor de viento",
                  description: "Se recoge automáticamente ante rachas.",
                  image: windSensorImg,
                },
                {
                  key: "heat",
                  title: "Calefacción",
                  description: "Confort exterior incluso en invierno.",
                  image: calentadorImg,
                },
                {
                  key: "sun",
                  title: "Sensor solar",
                  description: "Se adapta a la intensidad de la luz.",
                  image: lightSensorImg,
                },
              ]}
            />
          </AccessoriesWrap>
        </SectionInner>
      </Section>

      <AutomationCTA aria-label="CTA automatización">
        <AutomationCTAInner>
          <AutomationCTABg aria-hidden="true" />
          <AutomationCTAOverlay aria-hidden="true" />

          <AutomationLeft>
            <AutomationKicker>Automatización</AutomationKicker>

            <AutomationHeadline>
              ¿Quieres que el toldo responda <span>solo</span>?
            </AutomationHeadline>

            <AutomationCopy>
              Sensores de viento y sol, control por app y escenas programadas.
              Confort exterior sin preocuparte por recogerlo a tiempo.
            </AutomationCopy>

            <AutomationProof>
              ✓ Visita y medición en Castellón · instalación profesional ·
              opciones de motor y sensores
            </AutomationProof>
          </AutomationLeft>

          <AutomationRight>
            <AutomationButtons>
              <AutomationPrimary
                to="/contact"
                onClick={(e) => {
                  e.preventDefault();

                  trackCtaClick(
                    "toldos_proteccion_solar_primary",
                    "pedir_asesoramiento"
                  );

                  trackOpenQuickEnquiry(
                    "toldos_proteccion_solar_primary",
                    "Toldos"
                  );

                  onOpenAsesoramiento?.(
                    "Toldos",
                    "toldos_proteccion_solar_primary"
                  );
                }}
              >
                Pedir asesoramiento
              </AutomationPrimary>

              <AutomationSecondary to="/automatizacion">
                Ver automatización <span aria-hidden="true">→</span>
              </AutomationSecondary>
            </AutomationButtons>
          </AutomationRight>
        </AutomationCTAInner>
      </AutomationCTA>

      <SectionTight aria-label="Preguntas frecuentes">
        <SectionInner>
          <SectionIntro
            kicker="FAQ"
            title={
              <>
                Preguntas <span>frecuentes</span>
              </>
            }
            lead={
              <>
                Lo importante antes de decidir: viento, sistemas, motorización,
                tiempos y montaje.
              </>
            }
          />

          <FaqAccordion
            items={faqItems}
            withSchema
            canonicalUrl={canonical}
            defaultOpenIndex={-1}
            ariaLabel="Preguntas frecuentes sobre toldos y protección solar"
          />
        </SectionInner>
      </SectionTight>

      <StickyCtaButton message="Hola, quiero una propuesta para toldos. ¿Podemos agendar una visita?" />
    </Page>
  );
}
