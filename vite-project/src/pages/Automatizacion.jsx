import { useState } from "react";
import styled from "styled-components";

/* =========================
   MODES
========================= */

const MODES = {
  sun: {
    label: "☀️ Modo Sol",
    description:
      "Cuando hay mucha luz, las cortinas o estores se ajustan automáticamente para proteger del deslumbramiento y mantener el confort.",
  },
  night: {
    label: "🌙 Modo Noche",
    description:
      "Al caer la noche, el sistema cierra las cortinas para aportar privacidad y crear un ambiente más acogedor.",
  },
  heat: {
    label: "🌬️ Modo Calor",
    description:
      "En días calurosos, los toldos se despliegan para reducir la entrada de calor y mantener una temperatura agradable.",
  },
  mobile: {
    label: "📱 Control desde el móvil",
    description:
      "Controla cortinas y toldos manualmente desde tu móvil, estés donde estés, con total comodidad.",
  },
};

/* =========================
   SECTION
========================= */

const Section = styled.section`
  width: 100%;
  padding: 4rem 1.5rem;

  @media (max-width: 768px) {
    padding: 3rem 1rem;
  }
`;

const Container = styled.div`
  max-width: 1100px;
  margin: 0 auto;
`;

/* =========================
   HEADER
========================= */

const Header = styled.div`
  max-width: 720px;
  margin-bottom: 3.5rem;
`;

const Title = styled.h1`
  font-size: 2.6rem;
  font-weight: 600;
  color: #222;
  margin-bottom: 1rem;

  span {
    color: ${({ theme }) => theme.colors.primary};
  }

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Intro = styled.p`
  font-size: 1.05rem;
  line-height: 1.7;
  color: #555;
`;

/* =========================
   INTERACTIVE DEMO
========================= */

const DemoSection = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 3rem;
  align-items: center;
  margin-bottom: 4rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const DemoVisual = styled.div`
  height: 360px;
  border-radius: 18px;
  background: linear-gradient(135deg, #f2f2f2, #e9e9e9);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  font-size: 1rem;
  text-align: center;
`;

const Controls = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const ControlButton = styled.button`
  padding: 0.9rem 1.2rem;
  border-radius: 12px;
  border: 1px solid #e2e2e2;
  background: #fff;
  font-size: 0.95rem;
  text-align: left;
  cursor: pointer;
  transition: all 0.25s ease;

  &[data-active="true"] {
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
    background: rgba(255, 105, 180, 0.05);
  }

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const ControlHint = styled.p`
  font-size: 0.9rem;
  color: #666;
`;

/* =========================
   EXPLANATION
========================= */

const Explanation = styled.div`
  max-width: 800px;
  margin-bottom: 4rem;
`;

const ExplanationTitle = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  color: #222;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 1.6rem;
  }
`;

const ExplanationText = styled.p`
  font-size: 1rem;
  line-height: 1.7;
  color: #555;
`;

/* =========================
   CTA
========================= */

const CTA = styled.div`
  padding: 3rem;
  border-radius: 22px;
  background: #fafafa;
  text-align: center;
`;

const CTAButton = styled.a`
  display: inline-block;
  margin-top: 1.2rem;
  padding: 0.9rem 2.2rem;
  border-radius: 40px;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  font-weight: 600;
  text-decoration: none;
  transition: opacity 0.25s ease, transform 0.25s ease;

  &:hover {
    opacity: 0.85;
    transform: translateY(-2px);
  }
`;

const Window = styled.div`
  width: 110px;
  height: 130px;
  border-radius: 10px;
  background: #ffffff;
  border: 2px solid #ddd;
  position: relative;
  overflow: hidden;
`;

const Blind = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, #e0e0e0, #cfcfcf);
  transform: translateY(0%);
  transition: transform 0.8s ease;

  /* ☀️ Sun / 🌬️ Heat → blinds partially down */
  &[data-mode="sun"],
  &[data-mode="heat"] {
    transform: translateY(40%);
  }

  /* 🌙 Night → blinds fully down */
  &[data-mode="night"] {
    transform: translateY(0%);
  }

  /* 📱 Mobile → custom position */
  &[data-mode="mobile"] {
    transform: translateY(20%);
  }
`;
// const Awning = styled.div`
//   position: absolute;
//   top: 20px;
//   left: 50%;
//   transform: translateX(-50%);
//   width: 140px;
//   height: 12px;
//   background: #444;
//   border-radius: 6px;
//   overflow: visible;

