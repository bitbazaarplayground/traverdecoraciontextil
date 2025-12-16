import styled from "styled-components";

/* =========================
   ASSETS (replace with your real images)
========================= */
import cortina2 from "../assets/CortinasEstores/carousel/cortinas2.jpeg";
// import somfyAppImg from "../assets/automatizacion/app.webp";
// import automationHero from "../assets/automatizacion/hero.webp";
// import sensorRainImg from "../assets/automatizacion/sensor-rain.webp";
// import sensorSunImg from "../assets/automatizacion/sensor-sun.webp";
// import sensorWindImg from "../assets/automatizacion/sensor-wind.webp";

/* =========================
   PAGE WRAPPER
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
  min-height: 60vh;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5rem 2rem;
  background-image: url(${cortina2});
  background-size: cover;
  background-position: center;
  color: #fff;

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  max-width: 900px;
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: white;

  span {
    color: ${({ theme }) => theme.colors.primary};
  }

  @media (max-width: 768px) {
    font-size: 2.4rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.15rem;
  line-height: 1.7;
  color: #eee;
`;

/* =========================
   FEATURES SECTION
========================= */

const FeaturesSection = styled.section`
  padding: 5rem 2rem;

  @media (max-width: 768px) {
    padding: 3.5rem 1.5rem;
  }
`;

const FeaturesInner = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  text-align: center;
`;

const FeaturesTitle = styled.h2`
  font-size: 2.4rem;
  font-weight: 600;
  color: #222;
  margin-bottom: 1rem;
`;

const FeaturesGrid = styled.div`
  display: grid;
  gap: 2.5rem;
  margin-top: 2.5rem;

  @media (min-width: 900px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const FeatureCard = styled.div`
  text-align: center;
`;

const FeatureImg = styled.img`
  width: 100px;
  height: 100px;
  object-fit: contain;
  margin-bottom: 1rem;
`;

const FeatureTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  color: #222;
  margin-bottom: 0.6rem;
`;

const FeatureText = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: #555;
`;

/* =========================
   EXPLANATION
========================= */

const ExplanationSection = styled.section`
  padding: 4rem 2rem;
  background: #fafafa;
  text-align: center;
`;

const ExplanationInner = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

const ExplanationTitle = styled.h2`
  font-size: 2.2rem;
  font-weight: 600;
  color: #222;
  margin-bottom: 1rem;
`;

const ExplanationText = styled.p`
  font-size: 1.05rem;
  line-height: 1.7;
  color: #555;
  margin-bottom: 1rem;
`;

/* =========================
   CTA
========================= */

const CTASection = styled.section`
  padding: 5rem 2rem;
  text-align: center;
`;

const CTATitle = styled.h2`
  font-size: 2.6rem;
  font-weight: 600;
  color: #222;
  margin-bottom: 1rem;
`;

const CTAText = styled.p`
  font-size: 1.1rem;
  line-height: 1.7;
  color: #555;
`;

const CTAButton = styled.a`
  display: inline-block;
  margin-top: 1.8rem;
  padding: 0.9rem 2.4rem;
  border-radius: 40px;
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  font-weight: 600;
  text-decoration: none;
  transition: opacity 0.25s ease;

  &:hover {
    opacity: 0.85;
  }
`;

/* =========================
   COMPONENT
========================= */

export default function Automatizacion() {
  return (
    <Page>
      {/* HERO */}
      <Hero>
        <HeroContent>
          <HeroTitle>
            Automatización del <span>hogar</span> con Somfy
          </HeroTitle>
          <HeroSubtitle>
            Control inteligente de cortinas, estores y toldos para tu hogar,
            adaptándose automáticamente al clima, la luz y tu rutina diaria.
          </HeroSubtitle>
        </HeroContent>
      </Hero>

      {/* FEATURES */}
      <FeaturesSection>
        <FeaturesInner>
          <FeaturesTitle>¿Qué puedes automatizar en tu hogar?</FeaturesTitle>

          <FeaturesGrid>
            <FeatureCard>
              <FeatureImg src={cortina2} alt="Control desde app" />
              <FeatureTitle>Control desde app</FeatureTitle>
              <FeatureText>
                Gestiona todas tus cortinas y toldos desde tu teléfono
                inteligente o tablet, incluso fuera de casa.
              </FeatureText>
            </FeatureCard>

            <FeatureCard>
              <FeatureImg src={cortina2} alt="Sensor de sol" />
              <FeatureTitle>Sensor de sol</FeatureTitle>
              <FeatureText>
                Detecta la intensidad de la luz y ajusta toldos y persianas para
                mantener confort térmico y visual.
              </FeatureText>
            </FeatureCard>

            <FeatureCard>
              <FeatureImg src={cortina2} alt="Sensor de viento" />
              <FeatureTitle>Sensor de viento</FeatureTitle>
              <FeatureText>
                Protege toldos y pergolas cerrando automáticamente ante ráfagas
                fuertes.
              </FeatureText>
            </FeatureCard>

            <FeatureCard>
              <FeatureImg src={cortina2} alt="Sensor de lluvia" />
              <FeatureTitle>Sensor de lluvia</FeatureTitle>
              <FeatureText>
                Detecta la lluvia y ajusta automáticamente tus toldos o estores.
              </FeatureText>
            </FeatureCard>

            <FeatureCard>
              <FeatureImg src={cortina2} alt="Control por voz" />
              <FeatureTitle>Control por voz</FeatureTitle>
              <FeatureText>
                Compatible con asistentes como Alexa, Google Assistant o Siri.
              </FeatureText>
            </FeatureCard>

            <FeatureCard>
              <FeatureImg src={cortina2} alt="Escenarios programables" />
              <FeatureTitle>Escenarios programables</FeatureTitle>
              <FeatureText>
                Programa acciones según hora, clima o tu rutina diaria.
              </FeatureText>
            </FeatureCard>
          </FeaturesGrid>
        </FeaturesInner>
      </FeaturesSection>

      {/* EXPLANATION */}
      <ExplanationSection>
        <ExplanationInner>
          <ExplanationTitle>¿Por qué automatizar?</ExplanationTitle>
          <ExplanationText>
            Con una solución domótica Somfy, tu hogar se anticipa a tus
            necesidades: las persianas se abren con la luz de la mañana, los
            toldos se retraen cuando sopla viento y puedes crear escenas
            personalizadas desde tu móvil.
          </ExplanationText>
          <ExplanationText>
            Todo esto se logra gracias a sensores que responden a sol, viento,
            lluvia y temperatura, y a un sistema central inteligente que
            coordina todos tus equipos.
          </ExplanationText>
        </ExplanationInner>
      </ExplanationSection>

      {/* CTA */}
      <CTASection>
        <CTATitle>Convierte tu casa en un hogar inteligente</CTATitle>
        <CTAText>
          Ponte en contacto con nosotros para evaluar tu proyecto de
          automatización y descubrir cómo podemos transformar tu confort diario.
        </CTAText>
        <CTAButton href="/contacto">Solicitar asesoramiento</CTAButton>
      </CTASection>
    </Page>
  );
}
