import { motion } from "framer-motion";
import styled from "styled-components";
import zebraBg from "../assets/zebra_pattern.png";

const HeroWrapper = styled.section`
  width: 100%;
  height: 35vh; /* Your chosen height */
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
`;

const ParallaxBg = styled(motion.div)`
  position: absolute;
  inset: 0;
  background-image: url(${zebraBg});
  background-size: cover;
  background-position: center;
  z-index: 0;
  filter: brightness(45%); /* DARKEN BEFORE ADDING OVERLAY */
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.45); /* SOLID DARK SCRIM */
  z-index: 1;
`;

const Content = styled.div`
  position: relative;
  z-index: 2;
  padding: 0 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled(motion.h1)`
  font-size: 3rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary}; /* Pink text */
  margin-bottom: 0.5rem;
  letter-spacing: -0.6px;

  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 1.2rem;
  max-width: 550px;
  line-height: 1.6;
  color: white;
  opacity: 0.95;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

export default function Hero() {
  return (
    <HeroWrapper>
      <ParallaxBg
        animate={{
          scale: [1, 1.03, 1],
          x: [0, -10, 0],
        }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      <Overlay />

      <Content>
        <Title
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Traver Decoración Textil
        </Title>

        <Subtitle
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          Especialistas en decoración textil desde hace más de 30 años:
          cortinas, toldos, tapicerías, papeles pintados y motorización
          profesional.
        </Subtitle>
      </Content>
    </HeroWrapper>
  );
}
