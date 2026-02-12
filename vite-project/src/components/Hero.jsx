import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { trackEvent } from "../lib/analytics";

import heroMobile from "../assets/heroHome/1-mobile.webp";
import heroDesktop from "../assets/heroHome/1.webp";

import blackoutImg from "../assets/heroHome/2.webp";
import chenilleImg from "../assets/heroHome/3.webp";
import Img2 from "../assets/heroHome/4.webp";
import Img3 from "../assets/heroHome/5.webp";
import wallpaper from "../assets/heroHome/6.webp";

/* =========================
   HERO LAYOUT (EDITORIAL)
========================= */

const HeroWrapper = styled.section`
  width: 100%;
  min-height: 100svh;
  position: relative;
  overflow: hidden;

  /* fallback so no grey flash */
  background: #0b0c0f;

  display: grid;
  place-items: stretch;
`;
const HeroImg = styled(motion.img)`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(1.03);
  filter: brightness(0.9) contrast(0.98) saturate(0.95);
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.28),
      rgba(0, 0, 0, 0.18) 40%,
      rgba(0, 0, 0, 0.32)
    ),
    radial-gradient(
      900px 520px at 50% 55%,
      rgba(255, 255, 255, 0.04),
      rgba(0, 0, 0, 0.22)
    );

  backdrop-filter: saturate(1.02);
  -webkit-backdrop-filter: saturate(1.02);

  @media (max-width: 768px) {
    backdrop-filter: none;
    -webkit-backdrop-filter: none;

    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.22),
      rgba(0, 0, 0, 0.14) 45%,
      rgba(0, 0, 0, 0.28)
    );
  }
`;

const Content = styled.div`
  position: relative;
  z-index: 2;

  width: min(1120px, 100%);
  margin: 0 auto;

  padding: 7.5rem 1.5rem 6rem;

  /* Premium move: content sits lower, not dead center */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;

  min-height: 100svh;
  text-align: center;
  color: #fff;

  @media (max-width: 768px) {
    padding: 6.5rem 1.1rem 5.25rem;
  }
`;

/* =========================
   NAV-LIKE MICRO LINE
========================= */

const MicroLine = styled(motion.p)`
  margin: 0 0 1.25rem;
  font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial,
    "Helvetica Neue", sans-serif;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.28em;
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.82);
  text-shadow: 0 12px 36px rgba(0, 0, 0, 0.38);

  @media (max-width: 768px) {
    letter-spacing: 0.22em;
    font-size: 0.72rem;
    margin-bottom: 1.05rem;
  }
`;

/* =========================
   HEADLINE (CORMORANT)
========================= */

const Title = styled.h1`
  margin: 0;
  font-family: "Cormorant Garamond", ui-serif, Georgia, serif;
  font-weight: 300;
  font-style: normal;
  text-transform: uppercase;

  /* Keep it centered and single-line */
  text-align: center;
  white-space: nowrap;

  line-height: 1em;
  letter-spacing: 0.02em;

  color: rgba(255, 255, 255, 0.98);
  text-shadow: 0 16px 50px rgba(0, 0, 0, 0.45);

  /* Desktop unchanged */
  font-size: clamp(2.6rem, 6vw, 6.6rem);

  /* Mobile: scale down enough so it NEVER wraps or clips */
  @media (max-width: 768px) {
    font-size: clamp(1.55rem, 7.2vw, 3.2rem);
    letter-spacing: 0.012em;
  }

  /* Very small phones: one more safety step */
  @media (max-width: 360px) {
    font-size: 1.45rem;
    letter-spacing: 0.01em;
  }
`;

const ScriptLine = styled(motion.div)`
  margin-top: 0.2em;

  font-family: "Cormorant Garamond", ui-serif, Georgia, serif;
  font-weight: 300;
  font-style: italic;

  font-size: clamp(1.6rem, 3.8vw, 4.2rem);
  line-height: 1em;

  letter-spacing: -0.005em;

  color: rgba(255, 255, 255, 0.9);
  text-shadow: 0 16px 50px rgba(0, 0, 0, 0.45);

  em {
    font-style: inherit;
    font-weight: 400; /* tiny emphasis */
    color: ${({ theme }) => theme.colors.primary};
  }

  @media (max-width: 768px) {
    margin-top: 0.28em;
    font-size: clamp(1.45rem, 7.2vw, 2.55rem);
    line-height: 1.08em;
  }
`;

