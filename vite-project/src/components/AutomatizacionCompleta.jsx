import { Link } from "react-router-dom";
import styled from "styled-components";
import AutomatizacionEstimate from "../components/automatizacion/AutomatizacionEstimate";

/* =========================
   ASSETS (reuse what you already have)
========================= */
import domoticaControl from "../assets/Automatizacion/domotica1.png";
import automatizacionPackImg from "../assets/Automatizacion/smartHom1.png";
import PromoBanner from "./pricing/PromoBanner";

/* =========================
   PAGE
========================= */

const Page = styled.main`
  width: 100%;
  background: #0b0c0f;
  color: #f4f4f5;
`;

/* Premium white sheet */
const Sheet = styled.section`
  background: #ffffff;
  color: #111;
  border-top-left-radius: 34px;
  border-top-right-radius: 34px;
  margin-top: 0rem;
  position: relative;
  z-index: 5;
  box-shadow: 0 -18px 60px rgba(0, 0, 0, 0.35);
`;

const SheetInner = styled.div`
  max-width: 1150px;
  margin: 0 auto;
  padding: 4.2rem 2rem 5.4rem;

  @media (max-width: 768px) {
    padding: 3.1rem 1.5rem 4.4rem;
  }
`;

const Section = styled.section`
  padding: 3rem 0;
  border-top: 1px solid rgba(0, 0, 0, 0.06);

  &:first-child {
    border-top: none;
    padding-top: 0;
  }
`;

/* =========================
   TYPOGRAPHY
========================= */

const Kicker = styled.p`
  letter-spacing: 0.16em;
  text-transform: uppercase;
  font-size: 0.8rem;
  color: rgba(17, 17, 17, 0.55);
  margin: 0 0 0.7rem 0;
`;

const H1 = styled.h1`
  margin: 0;
  font-size: clamp(2.2rem, 4.3vw, 3.35rem);
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.06;
`;

const Lead = styled.p`
  margin: 1rem 0 0 0;
  max-width: 70ch;
  font-size: 1.08rem;
  line-height: 1.75;
  color: rgba(17, 17, 17, 0.7);

  @media (max-width: 768px) {
    font-size: 1.02rem;
  }
`;

const H2 = styled.h2`
  margin: 0;
  font-size: 2.1rem;
  font-weight: 650;
  letter-spacing: -0.01em;

  @media (max-width: 768px) {
    font-size: 1.75rem;
  }
`;

const SubLead = styled.p`
  margin: 0.85rem 0 0 0;
  max-width: 72ch;
  font-size: 1.03rem;
  line-height: 1.75;
  color: rgba(17, 17, 17, 0.7);
`;

/* =========================
   HERO (MINI, EDITORIAL)
========================= */

const MiniHeroGrid = styled.div`
  display: grid;
  gap: 2rem;
  align-items: center;

  @media (min-width: 980px) {
    grid-template-columns: 1.05fr 0.95fr;
  }
`;

const HeroMedia = styled.div`
  border-radius: 22px;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.03);
  border: 1px solid rgba(0, 0, 0, 0.06);
  box-shadow: 0 18px 55px rgba(0, 0, 0, 0.12);
`;

const HeroImage = styled.img`
  width: 100%;
  height: 360px;
  object-fit: cover;
  display: block;

  @media (max-width: 768px) {
    height: 260px;
  }
`;

const HeroActions = styled.div`
  margin-top: 1.4rem;
  display: flex;
  gap: 0.9rem;
  flex-wrap: wrap;
`;

const PrimaryLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.9rem 1.7rem;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.primary};
  color: #0b0c0f;
  font-weight: 800;
  text-decoration: none;

  &:hover {
    opacity: 0.92;
  }
`;

const SecondaryLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.9rem 1.6rem;
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.08);
  color: rgba(17, 17, 17, 0.85);
  font-weight: 750;
  text-decoration: none;

  &:hover {
    background: rgba(0, 0, 0, 0.06);
  }
`;

const BackRow = styled.div`
  margin-top: 1.1rem;
`;

const BackLink = styled(Link)`
  text-decoration: none;
  color: rgba(17, 17, 17, 0.62);
  font-weight: 650;

  &:hover {
    color: rgba(17, 17, 17, 0.82);
  }
`;

/* =========================
   3 PILLARS
========================= */

const Pillars = styled.div`
  margin-top: 1.6rem;
  display: grid;
  gap: 1rem;

  @media (min-width: 980px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const Pillar = styled.div`
  border-radius: 18px;
  padding: 1.2rem 1.2rem;
  background: rgba(0, 0, 0, 0.03);
  border: 1px solid rgba(0, 0, 0, 0.06);
`;

const PillarTitle = styled.h3`
  margin: 0 0 0.35rem 0;
  font-size: 1.05rem;
  font-weight: 800;
  color: rgba(17, 17, 17, 0.9);
`;

const PillarText = styled.p`
  margin: 0;
  font-size: 0.97rem;
  line-height: 1.65;
  color: rgba(17, 17, 17, 0.66);
