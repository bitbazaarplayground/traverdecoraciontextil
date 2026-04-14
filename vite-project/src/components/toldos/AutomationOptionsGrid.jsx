import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
/* =========================
   IMAGES
========================= */

import packBackground1200 from "../../assets/Automatizacion/heroB-1200.webp";
import packBackground400 from "../../assets/Automatizacion/heroB-400.webp";
import packBackground600 from "../../assets/Automatizacion/heroB-600.webp";
import packBackground800 from "../../assets/Automatizacion/heroB-800.webp";

import automatizacionPack1200 from "../../assets/Automatizacion/domoticaInd-1200.webp";
import automatizacionPack400 from "../../assets/Automatizacion/domoticaInd-400.webp";
import automatizacionPack600 from "../../assets/Automatizacion/domoticaInd-600.webp";
import automatizacionPack800 from "../../assets/Automatizacion/domoticaInd-800.webp";

import programaHorarios1200 from "../../assets/Automatizacion/programa-1200.webp";
import programaHorarios400 from "../../assets/Automatizacion/programa-400.webp";
import programaHorarios600 from "../../assets/Automatizacion/programa-600.webp";
import programaHorarios800 from "../../assets/Automatizacion/programa-800.webp";

/* =========================
   IMAGE HELPERS
========================= */

const responsiveImages = {
  automatizacion: {
    400: packBackground400,
    600: packBackground600,
    800: packBackground800,
    1200: packBackground1200,
  },
  completa: {
    400: automatizacionPack400,
    600: automatizacionPack600,
    800: automatizacionPack800,
    1200: automatizacionPack1200,
  },
  individual: {
    400: programaHorarios400,
    600: programaHorarios600,
    800: programaHorarios800,
    1200: programaHorarios1200,
  },
};

const getSrcSet = (images) =>
  `${images[400]} 400w, ${images[600]} 600w, ${images[800]} 800w, ${images[1200]} 1200w`;

/* =========================
   DATA
========================= */

const CARD_ITEMS = [
  {
    key: "automatizacion",
    label: "Automatización",
    title: "Control exterior más cómodo, preciso y elegante",
    text: "Motores, sensores y automatizaciones pensados para proteger mejor el sistema, aportar confort y simplificar el uso diario.",
    to: "/automatizacion",
    images: responsiveImages.automatizacion,
    alt: "Automatización para toldos y sistemas de protección solar",
    featured: true,
  },
  {
    key: "completa",
    label: "Completa",
    title: "Una experiencia conectada de principio a fin",
    text: "Control por app, escenas y sensores integrados en una solución más completa para quienes buscan máximo confort, diseño y automatización.",
    to: "/automatizacion/completa",
    images: responsiveImages.completa,
    alt: "Automatización completa para toldos y sistemas motorizados",
  },
  {
    key: "individual",
    label: "Individual",
    title: "Motoriza un producto con una solución práctica y cuidada",
    text: "La opción ideal para automatizar un toldo o un sistema concreto sin necesidad de plantear una instalación integral.",
    to: "/automatizacion/individual",
    images: responsiveImages.individual,
    alt: "Automatización individual para toldos y otros productos",
  },
];

/* =========================
   COMPONENT
========================= */

export default function AutomationOptionsGrid() {
  const featured = CARD_ITEMS.find((item) => item.featured);
  const secondary = CARD_ITEMS.filter((item) => !item.featured);

  return (
    <Wrap aria-label="Opciones de automatización">
      <Grid>
        <FeaturedCard to={featured.to} aria-label={featured.title}>
          <CardImage
            src={featured.images[800]}
            srcSet={getSrcSet(featured.images)}
            sizes="(max-width: 899px) 100vw, 60vw"
            alt={featured.alt}
            loading="lazy"
            decoding="async"
          />
          <CardOverlay />
          <CardFrame aria-hidden="true" />
          <FeaturedContent>
            <CardTag>{featured.label}</CardTag>
            <FeaturedTitle>{featured.title}</FeaturedTitle>
            <FeaturedText>{featured.text}</FeaturedText>
          </FeaturedContent>
        </FeaturedCard>

        <SideStack>
          {secondary.map((item) => (
            <SecondaryCard key={item.key} to={item.to} aria-label={item.title}>
              <CardImage
                src={item.images[800]}
                srcSet={getSrcSet(item.images)}
                sizes="(max-width: 899px) 100vw, 40vw"
                alt={item.alt}
                loading="lazy"
                decoding="async"
              />
              <CardOverlay />
              <CardFrame aria-hidden="true" />
              <SecondaryContent>
                <CardTag>{item.label}</CardTag>
                <SecondaryTitle>{item.title}</SecondaryTitle>
                <SecondaryText>{item.text}</SecondaryText>
              </SecondaryContent>
            </SecondaryCard>
          ))}
        </SideStack>
      </Grid>
    </Wrap>
  );
}

