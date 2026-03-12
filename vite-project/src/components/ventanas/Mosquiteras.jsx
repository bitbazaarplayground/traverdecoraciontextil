// src/pages/servicios/Mosquiteras.jsx

import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

import { CONTACT } from "../../config/contact";
import { trackEvent } from "../../lib/analytics";

import ContactCTA from "../../components/ContactCTA";
import SlickCarouselLazy from "../../components/SlickCarouselLazy";
import FaqAccordion from "../../components/faq/FaqAccordion";
import ComplementosVentana from "../../components/ventanas/ComplementosVentana";
import StickyCtaButton from "../../mobile/StickyCtaButton";

/* Tabs icons (tipo) */
import mPuerta1200 from "../../assets/servicios/mosquiteras/correderaPuerta-1200.webp";
import mPuerta400 from "../../assets/servicios/mosquiteras/correderaPuerta-400.webp";
import mPuerta600 from "../../assets/servicios/mosquiteras/correderaPuerta-600.webp";
import mPuerta800 from "../../assets/servicios/mosquiteras/correderaPuerta-800.webp";

import mEnrollable1200 from "../../assets/servicios/mosquiteras/enrollable-1200.webp";
import mEnrollable400 from "../../assets/servicios/mosquiteras/enrollable-400.webp";
import mEnrollable600 from "../../assets/servicios/mosquiteras/enrollable-600.webp";
import mEnrollable800 from "../../assets/servicios/mosquiteras/enrollable-800.webp";

import mExtensible1200 from "../../assets/servicios/mosquiteras/extensible-1200.webp";
import mExtensible400 from "../../assets/servicios/mosquiteras/extensible-400.webp";
import mExtensible600 from "../../assets/servicios/mosquiteras/extensible-600.webp";
import mExtensible800 from "../../assets/servicios/mosquiteras/extensible-800.webp";

import mFija1200 from "../../assets/servicios/mosquiteras/fija-1200.webp";
import mFija400 from "../../assets/servicios/mosquiteras/fija-400.webp";
import mFija600 from "../../assets/servicios/mosquiteras/fija-600.webp";
import mFija800 from "../../assets/servicios/mosquiteras/fija-800.webp";

/* images */
import cocinaM1200 from "../../assets/servicios/mosquiteras/carousel/cocinaM-1200.webp";
import cocinaM400 from "../../assets/servicios/mosquiteras/carousel/cocinaM-400.webp";
import cocinaM600 from "../../assets/servicios/mosquiteras/carousel/cocinaM-600.webp";
import cocinaM800 from "../../assets/servicios/mosquiteras/carousel/cocinaM-800.webp";

import habitacionM1200 from "../../assets/servicios/mosquiteras/carousel/habitacionM-1200.webp";
import habitacionM400 from "../../assets/servicios/mosquiteras/carousel/habitacionM-400.webp";
import habitacionM600 from "../../assets/servicios/mosquiteras/carousel/habitacionM-600.webp";
import habitacionM800 from "../../assets/servicios/mosquiteras/carousel/habitacionM-800.webp";

import habitacionMo1200 from "../../assets/servicios/mosquiteras/carousel/habitacionMo-1200.webp";
import habitacionMo400 from "../../assets/servicios/mosquiteras/carousel/habitacionMo-400.webp";
import habitacionMo600 from "../../assets/servicios/mosquiteras/carousel/habitacionMo-600.webp";
import habitacionMo800 from "../../assets/servicios/mosquiteras/carousel/habitacionMo-800.webp";

import mosquiteraPatio1200 from "../../assets/servicios/mosquiteras/carousel/mosquiteraPatio-1200.webp";
import mosquiteraPatio400 from "../../assets/servicios/mosquiteras/carousel/mosquiteraPatio-400.webp";
import mosquiteraPatio600 from "../../assets/servicios/mosquiteras/carousel/mosquiteraPatio-600.webp";
import mosquiteraPatio800 from "../../assets/servicios/mosquiteras/carousel/mosquiteraPatio-800.webp";

import salonM1200 from "../../assets/servicios/mosquiteras/carousel/salonM-1200.webp";
import salonM400 from "../../assets/servicios/mosquiteras/carousel/salonM-400.webp";
import salonM600 from "../../assets/servicios/mosquiteras/carousel/salonM-600.webp";
import salonM800 from "../../assets/servicios/mosquiteras/carousel/salonM-800.webp";

