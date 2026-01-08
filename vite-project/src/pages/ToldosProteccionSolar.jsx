import { Link } from "react-router-dom";
import styled from "styled-components";

import heroImg from "../assets/toldos/toldo2.jpg";
/* =========================
   TEMP IMAGES (PLACEHOLDERS)
   Replace later with real assets
========================= */
import {
  default as hosteleriaImg,
  default as toldoCofreImg,
} from "../assets/toldos/cofre.jpg";

import pergolaImg from "../assets/toldos/pergola.jpg";
import toldoExtensibleImg from "../assets/toldos/toldo1.jpeg";
import toldoVerticalImg from "../assets/toldos/toldos-verticales.jpg";
import sailImg from "../assets/toldos/vela.webp";

/* =========================
   PAGE
========================= */

const Page = styled.main`
  width: 100%;
  background: #fff;
`;

/* =========================
   HERO
========================= */

const Hero = styled.section`
  position: relative;
  min-height: 45vh;
  display: flex;
  margin-top: 5rem;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 5rem 2rem;
  color: #fff;

  background-image: url(${heroImg});
  background-size: cover;
  background-position: center;

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.35));
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 1;
  max-width: 820px;
`;

const HeroTitle = styled.h1`
  font-size: 3.2rem;
  font-weight: 600;
  margin-bottom: 1.4rem;
  span {
    color: ${({ theme }) => theme.colors.primary};
  }
  @media (max-width: 768px) {
    font-size: 2.3rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.15rem;
  line-height: 1.7;
  opacity: 0.9;
`;

/* =========================
   GENERIC SECTION
========================= */

const Section = styled.section`
  padding: 5.5rem 2rem;

  @media (max-width: 768px) {
    padding: 3.5rem 1.5rem;
  }
`;

const SectionInner = styled.div`
  max-width: 1100px;
  margin: 0 auto;
`;

const SectionHeader = styled.div`
  max-width: 720px;
  margin: 0 auto 4rem;
  text-align: center;
`;

const SectionTitle = styled.h2`
  font-size: 2.3rem;
  font-weight: 600;
  color: #222;
  margin-bottom: 1.2rem;
`;

const SectionText = styled.p`
  font-size: 1.05rem;
  line-height: 1.7;
  color: #555;
`;

/* =========================
   GRID
========================= */

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2.5rem;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  background: #fafafa;
  border-radius: 22px;
  overflow: hidden;
`;

const CardImage = styled.div`
  height: 240px;
  background-size: cover;
  background-position: center;
`;

const CardContent = styled.div`
  padding: 2rem;
`;

const CardTitle = styled.h3`
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 0.6rem;
  color: #222;
`;

const CardText = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: #555;
`;

/* =========================
   AUTOMATION NOTE (LINK ONLY)
========================= */

const AutomationNote = styled.div`
  margin-top: 5rem;
  padding: 3rem;
  border-radius: 22px;
  background: #fafafa;
  text-align: center;
`;

const AutomationText = styled.p`
  max-width: 720px;
  margin: 0 auto 1.5rem;
  font-size: 1.05rem;
  line-height: 1.7;
  color: #555;
`;

const AutomationLink = styled(Link)`
  display: inline-block;
  padding: 0.9rem 2.2rem;
  border-radius: 40px;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  font-weight: 600;
  text-decoration: none;

  &:hover {
    opacity: 0.85;
  }
`;

/* =========================
   COMPONENT
========================= */

export default function ToldosProteccionSolar() {
  return (
    <Page>
      {/* HERO */}
      <Hero>
        <HeroContent>
          <HeroTitle>
            Toldos & <span>Protección Solar</span>
          </HeroTitle>
          <HeroSubtitle>
            Soluciones para regular la luz, el calor y el confort en espacios
            exteriores.
          </HeroSubtitle>
        </HeroContent>
      </Hero>

      {/* INTRO */}
      <Section>
        <SectionInner>
          <SectionHeader>
            <SectionTitle>Toldos a medida</SectionTitle>
            <SectionText>
              Diseñamos e instalamos soluciones de protección solar adaptadas a
              cada espacio, cuidando la funcionalidad, la estética y la
              durabilidad en cada proyecto.
            </SectionText>
          </SectionHeader>

          <Grid>
            <Card>
              <CardImage
                style={{ backgroundImage: `url(${toldoExtensibleImg})` }}
              />
              <CardContent>
                <CardTitle>Toldos extensibles</CardTitle>
                <CardText>
                  Ideales para terrazas y balcones, permiten regular la sombra
                  según el momento del día.
                </CardText>
              </CardContent>
            </Card>

            <Card>
              <CardImage style={{ backgroundImage: `url(${toldoCofreImg})` }} />
              <CardContent>
                <CardTitle>Toldos cofre</CardTitle>
                <CardText>
                  Sistemas protegidos y duraderos, con un acabado limpio y
                  discreto.
                </CardText>
              </CardContent>
            </Card>

            <Card>
              <CardImage
                style={{ backgroundImage: `url(${toldoVerticalImg})` }}
              />
              <CardContent>
                <CardTitle>Toldos verticales / screen</CardTitle>
                <CardText>
                  Control solar y privacidad para porches, cerramientos y
                  grandes ventanales.
                </CardText>
              </CardContent>
            </Card>

            <Card>
              <CardImage style={{ backgroundImage: `url(${hosteleriaImg})` }} />
              <CardContent>
                <CardTitle>Toldos para hostelería</CardTitle>
                <CardText>
                  Soluciones resistentes y funcionales para bares, restaurantes
                  y espacios comerciales.
                </CardText>
              </CardContent>
            </Card>
          </Grid>

          {/* SECONDARY */}
          <SectionHeader style={{ marginTop: "5rem" }}>
            <SectionTitle>Otras soluciones de sombra</SectionTitle>
            <SectionText>
              Además de toldos, trabajamos con sistemas de sombra adaptados a
              diferentes necesidades y entornos.
            </SectionText>
          </SectionHeader>

          <Grid>
            <Card>
              <CardImage style={{ backgroundImage: `url(${pergolaImg})` }} />
              <CardContent>
                <CardTitle>Pérgolas</CardTitle>
                <CardText>
                  Estructuras elegantes para crear espacios exteriores
                  habitables.
                </CardText>
              </CardContent>
            </Card>

            <Card>
              <CardImage style={{ backgroundImage: `url(${sailImg})` }} />
              <CardContent>
                <CardTitle>Velas de sombra</CardTitle>
                <CardText>
                  Soluciones ligeras y contemporáneas para jardines y zonas
                  abiertas.
                </CardText>
              </CardContent>
            </Card>
          </Grid>

          {/* AUTOMATION NOTE */}
          <AutomationNote>
            <AutomationText>
              Algunas soluciones de protección solar pueden integrarse con
              sistemas de control automático para reaccionar al sol, el viento o
              la lluvia.
            </AutomationText>
            <AutomationLink to="/automatizacion">
              Ver automatización
            </AutomationLink>
          </AutomationNote>
        </SectionInner>
      </Section>
    </Page>
  );
}
