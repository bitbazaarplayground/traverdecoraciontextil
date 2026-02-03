// Servicios.jsx
import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import cortinasServicios from "../assets/servicios/CortinasServicios.png";
import proyecto from "../assets/servicios/ProyectoAMedida.png";
import somfyApp from "../assets/servicios/app2.png";
import panelJaponesImg from "../assets/servicios/panelJapones.png";
import toldosProteccionSolar from "../assets/servicios/toldoServicios.png";
import venecianasImg from "../assets/servicios/venecianas.png";

/* =========================
   Small scroll-reveal helper (no deps)
   - Cards slide in from left/right
   - Respects prefers-reduced-motion
========================= */

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(!!mq.matches);
    onChange();
    if (mq.addEventListener) mq.addEventListener("change", onChange);
    else mq.addListener(onChange);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", onChange);
      else mq.removeListener(onChange);
    };
  }, []);
  return reduced;
}

function Reveal({ children, from = "left", delay = 0 }) {
  const ref = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) {
      setVisible(true);
      return;
    }
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { root: null, threshold: 0.18, rootMargin: "0px 0px -10% 0px" }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [prefersReducedMotion]);

  return (
    <RevealWrap
      ref={ref}
      $visible={visible}
      $from={from}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </RevealWrap>
  );
}

/* =========================
   PAGE (matches ComplementosVentana.jsx vibe)
========================= */

const Page = styled.main`
  width: 100%;
  background: radial-gradient(
      1200px 600px at 50% 0%,
      rgba(255, 255, 255, 0.04),
      transparent 60%
    ),
    #f5f4f2;
  color: #1c1c1c;
  font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial,
    "Helvetica Neue", sans-serif;
`;

const Container = styled.div`
  width: min(1120px, calc(100% - 2.4rem));
  margin: 0 auto;

  @media (max-width: 768px) {
    width: min(1120px, calc(100% - 2.2rem));
  }
`;

/* =========================
   HERO (editorial)
========================= */

const Hero = styled.section`
  padding: clamp(3.8rem, 6.5vw, 6.1rem) 0 clamp(1.6rem, 3vw, 2.2rem);
`;

const Eyebrow = styled.p`
  margin: 0 0 1rem;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  font-size: 0.75rem;
  color: rgba(0, 0, 0, 0.58);
`;

const HeroTitle = styled.h1`
  margin: 0;
  font-family: "Cormorant Garamond", ui-serif, Georgia, serif;
  font-weight: 300;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  color: rgba(0, 0, 0, 0.92);
  line-height: 1.02;
  font-size: clamp(2.2rem, 5vw, 4.2rem);

  span {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const HeroText = styled.p`
  max-width: 74ch;
  margin: 1.05rem 0 0;
  font-size: 1.05rem;
  line-height: 1.75;
  color: rgba(0, 0, 0, 0.68);
`;

const MicroTrust = styled.p`
  margin: 1.25rem 0 0;
  color: rgba(0, 0, 0, 0.55);
  font-size: 0.92rem;
  line-height: 1.6;
`;

/* =========================
   SERVICES (editorial grid, fewer borders)
========================= */

const Section = styled.section`
  padding: clamp(2.3rem, 5vw, 3.4rem) 0 clamp(3.2rem, 6vw, 5rem);
`;

const ServicesGrid = styled.div`
  display: grid;
  gap: 1.2rem;

  @media (min-width: 980px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1.25rem;
  }
`;

const ServiceCard = styled.article`
  height: 100%;
  display: flex;
  flex-direction: column;

  border-radius: 26px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.55);
  box-shadow: 0 28px 80px rgba(0, 0, 0, 0.08);

  transform: translateY(0);
  transition: transform 240ms ease, box-shadow 240ms ease, background 240ms ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 38px 110px rgba(0, 0, 0, 0.12);
    background: rgba(255, 255, 255, 0.64);
  }
`;

const ServiceMedia = styled.div`
  position: relative;
  height: 270px;
  overflow: hidden;

  @media (max-width: 768px) {
    height: 220px;
  }
`;

const ServiceImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;

  transform: scale(1.02);
  transition: transform 650ms ease;

  ${ServiceCard}:hover & {
    transform: scale(1.06);
  }
`;

const MediaOverlay = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;

  /* Light editorial overlay, not “dark cinematic” */
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.04),
    rgba(0, 0, 0, 0.24)
  );