import salonMo1200 from "../../assets/servicios/mosquiteras/carousel/salonMo-1200.webp";
import salonMo400 from "../../assets/servicios/mosquiteras/carousel/salonMo-400.webp";
import salonMo600 from "../../assets/servicios/mosquiteras/carousel/salonMo-600.webp";
import salonMo800 from "../../assets/servicios/mosquiteras/carousel/salonMo-800.webp";

// Hero
const hero_768 = "/mosquiteras/mosquiteraPatio-768.webp";
const hero_1280 = "/mosquiteras/mosquiteraPatio-1280.webp";
const hero_1920 = "/mosquiteras/mosquiteraPatio-1920.webp";

const responsiveImages = {
  mPuerta: {
    400: mPuerta400,
    600: mPuerta600,
    800: mPuerta800,
    1200: mPuerta1200,
  },
  mEnrollable: {
    400: mEnrollable400,
    600: mEnrollable600,
    800: mEnrollable800,
    1200: mEnrollable1200,
  },
  mExtensible: {
    400: mExtensible400,
    600: mExtensible600,
    800: mExtensible800,
    1200: mExtensible1200,
  },
  mFija: {
    400: mFija400,
    600: mFija600,
    800: mFija800,
    1200: mFija1200,
  },
  cocinaM: {
    400: cocinaM400,
    600: cocinaM600,
    800: cocinaM800,
    1200: cocinaM1200,
  },
  habitacionM: {
    400: habitacionM400,
    600: habitacionM600,
    800: habitacionM800,
    1200: habitacionM1200,
  },
  habitacionMo: {
    400: habitacionMo400,
    600: habitacionMo600,
    800: habitacionMo800,
    1200: habitacionMo1200,
  },
  mosquiteraPatio: {
    400: mosquiteraPatio400,
    600: mosquiteraPatio600,
    800: mosquiteraPatio800,
    1200: mosquiteraPatio1200,
  },
  salonM: {
    400: salonM400,
    600: salonM600,
    800: salonM800,
    1200: salonM1200,
  },
  salonMo: {
    400: salonMo400,
    600: salonMo600,
    800: salonMo800,
    1200: salonMo1200,
  },
};

const getSrcSet = (images) =>
  `${images[400]} 400w, ${images[600]} 600w, ${images[800]} 800w, ${images[1200]} 1200w`;

const HERO_SIZES = "100vw";
const PANEL_IMAGE_SIZES = "(max-width: 979px) 100vw, 50vw";

// ComplementosVentana
import domotica320 from "../../assets/Automatizacion/heroB-320.webp";
import domotica640 from "../../assets/Automatizacion/heroB-640.webp";
import domotica960 from "../../assets/Automatizacion/heroB-960.webp";

import cortinasEstores480 from "../../assets/servicios/CortinasServicios-320.webp";
import cortinasEstores768 from "../../assets/servicios/CortinasServicios-640.webp";
import cortinasEstores1100 from "../../assets/servicios/CortinasServicios-960.webp";

import panel320 from "../../assets/panelJapones/bedroomDarkPanel-320.webp";
import panel640 from "../../assets/panelJapones/bedroomDarkPanel-640.webp";
import panel960 from "../../assets/panelJapones/bedroomDarkPanel-960.webp";

import venecianas320 from "../../assets/venecianas/oficina2-320.webp";
import venecianas640 from "../../assets/venecianas/oficina2-640.webp";
import venecianas960 from "../../assets/venecianas/oficina2-960.webp";
/* =========================
   SEO helpers
========================= */

