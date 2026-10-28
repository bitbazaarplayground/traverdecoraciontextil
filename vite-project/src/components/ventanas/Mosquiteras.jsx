// src/pages/servicios/Mosquiteras.jsx

import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

import { CONTACT } from "../../config/contact";
import {
  MOSQUITERAS_FAQ_ITEMS,
  MOSQUITERAS_HERO_PRELOAD,
  MOSQUITERAS_PAGE_JSON_LD,
  MOSQUITERAS_SEO,
} from "../../config/mosquiterasSeo.js";
import { trackEvent } from "../../lib/analytics";

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
import bathroomMosquitera1200 from "../../assets/servicios/mosquiteras/bathroomMosquitera-1200.webp";
import bathroomMosquitera400 from "../../assets/servicios/mosquiteras/bathroomMosquitera-400.webp";
import bathroomMosquitera600 from "../../assets/servicios/mosquiteras/bathroomMosquitera-600.webp";
import bathroomMosquitera800 from "../../assets/servicios/mosquiteras/bathroomMosquitera-800.webp";

import bedroomMosquitera1200 from "../../assets/servicios/mosquiteras/habitacionMosquitera-1200.webp";
import bedroomMosquitera400 from "../../assets/servicios/mosquiteras/habitacionMosquitera-400.webp";
import bedroomMosquitera600 from "../../assets/servicios/mosquiteras/habitacionMosquitera-600.webp";
import bedroomMosquitera800 from "../../assets/servicios/mosquiteras/habitacionMosquitera-800.webp";

import livingRoomMosquitera1200 from "../../assets/servicios/mosquiteras/livingRoomMosquitera-1200.webp";
import livingRoomMosquitera400 from "../../assets/servicios/mosquiteras/livingRoomMosquitera-400.webp";
import livingRoomMosquitera600 from "../../assets/servicios/mosquiteras/livingRoomMosquitera-600.webp";
import livingRoomMosquitera800 from "../../assets/servicios/mosquiteras/livingRoomMosquitera-800.webp";

// Hero

const hero_768 = "/mosquiteras/terraceMosquitonet-600.webp";
const hero_1280 = "/mosquiteras/terraceMosquitonet-800.webp";
const hero_1920 = "/mosquiteras/terraceMosquitonet-1200.webp";

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
  bathroomMosquitera: {
    400: bathroomMosquitera400,
    600: bathroomMosquitera600,
    800: bathroomMosquitera800,
    1200: bathroomMosquitera1200,
  },
  bedroomMosquitera: {
    400: bedroomMosquitera400,
    600: bedroomMosquitera600,
    800: bedroomMosquitera800,
    1200: bedroomMosquitera1200,
  },
  livingRoomMosquitera: {
    400: livingRoomMosquitera400,
    600: livingRoomMosquitera600,
    800: livingRoomMosquitera800,
    1200: livingRoomMosquitera1200,
  },
};

const getSrcSet = (images) =>
  `${images[400]} 400w, ${images[600]} 600w, ${images[800]} 800w, ${images[1200]} 1200w`;

const makeResponsiveImage = ({
  images,
  alt,
  width = "1200",
  height = "800",
  fallback = 800,
}) => ({
  src: images[fallback],
  srcSet: getSrcSet(images),
  alt,
  width,
  height,
});

