import styled from "styled-components";
import AutomatizacionEstimate from "../components/automatizacion/AutomatizacionEstimate";

/* =========================
   ASSETS
========================= */
import benefit1 from "../assets/Automatizacion/benefit1.png";
import domoticaControl from "../assets/Automatizacion/domotica1.png";
import programaHorarios from "../assets/Automatizacion/programa.png";
import vacaciones from "../assets/Automatizacion/vacaciones.png";
import heroVideo from "../assets/video1.mp4";

import automatizacionPackImg from "../assets/Automatizacion/smartHom1.png";
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
  min-height: 45vh;
  min-height: 45svh;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding: 6rem 2rem 4.5rem;
  overflow: hidden;
  margin-top: 0rem;

  @media (max-width: 768px) {
    margin-top: 0rem;
    min-height: 42vh;
    min-height: 42svh;
    padding: 4rem 1.5rem 3rem;
  }
`;

const HeroVideo = styled.video`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;

  /* Shift crop slightly upward so bottom watermark stays out */
  object-position: center 22%;

  /* Base zoom */
  transform: scale(1.06);
  filter: saturate(0.95) contrast(1.05);
  z-index: 0;

  /* Larger screens: zoom in more so watermark never appears */
  @media (min-width: 1320px) {
    transform: scale(1.12);
  }
  @media (min-width: 1400px) {
    transform: scale(1.15);
  }

  @media (min-width: 1600px) {
    transform: scale(1.18);
  }
  @media (min-width: 1800px) {
    transform: scale(1.22);
  }
`;

const HeroOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: radial-gradient(
      1200px 700px at 50% 35%,
      rgba(0, 0, 0, 0.15),
      rgba(0, 0, 0, 0.68)
    ),
    linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.35) 0%,
      rgba(0, 0, 0, 0.88) 70%,
      rgba(11, 12, 15, 1) 100%
    );
  z-index: 1;
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 1100px;
`;

const Eyebrow = styled.p`
  letter-spacing: 0.18em;
  text-transform: uppercase;
  font-size: 0.8rem;
  color: rgba(244, 244, 245, 0.72);
  margin: 0 0 0.9rem 0;
`;

const HeroTitle = styled.h1`
  font-size: 3.45rem;
  font-weight: 600;
  line-height: 1.04;
  margin: 0 0 1.2rem 0;

  span {
    color: ${({ theme }) => theme.colors.primary};
  }

  @media (max-width: 768px) {
    font-size: 2.55rem;
    line-height: 1.08;
  }
`;

const HeroSubtitle = styled.p`
  max-width: 58ch;
  font-size: 1.15rem;
  line-height: 1.75;
  color: rgba(244, 244, 245, 0.78);
  margin: 0;
`;

const HeroActions = styled.div`
  margin-top: 2rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
`;

const PrimaryButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.95rem 2.25rem;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.primary};
  color: #0b0c0f;
  font-weight: 700;
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
  color: rgba(244, 244, 245, 0.9);
  font-weight: 600;
  text-decoration: none;
  transition: transform 0.25s ease, background 0.25s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.09);
    transform: translateY(-1px);
  }
`;

const MicroLine = styled.p`
  margin-top: 1.4rem;
  font-size: 0.95rem;
  line-height: 1.6;
  color: rgba(244, 244, 245, 0.6);
`;

/* =========================
   PREMIUM SHEET (THE UPGRADE)
========================= */

const Sheet = styled.section`
  background: #ffffff;
  color: #111;
  border-top-left-radius: 34px;
  border-top-right-radius: 34px;
  margin-top: -1rem; /* sits over hero */
  position: relative;
  z-index: 5;
  box-shadow: 0 -18px 60px rgba(0, 0, 0, 0.35);
`;

const SheetInner = styled.div`
  max-width: 1150px;
  margin: 0 auto;
  padding: 4.5rem 2rem 5.5rem;

  @media (max-width: 768px) {
    padding: 3.2rem 1.5rem 4.5rem;
  }
`;

const Section = styled.section`
  padding: 3.2rem 0;
  border-top: 1px solid rgba(0, 0, 0, 0.06);

  &:first-child {
    border-top: none;
    padding-top: 0;
  }
`;

const Kicker = styled.p`
  letter-spacing: 0.16em;
  text-transform: uppercase;
  font-size: 0.8rem;
  color: rgba(17, 17, 17, 0.55);
  margin: 0 0 0.7rem 0;
`;

const H2 = styled.h2`
  font-size: 2.25rem;
  font-weight: 650;
  margin: 0 0 0.9rem 0;

  @media (max-width: 768px) {
    font-size: 1.85rem;
  }
`;

const Lead = styled.p`
  font-size: 1.05rem;
  line-height: 1.75;
  color: rgba(17, 17, 17, 0.7);
  margin: 0;
