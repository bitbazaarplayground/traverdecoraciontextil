// src/pages/Propuestas.jsx
import { useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import styled from "styled-components";
import FaqAccordion from "../components/faq/FaqAccordion";
import { CONTACT } from "../config/contact";
import { trackEvent } from "../lib/analytics";
import StickyCtaButton from "../mobile/StickyCtaButton";

/* =========================
   RESPONSIVE ASSETS
========================= */

// Packs
import imgEssential1200 from "../assets/propuestas/dormitorioMain-1200.webp";
import imgEssential800 from "../assets/propuestas/dormitorioMain-800.webp";

import imgBalance1200 from "../assets/propuestas/salonComedor-1200.webp";
import imgBalance800 from "../assets/propuestas/salonComedor-800.webp";

import imgFuncionaSola1200 from "../assets/propuestas/smartLivingRoom-1200.webp";
import imgFuncionaSola800 from "../assets/propuestas/smartLivingRoom-800.webp";

// Hero
const hero_768 = "/propuestas/propuestaHero-768.webp";
const hero_1280 = "/propuestas/propuestaHero-1280.webp";
const hero_1920 = "/propuestas/propuestaHero-1920.webp";

// Tiles
import imgBano1200 from "../assets/propuestas/bathroomMain-1200.webp";
import imgBano800 from "../assets/propuestas/bathroomMain-800.webp";

import imgDormitorio1200 from "../assets/propuestas/bedroomMain-1200.webp";
import imgDormitorio800 from "../assets/propuestas/bedroomMain-800.webp";

import imgCocina1200 from "../assets/propuestas/cocinaMain-1200.webp";
import imgCocina800 from "../assets/propuestas/cocinaMain-800.webp";

import imgInfantil1200 from "../assets/propuestas/infantilMain-1200.webp";
import imgInfantil800 from "../assets/propuestas/infantilMain-800.webp";

import imgSalon1200 from "../assets/propuestas/livingroomMain-1200.webp";
import imgSalon800 from "../assets/propuestas/livingroomMain-800.webp";

import imgToldos1200 from "../assets/propuestas/terrazaMain-1200.webp";
import imgToldos800 from "../assets/propuestas/terrazaMain-800.webp";

/* =========================
   IMAGE HELPERS
========================= */

const CARD_IMAGE_SIZES =
  "(min-width: 1120px) 360px, (min-width: 980px) 33vw, calc(100vw - 3rem)";

const getSrcSet = (img800, img1200) => `${img800} 800w, ${img1200} 1200w`;

/* =========================
   PAGE
========================= */

const Page = styled.main`
  width: 100%;
  background: #0b0c0f;
  color: #f4f4f5;
`;

/* =========================
   HERO
========================= */

const Hero = styled.section`
  position: relative;
  padding: 6.5rem 2rem 4.5rem;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 5.5rem 1.5rem 3.5rem;
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
  object-position: center;
  filter: saturate(0.95) contrast(1.05);
  transform: translateZ(0) scale(1.03);
  backface-visibility: hidden;
`;

const HeroOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: radial-gradient(
      1200px 700px at 50% 25%,
      rgba(0, 0, 0, 0.12),
      rgba(0, 0, 0, 0.72)
    ),
    linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.25) 0%,
      rgba(0, 0, 0, 0.88) 72%,
      rgba(11, 12, 15, 1) 100%
    );
  z-index: 1;
`;

const HeroInner = styled.div`
  position: relative;
  z-index: 2;
  max-width: 1120px;
  margin: 0 auto;
`;

const Eyebrow = styled.p`
  letter-spacing: 0.18em;
  text-transform: uppercase;
  font-size: 0.8rem;
  color: rgba(244, 244, 245, 0.72);
  margin: 0 0 0.9rem 0;
`;

const HeroTitle = styled.h1`
  font-size: 3.25rem;
  font-weight: 600;
  line-height: 1.05;
  margin: 0 0 1.1rem 0;

  span {
    color: ${({ theme }) => theme.colors.primary};
  }

  @media (max-width: 768px) {
    font-size: 2.35rem;
    line-height: 1.1;
  }
`;

const HeroSubtitle = styled.p`
  max-width: 62ch;
  font-size: 1.1rem;
  line-height: 1.75;
  color: rgba(244, 244, 245, 0.78);
  margin: 0;