const GALLERY_IMAGES = [
  {
    ...makeResponsiveImage({
      images: responsiveImages.bedroomMosquitera,
      alt: "Dormitorio con mosquitera a medida y ventana abierta",
    }),
    title: "Dormitorios en calma",
    text: "Ventilar por la noche sin renunciar al descanso.",
  },
  {
    ...makeResponsiveImage({
      images: responsiveImages.livingRoomMosquitera,
      alt: "Salón con mosquitera a medida en ventanal",
    }),
    title: "Salones más abiertos",
    text: "La terraza se disfruta sin que el sistema robe protagonismo.",
  },
  {
    ...makeResponsiveImage({
      images: responsiveImages.bathroomMosquitera,
      alt: "Baño luminoso con mosquitera a medida integrada",
    }),
    title: "Baños con luz natural",
    text: "Protección discreta para estancias pequeñas y húmedas.",
  },
];

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
  min-height: 680px;
  display: flex;
  align-items: center;
  padding: 5.5rem 0;
  text-align: left;
  color: #fff;
  overflow: hidden;

  @media (max-width: 980px) {
    min-height: 620px;
    padding: 5rem 0;
  }

  @media (max-width: 768px) {
    min-height: 560px;
    padding: 4.5rem 0;
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
  object-position: center 58%;
  transform: translateZ(0);
  backface-visibility: hidden;
`;

const HeroOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
      90deg,
      rgba(0, 0, 0, 0.86),
      rgba(0, 0, 0, 0.56) 48%,
      rgba(0, 0, 0, 0.22)
    ),
    linear-gradient(to top, rgba(0, 0, 0, 0.58), transparent 58%);
`;

const HeroInner = styled.div`
  position: relative;
  z-index: 1;
  width: min(1180px, calc(100% - 2.4rem));
  margin: 0 auto;
  box-sizing: border-box;

  @media (max-width: 768px) {
    width: min(1180px, calc(100% - 2rem));
  }
`;

const Eyebrow = styled.p`
  margin: 0 0 1rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  font-size: 0.85rem;
  opacity: 0.9;
`;

const Title = styled.h1`
  max-width: 760px;
  margin: 0;
  font-size: 3.35rem;
  font-weight: 600;
  line-height: 1.12;
  letter-spacing: -0.02em;

  span {
    color: ${({ theme }) => theme.colors.primary};
  }

  @media (max-width: 980px) {
    font-size: 2.75rem;
  }

  @media (max-width: 768px) {
    font-size: 2.25rem;
  }
`;

const Sub = styled.p`
  max-width: 48ch;
  margin: 1.15rem 0 0;
  font-size: 1.08rem;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.8);

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

/* ===== Feature strip ===== */

const Features = styled.section`
  background: #f6f6f7;
  border-top: 1px solid rgba(17, 17, 17, 0.08);
  border-bottom: 1px solid rgba(17, 17, 17, 0.08);

  @media (max-width: 768px) {
    display: none;
  }
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

const DesktopTabsWrap = styled.div`
  display: block;

  @media (max-width: 768px) {
    display: none;
  }
`;

const MobileOptions = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: grid;
    gap: 0.9rem;
    margin-top: 1.4rem;
  }
`;

const MobileOption = styled.article`
  border: 1px solid rgba(15, 23, 42, 0.08);
  border-radius: 22px;
  background: #fafafa;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04);
`;

const MobileOptionTrigger = styled.button`
  width: 100%;
  appearance: none;
  border: 0;
  background: ${({ $active }) => ($active ? "rgba(0,0,0,0.02)" : "#fff")};
  color: rgba(0, 0, 0, 0.88);
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;

  padding: 1rem;
  text-align: left;

  font-size: 0.95rem;
  font-weight: 800;
  letter-spacing: 0.04em;
  text-transform: uppercase;

  &:focus-visible {
    outline: 3px solid rgba(0, 0, 0, 0.16);
    outline-offset: 2px;
  }
`;

const MobileOptionLabel = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;
`;

const MobileDot = styled.span`
  width: 10px;
  height: 10px;
  border-radius: 999px;
  background: ${({ $active, theme }) =>
    $active ? theme.colors.primary : "rgba(0,0,0,0.18)"};
  flex-shrink: 0;
`;

const MobileChevron = styled.span`
  font-size: 1.1rem;
  line-height: 1;
  color: rgba(0, 0, 0, 0.45);
`;

const MobilePanel = styled.div`
  padding: 0 0 1rem;
`;

/* ===== Tabs area ===== */

const Section = styled.section`
  padding: clamp(3.2rem, 5vw, 4.6rem) 0;
  background: #fff;
`;

const TabsBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
  margin-top: 1.6rem;
  margin-left: 1.4rem;
  align-items: center;
  width: fit-content;
  max-width: 100%;

  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(0, 0, 0, 0.06);
  box-shadow: 0 14px 34px rgba(0, 0, 0, 0.05);
  border-radius: 999px;
  padding: 0.4rem;
