import { Link } from "react-router-dom";
import styled from "styled-components";

import cortinasServicios from "../assets/servicios/CortinasServicios.png";
import proyecto from "../assets/servicios/ProyectoAMedida.png";
import somfyApp from "../assets/servicios/app2.png";
import toldosProteccionSolar from "../assets/servicios/toldoServicios.png";

/* =========================
   PAGE
========================= */

const Page = styled.main`
  width: 100%;
  background: #fff;
  color: #111;
`;

/* =========================
   HERO
========================= */

const Hero = styled.section`
  padding: 6.5rem 2rem 3.5rem;
  text-align: center;

  @media (max-width: 768px) {
    padding: 5rem 1.5rem 3rem;
  }
`;

const HeroInner = styled.div`
  max-width: 980px;
  margin: 0 auto;
`;

const Eyebrow = styled.p`
  margin: 0 0 1rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  font-size: 0.8rem;
  color: rgba(17, 17, 17, 0.55);
`;

const HeroTitle = styled.h1`
  font-size: 3.05rem;
  font-weight: 650;
  color: #111;
  line-height: 1.08;
  margin: 0 0 1.1rem;

  span {
    color: ${({ theme }) => theme.colors.primary};
  }

  @media (max-width: 768px) {
    font-size: 2.25rem;
  }
`;

const HeroText = styled.p`
  max-width: 78ch;
  margin: 0 auto;
  font-size: 1.12rem;
  line-height: 1.75;
  color: rgba(17, 17, 17, 0.68);
`;

/* =========================
   SECTION
========================= */

const Section = styled.section`
  padding: 4.5rem 2rem 6rem;

  @media (max-width: 768px) {
    padding: 3.2rem 1.5rem 4.5rem;
  }
`;

const SectionInner = styled.div`
  max-width: 1120px;
  margin: 0 auto;
`;

/* =========================
   SERVICES GRID (PREMIUM)
========================= */

const ServicesGrid = styled.div`
  display: grid;
  gap: 1.25rem;

  @media (min-width: 980px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.25rem;
  }
`;

const ServiceCard = styled.article`
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

const ServiceMedia = styled.div`
  position: relative;
  height: 250px;
  overflow: hidden;

  @media (max-width: 768px) {
    height: 210px;
  }
`;

const ServiceImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(1.01);
  transition: transform 0.6s ease;

  ${ServiceCard}:hover & {
    transform: scale(1.06);
  }
`;

const MediaOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.02),
    rgba(0, 0, 0, 0.45)
  );
`;

const Badge = styled.div`
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

const ServiceContent = styled.div`
  padding: 1.8rem 1.8rem 1.7rem;

  @media (max-width: 768px) {
    padding: 1.55rem 1.45rem 1.45rem;
  }
`;

const ServiceTitle = styled.h3`
  font-size: 1.55rem;
  font-weight: 700;
  margin: 0 0 0.6rem;
  color: #111;
`;

const ValueLine = styled.p`
  margin: 0 0 0.95rem;
  font-size: 1.02rem;
  font-weight: 600;
  color: rgba(17, 17, 17, 0.8);
`;

const ServiceText = styled.p`
  margin: 0 0 1.25rem;
  font-size: 1.02rem;
  line-height: 1.7;
  color: rgba(17, 17, 17, 0.68);
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.9rem;
  flex-wrap: wrap;
`;

const PrimaryCTA = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.15rem;
  border-radius: 999px;
  background: rgba(17, 17, 17, 0.06);
  border: 1px solid rgba(17, 17, 17, 0.1);
  color: rgba(17, 17, 17, 0.88);
  font-weight: 750;
  text-decoration: none;
  transition: transform 0.25s ease, background 0.25s ease;

  &:hover {
    background: rgba(17, 17, 17, 0.09);
    transform: translateY(-1px);
  }
`;

const SecondaryCTA = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.15rem;
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

/* =========================
   TRUST STRIP (replaces old Process)
========================= */

const TrustSection = styled.section`
  padding: 0 2rem 6.2rem;

  @media (max-width: 768px) {
    padding: 0 1.5rem 4.8rem;
  }