`;

const HeroActions = styled.div`
  margin-top: 2rem;
  display: flex;
  align-items: center;
  gap: 0.9rem;
  flex-wrap: wrap;
`;

const PrimaryButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.95rem 2.25rem;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.primary};
  color: #0b0c0f;
  font-weight: 800;
  text-decoration: none;
  transition: transform 0.25s ease, opacity 0.25s ease;

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      opacity: 0.92;
      transform: translateY(-1px);
    }
  }
`;

const SecondaryButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.95rem 2.15rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: rgba(244, 244, 245, 0.92);
  font-weight: 650;
  text-decoration: none;
  transition: transform 0.25s ease, background 0.25s ease;

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      background: rgba(255, 255, 255, 0.09);
      transform: translateY(-1px);
    }
  }
`;

const MicroLine = styled.p`
  margin-top: 1.35rem;
  font-size: 0.95rem;
  line-height: 1.6;
  color: rgba(244, 244, 245, 0.6);
`;

/* =========================
   SECTION SHELL (light)
========================= */

const LightSection = styled.section`
  background: #ffffff;
  color: #111;
  padding: 5.5rem 2rem;

  @media (max-width: 768px) {
    padding: 4rem 1.5rem;
  }
`;

const LightInner = styled.div`
  max-width: 1120px;
  margin: 0 auto;
`;

const CenterHeader = styled.div`
  max-width: 820px;
  margin: 0 auto 3.2rem;
  text-align: center;
`;

const H2 = styled.h2`
  font-size: 2.2rem;
  font-weight: 600;
  color: #121212;
  margin: 0 0 0.8rem 0;

  span {
    color: ${({ theme }) => theme.colors.primary};
  }

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Lead = styled.p`
  font-size: 1.05rem;
  line-height: 1.75;
  color: rgba(17, 17, 17, 0.68);
  margin: 0;
`;

const SectionTop = styled.div`
  margin-bottom: 2.2rem;
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
  font-size: 2.2rem;
  font-weight: 600;
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
  max-width: 70ch;
`;

/* =========================
   SHARED MEDIA
========================= */

const MediaImage = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

/* =========================
   PACKS GRID
========================= */

const PacksGrid = styled.div`
  display: grid;
  gap: 1.6rem;

  @media (min-width: 980px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 1.2rem;
    align-items: stretch;
  }
`;

const PackCard = styled.article`
  border-radius: 22px;
  overflow: hidden;
  background: #fff;
  border: 1px solid rgba(17, 17, 17, 0.08);
  box-shadow: 0 30px 90px rgba(0, 0, 0, 0.08);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  display: flex;
  flex-direction: column;
  height: 100%;

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 40px 110px rgba(0, 0, 0, 0.12);
    }
  }
`;

const PackMedia = styled.div`
  height: 210px;
  position: relative;
  overflow: hidden;
  background: #ececec;
`;

const PackImage = styled(MediaImage)`
  transform: scale(1.01);
`;

const PackBadge = styled.div`
  position: absolute;
  top: 16px;
  left: 16px;
  z-index: 2;
  padding: 0.45rem 0.75rem;
  border-radius: 999px;
  font-size: 0.78rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  background: rgba(255, 255, 255, 0.88);
  color: rgba(17, 17, 17, 0.78);
`;

const PackBody = styled.div`
  padding: 1.6rem 1.5rem 1.5rem;
  flex: 1;
`;

const PackTitle = styled.h3`
  font-size: 1.35rem;
  font-weight: 700;
  color: #151515;
  margin: 0 0 0.55rem 0;
`;

const PackDesc = styled.p`
  font-size: 0.98rem;
  line-height: 1.65;
  color: rgba(17, 17, 17, 0.68);
  margin: 0 0 1.15rem 0;
`;

const PackPrice = styled.p`
  margin: 0 0 0.85rem 0;
  font-size: 1.05rem;
  font-weight: 800;
  letter-spacing: 0.01em;
  color: rgba(17, 17, 17, 0.92);

  span {
    font-weight: 650;
    font-size: 0.92rem;
    color: rgba(17, 17, 17, 0.55);
    margin-right: 0.35rem;
  }
`;

const AdjustNote = styled.p`
  margin: 1.35rem auto 0;
  max-width: 80ch;
  text-align: center;
  font-size: 0.98rem;
  line-height: 1.65;
  color: rgba(17, 17, 17, 0.62);
`;

