import { motion } from "framer-motion";
import styled from "styled-components";
import heroImg from "../assets/Hero.webp";

const HeroWrapper = styled.section`
  width: 100%;
  height: 55vh;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  padding: 0 2rem;

  @media (max-width: 768px) {
    height: 45vh;
  }
`;

const ParallaxTexture = styled(motion.div)`
  position: absolute;
  inset: 0;
  background-image: url(${heroImg});
  background-size: cover;
  background-position: center;
  filter: brightness(28%) blur(1px); /* reduced blur */
  z-index: 0;
`;

const Content = styled.div`
  position: relative;
  z-index: 2;
  max-width: 1200px;
  margin: 0 auto;
  color: white;
`;

const Title = styled(motion.h1)`
  font-size: 4rem;
  font-weight: 600;
  letter-spacing: -0.5px;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.primary}; /* Pink brand color */

  @media (max-width: 768px) {
    font-size: 2.6rem;
  }
`;

const Subtitle = styled(motion.p)`
  max-width: 600px;
  font-size: 1.2rem;
  line-height: 1.7;
  opacity: 0.9;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

export default function Hero() {
  return (
    <HeroWrapper>
      {/* Parallax subtle motion */}
      <ParallaxTexture
        animate={{
          scale: [1, 1.03, 1],
          x: [0, -8, 0],
        }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />

      <Content>
        <Title
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
        >
          Traver Decoración Textil
        </Title>

        <Subtitle
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.2 }}
        >
          Creando espacios que combinan confort, diseño y exclusividad.
          Cortinas, toldos, tapicerías y soluciones textiles de alta calidad en
          Almazora.
        </Subtitle>
      </Content>
    </HeroWrapper>
  );
}
