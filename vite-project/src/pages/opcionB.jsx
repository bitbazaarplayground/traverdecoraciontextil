import {
  ArrowRight,
  Shield,
  Sparkles,
  Sun,
  Thermometer,
  Wind,
} from "lucide-react";
import { Link } from "react-router-dom";
import styled, { css, keyframes } from "styled-components";

/* =========================
     ASSETS
========================= */
import domoticaControl from "../assets/Automatizacion/heroB.webp";

export default function Auto3() {
  return (
    <Page>
      <Hero>
        <HeroBg aria-hidden="true">
          <HeroImg src={domoticaControl} alt="" />
          <HeroOverlay />
          <HeroNoise />
        </HeroBg>

        <HeroInner>
          <Glass>
            <Kicker>
              <Sparkles size={16} />
              AUTOMATIZACIÓN INTEGRAL
            </Kicker>

            <HeroTitle>
              No es domótica.
              <br />
              Es <span>control invisible</span>.
            </HeroTitle>

            <HeroLead>
              Toldos, estores, persianas y cortinas coordinados con sensores y
              escenas reales. Protege el exterior, regula el calor y convierte
              rutinas en tranquilidad.
            </HeroLead>

            <Chips>
              <Chip>
                <Wind size={16} /> Viento
              </Chip>
              <Chip>
                <Sun size={16} /> Sol
              </Chip>
              <Chip>
                <Thermometer size={16} /> Temperatura
              </Chip>
              <Chip>
                <Shield size={16} /> Protección exterior
              </Chip>
            </Chips>

            <HeroActions>
              <PrimaryLink to="/contact">
                Asesoramiento privado <ArrowRight size={16} />
              </PrimaryLink>
              <SecondaryLink href="#paquetes">Ver paquetes</SecondaryLink>
            </HeroActions>
          </Glass>
        </HeroInner>
      </Hero>
    </Page>
  );
}

/* =========================
   BASE
========================= */

const Page = styled.main`
  width: 100%;
  background: #07080b;
  color: #f4f4f5;
`;

/* =========================
   HERO
========================= */

const Hero = styled.section`
  position: relative;
  overflow: hidden;
  padding: 4.8rem 1.25rem 2.75rem;

  @media (min-width: 900px) {
    padding: 6.2rem 2rem 3.4rem;
  }
`;

const HeroBg = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
`;

const HeroImg = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;

  transform: scale(1.06);
`;

const HeroOverlay = styled.div`
  position: absolute;
  inset: 0;

  background: radial-gradient(
    900px 520px at 35% 16%,
    rgba(0, 0, 0, 0.06),
    rgba(0, 0, 0, 0.14)
  );
`;

/* Film-grain muy sutil (se nota “premium” sin molestar) */
const HeroNoise = styled.div`
  position: absolute;
  inset: 0;
  opacity: 0.08;
  mix-blend-mode: overlay;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='220' height='220' filter='url(%23n)' opacity='.45'/%3E%3C/svg%3E");
  pointer-events: none;
`;

const HeroGlow = styled.div`
  position: absolute;
  inset: 0;
  background: radial-gradient(
      900px 520px at 18% 8%,
      rgba(229, 0, 126, 0.2),
      transparent 58%
    ),
    radial-gradient(
      900px 520px at 85% 18%,
      rgba(255, 255, 255, 0.08),
      transparent 60%
    );
  pointer-events: none;
`;

/* Animaciones: más sutiles + off en móvil/reduced motion */
const gridMove = keyframes`
  from { transform: translateY(0); }
  to { transform: translateY(18px); }
`;

const HeroGrid = styled.div`
  position: absolute;
  inset: -20%;
  opacity: 0.14;
  background-image: linear-gradient(
      rgba(255, 255, 255, 0.12) 1px,
      transparent 1px
    ),
    linear-gradient(90deg, rgba(255, 255, 255, 0.12) 1px, transparent 1px);
  background-size: 68px 68px;

  mask-image: radial-gradient(circle at 45% 20%, black 35%, transparent 72%);
  animation: ${gridMove} 6.2s ease-in-out infinite alternate;

  pointer-events: none;

  @media (max-width: 768px) {
    opacity: 0.08; /* menos ruido en móvil */
    animation: none;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const scan = keyframes`
  from { transform: translateY(-90%); opacity: 0; }
  30% { opacity: .18; }
  to { transform: translateY(120%); opacity: 0; }
