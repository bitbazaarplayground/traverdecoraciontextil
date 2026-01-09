// src/pages/Propuestas.jsx
import { Link } from "react-router-dom";
import styled from "styled-components";

/* =========================
   QUICK ASSETS (placeholders)
   Replace later with your real photography
========================= */
const imgHero =
  "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=2400&q=80";
const imgComfort =
  "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=2000&q=80";
const imgBalance =
  "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=2000&q=80";
const imgEssential =
  "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=2000&q=80";

const imgCortinas =
  "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=2000&q=80";
const imgToldos =
  "https://images.unsplash.com/photo-1523413651479-597eb2da0ad6?auto=format&fit=crop&w=2000&q=80";
const imgAuto =
  "https://images.unsplash.com/photo-1505691723518-36a5ac3b2f33?auto=format&fit=crop&w=2000&q=80";

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
  font-size: 2.35rem;
  font-weight: 650;
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

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.05),
      rgba(0, 0, 0, 0.55)
    );
  }
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
   CATEGORY STRIP (3 tiles)
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
  font-size: 2.35rem;
  font-weight: 650;
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
  gap: 1.2rem;

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
  filter: saturate(0.95) contrast(1.05);
  transform: scale(1.02);
`;

const TileOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(11, 12, 15, 0.15),
    rgba(11, 12, 15, 0.9)
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

/* =========================
   COMPONENT
========================= */

export default function Propuestas() {
  return (
    <Page>
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
            {/* ESSENTIAL */}
            <PackCard>
              <PackMedia style={{ backgroundImage: `url(${imgEssential})` }}>
                <PackBadge>Esencial</PackBadge>
              </PackMedia>
              <PackBody>
                <PackTitle>Mejora visible, sin complicaciones</PackTitle>
                <PackDesc>
                  Un salto inmediato en estética y confort. Ideal para empezar
                  con una estancia y sentir el cambio.
                </PackDesc>
                <TickList>
                  <Tick>Visita técnica y toma de medidas</Tick>
                  <Tick>Recomendación de tejidos/sistemas</Tick>
                  <Tick>Instalación limpia y precisa</Tick>
                  <Tick>Acabado profesional y ajuste final</Tick>
                </TickList>
              </PackBody>
              <PackFooter>
                <Note>Perfecto para: 1 estancia</Note>
                <PackCTA to="/contact">Quiero empezar</PackCTA>
              </PackFooter>
            </PackCard>

            {/* BALANCE */}
            <PackCard>
              <PackMedia style={{ backgroundImage: `url(${imgBalance})` }}>
                <PackBadge>Equilibrio perfecto</PackBadge>
              </PackMedia>
              <PackBody>
                <PackTitle>Diseño + funcionalidad, bien medidos</PackTitle>
                <PackDesc>
                  Para quienes quieren calidad y coherencia en todo el espacio,
                  con una elección guiada y sin ruido.
                </PackDesc>
                <TickList>
                  <Tick>Asesoramiento decorativo (armonía y caída)</Tick>
                  <Tick>Selección de materiales y sistemas</Tick>
                  <Tick>Opción de motorización (según producto)</Tick>
                  <Tick>Revisión final y puesta a punto</Tick>
                </TickList>
              </PackBody>
              <PackFooter>
                <Note>Perfecto para: salón + dormitorio</Note>
                <PackCTA to="/contact">Ver propuesta</PackCTA>
              </PackFooter>
            </PackCard>

            {/* COMFORT */}
            <PackCard>
              <PackMedia style={{ backgroundImage: `url(${imgComfort})` }}>
                <PackBadge>Comfort total</PackBadge>
              </PackMedia>
              <PackBody>
                <PackTitle>La experiencia completa, sin concesiones</PackTitle>
                <PackDesc>
                  Para hogares exigentes: integración discreta, automatización y
                  un acabado que parece de obra… pero es precisión.
                </PackDesc>
                <TickList>
                  <Tick>Visita técnica + asesoramiento decorativo</Tick>
                  <Tick>Sistemas motorizados de alta gama</Tick>
                  <Tick>Control por app / escenas (según solución)</Tick>
                  <Tick>Mantenimiento y soporte prioritario</Tick>
                </TickList>
              </PackBody>
              <PackFooter>
                <Note>Perfecto para: vivienda completa</Note>
                <PackCTA to="/contact">Asesoramiento</PackCTA>
              </PackFooter>
            </PackCard>
          </PacksGrid>
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
            <Tile to="/cortinas-estores" aria-label="Ir a Cortinas y Estores">
              <TileBg style={{ backgroundImage: `url(${imgCortinas})` }} />
              <TileOverlay />
              <TileBody>
                <TileTitle>Cortinas & Estores</TileTitle>
                <TileText>
                  Texturas, caída y luz. El cambio más inmediato en cómo se
                  siente una casa.
                </TileText>
              </TileBody>
            </Tile>

            <Tile
              to="/toldos-proteccionsolar"
              aria-label="Ir a Toldos y Protección Solar"
            >
              <TileBg style={{ backgroundImage: `url(${imgToldos})` }} />
              <TileOverlay />
              <TileBody>
                <TileTitle>Toldos & Protección solar</TileTitle>
                <TileText>
                  Sombra, temperatura y uso real del exterior. Con instalación
                  sólida y discreta.
                </TileText>
              </TileBody>
            </Tile>

            <Tile to="/automatizacion" aria-label="Ir a Automatización">
              <TileBg style={{ backgroundImage: `url(${imgAuto})` }} />
              <TileOverlay />
              <TileBody>
                <TileTitle>Automatización Somfy</TileTitle>
                <TileText>
                  Cuando el confort se anticipa. Control fino sin perder el
                  mando.
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
    </Page>
  );
}
