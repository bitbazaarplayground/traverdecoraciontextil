// src/components/CortinasEstores/EnfoqueSlider.jsx
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { trackCtaClick, trackOpenQuickEnquiry } from "../lib/analytics";

/* =========================
   ENFOQUE SLIDER (Desktop-friendly)
   - No 3D tilt
   - Horizontal rail + progress
   - Left/Right arrows for non-touch devices
   - Subtle spotlight (optional) + clean cards
========================= */

const Section = styled.section`
  padding: 4.2rem 0 4.8rem;
`;

const Inner = styled.div`
  max-width: 1160px;
  margin: 0 auto;
  padding: 0 1.25rem;

  @media (max-width: 768px) {
    padding: 0 1.1rem;
  }
`;

const Top = styled.div`
  display: grid;
  gap: 1.05rem;
  margin-bottom: 1.6rem;

  @media (min-width: 980px) {
    grid-template-columns: 1.15fr 0.85fr;
    align-items: end;
    gap: 1.4rem;
    margin-bottom: 1.9rem;
  }
`;

const Kicker = styled(motion.p)`
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

const Title = styled(motion.h2)`
  margin: 0;
  font-size: clamp(1.85rem, 3.2vw, 2.6rem);
  font-weight: 650;
  letter-spacing: -0.03em;
  color: #121212;
  line-height: 1.08;

  span {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Lead = styled(motion.p)`
  margin: 0;
  max-width: 70ch;
  font-size: 1.06rem;
  line-height: 1.75;
  color: rgba(17, 17, 17, 0.7);

  span {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const RailWrap = styled.div`
  position: relative;
`;

const RailHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.85rem;
  margin-bottom: 0.65rem;
`;

const Hint = styled.p`
  margin: 0;
  font-size: 0.92rem;
  color: rgba(17, 17, 17, 0.58);

  span {
    display: inline-block;
    transform: translateY(1px);
  }

  /* Only show this hint on small screens */
  @media (min-width: 769px) {
    display: none;
  }
`;

const Nav = styled.div`
  display: none;
  gap: 0.5rem;

  @media (min-width: 769px) {
    display: inline-flex;
    align-items: center;
  }
`;

const NavBtn = styled.button`
  appearance: none;
  border: 1px solid rgba(17, 17, 17, 0.12);
  background: rgba(255, 255, 255, 0.75);
  cursor: pointer;

  width: 44px;
  height: 44px;
  border-radius: 999px;

  display: grid;
  place-items: center;

  box-shadow: 0 12px 30px rgba(17, 17, 17, 0.06);
  transition: transform 180ms ease, box-shadow 180ms ease, opacity 180ms ease,
    border-color 180ms ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 16px 40px rgba(17, 17, 17, 0.09);
    border-color: rgba(17, 17, 17, 0.16);
  }

  &:active {
    transform: translateY(0px);
  }

  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
    transform: none;
    box-shadow: 0 12px 30px rgba(17, 17, 17, 0.06);
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 4px rgba(0, 0, 0, 0.1), 0 12px 30px rgba(17, 17, 17, 0.06);
  }
`;

const Rail = styled.div`
  position: relative;
  z-index: 1;

  display: grid;
  gap: 1rem;
  grid-auto-flow: column;
  grid-auto-columns: minmax(280px, 1fr);

  overflow-x: auto;
  padding: 0.25rem 0 0.9rem;

  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;

  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }

  @media (min-width: 980px) {
    gap: 1.15rem;
    grid-auto-columns: minmax(320px, 1fr);
  }
`;

const ProgressTrack = styled.div`
  margin-top: 0.8rem;
  height: 2px;
  border-radius: 999px;
  background: rgba(17, 17, 17, 0.1);
  overflow: hidden;
`;

const ProgressBar = styled(motion.div)`
  height: 100%;
  border-radius: 999px;
  background: rgba(196, 151, 98, 0.75);
  transform-origin: 0% 50%;
`;

const Card = styled(motion.article)`
  scroll-snap-align: start;
  border-radius: 26px;
  position: relative;

  background: rgba(255, 255, 255, 0.72);
  outline: 1px solid rgba(17, 17, 17, 0.09);
  outline-offset: -1px;

  box-shadow: 0 24px 70px rgba(0, 0, 0, 0.08);
  overflow: hidden;

  transition: transform 220ms ease, box-shadow 220ms ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 28px 80px rgba(0, 0, 0, 0.1);
  }
`;

const CardInner = styled.div`
  padding: 1.25rem 1.25rem 1.1rem;

  @media (min-width: 980px) {
    padding: 1.35rem 1.35rem 1.2rem;
  }
`;

const CardTop = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 0.85rem;
  margin-bottom: 0.75rem;
`;

const Step = styled.span`
  font-size: 0.76rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  font-weight: 900;
  color: rgba(17, 17, 17, 0.55);
`;

const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 0.42rem 0.7rem;
  border-radius: 999px;

  background: rgba(17, 17, 17, 0.06);
  border: 1px solid rgba(17, 17, 17, 0.08);

  font-size: 0.76rem;
  font-weight: 800;
  color: rgba(17, 17, 17, 0.7);
`;

const CardTitle = styled.h3`
  margin: 0 0 0.6rem;
  font-size: 1.25rem;
  font-weight: 800;
  letter-spacing: -0.015em;
  color: #121212;
`;

const CardText = styled.p`
  margin: 0;
  font-size: 0.98rem;
  line-height: 1.7;
  color: rgba(17, 17, 17, 0.68);
  max-width: 60ch;
`;

const Bottom = styled.div`
  margin-top: 1.6rem;
  display: flex;
  justify-content: flex-start;
`;

/* CTA (keep your premium feel, no magnet) */
const CTA = styled(motion(Link))`
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;

  padding: 0.95rem 1.35rem;
  border-radius: 999px;

  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  font-weight: 900;
  text-decoration: none;

  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-size: 0.75rem;

  box-shadow: 0 18px 55px rgba(0, 0, 0, 0.18);
`;

const reveal = {
  hidden: { opacity: 0, y: 14, filter: "blur(6px)" },
  show: (d = 0) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, delay: d, ease: [0.22, 1, 0.36, 1] },
  }),
};

