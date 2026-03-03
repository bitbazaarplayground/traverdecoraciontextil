import { useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import styled from "styled-components";
import heroImg from "../assets/toldos/toldo2.webp";
import { trackEvent } from "../lib/analytics";
import StickyCtaButton from "../mobile/StickyCtaButton";
/* =========================
   COMPONENTS
========================= */
import FaqAccordion from "../components/faq/FaqAccordion";
import AwningAccessories from "../components/toldos/AwningAccessories";
import SectionIntro from "../components/ui/SectionIntro";

import { CONTACT } from "../config/contact";

/* =========================
   IMAGES (local assets)
========================= */
import toldoCofreImg from "../assets/toldos/cofre.webp";
import hosteleriaImg from "../assets/toldos/hosteleria.webp";
import pergolaImg from "../assets/toldos/pergola.webp";
import toldoExtensibleImg from "../assets/toldos/toldo1.webp";
import toldoVerticalImg from "../assets/toldos/toldos-verticales.webp";
import sailImg from "../assets/toldos/vela.webp";

/* =========================
   IMAGES (extras toldos)
========================= */
import lightSensorImg from "../assets/toldos/extrasToldo/LightSensor.webp";
import calentadorImg from "../assets/toldos/extrasToldo/calentador.webp";
import tahomaImg from "../assets/toldos/extrasToldo/tahoma.webp";
import toldoLEDImg from "../assets/toldos/extrasToldo/toldoLED.webp";
import windSensorImg from "../assets/toldos/extrasToldo/windSensor.webp";
/* =========================
   CTA
========================= */
import ctaImg from "../assets/Automatizacion/cortinaMotorizada.webp";
/* =========================
   STYLES
========================= */

const Page = styled.main`
  width: 100%;
  background: #fff;
  color: #111;
`;

/* =========================
   HERO
========================= */

const Hero = styled.section`
  position: relative;
  min-height: 45vh;
  display: flex;
  margin-top: 3.5rem;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 5rem 2rem;
  color: #fff;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 4rem 1.5rem;
  }
`;

const HeroBg = styled.div`
  position: absolute;
  inset: 0;
  background-image: url(${heroImg});
  background-size: cover;
  background-position: center;
  transform: scale(1.02);
  filter: saturate(1.02) contrast(1.03);
  z-index: 0;
`;

const HeroOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: radial-gradient(
      1200px 700px at 50% 35%,
      rgba(0, 0, 0, 0.06),
      rgba(0, 0, 0, 0.45)
    ),
    linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.22) 0%,
      rgba(0, 0, 0, 0.48) 55%,
      rgba(0, 0, 0, 0.58) 100%
    );
  z-index: 1;
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 1100px;
  text-align: center;
`;

const Eyebrow = styled.p`
  margin: 0 0 0.9rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.72);
`;

const HeroTitle = styled.h1`
  font-size: 3.2rem;
  font-weight: 650;
  line-height: 1.06;
  margin: 0 0 1.1rem;

  span {
    color: ${({ theme }) => theme.colors.primary};
  }

  @media (max-width: 768px) {
    font-size: 2.35rem;
    line-height: 1.1;
  }
`;

const HeroSubtitle = styled.p`
  margin: 0 auto;
  max-width: 68ch;
  font-size: 1.12rem;
  line-height: 1.75;
  color: rgba(255, 255, 255, 0.78);
`;

const HeroActions = styled.div`
  margin-top: 1.9rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.9rem;
  flex-wrap: wrap;
`;

const PrimaryButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.95rem 2.1rem;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.primary};
  color: #0b0c0f;
  font-weight: 850;
  text-decoration: none;
  transition: transform 0.25s ease, opacity 0.25s ease;

  &:hover {
    opacity: 0.92;
    transform: translateY(-1px);
  }
`;

const SecondaryButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.95rem 2.05rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.07);
  border: 1px solid rgba(255, 255, 255, 0.14);
  color: rgba(255, 255, 255, 0.92);
  font-weight: 650;
  text-decoration: none;
  transition: transform 0.25s ease, background 0.25s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateY(-1px);
  }
