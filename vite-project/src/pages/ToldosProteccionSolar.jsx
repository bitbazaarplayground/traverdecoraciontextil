import { Link } from "react-router-dom";
import styled from "styled-components";

import heroImg from "../assets/toldos/toldo2.jpg";

/* =========================
   IMAGES (local assets)
========================= */
import toldoCofreImg from "../assets/toldos/cofre.jpg";
import hosteleriaImg from "../assets/toldos/hosteleria.jpg";
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
  color: #111;
`;

/* =========================
   HERO (premium)
========================= */

const Hero = styled.section`
  position: relative;
  min-height: 45vh; /* matches your other pages */
  display: flex;
  margin-top: 5rem;
  align-items: center; /* center like your original */
  justify-content: center;
  text-align: center;
  padding: 5rem 2rem; /* matches your original */
  color: #fff;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 4rem 1.5rem;
  }
`;

const HeroBg = styled.div`
  position: absolute;
  inset: 0;
  background-image: url(${heroImg});
  background-size: cover;
  background-position: center;
  transform: scale(1.02);
  filter: saturate(1.02) contrast(1.03);
  z-index: 0;
`;

const HeroOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: radial-gradient(
      1200px 700px at 50% 35%,
      rgba(0, 0, 0, 0.06),
      rgba(0, 0, 0, 0.45)
    ),
    linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.22) 0%,
      rgba(0, 0, 0, 0.48) 55%,
      rgba(0, 0, 0, 0.58) 100%
    );
  z-index: 1;
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 1100px;
  text-align: center;
`;

const Eyebrow = styled.p`
  margin: 0 0 0.9rem 0;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.72);
`;

const HeroTitle = styled.h1`
  font-size: 3.2rem;
  font-weight: 650;
  line-height: 1.06;
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
  margin: 0 auto;
  max-width: 68ch;
  font-size: 1.12rem;
  line-height: 1.75;
  color: rgba(255, 255, 255, 0.78);
`;

const HeroActions = styled.div`
  margin-top: 1.9rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.9rem;
  flex-wrap: wrap;
`;

const PrimaryButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.95rem 2.1rem;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.primary};
  color: #0b0c0f;
  font-weight: 850;
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
  padding: 0.95rem 2.05rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.07);
  border: 1px solid rgba(255, 255, 255, 0.14);
  color: rgba(255, 255, 255, 0.92);
  font-weight: 650;
  text-decoration: none;
  transition: transform 0.25s ease, background 0.25s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateY(-1px);
  }
`;

/* =========================
   SECTION SHELL
========================= */

const Section = styled.section`
  padding: 5.5rem 2rem;

  @media (max-width: 768px) {
    padding: 3.8rem 1.5rem;
  }
`;

const SectionInner = styled.div`
  max-width: 1120px;
  margin: 0 auto;
`;

const SectionHeader = styled.div`
  max-width: 820px;
  margin: 0 auto 3.2rem;
  text-align: center;
`;

const SectionTitle = styled.h2`
  font-size: 2.35rem;
  font-weight: 650;
  color: #111;
  margin: 0 0 0.85rem 0;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const SectionText = styled.p`
  margin: 0 auto;
  max-width: 74ch;
  font-size: 1.05rem;
  line-height: 1.75;
  color: rgba(17, 17, 17, 0.68);
`;

/* =========================
   BENEFITS STRIP (no icons)
========================= */

const BenefitsStrip = styled.div`
  margin: 2.6rem auto 0;
  max-width: 980px;
  padding: 1.25rem 1.2rem;
  border-radius: 18px;
  border: 1px solid rgba(17, 17, 17, 0.08);
  background: #fafafa;
  display: grid;
  gap: 0.75rem;

  @media (min-width: 900px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 1.1rem;
    padding: 1.25rem 1.35rem;
  }
`;

const Benefit = styled.p`
  margin: 0;
  font-size: 0.98rem;
  line-height: 1.6;
  color: rgba(17, 17, 17, 0.72);

  strong {
    color: rgba(17, 17, 17, 0.9);
    font-weight: 750;
  }
`;