/* =========================
   STYLES
========================= */

const Wrap = styled.section`
  margin-top: 2.2rem;

  @media (max-width: 768px) {
    margin-top: 1.8rem;
  }
`;

const Grid = styled.div`
  display: grid;
  gap: 1rem;

  @media (min-width: 900px) {
    grid-template-columns: minmax(0, 1.08fr) minmax(320px, 0.92fr);
    align-items: stretch;
  }
`;

const SideStack = styled.div`
  display: grid;
  gap: 1rem;
`;

const cardShine = keyframes`
  0% {
    left: -130%;
  }
  100% {
    left: 130%;
  }
`;

const BaseCard = styled(Link)`
  position: relative;
  display: block;
  min-height: 260px;
  border-radius: 28px;
  overflow: hidden;
  text-decoration: none;
  color: #fff;
  isolation: isolate;
  background: #141414;
  border: 1px solid;
  box-shadow: 0 24px 70px rgba(0, 0, 0, 0.14);
  transform: translateY(0);
  transition: transform 240ms ease, box-shadow 240ms ease,
    border-color 240ms ease;

  &::after {
    content: "";
    position: absolute;
    top: -20%;
    left: -130%;
    width: 36%;
    height: 140%;
    z-index: 2;
    pointer-events: none;
    opacity: 0.8 on hover;
    transform: rotate(14deg);
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.05) 30%,
      rgba(255, 255, 255, 0.18) 50%,
      rgba(255, 255, 255, 0.05) 70%,
      rgba(255, 255, 255, 0) 100%
    );
    transition: opacity 180ms ease;
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 34px 90px rgba(0, 0, 0, 0.2);
    border-color: rgba(214, 124, 164, 0.22);
  }

  &:hover::after {
    opacity: 1;
    animation: ${cardShine} 900ms ease forwards;
  }

  &:active {
    transform: translateY(0);
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 4px rgba(214, 124, 164, 0.18),
      0 34px 90px rgba(0, 0, 0, 0.18);
  }

  @media (hover: none) {
    &:hover {
      transform: none;
      box-shadow: 0 24px 70px rgba(0, 0, 0, 0.14);
      border-color: rgba(17, 17, 17, 0.08);
    }

    &:hover::after {
      opacity: 0;
      animation: none;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    transition: box-shadow 240ms ease, border-color 240ms ease;

    &::after {
      display: none;
    }

    &:hover {
      transform: none;
    }
  }
`;

const FeaturedCard = styled(BaseCard)`
  min-height: 520px;

  @media (max-width: 899px) {
    min-height: 380px;
  }
`;

const SecondaryCard = styled(BaseCard)`
  min-height: 252px;

  @media (max-width: 899px) {
    min-height: 295px;
  }
`;

const CardImage = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(1.01);
  transition: transform 700ms ease, filter 350ms ease;

  ${BaseCard}:hover & {
    transform: scale(1.05);
    filter: saturate(1.03);
  }

  @media (hover: none) {
    ${BaseCard}:hover & {
      transform: scale(1.01);
      filter: none;
    }
  }
`;

const CardOverlay = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
  background: linear-gradient(
      to top,
      rgba(7, 7, 7, 0.9) 8%,
      rgba(7, 7, 7, 0.58) 42%,
      rgba(7, 7, 7, 0.2) 100%
    ),
    linear-gradient(to right, rgba(0, 0, 0, 0.22), rgba(0, 0, 0, 0.05));
  transition: background 240ms ease;

  ${BaseCard}:hover & {
    background: linear-gradient(
        to top,
        rgba(7, 7, 7, 0.9) 8%,
        rgba(7, 7, 7, 0.56) 42%,
        rgba(7, 7, 7, 0.18) 100%
      ),
      linear-gradient(
        to right,
        rgba(214, 124, 164, 0.16),
        rgba(214, 124, 164, 0.04)
      );
  }

  @media (max-width: 768px) {
    background: linear-gradient(
        to top,
        rgba(7, 7, 7, 0.9) 10%,
        rgba(7, 7, 7, 0.62) 46%,
        rgba(7, 7, 7, 0.22) 100%
      ),
      linear-gradient(to right, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.04));
  }

  @media (hover: none) {
    ${BaseCard}:hover & {
      background: linear-gradient(
          to top,
          rgba(7, 7, 7, 0.9) 10%,
          rgba(7, 7, 7, 0.62) 46%,
          rgba(7, 7, 7, 0.22) 100%
        ),
        linear-gradient(to right, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.04));
    }
  }
`;