`;

const Badge = styled.div`
  position: absolute;
  top: 16px;
  left: 16px;
  z-index: 2;

  padding: 0.44rem 0.78rem;
  border-radius: 999px;

  font-size: 0.74rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  font-weight: 650;

  background: rgba(245, 244, 242, 0.85);
  color: rgba(0, 0, 0, 0.68);
`;

const ServiceContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;

  padding: 1.7rem 1.7rem 1.55rem;

  @media (max-width: 768px) {
    padding: 1.45rem 1.35rem 1.3rem;
  }
`;

const ServiceTitle = styled.h3`
  margin: 0;

  font-family: "Cormorant Garamond", ui-serif, Georgia, serif;
  font-weight: 300;
  text-transform: uppercase;
  letter-spacing: 0.02em;

  font-size: 1.8rem;
  line-height: 1.05;
  color: rgba(0, 0, 0, 0.92);
`;

const ValueLine = styled.p`
  margin: 0.75rem 0 0.95rem;
  font-size: 1.02rem;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.75);
  line-height: 1.55;
`;

const ServiceText = styled.p`
  margin: 0 0 1.25rem;
  font-size: 1.02rem;
  line-height: 1.75;
  color: rgba(0, 0, 0, 0.64);
`;

const Actions = styled.div`
  margin-top: auto;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
`;

// const PrimaryCTA = styled(Link)`
//   display: inline-flex;
//   align-items: center;
//   justify-content: center;

//   padding: 0.8rem 1.15rem;
//   border-radius: 999px;

//   background: rgba(0, 0, 0, 0.06);
//   color: rgba(0, 0, 0, 0.86);

//   border: 1px solid rgba(0, 0, 0, 0.1);

//   font-weight: 750;
//   letter-spacing: 0.08em;
//   text-transform: uppercase;
//   font-size: 0.78rem;

//   text-decoration: none;
//   transition: transform 240ms ease, background 240ms ease;

//   &:hover {
//     background: rgba(0, 0, 0, 0.09);
//     transform: translateY(-1px);
//   }
// `;

const PrimaryCTA = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  padding: 0.8rem 1.15rem;
  border-radius: 999px;

  background: ${({ theme }) => theme.colors.primary};
  color: #fff;

  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-size: 0.78rem;

  text-decoration: none;
  transition: transform 240ms ease, filter 240ms ease;

  &:hover {
    transform: translateY(-1px);
    filter: brightness(0.98);
  }
`;

/* =========================
   TRUST STRIP (editorial, calmer)
========================= */

const TrustSection = styled.section`
  padding: 0 0 clamp(3.2rem, 6vw, 4.8rem);
`;

const TrustCard = styled.div`
  border-radius: 28px;
  padding: 2.1rem 2rem;

  background: rgba(255, 255, 255, 0.55);
  box-shadow: 0 28px 85px rgba(0, 0, 0, 0.08);

  display: grid;
  gap: 1.2rem;

  @media (min-width: 980px) {
    grid-template-columns: 1.25fr 0.75fr;
    align-items: center;
    gap: 1.8rem;
    padding: 2.25rem 2.2rem;
  }
`;

const TrustTitle = styled.h2`
  margin: 0 0 0.45rem;

  font-family: "Cormorant Garamond", ui-serif, Georgia, serif;
  font-weight: 300;
  text-transform: uppercase;
  letter-spacing: 0.02em;

  font-size: 2rem;
  line-height: 1.05;
  color: rgba(0, 0, 0, 0.92);
`;

const TrustText = styled.p`
  margin: 0;
  color: rgba(0, 0, 0, 0.65);
  line-height: 1.75;
  font-size: 1.02rem;
`;

const TrustBullets = styled.div`
  margin-top: 1rem;
  display: grid;
  gap: 0.55rem;
`;

const TrustBullet = styled.p`
  margin: 0;
  display: grid;
  grid-template-columns: 16px 1fr;
  gap: 0.65rem;
  align-items: start;
  font-size: 0.98rem;
  line-height: 1.65;
  color: rgba(0, 0, 0, 0.62);

  &::before {
    content: "✓";
    font-weight: 900;
    color: ${({ theme }) => theme.colors.primary};
    line-height: 1.2;
  }