`;
const BlockSpacer = styled.div`
  margin-top: 3.25rem;

  @media (max-width: 768px) {
    margin-top: 2.4rem;
  }
`;

/* =========================
   SECTION SHELL
========================= */

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

const Kicker = styled.p`
  margin: 0 0 0.55rem;
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
/* =========================
   BENEFITS STRIP
========================= */

const BenefitsStrip = styled.div`
  margin: 2rem auto 2.25rem; /* was: 2rem auto 0 */
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

/* =========================
   GRID (premium cards)
========================= */

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
`;

const CardMedia = styled.div`
  position: relative;
  height: 240px;
  overflow: hidden;

  @media (max-width: 768px) {
    height: 210px;
  }
`;

const CardImg = styled.div`
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
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
  padding-top: 3.25rem; /* was 5.5rem */

  @media (max-width: 768px) {
    padding-top: 2.6rem; /* was 3.8rem */
  }
`;
const AccessoriesWrap = styled.div`
  margin-top: 3.25rem;

  @media (max-width: 768px) {
    margin-top: 2.4rem;
  }
`;
/* =========================
   CTA
========================= */
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
  overflow: hidden; /* clips bg + overlay perfectly */

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
  transform: scale(1.04);
  filter: saturate(1.03) contrast(1.03);
  z-index: 0;
