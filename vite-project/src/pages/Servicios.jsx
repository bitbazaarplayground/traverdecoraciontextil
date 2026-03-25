// Servicios.jsx
import { useEffect, useMemo, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import styled from "styled-components";
import cortinasServicios from "../assets/servicios/CortinasServicios.webp";
import proyecto from "../assets/servicios/ProyectoAMedida.webp";
import somfyApp from "../assets/servicios/app2.webp";

import limpiezaImg from "../assets/servicios/limpieza/limpieza-800.webp";
import mosquiterasImg from "../assets/servicios/mosquiteras/mosquiteraPatio.webp";
import panelJaponesImg from "../assets/servicios/panelJapones.webp";
import toldosProteccionSolar from "../assets/servicios/toldoServicios.webp";
import venecianasImg from "../assets/servicios/venecianas.webp";
import { CONTACT } from "../config/contact";
import {
  trackCtaClick,
  trackOpenQuickEnquiry,
  trackWhatsAppClick,
} from "../lib/analytics";
import StickyCtaButton from "../mobile/StickyCtaButton";

/* =========================
   Small scroll-reveal helper (no deps)
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
   PAGE STYLES
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
const SeoIntro = styled.p`
  max-width: 74ch;
  margin: 1rem 0 0;
  font-size: 1rem;
  line-height: 1.75;
  color: rgba(0, 0, 0, 0.62);
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
const ConsultSection = styled.section`
  background: #f6f3ea;
  padding: clamp(3rem, 6vw, 5rem) 0;
`;

const ConsultGrid = styled.div`
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  gap: clamp(1.5rem, 3vw, 2.4rem);
  align-items: center;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

const ConsultLeft = styled.div`
  max-width: 62ch;
`;

const ConsultTitle = styled.h2`
  margin: 0;
  font-size: clamp(1.9rem, 3.2vw, 2.4rem);
  line-height: 1.15;
  letter-spacing: -0.02em;
  color: #111;
`;

const ConsultSub = styled.p`
  margin: 0.85rem 0 0;
  font-size: 1.05rem;
  line-height: 1.75;
  color: rgba(17, 17, 17, 0.72);
`;

const ConsultKicker = styled.h3`
  margin: 1.55rem 0 0.75rem;
  font-size: 1.05rem;
  font-weight: 800;
  color: rgba(17, 17, 17, 0.88);
`;

const ConsultList = styled.ol`
  margin: 0;
  padding-left: 1.2rem;
  display: grid;
  gap: 0.6rem;
  color: rgba(17, 17, 17, 0.78);
  line-height: 1.65;

  li {
    padding-left: 0.2rem;
  }
`;

const ConsultStrong = styled.div`
  margin-top: 1.2rem;
  font-weight: 800;
  color: rgba(17, 17, 17, 0.9);
`;

const ConsultActions = styled.div`
  margin-top: 1.2rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.85rem;
  align-items: center;
`;

const ConsultPrimary = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.95rem 1.15rem;
  border-radius: 14px;
  text-decoration: none;
  font-weight: 800;
  color: #111;
  background: ${({ theme }) => theme.colors.primary};
  box-shadow: 0 18px 60px rgba(0, 0, 0, 0.12);
  transition: transform 0.2s ease, filter 0.2s ease;
  border: 0;
  cursor: pointer;

  &:hover {
    transform: translateY(-2px);
    filter: brightness(1.02);
  }
`;

const ConsultSecondary = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.95rem 1.15rem;
  border-radius: 14px;
  text-decoration: none;
  font-weight: 800;
  color: rgba(17, 17, 17, 0.86);
  background: rgba(255, 255, 255, 0.75);
  border: 1px solid rgba(17, 17, 17, 0.12);
  transition: transform 0.2s ease, background 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    background: rgba(255, 255, 255, 0.92);
  }
`;

const ConsultNote = styled.p`
  margin: 0.9rem 0 0;
  color: rgba(17, 17, 17, 0.62);
  font-size: 0.95rem;
`;

/* Right media tile (premium) */
const ConsultRight = styled.div`
  @media (max-width: 980px) {
    order: -1;
  }
`;

const MediaTile = styled.div`
  position: relative;
  border-radius: 24px;
  overflow: hidden;
  border: 1px solid rgba(17, 17, 17, 0.12);
  background: #fff;
  box-shadow: 0 28px 85px rgba(0, 0, 0, 0.1);
  min-height: 360px;

  @media (max-width: 768px) {
    min-height: 280px;
  }
`;

const MediaImage = styled.div`
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  transform: scale(1.02);
  transition: transform 0.65s ease;

  ${MediaTile}:hover & {
    transform: scale(1.06);
  }
`;

const MediaOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.08) 0%,
    rgba(0, 0, 0, 0.55) 78%,
    rgba(0, 0, 0, 0.72) 100%
  );
