import styled from "styled-components";

/* =========================
   ASSETS
========================= */
import benefit1 from "../assets/Automatizacion/benefit1.png";
import programaHorarios from "../assets/Automatizacion/programa.png";
import vacaciones from "../assets/Automatizacion/vacaciones.png";
import heroVideo from "../assets/video1.mp4";
// CHANGE

// VOICE COMMAND ICONS
import domoticaControl from "../assets/Automatizacion/domotica1.png";

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
  margin-top: 0.5rem;

  @media (max-width: 768px) {
    margin-top: 1.5rem;
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
  object-position: center top; /* 👈 KEY LINE */
  transform: scale(1.08); /* 👈 OPTIONAL, PREMIUM */
  filter: saturate(0.95) contrast(1.05);
  z-index: 0;
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
   CONTROL AT A GLANCE
========================= */

// const ControlAtGlance = styled.section`
//   background: linear-gradient(
//       rgba(255, 255, 255, 0.88),
//       rgba(255, 255, 255, 0.88)
//     ),
//     url(${zebraBg});
//   color: #111;
//   padding: 4.5rem 2rem;

//   @media (max-width: 768px) {
//     padding: 3.5rem 1.5rem;
//   }
// `;

// const ControlInner = styled.div`
//   max-width: 1100px;
//   margin: 0 auto;
//   text-align: center;
// `;

// const ControlTitle = styled.h2`
//   font-size: 2.2rem;
//   font-weight: 600;
//   margin-bottom: 2.2rem;

//   @media (max-width: 768px) {
//     font-size: 1.9rem;
//   }
// `;

// const ControlVisual = styled.div`
//   display: grid;
//   gap: 2.5rem;
//   align-items: center;

//   @media (min-width: 900px) {
//     grid-template-columns: 1fr 1fr 1fr;
//   }
// `;

// const ControlImage = styled.img`
//   width: 100%;
//   height: 260px;
//   object-fit: contain;
// `;

// const VoiceCommand = styled.div`
//   background: #f5f5f5;
//   border-radius: 999px;
//   padding: 0.7rem 1.4rem;
//   display: inline-block;
// `;

// const ControlFooter = styled.p`
//   margin-top: 2.2rem;
//   font-size: 0.95rem;
//   color: #666;
// `;

/* =========================
   CONTROL — IMPLIED (OPTION A)
========================= */

const ControlImpliedSection = styled.section`
  background: #ffffff;
  color: #111;
  padding: 5rem 2rem;

  @media (max-width: 768px) {
    padding: 3.5rem 1.5rem;
  }
`;

const ControlImpliedInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  gap: 2.8rem;
`;

const ControlImageWrapper = styled.div`
  width: 100%;
  border-radius: 26px;
  overflow: hidden;
`;

const ControlImage = styled.img`
  width: 100%;
  height: 520px;
  object-fit: cover;
  display: block;

  @media (max-width: 768px) {
    height: 360px;
  }
`;

const ControlCopy = styled.div`
  text-align: center;
`;

const ControlTitle = styled.h2`
  font-size: 2.3rem;
  font-weight: 600;
  margin-bottom: 0.6rem;

  @media (max-width: 768px) {
    font-size: 1.9rem;
  }
`;

const ControlSubtitle = styled.p`
  font-size: 1.05rem;
  line-height: 1.7;
  color: rgba(17, 17, 17, 0.65);
`;

/* =========================
   BENEFITS SECTION (COMPACT LUXURY)
========================= */

const BenefitsSection = styled.section`
  background: #ffffff;
  color: #111;
  padding: 4.5rem 2rem; /* ↓ reduced */

  @media (max-width: 768px) {
    padding: 3.2rem 1.5rem;
  }
`;

const BenefitsInner = styled.div`
  max-width: 1100px; /* ↓ slightly tighter */
  margin: 0 auto;
  display: grid;
  gap: 4rem; /* ↓ from 6rem */

  @media (max-width: 768px) {
    gap: 3rem;
  }
`;

const BenefitRow = styled.div`
  display: grid;
  gap: 2.2rem;
  align-items: center;
  padding-bottom: 3rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }

  @media (min-width: 900px) {
    grid-template-columns: 0.95fr 1.05fr;
    direction: ${({ $reverse }) => ($reverse ? "rtl" : "ltr")};
  }
