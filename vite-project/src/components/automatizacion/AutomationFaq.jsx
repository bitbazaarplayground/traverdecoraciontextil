// src/components/automatizacion/AutomationFaqs.jsx
import styled from "styled-components";
import FaqAccordion from "../faq/FaqAccordion";

export default function AutomationFaq({
  items = [],
  kicker = "FAQ",
  title = (
    <>
      Preguntas <span>frecuentes</span>
    </>
  ),
  lead = "Resolvemos dudas habituales antes de la visita.",
  withSchema = true,
  canonicalUrl,
  defaultOpenIndex = -1,
}) {
  if (!items?.length) return null;

  return (
    <Section aria-label="Preguntas frecuentes">
      <Inner>
        <Top>
          <Kicker>{kicker}</Kicker>
          <Title>{title}</Title>
          <Lead>{lead}</Lead>
        </Top>

        <FaqAccordion
          items={items}
          withSchema={withSchema}
          canonicalUrl={canonicalUrl}
          defaultOpenIndex={defaultOpenIndex}
        />
      </Inner>
    </Section>
  );
}

/* =========================
    SECTION + WRAP
========================= */

const Section = styled.section`
  padding: clamp(2.2rem, 4.2vw, 3.4rem) 0;
  border-top: 1px solid rgba(15, 23, 42, 0.08);
`;

const Inner = styled.div`
  width: min(1120px, calc(100% - 2.4rem));
  margin: 0 auto;

  @media (max-width: 768px) {
    width: min(1120px, calc(100% - 2rem));
  }
`;

const Top = styled.div`
  max-width: 860px;
  margin-bottom: 1.15rem;
`;

/* Typography (match Automatizacion.jsx) */
const Kicker = styled.p`
  margin: 0 0 0.55rem 0;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  font-size: 0.82rem;
  color: rgba(17, 17, 17, 0.55);
  position: relative;
  display: inline-block;
  padding-bottom: 0.55rem;

  &:after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0.1rem;
    width: 48px;
    height: 1px;
    background: rgba(196, 151, 98, 0.65);
  }
`;

const Title = styled.h2`
  margin: 0;
  font-size: 2.15rem;
  line-height: 1.12;
  letter-spacing: -0.02em;
  color: rgba(17, 17, 17, 0.96);

  span {
    color: ${({ theme }) => theme.colors.primary};
  }

  @media (max-width: 768px) {
    font-size: 1.7rem;
  }
`;

const Lead = styled.p`
  margin: 0.75rem 0 0;
  font-size: 1.08rem;
  line-height: 1.7;
  color: rgba(17, 17, 17, 0.62);
`;