`;

const AutomationCTAOverlay = styled.div`
  position: absolute;
  inset: -2px; /* removes 1px seams */

  /* Darker, premium */
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
`;
/* =========================
   DATA
========================= */

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

/* =========================
   PAGE
========================= */

export default function ToldosProteccionSolar({ onOpenAsesoramiento }) {
  const baseUrl = (
    import.meta.env.VITE_SITE_URL || window.location.origin
  ).replace(/\/$/, "");

  const canonical = `${baseUrl}/toldos-proteccionsolar`;
  const siteName = CONTACT.siteName;

  const title =
    "Toldos y protección solar | Sombra a medida en Castellón y Valencia";
  const description =
    "Toldos a medida en Castellón y Valencia: extensibles, cofre, verticales/screen, hostelería, pérgolas y velas de sombra. Medición e instalación profesional.";

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
      name: "Toldos y protección solar a medida",
      serviceType: "Toldos, protección solar y sistemas de sombra",
      provider: { "@id": businessId },
      areaServed: [
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

      {/* HERO */}
      <Hero>
        <HeroBg />
        <HeroOverlay />

        <HeroContent>
          <Eyebrow>Protección solar · Exterior</Eyebrow>
          <HeroTitle>
            Toldos & <span>Sombra a medida</span>
          </HeroTitle>
          <HeroSubtitle>
            Confort térmico, estética y durabilidad. Soluciones que mejoran el
            uso real de terrazas, jardines y fachadas sin comprometer el diseño.
          </HeroSubtitle>

          <HeroActions>
            <PrimaryButton
              to="/contact"
              onClick={(e) => {
                e.preventDefault();

                trackEvent("open_quick_enquiry", {
                  source: "toldos_proteccion_solar",
                  pack: "Toldos",
                });

                onOpenAsesoramiento?.("Toldos", "toldos_proteccion_solar");
              }}
            >
              Solicitar propuesta
            </PrimaryButton>
            <SecondaryButton href="#tipos">Ver tipos de toldos</SecondaryButton>
          </HeroActions>
        </HeroContent>
      </Hero>

      {/* INTRO + BENEFITS */}
      <Section id="tipos">
        <SectionInner>
          <IntroHeader>
            <IntroTitle>
              Toldos <span>a medida</span>
            </IntroTitle>
            <IntroText>
              Seleccionamos el sistema adecuado según orientación, uso y
              arquitectura. Medimos, instalamos y ajustamos con precisión para
              un resultado sólido y discreto.
            </IntroText>
          </IntroHeader>

          <BenefitsStrip>
            <Benefit>
              <strong>Confort térmico:</strong> menos calor, más sombra útil.
            </Benefit>
            <Benefit>
              <strong>Instalación limpia:</strong> detalles cuidados y ajuste
              final.
            </Benefit>
            <Benefit>
              <strong>Durabilidad:</strong> sistemas preparados para el uso
              real.
            </Benefit>
          </BenefitsStrip>

          <Grid>
            <Card>
              <CardMedia>
                <CardImg
                  style={{ backgroundImage: `url(${toldoExtensibleImg})` }}
                />
                <CardOverlay />
                <CardBadge>Terrazas</CardBadge>
              </CardMedia>

              <CardContent>
                <CardTitle>Toldos extensibles</CardTitle>
                <ValueLine>Sombra regulable con estética ligera.</ValueLine>
                <CardText>
                  Ideales para terrazas y balcones. Permiten ajustar la
                  proyección según el momento del día y el uso del espacio.
                </CardText>
              </CardContent>
            </Card>

            <Card>
              <CardMedia>
                <CardImg style={{ backgroundImage: `url(${toldoCofreImg})` }} />
                <CardOverlay />
                <CardBadge>Alta protección</CardBadge>
              </CardMedia>

              <CardContent>
                <CardTitle>Toldos cofre</CardTitle>
                <ValueLine>Acabado limpio, mecanismo protegido.</ValueLine>
                <CardText>
                  Sistemas robustos y duraderos. El tejido y los brazos quedan
                  resguardados, cuidando el conjunto y alargando su vida útil.
                </CardText>
              </CardContent>
            </Card>

            <Card>
              <CardMedia>
                <CardImg
                  style={{ backgroundImage: `url(${toldoVerticalImg})` }}
                />
                <CardOverlay />
                <CardBadge>Privacidad</CardBadge>
              </CardMedia>

              <CardContent>
                <CardTitle>Toldos verticales / screen</CardTitle>
                <ValueLine>
                  Control solar y privacidad con discreción.
                </ValueLine>
                <CardText>
                  Perfectos para porches, cerramientos y grandes ventanales.
                  Filtran la luz, reducen el calor y aumentan el confort.
                </CardText>
              </CardContent>
            </Card>

            <Card>
              <CardMedia>
                <CardImg style={{ backgroundImage: `url(${hosteleriaImg})` }} />
                <CardOverlay />
                <CardBadge>Negocio</CardBadge>
              </CardMedia>

              <CardContent>
                <CardTitle>Toldos para hostelería</CardTitle>
                <ValueLine>Resistencia, presencia y funcionalidad.</ValueLine>
                <CardText>
                  Soluciones para terrazas comerciales con tejidos y estructuras
                  pensadas para el uso intensivo y la imagen del local.
                </CardText>
              </CardContent>
            </Card>
          </Grid>

          {/* SECONDARY */}
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
            <Card>
              <CardMedia>
                <CardImg style={{ backgroundImage: `url(${pergolaImg})` }} />
                <CardOverlay />
                <CardBadge>Estructura</CardBadge>
              </CardMedia>

              <CardContent>
                <CardTitle>Pérgolas</CardTitle>
                <ValueLine>Arquitectura exterior con presencia.</ValueLine>
                <CardText>
                  Estructuras elegantes para crear espacios exteriores
                  habitables, con soluciones adaptadas a cada entorno.
                </CardText>
              </CardContent>
            </Card>

            <Card>
              <CardMedia>
                <CardImg style={{ backgroundImage: `url(${sailImg})` }} />
                <CardOverlay />
                <CardBadge>Ligereza</CardBadge>
              </CardMedia>

              <CardContent>
                <CardTitle>Velas de sombra</CardTitle>
                <ValueLine>Diseño contemporáneo y sombra flexible.</ValueLine>
                <CardText>
                  Soluciones ligeras para jardines y zonas abiertas, con un
                  resultado limpio y moderno.
                </CardText>
              </CardContent>
            </Card>
          </Grid>
          {/* ACCESSORIES */}
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

      {/* CTA — Automatización */}
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
              ✓ Visita + propuesta sin coste · instalación profesional ·
              configuración de escenas
            </AutomationProof>
          </AutomationLeft>

          <AutomationRight>
            <AutomationButtons>
              <AutomationPrimary
                to="/contact"
                onClick={(e) => {
                  e.preventDefault();

                  trackEvent("open_quick_enquiry", {
                    source: "toldos_proteccion_solar_primary",
                    pack: "Toldos",
                  });

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