`;

const BenefitText = styled.div`
  direction: ltr;
`;

const BenefitTitle = styled.h3`
  font-size: 1.75rem; /* ↓ slightly smaller */
  font-weight: 600;
  margin-bottom: 0.7rem;

  @media (max-width: 768px) {
    font-size: 1.55rem;
  }
`;

const BenefitParagraph = styled.p`
  font-size: 1rem; /* ↓ from 1.05 */
  line-height: 1.65; /* ↓ tighter */
  color: #444;
  max-width: 46ch;
`;

const BenefitImage = styled.img`
  width: 100%;
  height: 340px; /* 👈 KEY: constrain height */
  border-radius: 18px; /* ↓ slightly */
  object-fit: cover;
  box-shadow: 0 20px 55px rgba(0, 0, 0, 0.18);

  @media (max-width: 768px) {
    height: 260px;
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
            <PrimaryButton href="/contacto">
              Asesoramiento privado
            </PrimaryButton>
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
      {/* CONTROL — IMPLIED */}
      <ControlImpliedSection>
        <ControlImpliedInner>
          <ControlImageWrapper>
            <ControlImage
              src={domoticaControl}
              alt="Control inteligente del hogar con cortinas automatizadas"
            />
          </ControlImageWrapper>

          <ControlCopy>
            <ControlTitle>Siempre bajo tu control</ControlTitle>
            <ControlSubtitle>
              App, voz o control tradicional. La automatización se adapta a ti.
            </ControlSubtitle>
          </ControlCopy>
        </ControlImpliedInner>
      </ControlImpliedSection>

      {/* BENEFITS / USE CASES */}
      <BenefitsSection id="experiencia">
        <BenefitsInner>
          {/* BENEFIT 1 */}
          <BenefitRow>
            <BenefitText>
              <BenefitTitle>
                Ajusta tus persianas con la luz del día
              </BenefitTitle>
              <BenefitParagraph>
                A medida que el sol avanza, tus persianas, toldos y cortinas se
                regulan automáticamente para dejar pasar la cantidad justa de
                luz. Confort visual, sin deslumbramientos, desde el primer
                momento del día.
              </BenefitParagraph>
            </BenefitText>

            <BenefitImage
              src={benefit1}
              alt="Luz natural entrando por cortinas"
            />
          </BenefitRow>

          {/* BENEFIT 2 */}
          <BenefitRow $reverse>
            <BenefitText>
              <BenefitTitle>
                Controla tu hogar desde cualquier lugar
              </BenefitTitle>
              <BenefitParagraph>
                Controla persianas, toldos y cortinas desde el móvil, estés
                donde estés. Simula presencia real cuando no estás en casa y
                disfruta de una capa extra de seguridad y tranquilidad, incluso
                durante tus vacaciones.
              </BenefitParagraph>
            </BenefitText>

            <BenefitImage
              src={vacaciones}
              alt="Persona relajada de vacaciones"
            />
          </BenefitRow>

          {/* BENEFIT 3 */}
          <BenefitRow>
            <BenefitText>
              <BenefitTitle>
                Programa horarios que se adaptan a tu rutina
              </BenefitTitle>
              <BenefitParagraph>
                Define horarios de apertura y cierre según tu día a día o la
                estación del año. La casa se adapta a ti, no al revés.
              </BenefitParagraph>
            </BenefitText>

            <BenefitImage
              src={programaHorarios}
              alt="Dormitorio tranquilo con luz suave"
            />
          </BenefitRow>
        </BenefitsInner>
      </BenefitsSection>
    </Page>
  );
}
