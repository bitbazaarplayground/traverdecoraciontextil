// src/components/automatizacion/AutomationFaqs.jsx
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import styled from "styled-components";

/**
 * items: [
 *   { q: string, a: ReactNode, aText?: string }
 * ]
 *
 * - a is what you render
 * - aText is OPTIONAL, but recommended for JSON-LD (plain text)
 *   If omitted, we will attempt a safe fallback:
 *   - string => ok
 *   - otherwise => "" (so schema doesn't lie)
 */
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
}) {
  const baseId = useId();
  const [openIndex, setOpenIndex] = useState(0);

  // store measured heights to avoid max-height hacks
  const panelRefs = useRef([]);
  const [panelHeights, setPanelHeights] = useState({});

  // Measure panels (on mount + on resize + when items change)
  useEffect(() => {
    if (!items?.length) return;

    const measure = () => {
      const next = {};
      panelRefs.current.forEach((el, idx) => {
        if (!el) return;
        next[idx] = el.scrollHeight || 0;
      });
      setPanelHeights(next);
    };

    measure();

    // Re-measure on resize (content wraps differently)
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [items]);

  // JSON-LD schema (safe, never lies)
  const schema = useMemo(() => {
    if (!withSchema || !items?.length) return null;

    const mainEntity = items
      .map((it) => {
        const answerText =
          typeof it?.aText === "string"
            ? it.aText
            : typeof it?.a === "string"
            ? it.a
            : "";

        if (!it?.q || !answerText) return null;

        return {
          "@type": "Question",
          name: it.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: answerText,
          },
        };
      })
      .filter(Boolean);

    if (!mainEntity.length) return null;

    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity,
      ...(canonicalUrl ? { "@id": `${canonicalUrl}#faq` } : {}),
    };
  }, [withSchema, items, canonicalUrl]);

  if (!items?.length) return null;

  return (
    <Section aria-label="Preguntas frecuentes">
      {schema && (
        <Helmet>
          <script type="application/ld+json">{JSON.stringify(schema)}</script>
        </Helmet>
      )}

      <Inner>
        <Top>
          <Kicker>{kicker}</Kicker>
          <Title>{title}</Title>
          <Lead>{lead}</Lead>
        </Top>

        <Wrap>
          {items.map((it, idx) => {
            const isOpen = idx === openIndex;
            const buttonId = `${baseId}-faq-btn-${idx}`;
            const panelId = `${baseId}-faq-panel-${idx}`;

            const measured = panelHeights[idx] || 0;

            return (
              <Item key={`${idx}-${it.q}`} $open={isOpen}>
                <Button
                  id={buttonId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() =>
                    setOpenIndex((cur) => (cur === idx ? -1 : idx))
                  }
                >
                  <Question>{it.q}</Question>
                  <Icon $open={isOpen} aria-hidden="true">
                    +
                  </Icon>
                </Button>

                <Panel
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  $open={isOpen}
                  style={{ maxHeight: isOpen ? `${measured}px` : "0px" }}
                >
                  {/* Inner panel content gets measured */}
                  <PanelInner
                    ref={(el) => {
                      panelRefs.current[idx] = el;
                    }}
                  >
                    <FaqAnswer>
                      {typeof it.a === "string" ? it.a : it.a}
                    </FaqAnswer>
                  </PanelInner>
                </Panel>
              </Item>
            );
          })}
        </Wrap>
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

/* =========================
   TYPOGRAPHY (match Automatizacion.jsx)
========================= */

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

/* REQUIRED TITLE look */
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

/* =========================
   FAQ UI (premium + consistent)
========================= */

const Wrap = styled.div`
  margin-top: 1.15rem;
  display: grid;
  gap: 0.65rem;
`;

const Item = styled.div`
  border-radius: 18px;
  border: 1px solid
    ${({ $open }) =>
      $open ? "rgba(196, 151, 98, 0.35)" : "rgba(15, 23, 42, 0.1)"};
  background: rgba(255, 255, 255, 0.9);
  box-shadow: ${({ $open }) =>
    $open
      ? "0 26px 90px rgba(15, 23, 42, 0.10)"
      : "0 18px 60px rgba(15, 23, 42, 0.06)"};
  overflow: hidden;
  transition: box-shadow 220ms ease, border-color 220ms ease;
`;

const Button = styled.button`
  width: 100%;
  appearance: none;
  border: 0;
  background: transparent;
  padding: 1rem 1rem;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.9rem;
  text-align: left;

  font-size: 16px;
  line-height: 1.45;
  font-family: inherit;

  &:focus-visible {
    outline: none;
    box-shadow: inset 0 0 0 3px rgba(0, 0, 0, 0.08);
  }
`;

const Question = styled.span`
  font-size: inherit;
  color: rgba(15, 23, 42, 0.92);
  font-weight: 820;
  line-height: 1.45;
`;

const Icon = styled.div`
  width: 34px;
  height: 34px;
  flex: 0 0 34px;
  border-radius: 12px;
  display: grid;
  place-items: center;
  border: 1px solid rgba(15, 23, 42, 0.1);
  background: rgba(15, 23, 42, 0.04);
  color: rgba(15, 23, 42, 0.82);
  font-weight: 950;
  transform: ${({ $open }) => ($open ? "rotate(45deg)" : "rotate(0deg)")};
  transition: transform 220ms ease;
`;

const Panel = styled.div`
  overflow: hidden;
  transition: max-height 320ms ease;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
    max-height: none !important;
  }
`;

const PanelInner = styled.div`
  padding: 0 1rem 1rem;

  p {
    margin: 0.1rem 0 0;
    line-height: 1.75;
    color: rgba(15, 23, 42, 0.68);
    font-size: 0.98rem;
  }
`;

const FaqAnswer = styled.div`
  color: rgba(15, 23, 42, 0.68);
  font-size: 0.98rem;
  line-height: 1.75;

  p {
    margin: 0.1rem 0 0;
  }

  strong {
    color: rgba(15, 23, 42, 0.92);
    font-weight: 850;
  }
`;
