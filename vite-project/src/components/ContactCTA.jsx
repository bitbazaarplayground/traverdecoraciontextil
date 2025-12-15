import { motion } from "framer-motion";
import styled from "styled-components";
import Img4 from "../assets/img4.png";

const Section = styled.section`
  width: 100%;
  position: relative;
  padding: 6rem 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: left;
  overflow: hidden;

  background-image: url(${Img4});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  @media (max-width: 768px) {
    padding: 4rem 1.5rem;
    text-align: center;
  }

  /* Dark overlay tint */
  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.55); /* adjust tint here */
    z-index: 1;
  }
`;

const Content = styled.div`
  position: relative;
  z-index: 2;
  max-width: 700px;
  color: white;

  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const HeadingSmall = styled.h4`
  font-size: 0.95rem;
  letter-spacing: 2px;
  font-weight: 500;
  opacity: 0.9;
  text-transform: uppercase;
`;

const HeadingLarge = styled.h2`
  font-size: 2.4rem;
  font-weight: 600;
  line-height: 1.25;

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const CTAButton = styled(motion.a)`
  display: inline-block;
  margin-top: 1rem;
  padding: 0.9rem 2.2rem;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  font-weight: 600;
  font-size: 1.1rem;
  border-radius: 40px;
  text-decoration: none;
  cursor: pointer;

  transition: opacity 0.25s ease, transform 0.25s ease;

  &:hover {
    opacity: 0.85;
    transform: translateY(-2px);
  }
`;

export default function ContactCTA() {
  return (
    <Section>
      <Content>
        <HeadingSmall>
          EQUIPO DE DISEÑO Y ATENCIÓN AL CLIENTE DE PRIMERA
        </HeadingSmall>

        <HeadingLarge>
          Nos encargamos de todo:
          <br /> diseño, medición e instalación.
        </HeadingLarge>

        <CTAButton
          href="#contact"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          Reserva Ahora
        </CTAButton>
      </Content>
    </Section>
  );
}
