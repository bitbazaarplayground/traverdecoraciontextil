// src/pages/Propuestas.jsx
import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import styled from "styled-components";
import AsesoramientoForm from "../components/AsesoramientoForm";
import AsesoramientoModal from "../components/AsesoramientoModal";
import { CONTACT } from "../config/contact";

/* =========================
   QUICK ASSETS (placeholders)
========================= */
import imgEssential from "../assets/propuestas/dormitorioMain.png";
import imgBalance from "../assets/propuestas/salonComedor.png";

const imgHero =
  "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=2400&q=80";

// Tiles
import imgBano from "../assets/propuestas/bathroomMain.png";
import imgDormitorio from "../assets/propuestas/bedroomMain.png";
import imgCocina from "../assets/propuestas/cocinaMain.png";
import imgInfantil from "../assets/propuestas/infantilMain.png";
import imgSalon from "../assets/propuestas/livingroomMain.png";
import imgFuncionaSola from "../assets/propuestas/smartLivingRoom.png";
import imgToldos from "../assets/propuestas/terrazaMain.png";

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

const HeroBg = styled.div`
  position: absolute;
  inset: 0;
  background-image: url(${imgHero});
  background-size: cover;
  background-position: center;
  filter: saturate(0.95) contrast(1.05);
  transform: scale(1.03);
  z-index: 0;
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

  &:hover {
    opacity: 0.92;
    transform: translateY(-1px);
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

  &:hover {
    background: rgba(255, 255, 255, 0.09);
    transform: translateY(-1px);
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

/* =========================
   PACKS GRID (premium cards)
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
  transform: translateY(0);
  transition: transform 0.25s ease, box-shadow 0.25s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 40px 110px rgba(0, 0, 0, 0.12);
  }
`;

const PackMedia = styled.div`
  height: 210px;
  background-size: cover;
  background-position: center;
  position: relative;
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
`;

const Note = styled.p`
  margin: 0;
  font-size: 0.88rem;
  color: rgba(17, 17, 17, 0.55);
`;

const PackCTA = styled(Link)`
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

  &:hover {
    background: rgba(17, 17, 17, 0.09);
    transform: translateY(-1px);
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

const Tile = styled(Link)`
  text-decoration: none;
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

  &:hover {
    transform: translateY(-4px);
    background: rgba(255, 255, 255, 0.06);
  }
`;

const TileBg = styled.div`
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  transform: scale(1.02);
`;

const TileOverlay = styled.div`
  position: absolute;
  inset: 0;
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
  color: rgba(244, 244, 245, 0.72);
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

  &:hover {
    opacity: 0.92;
    transform: translateY(-1px);
  }
`;

/* =========================
   FAQ (simple, premium)
========================= */

const FAQGrid = styled.div`
  margin-top: 2.6rem;
  display: grid;
  gap: 1rem;

  @media (min-width: 980px) {
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
`;

const FAQItem = styled.details`
  border-radius: 18px;
  background: #fff;
  border: 1px solid rgba(17, 17, 17, 0.08);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.06);
  padding: 1.1rem 1.2rem;
  overflow: hidden;

  &[open] summary {
    color: #111;
  }

  &[open] summary::after {
    transform: rotate(45deg);
  }
`;

const FAQSummary = styled.summary`
  list-style: none;
  cursor: pointer;
  font-weight: 750;
  color: rgba(17, 17, 17, 0.9);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;

  &::-webkit-details-marker {
    display: none;
  }

  &::after {
    content: "+";
    font-size: 1.25rem;
    line-height: 1;
    color: rgba(17, 17, 17, 0.6);
    transition: transform 0.2s ease;
  }
`;

const FAQBody = styled.p`
  margin: 0.85rem 0 0 0;
  color: rgba(17, 17, 17, 0.68);
  line-height: 1.7;
  font-size: 0.98rem;
`;

const InlineFormWrap = styled.div`
  margin-top: 0.9rem;
  padding: 1rem 1rem 1.15rem;
  border-radius: 18px;
  background: rgba(17, 17, 17, 0.02);
  border: 1px solid rgba(17, 17, 17, 0.08);
