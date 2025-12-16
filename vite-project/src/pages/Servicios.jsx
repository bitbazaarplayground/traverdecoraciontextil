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
`;

/* =========================
   HERO
========================= */

const Hero = styled.section`
  padding: 6rem 2rem 5rem;
  text-align: center;

  @media (max-width: 768px) {
    padding: 4rem 1.5rem;
  }
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  font-weight: 600;
  color: #222;
  margin-bottom: 1.2rem;

  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;

const HeroText = styled.p`
  max-width: 760px;
  margin: 0 auto;
  font-size: 1.15rem;
  line-height: 1.7;
  color: #555;
`;

/* =========================
   SERVICES GRID
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

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 3rem;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const ServiceCard = styled.div`
  border-radius: 22px;
  background: #fafafa;
  overflow: hidden;
  transition: transform 0.35s ease, box-shadow 0.35s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 18px 40px rgba(0, 0, 0, 0.08);
  }
`;

const ServiceContent = styled.div`
  padding: 2.2rem 2.4rem 2.6rem;
`;

const ServiceTitle = styled.h3`
  font-size: 1.6rem;
  font-weight: 600;
  margin-bottom: 0.8rem;
  color: #222;
`;

const ServiceText = styled.p`
  font-size: 1.05rem;
  line-height: 1.7;
  color: #555;
  margin-bottom: 1.6rem;
`;

const ServiceLink = styled(Link)`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const ServiceImgWrapper = styled.div`
  width: 100%;
  height: 240px;
  overflow: hidden;

  @media (max-width: 768px) {
    height: 200px;
  }
`;

const ServiceImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;

  ${ServiceCard}:hover & {
    transform: scale(1.05);
  }
`;

/* =========================
   HOW WE WORK
========================= */

const Process = styled.section`
  padding: 5.5rem 2rem;
  background: #f7f7f7;
`;

const ProcessGrid = styled.div`
  max-width: 900px;
  margin: 0 auto;
  display: grid;
  gap: 2.2rem;
`;

const ProcessItem = styled.div`
  font-size: 1.05rem;
  line-height: 1.7;
  color: #444;
`;

/* =========================
   CTA
========================= */

const CTA = styled.section`
  padding: 5.5rem 2rem;
  text-align: center;
`;

const CTATitle = styled.h2`
  font-size: 2.4rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #222;
`;

const CTAText = styled.p`
  max-width: 620px;
  margin: 0 auto;
  font-size: 1.05rem;
  line-height: 1.7;
  color: #555;
`;

const CTAButton = styled(Link)`
  display: inline-block;
  margin-top: 2.2rem;
  padding: 0.9rem 2.4rem;
  border-radius: 40px;
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  font-weight: 600;
  text-decoration: none;

  &:hover {
    opacity: 0.85;
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
        <HeroText>
          Diseñamos soluciones de decoración textil y protección solar que
          combinan estética, confort y tecnología, adaptadas a cada espacio y
          estilo de vida.
        </HeroText>
      </Hero>

      {/* SERVICES */}
      <Section>
        <SectionInner>
          <ServicesGrid>
            {/* CORTINAS & ESTORES */}
            <ServiceCard>
              <ServiceImgWrapper>
                <ServiceImg
                  src={cortinasServicios}
                  alt="Cortinas y estores a medida"
                />
              </ServiceImgWrapper>

              <ServiceContent>
                <ServiceTitle>Cortinas & Estores</ServiceTitle>
                <ServiceText>
                  Proyectos a medida para regular la luz, aportar privacidad y
                  definir la atmósfera de cada estancia, cuidando tejidos,
                  sistemas y acabados.
                </ServiceText>
                <ServiceLink to="/cortinas-estores">
                  Ver cortinas y estores →
                </ServiceLink>
              </ServiceContent>
            </ServiceCard>

            {/* TOLDOS */}
            <ServiceCard>
              <ServiceImgWrapper>
                <ServiceImg
                  src={toldosProteccionSolar}
                  alt="Toldos y protección solar"
                />
              </ServiceImgWrapper>

              <ServiceContent>
                <ServiceTitle>Toldos & Protección Solar</ServiceTitle>
                <ServiceText>
                  Soluciones para terrazas, jardines y fachadas que regulan el
                  calor y la luz en espacios exteriores, combinando
                  funcionalidad y diseño.
                </ServiceText>
                <ServiceLink to="/toldos-proteccionsolar">
                  Ver protección solar →
                </ServiceLink>
              </ServiceContent>
            </ServiceCard>

            {/* AUTOMATIZACIÓN */}
            <ServiceCard>
              <ServiceImgWrapper>
                <ServiceImg src={somfyApp} alt="Automatización del hogar" />
              </ServiceImgWrapper>

              <ServiceContent>
                <ServiceTitle>Automatización del hogar</ServiceTitle>
                <ServiceText>
                  Integración de sistemas inteligentes para cortinas, estores,
                  toldos e iluminación, que reaccionan automáticamente al
                  entorno y a tu rutina diaria.
                </ServiceText>
                <ServiceLink to="/automatizacion">
                  Ver automatización →
                </ServiceLink>
              </ServiceContent>
            </ServiceCard>

            {/* PROYECTOS A MEDIDA */}
            <ServiceCard>
              <ServiceImgWrapper>
                <ServiceImg src={proyecto} alt="Proyectos a medida" />
              </ServiceImgWrapper>

              <ServiceContent>
                <ServiceTitle>Proyectos a medida</ServiceTitle>
                <ServiceText>
                  Asesoramiento personalizado, medición, confección e
                  instalación. Cada proyecto se adapta a la arquitectura, uso y
                  necesidades reales del espacio.
                </ServiceText>
                <ServiceLink to="/nosotros">
                  Solicitar asesoramiento →
                </ServiceLink>
              </ServiceContent>
            </ServiceCard>
          </ServicesGrid>
        </SectionInner>
      </Section>

      {/* PROCESS */}
      <Process>
        <ProcessGrid>
          <ProcessItem>
            <strong>Escuchamos.</strong> Analizamos el espacio, la orientación y
            la forma de vivirlo.
          </ProcessItem>
          <ProcessItem>
            <strong>Diseñamos.</strong> Proponemos soluciones coherentes con el
            estilo y las necesidades reales.
          </ProcessItem>
          <ProcessItem>
            <strong>Confeccionamos e instalamos.</strong> Cuidamos cada detalle
            para que el resultado final funcione y se vea bien.
          </ProcessItem>
        </ProcessGrid>
      </Process>

      {/* CTA */}
      <CTA>
        <CTATitle>Te asesoramos en cada detalle</CTATitle>
        <CTAText>
          Si no tienes claro qué solución encaja mejor con tu espacio, te
          acompañamos en todo el proceso para tomar la mejor decisión.
        </CTAText>
        <CTAButton to="/contacto">Contactar</CTAButton>
      </CTA>
    </Page>
  );
}
