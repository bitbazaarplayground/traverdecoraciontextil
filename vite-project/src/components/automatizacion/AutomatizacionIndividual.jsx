// src/components/automatizacion/AutomatizacionIndividual.jsx
import { ArrowRight } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useLocation } from "react-router-dom";
import styled, { css, keyframes } from "styled-components";
import { CONTACT } from "../../config/contact";
import StickyCtaButton from "../../mobile/StickyCtaButton";
// IMAGES
import persianasImg from "../../assets/Automatizacion/benefit1.webp";
import cortinasImg from "../../assets/Automatizacion/domotica1.webp";
import toldosImg from "../../assets/Automatizacion/toldoInd.webp";
// import toldosImg from "../../assets/Automatizacion/smartHom2.webp";

/* =========================
   MOTION (subtle, premium)
========================= */

const floatIn = keyframes`
  from { transform: translateY(14px); opacity: 0; }
  to   { transform: translateY(0); opacity: 1; }
`;

const shimmer = keyframes`
  0%   { transform: translateX(-120%); opacity: .0; }
  35%  { opacity: .55; }
  70%  { opacity: .18; }
  100% { transform: translateX(120%); opacity: 0; }
`;

const reduceMotion = css`
  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation: none !important;
      transition: none !important;
      scroll-behavior: auto !important;
    }
  }
`;

/* =========================
   PAGE FRAME
========================= */

const Page = styled.div`
  ${reduceMotion}

  background:
    radial-gradient(1200px 520px at 50% -2%, rgba(229, 0, 126, 0.10), transparent 60%),
    radial-gradient(900px 520px at 10% 18%, rgba(0, 0, 0, 0.06), transparent 55%),
    #f5f4f2;

  color: #151515;
  font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial,
    "Helvetica Neue", sans-serif;
`;

/* =========================
   HERO (FUTURISTIC — INDIVIDUAL)
========================= */

const Hero = styled.section`
  position: relative;
  padding: 5.25rem 2rem 2.75rem;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 4.25rem 1.5rem 2.25rem;
  }
`;

const HeroBg = styled.div`
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
  filter: saturate(0.95) contrast(1.06);
  transform: scale(1.06);
`;

const HeroOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: radial-gradient(
      900px 520px at 50% 18%,
      rgba(255, 255, 255, 0.06),
      rgba(0, 0, 0, 0.46)
    ),
    linear-gradient(to bottom, rgba(0, 0, 0, 0.06), rgba(11, 12, 15, 0.22));
`;

const scan = keyframes`
  from { transform: translateY(-80%); opacity: 0; }
  30% { opacity: .25; }
  to { transform: translateY(120%); opacity: 0; }
`;

const HeroScan = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  height: 220px;
  top: 0;
  opacity: 0.25;
  background: linear-gradient(
    to bottom,
    transparent,
    rgba(196, 151, 98, 0.22),
    transparent
  );
  animation: ${scan} 4.8s ease-in-out infinite;
  pointer-events: none;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: 0.12;
  }
`;

const HeroGlow = styled.div`
  position: absolute;
  inset: 0;
  background: radial-gradient(
      900px 520px at 18% 10%,
      rgba(196, 151, 98, 0.16),
      transparent 55%
    ),
    radial-gradient(
      900px 520px at 82% 20%,
      rgba(229, 0, 126, 0.14),
      transparent 60%
    );
  pointer-events: none;
`;

const HeroInner = styled.div`
  position: relative;
  z-index: 1;
  max-width: 1180px;
  margin: 0 auto;
  display: grid;
  gap: 1.6rem;

  @media (min-width: 980px) {
    grid-template-columns: 1.05fr 0.95fr;
    align-items: start;
  }
`;

const HeroTop = styled.div`
  max-width: 74ch;
`;

/* Typography adapted from your “individual” wording */
const MicroLineDark = styled.p`
  letter-spacing: 0.22em;
  text-transform: uppercase;
  font-size: 0.8rem;
  color: rgba(244, 244, 245, 0.72);
  margin: 0 0 0.9rem 0;
`;

