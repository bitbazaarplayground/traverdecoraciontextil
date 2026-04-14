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
import AutomationOptionsGrid from "../components/toldos/AutomationOptionsGrid";
import ProcesoToldosSlider from "../components/toldos/ProcesoToldosSlider";

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

const Section = styled.section`
  padding: 5.5rem 2rem;

  @media (max-width: 768px) {
    padding: 3.8rem 1.5rem;
  }
`;
const TightSection = styled(Section)`
  padding-top: 2.2rem;
  padding-bottom: 5rem;

  @media (max-width: 768px) {
    padding-top: 1.6rem;
    padding-bottom: 3.8rem;
  }
`;
const SectionTight = styled(Section)`
  padding-top: 0.25rem;

  @media (max-width: 768px) {
    padding-top: 2.6rem;
  }
`;

const SoftSection = styled(Section)`
  padding-top: 1.1rem;
  padding-bottom: 4.25rem;
  background: linear-gradient(
    to bottom,
    rgba(248, 248, 248, 0.7),
    rgba(255, 255, 255, 1)
  );

  @media (max-width: 768px) {
    padding-top: 1.2rem;
    padding-bottom: 3.4rem;
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
  font-size: 2.25rem;
  font-weight: 700;
  line-height: 1.12;
  color: #121212;
  letter-spacing: -0.02em;

  span {
    color: ${({ theme }) => theme.colors.primary};
  }

  @media (max-width: 768px) {
    font-size: 1.82rem;
  }
`;

const IntroText = styled.p`
  margin: 0;
  font-size: 1.05rem;
  line-height: 1.75;
  color: rgba(17, 17, 17, 0.66);
`;

const BlockSpacer = styled.div`
  margin-top: 3.25rem;

  @media (max-width: 768px) {
    margin-top: 2.4rem;
  }
`;

const LocalHighlight = styled.div`
  padding: 1.65rem 1.4rem;
  border-radius: 26px;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.94),
    rgba(248, 248, 248, 0.96)
  );
  border: 1px solid rgba(17, 17, 17, 0.07);
  box-shadow: 0 22px 60px rgba(17, 17, 17, 0.06);

  @media (min-width: 980px) {
    padding: 1.9rem 1.8rem;
  }
`;

const LocalTop = styled.div`
  margin-bottom: 1.15rem;
`;

const LocalEyebrow = styled.p`
  margin: 0 0 0.45rem;
  font-size: 0.78rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(17, 17, 17, 0.5);
`;

const LocalTitle = styled.h3`
  margin: 0;
  font-size: clamp(1.35rem, 2.3vw, 1.8rem);
  line-height: 1.16;
  letter-spacing: -0.02em;
  color: rgba(17, 17, 17, 0.92);
  font-weight: 750;

  span {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const LocalGrid = styled.div`
  display: grid;
  gap: 1rem;

  @media (min-width: 900px) {
    grid-template-columns: 1fr 1fr;
    gap: 1.4rem;
  }
`;

const LocalText = styled.p`
  margin: 0;
  font-size: 1rem;
  line-height: 1.78;
  color: rgba(17, 17, 17, 0.68);
`;

const LocalMeta = styled.div`
  margin-top: 1.25rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.7rem;
`;

const LocalMetaItem = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 0.55rem 0.8rem;
  border-radius: 999px;
  background: rgba(17, 17, 17, 0.05);
  border: 1px solid rgba(17, 17, 17, 0.07);
  font-size: 0.82rem;
  font-weight: 700;
  color: rgba(17, 17, 17, 0.72);
`;

const SeoBlock = styled.div`
  margin-top: 1.5rem;
  padding: 1.2rem 1.25rem;
  border-radius: 22px;
  background: rgba(17, 17, 17, 0.03);
  border: 1px solid rgba(17, 17, 17, 0.06);
`;

const SeoTitle = styled.h2`
  margin: 0 0 0.55rem;
  font-size: 1.15rem;
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

  a {
    color: ${({ theme }) => theme.colors.primary};
    font-weight: 700;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }
`;

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
  background: rgba(255, 255, 255, 0.92);
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
  color: rgba(17, 17, 17, 0.82);
`;

const CardText = styled.p`
  margin: 0;
  font-size: 1.02rem;
  line-height: 1.72;
  color: rgba(17, 17, 17, 0.68);
`;

const CardActions = styled.div`
  margin-top: 1.1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
`;

const CardAction = styled.button`
  appearance: none;
  border: 0;
  background: transparent;
  padding: 0;
  font: inherit;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 800;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const CardLink = styled(Link)`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 800;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const AccessoriesWrap = styled.div`
  margin-top: 3.25rem;

  @media (max-width: 768px) {
    margin-top: 2.4rem;
  }