const CardFrame = styled.div`
  position: absolute;
  inset: 33px;
  z-index: 2;
  border: 1px solid rgba(201, 165, 92, 0.88);
  pointer-events: none;
  transition: border-color 240ms ease, box-shadow 240ms ease;

  @media (max-width: 768px) {
    inset: 14px;
    border-color: rgba(214, 124, 164, 0.42);
  }

  @media (hover: none) {
    ${BaseCard}:hover & {
      border-color: rgba(214, 124, 164, 0.42);
      box-shadow: none;
    }
  }
`;

const FeaturedContent = styled.div`
  position: absolute;
  inset: 0;
  z-index: 3;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  text-align: center;
  padding: 2rem 2.4rem;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: radial-gradient(
      ellipse at center,
      rgba(0, 0, 0, 0.32) 0%,
      rgba(0, 0, 0, 0.14) 34%,
      rgba(0, 0, 0, 0) 72%
    );
    z-index: -1;
  }

  @media (max-width: 768px) {
    justify-content: flex-end;
    padding: 1.4rem 1.2rem 1.25rem;
  }
`;

const SecondaryContent = styled.div`
  position: absolute;
  inset: 0;
  z-index: 3;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  text-align: center;
  padding: 1.5rem 1.25rem;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: radial-gradient(
      ellipse at center,
      rgba(0, 0, 0, 0.28) 0%,
      rgba(0, 0, 0, 0.12) 34%,
      rgba(0, 0, 0, 0) 72%
    );
    z-index: -1;
  }

  @media (max-width: 768px) {
    justify-content: flex-end;
    padding: 1.3rem 1.1rem 1.15rem;
  }
`;

const CardTag = styled.span`
  position: absolute;
  top: 1.05rem;
  left: 1.25rem;
  z-index: 4;

  display: inline-flex;
  align-items: center;
  min-height: 32px;
  padding: 0.42rem 0.8rem;

  background: rgba(201, 165, 92, 0.96);
  color: #fff;
  border-radius: 6px;
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.16);

  font-size: 0.74rem;
  font-weight: 800;
  line-height: 1;
  letter-spacing: 0.04em;

  @media (min-width: 900px) {
    top: 1.25rem;
    left: 1.25rem;
  }

  @media (max-width: 768px) {
    top: 0.95rem;
    left: 0.95rem;
    min-height: 30px;
    padding: 0.38rem 0.72rem;
    font-size: 0.7rem;
  }
`;

const FeaturedTitle = styled.h3`
  margin: 0 0 0.75rem;
  width: min(520px, calc(100% - 90px));
  font-family: "Cormorant Garamond", ui-serif, Georgia, serif;
  font-size: clamp(2rem, 2.8vw, 3rem);
  line-height: 0.95;
  font-weight: 650;
  letter-spacing: -0.03em;
  color: rgba(255, 255, 255, 0.99);
  text-wrap: balance;
  text-shadow: 0 2px 14px rgba(0, 0, 0, 0.24);

  @media (max-width: 768px) {
    width: min(100%, 16ch);
    font-size: clamp(1.55rem, 7vw, 2rem);
    line-height: 0.98;
    margin-bottom: 0.65rem;
  }
`;

const SecondaryTitle = styled.h3`
  margin: 0 0 0.6rem;
  width: min(360px, calc(100% - 70px));
  font-family: "Cormorant Garamond", ui-serif, Georgia, serif;
  font-size: clamp(1.38rem, 1.9vw, 1.95rem);
  line-height: 0.98;
  font-weight: 650;
  letter-spacing: -0.025em;
  color: rgba(255, 255, 255, 0.99);
  text-wrap: balance;
  text-shadow: 0 2px 14px rgba(0, 0, 0, 0.22);

  @media (max-width: 768px) {
    width: min(100%, 18ch);
    font-size: clamp(1.28rem, 5.5vw, 1.55rem);
    line-height: 1.02;
  }
`;

const FeaturedText = styled.p`
  margin: 0;
  width: min(470px, calc(100% - 110px));
  font-size: 1rem;
  line-height: 1.62;
  color: rgba(255, 255, 255, 0.9);
  text-shadow: 0 2px 12px rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    width: min(100%, 34ch);
    font-size: 0.96rem;
    line-height: 1.58;
  }
`;

const SecondaryText = styled.p`
  margin: 0;
  width: min(360px, calc(100% - 70px));
  font-size: 0.93rem;
  line-height: 1.58;
  color: rgba(255, 255, 255, 0.88);
  text-shadow: 0 2px 12px rgba(0, 0, 0, 0.18);

  @media (max-width: 768px) {
    width: min(100%, 32ch);
    font-size: 0.92rem;
  }
`;
