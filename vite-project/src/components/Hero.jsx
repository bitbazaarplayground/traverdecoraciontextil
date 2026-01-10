import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import styled from "styled-components";
import heroImg from "../assets/Hero.webp";

const HeroWrapper = styled.section`
  width: 100%;
  min-height: 58vh;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;

  padding: 6.5rem 2rem 5.2rem;

  @media (max-width: 768px) {
    min-height: 52vh;
    padding: 5.5rem 1.25rem 4.2rem;
  }
`;

const ParallaxTexture = styled(motion.div)`
  position: absolute;
  inset: 0;
  background-image: url(${heroImg});
  background-size: cover;
  background-position: center;
  transform: scale(1.03);
  z-index: 0;
`;

/* Luxury overlay: depth without “too dark” */
const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: radial-gradient(
      900px 520px at 30% 35%,
      rgba(0, 0, 0, 0.18),
      rgba(0, 0, 0, 0.66)
    ),
    linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.25) 0%,
      rgba(0, 0, 0, 0.68) 70%,
      rgba(0, 0, 0, 0.75) 100%
    );
  z-index: 1;
`;
const Content = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  color: #fff;
  text-align: center;
`;

const Eyebrow = styled(motion.p)`
  margin: 0 0 0.9rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.72);
`;

const Title = styled(motion.h1)`
  font-size: 3.75rem;
  font-weight: 650;
  letter-spacing: -0.6px;
  line-height: 1.03;
  margin: 0 0 1.1rem 0;
  color: #fff;

  span {
    color: ${({ theme }) => theme.colors.primary};
  }

  @media (max-width: 768px) {
    font-size: 2.55rem;
    line-height: 1.08;
  }
`;

const Subtitle = styled(motion.p)`
  max-width: 62ch;
  margin: 0 auto;
  font-size: 1.15rem;
  line-height: 1.75;
  color: rgba(255, 255, 255, 0.82);

  @media (max-width: 768px) {
    font-size: 1.02rem;
  }
`;

const Actions = styled(motion.div)`
  margin-top: 2.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
`;

const PrimaryButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.95rem 2.2rem;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.primary};
  color: #0b0c0f;
  font-weight: 800;
  text-decoration: none;
  transition: transform 0.25s ease, opacity 0.25s ease;

  &:hover {
    opacity: 0.92;
    transform: translateY(-1px);
  }
`;

const SecondaryButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.95rem 2.05rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.14);
  color: rgba(255, 255, 255, 0.9);
  font-weight: 650;
  text-decoration: none;
  transition: transform 0.25s ease, background 0.25s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.11);
    transform: translateY(-1px);
  }
`;

const MicroLine = styled(motion.p)`
  margin-top: 1.35rem;
  font-size: 0.95rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.62);
`;

export default function Hero() {
  return (
    <HeroWrapper>
      <ParallaxTexture
        animate={{ scale: [1.03, 1.06, 1.03], x: [0, -10, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <Overlay />

      <Content>
        <Eyebrow
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Decoración textil · Protección solar · Somfy
        </Eyebrow>

        <Title
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.95 }}
        >
          Traver <span>Decoración</span> Textil
        </Title>

        <Subtitle
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.05, delay: 0.12 }}
        >
          {/* Más de 30 años creando hogares con luz medida, confort real y un
          acabado impecable. Proyectos a medida en Castellón y Valencia. */}
          Más de 30 años Creando espacios que combinan confort, diseño y
          exclusividad. Proyectos a medida en Castellón y Valencia.
        </Subtitle>

        <Actions
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.22 }}
        >
          <PrimaryButton to="/contact">Solicitar asesoramiento</PrimaryButton>
          <SecondaryButton to="/services">Ver servicios</SecondaryButton>
        </Actions>

        <MicroLine
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.0, delay: 0.35 }}
        >
          Medición · Confección · Instalación. Un equipo propio, marcas líderes
          y un proceso cuidado de principio a fin.
        </MicroLine>
      </Content>
    </HeroWrapper>
  );
}