`;

const TabButton = styled.button`
  appearance: none;
  border: 0;
  cursor: pointer;

  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 44px;
  padding: 0 1.15rem;
  border-radius: 999px;

  background: ${({ $active, theme }) =>
    $active ? theme.colors.primary : "transparent"};
  color: ${({ $active }) => ($active ? "#fff" : "rgba(0,0,0,0.75)")};

  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-size: 0.78rem;
  line-height: 1;

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

  background: rgba(250, 250, 250, 0.98);
  border: 1px solid rgba(15, 23, 42, 0.08);
  box-shadow: 0 18px 50px rgba(0, 0, 0, 0.07);

  display: grid;
  grid-template-columns: 1fr;

  @media (min-width: 980px) {
    grid-template-columns: 1.05fr 1fr;
    align-items: stretch;
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
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.75rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Primary = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  width: 100%;
  padding: 0.9rem 1rem;
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
  min-height: 48px;
  width: 100%;
  padding: 0.9rem 1rem;
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

/* ===== Inspiration section ===== */
const InspirationSection = styled.section`
  padding: 4rem 0;
  background: #fafafa;
  border-top: 1px solid rgba(15, 23, 42, 0.08);
  border-bottom: 1px solid rgba(15, 23, 42, 0.08);
`;

const InspirationInner = styled.div`
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

const InspirationCard = styled.figure`
  position: relative;
  min-width: 0;
  min-height: clamp(420px, 38vw, 560px);
  margin: 0;
  overflow: hidden;
  isolation: isolate;
  border-radius: 8px;
  background: #f3f4f1;
  box-shadow: 0 20px 58px rgba(15, 23, 42, 0.12);
  transition: opacity 320ms ease, filter 320ms ease, box-shadow 420ms ease;

  &:before {
    content: "";
    position: absolute;
    inset: -24px;
    z-index: 0;
    opacity: 0;
    pointer-events: none;
    background: linear-gradient(
        rgba(243, 244, 241, 0.16),
        rgba(243, 244, 241, 0.16)
      ),
      url(${({ $image }) => $image});
    background-size: cover;
    background-position: center;
    filter: blur(18px) saturate(0.86) brightness(0.9);
    transform: scale(1.08);
    transition: opacity 520ms ease;
  }

  &:after {
    content: "";
    position: absolute;
    inset: 0;
    z-index: 2;
    pointer-events: none;
    background: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.58),
      rgba(0, 0, 0, 0.2) 44%,
      rgba(0, 0, 0, 0.04)
    );
  }

  @media (max-width: 760px) {
    min-height: min(62vh, 420px);
    aspect-ratio: 4 / 5;
    scroll-snap-align: center;
    box-shadow: 0 18px 44px rgba(15, 23, 42, 0.16);
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

const InspirationImage = styled.img`
  position: absolute;
  inset: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: block;
  object-fit: cover;
  object-position: center;
  transform: none;
  transition: padding 520ms cubic-bezier(0.2, 0.75, 0.22, 1), filter 520ms ease,
    object-fit 0ms linear;

  @media (max-width: 760px) {
    transform: none;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
    transform: none;
  }
`;

const InspirationCaption = styled.figcaption`
  position: absolute;
  inset: auto 0 0;
  z-index: 3;
  padding: clamp(1rem, 2vw, 1.45rem);
  color: #fff;
  text-shadow: 0 1px 22px rgba(0, 0, 0, 0.55);
  transition: transform 420ms ease, opacity 420ms ease;

  span {
    display: block;
    font-family: "Cormorant Garamond", ui-serif, Georgia, serif;
    font-size: clamp(1.08rem, 1.4vw, 1.45rem);
    line-height: 1.08;
    letter-spacing: 0;
  }

  p {
    max-width: 29ch;
    margin: 0.45rem 0 0;
    font-size: 0.92rem;
    line-height: 1.55;
    color: rgba(255, 255, 255, 0.76);
  }

  @media (max-width: 760px) {
    padding: 1rem;

    p {
      font-size: 0.88rem;
    }
  }
`;

const InspirationGallery = styled.div`
  --gallery-gap: clamp(0.65rem, 1.1vw, 1rem);
  position: relative;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--gallery-gap);
  min-height: clamp(420px, 38vw, 560px);
  margin-top: clamp(1.45rem, 3vw, 2.25rem);
  overflow: hidden;
  border-radius: 8px;
  background: transparent;

  @media (hover: hover) and (pointer: fine) {
    &:hover ${InspirationCard}:not(:hover) {
      opacity: 0.22;
      filter: saturate(0.7);
    }

    ${InspirationCard}:hover {
      position: absolute;
      inset: 0;
      z-index: 5;
      opacity: 1;
      filter: none;
      transform: none;
      box-shadow: 0 28px 78px rgba(15, 23, 42, 0.22);
    }

    ${InspirationCard}:hover:before {
      opacity: 1;
    }

    ${InspirationCard}:hover:after {
      background: linear-gradient(
          90deg,
          rgba(0, 0, 0, 0.42),
          rgba(0, 0, 0, 0.08) 46%,
          rgba(0, 0, 0, 0.2)
        ),
        linear-gradient(to top, rgba(0, 0, 0, 0.42), transparent 44%);
    }

    ${InspirationCard}:hover ${InspirationImage} {
      object-fit: contain;
      padding: clamp(0.7rem, 1.2vw, 1rem);
      filter: drop-shadow(0 26px 34px rgba(0, 0, 0, 0.2));
      transform: none;
    }

    ${InspirationCard}:hover ${InspirationCaption} {
      transform: translateY(-0.25rem);
    }
  }

  @media (max-width: 760px) {
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: min(82vw, 380px);
    grid-template-columns: none;
    gap: 0.85rem;
    width: calc(100% + 2rem);
    min-height: 0;
    margin-left: -1rem;
    padding: 0 1rem 0.65rem;
    overflow-x: auto;
    border-radius: 0;
    background: transparent;
    scroll-snap-type: x mandatory;
    scrollbar-width: none;
    -webkit-overflow-scrolling: touch;

    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

const FinalSection = styled.section`
  position: relative;
  min-height: 620px;
  display: flex;
  align-items: center;
  color: #fff;
  background: #111;
`;

const FinalImage = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const FinalOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.42)),
    linear-gradient(to top, rgba(0, 0, 0, 0.55), transparent);
`;

const FinalContent = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 1180px;
  margin: 0 auto;
  padding: 0 1rem;
  box-sizing: border-box;

  ${Kicker} {
    color: rgba(255, 255, 255, 0.72);
  }

  ${Kicker}:after {
    background: rgba(196, 151, 98, 0.78);
  }
`;

const FinalTitle = styled.h2`
  max-width: 760px;
  margin: 0.7rem 0 0;
  font-size: 3.2rem;
  line-height: 1.06;
  letter-spacing: 0;

  @media (max-width: 760px) {
    font-size: 2.15rem;
  }
`;

const FinalText = styled.p`
  max-width: 620px;
  margin: 1rem 0 0;
  font-size: 1.03rem;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.78);