`;

const TrustInner = styled.div`
  max-width: 1120px;
  margin: 0 auto;
`;

const TrustCard = styled.div`
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

const TrustTitle = styled.h2`
  font-size: 1.6rem;
  font-weight: 750;
  margin: 0 0 0.45rem;
  color: #111;
`;

const TrustText = styled.p`
  margin: 0;
  color: rgba(17, 17, 17, 0.7);
  line-height: 1.75;
`;

const TrustBullets = styled.div`
  margin-top: 1rem;
  display: grid;
  gap: 0.55rem;
`;

const TrustBullet = styled.p`
  margin: 0;
  display: grid;
  grid-template-columns: 16px 1fr;
  gap: 0.65rem;
  align-items: start;
  font-size: 0.98rem;
  line-height: 1.6;
  color: rgba(17, 17, 17, 0.7);

  &::before {
    content: "✓";
    font-weight: 900;
    color: ${({ theme }) => theme.colors.primary};
    line-height: 1.2;
  }
`;

const TrustCTA = styled(Link)`
  justify-self: start;

  @media (min-width: 980px) {
    justify-self: end;
  }

  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.95rem 1.6rem;
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
   CTA
========================= */

const CTA = styled.section`
  padding: 5.5rem 2rem;
  text-align: center;
  background: #fff;

  @media (max-width: 768px) {
    padding: 4.2rem 1.5rem;
  }
`;

const CTATitle = styled.h2`
  font-size: 2.2rem;
  font-weight: 600;
  margin: 0 0 1rem;
  color: #111;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const CTAText = styled.p`
  max-width: 70ch;
  margin: 0 auto;
  font-size: 1.05rem;
  line-height: 1.75;
  color: rgba(17, 17, 17, 0.68);
`;

const CTAButton = styled(Link)`
  display: inline-flex;
  margin-top: 2.1rem;
  padding: 0.95rem 2.2rem;
  border-radius: 999px;
  background: #111;
  color: #fff;
  font-weight: 850;
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

