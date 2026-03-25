// src/pages/Propuestas.jsx
import { useMemo } from "react";
import { Helmet } from "react-helmet-async";
import styled from "styled-components";
import FaqAccordion from "../components/faq/FaqAccordion";
import ServiceHero from "../components/heroes/ServiceHero";
import { CONTACT } from "../config/contact";
import { trackCtaClick, trackOpenQuickEnquiry } from "../lib/analytics";
import StickyCtaButton from "../mobile/StickyCtaButton";

/* =========================
   RESPONSIVE ASSETS
========================= */

// Packs
import imgEssential1200 from "../assets/propuestas/dormitorioMain-1200.webp";
import imgEssential400 from "../assets/propuestas/dormitorioMain-400.webp";
import imgEssential600 from "../assets/propuestas/dormitorioMain-600.webp";
import imgEssential700 from "../assets/propuestas/dormitorioMain-700.webp";
import imgEssential800 from "../assets/propuestas/dormitorioMain-800.webp";

import imgBalance1200 from "../assets/propuestas/salonComedor-1200.webp";
import imgBalance400 from "../assets/propuestas/salonComedor-400.webp";
import imgBalance600 from "../assets/propuestas/salonComedor-600.webp";
import imgBalance700 from "../assets/propuestas/salonComedor-700.webp";
import imgBalance800 from "../assets/propuestas/salonComedor-800.webp";

import imgFuncionaSola1200 from "../assets/propuestas/smartLivingRoom-1200.webp";
import imgFuncionaSola400 from "../assets/propuestas/smartLivingRoom-400.webp";
import imgFuncionaSola600 from "../assets/propuestas/smartLivingRoom-600.webp";
import imgFuncionaSola800 from "../assets/propuestas/smartLivingRoom-800.webp";

// Hero
const hero_480 = "/propuestas/propuestaHero-480.webp";
const hero_768 = "/propuestas/propuestaHero-768.webp";
const hero_1280 = "/propuestas/propuestaHero-1280.webp";
const hero_1920 = "/propuestas/propuestaHero-1920.webp";

// Tiles
import imgBano1200 from "../assets/propuestas/bathroomMain-1200.webp";
import imgBano400 from "../assets/propuestas/bathroomMain-400.webp";
import imgBano600 from "../assets/propuestas/bathroomMain-600.webp";
import imgBano800 from "../assets/propuestas/bathroomMain-800.webp";

import imgDormitorio1200 from "../assets/propuestas/bedroomMain-1200.webp";
import imgDormitorio400 from "../assets/propuestas/bedroomMain-400.webp";
import imgDormitorio600 from "../assets/propuestas/bedroomMain-600.webp";
import imgDormitorio800 from "../assets/propuestas/bedroomMain-800.webp";

import imgCocina1200 from "../assets/propuestas/cocinaMain-1200.webp";
import imgCocina400 from "../assets/propuestas/cocinaMain-400.webp";
import imgCocina600 from "../assets/propuestas/cocinaMain-600.webp";
import imgCocina800 from "../assets/propuestas/cocinaMain-800.webp";

import imgInfantil1200 from "../assets/propuestas/infantilMain-1200.webp";
import imgInfantil400 from "../assets/propuestas/infantilMain-400.webp";
import imgInfantil600 from "../assets/propuestas/infantilMain-600.webp";
import imgInfantil800 from "../assets/propuestas/infantilMain-800.webp";

import imgSalon1200 from "../assets/propuestas/livingroomMain-1200.webp";
import imgSalon400 from "../assets/propuestas/livingroomMain-400.webp";
import imgSalon600 from "../assets/propuestas/livingroomMain-600.webp";
import imgSalon800 from "../assets/propuestas/livingroomMain-800.webp";

import imgToldos1200 from "../assets/propuestas/terrazaMain-1200.webp";
import imgToldos400 from "../assets/propuestas/terrazaMain-400.webp";
import imgToldos600 from "../assets/propuestas/terrazaMain-600.webp";
import imgToldos800 from "../assets/propuestas/terrazaMain-800.webp";

/* =========================
   IMAGE HELPERS
========================= */

const CARD_IMAGE_SIZES =
  "(min-width: 1120px) 357px, (min-width: 980px) calc((100vw - 5rem) / 3), calc(100vw - 3rem)";

const getSrcSet = (img400, img600, img700, img800, img1200) =>
  [
    img400 && `${img400} 400w`,
    img600 && `${img600} 600w`,
    img700 && `${img700} 700w`,
    img800 && `${img800} 800w`,
    img1200 && `${img1200} 1200w`,
  ]
    .filter(Boolean)
    .join(", ");

/* =========================
   PAGE
========================= */

const Page = styled.main`
  width: 100%;
  background: #0b0c0f;
  color: #f4f4f5;
`;

/* =========================
   HERO- ServiceHero.jsx
========================= */

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
  position: relative;
  overflow: hidden;
  background: #ececec;
  aspect-ratio: 16 / 9;
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

