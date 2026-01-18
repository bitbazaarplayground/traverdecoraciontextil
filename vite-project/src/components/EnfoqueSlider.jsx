// src/components/CortinasEstores/EnfoqueSlider.jsx
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

/* =========================
   2026 SHOWROOM / ARTIST SECTION
   - Kinetic intro
   - Horizontal snap rail with progress
   - 3D tilt cards + shimmer
   - Magnetic CTA
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
  margin: 0;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  font-size: 0.78rem;
  color: rgba(17, 17, 17, 0.55);
`;

const Title = styled(motion.h2)`
  margin: 0.25rem 0 0;
  font-size: clamp(1.85rem, 3.2vw, 2.6rem);
  font-weight: 650;
  letter-spacing: -0.03em;
  color: #121212;
  line-height: 1.08;
`;

const Lead = styled(motion.p)`
  margin: 0;
  max-width: 70ch;
  font-size: 1.06rem;
  line-height: 1.75;
  color: rgba(17, 17, 17, 0.7);
`;

const RailWrap = styled.div`
  position: relative;
`;

// Cursor spotlight
const Spotlight = styled(motion.div)`
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;

  /* subtle showroom layer */
  opacity: 0;
  transition: opacity 0.25s ease;

  /* mix-blend keeps it premium on light backgrounds */
  mix-blend-mode: multiply;
`;

const SpotlightMask = styled(motion.div)`
  position: absolute;
  inset: 0;

  /* default state (will be overridden by style attr) */
  background: radial-gradient(
    420px 320px at 50% 50%,
    rgba(0, 0, 0, 0.08),
    transparent 60%
  );
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
  background: rgba(17, 17, 17, 0.65);
  transform-origin: 0% 50%;
`;

/* 3D card shell */
const CardShell = styled(motion.article)`
  scroll-snap-align: start;
  border-radius: 26px;
  position: relative;

  background: rgba(255, 255, 255, 0.72);
  outline: 1px solid rgba(17, 17, 17, 0.09);
  outline-offset: -1px;

  box-shadow: 0 24px 70px rgba(0, 0, 0, 0.08);
  overflow: hidden;

  transform-style: preserve-3d;
`;

const CardInner = styled.div`
  padding: 1.25rem 1.25rem 1.1rem;

  @media (min-width: 980px) {
    padding: 1.35rem 1.35rem 1.2rem;
  }
`;

const Shimmer = styled.div`
  position: absolute;
  inset: -2px;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.25s ease;

  /* “designer” sheen */
  background: linear-gradient(
    110deg,
    transparent 35%,
    rgba(255, 255, 255, 0.6) 50%,
    transparent 65%
  );
  transform: translateX(-40%);
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

