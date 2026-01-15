import { Link } from "react-router-dom";
import styled from "styled-components";

/* =========================
   ASSETS
========================= */
import benefit1 from "../assets/Automatizacion/benefit1.png";
import automatizacionPackImg from "../assets/Automatizacion/domoticaInd.png";
import programaHorarios from "../assets/Automatizacion/programa.png";
import vacaciones from "../assets/Automatizacion/vacaciones.png";
import heroVideo from "../assets/video1.mp4";

/* =========================
   PAGE
========================= */

const Page = styled.main`
  width: 100%;
  background: #0b0c0f;
  color: #f4f4f5;
`;

/* =========================
   HERO (KEEP AS IS)
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
  object-position: center 22%;
  transform: scale(1.06);
  filter: saturate(0.95) contrast(1.05);
  z-index: 0;

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
   PREMIUM SHEET (REWORKED)
========================= */

const Sheet = styled.section`
  background: #ffffff;
  color: #111;
  border-top-left-radius: 34px;
  border-top-right-radius: 34px;
  margin-top: -1rem;
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

/* =========================
   SECTION 2: CORE IDEA (FEELING)
========================= */

const FeelingGrid = styled.div`
  display: grid;
  gap: 2.2rem;
  align-items: center;

  @media (min-width: 980px) {
    grid-template-columns: 1.05fr 0.95fr;
  }
`;

const FeelingTitle = styled.h2`
  margin: 0.35rem 0 0.9rem 0;
  font-size: 2.35rem;
  font-weight: 700;
  letter-spacing: -0.01em;

  @media (max-width: 768px) {
    font-size: 1.95rem;
  }
`;

const FeelingText = styled.p`
  margin: 0;
  font-size: 1.05rem;
  line-height: 1.78;
  color: rgba(17, 17, 17, 0.7);
  max-width: 62ch;
`;

const FeelingPanel = styled.div`
  border-radius: 22px;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.03);
  border: 1px solid rgba(0, 0, 0, 0.06);
  box-shadow: 0 18px 55px rgba(0, 0, 0, 0.12);
`;

const FeelingImage = styled.img`
  width: 100%;
  height: 360px;
  object-fit: cover;
  display: block;

  @media (max-width: 768px) {
    height: 280px;
  }
`;

/* =========================
   SECTION 3: FULL HOME AUTOMATION (PREVIEW)
========================= */

const PreviewRow = styled.div`
  display: grid;
  gap: 1.4rem;
  align-items: center;

  @media (min-width: 980px) {
    grid-template-columns: 1.05fr 0.95fr;
  }
`;

const PreviewCard = styled.div`
  border-radius: 22px;
  padding: 1.4rem 1.4rem;
  background: rgba(0, 0, 0, 0.03);
  border: 1px solid rgba(0, 0, 0, 0.06);
`;

const PreviewTitle = styled.h3`
  margin: 0 0 0.55rem 0;
  font-size: 1.35rem;
  font-weight: 750;
  color: rgba(17, 17, 17, 0.92);
`;

const PreviewText = styled.p`
  margin: 0;
  font-size: 1.02rem;
  line-height: 1.7;
  color: rgba(17, 17, 17, 0.7);
`;

const PriceHint = styled.div`
  margin-top: 1.05rem;
  font-size: 1rem;
  color: rgba(17, 17, 17, 0.7);

  strong {
    color: rgba(17, 17, 17, 0.92);
    font-weight: 800;
  }

  span {
    color: ${({ theme }) => theme.colors.primary};
    font-weight: 850;
  }
`;

const SoftLinkRow = styled.div`
  margin-top: 1.25rem;
  display: flex;
  gap: 0.9rem;
  flex-wrap: wrap;
`;

const SoftLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  padding: 0.9rem 1.5rem;
  border-radius: 999px;

  background: ${({ theme }) => theme.colors.primary};
  color: #0b0c0f;

  font-weight: 800;
  text-decoration: none;

  &:hover {
    opacity: 0.92;
  }
`;

const GhostLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  padding: 0.9rem 1.45rem;
  border-radius: 999px;

  background: transparent;
  border: 1px solid rgba(0, 0, 0, 0.12);
  color: rgba(17, 17, 17, 0.85);

  font-weight: 750;
  text-decoration: none;

  &:hover {
    background: rgba(0, 0, 0, 0.03);
  }