`;

const Pills = styled.div`
  margin-top: 1.25rem;
  display: flex;
  gap: 0.7rem;
  flex-wrap: wrap;
  justify-content: flex-start;
`;

const Pill = styled.div`
  padding: 0.55rem 0.9rem;
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.06);
  font-weight: 600;
  font-size: 0.95rem;
  color: rgba(17, 17, 17, 0.78);
`;

/* =========================
   CONTROL (NOW PREMIUM: 2 COLS)
========================= */

const ControlGrid = styled.div`
  display: grid;
  gap: 2.4rem;
  align-items: center;

  @media (min-width: 980px) {
    grid-template-columns: 1.05fr 0.95fr;
  }
`;

const ControlMedia = styled.div`
  border-radius: 22px;
  overflow: hidden;
  box-shadow: 0 18px 45px rgba(0, 0, 0, 0.14);
`;

const ControlImage = styled.img`
  width: 100%;
  height: 420px;
  object-fit: cover;
  display: block;

  @media (max-width: 768px) {
    height: 320px;
  }
`;

/* =========================
   WHAT CAN BE AUTOMATED (REASSURANCE)
========================= */

const MiniGrid = styled.div`
  display: grid;
  gap: 1rem;
  margin-top: 1.6rem;

  @media (min-width: 900px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const MiniCard = styled.div`
  border-radius: 18px;
  padding: 1.2rem 1.2rem;
  background: rgba(0, 0, 0, 0.03);
  border: 1px solid rgba(0, 0, 0, 0.06);
`;

const MiniTitle = styled.h4`
  margin: 0 0 0.35rem 0;
  font-size: 1.05rem;
  font-weight: 700;
  color: rgba(17, 17, 17, 0.9);
`;

const MiniText = styled.p`
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.6;
  color: rgba(17, 17, 17, 0.65);
`;

/* =========================
   BENEFITS (KEEP YOURS, SLIGHTLY REFINED)
========================= */

const BenefitsInner = styled.div`
  display: grid;
  gap: 3.6rem;

  @media (max-width: 768px) {
    gap: 2.8rem;
  }
`;

const BenefitRow = styled.div`
  display: grid;
  gap: 2.2rem;
  align-items: center;
  padding-bottom: 2.6rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }

  @media (min-width: 980px) {
    grid-template-columns: 0.95fr 1.05fr;
    direction: ${({ $reverse }) => ($reverse ? "rtl" : "ltr")};
  }
`;

const BenefitText = styled.div`
  direction: ltr;
`;

const BenefitTitle = styled.h3`
  font-size: 1.7rem;
  font-weight: 650;
  margin: 0 0 0.65rem 0;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const BenefitParagraph = styled.p`
  margin: 0;
  font-size: 1rem;
  line-height: 1.65;
  color: rgba(17, 17, 17, 0.68);
  max-width: 48ch;
`;

const BenefitImage = styled.img`
  width: 100%;
  height: 300px;
  border-radius: 18px;
  object-fit: cover;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.14);

  @media (max-width: 768px) {
    height: 240px;
  }