/* =========================
   GRID (premium cards)
========================= */

const Grid = styled.div`
  display: grid;
  gap: 1.25rem;

  @media (min-width: 980px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.25rem;
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

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 34px 95px rgba(0, 0, 0, 0.12);
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

const CardImg = styled.div`
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
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
  background: rgba(255, 255, 255, 0.9);
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
  color: rgba(17, 17, 17, 0.8);
`;

const CardText = styled.p`
  margin: 0;
  font-size: 1.02rem;
  line-height: 1.7;
  color: rgba(17, 17, 17, 0.68);
`;

/* =========================
   CTA BAND
========================= */

const CTABand = styled.section`
  padding: 0 2rem 6.2rem;

  @media (max-width: 768px) {
    padding: 0 1.5rem 4.8rem;
  }
`;

const CTABandInner = styled.div`
  max-width: 1120px;
  margin: 0 auto;
`;

const CTACard = styled.div`
  border-radius: 24px;
  padding: 2.2rem 2rem;
  border: 1px solid rgba(17, 17, 17, 0.08);
  background: #fafafa;
  display: grid;
  gap: 1.3rem;

  @media (min-width: 980px) {
    grid-template-columns: 1.25fr 0.75fr;
    align-items: center;
    gap: 1.8rem;
    padding: 2.4rem 2.3rem;
  }
`;

const CTATitle = styled.h2`
  font-size: 1.6rem;
  font-weight: 750;
  margin: 0 0 0.45rem;
  color: #111;
`;

const CTAText = styled.p`
  margin: 0;
  color: rgba(17, 17, 17, 0.7);
  line-height: 1.75;