`;

/* =========================
   SECTION 4: INDIVIDUAL AUTOMATION (3 CARDS)
========================= */

const Cards = styled.div`
  margin-top: 1.6rem;
  display: grid;
  gap: 1rem;

  @media (min-width: 900px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const AutoCard = styled(Link)`
  border-radius: 20px;
  overflow: hidden;
  text-decoration: none;
  color: inherit;

  border: 1px solid rgba(0, 0, 0, 0.06);
  background: rgba(0, 0, 0, 0.02);

  transition: transform 0.25s ease, box-shadow 0.25s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 18px 55px rgba(0, 0, 0, 0.12);
  }
`;

const AutoCardTop = styled.div`
  padding: 1.1rem 1.1rem 0.9rem;
`;

const AutoCardTitle = styled.h3`
  margin: 0 0 0.35rem 0;
  font-size: 1.15rem;
  font-weight: 800;
  color: rgba(17, 17, 17, 0.92);
`;

const AutoCardText = styled.p`
  margin: 0;
  font-size: 0.98rem;
  line-height: 1.6;
  color: rgba(17, 17, 17, 0.68);
`;

const AutoCardCta = styled.div`
  margin-top: 0.9rem;
  font-weight: 800;
  font-size: 0.92rem;
  color: ${({ theme }) => theme.colors.primary};
`;

const AutoCardMedia = styled.div`
  height: 150px;
  background: rgba(0, 0, 0, 0.04);
`;

/* =========================
   BENEFITS
========================= */

const BenefitsInner = styled.div`
  display: grid;
  gap: 3.2rem;

  @media (max-width: 768px) {
    gap: 2.6rem;
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
  font-size: 1.65rem;
  font-weight: 700;
  margin: 0 0 0.65rem 0;

  @media (max-width: 768px) {
    font-size: 1.48rem;
  }
`;

const BenefitParagraph = styled.p`
  margin: 0;
  font-size: 1rem;
  line-height: 1.7;
  color: rgba(17, 17, 17, 0.68);
  max-width: 55ch;
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
   FULL BLEED WRAPPER (OPTIONAL)
========================= */

const FullBleed = styled.div`
  width: 100vw;
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  margin-top: 1.6rem;
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
          {/* SECTION 2: CORE IDEA */}
          <Section>
            <Kicker>Esencia</Kicker>
            <FeelingGrid>
              <div>
                <FeelingTitle>La casa funciona sola</FeelingTitle>
                <FeelingText>
                  Confort sin esfuerzo. Integración discreta y tecnología que se
                  adapta a tu ritmo, no al revés. Una experiencia completa de
                  control, luz y privacidad.
                </FeelingText>
              </div>

              <FeelingPanel>
                <FeelingImage
                  src={automatizacionPackImg}
                  alt="Automatización residencial discreta y elegante"
                />
              </FeelingPanel>
            </FeelingGrid>
          </Section>

          {/* SECTION 3: FULL HOME PREVIEW (NO DETAILS) */}
          <Section>
            <Kicker>Automatización integral</Kicker>
            <H2>Una solución completa, hecha a medida</H2>
            <PreviewRow>
              <PreviewCard>
                <PreviewTitle>Automatización integral</PreviewTitle>
                <PreviewText>
                  Un sistema que coordina cortinas, persianas, toldos y luz para
                  que todo funcione en armonía. Instalación profesional, ajustes
                  finos y un resultado que se siente desde el primer día.
                </PreviewText>

                <PriceHint>
                  Inversión orientativa desde <span>~3.500€</span>
                </PriceHint>

                <SoftLinkRow>
                  <SoftLink to="/automatizacion/completa">
                    Ver cómo funciona
                  </SoftLink>
                  <GhostLink to="/contact">Asesoramiento privado</GhostLink>
                </SoftLinkRow>
              </PreviewCard>

              {/* Keep estimate but make it optional/full-bleed for now */}
              {/* <div>
                <FullBleed>
                  <AutomatizacionEstimate
                    kicker="Orientativo"
                    priceText="Desde"
                    priceValue="~3.500€"
                    description="Un sistema completo para automatizar varios elementos (por ejemplo, cortinas + persianas + toldo) puede comenzar desde aproximadamente esa cifra, según medidas, tejidos y número de motores."
                    imageSrc={automatizacionPackImg}
                    imageAlt="Ejemplo de automatización: luz, toldo, persianas, cortinas y control desde el móvil"
                    items={[
                      {
                        icon: "toldo",
                        strong: "Toldo motorizado",
                        text: "Control por mando/app (según medidas)",
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
                        text: "Configuración incluida",
                      },
                      {
                        icon: "instalacion",
                        strong: "Instalación certificada",
                        text: "Puesta en marcha",
                      },
                    ]}
                    finePrint="*El precio final depende de medidas, tejidos elegidos, número de motores y si se añaden sensores."
                  />
                </FullBleed>
              </div> */}
            </PreviewRow>
          </Section>

          {/* SECTION 4: INDIVIDUAL AUTOMATION */}
          <Section>
            <Kicker>Automatización individual</Kicker>
            <H2>Automatiza lo que tiene sentido en tu hogar</H2>
            <Lead>
              No todos los hogares necesitan lo mismo. Puedes empezar por una
              zona concreta y ampliar cuando quieras.
            </Lead>

            <Cards>
              <AutoCard to="/automatizacion/individual#cortinas">
                <AutoCardTop>
                  <AutoCardTitle>Cortinas & estores</AutoCardTitle>
                  <AutoCardText>
                    Caída perfecta, silencio absoluto y control preciso de la
                    luz interior.
                  </AutoCardText>
                  <AutoCardCta>Descubrir</AutoCardCta>
                </AutoCardTop>
                <AutoCardMedia />
              </AutoCard>

              <AutoCard to="/automatizacion/individual#persianas">
                <AutoCardTop>
                  <AutoCardTitle>Persianas & screens</AutoCardTitle>
                  <AutoCardText>
                    Control solar, privacidad y confort térmico sin renunciar al
                    diseño.
                  </AutoCardText>
                  <AutoCardCta>Descubrir</AutoCardCta>
                </AutoCardTop>
                <AutoCardMedia />
              </AutoCard>

              <AutoCard to="/automatizacion/individual#toldos">
                <AutoCardTop>
                  <AutoCardTitle>Toldos & exterior</AutoCardTitle>
                  <AutoCardText>
                    Protección inteligente con sensores de sol, viento y clima.
                  </AutoCardText>
                  <AutoCardCta>Descubrir</AutoCardCta>
                </AutoCardTop>
                <AutoCardMedia />
              </AutoCard>
            </Cards>
          </Section>

          {/* SECTION 5: BENEFITS */}
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
                    <BenefitTitle>Luz que acompaña el día</BenefitTitle>
                    <BenefitParagraph>
                      A medida que el sol avanza, persianas, toldos y cortinas
                      se regulan automáticamente para dejar pasar la cantidad
                      justa de luz. Confort visual, sin deslumbramientos.
                    </BenefitParagraph>
                  </BenefitText>

                  <BenefitImage src={benefit1} alt="Luz natural regulada" />
                </BenefitRow>

                <BenefitRow $reverse>
                  <BenefitText>
                    <BenefitTitle>Tranquilidad estés donde estés</BenefitTitle>
                    <BenefitParagraph>
                      Controla tu hogar desde el móvil y simula presencia real
                      cuando no estás en casa. Una sensación de calma, incluso
                      durante tus vacaciones.
                    </BenefitParagraph>
                  </BenefitText>

                  <BenefitImage
                    src={vacaciones}
                    alt="Control del hogar durante vacaciones"
                  />
                </BenefitRow>

                <BenefitRow>
                  <BenefitText>
                    <BenefitTitle>Rutinas que se adaptan a ti</BenefitTitle>
                    <BenefitParagraph>
                      Define horarios según tu día a día o la estación del año.
                      La casa se ajusta sola. Tú solo lo disfrutas.
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

          {/* SECTION 6: PROCESS */}
          <Section>
            <Kicker>Proceso</Kicker>
            <H2>Cómo trabajamos</H2>
            <Lead>
              Una experiencia sencilla, cuidada y sin sorpresas: desde la
              medición hasta la puesta en marcha.
            </Lead>

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