`;

const TrustCTA = styled(Link)`
  justify-self: start;

  @media (min-width: 980px) {
    justify-self: end;
  }

  display: inline-flex;
  align-items: center;
  justify-content: center;

  padding: 0.95rem 1.6rem;
  border-radius: 999px;

  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  font-weight: 850;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-size: 0.78rem;

  text-decoration: none;
  transition: transform 240ms ease, filter 240ms ease;

  &:hover {
    transform: translateY(-1px);
    filter: brightness(0.98);
  }
`;

/* =========================
   CTA (clean, light)
========================= */

const CTA = styled.section`
  padding: clamp(3.4rem, 6vw, 5.1rem) 0;
  text-align: center;
`;

const CTATitle = styled.h2`
  margin: 0 0 1rem;

  font-family: "Cormorant Garamond", ui-serif, Georgia, serif;
  font-weight: 300;
  text-transform: uppercase;
  letter-spacing: 0.02em;

  font-size: clamp(2rem, 3.2vw, 2.65rem);
  line-height: 1.05;
  color: rgba(0, 0, 0, 0.92);
`;

const CTAText = styled.p`
  max-width: 70ch;
  margin: 0 auto;
  font-size: 1.05rem;
  line-height: 1.75;
  color: rgba(0, 0, 0, 0.64);
`;

const CTAButton = styled(Link)`
  display: inline-flex;
  margin-top: 2.05rem;

  padding: 0.95rem 2.1rem;
  border-radius: 999px;

  background: rgba(0, 0, 0, 0.92);
  color: #fff;

  font-weight: 850;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-size: 0.78rem;

  text-decoration: none;
  transition: transform 240ms ease, filter 240ms ease;

  &:hover {
    transform: translateY(-1px);
    filter: brightness(0.98);
  }
`;

/* =========================
   REVEAL WRAP
========================= */

const RevealWrap = styled.div`
  opacity: ${(p) => (p.$visible ? 1 : 0)};
  transform: ${(p) => {
    if (p.$visible) return "translate3d(0,0,0)";
    if (p.$from === "right") return "translate3d(22px, 0, 0)";
    return "translate3d(-22px, 0, 0)";
  }};
  transition: opacity 520ms ease, transform 520ms ease;
  will-change: opacity, transform;
