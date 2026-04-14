// src/components/toldos/ProcesoToldosSlider.jsx
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { trackCtaClick, trackOpenQuickEnquiry } from "../../lib/analytics";

/* =========================
   PROCESO TOLDOS SLIDER
   - Horizontal rail
   - Desktop arrows
   - Smooth progress bar
   - Premium / editorial feel
========================= */

const Section = styled.section`
  padding: 2.2rem 0 0;

  @media (max-width: 768px) {
    padding: 1.6rem 0 0;
  }
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
  margin-bottom: 1.7rem;

  @media (min-width: 980px) {
    grid-template-columns: 1.12fr 0.88fr;
    align-items: end;
    gap: 1.5rem;
    margin-bottom: 1.95rem;
  }
`;

const Kicker = styled(motion.p)`
  margin: 0 0 0.55rem;
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
  font-size: clamp(1.9rem, 3.2vw, 2.65rem);
  font-weight: 700;
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
  font-size: 1.05rem;
  line-height: 1.75;
  color: rgba(17, 17, 17, 0.7);

  span {
    color: ${({ theme }) => theme.colors.primary};
    font-weight: 700;
  }
`;

const RailWrap = styled.div`
  position: relative;
`;

const RailHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.85rem;
  margin-bottom: 0.7rem;
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
  background: rgba(255, 255, 255, 0.78);
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

  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
    transform: none;
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 4px rgba(0, 0, 0, 0.1), 0 12px 30px rgba(17, 17, 17, 0.06);
  }
`;

const Rail = styled.div`
  display: grid;
  gap: 1rem;
  grid-auto-flow: column;
  grid-auto-columns: minmax(285px, 1fr);

  overflow-x: auto;
  padding: 0.2rem 0 0.9rem;

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
  margin-top: 0.85rem;
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
  overflow: hidden;

  background: rgba(255, 255, 255, 0.76);
  outline: 1px solid rgba(17, 17, 17, 0.08);
  outline-offset: -1px;

  box-shadow: 0 24px 70px rgba(0, 0, 0, 0.08);
  transition: transform 220ms ease, box-shadow 220ms ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 28px 80px rgba(0, 0, 0, 0.1);
  }
`;

const CardInner = styled.div`
  padding: 1.3rem 1.25rem 1.15rem;

  @media (min-width: 980px) {
    padding: 1.4rem 1.4rem 1.25rem;
  }
`;

const CardTop = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 0.85rem;
  margin-bottom: 0.8rem;
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
  padding: 0.42rem 0.72rem;
  border-radius: 999px;

  background: rgba(17, 17, 17, 0.06);
  border: 1px solid rgba(17, 17, 17, 0.08);

  font-size: 0.76rem;
  font-weight: 800;
  color: rgba(17, 17, 17, 0.7);
`;

const CardTitle = styled.h3`
  margin: 0 0 0.6rem;
  font-size: 1.24rem;
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

const CTA = styled(motion(Link))`
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;

  padding: 0.95rem 1.35rem;
  border-radius: 999px;

  background: ${({ theme }) => theme.colors.primary};
  color: #0b0c0f;
  font-weight: 900;
  text-decoration: none;

  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-size: 0.75rem;

  box-shadow: 0 18px 55px rgba(0, 0, 0, 0.16);
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

function clamp(n, min, max) {
  return Math.min(Math.max(n, min), max);
}

function getStepSize(el) {
  const first = el?.firstElementChild;
  if (first && first.getBoundingClientRect) {
    const w = first.getBoundingClientRect().width;
    return Math.max(280, Math.min(420, w + 18));
  }
  return 340;
}

export default function ProcesoToldosSlider({
  onOpenAsesoramiento,
  ctaLabel = "Solicitar propuesta",
  ctaPack = "Toldos",
  ctaSource = "toldos_proceso_slider",
}) {
  const steps = useMemo(
    () => [
      {
        step: "Paso 1",
        title: "Visita y medición",
        text: "Analizamos orientación solar, anclajes, dimensiones y uso real del espacio para recomendar una solución que funcione bien desde el primer día.",
        badge: "Precisión",
      },
      {
        step: "Paso 2",
        title: "Elección del sistema",
        text: "Te ayudamos a decidir entre toldo extensible, cofre, vertical, pérgola u otras opciones según protección, estética, comodidad y mantenimiento.",
        badge: "Criterio",
      },
      {
        step: "Paso 3",
        title: "Tejidos y acabados",
        text: "Definimos tejidos, colores, maniobra y detalles para que el resultado encaje con la fachada, el mobiliario y la forma de vivir el exterior.",
        badge: "Diseño",
      },
      {
        step: "Paso 4",
        title: "Instalación profesional",
        text: "Realizamos un montaje limpio y seguro, con fijaciones adecuadas, nivelación precisa y una ejecución cuidada en cada remate.",
        badge: "Montaje",
      },
      {
        step: "Paso 5",
        title: "Ajuste y explicación final",
        text: "Probamos el sistema, revisamos tensiones, maniobras o motorización, y te explicamos el uso diario y el mantenimiento básico.",
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

    const ro = new ResizeObserver(() => update());
    ro.observe(el);

    return () => {
      el.removeEventListener("scroll", update);
      ro.disconnect();
    };
  }, [p]);

  function scrollByCard(dir) {
    const el = railRef.current;
    if (!el) return;

    const delta = getStepSize(el) * dir;
    el.scrollBy({ left: delta, behavior: "smooth" });
  }

  return (
    <Section aria-label="Cómo trabajamos en toldos">
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
              Proceso
            </Kicker>

            <Title
              variants={reveal}
              initial="hidden"
              whileInView="show"
              custom={0.06}
              viewport={{ once: true, amount: 0.6 }}
            >
              Un toldo a medida se{" "}
              <span style={{ fontStyle: "italic" }}>diseña</span>, se mide y se
              instala para durar.
            </Title>
          </div>

          <Lead
            variants={reveal}
            initial="hidden"
            whileInView="show"
            custom={0.12}
            viewport={{ once: true, amount: 0.6 }}
          >
            La diferencia no está solo en el producto. Está en cómo se estudia
            el espacio, cómo se elige el sistema y cómo se ejecuta la
            instalación. Ahí es donde buscamos un resultado{" "}
            <span>duradero, limpio y cómodo</span>.
          </Lead>
        </Top>

        <RailWrap>
          <RailHeader>
            <Nav aria-label="Navegación del proceso">
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

          <Rail
            ref={railRef}
            aria-label="Pasos del proceso de instalación de toldos"
          >
            {steps.map((item, idx) => (
              <Card
                key={item.title}
                variants={reveal}
                initial="hidden"
                whileInView="show"
                custom={0.06 + idx * 0.04}
                viewport={{ once: true, amount: 0.25 }}
              >
                <CardInner>
                  <CardTop>
                    <Step>{item.step}</Step>
                    <Badge>{item.badge}</Badge>
                  </CardTop>

                  <CardTitle>{item.title}</CardTitle>
                  <CardText>{item.text}</CardText>
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

              trackCtaClick(ctaSource, "solicitar_propuesta");
              trackOpenQuickEnquiry(ctaSource, ctaPack);
              onOpenAsesoramiento?.(ctaPack, ctaSource);
            }}
          >
            {ctaLabel} <ArrowRight size={18} />
          </CTA>
        </Bottom>
      </Inner>
    </Section>
  );
}