`;

const HeroScan = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  height: 220px;
  top: 0;
  opacity: 0.22;
  background: linear-gradient(
    to bottom,
    transparent,
    rgba(229, 0, 126, 0.22),
    transparent
  );
  animation: ${scan} 5.6s ease-in-out infinite;
  pointer-events: none;

  @media (max-width: 768px) {
    display: none; /* en móvil, fuera */
  }

  @media (prefers-reduced-motion: reduce) {
    display: none;
  }
`;

const HeroInner = styled.div`
  position: relative;
  z-index: 1;
  max-width: 1180px;
  margin: 0 auto;
  display: grid;
  gap: 1.4rem;

  @media (min-width: 980px) {
    grid-template-columns: 1.05fr 0.95fr;
    align-items: start;
    gap: 2rem;
  }
`;

/* Glass panel = legibilidad + look premium */
const Glass = styled.div`
  background: rgba(10, 11, 14, 0.62);
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(4px);
  border-radius: 26px;
  padding: 1.35rem 1.25rem;

  @media (min-width: 900px) {
    padding: 1.6rem 1.55rem;
  }
`;

const Kicker = styled.p`
  margin: 0 0 0.9rem 0;
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  font-size: 0.78rem;
  color: rgba(244, 244, 245, 0.76);
`;

const HeroTitle = styled.h1`
  margin: 0;
  font-size: clamp(2.1rem, 4.6vw, 3.7rem);
  font-weight: 820;
  line-height: 1.02;
  letter-spacing: -0.03em;
  color: rgba(244, 244, 245, 0.98);

  span {
    color: ${({ theme }) => theme.colors.primary};
    text-shadow: 0 0 28px rgba(229, 0, 126, 0.35);
  }
`;

const HeroLead = styled.p`
  margin: 1rem 0 0;
  max-width: 66ch;
  font-size: 1.06rem;
  line-height: 1.75;
  color: rgba(244, 244, 245, 0.98);
`;

const Chips = styled.div`
  margin-top: 1.1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
`;

const Chip = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.58rem 0.75rem;
  border-radius: 999px;

  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: rgba(244, 244, 245, 0.88);
  font-weight: 720;
  font-size: 0.86rem;

  svg {
    opacity: 0.92;
  }
`;

const HeroActions = styled.div`
  margin-top: 1.35rem;
  display: flex;
  gap: 0.8rem;
  flex-wrap: wrap;
  align-items: center;
`;

const focusRing = css`
  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 4px rgba(229, 0, 126, 0.25),
      0 0 0 1px rgba(255, 255, 255, 0.22) inset;
  }
`;

const PrimaryLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  justify-content: center;

  padding: 0.95rem 1.5rem;
  border-radius: 999px;

  background: ${({ theme }) => theme.colors.primary};
  color: #0b0c0f;

  font-weight: 900;
  text-decoration: none;

  box-shadow: 0 18px 55px rgba(229, 0, 126, 0.22);
  transition: transform 180ms ease, opacity 180ms ease, box-shadow 180ms ease;

  &:hover {
    opacity: 0.95;
    transform: translateY(-1px);
    box-shadow: 0 22px 62px rgba(229, 0, 126, 0.28);
  }

  ${focusRing}
`;

const SecondaryLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  padding: 0.95rem 1.4rem;
  border-radius: 999px;

  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.14);
  color: rgba(244, 244, 245, 0.92);

  font-weight: 800;
  text-decoration: none;

  transition: transform 180ms ease, background 180ms ease,
    border-color 180ms ease;

  &:hover {
    transform: translateY(-1px);
    background: rgba(255, 255, 255, 0.09);
    border-color: rgba(255, 255, 255, 0.18);
  }

  ${focusRing}
`;
