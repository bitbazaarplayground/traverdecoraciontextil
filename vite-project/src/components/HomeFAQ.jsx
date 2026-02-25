// src/components/HomeFAQ.jsx
import { useId, useMemo } from "react";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { CONTACT } from "../config/contact";
import { trackEvent } from "../lib/analytics";
import StickyCtaButton from "../mobile/StickyCtaButton";
import FaqAccordion from "./faq/FaqAccordion";

// ✅ keep data OUTSIDE the component
const homeFaq = [
  {
    q: "¿El asesoramiento tiene algún coste u obligación?",
    a: "No. El asesoramiento es totalmente gratuito y sin compromiso. Analizamos tu espacio, te orientamos y te proponemos la mejor solución según tus necesidades. Tú decides si seguimos adelante.",
    aText:
      "No. El asesoramiento es totalmente gratuito y sin compromiso. Analizamos tu espacio, te orientamos y te proponemos la mejor solución según tus necesidades. Tú decides si seguimos adelante.",
  },
  {
    q: "¿Incluís la medición y la instalación?",
    a: "Sí. Nos encargamos del proceso completo: visita técnica, medición precisa, confección y una instalación profesional y limpia. Así garantizamos que el resultado final sea coherente y funcione correctamente.",
    aText:
      "Sí. Nos encargamos del proceso completo: visita técnica, medición precisa, confección y una instalación profesional y limpia. Así garantizamos que el resultado final sea coherente y funcione correctamente.",
  },
  {
    q: "¿Trabajáis solo en Castellón o también en Valencia?",
    a: "Trabajamos principalmente en Castellón y alrededores. También realizamos proyectos en Valencia según el tipo de servicio y el alcance del proyecto. Consúltanos sin compromiso.",
    aText:
      "Trabajamos principalmente en Castellón y alrededores. También realizamos proyectos en Valencia según el tipo de servicio y el alcance del proyecto. Consúltanos sin compromiso.",
  },
  {
    q: "¿Cuánto tiempo tarda un proyecto desde la medición?",
    a: "Depende del producto y del tipo de confección, pero normalmente el plazo oscila entre 2 y 5 semanas desde la medición hasta la instalación. Siempre te indicamos tiempos realistas desde el inicio.",
    aText:
      "Depende del producto y del tipo de confección, pero normalmente el plazo oscila entre 2 y 5 semanas desde la medición hasta la instalación. Siempre te indicamos tiempos realistas desde el inicio.",
  },
  {
    q: "¿Puedo automatizar mis cortinas o toldos más adelante?",
    a: "Sí. Muchas soluciones permiten empezar de forma manual y añadir automatización más adelante. Te asesoramos para que el sistema sea compatible y escalable desde el primer momento.",
    aText:
      "Sí. Muchas soluciones permiten empezar de forma manual y añadir automatización más adelante. Te asesoramos para que el sistema sea compatible y escalable desde el primer momento.",
  },
];