/* =========================
   CTA (QUIETER, LUXURY)
========================= */

const Actions = styled(motion.div)`
  margin-top: 2.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.9rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    margin-top: 1.85rem;
  }
`;

const PrimaryAction = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  padding: 0.9rem 2.05rem;
  border-radius: 999px;
  border: 0;

  background: rgba(255, 255, 255, 0.9);
  color: #0b0c0f;

  font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial,
    "Helvetica Neue", sans-serif;
  font-weight: 600;
  font-size: 0.82rem;
  text-transform: uppercase;
  letter-spacing: 0.18em;

  text-decoration: none;

  box-shadow: 0 18px 60px rgba(0, 0, 0, 0.35);
  transition: transform 0.25s ease, background 0.25s ease, opacity 0.25s ease;

  cursor: pointer;

  &:hover {
    transform: translateY(-1px);
    background: rgba(255, 255, 255, 0.96);
  }
`;

/* =========================
   SIMPLE SCROLL INDICATOR
========================= */

const ScrollHint = styled.div`
  position: absolute;
  z-index: 2;
  left: 50%;
  bottom: 1.35rem;
  transform: translateX(-50%);

  width: 1px;
  height: 42px;
  background: rgba(255, 255, 255, 0.35);

  @media (max-width: 768px) {
    bottom: 1.1rem;
    height: 36px;
  }
`;

/* =========================
   COMPONENT
========================= */

export default function Hero({ onOpenAsesoramiento }) {
  const slides = useMemo(
    () => [heroDesktop, Img2, blackoutImg, chenilleImg, Img3, wallpaper],
    []
  );

  const [index, setIndex] = useState(0);
  const [displaySrc, setDisplaySrc] = useState(slides[0]);

  // Auto-rotate (same concept as theirs, slightly calmer pacing)
  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 7000);
    return () => clearInterval(id);
  }, [slides.length]);

  // Warm the rest of the hero images (avoid competing with first paint)
  useEffect(() => {
    if (window.matchMedia("(max-width: 768px)").matches) return;

    const rest = slides.slice(1);

    const preload = () => {
      rest.forEach((src) => {
        const img = new Image();
        img.src = src;
      });
    };

    if ("requestIdleCallback" in window) {
      window.requestIdleCallback(preload, { timeout: 1500 });
    } else {
      setTimeout(preload, 800);
    }
  }, [slides]);

  useEffect(() => {
    const nextSrc = slides[index];
    const img = new Image();
    img.src = nextSrc;
    img.onload = () => setDisplaySrc(nextSrc);
  }, [index, slides]);

  return (
    <HeroWrapper>
      <AnimatePresence initial={false}>
        {displaySrc === slides[0] ? (
          <motion.picture
            key="hero-lcp"
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1.03 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 1.05, ease: "easeOut" }}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
            }}
          >
            <source media="(max-width: 768px)" srcSet={heroMobile} />
            <img
              src={heroDesktop}
              alt=""
              width="1100"
              height="733"
              fetchPriority="high"
              loading="eager"
              decoding="async"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transform: "scale(1.03)",
                filter: "brightness(0.9) contrast(0.98) saturate(0.95)",
                display: "block",
              }}
            />
          </motion.picture>
        ) : (
          <HeroImg
            key={displaySrc}
            src={displaySrc}
            alt=""
            fetchPriority="auto"
            loading="lazy"
            decoding="async"
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1.03 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 1.05, ease: "easeOut" }}
          />
        )}
      </AnimatePresence>

      <Overlay />

      <Content>
        <MicroLine
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          Decoración textil · Protección solar · Domótica
        </MicroLine>

        <Title>Diseñamos&nbsp;espacios</Title>

        <ScriptLine>
          que se <em>sienten</em>
        </ScriptLine>

        <Actions
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.05, delay: 0.22, ease: "easeOut" }}
        >
          <PrimaryAction
            type="button"
            onClick={() => {
              trackEvent("open_asesoramiento", {
                source: "hero",
                pack: "General",
              });
              onOpenAsesoramiento?.("General");
            }}
          >
            Solicitar asesoramiento
          </PrimaryAction>
        </Actions>
      </Content>

      <ScrollHint aria-hidden="true" />
    </HeroWrapper>
  );
}