`;

/* =========================
   COMPONENT
========================= */

export default function Servicios() {
  const services = useMemo(
    () => [
      {
        badge: "Interior",
        title: "Cortinas & Estores",
        value: "La forma más elegante de controlar luz y privacidad.",
        text: "Proyectos a medida para definir la atmósfera de cada estancia: tejidos, caída, confección y sistemas seleccionados con criterio.",
        img: cortinasServicios,
        alt: "Cortinas y estores",
        primaryTo: "/cortinas-estores",
        primaryLabel: "Ver detalles",
        secondaryTo: "/contact",
      },
      {
        badge: "Exterior",
        title: "Toldos & Protección Solar",
        value: "Sombra real, temperatura controlada, exterior utilizable.",
        text: "Soluciones sólidas y discretas para terrazas, jardines y fachadas: confort térmico, durabilidad y estética.",
        img: toldosProteccionSolar,
        alt: "Toldos y protección solar",
        primaryTo: "/toldos-proteccionsolar",
        primaryLabel: "Ver detalles",
        secondaryTo: "/contact",
      },
      {
        badge: "Smart Home",
        title: "Automatización",
        value: "El confort se anticipa. Tú mantienes el control.",
        text: "Motores, sensores y control inteligente para cortinas, estores y toldos. Integración cuidadosa y escenas que encajan con tu rutina.",
        img: somfyApp,
        alt: "Automatización Somfy",
        primaryTo: "/automatizacion",
        primaryLabel: "Ver detalles",
        secondaryTo: "/contact",
      },
      {
        badge: "Estudio",
        title: "Proyectos a Medida",
        value: "Una visión coherente de principio a fin.",
        text: "Asesoramiento, medición, confección e instalación. Creamos una línea estética consistente para que todo encaje en tu espacio.",
        img: proyecto,
        alt: "Proyectos a medida",
        primaryTo: "/propuestas",
        primaryLabel: "Ver propuestas",
        secondaryTo: "/contact",
      },
      {
        badge: "Interior",
        title: "Panel japonés & Verticales",
        value: "Líneas limpias, control preciso y estética arquitectónica.",
        text: "Soluciones ideales para ventanales amplios y espacios contemporáneos. Te ayudamos a elegir tejido, apertura y caída para un resultado impecable.",
        img: panelJaponesImg,
        alt: "Panel japonés y cortinas verticales",
        primaryTo: "/panel-japones",
        primaryLabel: "Ver detalles",
        secondaryTo: "/contact",
      },

      {
        badge: "Interior",
        title: "Venecianas",
        value: "Luz a medida con un gesto. Privacidad sin perder claridad.",
        text: "Aluminio o madera (según colección) con regulación milimétrica de la entrada de luz. Instalación limpia y acabados premium.",
        img: venecianasImg,
        alt: "Venecianas instaladas en ventana",
        primaryTo: "/venecianas",
        primaryLabel: "Ver detalles",
        secondaryTo: "/contact",
      },
      {
        badge: "Exterior",
        title: "Mosquiteras",
        value: "Aire fresco sin visitas indeseadas.",
        text: "Soluciones a medida para ventanas y puertas: discretas, resistentes y fáciles de usar. Mantén la ventilación sin renunciar a confort y tranquilidad.",
        img: venecianasImg,
        alt: "Mosquiteras instaladas en ventana",
        primaryTo: "/mosquiteras",
        primaryLabel: "Ver detalles",
        secondaryTo: "/contact",
      },
    ],
    []
  );

  return (
    <Page>
      {/* HERO */}
      <Hero>
        <Container>
          <Eyebrow>Servicios · Decoración textil & protección solar</Eyebrow>
          <HeroTitle>
            Diseño, confort y <span>ejecución impecable</span>.
          </HeroTitle>
          <HeroText>
            Diseñamos e instalamos soluciones de decoración textil, protección
            solar y automatización que se sienten bien desde el primer día.
            Materiales seleccionados, integración discreta y un resultado
            coherente con tu espacio.
          </HeroText>
          <MicroTrust>
            Visita técnica · Medición precisa · Instalación limpia · Garantía y
            soporte
          </MicroTrust>
        </Container>
      </Hero>

      {/* SERVICES */}
      <Section>
        <Container>
          <ServicesGrid>
            {services.map((s, i) => (
              <Reveal
                key={s.title}
                from={i % 2 === 0 ? "left" : "right"}
                delay={i * 60}
              >
                <ServiceCard>
                  <ServiceMedia>
                    <ServiceImg src={s.img} alt={s.alt} loading="lazy" />
                    <MediaOverlay />
                    <Badge>{s.badge}</Badge>
                  </ServiceMedia>

                  <ServiceContent>
                    <ServiceTitle>{s.title}</ServiceTitle>
                    <ValueLine>{s.value}</ValueLine>
                    <ServiceText>{s.text}</ServiceText>

                    <Actions>
                      <PrimaryCTA to={s.primaryTo}>{s.primaryLabel}</PrimaryCTA>
                    </Actions>
                  </ServiceContent>
                </ServiceCard>
              </Reveal>
            ))}
          </ServicesGrid>
        </Container>
      </Section>

      {/* TRUST STRIP */}
      <TrustSection>
        <Container>
          <Reveal from="left">
            <TrustCard>
              <div>
                <TrustTitle>Más de 30 años de oficio.</TrustTitle>
                <TrustText>
                  Un buen resultado no depende solo del producto. Depende del
                  criterio, de la medición y de una instalación limpia. Te
                  orientamos con honestidad y ejecutamos con precisión.
                </TrustText>

                <TrustBullets>
                  <TrustBullet>
                    Visita técnica y asesoramiento decorativo
                  </TrustBullet>
                  <TrustBullet>
                    Instalación profesional, sin sorpresas
                  </TrustBullet>
                  <TrustBullet>
                    Soluciones para Castellón y alrededores (Valencia según
                    proyecto)
                  </TrustBullet>
                </TrustBullets>
              </div>

              <TrustCTA to="/contact">Solicitar asesoramiento</TrustCTA>
            </TrustCard>
          </Reveal>
        </Container>
      </TrustSection>

      {/* CTA */}
      <CTA>
        <Container>
          <Reveal from="right">
            <CTATitle>¿No sabes por dónde empezar?</CTATitle>
            <CTAText>
              Cuéntanos tu espacio y lo que quieres mejorar. Te diremos el mejor
              punto de partida y te prepararemos una propuesta con criterio.
            </CTAText>
            <CTAButton to="/contact">Contactar</CTAButton>
          </Reveal>
        </Container>
      </CTA>
    </Page>
  );
}
