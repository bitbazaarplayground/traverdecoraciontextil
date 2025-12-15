import { useState } from "react";
import styled from "styled-components";

/* =========================
   STATE
========================= */

const HOTSPOTS = {
  awning: {
    title: "Toldos automatizados",
    description:
      "Los toldos se despliegan o recogen automáticamente según el sol, el viento o la lluvia para proteger tu hogar y alargar su vida útil.",
  },
  blind: {
    title: "Estores y persianas",
    description:
      "Los estores regulan la entrada de luz de forma inteligente para mantener el confort térmico y visual durante todo el día.",
  },
  curtain: {
    title: "Cortinas interiores",
    description:
      "Las cortinas pueden abrirse o cerrarse automáticamente para aportar privacidad y crear el ambiente perfecto en cada momento.",
  },
};

/* =========================
   LAYOUT
========================= */

const Section = styled.section`
  width: 100%;
  padding: 4rem 1.5rem;
  background: #fafafa;
`;

const Container = styled.div`
  max-width: 1100px;
  margin: 0 auto;
`;

const Title = styled.h2`
  font-size: 2.4rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #222;
`;

const Intro = styled.p`
  max-width: 700px;
  font-size: 1.05rem;
  line-height: 1.7;
  color: #555;
  margin-bottom: 3rem;
`;

/* =========================
   DEMO AREA
========================= */

const Demo = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 3rem;
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

/* =========================
   HOUSE SKETCH
========================= */

const HouseWrapper = styled.div`
  position: relative;
  height: 360px;
  background: #f1f1f1;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const House = styled.div`
  width: 260px;
`;

const Roof = styled.div`
  width: 0;
  height: 0;
  border-left: 150px solid transparent;
  border-right: 150px solid transparent;
  border-bottom: 80px solid #dedede;
  margin: 0 auto;
`;

const Building = styled.div`
  width: 260px;
  height: 180px;
  background: #ffffff;
  border-radius: 0 0 18px 18px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Windows = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 14px;
`;

const Window = styled.div`
  width: 90px;
  height: 110px;
  border-radius: 8px;
  border: 2px solid #ddd;
  background: #fafafa;
  position: relative;
  overflow: hidden;
`;

const Blind = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(#e0e0e0, #cfcfcf);
  transform: ${({ active }) =>
    active === "blind" ? "translateY(0%)" : "translateY(40%)"};
  transition: transform 0.6s ease;
`;

const Curtain = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(200, 200, 200, 0.6);
  opacity: ${({ active }) => (active === "curtain" ? 1 : 0)};
  transition: opacity 0.6s ease;
`;

const Door = styled.div`
  width: 48px;
  height: 70px;
  background: #e3e3e3;
  border-radius: 6px;
  border: 2px solid #d0d0d0;
`;

const Awning = styled.div`
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  width: 140px;
  height: 10px;
  background: #444;
  border-radius: 6px;
`;

const AwningFabric = styled.div`
  width: 140px;
  height: ${({ active }) => (active === "awning" ? "60px" : "0px")};
  background: linear-gradient(#d8d8d8, #bcbcbc);
  border-radius: 0 0 10px 10px;
  transition: height 0.6s ease;
`;

/* =========================
   HOTSPOTS
========================= */

const Hotspot = styled.button`
  position: absolute;
  background: ${({ active, theme }) =>
    active ? theme.colors.primary : "#fff"};
  color: ${({ active }) => (active ? "#fff" : "#333")};
  border: 2px solid ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  width: 36px;
  height: 36px;
  cursor: pointer;
  font-weight: 600;
`;

const HotspotAwning = styled(Hotspot)`
  top: 60px;
  left: 50%;
  transform: translateX(-50%);
`;

const HotspotBlind = styled(Hotspot)`
  top: 160px;
  left: 40%;
`;

const HotspotCurtain = styled(Hotspot)`
  top: 160px;
  right: 40%;
`;

/* =========================
   INFO PANEL
========================= */

const InfoPanel = styled.div`
  background: #fff;
  padding: 2rem;
  border-radius: 18px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.06);
`;

const InfoTitle = styled.h3`
  font-size: 1.4rem;
  margin-bottom: 0.8rem;
`;

const InfoText = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: #555;
`;

/* =========================
   COMPONENT
========================= */

export default function AutomatizacionHotspots() {
  const [active, setActive] = useState("awning");

  return (
    <Section>
      <Container>
        <Title>Cómo funciona la automatización</Title>
        <Intro>
          Descubre de forma sencilla cómo los diferentes elementos de tu hogar
          pueden funcionar de manera automática para mejorar el confort, la
          eficiencia y la tranquilidad.
        </Intro>

        <Demo>
          <HouseWrapper>
            <House>
              <Roof />
              <Building>
                <Awning />
                <AwningFabric active={active} />

                <Windows>
                  <Window>
                    <Blind active={active} />
                    <Curtain active={active} />
                  </Window>
                  <Window>
                    <Blind active={active} />
                    <Curtain active={active} />
                  </Window>
                </Windows>

                <Door />
              </Building>
            </House>

            <HotspotAwning
              onClick={() => setActive("awning")}
              active={active === "awning"}
            >
              1
            </HotspotAwning>

            <HotspotBlind
              onClick={() => setActive("blind")}
              active={active === "blind"}
            >
              2
            </HotspotBlind>

            <HotspotCurtain
              onClick={() => setActive("curtain")}
              active={active === "curtain"}
            >
              3
            </HotspotCurtain>
          </HouseWrapper>

          <InfoPanel>
            <InfoTitle>{HOTSPOTS[active].title}</InfoTitle>
            <InfoText>{HOTSPOTS[active].description}</InfoText>
          </InfoPanel>
        </Demo>
      </Container>
    </Section>
  );
}