/* ===== Helpers ===== */
function clamp(n, min, max) {
  return Math.min(Math.max(n, min), max);
}

function getStepSize(el) {
  // scroll by ~1 card including gap.
  // Uses the first child width if possible; fallback to 340.
  const first = el?.firstElementChild;
  if (first && first.getBoundingClientRect) {
    const w = first.getBoundingClientRect().width;
    return Math.max(280, Math.min(420, w + 18));
  }
  return 340;
}

export default function EnfoqueSlider({ onOpenAsesoramiento }) {
  const steps = useMemo(
    () => [
      {
        step: "Paso 1",
        title: "Visita y medición",
        text: "Medimos con precisión y detectamos lo que no se ve: caída, paso, luz real, aperturas y uso diario.",
        badge: "Precisión",
      },
      {
        step: "Paso 2",
        title: "Tejidos en contexto",
        text: "Elegimos con muestras en mano: cómo se comporta el tejido con tu luz, tu pared y tu mobiliario.",
        badge: "Criterio",
      },
      {
        step: "Paso 3",
        title: "Confección a medida",
        text: "El acabado manda: proporciones, dobladillos, plomos y detalles que hacen que parezca “de revista”.",
        badge: "Acabado",
      },
      {
        step: "Paso 4",
        title: "Instalación impecable",
        text: "Montaje limpio, alineación perfecta y remates discretos. Sin improvisación. Sin sorpresas.",
        badge: "Profesional",
      },
      {
        step: "Paso 5",
        title: "Ajuste final",
        text: "Probamos, ajustamos y lo dejamos listo. Tú solo eliges cuándo quieres la luz.",
        badge: "Listo",
      },
    ],
    []
  );

  const railRef = useRef(null);
  const p = useMotionValue(0);
  const progress = useSpring(p, { stiffness: 180, damping: 22 });

  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);

  useEffect(() => {
    const el = railRef.current;
    if (!el) return;

    const update = () => {
      const max = el.scrollWidth - el.clientWidth;
      const left = el.scrollLeft;
      const ratio = max <= 0 ? 1 : left / max;

      p.set(clamp(ratio, 0, 1));
      setCanLeft(left > 2);
      setCanRight(left < max - 2);
    };

    update();
    el.addEventListener("scroll", update, { passive: true });

    // keep buttons correct on resize too
    const ro = new ResizeObserver(() => update());
    ro.observe(el);

    return () => {
      el.removeEventListener("scroll", update);
      ro.disconnect();
    };
  }, [p]);

  const scrollByCard = (dir) => {
    const el = railRef.current;
    if (!el) return;

    const delta = getStepSize(el) * dir;
    el.scrollBy({ left: delta, behavior: "smooth" });
  };

  return (
    <Section aria-label="Cómo trabajamos">
      <Inner>
        <Top>
          <div>
            <Kicker
              variants={reveal}
              initial="hidden"
              whileInView="show"
              custom={0}
              viewport={{ once: true, amount: 0.6 }}
            >
              Detalle y método
            </Kicker>

            <Title
              variants={reveal}
              initial="hidden"
              whileInView="show"
              custom={0.06}
              viewport={{ once: true, amount: 0.6 }}
            >
              Un resultado premium se{" "}
              <span style={{ fontStyle: "italic" }}>construye</span>.
            </Title>
          </div>

          <Lead
            variants={reveal}
            initial="hidden"
            whileInView="show"
            custom={0.12}
            viewport={{ once: true, amount: 0.6 }}
          >
            En cortinas y estores, la diferencia no está en “poner una tela”.
            Está en la caída, la proporción y el remate. Aquí es donde somos{" "}
            <span>obsesivos</span> — y se nota.
          </Lead>
        </Top>

        <RailWrap>
          <RailHeader>
            <Nav aria-label="Navegación de pasos">
              <NavBtn
                type="button"
                onClick={() => scrollByCard(-1)}
                disabled={!canLeft}
                aria-label="Ver pasos anteriores"
              >
                <ChevronLeft size={20} />
              </NavBtn>
              <NavBtn
                type="button"
                onClick={() => scrollByCard(1)}
                disabled={!canRight}
                aria-label="Ver pasos siguientes"
              >
                <ChevronRight size={20} />
              </NavBtn>
            </Nav>
          </RailHeader>

          <Rail ref={railRef} aria-label="Pasos del proceso">
            {steps.map((s, idx) => (
              <Card
                key={s.title}
                variants={reveal}
                initial="hidden"
                whileInView="show"
                custom={0.06 + idx * 0.04}
                viewport={{ once: true, amount: 0.25 }}
              >
                <CardInner>
                  <CardTop>
                    <Step>{s.step}</Step>
                    <Badge>{s.badge}</Badge>
                  </CardTop>
                  <CardTitle>{s.title}</CardTitle>
                  <CardText>{s.text}</CardText>
                </CardInner>
              </Card>
            ))}
          </Rail>

          <ProgressTrack aria-hidden="true">
            <ProgressBar style={{ scaleX: progress }} />
          </ProgressTrack>
        </RailWrap>

        <Bottom>
          <CTA
            to="/contact"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.99 }}
            onClick={(e) => {
              e.preventDefault();

              trackCtaClick(
                "cortinas_estores_enfoque_slider",
                "pedir_propuesta"
              );

              trackOpenQuickEnquiry(
                "cortinas_estores_enfoque_slider",
                "Cortinas"
              );

              onOpenAsesoramiento?.(
                "Cortinas",
                "cortinas_estores_enfoque_slider"
              );
            }}
          >
            Pedir propuesta <ArrowRight size={18} />
          </CTA>
        </Bottom>
      </Inner>
    </Section>
  );
}