/* Magnetic CTA */
const CTA = styled(motion(Link))`
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;

  padding: 0.95rem 1.35rem;
  border-radius: 999px;

  background: #111;
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

/* 3D tilt hook */
function useTilt() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-1, 1], [10, -10]);
  const rotateY = useTransform(x, [-1, 1], [-12, 12]);

  const rX = useSpring(rotateX, { stiffness: 220, damping: 18 });
  const rY = useSpring(rotateY, { stiffness: 220, damping: 18 });

  const scale = useSpring(1, { stiffness: 260, damping: 18 });

  function onMove(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width; // 0..1
    const py = (e.clientY - rect.top) / rect.height; // 0..1
    x.set((px - 0.5) * 2); // -1..1
    y.set((py - 0.5) * 2);
  }

  function onEnter() {
    scale.set(1.02);
  }

  function onLeave() {
    x.set(0);
    y.set(0);
    scale.set(1);
  }

  return { rX, rY, scale, onMove, onEnter, onLeave };
}

/* Magnetic button hook */
function useMagnet(strength = 10) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const x = useSpring(mx, { stiffness: 240, damping: 16 });
  const y = useSpring(my, { stiffness: 240, damping: 16 });

  function onMove(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    mx.set(clamp(dx / 6, -strength, strength));
    my.set(clamp(dy / 6, -strength, strength));
  }

  function onLeave() {
    mx.set(0);
    my.set(0);
  }

  return { x, y, onMove, onLeave };
}

function TiltCard({ s }) {
  const { rX, rY, scale, onMove, onEnter, onLeave } = useTilt();
  const [hover, setHover] = useState(false);

  return (
    <CardShell
      onMouseMove={onMove}
      onMouseEnter={() => {
        setHover(true);
        onEnter();
      }}
      onMouseLeave={() => {
        setHover(false);
        onLeave();
      }}
      whileTap={{ scale: 0.99 }}
      style={{
        rotateX: rX,
        rotateY: rY,
        scale,
      }}
      variants={reveal}
      initial="hidden"
      whileInView="show"
      custom={0.15}
      viewport={{ once: true, amount: 0.35 }}
    >
      <Shimmer
        style={{
          opacity: hover ? 1 : 0,
          transform: hover ? "translateX(40%)" : "translateX(-40%)",
          transition: "transform 0.8s ease, opacity 0.25s ease",
        }}
      />
      <CardInner>
        <CardTop>
          <Step>{s.step}</Step>
          <Badge>{s.badge}</Badge>
        </CardTop>
        <CardTitle>{s.title}</CardTitle>
        <CardText>{s.text}</CardText>
      </CardInner>
    </CardShell>
  );
}

export default function EnfoqueSlider() {
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

  // Progress bar from horizontal scroll
  const railRef = useRef(null);
  const p = useMotionValue(0);
  const progress = useSpring(p, { stiffness: 180, damping: 22 });

  useEffect(() => {
    const el = railRef.current;
    if (!el) return;

    const onScroll = () => {
      const max = el.scrollWidth - el.clientWidth;
      const ratio = max <= 0 ? 1 : el.scrollLeft / max;
      p.set(clamp(ratio, 0, 1));
    };

    onScroll();
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [p]);

  // Magnetic CTA motion
  const magnet = useMagnet(12);

  // Spotlight effect motion
  const wrapRef = useRef(null);
  const sx = useMotionValue(50);
  const sy = useMotionValue(50);

  const sxSpring = useSpring(sx, { stiffness: 160, damping: 20 });
  const sySpring = useSpring(sy, { stiffness: 160, damping: 20 });

  const spotlightBg = useTransform(
    [sxSpring, sySpring],
    ([x, y]) => `
  radial-gradient(
    460px 340px at ${x}% ${y}%,
    rgba(229, 0, 126, 0.07)

    transparent 60%
  )
`
  );

  const [spotOn, setSpotOn] = useState(false);

  function onSpotMove(e) {
    const el = wrapRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top) / r.height) * 100;
    sx.set(clamp(x, 0, 100));
    sy.set(clamp(y, 0, 100));
  }

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
            Está en la caída, la proporción y el remate. Aquí es donde somos
            obsesivos — y se nota.
          </Lead>
        </Top>

        <RailWrap
          ref={wrapRef}
          onMouseEnter={() => setSpotOn(true)}
          onMouseLeave={() => setSpotOn(false)}
          onMouseMove={onSpotMove}
        >
          <Spotlight style={{ opacity: spotOn ? 1 : 0 }}>
            <SpotlightMask style={{ background: spotlightBg }} />
          </Spotlight>

          <Rail ref={railRef}>
            {steps.map((s) => (
              <TiltCard key={s.title} s={s} />
            ))}
          </Rail>

          <ProgressTrack aria-hidden="true">
            <ProgressBar style={{ scaleX: progress }} />
          </ProgressTrack>
        </RailWrap>

        <Bottom>
          <CTA
            to="/contact"
            onMouseMove={magnet.onMove}
            onMouseLeave={magnet.onLeave}
            style={{ x: magnet.x, y: magnet.y }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.99 }}
          >
            Pedir propuesta <ArrowRight size={18} />
          </CTA>
        </Bottom>
      </Inner>
    </Section>
  );
}
