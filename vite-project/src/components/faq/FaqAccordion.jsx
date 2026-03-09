import {
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Helmet } from "react-helmet-async";
import styled from "styled-components";

/**
 * items: [{ q: string, a: ReactNode, aText?: string }]
 */
export default function FaqAccordion({
  items = [],
  withSchema = false,
  canonicalUrl,
  defaultOpenIndex = -1,
  ariaLabel = "Preguntas frecuentes",
}) {
  const baseId = useId();
  const [openIndex, setOpenIndex] = useState(defaultOpenIndex);
  const [openHeight, setOpenHeight] = useState(0);
  const openPanelInnerRef = useRef(null);

  // Keep state in sync when items or defaultOpenIndex change
  useEffect(() => {
    if (defaultOpenIndex === -1) {
      setOpenIndex(-1);
      return;
    }

    if (
      Number.isInteger(defaultOpenIndex) &&
      defaultOpenIndex >= 0 &&
      defaultOpenIndex < (items?.length || 0)
    ) {
      setOpenIndex(defaultOpenIndex);
      return;
    }

    setOpenIndex(-1);
  }, [defaultOpenIndex, items?.length]);

  useLayoutEffect(() => {
    if (openIndex === -1 || !openPanelInnerRef.current) {
      setOpenHeight(0);
      return;
    }

    const el = openPanelInnerRef.current;

    const updateHeight = () => {
      setOpenHeight(el.scrollHeight || 0);
    };

    updateHeight();

    const resizeObserver = new ResizeObserver(() => {
      updateHeight();
    });

    resizeObserver.observe(el);
    window.addEventListener("resize", updateHeight);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateHeight);
    };
  }, [openIndex, items]);

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
          acceptedAnswer: { "@type": "Answer", text: answerText },
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
    <div aria-label={ariaLabel}>
      {schema && (
        <Helmet>
          <script type="application/ld+json">{JSON.stringify(schema)}</script>
        </Helmet>
      )}

      <Wrap>
        {items.map((it, idx) => {
          const isOpen = idx === openIndex;
          const buttonId = `${baseId}-faq-btn-${idx}`;
          const panelId = `${baseId}-faq-panel-${idx}`;

          return (
            <Item key={`${idx}-${it.q}`} $open={isOpen}>
              <Button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex((cur) => (cur === idx ? -1 : idx))}
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
                style={{ maxHeight: isOpen ? `${openHeight}px` : "0px" }}
              >
                <PanelInner ref={isOpen ? openPanelInnerRef : null}>
                  <Answer>
                    {typeof it.a === "string" ? <p>{it.a}</p> : it.a}
                  </Answer>
                </PanelInner>
              </Panel>
            </Item>
          );
        })}
      </Wrap>
    </div>
  );
}

/* styles (copied from AutomationFaq) */
const Wrap = styled.div`
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
  all: unset;
  width: 100%;
  box-sizing: border-box;
  padding: 1rem 1rem;
  cursor: pointer;

  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.9rem;
  text-align: left;

  &:focus-visible {
    box-shadow: inset 0 0 0 3px rgba(0, 0, 0, 0.08);
  }
`;

const Question = styled.span`
  color: rgba(15, 23, 42, 0.92);
  font-weight: 820;
  line-height: 1.45;
  font-size: 1rem;
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
`;

const Answer = styled.div`
  p {
    margin: 0.1rem 0 0;
    line-height: 1.75;
    color: rgba(15, 23, 42, 0.68);
    font-size: 0.98rem;
  }

  strong {
    color: rgba(15, 23, 42, 0.92);
    font-weight: 850;
  }
`;