const HeroTitleDark = styled.h1`
  margin: 0;
  font-size: clamp(2.35rem, 4.6vw, 3.75rem);
  font-weight: 760;
  line-height: 1.03;
  letter-spacing: -0.03em;
  color: rgba(244, 244, 245, 0.98);
`;

const HeroScriptDark = styled.div`
  margin-top: 0.45rem;
  font-family: "Cormorant Garamond", serif;
  font-style: italic;
  font-weight: 300;
  font-size: clamp(1.55rem, 3.3vw, 2.7rem);
  line-height: 1.08;
  color: rgba(244, 244, 245, 0.92);

  em {
    color: ${({ theme }) => theme.colors.primary};
    text-shadow: 0 0 26px rgba(229, 0, 126, 0.35);
  }
`;

const HeroPDark = styled.p`
  margin: 1.05rem 0 0;
  max-width: 66ch;
  font-size: 1.12rem;
  line-height: 1.75;
  color: rgba(244, 244, 245, 0.78);
`;
/* =========================
   REASSURANCE STRIP (between Hero and Main)
========================= */

const Reassure = styled.section`
  position: relative;
  padding: 1.25rem 0 0.75rem;
`;

const ReassureWrap = styled.div`
  width: min(1120px, calc(100% - 2.4rem));
  margin: 0 auto;
`;

const ReassureCard = styled.div`
  border-radius: 26px;
  background: rgba(255, 255, 255, 0.72);
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0 22px 70px rgba(0, 0, 0, 0.08);
  overflow: hidden;
`;

const ReassureTop = styled.div`
  padding: 1.05rem 1.15rem 0.9rem;

  display: grid;
  gap: 0.55rem;

  @media (min-width: 980px) {
    grid-template-columns: 1.2fr 0.8fr;
    align-items: center;
  }
`;

const ReassureTitle = styled.h2`
  margin: 0;
  font-size: clamp(1.05rem, 1.35vw, 1.25rem);
  font-weight: 780;
  letter-spacing: -0.02em;
  color: rgba(0, 0, 0, 0.86);
`;

const ReassureP = styled.p`
  margin: 0;
  color: rgba(0, 0, 0, 0.64);
  line-height: 1.6;
  font-size: 0.98rem;
  max-width: 70ch;
`;

const ReassureChips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;

  @media (min-width: 980px) {
    justify-content: flex-end;
  }
`;

const Chip = styled.span`
  font-size: 0.72rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  padding: 0.42rem 0.7rem;
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.045);
  border: 1px solid rgba(0, 0, 0, 0.08);
  color: rgba(0, 0, 0, 0.72);
