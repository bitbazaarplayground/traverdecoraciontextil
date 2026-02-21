// src/styles/ui.js
import styled from "styled-components";

/* =========================
   LAYOUT
========================= */

export const Container = styled.div`
  width: min(${({ theme }) => theme.layout.maxWidth}, calc(100% - 32px));
  margin: 0 auto;

  @media (min-width: 768px) {
    width: min(${({ theme }) => theme.layout.maxWidth}, calc(100% - 64px));
  }
`;

export const Section = styled.section`
  padding: 72px 0;

  @media (min-width: 1024px) {
    padding: 104px 0;
  }
`;

export const SectionTight = styled.section`
  padding: 52px 0;

  @media (min-width: 1024px) {
    padding: 72px 0;
  }
`;

/* =========================
   TYPOGRAPHY (Editorial)
========================= */

export const Kicker = styled.p`
  letter-spacing: 0.18em;
  text-transform: uppercase;
  font-size: 0.8rem;
  color: rgba(17, 17, 17, 0.55);
  margin: 0 0 0.65rem 0;
`;

export const H1 = styled.h1`
  margin: 0;
  font-size: clamp(2.1rem, 4.4vw, 3.4rem);
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1.05;
  color: ${({ theme }) => theme.colors.dark};
`;

export const H2 = styled.h2`
  margin: 0;
  font-size: clamp(1.65rem, 2.2vw, 2.2rem);
  font-weight: 700;
  letter-spacing: -0.02em;
  color: ${({ theme }) => theme.colors.dark};
`;

export const Lead = styled.p`
  margin: 0.85rem 0 0;
  max-width: 80ch;
  font-size: 1.02rem;
  line-height: 1.75;
  color: ${({ theme }) => theme.ui?.textMuted || "rgba(17,17,17,0.68)"};

  b {
    color: rgba(17, 17, 17, 0.9);
    font-weight: 700;
  }
`;

export const P = styled.p`
  margin: 0;
  line-height: 1.75;
  color: ${({ theme }) => theme.ui?.textMuted || "rgba(17,17,17,0.68)"};
`;

export const Fine = styled.p`
  margin: 0;
  font-size: 0.82rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.ui?.textFaint || "rgba(17,17,17,0.52)"};
`;

/* Editorial helper */
export const SerifNote = styled.p`
  margin: 0;
  font-family: "Cormorant Garamond", serif;
  font-style: italic;
  font-weight: 300;
  font-size: 1.05rem;
  line-height: 1.7;
  color: rgba(17, 17, 17, 0.72);
`;

export const Accent = styled.span`
  font-family: "Cormorant Garamond", serif;
  font-style: italic;
  font-weight: 300;
  color: ${({ theme }) => theme.colors.primary};
`;

export const Underline = styled.span`
  background-image: linear-gradient(
    to right,
    rgba(229, 0, 126, 0.22),
    rgba(229, 0, 126, 0.22)
  );
  background-repeat: no-repeat;
  background-size: 100% 0.42em;
  background-position: 0 92%;
`;

/* =========================
   SURFACES
========================= */

export const Card = styled.div`
  border-radius: ${({ theme }) => theme.ui?.radius?.lg || "22px"};
  background: ${({ theme }) => theme.colors.light};
  border: 1px solid ${({ theme }) => theme.ui?.border || "rgba(17,17,17,0.12)"};
  box-shadow: ${({ theme }) =>
    theme.ui?.shadowSm || "0 10px 30px rgba(0,0,0,0.08)"};
`;

export const Glass = styled.div`
  border-radius: ${({ theme }) => theme.ui?.radius?.xl || "30px"};
  background: rgba(255, 255, 255, 0.82);
  border: 1px solid ${({ theme }) => theme.ui?.border || "rgba(17,17,17,0.12)"};
  box-shadow: ${({ theme }) =>
    theme.ui?.shadowMd || "0 18px 60px rgba(0,0,0,0.12)"};
  backdrop-filter: blur(10px);
`;

/* =========================
   BADGES / CHIPS
========================= */

export const Dot = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.primary};
  box-shadow: 0 0 0 6px rgba(229, 0, 126, 0.1);
