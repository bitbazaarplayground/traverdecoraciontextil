// src/components/CortinasEstores/ComplementosVentana.jsx
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import domoticaControl from "../../assets/Automatizacion/heroB.webp";
import panelJaponesImg from "../../assets/panelJapones/bedroomDarkPanel.webp";
import mosquiteraPatio from "../../assets/servicios/mosquiteras/mosquiteraPatio.webp";
import venecianasImg from "../../assets/venecianas/oficina2.webp";

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.06, ease: "easeOut" },
  }),
};
const STORAGE_KEY = "scroll-positions:v4";

const saveScrollNow = () => {
  try {
    const store = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || "{}");
    const k =
      window.location.pathname + window.location.search + window.location.hash;

    store[k] = window.scrollY;
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  } catch {}
};

export default function ComplementosVentana({ id = "sistemas" }) {
  const items = [
    {
      title: "Panel japonés",
      desc: "Ideal para puertas correderas y grandes ventanales.",
      img: panelJaponesImg,
      to: "/panel-japones",
    },
    {
      title: "Venecianas",
      desc: "Control solar preciso con privacidad regulable.",
      img: venecianasImg,
      to: "/venecianas",
    },
    {
      title: "Automatización",
      desc: "Sistemas motorizados y control inteligente del hogar.",
      img: domoticaControl,
      to: "/automatizacion",
    },
    {
      title: "Mosquiteras",
      desc: "Ventila sin insectos. Discretas y resistentes.",
      img: mosquiteraPatio,
      to: "/mosquiteras",
    },
  ];

  return (
    <Section id={id} aria-label="Accesos rápidos a otros productos">
      <Container>
        <Top>
          <Heading>
            <Kicker>Accesos rápidos</Kicker>
            <Title>Otros productos para tu ventana</Title>
          </Heading>

          <Hint>
            Desliza en móvil <span aria-hidden="true">→</span>
          </Hint>
        </Top>

        <Cards
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
        >
          {items.map((it, i) => (
            <Card key={it.title} as={motion.div} variants={fadeUp} custom={i}>
              <CardLink
                to={it.to}
                aria-label={`Ver ${it.title}`}
                onClick={saveScrollNow}
              >
                <Media>
                  <Img src={it.img} alt={it.title} loading="lazy" />
                  <Overlay />
                </Media>

                <Body>
                  <CardTitle>{it.title}</CardTitle>
                  <CardDesc>{it.desc}</CardDesc>

                  <More>
                    Ver más <ArrowRight size={16} />
                  </More>
                </Body>

                {/* Fancy micro-interaction layer */}
                <Sheen aria-hidden="true" />
              </CardLink>
            </Card>
          ))}
        </Cards>
      </Container>
    </Section>
  );
}

/* =========================
   STYLES
========================= */

const Section = styled.section`
  padding: 2.75rem 1.25rem;
  background: #fff;
  border-top: 1px solid rgba(17, 17, 17, 0.08);

  @media (max-width: 768px) {
    padding: 2.25rem 1.1rem;
  }
`;

const Container = styled.div`
  max-width: 1120px;
  margin: 0 auto;
`;

const Top = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.15rem;

  @media (max-width: 768px) {
    align-items: flex-start;
    flex-direction: column;
    margin-bottom: 0.95rem;
  }
`;

const Heading = styled.div``;

const Kicker = styled.p`
  margin: 0 0 0.45rem 0;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  font-size: 0.82rem;
  color: rgba(17, 17, 17, 0.6);
`;

const Title = styled.h2`
  margin: 0;
  font-size: 1.55rem;
  line-height: 1.15;
  letter-spacing: -0.015em;
  color: rgba(17, 17, 17, 0.95);

  @media (max-width: 768px) {
    font-size: 1.35rem;
  }
`;

const Hint = styled.p`
  margin: 0;
  font-size: 0.92rem;
  color: rgba(17, 17, 17, 0.55);

  span {
    display: inline-block;
    transform: translateY(1px);
  }

  @media (min-width: 769px) {
    display: none;
  }
`;

const Cards = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.9rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  /* Mobile: swipeable row */
  @media (max-width: 768px) {
    grid-template-columns: unset;
    display: flex;
    gap: 0.85rem;
    overflow-x: auto;
    padding-bottom: 0.35rem;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;

    /* hide scrollbar (best effort) */
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

const Card = styled.div`
  @media (max-width: 768px) {
    min-width: 78%;
    scroll-snap-align: start;
  }
`;

const CardLink = styled(Link)`
  position: relative;
  display: block;
  border-radius: 18px;
  overflow: hidden;
  text-decoration: none;

  border: 1px solid rgba(17, 17, 17, 0.1);
  background: #fff;
  box-shadow: 0 12px 30px rgba(17, 17, 17, 0.06);

  transition: transform 220ms ease, box-shadow 220ms ease,
    border-color 220ms ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 16px 44px rgba(17, 17, 17, 0.09);
    border-color: rgba(17, 17, 17, 0.14);
  }

  &:active {
    transform: translateY(0px);
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 4px rgba(0, 0, 0, 0.1), 0 12px 30px rgba(17, 17, 17, 0.06);
  }
`;

const Media = styled.div`
  position: relative;
  height: 130px;

  @media (max-width: 768px) {
    height: 150px;
  }
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  transform: scale(1.01);
  transition: transform 700ms ease;

  ${CardLink}:hover & {
    transform: scale(1.06);
  }
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.22));
`;

const Badge = styled.span`
  position: absolute;
  top: 10px;
  left: 10px;

  padding: 0.35rem 0.6rem;
  border-radius: 999px;

  background: rgba(255, 255, 255, 0.85);
  border: 1px solid rgba(17, 17, 17, 0.1);
  color: rgba(17, 17, 17, 0.78);
  font-size: 0.78rem;
  font-weight: 750;
`;

const Body = styled.div`
  padding: 0.95rem 0.95rem 1.05rem;

  display: grid;
  gap: 0.35rem;
`;

const CardTitle = styled.h3`
  margin: 0;
  font-size: 1.05rem;
  letter-spacing: -0.01em;
  color: rgba(17, 17, 17, 0.95);
`;

const CardDesc = styled.p`
  margin: 0;
  font-size: 0.92rem;
  line-height: 1.5;
  color: rgba(17, 17, 17, 0.62);
`;

const More = styled.div`
  margin-top: 0.25rem;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;

  font-weight: 800;
  font-size: 0.92rem;
  color: rgba(17, 17, 17, 0.9);

  svg {
    transition: transform 200ms ease;
  }

  ${CardLink}:hover & svg {
    transform: translateX(3px);
  }
`;

/* Fancy micro-interaction: subtle moving sheen */
const Sheen = styled.div`
  position: absolute;
  inset: -40% -60%;
  background: linear-gradient(
    120deg,
    transparent 35%,
    rgba(255, 255, 255, 0.32) 45%,
    transparent 55%
  );
  transform: translateX(-30%) rotate(10deg);
  opacity: 0;
  pointer-events: none;
  transition: opacity 250ms ease;

  ${CardLink}:hover & {
    opacity: 1;
    animation: sheenMove 900ms ease forwards;
  }

  @keyframes sheenMove {
    from {
      transform: translateX(-30%) rotate(10deg);
    }
    to {
      transform: translateX(30%) rotate(10deg);
    }
  }
`;