const TrustCTA = styled.button`
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
  border: 0;
  cursor: pointer;

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
    q: "¿Qué incluye exactamente una visita técnica?",
    a: "Revisamos el espacio, tomamos medidas, valoramos luz, privacidad, uso diario y estilo, y te orientamos sobre tejidos, sistemas y acabados para proponerte una solución realista.",
    aText:
      "Revisamos el espacio, tomamos medidas, valoramos luz, privacidad, uso diario y estilo, y te orientamos sobre tejidos, sistemas y acabados para proponerte una solución realista.",
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
  {
    q: "¿Esto son precios cerrados?",
    a: "No. Son propuestas orientativas para decidir el enfoque. Cada vivienda cambia por medidas, tejidos, sistemas y acabados. Te damos una propuesta ajustada tras la visita técnica.",
    aText:
      "No. Son propuestas orientativas para decidir el enfoque. Cada vivienda cambia por medidas, tejidos, sistemas y acabados. Te damos una propuesta ajustada tras la visita técnica.",
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
    alt: "Propuesta de dormitorio a medida con cortinas, textiles y ambiente de descanso",
    img400: imgEssential400,
    img600: imgEssential600,
    img700: imgEssential700,
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
    alt: "Propuesta de salón y comedor a medida con cortinas, alfombra y soluciones decorativas coordinadas",
    img400: imgBalance400,
    img600: imgBalance600,
    img700: imgBalance700,
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
    desc: "Integración de cortinas, estores y toldos motorizados con escenas, control y automatización pensada para mejorar luz, privacidad y confort diario sin esfuerzo.",
    note: "Ideal para vivienda completa o zonas clave · precio orientativo según alcance",
    alt: "Propuesta de automatización con cortinas, estores y toldos motorizados en salón",
    img400: imgFuncionaSola400,
    img600: imgFuncionaSola600,
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
    alt: "Dormitorio con solución textil a medida para luz y privacidad",
    img400: imgDormitorio400,
    img600: imgDormitorio600,
    img800: imgDormitorio800,
    img1200: imgDormitorio1200,
  },
  {
    title: "Salón",
    text: "Luz, textura y coherencia estética. Donde más se vive la casa.",
    alt: "Salón con cortinas y soluciones decorativas para control de luz",
    img400: imgSalon400,
    img600: imgSalon600,
    img800: imgSalon800,
    img1200: imgSalon1200,
  },
  {
    title: "Cocina",
    text: "Screen, estores y soluciones fáciles de mantener para el día a día.",
    alt: "Cocina con estores o screen pensados para el uso diario",
    img400: imgCocina400,
    img600: imgCocina600,
    img800: imgCocina800,
    img1200: imgCocina1200,
  },
  {
    title: "Baño",
    text: "Privacidad sin perder luz. Materiales pensados para humedad.",
    alt: "Baño con solución de privacidad y entrada de luz",
    img400: imgBano400,
    img600: imgBano600,
    img800: imgBano800,
    img1200: imgBano1200,
  },
  {
    title: "Infantil / Juvenil",
    text: "Oscuridad, seguridad y tejidos resistentes. Fácil de vivir.",
    alt: "Habitación infantil o juvenil con textiles resistentes y control de luz",
    img400: imgInfantil400,
    img600: imgInfantil600,
    img800: imgInfantil800,
    img1200: imgInfantil1200,
  },
  {
    title: "Exterior",
    text: "Sombra, temperatura y uso real de terraza o balcón.",
    alt: "Terraza o balcón con solución de toldo y protección solar",
    img400: imgToldos400,
    img600: imgToldos600,
    img800: imgToldos800,
    img1200: imgToldos1200,
  },
];

/* =========================
   COMPONENT
========================= */

export default function Propuestas({ onOpenAsesoramiento }) {
  const baseUrl = "https://www.traverdecoraciontextil.es";
  const canonical = `${baseUrl}/propuestas`;
  const siteName = CONTACT.siteName || "Traver Decoración Textil";

  const title =
    "Propuestas a medida de cortinas, toldos y automatización en Castellón y Valencia";
  const description =
    "Explora propuestas a medida para dormitorio, salón/comedor y confort con automatización. Cortinas, toldos, tejidos y sistemas con asesoramiento, medición e instalación profesional en Castellón y Valencia.";
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

  const jsonLd = useMemo(() => {
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

    const breadcrumbJsonLd = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "@id": `${canonical}#breadcrumb`,
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
          name: "Propuestas",
          item: canonical,
        },
      ],
    };

    return [collectionPageJsonLd, breadcrumbJsonLd];
  }, [baseUrl, canonical, description, ogImage, packItems, siteName, title]);

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
        eyebrow="Soluciones · Traver Decoración Textil"
        title={
          <>
            Elige tu punto de <span>entrada</span>.
            <br />
            Nosotros hacemos el resto.
          </>
        }
        subtitle="Tres propuestas claras para empezar con seguridad. Desde un primer paso con impacto hasta una experiencia completa de confort, automatización y acabado impecable."
        hero480={hero_480}
        hero768={hero_768}
        hero1280={hero_1280}
        hero1920={hero_1920}
        primaryLabel="Solicitar propuesta"
        primaryTrackSource="propuestas_primary"
        primaryPack="Propuestas"
        primaryCtaName="solicitar_propuesta"
        secondaryLabel="Ver propuestas"
        secondaryHref="#propuestas"
        onOpenAsesoramiento={onOpenAsesoramiento}
      />

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
                    src={pack.img600 || pack.img800 || pack.img1200}
                    srcSet={getSrcSet(
                      pack.img400,
                      pack.img600,
                      pack.img700,
                      pack.img800,
                      pack.img1200
                    )}
                    sizes={CARD_IMAGE_SIZES}
                    alt={pack.alt}
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
                      trackCtaClick(pack.source, "solicitar_propuesta");
                      trackOpenQuickEnquiry(pack.source, pack.packValue);

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
                  src={tile.img600}
                  srcSet={getSrcSet(
                    tile.img400,
                    tile.img600,
                    null,
                    tile.img800,
                    tile.img1200
                  )}
                  sizes={CARD_IMAGE_SIZES}
                  alt={tile.alt}
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
              type="button"
              onClick={() => {
                trackCtaClick("propuestas_trust_cta", "hablar_con_un_asesor");
                trackOpenQuickEnquiry("propuestas_trust_cta", "Propuestas");

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