function toSlug(str) {
  return String(str)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function readHashTabId(hash) {
  const clean = String(hash || "")
    .replace("#", "")
    .trim();
  return clean || null;
}

function getBaseUrl() {
  return (import.meta.env.VITE_SITE_URL || window.location.origin).replace(
    /\/$/,
    ""
  );
}

function getCanonical(baseUrl, pathname) {
  return `${baseUrl}${pathname}`;
}

/* =========================
   Styles
========================= */

const Page = styled.main`
  width: 100%;
  background: #fff;
  color: #151515;
`;

const Container = styled.div`
  width: min(1120px, calc(100% - 2.4rem));
  margin: 0 auto;

  @media (max-width: 768px) {
    width: min(1120px, calc(100% - 2rem));
  }
`;

/* ===== Hero premium ===== */

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
  object-position: center 65%;
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

const Eyebrow = styled.p`
  margin: 0 0 1rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  font-size: 0.85rem;
  opacity: 0.9;
`;

const Title = styled.h1`
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

const Sub = styled.p`
  max-width: 72ch;
  margin: 1.1rem auto 0;
  font-size: 1.15rem;
  line-height: 1.7;
  opacity: 0.92;
`;

/* ===== Feature strip ===== */

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

/* ===== Tabs area ===== */

const Section = styled.section`
  padding: clamp(3.2rem, 5vw, 4.6rem) 0;
  background: #fff;
`;

const TabsBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem;
  margin-top: 1.6rem;

  background: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(0, 0, 0, 0.06);
  box-shadow: 0 22px 60px rgba(0, 0, 0, 0.06);
  border-radius: 999px;
  padding: 0.45rem;
`;

const TabButton = styled.button`
  appearance: none;
  border: 0;
  cursor: pointer;

  padding: 0.7rem 1rem;
  border-radius: 999px;

  background: ${({ $active, theme }) =>
    $active ? theme.colors.primary : "transparent"};
  color: ${({ $active }) => ($active ? "#fff" : "rgba(0,0,0,0.75)")};

  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-size: 0.76rem;

  transition: transform 200ms ease, background 200ms ease, color 200ms ease,
    filter 200ms ease;

  &:hover {
    transform: translateY(-1px);
    filter: brightness(0.99);
  }

  &:focus-visible {
    outline: 3px solid rgba(0, 0, 0, 0.18);
    outline-offset: 3px;
  }
`;

const Panel = styled.article`
  max-width: 980px;
  margin: 1.55rem auto 0;

  border-radius: 24px;
  overflow: hidden;

  background: rgba(250, 250, 250, 0.95);
  border: 1px solid rgba(15, 23, 42, 0.08);
  box-shadow: 0 22px 65px rgba(0, 0, 0, 0.08);

  display: grid;
  grid-template-columns: 1fr;

  @media (min-width: 980px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const Media = styled.div`
  position: relative;
  height: 210px;
  overflow: hidden;

  @media (min-width: 980px) {
    height: 100%;
    min-height: 270px;
  }
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transform: scale(1.02);
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.05),
    rgba(0, 0, 0, 0.35)
  );
`;

const Badge = styled.div`
  position: absolute;
  top: 16px;
  left: 16px;

  padding: 0.44rem 0.78rem;
  border-radius: 999px;

  font-size: 0.74rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  font-weight: 750;

  background: rgba(245, 244, 242, 0.88);
  color: rgba(0, 0, 0, 0.7);
  z-index: 2;
`;

const Content = styled.div`
  padding: 1.25rem 1.25rem 1.2rem;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    padding: 1.1rem 1.05rem 1rem;
  }
`;

const PanelTitle = styled.h2`
  margin: 0;
  font-size: 1.75rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  line-height: 1.1;
  color: rgba(0, 0, 0, 0.92);
`;

const Value = styled.p`
  margin: 0.75rem 0 0.85rem;
  font-size: 1.02rem;
  font-weight: 700;
  color: rgba(0, 0, 0, 0.75);
  line-height: 1.6;
`;

const Text = styled.p`
  margin: 0 0 1.05rem;
  font-size: 1.01rem;
  line-height: 1.75;
  color: rgba(0, 0, 0, 0.64);
`;

const Bullets = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 0.5rem;
`;

const Bullet = styled.li`
  display: grid;
  grid-template-columns: 16px 1fr;
  gap: 0.65rem;
  align-items: start;

  font-size: 0.98rem;
  line-height: 1.6;
  color: rgba(0, 0, 0, 0.62);

  &::before {
    content: "✓";
    font-weight: 900;
    color: ${({ theme }) => theme.colors.primary};
    line-height: 1.2;
  }
`;

const Actions = styled.div`
  margin-top: auto;
  display: flex;
  gap: 0.65rem;
  flex-wrap: wrap;
`;

const Primary = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.82rem 1.15rem;
  border-radius: 999px;

  background: rgba(0, 0, 0, 0.06);
  color: rgba(0, 0, 0, 0.86);
  border: 1px solid rgba(0, 0, 0, 0.1);

  font-weight: 850;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-size: 0.76rem;

  text-decoration: none;
  transition: transform 240ms ease, background 240ms ease;

  &:hover {
    background: rgba(0, 0, 0, 0.09);
    transform: translateY(-1px);
  }