const TickList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 0.6rem;
`;

const Tick = styled.li`
  display: grid;
  grid-template-columns: 16px 1fr;
  gap: 0.65rem;
  align-items: start;
  font-size: 0.95rem;
  line-height: 1.55;
  color: rgba(17, 17, 17, 0.78);

  &::before {
    content: "✓";
    font-weight: 900;
    color: ${({ theme }) => theme.colors.primary};
    line-height: 1.2;
  }
`;

const PackFooter = styled.div`
  padding: 1.15rem 1.5rem 1.6rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.8rem;
  border-top: 1px solid rgba(17, 17, 17, 0.08);
  margin-top: auto;
`;

const Note = styled.p`
  margin: 0;
  font-size: 0.88rem;
  color: rgba(17, 17, 17, 0.55);
`;

const PackCTA = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.72rem 1.2rem;
  border-radius: 999px;
  background: rgba(17, 17, 17, 0.06);
  border: 1px solid rgba(17, 17, 17, 0.08);
  color: rgba(17, 17, 17, 0.86);
  font-weight: 700;
  text-decoration: none;
  transition: transform 0.25s ease, background 0.25s ease;
  cursor: pointer;

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      background: rgba(17, 17, 17, 0.09);
      transform: translateY(-1px);
    }
  }
`;

/* =========================
   CATEGORY STRIP (tiles)
========================= */

const DarkSection = styled.section`
  background: #0b0c0f;
  color: #f4f4f5;
  padding: 5.5rem 2rem;

  @media (max-width: 768px) {
    padding: 4rem 1.5rem;
  }
`;

const DarkInner = styled.div`
  max-width: 1120px;
  margin: 0 auto;
`;

const DarkHeader = styled.div`
  max-width: 820px;
  margin: 0 auto 3rem;
  text-align: center;
`;

const H2Dark = styled.h2`
  font-size: 2.2rem;
  font-weight: 600;
  margin: 0 0 0.8rem 0;
`;

const LeadDark = styled.p`
  font-size: 1.05rem;
  line-height: 1.75;
  color: rgba(244, 244, 245, 0.72);
  margin: 0;
`;

const Tiles = styled.div`
  display: grid;
  gap: 1.1rem;

  @media (min-width: 980px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
  }
`;

const Tile = styled.article`
  color: inherit;
  border-radius: 22px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.04);
  position: relative;
  min-height: 280px;
  display: grid;
  align-content: end;
  transition: transform 0.25s ease, background 0.25s ease;

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      transform: translateY(-4px);
      background: rgba(255, 255, 255, 0.06);
    }
  }
`;

const TileImg = styled(MediaImage)`
  position: absolute;
  inset: 0;
  transform: scale(1.02);
`;

const TileOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.76) 0%,
    rgba(0, 0, 0, 0.28) 48%,
    rgba(0, 0, 0, 0.08) 100%
  );
`;

const TileBody = styled.div`
  position: relative;
  z-index: 2;
  padding: 1.4rem 1.35rem 1.35rem;
`;

const TileTitle = styled.h3`
  margin: 0 0 0.35rem 0;
  font-size: 1.3rem;
  font-weight: 750;
`;

const TileText = styled.p`
  margin: 0;
  font-size: 0.98rem;
  line-height: 1.6;
  color: rgba(244, 244, 245, 0.78);
`;

/* =========================
   TRUST STRIP + CTA
========================= */

const TrustStrip = styled.div`
  margin-top: 3rem;
  padding: 1.3rem 1.25rem;
  border-radius: 18px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.04);
  display: grid;
  gap: 0.75rem;

  @media (min-width: 900px) {
    grid-template-columns: 1.2fr 0.8fr;
    align-items: center;
  }
`;

const TrustText = styled.p`
  margin: 0;
  color: rgba(244, 244, 245, 0.75);
  line-height: 1.7;
`;

const TrustCTA = styled(Link)`
  justify-self: start;

  @media (min-width: 900px) {
    justify-self: end;
  }

  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.85rem 1.5rem;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.primary};
  color: #0b0c0f;
  font-weight: 850;
  text-decoration: none;
  transition: opacity 0.25s ease, transform 0.25s ease;

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      opacity: 0.92;
      transform: translateY(-1px);
    }
  }