`;

const FinalActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1.55rem;

  @media (max-width: 540px) {
    display: grid;

    a {
      width: 100%;
    }
  }
`;

const PrimaryCta = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 52px;
  padding: 0.9rem 1.15rem;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  text-decoration: none;
  font-size: 0.86rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0;
  transition: transform 220ms ease, filter 220ms ease;

  &:hover {
    transform: translateY(-2px);
    filter: brightness(0.96);
  }

  &:focus-visible {
    outline: 3px solid rgba(255, 255, 255, 0.52);
    outline-offset: 3px;
  }
`;

const GhostCta = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 52px;
  padding: 0.9rem 1.15rem;
  border-radius: 8px;
  border: 1px solid currentColor;
  color: currentColor;
  background: transparent;
  text-decoration: none;
  font-size: 0.86rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0;
  transition: transform 220ms ease, background 220ms ease;

  &:hover {
    transform: translateY(-2px);
    background: rgba(255, 255, 255, 0.08);
  }

  &:focus-visible {
    outline: 3px solid currentColor;
    outline-offset: 3px;
  }
`;

/* =========================
   Component
========================= */

export default function Mosquiteras({
  onOpenAsesoramiento,
  includeHelmet = true,
}) {
  const location = useLocation();

  const {
    canonical,
    description,
    ogImage,
    ogImageAlt,
    ogImageHeight,
    ogImageWidth,
    ogLocale,
    ogType,
    robots,
    siteName,
    title,
    twitterCard,
  } = MOSQUITERAS_SEO;

  const tabs = useMemo(
    () => [
      {
        id: "enrollables",
        label: "Enrollables",
        title: "Mosquiteras enrollables a medida",
        images: responsiveImages.mEnrollable,
        value: "La opción más práctica para ventanas de uso frecuente.",
        text: "Discretas, cómodas y fáciles de recoger cuando no las necesitas. Son una solución muy equilibrada para dormitorios, cocinas y estancias donde buscas ventilación diaria sin perder limpieza visual.",
        bullets: [
          "Ideales para ventanas de uso habitual",
          "Recogida superior limpia y cómoda",
          "Aspecto discreto e integrado",
          "Buena combinación entre funcionalidad y estética",
        ],
      },
      {
        id: "correderas",
        label: "Correderas",
        title: "Mosquiteras correderas para puertas y ventanales",
        images: responsiveImages.mPuerta,
        value:
          "Pensadas para balconeras y huecos correderos de paso frecuente.",
        text: "Funcionan especialmente bien en puertas correderas y grandes ventanales, donde necesitas una apertura cómoda y un sistema resistente para un uso continuo.",
        bullets: [
          "Perfectas para balconeras y ventanales",
          "Deslizamiento suave y cómodo",
          "Estructura estable y duradera",
          "Muy adecuadas para zonas de paso",
        ],
      },
      {
        id: "plisadas",
        label: "Plisadas",
        title: "Mosquiteras plisadas",
        images: responsiveImages.mExtensible,
        value:
          "Una solución cómoda y elegante para puertas de terraza o patio.",
        text: "Muy apreciadas por su apertura lateral y por lo bien que funcionan en accesos al exterior. Resultan prácticas, visualmente ligeras y muy cómodas en zonas de uso diario.",
        bullets: [
          "Apertura lateral cómoda",
          "Muy útiles en puertas de terraza o patio",
          "Poco invasivas visualmente",
          "Buenas para uso intensivo y familiar",
        ],
      },
      {
        id: "fijas",
        label: "Fijas",
        title: "Mosquiteras fijas",
        images: responsiveImages.mFija,
        value: "Protección permanente para huecos donde no necesitas apertura.",
        text: "Una opción sencilla, estable y eficaz para ventanas con menor manipulación. Son muy recomendables cuando buscas una solución duradera, con poco mantenimiento y presencia discreta.",
        bullets: [
          "Protección continua todo el año",
          "Estructura firme y estable",
          "Mantenimiento mínimo",
          "Muy adecuadas para huecos de poco acceso",
        ],
      },
    ],
    []
  );

  const initialFromHash = includeHelmet ? readHashTabId(location.hash) : null;

  const [active, setActive] = useState(() => {
    const match =
      initialFromHash &&
      tabs.find((t) => toSlug(t.id) === toSlug(initialFromHash));
    return match ? match.id : tabs[0].id;
  });

  const current = tabs.find((t) => t.id === active) || null;

  const handleToggleOption = (id) => {
    setActive((prev) => (prev === id ? null : id));
  };

  useEffect(() => {
    if (!current) {
      if (window.location.hash) {
        window.history.replaceState(
          null,
          "",
          window.location.pathname + window.location.search
        );
      }
      return;
    }

    const nextHash = `#${toSlug(current.id)}`;
    if (window.location.hash !== nextHash) {
      window.history.replaceState(null, "", nextHash);
    }
  }, [current, location.pathname, location.search]);

  useEffect(() => {
    const hash = readHashTabId(location.hash);
    if (!hash) return;
    const match = tabs.find((t) => toSlug(t.id) === toSlug(hash));
    if (!match) return;

    const frame = window.requestAnimationFrame(() => {
      setActive((prev) => (prev === match.id ? prev : match.id));
    });

    return () => window.cancelAnimationFrame(frame);
  }, [location.hash, tabs]);

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

  const openAdvisor = (event, source = CTA_SOURCE) => {
    trackEvent("open_quick_enquiry", { source, pack: PACK_LABEL });

    if (typeof onOpenAsesoramiento === "function") {
      event.preventDefault();
      onOpenAsesoramiento(PACK_LABEL, source);
    }
  };

  const handleOpenCta = (event) => {
    openAdvisor(event, CTA_SOURCE);
  };

  const trackContact = (method, source) => {
    trackEvent("contact_click", { source, method, pack: PACK_LABEL });
  };

  return (
    <Page>
      {includeHelmet && (
        <Helmet>
        <title>{title}</title>

        <meta name="description" content={description} />
          <meta name="robots" content={robots} />
        <link rel="canonical" href={canonical} />

        <link
          rel="preload"
          as="image"
          href={MOSQUITERAS_HERO_PRELOAD.href}
          imageSrcSet={MOSQUITERAS_HERO_PRELOAD.imageSrcSet}
          imageSizes={MOSQUITERAS_HERO_PRELOAD.imageSizes}
          fetchPriority="high"
        />

        <meta property="og:site_name" content={siteName} />
          <meta property="og:type" content={ogType} />
          <meta property="og:locale" content={ogLocale} />
        <meta property="og:url" content={canonical} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:alt" content={ogImageAlt} />
          <meta property="og:image:width" content={ogImageWidth} />
          <meta property="og:image:height" content={ogImageHeight} />

          <meta name="twitter:card" content={twitterCard} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />
        <meta name="twitter:image:alt" content={ogImageAlt} />

          <script type="application/ld+json">
            {JSON.stringify(MOSQUITERAS_PAGE_JSON_LD)}
          </script>
        </Helmet>
      )}

      <Hero>
        <HeroMedia aria-hidden="true">
          <HeroImg
            src={hero_1280}
            srcSet={`${hero_768} 768w, ${hero_1280} 1280w, ${hero_1920} 1920w`}
            sizes={HERO_SIZES}
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
          <Eyebrow>Mosquiteras a medida en Castellón</Eyebrow>
          <Title>
            Ventila con libertad, <span>sin renunciar</span> al confort
          </Title>
          <Sub>
            Soluciones discretas para ventanas, balconeras y puertas. Medición
            e instalación en Castellón y provincia.
          </Sub>
        </HeroInner>
      </Hero>

      <Features>
        <FeaturesGrid>
          <Feature>
            <FeatureTitle>Hechas a medida</FeatureTitle>
            <FeatureText>
              Para que encajen bien, cierren correctamente y se integren con
              discreción.
            </FeatureText>
          </Feature>
          <Feature>
            <FeatureTitle>Comodidad real de uso</FeatureTitle>
            <FeatureText>
              Sistemas pensados para abrir, cerrar y limpiar sin esfuerzo en el
              día a día.
            </FeatureText>
          </Feature>
          <Feature>
            <FeatureTitle>Castellón y provincia</FeatureTitle>
            <FeatureText>
              Medición precisa, montaje limpio y atención cercana también para
              proyectos seleccionados en Valencia.
            </FeatureText>
          </Feature>
        </FeaturesGrid>
      </Features>

      <Section aria-label="Tipos de mosquiteras">
        <Container>
          <SectionTop>
            <Kicker>Tipos de mosquiteras</Kicker>
            <SectionTitle>
              Te ayudamos a elegir la opción <span>más adecuada</span>
            </SectionTitle>
            <SectionLead>
              No todas las aperturas necesitan el mismo sistema. Te orientamos
              según el tipo de ventana o puerta, la frecuencia de uso y el nivel
              de confort que buscas, para que la solución funcione bien de
              verdad.
            </SectionLead>

            <DesktopTabsWrap>
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
            </DesktopTabsWrap>
          </SectionTop>

          <DesktopTabsWrap>
            {current && (
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
                      Solicitar asesoramiento
                    </Primary>
                    <Secondary
                      to={`/contact?pack=${PACK_QUERY}`}
                      onClick={handleOpenCta}
                    >
                      Pedir presupuesto
                    </Secondary>
                  </Actions>
                </Content>
              </Panel>
            )}
          </DesktopTabsWrap>

          <MobileOptions aria-label="Opciones de mosquiteras para móvil">
            {tabs.map((t) => {
              const isOpen = t.id === active;

              return (
                <MobileOption key={t.id}>
                  <MobileOptionTrigger
                    type="button"
                    onClick={() => handleToggleOption(t.id)}
                    $active={isOpen}
                    aria-expanded={isOpen}
                    aria-controls={`mobile-panel-${t.id}`}
                    id={`mobile-tab-${t.id}`}
                  >
                    <MobileOptionLabel>
                      <MobileDot $active={isOpen} />
                      {t.label}
                    </MobileOptionLabel>

                    <MobileChevron aria-hidden="true">
                      {isOpen ? "−" : "+"}
                    </MobileChevron>
                  </MobileOptionTrigger>

                  {isOpen && (
                    <MobilePanel
                      id={`mobile-panel-${t.id}`}
                      role="region"
                      aria-labelledby={`mobile-tab-${t.id}`}
                    >
                      <Panel
                        as="div"
                        style={{
                          margin: "0",
                          borderRadius: "0",
                          borderLeft: "0",
                          borderRight: "0",
                          borderBottom: "0",
                          boxShadow: "none",
                        }}
                      >
                        <Media>
                          <Img
                            src={t.images[800]}
                            srcSet={getSrcSet(t.images)}
                            sizes="100vw"
                            alt={t.title}
                            loading="lazy"
                            decoding="async"
                          />
                          <Overlay />
                          <Badge>{t.label}</Badge>
                        </Media>

                        <Content>
                          <PanelTitle>{t.title}</PanelTitle>
                          <Value>{t.value}</Value>
                          <Text>{t.text}</Text>

                          <Bullets aria-label={`Ventajas de ${t.label}`}>
                            {t.bullets.map((b) => (
                              <Bullet key={b}>{b}</Bullet>
                            ))}
                          </Bullets>

                          <Actions>
                            <Secondary
                              to={`/contact?pack=${PACK_QUERY}`}
                              onClick={handleOpenCta}
                            >
                              Solicitar asesoramiento
                            </Secondary>
                          </Actions>
                        </Content>
                      </Panel>
                    </MobilePanel>
                  )}
                </MobileOption>
              );
            })}
          </MobileOptions>

          <HelpStrip aria-label="Ayuda y contacto">
            <HelpText>
              <strong>¿No sabes cuál elegir?</strong>
              <span>
                Envíanos una foto del hueco y unas medidas aproximadas. Te
                orientamos con honestidad y te recomendamos la solución más
                práctica para tu caso.
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

      <InspirationSection>
        <InspirationInner>
          <SectionTop>
            <Kicker>Inspiración</Kicker>
            <SectionTitle>
              Mosquiteras integradas en <span>espacios reales</span>
            </SectionTitle>
            <SectionLead>
              Ideas para ver cómo una mosquitera a medida puede proteger la
              vivienda sin romper la estética de dormitorios, salones y baños.
            </SectionLead>
          </SectionTop>

          <InspirationGallery aria-label="Ambientes con mosquiteras a medida">
            {GALLERY_IMAGES.map((image) => (
              <InspirationCard key={image.alt} $image={image.src}>
                <InspirationImage
                  src={image.src}
                  srcSet={image.srcSet}
                  sizes="(max-width: 760px) 82vw, 39vw"
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  loading="lazy"
                  decoding="async"
                  fetchPriority="low"
                />
                <InspirationCaption>
                  <span>{image.title}</span>
                  <p>{image.text}</p>
                </InspirationCaption>
              </InspirationCard>
            ))}
          </InspirationGallery>
        </InspirationInner>
      </InspirationSection>

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

      <FAQSection>
        <FAQInner>
          <SectionTop>
            <Kicker>FAQ</Kicker>
            <SectionTitle>
              Preguntas <span>frecuentes</span>
            </SectionTitle>
            <SectionLead>
              Compatibilidades, tipos de apertura, instalación y mantenimiento:
              resolvemos las dudas más habituales antes de elegir tu sistema.
            </SectionLead>
          </SectionTop>

          <FaqAccordion
            items={MOSQUITERAS_FAQ_ITEMS}
            withSchema={includeHelmet}
            canonicalUrl={canonical}
            defaultOpenIndex={-1}
            ariaLabel="Preguntas frecuentes sobre mosquiteras a medida"
          />
        </FAQInner>
      </FAQSection>

      <FinalSection>
        <FinalImage
          src={hero_1280}
          srcSet={`${hero_768} 768w, ${hero_1280} 1280w, ${hero_1920} 1920w`}
          sizes="100vw"
          alt="Interior conectado con terraza mediante mosquitera a medida"
          loading="lazy"
          decoding="async"
        />
        <FinalOverlay />
        <FinalContent>
          <Kicker>Empezamos con una foto</Kicker>
          <FinalTitle>
            Envíanos el hueco. Te decimos qué solución encaja.
          </FinalTitle>
          <FinalText>
            Una imagen de la ventana o puerta y unas medidas aproximadas bastan
            para orientarte antes de preparar una propuesta a medida.
          </FinalText>
          <FinalActions>
            <PrimaryCta
              to={`/contact?pack=${PACK_QUERY}`}
              onClick={(event) =>
                openAdvisor(event, "mosquiteras_luxury_final")
              }
            >
              Solicitar asesoramiento
            </PrimaryCta>
            <GhostCta
              href={CONTACT.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackContact("whatsapp", "mosquiteras_luxury_final")
              }
            >
              WhatsApp
            </GhostCta>
          </FinalActions>
        </FinalContent>
      </FinalSection>

      <StickyCtaButton message="Hola, me gustaría información sobre mosquiteras a medida. Gracias." />
    </Page>
  );
}