`;

const ReassureGrid = styled.div`
  display: grid;
  gap: 0.65rem;
  padding: 0 1.15rem 1.05rem;

  @media (min-width: 900px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const MiniCard = styled.div`
  position: relative;
  border-radius: 18px;
  padding: 0.95rem 0.95rem;

  background: rgba(255, 255, 255, 0.72);
  border: 1px solid rgba(0, 0, 0, 0.08);

  transition: transform 200ms ease, box-shadow 200ms ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 18px 45px rgba(0, 0, 0, 0.08);
  }

  /* subtle editorial “shine” */
  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: radial-gradient(
      420px 140px at 25% 10%,
      rgba(229, 0, 126, 0.1),
      transparent 62%
    );
    pointer-events: none;
    opacity: 0.75;
  }
`;

const MiniKicker = styled.div`
  font-size: 0.72rem;
  letter-spacing: 0.26em;
  text-transform: uppercase;
  color: rgba(0, 0, 0, 0.55);
`;

const MiniTitle = styled.div`
  margin-top: 0.35rem;
  font-weight: 800;
  color: rgba(0, 0, 0, 0.86);
  letter-spacing: -0.01em;
`;

const MiniText = styled.div`
  margin-top: 0.4rem;
  color: rgba(0, 0, 0, 0.62);
  line-height: 1.55;
  font-size: 0.92rem;
`;
/* =========================
   MAIN LAYOUT
========================= */

const Main = styled.main`
  padding: 1.2rem 0 4.2rem;
`;

const Section = styled.section`
  scroll-margin-top: 92px;
  padding: clamp(2.6rem, 4vw, 3.6rem) 0;
`;

const Wrap = styled.div`
  width: min(1120px, calc(100% - 2.4rem));
  margin: 0 auto;
`;

const Grid = styled.div`
  display: grid;
  gap: 1.5rem;

  @media (min-width: 980px) {
    grid-template-columns: 1.03fr 0.97fr;
    align-items: center;

    ${(p) =>
      p.$flip &&
      css`
        direction: rtl;
        & > * {
          direction: ltr;
        }
      `}
  }
`;

/* =========================
   MEDIA CARD
========================= */

const MediaCard = styled.div`
  position: relative;
  border-radius: 28px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.55);
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0 28px 90px rgba(0, 0, 0, 0.1);

  transform: translateY(0);
  transition: transform 260ms ease, box-shadow 260ms ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 34px 110px rgba(0, 0, 0, 0.12);
  }

  /* soft film overlay (editorial) */
  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: radial-gradient(
      900px 420px at 30% 20%,
      rgba(255, 255, 255, 0.2),
      transparent 60%
    );
    pointer-events: none;
  }
`;

const Img = styled.img`
  width: 100%;
  height: 360px;
  object-fit: cover;
  display: block;

  @media (max-width: 768px) {
    height: 255px;
  }
`;

/* =========================
   CONTENT / EDITORIAL
========================= */

const Content = styled.div`
  position: relative;
`;

const Kicker = styled.div`
  font-size: 0.72rem;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: rgba(0, 0, 0, 0.58);
`;

const H2 = styled.h2`
  font-family: "Cormorant Garamond", serif;
  font-weight: 300;
  text-transform: uppercase;
  margin: 0.7rem 0 0;
  line-height: 1.05;
  font-size: clamp(1.65rem, 2.4vw, 2.25rem);
`;

const Lead = styled.p`
  margin: 0.75rem 0 0;
  font-size: 1.05rem;
  font-weight: 700;
  color: rgba(0, 0, 0, 0.78);
  line-height: 1.5;
`;

const Text = styled.p`
  margin: 0.8rem 0 0;
  color: rgba(0, 0, 0, 0.66);
  line-height: 1.78;
`;

const PriceRow = styled.div`
  margin-top: 1.15rem;
  display: grid;
  gap: 0.35rem;
`;

const Price = styled.div`
  font-size: 0.86rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(0, 0, 0, 0.84);
`;

const Availability = styled.div`
  margin-top: 0.25rem;
  font-size: 0.9rem;
  color: rgba(0, 0, 0, 0.55);
`;

/* =========================
   OFFER CARD
========================= */

const Offer = styled.div`
  margin-top: 1.35rem;
  padding: 1.15rem 1.15rem;
  border-radius: 22px;
  background: rgba(0, 0, 0, 0.045);
  border: 1px solid rgba(0, 0, 0, 0.06);
  position: relative;
  overflow: hidden;

  /* subtle pink editorial shimmer */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -30%;
    width: 42%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(229, 0, 126, 0.1),
      transparent
    );
    animation: ${shimmer} 7s ease-in-out infinite;
    pointer-events: none;
  }

  @media (prefers-reduced-motion: reduce) {
    &::before {
      display: none;
    }
  }
`;

const OfferTitle = styled.h3`
  font-size: 0.78rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  margin: 0;
  color: rgba(0, 0, 0, 0.75);
`;

const List = styled.ul`
  margin: 0.85rem 0 0;
  padding-left: 1.1rem;
  color: rgba(0, 0, 0, 0.67);

  li {
    margin: 0.35rem 0;
    line-height: 1.55;
  }
`;

const Conversion = styled.div`
  margin-top: 1.05rem;
  display: grid;
  gap: 0.75rem;
`;

const TrustRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const PrimaryWide = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.55rem;

  width: 100%;
  padding: 0.95rem 1.2rem;
  border-radius: 999px;

  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  text-decoration: none;

  font-size: 0.82rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;

  transition: transform 180ms ease, filter 180ms ease;

  &:hover {
    filter: brightness(0.98);
    transform: translateY(-1px);
  }
`;

const Packs = styled.div`
  margin-top: 1.25rem;
  display: grid;
  gap: 12px;

  @media (min-width: 720px) {
    grid-template-columns: 1fr 1fr;
    align-items: start;
  }
`;

const BaseCard = styled.div`
  border-radius: 22px;
  background: rgba(255, 255, 255, 0.78);
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0 18px 55px rgba(0, 0, 0, 0.08);
  padding: 16px;
  position: relative;
  overflow: hidden;
`;

const CardKicker = styled.div`
  font-size: 0.75rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(0, 0, 0, 0.58);
  font-weight: 800;
  margin-bottom: 10px;
`;

const PriceCard = styled(BaseCard)`
  /* subtle highlight so price feels like “the offer” */
  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: radial-gradient(
      520px 180px at 24% 12%,
      rgba(229, 0, 126, 0.1),
      transparent 60%
    );
    pointer-events: none;
    opacity: 0.9;
  }
