// src/components/ServicesSection.jsx

import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import Img2_850 from "../assets/Home/HeroImg/img2-mobile.webp";
import Img2_1100 from "../assets/Home/HeroImg/img2.webp";
import Img3_850 from "../assets/Home/HeroImg/img3-mobile.webp";
import Img3_1100 from "../assets/Home/HeroImg/img3.webp";
import restaurante1_850 from "../assets/Home/HeroImg/restaurante1-mobile.webp";
import restaurante1_1100 from "../assets/Home/HeroImg/restaurante1.webp";

const CARD_SIZES = "(max-width: 768px) 92vw, (max-width: 1100px) 30vw, 360px";

/* =========================
   SECTION
========================= */

const Section = styled.section`
  width: 100%;
  padding: 4.4rem 2rem;
  background: #ffffff;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 3.6rem 1.5rem;
  }

  /* Zebra texture — desktop only (width-based, Lighthouse-safe) */
  @media (min-width: 900px) {
    &::before {
      content: "";
      position: absolute;
      inset: -10%;
      background-image: url("/zebra_pattern.webp");
      background-size: cover;
      background-position: center;
      opacity: 0.045;
      filter: grayscale(1) contrast(0.9);
      pointer-events: none;
      z-index: 0;
    }
  }

  /* Subtle radial overlay (cheap, OK on all devices) */
  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: radial-gradient(
      900px 500px at 50% 20%,
      rgba(0, 0, 0, 0.02),
      rgba(0, 0, 0, 0)
    );
    pointer-events: none;
    z-index: 0;
  }
`;

const Inner = styled.div`
  position: relative;
  z-index: 1;
  max-width: 1120px;
  margin: 0 auto;
`;

const Header = styled.div`
  max-width: 820px;
  margin: 0 auto 1.9rem;
  text-align: center;
`;

const Eyebrow = styled.p`
  margin: 0 0 0.9rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  font-size: 0.8rem;
  color: rgba(17, 17, 17, 0.55);
`;

const Title = styled.h2`
  margin: 0 0 0.9rem;
  font-size: 2.2rem;
  font-weight: 600;
  text-align: center;
  color: #111;

  span {
    color: ${({ theme }) => theme.colors.primary};
  }

  @media (max-width: 768px) {
    font-size: 1.95rem;
  }
`;

const Intro = styled.p`
  margin: 0 auto;
  max-width: 74ch;
  font-size: 1.05rem;
  line-height: 1.75;
  color: rgba(17, 17, 17, 0.68);
`;

const Grid = styled.div`
  display: grid;
  gap: 1.15rem;

  @media (min-width: 980px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

/* =========================
   Cards: base styles shared
========================= */

const CardBase = styled.article`
  border-radius: 24px;
  overflow: hidden;
  border: 1px solid rgba(17, 17, 17, 0.08);
  background: #fff;
  box-shadow: 0 28px 85px rgba(0, 0, 0, 0.08);
  transform: translateY(0);
  transition: transform 0.25s ease, box-shadow 0.25s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 40px 110px rgba(0, 0, 0, 0.12);
  }

  @media (hover: none) {
    &:hover {
      transform: translateY(0);
      box-shadow: 0 28px 85px rgba(0, 0, 0, 0.08);
    }
  }
`;

const Media = styled.div`
  position: relative;
  height: 285px;
  overflow: hidden;

  @media (max-width: 768px) {
    height: 240px;
  }
`;

const CardImg = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(1.02);
  transition: transform 0.65s ease;

  ${CardBase}:hover & {
    transform: scale(1.06);
  }

  @media (hover: none) {
    transition: none;
  }
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.05) 0%,
    rgba(0, 0, 0, 0.55) 88%,
    rgba(0, 0, 0, 0.65) 100%
  );
`;

const Badge = styled.div`
  position: absolute;
  top: 16px;
  left: 16px;
  z-index: 2;
  padding: 0.48rem 0.8rem;
  border-radius: 999px;
  font-size: 0.78rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  background: rgba(255, 255, 255, 0.92);
  color: rgba(17, 17, 17, 0.75);
`;

const Content = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  padding: 1.35rem 1.35rem 1.25rem;
  display: grid;
  gap: 0.55rem;
