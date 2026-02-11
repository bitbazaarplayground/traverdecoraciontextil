// src/components/HomeFAQ.jsx
import React, { useId, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { CONTACT } from "../config/contact";
import { homeFaq } from "../content/homeFaq";
import { trackEvent } from "../lib/analytics";

export default function HomeFAQ({ onOpenAsesoramiento }) {
  const baseId = useId();
  const [openIndex, setOpenIndex] = useState(-1);

  const items = useMemo(() => homeFaq, []);

  const toggle = (idx) => {
    setOpenIndex((current) => (current === idx ? -1 : idx));
  };

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
          <Accordion role="list">
            {items.map((item, idx) => {
              const isOpen = openIndex === idx;
              const buttonId = `${baseId}-q-${idx}`;
              const panelId = `${baseId}-a-${idx}`;

              return (
                <Item key={buttonId} role="listitem" $open={isOpen}>
                  <QuestionBtn
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggle(idx)}
                  >
                    <QuestionText>{item.q}</QuestionText>
                    <Chevron aria-hidden="true" $open={isOpen}>
                      +
                    </Chevron>
                  </QuestionBtn>

                  <Answer
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    aria-hidden={!isOpen}
                    $open={isOpen}
                  >
                    <AnswerInner>{item.a}</AnswerInner>
                  </Answer>
                </Item>
              );
            })}
          </Accordion>

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

const AsideNote = styled.p`
  margin: 0.85rem 0 0;
  color: rgba(15, 23, 42, 0.62);
  font-size: 0.95rem;
`;