`;

/* =========================
   ESTIMATE WRAPPER
========================= */

const EstimateWrap = styled.div`
  margin-top: 1.6rem;
`;

/* =========================
   PROCESS
========================= */

const Steps = styled.div`
  margin-top: 1.6rem;
  display: grid;
  gap: 1rem;

  @media (min-width: 980px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const Step = styled.div`
  border-radius: 18px;
  padding: 1.2rem 1.2rem;
  background: rgba(0, 0, 0, 0.03);
  border: 1px solid rgba(0, 0, 0, 0.06);
`;

const StepTitle = styled.h4`
  margin: 0 0 0.35rem 0;
  font-size: 1.05rem;
  font-weight: 800;
  color: rgba(17, 17, 17, 0.9);
`;

const StepText = styled.p`
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.6;
  color: rgba(17, 17, 17, 0.65);
`;

/* =========================
   MINI FAQ
========================= */

const FAQ = styled.div`
  margin-top: 1.6rem;
  display: grid;
  gap: 0.9rem;

  @media (min-width: 980px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const QA = styled.div`
  border-radius: 18px;
  padding: 1.15rem 1.15rem;
  background: rgba(0, 0, 0, 0.03);
  border: 1px solid rgba(0, 0, 0, 0.06);
`;

const Q = styled.h4`
  margin: 0 0 0.35rem 0;
  font-size: 1.02rem;
  font-weight: 850;
  color: rgba(17, 17, 17, 0.9);
`;

const A = styled.p`
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.6;
  color: rgba(17, 17, 17, 0.66);
`;

/* =========================
   CTA
========================= */

const CTA = styled.div`
  margin-top: 1.8rem;
  border-radius: 22px;
  padding: 2.2rem;
  background: #0b0c0f;
  color: #f4f4f5;
  display: grid;
  gap: 1.2rem;

  @media (min-width: 900px) {
    grid-template-columns: 1.2fr 0.8fr;
    align-items: center;
  }
`;

const CTATitle = styled.h3`
  margin: 0;
  font-size: 1.6rem;
  font-weight: 700;
  line-height: 1.2;
`;

const CTAText = styled.p`
  margin: 0.6rem 0 0 0;
  color: rgba(244, 244, 245, 0.72);
  line-height: 1.65;
`;

const CTAButtons = styled.div`
  display: flex;
  gap: 0.9rem;
  justify-content: flex-start;
  flex-wrap: wrap;

  @media (min-width: 900px) {
    justify-content: flex-end;
  }
`;

const CTAButtonPrimary = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.9rem 1.7rem;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.primary};
  color: #0b0c0f;
  font-weight: 800;
  text-decoration: none;

  &:hover {
    opacity: 0.92;
  }
`;

const CTAButtonSecondary = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.9rem 1.6rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: rgba(244, 244, 245, 0.92);
  font-weight: 700;
  text-decoration: none;

  &:hover {
    background: rgba(255, 255, 255, 0.11);
  }
`;

/* =========================
   COMPONENT
========================= */

export default function AutomatizacionCompleta() {
  return (
    <Page>
      <Sheet>
        <SheetInner>
          {/* MINI HERO */}
          <Section>
            <Kicker>Automatización integral del hogar</Kicker>

            <MiniHeroGrid>
              <div>
                <H1>La casa funciona sola</H1>
                <Lead>
                  Confort sin esfuerzo. Integración discreta de luz, privacidad
                  y rutina, para que tu hogar se adapte a ti (y no al revés).
                </Lead>

                <HeroActions>
                  <PrimaryLink href="/contact">
                    Solicitar asesoramiento
                  </PrimaryLink>
                  <SecondaryLink href="#incluye">Ver qué incluye</SecondaryLink>
                </HeroActions>

                <BackRow>
                  <BackLink to="/automatizacion">
                    ← Volver a Automatización
                  </BackLink>
                </BackRow>
              </div>

              <HeroMedia>
                <HeroImage
                  src={domoticaControl}
                  alt="Automatización integral discreta en un hogar moderno"
                  loading="eager"
                />
              </HeroMedia>
            </MiniHeroGrid>
          </Section>

          {/* VALUE BEFORE PRICE */}
          <Section>
            <Kicker>Qué cambia</Kicker>
            <H2>Automatización que se siente</H2>
            <SubLead>
              No es “hacerlo desde el móvil”. Es vivir con calma: luz medida,
              privacidad natural y una casa que responde sin interrupciones.
            </SubLead>

            <Pillars>
              <Pillar>
                <PillarTitle>Luz & privacidad</PillarTitle>
                <PillarText>
                  Control preciso para cada momento del día, con un resultado
                  silencioso y elegante.
                </PillarText>
              </Pillar>

              <Pillar>
                <PillarTitle>Rutinas & escenas</PillarTitle>
                <PillarText>
                  Horarios, escenas y automatismos que acompañan tu rutina sin
                  que tengas que pensarlo.
                </PillarText>
              </Pillar>

              <Pillar>
                <PillarTitle>Sensores & protección</PillarTitle>
                <PillarText>
                  Sol, viento o temperatura: el sistema se ajusta para proteger
                  y mantener el confort.
                </PillarText>
              </Pillar>
            </Pillars>
          </Section>

          {/* ESTIMATE (RIGHT PLACE) */}
          <Section id="incluye">
            <Kicker>Ejemplo orientativo</Kicker>
            <H2>Qué incluye una automatización completa</H2>
            <SubLead>
              Un ejemplo realista para un hogar medio. Ajustamos motores,
              tejidos, sensores y control según medidas y uso.
            </SubLead>
            <PromoBanner />
            <EstimateWrap>
              <AutomatizacionEstimate
                kicker="Orientativo"
                priceText="Desde"
                priceValue="~3.500€"
                description="Un sistema completo para automatizar varios elementos (por ejemplo, cortinas + persianas + toldo) puede comenzar desde aproximadamente esa cifra, según medidas, tejidos y número de motores. Te aconsejamos la opción más equilibrada para tu hogar."
                imageSrc={automatizacionPackImg}
                imageAlt="Ejemplo de automatización completa: cortinas, persianas, toldo, luz y control"
                items={[
                  {
                    icon: "toldo",
                    strong: "Toldo motorizado",
                    text: "Control por mando / app (según medidas)",
                  },
                  {
                    icon: "cortina",
                    strong: "Cortina motorizada",
                    text: "Riel incluido y ajuste fino",
                  },
                  {
                    icon: "persiana",
                    strong: "Estor tipo screen",
                    text: "Control solar + privacidad",
                  },
                  {
                    icon: "luz",
                    strong: "Luz inteligente",
                    text: "Escenas y horarios",
                  },
                  {
                    icon: "app",
                    strong: "App + control",
                    text: "Configuración inicial incluida",
                  },
                  {
                    icon: "instalacion",
                    strong: "Instalación certificada",
                    text: "Puesta en marcha y entrega",
                  },
                  {
                    icon: "sensores",
                    strong: "Sensores (opcional)",
                    text: "Sol / viento / temperatura",
                  },
                ]}
                finePrint="*El precio final depende de medidas, tejidos elegidos, número de motores y si se añaden sensores de sol/viento/temperatura."
              />
            </EstimateWrap>
          </Section>

          {/* PROCESS */}
          <Section>
            <Kicker>Proceso</Kicker>
            <H2>Cómo trabajamos</H2>
            <SubLead>
              Una experiencia sencilla, cuidada y sin sorpresas: desde la
              medición hasta la puesta en marcha.
            </SubLead>

            <Steps>
              <Step>
                <StepTitle>Escuchamos tu espacio</StepTitle>
                <StepText>
                  Medimos, analizamos y entendemos cómo vives tu hogar para
                  proponer lo que tiene sentido.
                </StepText>
              </Step>

              <Step>
                <StepTitle>Diseñamos la solución</StepTitle>
                <StepText>
                  Propuesta clara y realista, con opciones equilibradas según
                  tejidos, medidas y uso.
                </StepText>
              </Step>

              <Step>
                <StepTitle>Instalamos y ajustamos</StepTitle>
                <StepText>
                  Instalación certificada, ajuste fino y entrega final para que
                  todo funcione con precisión.
                </StepText>
              </Step>
            </Steps>
          </Section>

          {/* MINI FAQ */}
          <Section>
            <Kicker>Dudas habituales</Kicker>
            <H2>Lo importante, sin complicaciones</H2>
            <SubLead>
              Respuestas cortas a las preguntas que más se repiten antes de
              empezar.
            </SubLead>

            <FAQ>
              <QA>
                <Q>¿Puedo empezar por una zona?</Q>
                <A>
                  Sí. Puedes automatizar primero una estancia y ampliar más
                  adelante manteniendo coherencia y estética.
                </A>
              </QA>

              <QA>
                <Q>¿Hace ruido?</Q>
                <A>
                  La sensación es silenciosa y fluida. La instalación y el
                  ajuste fino marcan la diferencia.
                </A>
              </QA>

              <QA>
                <Q>¿Y si ya tengo domótica?</Q>
                <A>
                  Nos adaptamos. Integramos lo que ya existe cuando tiene
                  sentido y proponemos una solución limpia.
                </A>
              </QA>
            </FAQ>
          </Section>

          {/* FINAL CTA */}
          <Section>
            <CTA>
              <div>
                <CTATitle>¿Lo vemos en tu casa?</CTATitle>
                <CTAText>
                  Te proponemos una solución clara y realista según tu espacio.
                  Medición, propuesta y presupuesto sin compromiso.
                </CTAText>
              </div>

              <CTAButtons>
                <CTAButtonPrimary href="/contact">
                  Pedir asesoramiento
                </CTAButtonPrimary>
                <CTAButtonSecondary
                  href="https://wa.me/34647856817"
                  target="_blank"
                  rel="noreferrer"
                >
                  WhatsApp
                </CTAButtonSecondary>
              </CTAButtons>
            </CTA>
          </Section>
        </SheetInner>
      </Sheet>
    </Page>
  );
}