`;

const CTAButton = styled(Link)`
  justify-self: start;

  @media (min-width: 980px) {
    justify-self: end;
  }

  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.95rem 1.7rem;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.primary};
  color: #0b0c0f;
  font-weight: 900;
  text-decoration: none;
  transition: transform 0.25s ease, opacity 0.25s ease;

  &:hover {
    opacity: 0.92;
    transform: translateY(-1px);
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
        <HeroBg />
        <HeroOverlay />

        <HeroContent>
          <Eyebrow>Protección solar · Exterior</Eyebrow>
          <HeroTitle>
            Toldos & <span>Sombra a medida</span>
          </HeroTitle>
          <HeroSubtitle>
            Confort térmico, estética y durabilidad. Soluciones que mejoran el
            uso real de terrazas, jardines y fachadas sin comprometer el diseño.
          </HeroSubtitle>

          <HeroActions>
            <PrimaryButton to="/contact">Solicitar propuesta</PrimaryButton>
            <SecondaryButton href="#tipos">Ver tipos de toldos</SecondaryButton>
          </HeroActions>
        </HeroContent>
      </Hero>

      {/* INTRO + BENEFITS */}
      <Section id="tipos">
        <SectionInner>
          <SectionHeader>
            <SectionTitle>Toldos a medida</SectionTitle>
            <SectionText>
              Seleccionamos el sistema adecuado según orientación, uso y
              arquitectura. Medimos, instalamos y ajustamos con precisión para
              un resultado sólido y discreto.
            </SectionText>

            <BenefitsStrip>
              <Benefit>
                <strong>Confort térmico:</strong> menos calor, más sombra útil.
              </Benefit>
              <Benefit>
                <strong>Instalación limpia:</strong> detalles cuidados y ajuste
                final.
              </Benefit>
              <Benefit>
                <strong>Durabilidad:</strong> sistemas preparados para el uso
                real.
              </Benefit>
            </BenefitsStrip>
          </SectionHeader>

          <Grid>
            <Card>
              <CardMedia>
                <CardImg
                  style={{ backgroundImage: `url(${toldoExtensibleImg})` }}
                />
                <CardOverlay />
                <CardBadge>Terrazas</CardBadge>
              </CardMedia>
              <CardContent>
                <CardTitle>Toldos extensibles</CardTitle>
                <ValueLine>Sombra regulable con estética ligera.</ValueLine>
                <CardText>
                  Ideales para terrazas y balcones. Permiten ajustar la
                  proyección según el momento del día y el uso del espacio.
                </CardText>
              </CardContent>
            </Card>

            <Card>
              <CardMedia>
                <CardImg style={{ backgroundImage: `url(${toldoCofreImg})` }} />
                <CardOverlay />
                <CardBadge>Alta protección</CardBadge>
              </CardMedia>
              <CardContent>
                <CardTitle>Toldos cofre</CardTitle>
                <ValueLine>Acabado limpio, mecanismo protegido.</ValueLine>
                <CardText>
                  Sistemas robustos y duraderos. El tejido y los brazos quedan
                  resguardados, cuidando el conjunto y alargando su vida útil.
                </CardText>
              </CardContent>
            </Card>

            <Card>
              <CardMedia>
                <CardImg
                  style={{ backgroundImage: `url(${toldoVerticalImg})` }}
                />
                <CardOverlay />
                <CardBadge>Privacidad</CardBadge>
              </CardMedia>
              <CardContent>
                <CardTitle>Toldos verticales / screen</CardTitle>
                <ValueLine>
                  Control solar y privacidad con discreción.
                </ValueLine>
                <CardText>
                  Perfectos para porches, cerramientos y grandes ventanales.
                  Filtran la luz, reducen el calor y aumentan el confort.
                </CardText>
              </CardContent>
            </Card>

            <Card>
              <CardMedia>
                <CardImg style={{ backgroundImage: `url(${hosteleriaImg})` }} />
                <CardOverlay />
                <CardBadge>Negocio</CardBadge>
              </CardMedia>
              <CardContent>
                <CardTitle>Toldos para hostelería</CardTitle>
                <ValueLine>Resistencia, presencia y funcionalidad.</ValueLine>
                <CardText>
                  Soluciones para terrazas comerciales con tejidos y estructuras
                  pensadas para el uso intensivo y la imagen del local.
                </CardText>
              </CardContent>
            </Card>
          </Grid>

          {/* SECONDARY */}
          <SectionHeader style={{ marginTop: "4.8rem" }}>
            <SectionTitle>Otras soluciones de sombra</SectionTitle>
            <SectionText>
              Cuando el proyecto lo exige, combinamos toldos con sistemas
              estructurales para crear exterior habitable todo el año.
            </SectionText>
          </SectionHeader>

          <Grid>
            <Card>
              <CardMedia>
                <CardImg style={{ backgroundImage: `url(${pergolaImg})` }} />
                <CardOverlay />
                <CardBadge>Estructura</CardBadge>
              </CardMedia>
              <CardContent>
                <CardTitle>Pérgolas</CardTitle>
                <ValueLine>Arquitectura exterior con presencia.</ValueLine>
                <CardText>
                  Estructuras elegantes para crear espacios exteriores
                  habitables, con soluciones adaptadas a cada entorno.
                </CardText>
              </CardContent>
            </Card>

            <Card>
              <CardMedia>
                <CardImg style={{ backgroundImage: `url(${sailImg})` }} />
                <CardOverlay />
                <CardBadge>Ligereza</CardBadge>
              </CardMedia>
              <CardContent>
                <CardTitle>Velas de sombra</CardTitle>
                <ValueLine>Diseño contemporáneo y sombra flexible.</ValueLine>
                <CardText>
                  Soluciones ligeras para jardines y zonas abiertas, con un
                  resultado limpio y moderno.
                </CardText>
              </CardContent>
            </Card>
          </Grid>
        </SectionInner>
      </Section>

      {/* CTA BAND */}
      <CTABand>
        <CTABandInner>
          <CTACard>
            <div>
              <CTATitle>Te decimos la mejor solución para tu fachada</CTATitle>
              <CTAText>
                Envíanos una foto y medidas aproximadas. Te orientamos con
                honestidad y te preparamos una propuesta ajustada.
              </CTAText>
            </div>
            <CTAButton to="/contact">Solicitar asesoramiento</CTAButton>
          </CTACard>
        </CTABandInner>
      </CTABand>
    </Page>
  );
}