`;

/* =========================
   CTA (CONVERSION)
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

export default function Automatizacion() {
  return (
    <Page>
      {/* HERO */}
      <Hero>
        <HeroVideo src={heroVideo} autoPlay muted loop playsInline />
        <HeroOverlay />
        <HeroContent>
          <Eyebrow>Automatización residencial · Somfy</Eyebrow>
          <HeroTitle>
            El lujo no se <span>controla</span>. <br />
            Se anticipa.
          </HeroTitle>
          <HeroSubtitle>
            Cortinas, estores y toldos que responden con precisión silenciosa a
            la luz, al clima y a tu rutina. Sin esfuerzo. Sin interrupciones.
            Como debe ser.
          </HeroSubtitle>

          <HeroActions>
            <PrimaryButton href="/contact">Asesoramiento privado</PrimaryButton>
            <SecondaryButton href="#experiencia">
              Descubrir la experiencia
            </SecondaryButton>
          </HeroActions>

          <MicroLine>
            Proyectos a medida para hogares exigentes. Integración discreta,
            acabado impecable y una sensación que solo se entiende al vivirla.
          </MicroLine>
        </HeroContent>
      </Hero>

      {/* PREMIUM SHEET */}
      <Sheet>
        <SheetInner>
          {/* CONTROL */}
          <Section>
            <ControlGrid>
              <div>
                <Kicker>Control</Kicker>
                <H2>Siempre bajo tu control</H2>
                <Lead>
                  App, voz o mando tradicional. La automatización se adapta a
                  ti: tú decides cuándo intervenir, y cuándo dejar que el hogar
                  se anticipe.
                </Lead>

                <Pills>
                  <Pill>App móvil</Pill>
                  <Pill>Alexa / Google / Siri</Pill>
                  <Pill>Mando / Pulsador</Pill>
                </Pills>
              </div>

              <ControlMedia>
                <ControlImage
                  src={domoticaControl}
                  alt="Control inteligente del hogar con cortinas automatizadas"
                />
              </ControlMedia>
            </ControlGrid>
          </Section>

          {/* WHAT CAN BE AUTOMATED */}
          <Section>
            <Kicker>Posibilidades</Kicker>
            <H2>¿Qué se puede automatizar?</H2>
            <Lead>
              Lo importante no es la tecnología: es que funcione con tu rutina.
              Automatizamos lo que tiene sentido en tu espacio, con integración
              discreta y resultado impecable.
            </Lead>

            <MiniGrid>
              <MiniCard>
                <MiniTitle>Cortinas & estores</MiniTitle>
                <MiniText>
                  Interior: caída perfecta, silencio y precisión.
                </MiniText>
              </MiniCard>
              <MiniCard>
                <MiniTitle>Persianas & screens</MiniTitle>
                <MiniText>
                  Control solar, privacidad y confort térmico.
                </MiniText>
              </MiniCard>
              <MiniCard>
                <MiniTitle>Toldos & exterior</MiniTitle>
                <MiniText>
                  Protección inteligente con sensores de clima.
                </MiniText>
              </MiniCard>
            </MiniGrid>
            <AutomatizacionEstimate
              KickerComponent={Kicker}
              kicker="Orientativo"
              priceText="Desde"
              priceValue="~3.500€"
              description="Un sistema completo para automatizar varios elementos (por ejemplo, cortinas + persianas + toldo) puede comenzar desde aproximadamente esa cifra, según medidas, tejidos y número de motores. Te aconsejamos la opción más equilibrada para tu hogar."
              imageSrc={automatizacionPackImg}
              imageAlt="Ejemplo de automatización: luz, toldo, persianas, cortinas y control desde el móvil"
              items={[
                {
                  icon: "toldo",
                  strong: "1× Toldo motorizado",
                  text: "Mando / app (según medidas)",
                },
                {
                  icon: "cortina",
                  strong: "1× Cortina motorizada",
                  text: "Barra / riel incluido",
                },
                {
                  icon: "persiana",
                  strong: "1× Estor tipo screen",
                  text: "Control solar + privacidad",
                },
                {
                  icon: "luz",
                  strong: "3× Luz inteligente",
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
          </Section>

          {/* BENEFITS */}
          <Section id="experiencia">
            <Kicker>Experiencia</Kicker>
            <H2>Automatización que se nota</H2>
            <Lead>
              No se trata de “hacerlo desde el móvil”. Se trata de vivir mejor:
              luz medida, confort real y una casa que responde con calma.
            </Lead>

            <div style={{ marginTop: "2.2rem" }}>
              <BenefitsInner>
                <BenefitRow>
                  <BenefitText>
                    <BenefitTitle>
                      Ajusta tus persianas con la luz del día
                    </BenefitTitle>
                    <BenefitParagraph>
                      A medida que el sol avanza, tus persianas, toldos y
                      cortinas se regulan automáticamente para dejar pasar la
                      cantidad justa de luz. Confort visual, sin
                      deslumbramientos, desde el primer momento.
                    </BenefitParagraph>
                  </BenefitText>

                  <BenefitImage
                    src={benefit1}
                    alt="Luz natural entrando por cortinas"
                  />
                </BenefitRow>

                <BenefitRow $reverse>
                  <BenefitText>
                    <BenefitTitle>
                      Controla tu hogar desde cualquier lugar
                    </BenefitTitle>
                    <BenefitParagraph>
                      Controla persianas, toldos y cortinas desde el móvil,
                      estés donde estés. Simula presencia real cuando no estás
                      en casa y gana tranquilidad incluso durante tus
                      vacaciones.
                    </BenefitParagraph>
                  </BenefitText>

                  <BenefitImage
                    src={vacaciones}
                    alt="Control del hogar durante vacaciones"
                  />
                </BenefitRow>

                <BenefitRow>
                  <BenefitText>
                    <BenefitTitle>
                      Programa horarios que se adaptan a tu rutina
                    </BenefitTitle>
                    <BenefitParagraph>
                      Define horarios de apertura y cierre según tu día a día o
                      la estación del año. La casa se adapta a ti, no al revés.
                    </BenefitParagraph>
                  </BenefitText>

                  <BenefitImage
                    src={programaHorarios}
                    alt="Programación de horarios"
                  />
                </BenefitRow>
              </BenefitsInner>
            </div>
          </Section>

          {/* CTA */}
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
