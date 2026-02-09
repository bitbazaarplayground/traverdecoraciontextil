import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import styled from "styled-components";
import CTAHome from "../assets/CTAHome.png";
import { trackEvent } from "../lib/analytics";

const Section = styled.section`
  width: 100%;
  position: relative;
  padding: 4.1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  overflow: hidden;

  background-image: url(${CTAHome});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  @media (max-width: 768px) {
    padding: 3.1rem 1.5rem;
    text-align: center;
  }

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.35);
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
  gap: 1.1rem;
  align-items: center;
  text-align: center;
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

const SubText = styled(motion.p)`
  margin: 0 auto;
  font-size: 1.05rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.85);
  max-width: 48ch;

  @media (max-width: 768px) {
    margin: 0 auto;
  }
`;

const CTAButton = styled(motion.button)`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  border: none;
  background: ${({ theme }) => theme.colors.primary};
  color: white;

  margin-top: 1rem;
  padding: 0.8rem 1.9rem;
  border-radius: 999px;

  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;

  transition: transform 0.25s ease, opacity 0.25s ease;

  &:hover {
    opacity: 0.9;
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    margin-left: auto;
    margin-right: auto;
  }
`;

const ButtonWrap = styled.div`
  display: flex;
  justify-content: center;
`;

const TrustLine = styled.p`
  margin-top: 0.5rem;
  font-size: 0.9rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.75);
  text-align: center;

  span {
    color: ${({ theme }) => theme.colors.primary};
    margin: 0 0.25rem;
  }
`;

export default function ContactCTAHome({ onOpenAsesoramiento }) {
  const reduceMotion = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });

  const sentence =
    "Te asesoramos de forma personalizada y nos encargamos de todo el proceso, de principio a fin.";
  const words = sentence.split(" ");

  // ✅ Slower: increase staggerChildren + add delayChildren
  const container = {
    hidden: {},
    show: {
      transition: {
        delayChildren: 0.12,
        staggerChildren: 0.06, // was 0.03 (too fast)
      },
    },
  };

  const wordVariant = {
    hidden: { opacity: 0, y: 5, filter: "blur(5px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.42, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const shouldAnimate = reduceMotion ? true : inView;

  return (
    <Section>
      <Content ref={ref}>
        <HeadingLarge>
          ¿Preparado para sacarle todo el potencial a tu casa?
        </HeadingLarge>

        <SubText
          variants={container}
          initial="hidden"
          animate={shouldAnimate ? "show" : "hidden"}
        >
          {words.map((w, i) => (
            <motion.span
              key={`${w}-${i}`}
              variants={wordVariant}
              style={{
                display: "inline-block",
                marginRight: i === words.length - 1 ? 0 : "0.28em",
              }}
            >
              {w}
            </motion.span>
          ))}
        </SubText>

        <ButtonWrap>
          <CTAButton
            type="button"
            onClick={() => {
              trackEvent("open_asesoramiento", {
                source: "cta_home",
                pack: "General",
              });
              onOpenAsesoramiento?.("General");
            }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            Solicitar asesoramiento
          </CTAButton>
        </ButtonWrap>

        <TrustLine>
          Visita a domicilio gratuita <span>·</span> Sin compromiso{" "}
          <span>·</span> Castellón y Valencia
        </TrustLine>
      </Content>
    </Section>
  );
}
