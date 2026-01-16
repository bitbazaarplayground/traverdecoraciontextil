import { Link } from "react-router-dom";
import styled from "styled-components";

/* IMAGES */
import bedroomDarkPanel from "../../assets/panelJapones/bedroomDarkPanel.png";
import bedroomStudyarea from "../../assets/panelJapones/bedroomStudyarea.png";
import kitchen1 from "../../assets/panelJapones/kitchen1.png";
import kitchen2 from "../../assets/panelJapones/kitchen2.png";
import livingroom from "../../assets/panelJapones/livingroom.png";
import livingroom1 from "../../assets/panelJapones/livingroom1.png";
import livingroom2 from "../../assets/panelJapones/livingroom2.png";
import office from "../../assets/panelJapones/office1.png";
import waitingroom from "../../assets/panelJapones/waitingroom1.png";

/* =========================
   PAGE
========================= */

const Page = styled.main`
  background: radial-gradient(
      1200px 600px at 50% 0%,
      rgba(255, 255, 255, 0.04),
      transparent 60%
    ),
    #f5f4f2;
  color: #1c1c1c;
`;

/* =========================
   HERO
========================= */

const Hero = styled.section`
  padding: clamp(4rem, 7vw, 6.5rem) 1.5rem 3rem;
  text-align: center;
`;

const HeroInner = styled.div`
  max-width: 920px;
  margin: 0 auto;
`;

const Eyebrow = styled.p`
  margin: 0 0 1rem;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  font-size: 0.75rem;
  color: rgba(0, 0, 0, 0.55);
`;

const Title = styled.h1`
  margin: 0;
  font-family: "Cormorant Garamond", ui-serif, Georgia, serif;
  font-weight: 300;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  font-size: clamp(2.2rem, 5vw, 4.4rem);
  line-height: 1.05;
`;

const Intro = styled.p`
  margin: 1.2rem auto 0;
  max-width: 70ch;
  font-size: 1.05rem;
  line-height: 1.75;
  color: rgba(0, 0, 0, 0.65);
`;

/* =========================
   GALLERY
========================= */

const Section = styled.section`
  padding: 2.5rem 1.5rem 5.5rem;
`;

const SectionInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Gallery = styled.div`
  display: grid;
  gap: 1.2rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1100px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const ImageCard = styled.div`
  position: relative;
  border-radius: 22px;
  overflow: hidden;
  background: #eae9e6;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  aspect-ratio: 4 / 3;
  transition: transform 0.6s ease;

  ${ImageCard}:hover & {
    transform: scale(1.04);
  }
`;

const Label = styled.div`
  position: absolute;
  left: 14px;
  bottom: 14px;
  padding: 0.45rem 0.75rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.88);
  font-size: 0.75rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(0, 0, 0, 0.7);
`;

/* =========================
   VALUE BLOCK
========================= */

const ValueSection = styled.section`
  padding: 0 1.5rem 5.5rem;
`;

const ValueCard = styled.div`
  max-width: 980px;
  margin: 0 auto;
  border-radius: 26px;
  background: rgba(255, 255, 255, 0.6);
  padding: 2.5rem 2.3rem;
  box-shadow: 0 32px 90px rgba(0, 0, 0, 0.08);
  text-align: center;
`;

const ValueTitle = styled.h2`
  margin: 0 0 1rem;
  font-family: "Cormorant Garamond", ui-serif, Georgia, serif;
  font-weight: 300;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  font-size: 2.2rem;
`;

const ValueText = styled.p`
  margin: 0 auto;
  max-width: 75ch;
  font-size: 1.05rem;
  line-height: 1.75;
  color: rgba(0, 0, 0, 0.65);
`;

const CTA = styled(Link)`
  display: inline-flex;
  margin-top: 2rem;
  padding: 0.95rem 2.1rem;
  border-radius: 999px;
  background: #111;
  color: #fff;
  text-decoration: none;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-size: 0.75rem;
  transition: transform 0.25s ease, opacity 0.25s ease;

  &:hover {
    transform: translateY(-1px);
    opacity: 0.92;
  }
`;

/* =========================
   COMPONENT
========================= */

export default function PanelJapones() {
  return (
    <Page>
      {/* HERO */}
      <Hero>
        <HeroInner>
          <Eyebrow>Interior · Soluciones arquitectónicas</Eyebrow>
          <Title>Panel japonés</Title>
          <Intro>
            Una solución limpia y elegante para grandes ventanales y espacios
            contemporáneos. Controla la luz, define el ambiente y aporta orden
            visual con líneas puras y tejidos seleccionados.
          </Intro>
        </HeroInner>
      </Hero>

      {/* GALLERY */}
      <Section>
        <SectionInner>
          <Gallery>
            <ImageCard>
              <Img src={livingroom} alt="Panel japonés en salón" />
              <Label>Salón</Label>
            </ImageCard>

            <ImageCard>
              <Img src={livingroom1} alt="Panel japonés en salón moderno" />
              <Label>Salón</Label>
            </ImageCard>

            <ImageCard>
              <Img
                src={livingroom2}
                alt="Panel japonés con vistas exteriores"
              />
              <Label>Salón</Label>
            </ImageCard>

            <ImageCard>
              <Img src={kitchen1} alt="Panel japonés en cocina" />
              <Label>Cocina</Label>
            </ImageCard>

            <ImageCard>
              <Img src={kitchen2} alt="Panel japonés filtrando luz natural" />
              <Label>Cocina</Label>
            </ImageCard>

            <ImageCard>
              <Img
                src={bedroomStudyarea}
                alt="Panel japonés en dormitorio con zona de trabajo"
              />
              <Label>Dormitorio</Label>
            </ImageCard>

            <ImageCard>
              <Img
                src={bedroomDarkPanel}
                alt="Panel japonés oscuro en dormitorio"
              />
              <Label>Dormitorio</Label>
            </ImageCard>

            <ImageCard>
              <Img src={office} alt="Panel japonés en despacho" />
              <Label>Despacho</Label>
            </ImageCard>

            <ImageCard>
              <Img src={waitingroom} alt="Panel japonés en sala de espera" />
              <Label>Espacio profesional</Label>
            </ImageCard>
          </Gallery>
        </SectionInner>
      </Section>

      {/* VALUE */}
      <ValueSection>
        <ValueCard>
          <ValueTitle>Diseño, proporción y criterio</ValueTitle>
          <ValueText>
            Cada panel japonés se diseña a medida: número de paneles, solapes,
            tejidos y sistema de apertura. Te asesoramos para que el resultado
            sea funcional, equilibrado y coherente con el espacio.
          </ValueText>

          <CTA to="/contact">Solicitar propuesta</CTA>
        </ValueCard>
      </ValueSection>
    </Page>
  );
}