export default function Servicios() {
  return (
    <Page>
      {/* HERO */}
      <Hero>
        <HeroInner>
          <Eyebrow>Servicios · Decoración textil & protección solar</Eyebrow>
          <HeroTitle>
            Diseño, confort y <span>ejecución impecable</span>.
          </HeroTitle>
          <HeroText>
            Diseñamos e instalamos soluciones de decoración textil, protección
            solar y automatización que se sienten bien desde el primer día.
            Materiales seleccionados, integración discreta y un resultado
            coherente con tu espacio.
          </HeroText>
        </HeroInner>
      </Hero>

      {/* SERVICES */}
      <Section>
        <SectionInner>
          <ServicesGrid>
            {/* CORTINAS & ESTORES */}
            <ServiceCard>
              <ServiceMedia>
                <ServiceImg src={cortinasServicios} alt="Cortinas y estores" />
                <MediaOverlay />
                <Badge>Interior</Badge>
              </ServiceMedia>

              <ServiceContent>
                <ServiceTitle>Cortinas & Estores</ServiceTitle>
                <ValueLine>
                  La forma más elegante de controlar luz y privacidad.
                </ValueLine>
                <ServiceText>
                  Proyectos a medida para definir la atmósfera de cada estancia:
                  tejidos, caída, confección y sistemas seleccionados con
                  criterio.
                </ServiceText>

                <Actions>
                  <PrimaryCTA to="/cortinas-estores">Ver detalles</PrimaryCTA>
                  <SecondaryCTA to="/contact">Pedir propuesta</SecondaryCTA>
                </Actions>
              </ServiceContent>
            </ServiceCard>

            {/* TOLDOS */}
            <ServiceCard>
              <ServiceMedia>
                <ServiceImg
                  src={toldosProteccionSolar}
                  alt="Toldos y protección solar"
                />
                <MediaOverlay />
                <Badge>Exterior</Badge>
              </ServiceMedia>

              <ServiceContent>
                <ServiceTitle>Toldos & Protección Solar</ServiceTitle>
                <ValueLine>
                  Sombra real, temperatura controlada, exterior utilizable.
                </ValueLine>
                <ServiceText>
                  Soluciones sólidas y discretas para terrazas, jardines y
                  fachadas: confort térmico, durabilidad y estética.
                </ServiceText>

                <Actions>
                  <PrimaryCTA to="/toldos-proteccionsolar">
                    Ver detalles
                  </PrimaryCTA>
                  <SecondaryCTA to="/contact">Pedir propuesta</SecondaryCTA>
                </Actions>
              </ServiceContent>
            </ServiceCard>

            {/* AUTOMATIZACIÓN */}
            <ServiceCard>
              <ServiceMedia>
                <ServiceImg src={somfyApp} alt="Automatización Somfy" />
                <MediaOverlay />
                <Badge>Smart Home</Badge>
              </ServiceMedia>

              <ServiceContent>
                <ServiceTitle>Automatización Somfy</ServiceTitle>
                <ValueLine>
                  El confort se anticipa. Tú mantienes el control.
                </ValueLine>
                <ServiceText>
                  Motores, sensores y control inteligente para cortinas, estores
                  y toldos. Integración cuidadosa y escenas que encajan con tu
                  rutina.
                </ServiceText>

                <Actions>
                  <PrimaryCTA to="/automatizacion">Ver detalles</PrimaryCTA>
                  <SecondaryCTA to="/contact">Pedir propuesta</SecondaryCTA>
                </Actions>
              </ServiceContent>
            </ServiceCard>

            {/* PROYECTOS A MEDIDA */}
            <ServiceCard>
              <ServiceMedia>
                <ServiceImg src={proyecto} alt="Proyectos a medida" />
                <MediaOverlay />
                <Badge>Estudio</Badge>
              </ServiceMedia>

              <ServiceContent>
                <ServiceTitle>Proyectos a Medida</ServiceTitle>
                <ValueLine>Una visión coherente de principio a fin.</ValueLine>
                <ServiceText>
                  Asesoramiento, medición, confección e instalación. Creamos una
                  línea estética consistente para que todo encaje en tu espacio.
                </ServiceText>

                <Actions>
                  <PrimaryCTA to="/propuestas">Ver propuestas</PrimaryCTA>
                  <SecondaryCTA to="/contact">Hablar con nosotros</SecondaryCTA>
                </Actions>
              </ServiceContent>
            </ServiceCard>
          </ServicesGrid>
        </SectionInner>
      </Section>

      {/* TRUST STRIP */}
      <TrustSection>
        <TrustInner>
          <TrustCard>
            <div>
              <TrustTitle>
                Más de 30 años de oficio. Cero improvisación.
              </TrustTitle>
              <TrustText>
                Un buen resultado no depende solo del producto. Depende del
                criterio, de la medición y de una instalación limpia. Te
                orientamos con honestidad y ejecutamos con precisión.
              </TrustText>

              <TrustBullets>
                <TrustBullet>
                  Visita técnica y asesoramiento decorativo
                </TrustBullet>
                <TrustBullet>
                  Instalación profesional, sin sorpresas
                </TrustBullet>
                <TrustBullet>
                  Soluciones para Castellón y alrededores (Valencia según
                  proyecto)
                </TrustBullet>
              </TrustBullets>
            </div>

            <TrustCTA to="/contact">Solicitar asesoramiento</TrustCTA>
          </TrustCard>
        </TrustInner>
      </TrustSection>

      {/* CTA */}
      <CTA>
        <CTATitle>¿No sabes por dónde empezar?</CTATitle>
        <CTAText>
          Cuéntanos tu espacio y lo que quieres mejorar. Te diremos el mejor
          punto de partida y te prepararemos una propuesta con criterio.
        </CTAText>
        <CTAButton to="/contact">Contactar</CTAButton>
      </CTA>
    </Page>
  );
}
