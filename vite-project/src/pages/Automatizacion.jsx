import styled from "styled-components";

/* =========================
   ASSETS
========================= */
import benefit1 from "../assets/Automatizacion/benefit1.png";
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
   HERO
========================= */

const Hero = styled.section`
  position: relative;
  min-height: 78vh;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding: 6.5rem 2rem 5.5rem;
  overflow: hidden;

  @media (max-width: 768px) {
    min-height: 72vh;
    padding: 5.5rem 1.5rem 4.2rem;
  }
`;

const HeroVideo = styled.video`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 25%;
  filter: saturate(0.95) contrast(1.05);
  transform: scale(1.02);
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
   BENEFITS SECTION (INSPIRED BY SISMART)
========================= */

const BenefitsSection = styled.section`
  background: #ffffff;
  color: #111;
  padding: 6rem 2rem;

  @media (max-width: 768px) {
    padding: 4rem 1.5rem;
  }
`;

const BenefitsInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  gap: 6rem;
`;

const BenefitRow = styled.div`
  display: grid;
  gap: 3rem;
  align-items: center;

  @media (min-width: 900px) {
    grid-template-columns: ${({ reverse }) =>
      reverse ? "1fr 1fr" : "1fr 1fr"};
    direction: ${({ reverse }) => (reverse ? "rtl" : "ltr")};
  }
`;

const BenefitText = styled.div`
  direction: ltr;
`;

const BenefitTitle = styled.h3`
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 1.7rem;
  }
`;

const BenefitParagraph = styled.p`
  font-size: 1.05rem;
  line-height: 1.8;
  color: #444;
  max-width: 48ch;
`;

const BenefitImage = styled.img`
  width: 100%;
  border-radius: 22px;
  object-fit: cover;
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.18);
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
                A medida que el sol avanza, tus persianas y cortinas se regulan
                automáticamente para dejar pasar la cantidad justa de luz.
                Confort visual, sin deslumbramientos, desde el primer momento
                del día.
              </BenefitParagraph>
            </BenefitText>

            <BenefitImage
              src={benefit1}
              alt="Luz natural entrando por cortinas"
            />
          </BenefitRow>

          {/* BENEFIT 2 */}
          <BenefitRow reverse>
            <BenefitText>
              <BenefitTitle>
                Haz creer que estás en casa cuando estés fuera
              </BenefitTitle>
              <BenefitParagraph>
                Simula presencia real subiendo y bajando persianas de forma
                automática. Una capa extra de seguridad que actúa incluso cuando
                estás de vacaciones.
              </BenefitParagraph>
            </BenefitText>

            <BenefitImage
              src="https://images.unsplash.com/photo-1520975916090-3105956dac38"
              alt="Persona relajada de vacaciones"
            />
          </BenefitRow>

          {/* BENEFIT 3 */}
          <BenefitRow>
            <BenefitText>
              <BenefitTitle>
                Controla tu hogar desde cualquier lugar
              </BenefitTitle>
              <BenefitParagraph>
                Desde el móvil puedes subir, bajar o ajustar todas tus
                persianas, estés donde estés. Incluso antes de llegar a casa,
                todo puede estar preparado para ti.
              </BenefitParagraph>
            </BenefitText>

            <BenefitImage
              src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc"
              alt="Control desde el móvil"
            />
          </BenefitRow>

          {/* BENEFIT 4 */}
          <BenefitRow reverse>
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
              src="https://images.unsplash.com/photo-1505691938895-1758d7feb511"
              alt="Dormitorio tranquilo con luz suave"
            />
          </BenefitRow>
        </BenefitsInner>
      </BenefitsSection>
    </Page>
  );
}