`;

const MediaBadge = styled.div`
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

const MediaBottom = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  padding: 1.25rem 1.25rem 1.15rem;
  display: grid;
  gap: 0.45rem;
`;

const MediaTitle = styled.h3`
  margin: 0;
  font-size: 1.3rem;
  font-weight: 850;
  color: #fff;
  letter-spacing: -0.02em;
`;

const MediaText = styled.p`
  margin: 0;
  color: rgba(255, 255, 255, 0.82);
  line-height: 1.6;
  max-width: 48ch;
`;

/* =========================
   COMPONENT
========================= */

export default function Servicios({ onOpenAsesoramiento }) {
  // SEO base
  const baseUrl = (
    import.meta.env.VITE_SITE_URL || window.location.origin
  ).replace(/\/$/, "");
  const canonical = `${baseUrl}/services`;
  const siteName = CONTACT.siteName || "Traver Decoración Textil";

  const title =
    "Servicios de cortinas, toldos, automatización y decoración textil en Castellón y Valencia";
  const description =
    "Explora nuestros servicios de cortinas y estores, toldos, automatización, venecianas, panel japonés, mosquiteras y limpieza. Soluciones a medida con asesoramiento, medición e instalación profesional en Castellón y Valencia.";
  const ogImage = `${baseUrl}/og.png`;
  const ogImageAlt =
    "Servicios de Traver Decoración Textil en Castellón y Valencia";

  const services = useMemo(
    () => [
      {
        badge: "Interior",
        title: "Cortinas & Estores",
        value: "La forma más elegante de controlar luz y privacidad.",
        text: "Cortinas y estores a medida para definir la atmósfera de cada estancia, con tejidos, confección y sistemas seleccionados con criterio.",
        img: cortinasServicios,
        alt: "Cortinas y estores a medida en interior",
        primaryTo: "/cortinas-estores",
        primaryLabel: "Ver detalles",
      },
      {
        badge: "Exterior",
        title: "Toldos & Protección Solar",
        value: "Sombra real, temperatura controlada, exterior utilizable.",
        text: "Toldos y soluciones de protección solar a medida para terrazas, jardines y fachadas: confort térmico, durabilidad y una estética cuidada.",
        img: toldosProteccionSolar,
        alt: "Toldos y protección solar a medida",
        primaryTo: "/toldos-proteccion-solar",
        primaryLabel: "Ver detalles",
      },
      {
        badge: "Smart Home",
        title: "Automatización",
        value: "El confort se anticipa. Tú mantienes el control.",
        text: "Motores, sensores y control inteligente para cortinas, estores y toldos. Integración cuidadosa y escenas que encajan con tu rutina.",
        img: somfyApp,
        alt: "Automatización para cortinas, estores y toldos",
        primaryTo: "/automatizacion",
        primaryLabel: "Ver detalles",
      },
      {
        badge: "Estudio",
        title: "Proyectos a Medida",
        value: "Una visión coherente de principio a fin.",
        text: "Asesoramiento, medición, confección e instalación para proyectos de decoración textil y protección solar a medida, con una propuesta coherente para cada espacio.",
        img: proyecto,
        alt: "Proyectos a medida: asesoramiento, medición e instalación",
        primaryTo: "/propuestas",
        primaryLabel: "Ver propuestas",
      },
      {
        badge: "Interior",
        title: "Panel japonés & Verticales",
        value: "Líneas limpias, control preciso y estética arquitectónica.",
        text: "Soluciones ideales para ventanales amplios y espacios contemporáneos. Te ayudamos a elegir tejido, apertura y caída para un resultado impecable.",
        img: panelJaponesImg,
        alt: "Panel japonés y cortinas verticales para ventanales",
        primaryTo: "/panel-japones",
        primaryLabel: "Ver detalles",
      },
      {
        badge: "Interior",
        title: "Venecianas",
        value: "Luz a medida con un gesto. Privacidad sin perder claridad.",
        text: "Aluminio o madera (según colección) con regulación milimétrica de la entrada de luz. Instalación limpia y acabados premium.",
        img: venecianasImg,
        alt: "Venecianas instaladas en ventana con control de luz",
        primaryTo: "/venecianas",
        primaryLabel: "Ver detalles",
      },
      {
        badge: "Exterior",
        title: "Mosquiteras",
        value: "Aire fresco sin visitas indeseadas.",
        text: "Soluciones a medida para ventanas y puertas: discretas, resistentes y fáciles de usar.",
        img: mosquiterasImg,
        alt: "Mosquiteras a medida para ventanas y puertas",
        primaryTo: "/mosquiteras",
        primaryLabel: "Ver detalles",
      },
      {
        badge: "Servicios",
        title: "Limpieza",
        value:
          "Textiles impecables, mantenimiento profesional y máxima comodidad.",
        text: "Servicio de limpieza para cortinas, estores y textiles decorativos, con opciones de recogida, desmontaje y montaje según cada necesidad.",
        img: limpiezaImg,
        alt: "Servicio profesional de limpieza para cortinas y textiles decorativos",
        primaryTo: "/limpieza",
        primaryLabel: "Ver detalles",
      },
    ],
    []
  );

  // JSON-LD: CollectionPage + ItemList
  const jsonLd = useMemo(() => {
    const itemList = {
      "@type": "ItemList",
      itemListOrder: "https://schema.org/ItemListOrderAscending",
      numberOfItems: services.length,
      itemListElement: services.map((s, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        name: s.title,
        url: `${baseUrl}${s.primaryTo}`,
      })),
    };

    const collectionPageJsonLd = {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "@id": `${canonical}#collectionpage`,
      url: canonical,
      name: title,
      description,
      inLanguage: "es-ES",
      isPartOf: {
        "@type": "WebSite",
        "@id": `${baseUrl}/#website`,
        url: `${baseUrl}/`,
        name: siteName,
      },
      about: { "@id": `${baseUrl}/#business` },
      mainEntity: itemList,
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: ogImage,
      },
    };

    const breadcrumbJsonLd = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "@id": `${canonical}#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Inicio",
          item: `${baseUrl}/`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Servicios",
          item: canonical,
        },
      ],
    };

    return [collectionPageJsonLd, breadcrumbJsonLd];
  }, [baseUrl, canonical, description, ogImage, services, siteName, title]);

  return (
    <Page>
      <Helmet>
        <title>{title}</title>

        <meta name="description" content={description} />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href={canonical} />

        {/* Open Graph */}
        <meta property="og:site_name" content={siteName} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="es_ES" />
        <meta property="og:url" content={canonical} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:alt" content={ogImageAlt} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />
        <meta name="twitter:image:alt" content={ogImageAlt} />

        {/* JSON-LD */}
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      {/* HERO */}
      <Hero>
        <Container>
          <Eyebrow>
            Servicios · Instalaciones · Decoración textil & protección solar
          </Eyebrow>
          <HeroTitle>
            Diseño, confort y <span>ejecución impecable</span>.
          </HeroTitle>
          <HeroText>
            Diseñamos e instalamos soluciones de decoración textil, protección
            solar y automatización a medida en Castellón y Valencia. Cortinas,
            estores, toldos, venecianas, mosquiteras y sistemas motorizados con
            una integración cuidada y un resultado coherente con tu espacio.
          </HeroText>

          <SeoIntro>
            En esta página puedes explorar nuestros servicios de cortinas y
            estores, toldos, automatización, panel japonés, venecianas,
            mosquiteras, limpieza y propuestas a medida en Castellón y Valencia.
          </SeoIntro>
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
                      <PrimaryCTA
                        to={s.primaryTo}
                        onClick={() => trackCtaClick("servicios_card", s.title)}
                      >
                        {s.primaryLabel}
                      </PrimaryCTA>
                    </Actions>
                  </ServiceContent>
                </ServiceCard>
              </Reveal>
            ))}
          </ServicesGrid>
        </Container>
      </Section>

      {/* CONSULT / TRUST (premium split) */}
      <ConsultSection>
        <Container>
          <Reveal from="left">
            <ConsultGrid>
              <ConsultLeft>
                <ConsultTitle>
                  Asesoramiento profesional — sin compromiso
                </ConsultTitle>
                <ConsultSub>
                  Un buen resultado no depende solo del producto. Depende del
                  criterio, de la medición y de una instalación limpia. Te
                  orientamos con honestidad y ejecutamos con precisión.
                </ConsultSub>

                <ConsultKicker>Qué puedes esperar</ConsultKicker>

                <ConsultList>
                  <li>Visita técnica y asesoramiento decorativo</li>
                  <li>
                    Propuesta clara (tejidos, sistemas y opciones equilibradas)
                  </li>
                  <li>
                    Medición precisa e instalación profesional, sin sorpresas
                  </li>
                  <li>Castellón y Valencia</li>
                </ConsultList>

                <ConsultStrong>Sin obligación. Sin presión.</ConsultStrong>

                <ConsultActions>
                  <ConsultPrimary
                    type="button"
                    onClick={() => {
                      // 1. Evento genérico
                      trackCtaClick(
                        "servicios_consult_cta",
                        "solicitar_asesoramiento"
                      );

                      // 2. Evento específico
                      trackOpenQuickEnquiry(
                        "servicios_consult_cta",
                        "Asesoramiento personalizado"
                      );

                      onOpenAsesoramiento?.(
                        "Asesoramiento personalizado",
                        "servicios_consult_cta"
                      );
                    }}
                  >
                    Solicitar asesoramiento
                  </ConsultPrimary>

                  <ConsultSecondary
                    href={CONTACT.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackWhatsAppClick("servicios_consult_cta")}
                  >
                    WhatsApp
                  </ConsultSecondary>
                </ConsultActions>

                <ConsultNote>
                  Respuesta rápida · Presupuesto orientativo · Opciones a medida
                </ConsultNote>
              </ConsultLeft>

              <ConsultRight>
                <MediaTile aria-label="Asesoramiento personalizado en decoración textil y protección solar">
                  <MediaImage
                    style={{ backgroundImage: `url(${cortinasServicios})` }}
                  />
                  <MediaOverlay />

                  <MediaBadge>Asesoramiento</MediaBadge>

                  <MediaBottom>
                    <MediaTitle>Te ayudamos a decidir bien</MediaTitle>
                    <MediaText>
                      Estudiamos luz, privacidad, tejidos, sistemas y medidas
                      para proponerte una solución coherente y realista.
                    </MediaText>
                  </MediaBottom>
                </MediaTile>
              </ConsultRight>
            </ConsultGrid>
          </Reveal>
        </Container>
      </ConsultSection>
      <StickyCtaButton message="Hola, quiero una propuesta a medida. ¿Podemos concertar una visita para medir y definir tejidos, sistemas y acabados?" />
    </Page>
  );
}