export default function HomeFAQ({ onOpenAsesoramiento }) {
  const baseId = useId();
  const baseUrl = (
    import.meta.env.VITE_SITE_URL || window.location.origin
  ).replace(/\/$/, "");
  const canonical = `${baseUrl}/`;
  // optional memo (not required, but fine)
  const items = useMemo(() => homeFaq, []);

  return (
    <Section aria-labelledby={`${baseId}-title`}>
      <Inner>
        <Top>
          <Kicker>FAQ</Kicker>
          <Title id={`${baseId}-title`}>
            Preguntas frecuentes <span>antes de decidir</span>
          </Title>
          <Lead>
            Respuestas claras para que sepas qué esperar: asesoramiento,
            medición e instalación. Sin letra pequeña.
          </Lead>
        </Top>

        <Grid>
          <FaqAccordion
            items={items}
            withSchema={true}
            canonicalUrl={canonical}
            defaultOpenIndex={-1}
          />

          <Aside>
            <AsideCard>
              <AsideTitle>¿Quieres una recomendación rápida?</AsideTitle>
              <AsideText>
                Cuéntanos tu espacio y lo que quieres mejorar. Te diremos el
                mejor punto de partida y te prepararemos una propuesta con
                criterio.
              </AsideText>

              <AsideBullets>
                <li>Asesoramiento gratuito</li>
                <li>Medición e instalación profesional</li>
                <li>Castellón y Valencia (según proyecto)</li>
              </AsideBullets>

              <AsideActions>
                <PrimaryBtn
                  style={{ fontSize: "0.95rem" }}
                  as="button"
                  type="button"
                  onClick={() => {
                    trackEvent("open_asesoramiento", {
                      source: "home_faq",
                      pack: "General",
                    });
                    onOpenAsesoramiento?.("General");
                  }}
                >
                  Solicitar asesoramiento
                </PrimaryBtn>

                <SecondaryBtn
                  as="a"
                  href={CONTACT.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp
                </SecondaryBtn>
              </AsideActions>

              <AsideNote>
                Sin obligación · Sin coste · Respuesta rápida
              </AsideNote>
            </AsideCard>
          </Aside>
        </Grid>
      </Inner>

      <StickyCtaButton message="Hola, me gustaría recibir más información sobre vuestros servicios." />
    </Section>
  );
}

/* =========================
   Styles
========================= */

const Section = styled.section`
  background: #fff;
  padding: clamp(3rem, 5vw, 4.2rem) 0;
  border-top: 1px solid rgba(15, 23, 42, 0.08);
`;

const Inner = styled.div`
  width: min(1120px, calc(100% - 3rem));
  margin: 0 auto;

  @media (max-width: 768px) {
    width: min(1120px, calc(100% - 2rem));
  }
`;

const Top = styled.div`
  text-align: center;
  margin-bottom: 1.9rem;
`;

const Kicker = styled.p`
  margin: 0 auto 0.7rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.35rem 0.75rem;
  border-radius: 999px;
  background: rgba(15, 23, 42, 0.04);
  border: 1px solid rgba(15, 23, 42, 0.08);
  color: rgba(15, 23, 42, 0.78);
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-size: 0.78rem;
`;

/* keep this Title local to FAQ; doesn't need to match your global Title requirement */
const Title = styled.h2`
  text-align: center;
  font-size: 2.2rem;
  font-weight: 600;
  color: #222;
  margin-bottom: 1rem;

  span {
    color: ${({ theme }) => theme.colors.primary};
  }

  @media (max-width: 768px) {
    font-size: 1.7rem;
  }
`;

const Lead = styled.p`
  text-align: center;
  max-width: 700px;
  margin: 0 auto 2.5rem auto;
  font-size: 1.1rem;
  color: #555;
`;
const Grid = styled.div`
  margin-top: 1.8rem;
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 1.2rem;
  align-items: stretch;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

const Accordion = styled.div`
  height: 100%;
  border-radius: 22px;
  border: 1px solid rgba(15, 23, 42, 0.1);
  background: #fff;
  box-shadow: 0 18px 60px rgba(15, 23, 42, 0.06);
  overflow: hidden;
`;

const Item = styled.div`
  border-top: 1px solid rgba(15, 23, 42, 0.08);
  background: ${({ $open }) => ($open ? "rgba(15, 23, 42, 0.02)" : "#fff")};

  &:first-child {
    border-top: 0;
  }
`;

const QuestionBtn = styled.button`
  width: 100%;
  text-align: left;
  border: 0;
  background: transparent;
  padding: 1.15rem 1.25rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  cursor: pointer;

  &:hover {
    background: rgba(15, 23, 42, 0.02);
  }

  &:focus-visible {
    outline: 3px solid rgba(0, 0, 0, 0.18);
    outline-offset: -3px;
  }
`;

const QuestionText = styled.span`
  font-weight: 800;
  color: rgba(15, 23, 42, 0.92);
  letter-spacing: -0.01em;
  line-height: 1.4;

  /* 👇 NEW */
  font-size: 1.05rem;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const Chevron = styled.span`
  width: 36px;
  height: 36px;
  border-radius: 999px;
  display: grid;
  place-items: center;
  background: rgba(15, 23, 42, 0.04);
  border: 1px solid rgba(15, 23, 42, 0.08);
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 900;
  transform: ${({ $open }) => ($open ? "rotate(45deg)" : "rotate(0deg)")};
  transition: transform 180ms ease, background 180ms ease;

  ${Item}:hover & {
    background: rgba(15, 23, 42, 0.06);
  }
`;

const Answer = styled.div`
  max-height: ${({ $open }) => ($open ? "320px" : "0px")};
  overflow: hidden;
  transition: max-height 260ms ease;
`;

const AnswerInner = styled.div`
  padding: 0 1.35rem 1.25rem;
  color: rgba(15, 23, 42, 0.68);
  line-height: 1.75;

  strong {
    color: rgba(15, 23, 42, 0.92);
    font-weight: 850;
  }
`;

const Aside = styled.aside``;

const AsideCard = styled.div`
  height: 100%;
  border-radius: 22px;
  border: 1px solid rgba(15, 23, 42, 0.1);
  background: linear-gradient(
    180deg,
    rgba(15, 23, 42, 0.02),
    rgba(15, 23, 42, 0.005)
  );
  padding: 1.35rem;
  box-shadow: 0 18px 60px rgba(15, 23, 42, 0.06);
  display: flex;
  flex-direction: column;
`;

const AsideTitle = styled.h3`
  margin: 0;
  font-size: 1.25rem;
  letter-spacing: -0.02em;
  color: rgba(15, 23, 42, 0.92);
`;

const AsideText = styled.p`
  margin: 0.7rem 0 0;
  line-height: 1.75;
  color: rgba(15, 23, 42, 0.7);
`;

const AsideBullets = styled.ul`
  margin: 1rem 0 0;
  padding-left: 1.1rem;
  display: grid;
  gap: 0.55rem;
  color: rgba(15, 23, 42, 0.74);

  li {
    line-height: 1.6;
  }
`;

const AsideActions = styled.div`
  margin-top: auto;
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;

  @media (max-width: 899px) {
    display: none;
  }
`;

const PrimaryBtn = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.95rem 1.15rem;
  border-radius: 14px;
  text-decoration: none;
  font-weight: 850;
  color: white;
  background: ${({ theme }) => theme.colors.primary};
  border: 0;
  cursor: pointer;
  box-shadow: 0 18px 60px rgba(0, 0, 0, 0.12);
  transition: transform 180ms ease, filter 180ms ease;

  &:hover {
    transform: translateY(-2px);
    filter: brightness(1.02);
  }
`;

const SecondaryBtn = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.95rem 1.15rem;
  border-radius: 14px;
  text-decoration: none;
  font-weight: 850;
  color: rgba(15, 23, 42, 0.86);
  background: #fff;
  border: 1px solid rgba(15, 23, 42, 0.12);
  transition: transform 180ms ease, background 180ms ease;

  &:hover {
    transform: translateY(-2px);
    background: rgba(15, 23, 42, 0.02);
  }
`;

const shimmer = keyframes`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
`;

const AsideNote = styled.p`
  margin: 0.85rem 0 0;
  font-size: 0.95rem;
  color: rgba(15, 23, 42, 0.62);
  position: relative;
  overflow: hidden;
  display: inline-block;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 40%;
    height: 100%;

    background: linear-gradient(
      90deg,
      transparent,
      rgba(229, 0, 126, 0.18),
      transparent
    );

    animation: ${shimmer} 4s linear infinite;
  }
`;