`;

export const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: ${({ theme }) => theme.ui?.radius?.pill || "999px"};
  font-size: 0.78rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  border: 1px solid ${({ theme }) => theme.ui?.border || "rgba(17,17,17,0.12)"};
  background: ${({ theme }) => theme.colors.gray};
  color: ${({ theme }) => theme.colors.dark};
`;

export const BadgePrimary = styled(Badge)`
  border-color: rgba(229, 0, 126, 0.25);
  background: rgba(229, 0, 126, 0.1);
`;

export const Chip = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.6rem 0.8rem;
  border-radius: ${({ theme }) => theme.ui?.radius?.pill || "999px"};
  border: 1px solid ${({ theme }) => theme.ui?.border || "rgba(17,17,17,0.12)"};
  background: ${({ theme }) => theme.colors.gray};
  color: rgba(17, 17, 17, 0.86);
  font-weight: 650;
  font-size: 0.92rem;
`;

/* =========================
   BUTTONS (anchors to avoid <a><button>)
========================= */

const BaseBtn = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.55rem;
  padding: 0.95rem 1.45rem;
  border-radius: ${({ theme }) => theme.ui?.radius?.pill || "999px"};
  font-weight: 720;
  text-decoration: none;
  transition: transform 180ms ease, opacity 180ms ease, background 180ms ease,
    border-color 180ms ease;
  user-select: none;

  &:hover {
    transform: translateY(-1px);
  }
`;

export const ButtonPrimary = styled(BaseBtn)`
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.light};

  &:hover {
    opacity: 0.92;
  }
`;

export const ButtonGhost = styled(BaseBtn)`
  background: rgba(17, 17, 17, 0.04);
  border: 1px solid rgba(17, 17, 17, 0.1);
  color: ${({ theme }) => theme.colors.dark};

  &:hover {
    background: rgba(17, 17, 17, 0.07);
  }
`;

export const ButtonDark = styled(BaseBtn)`
  background: ${({ theme }) => theme.colors.dark};
  color: ${({ theme }) => theme.colors.light};

  &:hover {
    opacity: 0.92;
  }
`;

/* Pills (same as buttons but slightly smaller) */
export const PillLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.55rem;
  padding: 0.82rem 1.15rem;
  border-radius: ${({ theme }) => theme.ui?.radius?.pill || "999px"};
  border: 1px solid rgba(17, 17, 17, 0.1);
  background: ${({ theme }) => theme.colors.light};
  color: ${({ theme }) => theme.colors.dark};
  font-weight: 720;
  text-decoration: none;
  transition: transform 180ms ease, background 180ms ease;

  &:hover {
    transform: translateY(-1px);
    background: ${({ theme }) => theme.colors.gray};
  }
`;

export const PillPrimary = styled(PillLink)`
  background: rgba(229, 0, 126, 0.1);
  border-color: rgba(229, 0, 126, 0.2);
`;

/* =========================
   LISTS
========================= */

export const Tick = styled.span`
  width: 18px;
  height: 18px;
  border-radius: 6px;
  display: inline-grid;
  place-items: center;
  background: rgba(229, 0, 126, 0.1);
  border: 1px solid rgba(229, 0, 126, 0.18);
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 800;
  font-size: 12px;
  margin-top: 2px;
`;

export const TickList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 10px;

  li {
    display: grid;
    grid-template-columns: 18px 1fr;
    gap: 10px;
    align-items: start;
    line-height: 1.75;
    color: ${({ theme }) => theme.ui?.textMuted || "rgba(17,17,17,0.68)"};
  }
`;

/* =========================
   SMALL UTIL
========================= */

export const Icon = styled.span`
  display: inline-flex;
  width: 1.2em;
  justify-content: center;
`;

export const Divider = styled.div`
  height: 1px;
  background: rgba(17, 17, 17, 0.06);
`;

export const HoverCard = styled(Card)`
  transition: transform 180ms ease, box-shadow 180ms ease,
    border-color 180ms ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: ${({ theme }) =>
      theme.ui?.shadowMd || "0 18px 60px rgba(0,0,0,0.12)"};
    border-color: rgba(229, 0, 126, 0.18);
  }
`;