`;

const CardTitle = styled.h3`
  margin: 0;
  font-size: 1.45rem;
  font-weight: 750;
  color: #fff;
  letter-spacing: -0.2px;
`;

const CardText = styled.p`
  margin: 0;
  font-size: 1rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.82);
  max-width: 44ch;
`;

const CardFooter = styled.div`
  margin-top: 0.55rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.8rem;
`;

const AccentDot = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.16);
  display: grid;
  place-items: center;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 900;
  transition: transform 0.25s ease, background 0.25s ease;

  ${CardBase}:hover & {
    transform: translateX(2px);
    background: rgba(255, 255, 255, 0.16);
  }

  @media (hover: none) {
    transition: none;
  }
`;

const MediaLink = styled(Link)`
  display: block;
  position: relative;
  color: inherit;
  text-decoration: none;

  &:focus-visible {
    outline: 3px solid rgba(0, 0, 0, 0.2);
    outline-offset: 4px;
    border-radius: 24px;
  }
`;

const FooterRow = styled.div`
  margin-top: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 0.75rem;
  }
`;

const FooterHint = styled.p`
  margin: 0;
  color: rgba(17, 17, 17, 0.62);
  font-size: 0.98rem;
`;

const AllServicesLinkBase = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.75rem 1rem;
  border-radius: 999px;
  text-decoration: none;
  font-weight: 750;
  color: rgba(17, 17, 17, 0.88);
  background: rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(17, 17, 17, 0.12);
  transition: transform 180ms ease, background 180ms ease;
  will-change: transform;

  span {
    color: ${({ theme }) => theme.colors.primary};
    font-weight: 900;
    transition: transform 180ms ease;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.92);
    transform: scale(1.02);
  }

  &:hover span {
    transform: translateX(2px);
  }

  &:focus-visible {
    outline: 3px solid rgba(0, 0, 0, 0.2);
    outline-offset: 4px;
  }