`;

const ContextPill = styled.div`
  margin-bottom: 0.75rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;

  padding: 0.45rem 0.75rem;
  border-radius: 999px;

  background: rgba(17, 17, 17, 0.05);
  border: 1px solid rgba(17, 17, 17, 0.08);

  font-size: 0.85rem;
  color: rgba(17, 17, 17, 0.7);

  strong {
    color: rgba(17, 17, 17, 0.9);
    font-weight: 800;
  }
`;

/* =========================
   COMPONENT
========================= */

export default function Propuestas() {
  // SEO base
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

  const [openPack, setOpenPack] = useState(null); // "dormitorio" | "salon" | "automatizacion" | null
  const [modalPack, setModalPack] = useState(null); // string | null

  const packLabel =
    openPack === "dormitorio"
      ? "Dormitorio"
      : openPack === "salon"
      ? "Salón / Comedor"
      : openPack === "automatizacion"
      ? "Confort + Automatización"
      : null;

  // JSON-LD: CollectionPage + ItemList (proposal options)
  const packItems = useMemo(
    () => [
      {
        name: "Descanso bien resuelto (Dormitorio)",
        url: `${baseUrl}/propuestas#propuestas`,
      },
      {
        name: "Espacio que se vive (Salón / Comedor)",
        url: `${baseUrl}/propuestas#propuestas`,
      },
      {
        name: "La casa funciona sola (Confort + Automatización)",
        url: `${baseUrl}/propuestas#propuestas`,
      },
    ],
    [baseUrl]
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

        {/* JSON-LD */}
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      {/* HERO */}
      <Hero>
        <HeroBg />
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
            <PrimaryButton to="/contact">Solicitar propuesta</PrimaryButton>
            <SecondaryButton href="#propuestas">Ver propuestas</SecondaryButton>
          </HeroActions>

          <MicroLine>
            +30 años de oficio. Asesoramiento real, instalación precisa y un
            resultado que se nota todos los días.
          </MicroLine>
        </HeroInner>
      </Hero>

      {/* PROPOSALS */}
      <LightSection id="propuestas">
        <LightInner>
          <CenterHeader>
            <H2>Propuestas pensadas para decidir rápido</H2>
            <Lead>
              No son “packs cerrados”. Son puntos de partida. Ajustamos tejidos,
              sistemas y acabados a tu espacio y a tu forma de vivir.
            </Lead>
          </CenterHeader>

          <PacksGrid>
            {/* DORMITORIO */}
            <PackCard>
              <PackMedia style={{ backgroundImage: `url(${imgEssential})` }}>
                <PackBadge>Dormitorio</PackBadge>
              </PackMedia>
              <PackBody>
                <PackTitle>Descanso bien resuelto</PackTitle>
                <PackPrice>
                  <span>Desde</span>499€
                </PackPrice>
                <PackDesc>
                  Un dormitorio donde todo encaja: luz, textura y descanso.
                  Diseñamos un ambiente sereno y funcional, pensado para dormir
                  mejor y disfrutarlo cada día.
                </PackDesc>
                <TickList>
                  <Tick>Visita técnica y toma de medidas</Tick>
                  <Tick>Cortinas o estor a medida</Tick>
                  <Tick>Papel pintado para pared principal</Tick>
                  <Tick>Cabecero o solución textil coordinada</Tick>
                  <Tick>Opción de colchón según necesidades</Tick>
                  <Tick>Instalación profesional y ajuste final</Tick>
                </TickList>
              </PackBody>
              <PackFooter>
                <Note>Perfecto para: dormitorio principal o juvenil</Note>
                <PackCTA
                  as="button"
                  type="button"
                  onClick={() => setModalPack("Dormitorio")}
                >
                  Solicitar propuesta
                </PackCTA>
              </PackFooter>
              {openPack === "dormitorio" && (
                <InlineFormWrap>
                  <ContextPill>
                    Solicitud: <strong>Dormitorio</strong>
                  </ContextPill>

                  <AsesoramientoForm
                    packLabel="Dormitorio"
                    onSuccess={() => setTimeout(() => setOpenPack(null), 1200)}
                  />
                </InlineFormWrap>
              )}
            </PackCard>

            {/* SALÓN / COMEDOR */}
            <PackCard>
              <PackMedia style={{ backgroundImage: `url(${imgBalance})` }}>
                <PackBadge>Salón / Comedor</PackBadge>
              </PackMedia>
              <PackBody>
                <PackTitle>Espacio que se vive</PackTitle>
                <PackPrice>
                  <span>Desde</span>799€
                </PackPrice>
                <PackDesc>
                  El corazón de la casa merece equilibrio entre estética y uso
                  real. Creamos un conjunto coherente que mejora la luz, el
                  confort térmico y la sensación de hogar.
                </PackDesc>
                <TickList>
                  <Tick>Asesoramiento decorativo global</Tick>
                  <Tick>Cortinas y/o estores a medida</Tick>
                  <Tick>Papel pintado para pared focal</Tick>
                  <Tick>Alfombra decorativa coordinada</Tick>
                  <Tick>Sistemas de control solar según orientación</Tick>
                  <Tick>Instalación limpia y precisa</Tick>
                </TickList>
              </PackBody>
              <PackFooter>
                <Note>Perfecto para: salón y comedor integrados</Note>
                <PackCTA
                  as="button"
                  type="button"
                  onClick={() => setModalPack("Salón / Comedor")}
                >
                  Ver propuesta
                </PackCTA>
              </PackFooter>
              {openPack === "salon" && (
                <InlineFormWrap>
                  <ContextPill>
                    Solicitud: <strong>Salón / Comedor</strong>
                  </ContextPill>

                  <AsesoramientoForm
                    packLabel="Salón / Comedor"
                    onSuccess={() => setTimeout(() => setOpenPack(null), 1200)}
                  />
                </InlineFormWrap>
              )}
            </PackCard>

            {/* CONFORT + AUTOMATIZACIÓN */}
            <PackCard>
              <PackMedia style={{ backgroundImage: `url(${imgFuncionaSola})` }}>
                <PackBadge>Confort + Automatización</PackBadge>
              </PackMedia>
              <PackBody>
                <PackTitle>La casa funciona sola</PackTitle>
                <PackPrice>
                  <span>Desde</span>1.490€
                </PackPrice>
                <PackDesc>
                  Confort sin esfuerzo. Integración discreta y tecnología que se
                  adapta a tu ritmo, no al revés. Una experiencia completa de
                  control, luz y privacidad.
                </PackDesc>
                <TickList>
                  <Tick>Estudio técnico y asesoramiento completo</Tick>
                  <Tick>Cortinas y estores motorizados</Tick>
                  <Tick>Toldos motorizados (si aplica)</Tick>
                  <Tick>Automatización Somfy y escenas personalizadas</Tick>
                  <Tick>Control por app, mando o programaciones</Tick>
                  <Tick>Puesta en marcha y soporte post-instalación</Tick>
                </TickList>
              </PackBody>
              <PackFooter>
                <Note>Perfecto para: vivienda completa o reforma integral</Note>
                <PackCTA
                  as="button"
                  type="button"
                  onClick={() => setModalPack("Confort + Automatización")}
                >
                  Asesoramiento
                </PackCTA>
              </PackFooter>
              {openPack === "automatizacion" && (
                <InlineFormWrap>
                  <ContextPill>
                    Solicitud: <strong>Confort + Automatización</strong>
                  </ContextPill>

                  <AsesoramientoForm
                    packLabel="Confort + Automatización"
                    onSuccess={() => setTimeout(() => setOpenPack(null), 1200)}
                  />
                </InlineFormWrap>
              )}
            </PackCard>
          </PacksGrid>
          <AdjustNote>
            Se puede ajustar: estas propuestas son un punto de partida.
            Adaptamos medidas, tejidos, sistemas y acabados según tu espacio,
            disponibilidad y presupuesto.
          </AdjustNote>
        </LightInner>
      </LightSection>

      {/* CATEGORIES */}
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
            <Tile to="/cortinas-estores" aria-label="Dormitorio">
              <TileBg style={{ backgroundImage: `url(${imgDormitorio})` }} />
              <TileOverlay />
              <TileBody>
                <TileTitle>Dormitorio</TileTitle>
                <TileText>
                  Privacidad, descanso y caída perfecta. La mejora más
                  inmediata.
                </TileText>
              </TileBody>
            </Tile>

            <Tile to="/cortinas-estores" aria-label="Salón">
              <TileBg style={{ backgroundImage: `url(${imgSalon})` }} />
              <TileOverlay />
              <TileBody>
                <TileTitle>Salón</TileTitle>
                <TileText>
                  Luz, textura y coherencia estética. Donde más se vive la casa.
                </TileText>
              </TileBody>
            </Tile>

            <Tile to="/cortinas-estores" aria-label="Cocina">
              <TileBg style={{ backgroundImage: `url(${imgCocina})` }} />
              <TileOverlay />
              <TileBody>
                <TileTitle>Cocina</TileTitle>
                <TileText>
                  Screen, estores y soluciones fáciles de mantener para el día a
                  día.
                </TileText>
              </TileBody>
            </Tile>

            <Tile to="/cortinas-estores" aria-label="Baño">
              <TileBg style={{ backgroundImage: `url(${imgBano})` }} />
              <TileOverlay />
              <TileBody>
                <TileTitle>Baño</TileTitle>
                <TileText>
                  Privacidad sin perder luz. Materiales pensados para humedad.
                </TileText>
              </TileBody>
            </Tile>

            <Tile to="/cortinas-estores" aria-label="Habitación infantil">
              <TileBg style={{ backgroundImage: `url(${imgInfantil})` }} />
              <TileOverlay />
              <TileBody>
                <TileTitle>Infantil / Juvenil</TileTitle>
                <TileText>
                  Oscuridad, seguridad y tejidos resistentes. Fácil de vivir.
                </TileText>
              </TileBody>
            </Tile>

            <Tile to="/toldos-proteccionsolar" aria-label="Exterior">
              <TileBg style={{ backgroundImage: `url(${imgToldos})` }} />
              <TileOverlay />
              <TileBody>
                <TileTitle>Exterior</TileTitle>
                <TileText>
                  Sombra, temperatura y uso real de terraza o balcón.
                </TileText>
              </TileBody>
            </Tile>
          </Tiles>

          <TrustStrip>
            <TrustText>
              Trabajamos proyectos desde Castellón para viviendas y negocios en
              la provincia y alrededores. Si quieres, te orientamos en 10
              minutos y te decimos el mejor punto de partida.
            </TrustText>
            <TrustCTA to="/contact">Hablar con un asesor</TrustCTA>
          </TrustStrip>
        </DarkInner>
      </DarkSection>

      {/* FAQ */}
      <LightSection>
        <LightInner>
          <CenterHeader>
            <H2>Preguntas rápidas</H2>
            <Lead>
              Claridad sin letra pequeña. Si tienes un caso especial, te
              respondemos con honestidad.
            </Lead>
          </CenterHeader>

          <FAQGrid>
            <FAQItem>
              <FAQSummary>¿Esto son precios cerrados?</FAQSummary>
              <FAQBody>
                No. Son propuestas orientativas para decidir el enfoque. Cada
                vivienda cambia por medidas, tejidos, sistemas y acabados. Te
                damos una propuesta ajustada tras la visita técnica.
              </FAQBody>
            </FAQItem>

            <FAQItem>
              <FAQSummary>¿Puedo empezar por una sola estancia?</FAQSummary>
              <FAQBody>
                Sí, y es una forma excelente de comprobar el resultado. Mucha
                gente empieza por salón o dormitorio y luego unifica el resto
                con la misma línea estética.
              </FAQBody>
            </FAQItem>

            <FAQItem>
              <FAQSummary>¿La automatización es solo “domótica”?</FAQSummary>
              <FAQBody>
                No. Es confort y protección: controlar luz, sombra y privacidad
                sin esfuerzo. Si quieres, lo dejamos automático; si prefieres,
                lo controlas tú desde mando, app o escenas.
              </FAQBody>
            </FAQItem>

            <FAQItem>
              <FAQSummary>¿En qué zonas trabajáis?</FAQSummary>
              <FAQBody>
                Principalmente Castellón y alrededores, y proyectos
                seleccionados en Valencia según alcance. Cuéntanos tu ubicación
                y te diremos disponibilidad real.
              </FAQBody>
            </FAQItem>
          </FAQGrid>
        </LightInner>
      </LightSection>

      <AsesoramientoModal
        open={!!modalPack}
        packLabel={modalPack}
        onClose={() => setModalPack(null)}
      />
    </Page>
  );
}