//   /* Default: retracted */
//   &[data-mode="sun"],
//   &[data-mode="night"],
//   &[data-mode="mobile"] {
//     .awning-fabric {
//       transform: scaleX(0);
//     }
//   }

//   /* 🌬️ Heat → extend awning */
//   &[data-mode="heat"] {
//     .awning-fabric {
//       transform: scaleX(1);
//     }
//   }
// `;
const Awning = styled.div`
  position: absolute;
  top: 14px;
  left: 50%;
  transform: translateX(-50%);
  width: 140px;
  height: 12px;
  background: #444;
  border-radius: 6px;
  overflow: visible;

  &[data-mode="heat"] .awning-fabric {
    transform: scaleX(1);
  }

  &:not([data-mode="heat"]) .awning-fabric {
    transform: scaleX(0);
  }
`;

const AwningFabric = styled.div.attrs({
  className: "awning-fabric",
})`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  height: 60px;
  background: linear-gradient(to bottom, #d8d8d8, #bcbcbc);
  transform-origin: top;
  transform: scaleX(0);
  transition: transform 0.8s ease;
  border-radius: 0 0 10px 10px;
`;
const House = styled.div`
  width: 260px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Roof = styled.div`
  width: 0;
  height: 0;
  border-left: 150px solid transparent;
  border-right: 150px solid transparent;
  border-bottom: 80px solid #e0e0e0;
`;
const Building = styled.div`
  width: 260px;
  height: 180px;
  background: #f7f7f7;
  border-radius: 0 0 18px 18px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const WindowsRow = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 14px;
`;

const Door = styled.div`
  width: 48px;
  height: 70px;
  background: #e3e3e3;
  border-radius: 6px 6px 4px 4px;
  border: 2px solid #d0d0d0;
`;

/* =========================
   COMPONENT
========================= */

export default function Automatizacion() {
  const [activeMode, setActiveMode] = useState("sun");

  return (
    <Section>
      <Container>
        {/* HEADER */}
        <Header>
          <Title>
            Automatización del <span>hogar</span>
          </Title>
          <Intro>
            Controla cortinas, estores y toldos de forma automática para que tu
            hogar se adapte a la luz, el clima y tu rutina diaria, sin esfuerzo.
          </Intro>
        </Header>

        {/* DEMO */}
        <DemoSection>
          <DemoVisual>
            <House>
              <Roof />
              <Building>
                <Awning data-mode={activeMode}>
                  <AwningFabric />
                </Awning>

                <WindowsRow>
                  <Window>
                    <Blind data-mode={activeMode} />
                  </Window>

                  <Window>
                    <Blind data-mode={activeMode} />
                  </Window>
                </WindowsRow>

                <Door />
              </Building>
            </House>
          </DemoVisual>

          <Controls>
            <ControlButton
              onClick={() => setActiveMode("sun")}
              data-active={activeMode === "sun"}
            >
              ☀️ Cuando sale el sol
            </ControlButton>

            <ControlButton
              onClick={() => setActiveMode("night")}
              data-active={activeMode === "night"}
            >
              🌙 Al caer la noche
            </ControlButton>

            <ControlButton
              onClick={() => setActiveMode("heat")}
              data-active={activeMode === "heat"}
            >
              🌬️ Días de calor
            </ControlButton>

            <ControlButton
              onClick={() => setActiveMode("mobile")}
              data-active={activeMode === "mobile"}
            >
              📱 Control manual desde el móvil
            </ControlButton>

            <ControlHint>{MODES[activeMode].description}</ControlHint>
          </Controls>
        </DemoSection>

        {/* EXPLANATION */}
        <Explanation>
          <ExplanationTitle>
            Tecnología pensada para el día a día
          </ExplanationTitle>
          <ExplanationText>
            Trabajamos con sistemas de automatización fiables y contrastados,
            como Somfy, integrados de forma discreta en tu hogar. Nuestro equipo
            se encarga del asesoramiento, la instalación y la configuración para
            que todo funcione de manera sencilla y natural.
          </ExplanationText>
        </Explanation>

        {/* CTA */}
        <CTA>
          <h3>¿Te gustaría automatizar tu hogar?</h3>
          <p>
            Te asesoramos sin compromiso para encontrar la mejor solución según
            tu espacio y necesidades.
          </p>
          <CTAButton href="/contacto">Solicitar información</CTAButton>
        </CTA>
      </Container>
    </Section>
  );
}