`;

const LinkCluster = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem 1rem;
`;

const TextLink = styled(Link)`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 750;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const BenefitsSection = styled(Section)`
  padding-top: 1rem;
`;

const BenefitLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1.2rem;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 750;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

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

/* =========================
   DATA
========================= */

const FAQ_ITEMS = [
  {
    q: "¿Qué tipo de toldo necesito: extensible o cofre?",
    a: "Depende de la exposición, del uso diario y del nivel de protección que busques. El toldo cofre protege el tejido y el mecanismo cuando está recogido, mientras que el extensible ofrece una solución ligera y muy versátil para terrazas y balcones.",
    aText:
      "Depende de la exposición, del uso diario y del nivel de protección que busques. El toldo cofre protege el tejido y el mecanismo cuando está recogido, mientras que el extensible ofrece una solución ligera y muy versátil para terrazas y balcones.",
  },
  {
    q: "¿Instaláis toldos en viviendas y negocios?",
    a: "Sí. Instalamos toldos a medida tanto en viviendas como en locales, restaurantes, cafeterías, terrazas comerciales y otros espacios exteriores que necesiten protección solar.",
    aText:
      "Sí. Instalamos toldos a medida tanto en viviendas como en locales, restaurantes, cafeterías, terrazas comerciales y otros espacios exteriores que necesiten protección solar.",
  },
  {
    q: "¿Se puede motorizar un toldo?",
    a: "Sí. Podemos instalar toldos motorizados con mando, app, sensores de viento o sol y opciones de automatización. También te asesoramos si quieres integrar el sistema con otros productos del hogar o del negocio.",
    aText:
      "Sí. Podemos instalar toldos motorizados con mando, app, sensores de viento o sol y opciones de automatización. También te asesoramos si quieres integrar el sistema con otros productos del hogar o del negocio.",
  },
  {
    q: "¿Incluís visita, medición e instalación?",
    a: "Sí. Realizamos visita, medición, propuesta y una instalación profesional adaptada al tipo de fachada, estructura o espacio exterior.",
    aText:
      "Sí. Realizamos visita, medición, propuesta y una instalación profesional adaptada al tipo de fachada, estructura o espacio exterior.",
  },
  {
    q: "¿Qué pasa si hace viento?",
    a: "Podemos incorporar sensores de viento para que el toldo se recoja automáticamente cuando detecta rachas, reduciendo riesgos y mejorando la protección del sistema.",
    aText:
      "Podemos incorporar sensores de viento para que el toldo se recoja automáticamente cuando detecta rachas, reduciendo riesgos y mejorando la protección del sistema.",
  },
  {
    q: "¿Trabajáis en Castellón y alrededores?",
    a: "Sí. Realizamos instalaciones de toldos en Castellón y zonas cercanas, estudiando cada caso para recomendar la solución más adecuada según orientación, uso y medidas.",
    aText:
      "Sí. Realizamos instalaciones de toldos en Castellón y zonas cercanas, estudiando cada caso para recomendar la solución más adecuada según orientación, uso y medidas.",
  },
];

const CARD_ITEMS = [
  {
    badge: "Terrazas y balcones",
    title: "Toldos extensibles",
    value: "Sombra regulable y uso cómodo en el día a día.",
    text: "Ideales para terrazas y balcones donde buscas una solución ligera, elegante y funcional. Permiten ajustar la proyección según la hora del día y el uso real del espacio.",
    images: responsiveImages.toldoExtensible,
    alt: "Toldo extensible instalado en una terraza exterior en Castellón",
    enquiryPack: "Toldos extensibles",
  },
  {
    badge: "Alta protección",
    title: "Toldos cofre",
    value: "Mecanismo protegido y acabado más limpio.",
    text: "Una opción muy valorada cuando quieres cuidar el tejido y el sistema al máximo. Al quedar protegido cuando se recoge, el conjunto gana durabilidad y presencia estética.",
    images: responsiveImages.toldoCofre,
    alt: "Toldo cofre instalado en una fachada de vivienda",
    enquiryPack: "Toldos cofre",
  },
  {
    badge: "Privacidad y confort",
    title: "Toldos verticales / screen",
    value: "Filtran luz, mejoran el confort y aportan privacidad.",
    text: "Perfectos para porches, ventanas, cerramientos y zonas expuestas. Ayudan a controlar el calor y la luz sin perder ligereza visual.",
    images: responsiveImages.toldoVertical,
    alt: "Toldo vertical screen para control solar exterior",
    enquiryPack: "Toldos verticales",
  },
  {
    badge: "Hostelería y negocio",
    title: "Toldos para hostelería",
    value: "Resistencia, imagen cuidada y funcionalidad comercial.",
    text: "Soluciones diseñadas para terrazas de bares, restaurantes y negocios que necesitan protección solar, buena presencia y sistemas preparados para un uso intensivo.",
    images: responsiveImages.hosteleria,
    alt: "Toldo para hostelería en terraza comercial",
    enquiryPack: "Toldos para hostelería",
  },
];

const SECONDARY_ITEMS = [
  {
    badge: "Exterior estructural",
    title: "Pérgolas",
    value: "Espacios exteriores más habitables y con presencia.",
    text: "Cuando el proyecto requiere más estructura, las pérgolas permiten crear zonas exteriores confortables y bien resueltas durante más meses del año.",
    images: responsiveImages.pergola,
    alt: "Pérgola exterior instalada en vivienda",
    enquiryPack: "Pérgolas",
  },
  {
    badge: "Ligereza visual",
    title: "Velas de sombra",
    value: "Diseño contemporáneo y sombra flexible.",
    text: "Una alternativa ligera y moderna para jardines y espacios abiertos donde se busca protección solar con un resultado limpio y actual.",
    images: responsiveImages.sail,
    alt: "Vela de sombra en jardín exterior",
    enquiryPack: "Velas de sombra",
  },
];

/* =========================
   PAGE
========================= */

export default function Toldos2({ onOpenAsesoramiento }) {
  const baseUrl = "https://www.traverdecoraciontextil.es";
  const canonical = `${baseUrl}/toldos-proteccion-solar`;
  const siteName = CONTACT.siteName;

  const title =
    "Toldos en Castellón | Toldos a medida e instalación profesional";
  const description =
    "Instalamos toldos en Castellón y alrededores: toldos extensibles, cofre, verticales, pérgolas y soluciones de protección solar a medida para terrazas, balcones, jardines y negocios.";
  const ogImage = `${baseUrl}/og.png`;
  const ogImageAlt =
    "Toldos a medida y protección solar en Castellón — Traver Decoración Textil";

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
          name: "Toldos y protección solar",
          item: canonical,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${canonical}#service`,
      name: "Instalación de toldos en Castellón",
      serviceType:
        "Toldos a medida, instalación de toldos y protección solar exterior",
      provider: { "@id": businessId },
      areaServed: [
        { "@type": "City", name: "Almassora" },
        { "@type": "City", name: "Castellón de la Plana" },
        { "@type": "AdministrativeArea", name: "Castellón" },
      ],
      offers: {
        "@type": "Offer",
        availability: "https://schema.org/InStock",
        url: canonical,
      },
    },
  ];

  const faqItems = useMemo(() => FAQ_ITEMS, []);

  function openAdvice(pack = "Toldos", source = "toldos_proteccion_solar") {
    trackCtaClick(source, "pedir_asesoramiento");
    trackOpenQuickEnquiry(source, pack);
    onOpenAsesoramiento?.(pack, source);
  }

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

      <ServiceHero
        eyebrow="Toldos · Protección solar exterior"
        title={
          <>
            Toldos en <span>Castellón</span> y protección solar a medida
          </>
        }
        subtitle="Instalamos toldos a medida para terrazas, balcones, jardines y negocios, con soluciones duraderas, elegantes y adaptadas a cada espacio."
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
              Tipos de <span>toldos</span> para cada espacio
            </IntroTitle>
            <IntroText>
              Te ayudamos a elegir entre toldos extensibles, toldos cofre,
              toldos verticales y otras soluciones de protección solar según la
              orientación, el uso del espacio y el resultado que buscas para tu
              vivienda o negocio.
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

                  <CardActions>
                    <CardAction
                      type="button"
                      onClick={() =>
                        openAdvice(
                          item.enquiryPack,
                          `toldos_tipo_${item.title
                            .toLowerCase()
                            .replace(/\s+/g, "_")}`
                        )
                      }
                    >
                      Pedir asesoramiento
                    </CardAction>
                  </CardActions>
                </CardContent>
              </Card>
            ))}
          </Grid>
        </SectionInner>
      </Section>

      <SoftSection aria-label="Proceso de trabajo">
        <ProcesoToldosSlider onOpenAsesoramiento={onOpenAsesoramiento} />
      </SoftSection>

      <TightSection aria-label="Otras soluciones de sombra">
        <SectionInner>
          <SectionIntro
            kicker="Más soluciones"
            title={
              <>
                Otras <span>soluciones</span> para exterior
              </>
            }
            lead="Cuando el proyecto lo requiere, completamos la protección solar con sistemas estructurales o alternativas ligeras adaptadas al espacio."
          />

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

                  <CardActions>
                    <CardAction
                      type="button"
                      onClick={() =>
                        openAdvice(
                          item.enquiryPack,
                          `toldos_tipo_${item.title
                            .toLowerCase()
                            .replace(/\s+/g, "_")}`
                        )
                      }
                    >
                      Pedir asesoramiento
                    </CardAction>
                  </CardActions>
                </CardContent>
              </Card>
            ))}
          </Grid>
        </SectionInner>
      </TightSection>
      <AutomationCTA aria-label="CTA automatización">
        <AutomationCTAInner>
          <AutomationCTABg aria-hidden="true" />
          <AutomationCTAOverlay aria-hidden="true" />

          <AutomationLeft>
            <AutomationKicker>Motorización y automatización</AutomationKicker>

            <AutomationHeadline>
              ¿Quieres un toldo que responda <span>solo</span>?
            </AutomationHeadline>

            <AutomationCopy>
              Podemos instalar motores, sensores de viento y sol, control por
              app y escenas programadas para que el uso diario sea más cómodo y
              el sistema esté mejor protegido.
            </AutomationCopy>

            <AutomationProof>
              ✓ Visita y medición en Castellón · instalación profesional ·
              opciones de motor, mando, app y sensores
            </AutomationProof>
          </AutomationLeft>

          <AutomationRight>
            <AutomationButtons>
              <AutomationPrimary
                to="/contact"
                onClick={(e) => {
                  e.preventDefault();
                  openAdvice("Toldos motorizados", "toldos_automatizacion_cta");
                }}
              >
                Pedir asesoramiento
              </AutomationPrimary>

              <AutomationSecondary to="/automatizacion">
                Ver motorización y automatización{" "}
                <span aria-hidden="true">→</span>
              </AutomationSecondary>
            </AutomationButtons>
          </AutomationRight>
        </AutomationCTAInner>
      </AutomationCTA>

      <SectionTight aria-label="Accesorios para toldos">
        <SectionInner>
          <SectionIntro
            kicker="Accesorios"
            title={
              <>
                Accesorios <span>premium</span> para completar tu toldo
              </>
            }
            lead="Sensores, iluminación y confort exterior para sacar más partido a la terraza durante más horas y en más momentos del año."
          />

          <AccessoriesWrap>
            <AwningAccessories
              items={[
                {
                  key: "smart",
                  title: "Tecnología inteligente",
                  description:
                    "Control avanzado por app, escenas y opciones de integración domótica.",
                  image: tahomaImg,
                  size: "big",
                },
                {
                  key: "led",
                  title: "Iluminación LED",
                  description:
                    "Luz integrada para crear ambiente en cenas, reuniones y noches de terraza.",
                  image: toldoLEDImg,
                },
                {
                  key: "wind",
                  title: "Sensor de viento",
                  description:
                    "Protección automática para recoger el toldo ante rachas fuertes.",
                  image: windSensorImg,
                },
                {
                  key: "heat",
                  title: "Calefacción exterior",
                  description:
                    "Más confort en entretiempo y durante los meses más frescos.",
                  image: calentadorImg,
                },
                {
                  key: "sun",
                  title: "Sensor solar",
                  description:
                    "El toldo responde según la intensidad de la luz y mejora el confort diario.",
                  image: lightSensorImg,
                },
              ]}
            />
          </AccessoriesWrap>
        </SectionInner>
      </SectionTight>

      <BenefitsSection aria-label="Toldos motorizados y automatización">
        <SectionInner>
          <SectionIntro
            kicker="Toldos motorizados"
            title={
              <>
                Más <span>comodidad</span>, más protección y un control más
                inteligente
              </>
            }
            lead="Además de la instalación de toldos a medida, también trabajamos soluciones de motorización y automatización para que el sistema responda mejor al uso diario, al viento, al sol y al nivel de confort que buscas."
          />

          <AutomationOptionsGrid />
        </SectionInner>
      </BenefitsSection>

      <SectionTight aria-label="Preguntas frecuentes">
        <SectionInner>
          <SectionIntro
            kicker="FAQ"
            title={
              <>
                Preguntas <span>frecuentes</span>
              </>
            }
            lead="Lo más habitual antes de decidir: tipos de toldo, motorización, instalación, viento, uso comercial y zonas de trabajo."
          />

          <FaqAccordion
            items={faqItems}
            withSchema
            canonicalUrl={canonical}
            defaultOpenIndex={-1}
            ariaLabel="Preguntas frecuentes sobre toldos en Castellón y protección solar"
          />
        </SectionInner>
      </SectionTight>

      <StickyCtaButton message="Hola, quiero una propuesta para toldos en Castellón. ¿Podemos agendar una visita?" />
    </Page>
  );
}