`;

const Secondary = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.82rem 1.15rem;
  border-radius: 999px;

  background: ${({ theme }) => theme.colors.primary};
  color: #fff;

  font-weight: 900;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-size: 0.76rem;

  text-decoration: none;
  transition: transform 240ms ease, filter 240ms ease;

  &:hover {
    transform: translateY(-1px);
    filter: brightness(0.98);
  }
`;

/* Help actions */
const HelpStrip = styled.aside`
  margin-top: 1.5rem;
  padding: 1.25rem 1.4rem;

  display: grid;
  gap: 1rem;

  border-radius: 22px;
  background: rgba(250, 250, 250, 0.95);
  border: 1px solid rgba(0, 0, 0, 0.06);

  @media (min-width: 980px) {
    grid-template-columns: 1fr auto;
    align-items: center;
  }
`;

const HelpText = styled.div`
  display: grid;
  gap: 0.35rem;

  strong {
    font-size: 0.9rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: rgba(0, 0, 0, 0.82);
  }

  span {
    font-size: 1rem;
    line-height: 1.6;
    color: rgba(0, 0, 0, 0.65);
  }
`;

const HelpActions = styled.div`
  display: flex;
  gap: 0.6rem;
  flex-wrap: wrap;
`;

const HelpButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  padding: 0.68rem 1.02rem;
  border-radius: 999px;

  background: rgba(0, 0, 0, 0.06);
  color: rgba(0, 0, 0, 0.85);
  border: 1px solid rgba(0, 0, 0, 0.1);

  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-size: 0.72rem;

  text-decoration: none;
  transition: transform 200ms ease, background 200ms ease;

  &:hover {
    background: rgba(0, 0, 0, 0.1);
    transform: translateY(-1px);
  }
`;

/* ===== Carousel section (inspiración) ===== */
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
  }
  .slick-dots li.slick-active button:before {
    opacity: 0.95;
    transform: scale(1.15);
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const CarouselInner = styled.div`
  width: min(1120px, calc(100% - 2.4rem));
  margin: 0 auto;

  @media (max-width: 768px) {
    width: min(1120px, calc(100% - 2rem));
  }
`;

const SectionTop = styled.div`
  max-width: 980px;
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
  margin: 0.75rem 0 0;
  font-size: 1.08rem;
  line-height: 1.7;
  color: rgba(17, 17, 17, 0.62);
  max-width: 75ch;
`;

/* ===== FAQ ===== */
const FAQSection = styled.section`
  padding: clamp(3.5rem, 5vw, 5.5rem) 0;
  background: #fafafa;
  border-top: 1px solid rgba(15, 23, 42, 0.08);
`;

const FAQInner = styled.div`
  width: min(1120px, calc(100% - 2.4rem));
  margin: 0 auto;

  @media (max-width: 768px) {
    width: min(1120px, calc(100% - 2rem));
  }