`;

const PriceStack = styled.div`
  display: grid;
  gap: 10px;
`;

const PriceLine = styled.div`
  padding: 12px 12px;
  border-radius: 18px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  background: rgba(0, 0, 0, 0.03);
  line-height: 1.45;
  font-weight: 750;
  color: rgba(0, 0, 0, 0.86);
`;

const IncludesCard = styled(BaseCard)``;

const IncludesList = styled.ul`
  margin: 0;
  padding-left: 1.1rem;
  color: rgba(0, 0, 0, 0.66);

  li {
    margin: 0.35rem 0;
    line-height: 1.55;
  }
`;

const CtaCard = styled(BaseCard)`
  grid-column: 1 / -1; /* spans full width under the two cards */
  padding: 16px;

  /* your editorial shimmer can live here instead of inside Offer */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -30%;
    width: 42%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(229, 0, 126, 0.1),
      transparent
    );
    animation: ${shimmer} 7s ease-in-out infinite;
    pointer-events: none;
  }

  @media (prefers-reduced-motion: reduce) {
    &::before {
      display: none;
    }
  }
`;

const CtaRow = styled.div`
  margin-top: 12px;
  display: grid;
  gap: 10px;

  @media (min-width: 560px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const SecondaryWide = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.55rem;
  width: 100%;
  padding: 0.95rem 1.2rem;
  border-radius: 999px;

  background: rgba(0, 0, 0, 0.06);
  color: rgba(0, 0, 0, 0.86);
  text-decoration: none;

  font-size: 0.82rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-weight: 780;

  transition: transform 180ms ease, background 180ms ease;

  &:hover {
    background: rgba(0, 0, 0, 0.09);
    transform: translateY(-1px);
  }
`;

const FinePrint = styled.p`
  margin-top: 0.75rem;
  font-size: 0.82rem;
  color: rgba(0, 0, 0, 0.48);
  line-height: 1.5;
`;

/* =========================
   REVEAL (JS + CSS)
========================= */

const Reveal = styled.div`
  opacity: 0;
  transform: translateY(14px);
  will-change: transform, opacity;

  &.is-visible {
    animation: ${floatIn} 560ms cubic-bezier(0.2, 0.9, 0.2, 1) forwards;
  }

  @media (prefers-reduced-motion: reduce) {
    opacity: 1;
    transform: none;
  }
`;

/* =========================
   MOBILE WHATSAPP MINI CTA
========================= */

const MobileFab = styled.a`
  position: fixed;
  right: 14px;
  bottom: 14px;
  z-index: 50;

  display: none;

  @media (max-width: 820px) {
    display: inline-flex;
  }

  align-items: center;
  gap: 0.55rem;

  padding: 0.85rem 1rem;
  border-radius: 999px;

  background: rgba(255, 255, 255, 0.86);
  border: 1px solid rgba(0, 0, 0, 0.12);
  box-shadow: 0 18px 60px rgba(0, 0, 0, 0.16);

  text-decoration: none;
  color: rgba(0, 0, 0, 0.86);

  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);

  transition: transform 180ms ease;

  &:hover {
    transform: translateY(-2px);
  }

  svg {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const FabText = styled.span`
  font-size: 0.78rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-weight: 700;
`;

/* =========================
   HELPERS
========================= */

function buildWhatsAppLink(message) {
  const base = CONTACT.whatsappUrl; // e.g. https://wa.me/34614952856
  const text = encodeURIComponent(message);
  return `${base}?text=${text}`;
}

/* =========================
   COMPONENT
========================= */

export default function AutomatizacionIndividual({ contactTo = "/contact" }) {
  const location = useLocation();

  const baseUrl = (
    import.meta.env.VITE_SITE_URL || window.location.origin
  ).replace(/\/$/, "");
  const canonical = `${baseUrl}/automatizacion/individual`;
  const siteName = CONTACT.siteName;

  const title =
    "Automatización individual | Cortinas, screens y toldos motorizados en Castellón y Valencia";
  const description =
    "Automatiza por zonas: cortinas y estores motorizados, screens y persianas, o toldos con WiFi y app. Instalación profesional, configuración guiada y soporte en Castellón y Valencia.";
  const ogImage = `${baseUrl}/og.png`;

  const sections = useMemo(
    () => [
      {
        id: "cortinas",
        title: "Cortinas & estores",
        lead: "Caída impecable, silencio absoluto y control preciso de la luz interior.",
        paragraph:
          "Una automatización bien hecha no se nota: simplemente mejora tu día. Motores discretos, movimiento suave y un resultado que encaja con tu estilo.",
        prices: [
          "Motor + controlador (instalación incluida): 220€",
          "Estor + motor + controlador (instalación incluida): 345€",
        ],
        availability: "Disponibilidad: plazas de instalación limitadas.",
        bullets: [
          "Motor silencioso y ajuste fino",
          "Control por mando / app (según sistema)",
          "Instalación y puesta en marcha incluidas",
          "Garantía y soporte post-instalación",
        ],
        cta: "Pedir propuesta cortinas/estores",
        whatsappMsg:
          "Hola, me gustaría más información sobre cortinas y estores motorizados. ¿Podemos agendar una visita?",
        imageSrc: cortinasImg,
        imageAlt: "Cortinas y estores motorizados en interior luminoso",
        finePrint:
          "*El precio final puede variar según medidas, tejidos y número de motores.",
      },

      {
        id: "persianas",
        title: "Persianas & screens",
        lead: "Control solar, privacidad y confort térmico sin renunciar al diseño.",
        paragraph:
          "Cuando buscas luz bonita sin deslumbramiento, el screen suele ser la solución más equilibrada. Con automatización, tu casa se adapta con naturalidad.",
        prices: ["Desde 990€ (instalación incluida)"],
        availability:
          "Recomendado instalar antes de los meses de mayor exposición solar.",
        bullets: [
          "Tejido técnico screen (según elección)",
          "Movimiento suave y preciso",
          "Escenas día / noche / ausencia",
          "Instalación y configuración incluidas",
        ],
        cta: "Pedir propuesta screens",
        whatsappMsg:
          "Hola, me gustaría más información sobre persianas y screens motorizados. ¿Podemos agendar una visita?",
        imageSrc: persianasImg,
        imageAlt: "Screen enrollable con luz suave y diseño limpio",
        finePrint:
          "*El precio final depende de medidas, tejidos y configuración.",
      },

      {
        id: "toldos",
        title: "Toldos & exterior",
        lead: "Protección inteligente con control por WiFi y app móvil.",
        paragraph:
          "En exterior, automatizar es proteger. Tu toldo se adapta mejor al uso diario, mejora el confort de la terraza y puede configurarse con escenas según necesidades.",
        prices: [
          "Toldo 4m x 2m acrílico + motor WiFi + app (instalación + IVA incl.): 1380€",
          "Toldo cofre 4m x 2m + motor WiFi + app (instalación + IVA incl.): 1998€",
        ],
        availability: "Temporada alta: agenda de instalación limitada.",
        bullets: [
          "Motor WiFi + control con app",
          "Mando y calibración de límites",
          "Sensores (sol/viento) según necesidad",
          "Instalación segura y pruebas finales",
        ],
        cta: "Pedir propuesta toldos",
        whatsappMsg:
          "Hola, me gustaría más información sobre toldos motorizados con WiFi y app. ¿Podemos agendar una visita?",
        imageSrc: toldosImg,
        imageAlt: "Toldo motorizado en terraza exterior",
        finePrint:
          "*Instalación eléctrica sujeta a condiciones. El precio final puede variar según medidas y extras.",
      },
    ],
    []
  );

  // Scroll-to-hash support
  useEffect(() => {
    const hash = location.hash.replace("#", "");
    if (!hash) return;
    document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
  }, [location.hash]);

  // Scroll reveal (IntersectionObserver)
  const revealRefs = useRef([]);
  useEffect(() => {
    const nodes = revealRefs.current.filter(Boolean);
    if (!nodes.length) return;

    // Reduced motion: just show
    const prefersReduced = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)"
    )?.matches;
    if (prefersReduced) {
      nodes.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    if (!("IntersectionObserver" in window)) {
      nodes.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: "80px 0px", threshold: 0.12 }
    );

    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  // Track active section (for mobile WhatsApp FAB message)
  const [activeId, setActiveId] = useState(sections[0]?.id || "cortinas");
  useEffect(() => {
    const ids = sections.map((s) => s.id);
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean);

    if (!els.length) return;

    if (!("IntersectionObserver" in window)) return;

    const io = new IntersectionObserver(
      (entries) => {
        // pick the most visible
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) => (b.intersectionRatio || 0) - (a.intersectionRatio || 0)
          )[0];

        if (visible?.target?.id) setActiveId(visible.target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0.12, 0.25, 0.5] }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [sections]);

  const activeSection = sections.find((s) => s.id === activeId) || sections[0];
  const fabHref = buildWhatsAppLink(
    activeSection?.whatsappMsg ||
      "Hola, me gustaría más información. ¿Podemos agendar una visita?"
  );

  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${canonical}#webpage`,
    url: canonical,
    name: title,
    description,
    inLanguage: "es-ES",
    isPartOf: {
      "@type": "WebSite",
      "@id": `${baseUrl}/#website`,
      url: `${baseUrl}/`,
      name: siteName,
    },
    about: {
      "@type": "Service",
      name: "Automatización individual",
      areaServed: CONTACT.areaServed?.map((name) => ({
        "@type": "AdministrativeArea",
        name,
      })),
      provider: {
        "@type": "Organization",
        name: siteName,
        telephone: CONTACT.phoneLandline,
        email: CONTACT.email,
        url: `${baseUrl}/`,
      },
    },
  };

  return (
    <Page>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonical} />
        <meta name="robots" content="index,follow" />

        <meta property="og:site_name" content={siteName} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="es_ES" />
        <meta property="og:url" content={canonical} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={ogImage} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />

        <script type="application/ld+json">
          {JSON.stringify(webPageJsonLd)}
        </script>
      </Helmet>

      {/*  HERO  */}
      <Hero>
        <HeroBg>
          <HeroImg src={persianasImg} alt="" aria-hidden="true" />
          <HeroOverlay />
          <HeroScan />
          <HeroGlow />
        </HeroBg>

        <HeroInner>
          <HeroTop>
            <MicroLineDark>
              Automatización · Decoración textil · Protección solar
            </MicroLineDark>
            <HeroTitleDark>Automatiza lo esencial.</HeroTitleDark>
            {/* <HeroTitleDark>Elige por interés.</HeroTitleDark> */}
            {/* Control absoluto, por partes. */}
            <HeroScriptDark>
              Nosotros lo dejamos <em>perfecto</em>.
            </HeroScriptDark>

            <HeroPDark>
              Cortinas, screens o toldos con una propuesta clara, instalación
              profesional y un resultado que se siente desde el primer día.
            </HeroPDark>
          </HeroTop>
        </HeroInner>
      </Hero>
      {/* Tiny reassurance strip */}
      <Reassure>
        <ReassureWrap>
          <ReassureCard>
            <ReassureTop>
              <div>
                <ReassureTitle>
                  Automatiza por estancias o por piezas.
                </ReassureTitle>
                <ReassureP>
                  Empieza por lo esencial (una cortina, un screen o un toldo) y
                  amplía cuando te encaje. Te guiamos para que quede integrado,
                  limpio y cómodo.
                </ReassureP>
              </div>
            </ReassureTop>

            <ReassureGrid>
              <MiniCard>
                <MiniKicker>01 · A medida</MiniKicker>
                <MiniTitle>Una estancia a la vez</MiniTitle>
                <MiniText>
                  Automatiza salón, dormitorio o terraza sin comprometer toda la
                  vivienda.
                </MiniText>
              </MiniCard>

              <MiniCard>
                <MiniKicker>02 · Simple</MiniKicker>
                <MiniTitle>Un solo elemento</MiniTitle>
                <MiniText>
                  Motorizar un estor o un toldo puede cambiar el día a día más
                  de lo que imaginas.
                </MiniText>
              </MiniCard>

              <MiniCard>
                <MiniKicker>03 · Seguro</MiniKicker>
                <MiniTitle>Sin sorpresas</MiniTitle>
                <MiniText>
                  Propuesta clara, montaje profesional y puesta a punto para que
                  funcione perfecto.
                </MiniText>
              </MiniCard>
            </ReassureGrid>
          </ReassureCard>
        </ReassureWrap>
      </Reassure>
      <Main>
        {sections.map((s, idx) => (
          <Section key={s.id} id={s.id}>
            <Wrap>
              <Grid $flip={idx % 2 === 1}>
                <Reveal
                  ref={(el) => {
                    revealRefs.current[idx * 2] = el;
                  }}
                >
                  <MediaCard>
                    <Img
                      src={s.imageSrc}
                      alt={s.imageAlt}
                      loading={idx === 0 ? "eager" : "lazy"}
                      decoding="async"
                    />
                  </MediaCard>
                </Reveal>

                <Reveal
                  ref={(el) => {
                    revealRefs.current[idx * 2 + 1] = el;
                  }}
                >
                  <Content>
                    <Kicker>Precio orientativo</Kicker>
                    <H2>{s.title}</H2>
                    <Lead>{s.lead}</Lead>
                    <Text>{s.paragraph}</Text>

                    <Packs>
                      <PriceCard>
                        <CardKicker>Precio orientativo</CardKicker>

                        <PriceStack>
                          {(s.prices || []).map((p) => (
                            <PriceLine key={p}>{p}</PriceLine>
                          ))}
                        </PriceStack>

                        <Availability>{s.availability}</Availability>
                      </PriceCard>

                      <IncludesCard>
                        <CardKicker>Qué incluye</CardKicker>
                        <IncludesList>
                          {s.bullets.map((b) => (
                            <li key={b}>{b}</li>
                          ))}
                        </IncludesList>
                      </IncludesCard>

                      <CtaCard>
                        <TrustRow>
                          <Chip>Visita sin coste</Chip>
                          <Chip>Instalación incluida</Chip>
                          <Chip>Respuesta rápida</Chip>
                          <Chip>Castellón · Valencia</Chip>
                        </TrustRow>

                        <CtaRow>
                          <PrimaryWide
                            to={contactTo}
                            state={{
                              from: "/automatizacion/individual",
                              focus: s.id,
                              message: s.whatsappMsg,
                            }}
                          >
                            Solicitar propuesta
                            <ArrowRight size={18} />
                          </PrimaryWide>

                          <SecondaryWide
                            href={buildWhatsAppLink(s.whatsappMsg)}
                            target="_blank"
                            rel="noreferrer"
                          >
                            WhatsApp
                            <ArrowRight size={18} />
                          </SecondaryWide>
                        </CtaRow>

                        <FinePrint>{s.finePrint}</FinePrint>
                      </CtaCard>
                    </Packs>
                  </Content>
                </Reveal>
              </Grid>
            </Wrap>
          </Section>
        ))}
      </Main>
      <StickyCtaButton message="Hola, quiero una propuesta de automatización integral. ¿Podemos agendar una visita?" />
    </Page>
  );
}
