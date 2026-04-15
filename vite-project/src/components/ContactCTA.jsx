import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import styled from "styled-components";
import Img4 from "../assets/img4.webp";
import { trackCtaClick, trackOpenQuickEnquiry } from "../lib/analytics";

const Section = styled.section`
  width: 100%;
  position: relative;
  padding: 4.5rem 2rem;
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
    padding: 3.4rem 1.5rem; /* reduce more on mobile */
    text-align: center;
  }

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.58); /* slightly stronger for contrast */
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
  margin: 0;

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

/* Stack container */
const FillWrap = styled.span`
  position: relative;
  display: inline-block;
`;

/* Base (light) text */
const LightText = styled.span`
  display: block;
  color: rgba(255, 255, 255, 0.22);
`;

/* Reveal viewport */
const RevealViewport = styled.span`
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
`;

/* Filled text that slides in */
const FilledText = styled(motion.span)`
  display: block;
  color: #fff;
  will-change: transform;
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

export default function ContactCTA({
  onOpenAsesoramiento,
  pack = "Cortinas",
  source = "cortinas_estores_cta",
  buttonText = "Reserva Ahora",
  ctaName = "solicitar_informacion",
  eyebrow = "EQUIPO DE DISEÑO Y ATENCIÓN AL CLIENTE",
  title = "Nos encargamos de todo:\ndiseño, medición e instalación.",
}) {
  const reduceMotion = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.65 });
  const animate = reduceMotion ? true : inView;

  const lines = title.split("\n");

  return (
    <Section>
      <Content>
        <HeadingSmall>{eyebrow}</HeadingSmall>

        <HeadingLarge ref={ref}>
          <FillWrap>
            <LightText>
              {lines.map((line, index) => (
                <span key={index}>
                  {line}
                  {index < lines.length - 1 && <br />}
                </span>
              ))}
            </LightText>

            <RevealViewport>
              <FilledText
                initial={{ x: "-100%" }}
                animate={animate ? { x: "0%" } : { x: "-100%" }}
                transition={{
                  duration: 1.6,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {lines.map((line, index) => (
                  <span key={index}>
                    {line}
                    {index < lines.length - 1 && <br />}
                  </span>
                ))}
              </FilledText>
            </RevealViewport>
          </FillWrap>
        </HeadingLarge>

        <CTAButton
          href="#contact"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          onClick={(e) => {
            e.preventDefault();

            trackCtaClick(source, ctaName);
            trackOpenQuickEnquiry(source, pack);

            onOpenAsesoramiento?.(pack, source);
          }}
        >
          {buttonText}
        </CTAButton>
      </Content>
    </Section>
  );
}