`;

/* =========================
   Component
========================= */

export default function Mosquiteras({ onOpenAsesoramiento }) {
  const location = useLocation();

  const baseUrl = getBaseUrl();
  const canonical = getCanonical(baseUrl, location.pathname);

  const siteName = CONTACT.siteName;

  const title = `Mosquiteras a medida en Castellón y Valencia | ${siteName}`;
  const description =
    "Mosquiteras a medida para ventanas y puertas: enrollables, correderas, extensibles y fijas. Servicio en Castellón y Valencia. Asesoramiento e instalación profesional.";

  const ogImage = `${baseUrl}/og.png`;
  const ogImageAlt = "Mosquiteras a medida — Traver Decoración Textil";

  const tabs = useMemo(
    () => [
      {
        id: "enrollables",
        label: "Enrollables",
        title: "Mosquiteras enrollables a medida",
        images: responsiveImages.mEnrollable,
        value: "Apertura práctica y estética discreta para uso diario.",
        text: "Ideales para ventanas: se recogen cuando no las necesitas y mantienen una línea limpia en el hueco.",
        bullets: [
          "Recogida superior con muelle",
          "Guías laterales para mejor cierre",
          "Fabricación a medida",
        ],
      },
      {
        id: "correderas",
        label: "Correderas",
        title: "Mosquiteras correderas para puertas y ventanales",
        images: responsiveImages.mPuerta,
        value: "Perfectas para aperturas laterales y balconeras.",
        text: "Se deslizan suavemente sobre carriles y son una solución robusta para grandes superficies acristaladas.",
        bullets: [
          "Deslizamiento cómodo",
          "Ideales para correderas",
          "Estructura resistente",
        ],
      },
      {
        id: "extensibles",
        label: "Extensibles",
        title: "Mosquiteras extensibles",
        images: responsiveImages.mExtensible,
        value: "Solución simple y funcional para usos puntuales.",
        text: "Prácticas para segundas residencias o espacios donde buscas una opción flexible y rápida.",
        bullets: [
          "Instalación sencilla",
          "Buen equilibrio calidad/precio",
          "Uso flexible",
        ],
      },
      {
        id: "fijas",
        label: "Fijas",
        title: "Mosquiteras fijas",
        images: responsiveImages.mFija,
        value: "Protección permanente con diseño limpio.",
        text: "Recomendadas para ventanas de uso constante cuando no necesitas apertura de la mosquitera.",
        bullets: [
          "Estructura estable",
          "Mantenimiento mínimo",
          "Alta durabilidad",
        ],
      },
    ],
    []
  );

  const initialFromHash = readHashTabId(location.hash);

  const [active, setActive] = useState(() => {
    const match =
      initialFromHash &&
      tabs.find((t) => toSlug(t.id) === toSlug(initialFromHash));
    return match ? match.id : tabs[0].id;
  });

  const current = tabs.find((t) => t.id === active) || tabs[0];

  useEffect(() => {
    const nextHash = `#${toSlug(current.id)}`;
    if (window.location.hash !== nextHash) {
      window.history.replaceState(null, "", nextHash);
    }
  }, [current.id]);

  useEffect(() => {
    const hash = readHashTabId(location.hash);
    if (!hash) return;
    const match = tabs.find((t) => toSlug(t.id) === toSlug(hash));
    if (match) setActive(match.id);
  }, [location.hash, tabs]);

  const businessId = `${baseUrl}/#business`;

  const jsonLd = useMemo(
    () => [
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
        primaryImageOfPage: { "@type": "ImageObject", url: ogImage },
      },
      {
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": `${canonical}#service`,
        name: "Mosquiteras a medida",
        serviceType: "Instalación de mosquiteras",
        provider: { "@id": businessId },
        areaServed: [
          { "@type": "AdministrativeArea", name: "Castellón" },
          { "@type": "AdministrativeArea", name: "Valencia" },
        ],
        url: canonical,
        description,
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
            name: "Mosquiteras",
            item: `${baseUrl}/mosquiteras`,
          },
        ],
      },
    ],
    [baseUrl, businessId, canonical, description, ogImage, title]
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

  // 5 imágenes: puedes repetir sin problema
  const carouselImages = useMemo(
    () => [
      responsiveImages.mosquiteraPatio[1200],
      responsiveImages.salonM[1200],
      responsiveImages.habitacionM[1200],
      responsiveImages.cocinaM[1200],
      responsiveImages.salonMo[1200],
      responsiveImages.habitacionMo[1200],
    ],
    []
  );

  const complementosItems = useMemo(
    () => [
      {
        title: "Cortinas y estores",
        desc: "Textiles a medida para controlar luz y privacidad.",
        img: {
          src: cortinasEstores768,
          srcSet: `${cortinasEstores480} 320w, ${cortinasEstores768} 640w, ${cortinasEstores1100} 960w`,
          width: 1100,
          height: 733,
          alt: "Cortinas y estores a medida",
        },
        to: "/cortinas-estores",
      },
      {
        title: "Panel japonés",
        desc: "Ideal para puertas correderas y grandes ventanales.",
        img: {
          src: panel640,
          srcSet: `${panel320} 320w, ${panel640} 640w, ${panel960} 960w`,
          width: 278,
          height: 185,
          alt: "Panel japonés en dormitorio",
        },
        to: "/panel-japones",
      },
      {
        title: "Venecianas",
        desc: "Control solar preciso con privacidad regulable.",
        img: {
          src: venecianas640,
          srcSet: `${venecianas320} 320w, ${venecianas640} 640w, ${venecianas960} 960w`,
          width: 267,
          height: 178,
          alt: "Venecianas en oficina",
        },
        to: "/venecianas",
      },
      {
        title: "Automatización",
        desc: "Sistemas motorizados y control inteligente del hogar.",
        img: {
          src: domotica640,
          srcSet: `${domotica320} 320w, ${domotica640} 640w, ${domotica960} 960w`,
          width: 267,
          height: 178,
          alt: "Automatización del hogar",
        },
        to: "/automatizacion",
      },
    ],
    []
  );

  const PACK_LABEL = "Mosquiteras";
  const PACK_QUERY = "mosquiteras";
  const CTA_SOURCE = "mosquiteras_cta";

  const handleOpenCta = (e) => {
    trackEvent("open_quick_enquiry", { source: CTA_SOURCE, pack: PACK_LABEL });

    if (typeof onOpenAsesoramiento === "function") {
      e.preventDefault();
      onOpenAsesoramiento(PACK_LABEL, CTA_SOURCE);
    }
  };

  const FAQ_ITEMS = useMemo(
    () => [
      {
        q: "¿Qué tipo de mosquitera necesito?",
        a: "Depende de la apertura y el uso: enrollable para ventanas de uso diario, corredera para balconeras y ventanales, fija para protección permanente y extensible para usos más puntuales.",
        aText:
          "Depende de la apertura y el uso: enrollable para ventanas de uso diario, corredera para balconeras y ventanales, fija para protección permanente y extensible para usos más puntuales.",
      },
      {
        q: "¿Se pueden instalar sin obras?",
        a: "Sí. La mayoría de sistemas se instalan de forma limpia y rápida, ajustados al hueco y al tipo de carpintería.",
        aText:
          "Sí. La mayoría de sistemas se instalan de forma limpia y rápida, ajustados al hueco y al tipo de carpintería.",
      },
      {
        q: "¿Son compatibles con persianas o ventanas oscilobatientes?",
        a: "En muchos casos sí. Te recomendamos el sistema según el espacio disponible y el tipo de apertura para evitar roces y asegurar cierre correcto.",
        aText:
          "En muchos casos sí. Te recomendamos el sistema según el espacio disponible y el tipo de apertura para evitar roces y asegurar cierre correcto.",
      },
      {
        q: "¿Qué mantenimiento requieren?",
        a: "Limpieza sencilla: aspirado suave o paño húmedo. Te aconsejamos el tejido/malla más adecuado si hay mascotas o mucho uso.",
        aText:
          "Limpieza sencilla: aspirado suave o paño húmedo. Te aconsejamos el tejido/malla más adecuado si hay mascotas o mucho uso.",
      },
      {
        q: "¿Hacéis medición e instalación en Castellón y Valencia?",
        a: "Sí. Medimos y montamos para que el encaje sea perfecto, con un funcionamiento suave y remates discretos.",
        aText:
          "Sí. Medimos y montamos para que el encaje sea perfecto, con un funcionamiento suave y remates discretos.",
      },
    ],
    []
  );

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
          fetchPriority="high"
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
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

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
            loading="eager"
            decoding="async"
            fetchPriority="high"
            alt=""
          />
          <HeroOverlay />
        </HeroMedia>

        <HeroInner>
          <Eyebrow>Mosquiteras · Confort & ventilación</Eyebrow>
          <Title>
            Mosquiteras <span>a medida</span>
          </Title>
          <Sub>
            Ventila sin insectos con una instalación limpia y ajuste perfecto.
            Te recomendamos el sistema ideal según tu apertura y uso diario.
          </Sub>
        </HeroInner>
      </Hero>

      {/* FEATURE STRIP */}
      <Features>
        <FeaturesGrid>
          <Feature>
            <FeatureTitle>Instalación limpia</FeatureTitle>
            <FeatureText>
              Sin complicaciones: encaje perfecto y remates discretos.
            </FeatureText>
          </Feature>
          <Feature>
            <FeatureTitle>Uso diario cómodo</FeatureTitle>
            <FeatureText>
              Enrollables y correderas pensadas para abrir/cerrar sin esfuerzo.
            </FeatureText>
          </Feature>
          <Feature>
            <FeatureTitle>Hechas a medida</FeatureTitle>
            <FeatureText>
              Para que cierre bien, dure y funcione suave.
            </FeatureText>
          </Feature>
        </FeaturesGrid>
      </Features>

      {/* TABS + PANEL */}
      <Section aria-label="Tipos de mosquiteras">
        <Container>
          <SectionTop>
            <Kicker>Tipos</Kicker>
            <SectionTitle>
              Elige el sistema <span>adecuado</span>
            </SectionTitle>
            <SectionLead>
              Si nos dices el tipo de ventana/puerta y el uso, te orientamos con
              honestidad (y sin sobredimensionar).
            </SectionLead>

            <TabsBar
              role="tablist"
              aria-label="Opciones de mosquiteras a medida"
            >
              {tabs.map((t) => (
                <TabButton
                  key={t.id}
                  type="button"
                  onClick={() => setActive(t.id)}
                  $active={t.id === active}
                  role="tab"
                  aria-selected={t.id === active}
                  aria-controls={`panel-${t.id}`}
                  id={`tab-${t.id}`}
                >
                  {t.label}
                </TabButton>
              ))}
            </TabsBar>
          </SectionTop>

          <Panel
            id={`panel-${current.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${current.id}`}
          >
            <Media>
              <Img
                src={current.images[800]}
                srcSet={getSrcSet(current.images)}
                sizes={PANEL_IMAGE_SIZES}
                alt={current.title}
                loading="lazy"
                decoding="async"
              />
              <Overlay />
              <Badge>{current.label}</Badge>
            </Media>

            <Content>
              <PanelTitle>{current.title}</PanelTitle>
              <Value>{current.value}</Value>
              <Text>{current.text}</Text>

              <Bullets aria-label="Ventajas principales">
                {current.bullets.map((b) => (
                  <Bullet key={b}>{b}</Bullet>
                ))}
              </Bullets>

              <Actions>
                <Primary
                  to={`/contact?pack=${PACK_QUERY}`}
                  onClick={handleOpenCta}
                >
                  Pedir propuesta
                </Primary>
                <Secondary
                  to={`/contact?pack=${PACK_QUERY}`}
                  onClick={handleOpenCta}
                >
                  Hablar con nosotros
                </Secondary>
              </Actions>
            </Content>
          </Panel>

          <HelpStrip aria-label="Ayuda y contacto">
            <HelpText>
              <strong>¿Te recomendamos el sistema ideal?</strong>
              <span>
                Envíanos una foto y medidas aproximadas. Te orientamos y te
                preparamos una propuesta ajustada.
              </span>
            </HelpText>

            <HelpActions>
              <HelpButton href={`tel:${CONTACT.phoneLandlineTel}`}>
                Llamar
              </HelpButton>
              <HelpButton
                href={CONTACT.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp
              </HelpButton>
              <HelpButton href={`mailto:${CONTACT.email}`}>Email</HelpButton>
            </HelpActions>
          </HelpStrip>
        </Container>
      </Section>

      {/* CONTACT CTA */}
      <ContactCTA
        onOpenAsesoramiento={onOpenAsesoramiento}
        pack={PACK_LABEL}
        source={CTA_SOURCE}
        buttonText="Solicitar información"
      />

      {/* COMPLEMENTOS */}
      <ComplementosVentana
        id="sistemas"
        items={complementosItems}
        title={
          <>
            Otros productos <span>para tu ventana</span>
          </>
        }
        lead="Complementos que combinan con mosquiteras para resolver luz, privacidad y confort."
      />

      {/* INSPIRACIÓN (carousel) */}
      <CarouselSection>
        <CarouselInner>
          <SectionTop>
            <Kicker>Inspiración</Kicker>
            <SectionTitle>
              Detalles que se <span>notan</span>
            </SectionTitle>
            <SectionLead>
              Instalación limpia, malla bien tensada y un cierre correcto: eso
              es lo que marca la diferencia.
            </SectionLead>
          </SectionTop>

          <SlickCarouselLazy
            images={carouselImages}
            settings={sliderSettings}
          />
        </CarouselInner>
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
              Antes de medir: compatibilidades, tipos y mantenimiento.
            </SectionLead>
          </SectionTop>

          <FaqAccordion
            items={FAQ_ITEMS}
            withSchema={true}
            canonicalUrl={canonical}
            defaultOpenIndex={-1}
            ariaLabel="Preguntas frecuentes sobre mosquiteras a medida"
          />
        </FAQInner>
      </FAQSection>

      <StickyCtaButton message="Hola, me gustaría información sobre mosquiteras a medida. Gracias." />
    </Page>
  );
}