`;

/* =========================
   COMPONENT
========================= */

export default function ServicesSection() {
  const magnetRef = useRef(null);

  // Store whole module so we can support multiple framer-motion versions safely
  const [fm, setFm] = useState(null);
  const [allowMotion, setAllowMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const desktopLike = window.matchMedia(
      "(hover: hover) and (pointer: fine) and (min-width: 900px)"
    ).matches;

    const shouldAnimate = !reduced && desktopLike;

    let cancelled = false;
    setAllowMotion(shouldAnimate);

    if (shouldAnimate) {
      import("framer-motion").then((mod) => {
        if (!cancelled) setFm(mod);
      });
    }

    return () => {
      cancelled = true;
    };
  }, []);

  const canAnimate = !!(allowMotion && fm?.motion);

  const cardVariants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 26 },
      visible: { opacity: 1, y: 0 },
    }),
    []
  );

  const wrapMotion = (module, Comp) => {
    const m = module?.motion;
    if (!m) return Comp;

    // Newer versions
    if (typeof m.create === "function") return m.create(Comp);

    // Some older versions
    if (typeof m.custom === "function") return m.custom(Comp);

    // Some builds expose motion as a function
    if (typeof m === "function") return m(Comp);

    return Comp;
  };

  const Card = canAnimate ? wrapMotion(fm, CardBase) : CardBase;

  const setMagnet = (e) => {
    if (!canAnimate) return;
    if (!magnetRef.current) return;

    const rect = magnetRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const strength = 0.18;
    const tx = Math.max(-10, Math.min(10, x * strength));
    const ty = Math.max(-8, Math.min(8, y * strength));

    magnetRef.current.style.setProperty("--mx", `${tx}px`);
    magnetRef.current.style.setProperty("--my", `${ty}px`);
  };

  const resetMagnet = () => {
    if (!magnetRef.current) return;
    magnetRef.current.style.setProperty("--mx", "0px");
    magnetRef.current.style.setProperty("--my", "0px");
  };

  return (
    <Section>
      <Inner>
        <Header>
          <Eyebrow>Servicios</Eyebrow>
          <Title>
            <span>Soluciones</span> a medida, con resultado impecable
          </Title>
          <Intro>
            Interior y exterior. Tejidos, sistemas y automatización elegidos con
            criterio, medidos con precisión e instalados con un acabado limpio.
          </Intro>
        </Header>

        <Grid>
          {/* CARD 1 */}
          <Card
            {...(canAnimate
              ? {
                  variants: cardVariants,
                  initial: "hidden",
                  whileInView: "visible",
                  viewport: { once: true },
                  transition: { duration: 0.55, ease: "easeOut" },
                }
              : {})}
          >
            <MediaLink
              to="/cortinas-estores"
              aria-label="Ver Cortinas y Estores"
            >
              <Media>
                <CardImg
                  src={Img2_1100}
                  srcSet={`${Img2_850} 850w, ${Img2_1100} 1100w`}
                  sizes={CARD_SIZES}
                  alt="Cortinas y estores a medida"
                  width="1100"
                  height="733"
                  loading="lazy"
                  decoding="async"
                />
                <Overlay />
                <Badge>Interior</Badge>
                <Content>
                  <CardTitle>Cortinas & Estores</CardTitle>
                  <CardText>
                    Control de luz y privacidad con tejidos y caída perfectos.
                  </CardText>
                  <CardFooter>
                    <div />
                    <AccentDot>→</AccentDot>
                  </CardFooter>
                </Content>
              </Media>
            </MediaLink>
          </Card>

          {/* CARD 2 */}
          <Card
            {...(canAnimate
              ? {
                  variants: cardVariants,
                  initial: "hidden",
                  whileInView: "visible",
                  viewport: { once: true },
                  transition: { duration: 0.7, ease: "easeOut" },
                }
              : {})}
          >
            <MediaLink
              to="/toldos-proteccionsolar"
              aria-label="Ir a Toldos y Protección Solar"
            >
              <Media>
                <CardImg
                  src={restaurante1_1100}
                  srcSet={`${restaurante1_850} 850w, ${restaurante1_1100} 1100w`}
                  sizes={CARD_SIZES}
                  alt="Toldos y protección solar"
                  width="1100"
                  height="733"
                  loading="lazy"
                  decoding="async"
                />
                <Overlay />
                <Badge>Exterior</Badge>
                <Content>
                  <CardTitle>Toldos & Protección Solar</CardTitle>
                  <CardText>
                    Sombra útil, temperatura controlada y estética duradera.
                  </CardText>
                  <CardFooter>
                    <div />
                    <AccentDot>→</AccentDot>
                  </CardFooter>
                </Content>
              </Media>
            </MediaLink>
          </Card>

          {/* CARD 3 */}
          <Card
            {...(canAnimate
              ? {
                  variants: cardVariants,
                  initial: "hidden",
                  whileInView: "visible",
                  viewport: { once: true },
                  transition: { duration: 0.85, ease: "easeOut" },
                }
              : {})}
          >
            <MediaLink
              to="/automatizacion"
              aria-label="Ir a Automatización del Hogar"
            >
              <Media>
                <CardImg
                  src={Img3_1100}
                  srcSet={`${Img3_850} 850w, ${Img3_1100} 1100w`}
                  sizes={CARD_SIZES}
                  alt="Automatización del hogar"
                  width="1100"
                  height="733"
                  loading="lazy"
                  decoding="async"
                />
                <Overlay />
                <Badge>Smart Home</Badge>
                <Content>
                  <CardTitle>Automatización del Hogar</CardTitle>
                  <CardText>
                    Somfy, app y voz. El sistema se anticipa, tú mantienes el
                    control.
                  </CardText>
                  <CardFooter>
                    <div />
                    <AccentDot>→</AccentDot>
                  </CardFooter>
                </Content>
              </Media>
            </MediaLink>
          </Card>
        </Grid>

        <FooterRow>
          <FooterHint>
            Más soluciones a medida para interior y exterior.
          </FooterHint>

          <AllServicesLinkBase
            ref={magnetRef}
            to="/services"
            aria-label="Ver todos los servicios"
            onMouseMove={setMagnet}
            onMouseLeave={resetMagnet}
            onBlur={resetMagnet}
            style={{
              transform:
                "translate3d(var(--mx, 0px), calc(var(--my, 0px) - 2px), 0)",
            }}
          >
            Ver todos los servicios <span>→</span>
          </AllServicesLinkBase>
        </FooterRow>
      </Inner>
    </Section>
  );
}