`;

/* =========================
   FAQ
========================= */

const FAQ_ITEMS = [
  {
    q: "¿Esto son precios cerrados?",
    a: "No. Son propuestas orientativas para decidir el enfoque. Cada vivienda cambia por medidas, tejidos, sistemas y acabados. Te damos una propuesta ajustada tras la visita técnica.",
    aText:
      "No. Son propuestas orientativas para decidir el enfoque. Cada vivienda cambia por medidas, tejidos, sistemas y acabados. Te damos una propuesta ajustada tras la visita técnica.",
  },
  {
    q: "¿Puedo empezar por una sola estancia?",
    a: "Sí, y es una forma excelente de comprobar el resultado. Mucha gente empieza por salón o dormitorio y luego unifica el resto con la misma línea estética.",
    aText:
      "Sí, y es una forma excelente de comprobar el resultado. Mucha gente empieza por salón o dormitorio y luego unifica el resto con la misma línea estética.",
  },
  {
    q: "¿La automatización es solo “domótica”?",
    a: "No. Es confort y protección: controlar luz, sombra y privacidad sin esfuerzo. Si quieres, lo dejamos automático; si prefieres, lo controlas tú desde mando, app o escenas.",
    aText:
      "No. Es confort y protección: controlar luz, sombra y privacidad sin esfuerzo. Si quieres, lo dejamos automático; si prefieres, lo controlas tú desde mando, app o escenas.",
  },
  {
    q: "¿En qué zonas trabajáis?",
    a: "Principalmente Castellón y alrededores, y proyectos seleccionados en Valencia según alcance. Cuéntanos tu ubicación y te diremos disponibilidad real.",
    aText:
      "Principalmente Castellón y alrededores, y proyectos seleccionados en Valencia según alcance. Cuéntanos tu ubicación y te diremos disponibilidad real.",
  },
];

/* =========================
   DATA
========================= */

const PACKS = [
  {
    id: "pack-dormitorio",
    badge: "Dormitorio",
    title: "Descanso bien resuelto",
    price: "499€",
    desc: "Un dormitorio donde todo encaja: luz, textura y descanso. Diseñamos un ambiente sereno y funcional, pensado para dormir mejor y disfrutarlo cada día.",
    note: "Perfecto para: dormitorio principal o juvenil",
    img800: imgEssential800,
    img1200: imgEssential1200,
    packValue: "Dormitorio",
    source: "propuestas_pack_dormitorio",
    ticks: [
      "Visita técnica y toma de medidas",
      "Cortinas o estor a medida",
      "Papel pintado para pared principal",
      "Cabecero o solución textil coordinada",
      "Opción de colchón según necesidades",
      "Instalación profesional y ajuste final",
    ],
  },
  {
    id: "pack-salon",
    badge: "Salón / Comedor",
    title: "Espacio que se vive",
    price: "799€",
    desc: "El corazón de la casa merece equilibrio entre estética y uso real. Creamos un conjunto coherente que mejora la luz, el confort térmico y la sensación de hogar.",
    note: "Perfecto para: salón y comedor integrados",
    img800: imgBalance800,
    img1200: imgBalance1200,
    packValue: "Salón / Comedor",
    source: "propuestas_pack_salon",
    ticks: [
      "Asesoramiento decorativo global",
      "Cortinas y/o estores a medida",
      "Papel pintado para pared focal",
      "Alfombra decorativa coordinada",
      "Sistemas de control solar según orientación",
      "Instalación limpia y precisa",
    ],
  },
  {
    id: "pack-automatizacion",
    badge: "Confort + Automatización",
    title: "La casa funciona sola",
    price: "1.490€",
    desc: "Confort sin esfuerzo. Integración discreta y tecnología que se adapta a tu ritmo, no al revés. Una experiencia completa de control, luz y privacidad.",
    note: "Perfecto para: vivienda completa o reforma integral",
    img800: imgFuncionaSola800,
    img1200: imgFuncionaSola1200,
    packValue: "Confort + Automatización",
    source: "propuestas_pack_automatizacion",
    ticks: [
      "Estudio técnico y asesoramiento completo",
      "Cortinas y estores motorizados",
      "Toldos motorizados (si aplica)",
      "Automatización Somfy y escenas personalizadas",
      "Control por app, mando o programaciones",
      "Puesta en marcha y soporte post-instalación",
    ],
  },
];

const TILES = [
  {
    title: "Dormitorio",
    text: "Privacidad, descanso y caída perfecta. La mejora más inmediata.",
    img800: imgDormitorio800,
    img1200: imgDormitorio1200,
  },
  {
    title: "Salón",
    text: "Luz, textura y coherencia estética. Donde más se vive la casa.",
    img800: imgSalon800,
    img1200: imgSalon1200,
  },
  {
    title: "Cocina",
    text: "Screen, estores y soluciones fáciles de mantener para el día a día.",
    img800: imgCocina800,
    img1200: imgCocina1200,
  },
  {
    title: "Baño",
    text: "Privacidad sin perder luz. Materiales pensados para humedad.",
    img800: imgBano800,
    img1200: imgBano1200,
  },
  {
    title: "Infantil / Juvenil",
    text: "Oscuridad, seguridad y tejidos resistentes. Fácil de vivir.",
    img800: imgInfantil800,
    img1200: imgInfantil1200,
  },
  {
    title: "Exterior",
    text: "Sombra, temperatura y uso real de terraza o balcón.",
    img800: imgToldos800,
    img1200: imgToldos1200,
  },
];

/* =========================
   COMPONENT
========================= */

export default function Propuestas({ onOpenAsesoramiento }) {
  const baseUrl = (
    import.meta.env.VITE_SITE_URL || window.location.origin
  ).replace(/\/$/, "");
  const canonical = `${baseUrl}/propuestas`;
  const siteName = CONTACT.siteName || "Traver Decoración Textil";

  const title =
    "Propuestas a medida | Traver Decoración Textil en Castellón y Valencia";
  const description =
    "Elige una propuesta para empezar: dormitorio, salón/comedor o confort con automatización. Asesoramiento, medición e instalación profesional en Castellón y Valencia.";

  const ogImage = `${baseUrl}/og.png`;
  const ogImageAlt = "Propuestas a medida de Traver Decoración Textil";

  const packItems = useMemo(
    () => [
      {
        name: "Descanso bien resuelto (Dormitorio)",
        url: `${canonical}#pack-dormitorio`,
      },
      {
        name: "Espacio que se vive (Salón / Comedor)",
        url: `${canonical}#pack-salon`,
      },
      {
        name: "La casa funciona sola (Confort + Automatización)",
        url: `${canonical}#pack-automatizacion`,
      },
    ],
    [canonical]
  );

  const itemList = {
    "@type": "ItemList",
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    numberOfItems: packItems.length,
    itemListElement: packItems.map((p, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: p.name,
      url: p.url,
    })),
  };

  const collectionPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${canonical}#collectionpage`,
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
    about: { "@id": `${baseUrl}/#business` },
    mainEntity: itemList,
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: ogImage,
    },
  };

  const jsonLd = [collectionPageJsonLd];

  return (
    <Page>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href={canonical} />

        <link
          rel="preload"
          as="image"
          href={hero_1280}
          imageSrcSet={`${hero_768} 768w, ${hero_1280} 1280w, ${hero_1920} 1920w`}
          imageSizes="100vw"
          fetchPriority="high"
        />

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
        </HeroMedia>

        <HeroOverlay />

        <HeroInner>
          <Eyebrow>Soluciones · Traver Decoración Textil</Eyebrow>

          <HeroTitle>
            Elige tu punto de <span>entrada</span>.
            <br />
            Nosotros hacemos el resto.
          </HeroTitle>

          <HeroSubtitle>
            Tres propuestas claras para empezar con seguridad. Desde un primer
            paso con impacto hasta una experiencia completa de confort,
            automatización y acabado impecable.
          </HeroSubtitle>

          <HeroActions>
            <PrimaryButton
              to="/contact"
              onClick={(e) => {
                e.preventDefault();

                trackEvent("open_quick_enquiry", {
                  source: "propuestas_primary",
                  pack: "Propuestas",
                });

                onOpenAsesoramiento?.("Propuestas", "propuestas_primary");
              }}
            >
              Solicitar propuesta
            </PrimaryButton>

            <SecondaryButton href="#propuestas">Ver propuestas</SecondaryButton>
          </HeroActions>

          <MicroLine>
            +30 años de oficio. Asesoramiento real, instalación precisa y un
            resultado que se nota todos los días.
          </MicroLine>
        </HeroInner>
      </Hero>

      <LightSection id="propuestas">
        <LightInner>
          <CenterHeader>
            <H2>
              Propuestas pensadas para <span>decidir</span> rápido
            </H2>
            <Lead>
              No son “packs cerrados”. Son puntos de partida. Ajustamos tejidos,
              sistemas y acabados a tu espacio y a tu forma de vivir.
            </Lead>
          </CenterHeader>

          <PacksGrid>
            {PACKS.map((pack) => (
              <PackCard key={pack.id} id={pack.id}>
                <PackMedia>
                  <PackImage
                    src={pack.img1200}
                    srcSet={getSrcSet(pack.img800, pack.img1200)}
                    sizes={CARD_IMAGE_SIZES}
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                  <PackBadge>{pack.badge}</PackBadge>
                </PackMedia>

                <PackBody>
                  <PackTitle>{pack.title}</PackTitle>

                  <PackPrice>
                    <span>Desde</span>
                    {pack.price}
                  </PackPrice>

                  <PackDesc>{pack.desc}</PackDesc>

                  <TickList>
                    {pack.ticks.map((tick) => (
                      <Tick key={tick}>{tick}</Tick>
                    ))}
                  </TickList>
                </PackBody>

                <PackFooter>
                  <Note>{pack.note}</Note>

                  <PackCTA
                    type="button"
                    onClick={() => {
                      trackEvent("open_quick_enquiry", {
                        source: pack.source,
                        pack: pack.packValue,
                      });

                      onOpenAsesoramiento?.(pack.packValue, pack.source);
                    }}
                  >
                    Solicitar propuesta
                  </PackCTA>
                </PackFooter>
              </PackCard>
            ))}
          </PacksGrid>

          <AdjustNote>
            Se puede ajustar: estas propuestas son un punto de partida.
            Adaptamos medidas, tejidos, sistemas y acabados según tu espacio,
            disponibilidad y presupuesto.
          </AdjustNote>
        </LightInner>
      </LightSection>

      <DarkSection>
        <DarkInner>
          <DarkHeader>
            <H2Dark>¿Qué quieres mejorar primero?</H2Dark>
            <LeadDark>
              Elige una línea de trabajo. Nosotros unificamos estética, técnica
              y ejecución para que todo encaje.
            </LeadDark>
          </DarkHeader>

          <Tiles>
            {TILES.map((tile) => (
              <Tile key={tile.title}>
                <TileImg
                  src={tile.img1200}
                  srcSet={getSrcSet(tile.img800, tile.img1200)}
                  sizes={CARD_IMAGE_SIZES}
                  alt=""
                  loading="lazy"
                  decoding="async"
                />
                <TileOverlay />
                <TileBody>
                  <TileTitle>{tile.title}</TileTitle>
                  <TileText>{tile.text}</TileText>
                </TileBody>
              </Tile>
            ))}
          </Tiles>

          <TrustStrip>
            <TrustText>
              Trabajamos proyectos desde Castellón para viviendas y negocios en
              la provincia y alrededores. Si quieres, te orientamos en 10
              minutos y te decimos el mejor punto de partida.
            </TrustText>

            <TrustCTA
              to="/contact"
              onClick={(e) => {
                e.preventDefault();

                trackEvent("open_quick_enquiry", {
                  source: "propuestas_trust_cta",
                  pack: "Propuestas",
                });

                onOpenAsesoramiento?.("Propuestas", "propuestas_trust_cta");
              }}
            >
              Hablar con un asesor
            </TrustCTA>
          </TrustStrip>
        </DarkInner>
      </DarkSection>

      <LightSection>
        <LightInner>
          <SectionTop>
            <Kicker>FAQ</Kicker>
            <SectionTitle>
              Preguntas <span>rápidas</span>
            </SectionTitle>
            <SectionLead>
              Claridad sin letra pequeña. Si tienes un caso especial, te
              respondemos con honestidad.
            </SectionLead>
          </SectionTop>

          <FaqAccordion
            items={FAQ_ITEMS}
            withSchema={true}
            canonicalUrl={canonical}
            defaultOpenIndex={-1}
            ariaLabel="Preguntas frecuentes sobre propuestas"
          />
        </LightInner>
      </LightSection>

      <StickyCtaButton message="Hola, quiero una propuesta a medida. ¿Podemos concertar una visita para medir y definir tejidos, sistemas y acabados?" />
    </Page>
  );
}
