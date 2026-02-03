import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

// Images
import mPuerta from "../../assets/servicios/mosquiteras/correderaPuerta.png";
import mEnrollable from "../../assets/servicios/mosquiteras/enrollable.png";
import mExtensible from "../../assets/servicios/mosquiteras/extensible.png";
import mFija from "../../assets/servicios/mosquiteras/fija.png";

/* =========================
   SEO helpers
========================= */

function useCanonicalUrl() {
  const { pathname, search } = useLocation();
  const base = import.meta?.env?.VITE_SITE_URL || window.location.origin;
  return `${base}${pathname}${search}`;
}

function toSlug(str) {
  return String(str)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function readHashTabId(hash) {
  // Accept "#enrollables" or "#correderas" etc.
  const clean = String(hash || "")
    .replace("#", "")
    .trim();
  return clean || null;
}

/* =========================
   Styles
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
`;

const Hero = styled.header`
  padding: clamp(3.6rem, 6.2vw, 5.8rem) 0 clamp(1.4rem, 3vw, 2rem);
`;

const Eyebrow = styled.p`
  margin: 0 0 1rem;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  font-size: 0.75rem;
  color: rgba(0, 0, 0, 0.58);
`;

const Title = styled.h1`
  margin: 0;
  font-family: "Cormorant Garamond", ui-serif, Georgia, serif;
  font-weight: 300;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  color: rgba(0, 0, 0, 0.92);
  line-height: 1.02;
  font-size: clamp(2.1rem, 5vw, 4.1rem);

  span {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Sub = styled.p`
  max-width: 78ch;
  margin: 1.05rem 0 0;
  font-size: 1.05rem;
  line-height: 1.75;
  color: rgba(0, 0, 0, 0.68);
`;

const Section = styled.section`
  padding: 0 0 clamp(3rem, 6vw, 4.8rem);
`;

const TabsBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem;
  margin-top: 1.6rem;

  background: rgba(255, 255, 255, 0.55);
  border: 1px solid rgba(0, 0, 0, 0.06);
  box-shadow: 0 22px 60px rgba(0, 0, 0, 0.06);
  border-radius: 999px;
  padding: 0.45rem;
`;

const TabButton = styled.button`
  appearance: none;
  border: 0;
  cursor: pointer;

  padding: 0.7rem 1rem;
  border-radius: 999px;

  background: ${({ $active, theme }) =>
    $active ? theme.colors.primary : "transparent"};
  color: ${({ $active }) => ($active ? "#fff" : "rgba(0,0,0,0.75)")};

  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-size: 0.76rem;

  transition: transform 200ms ease, background 200ms ease, color 200ms ease,
    filter 200ms ease;

  &:hover {
    transform: translateY(-1px);
    filter: brightness(0.99);
  }

  &:focus-visible {
    outline: 3px solid rgba(0, 0, 0, 0.18);
    outline-offset: 3px;
  }
`;

const Panel = styled.article`
  max-width: 960px;
  margin: 0 auto;

  border-radius: 24px;
  overflow: hidden;

  background: rgba(255, 255, 255, 0.55);
  box-shadow: 0 22px 65px rgba(0, 0, 0, 0.08);

  display: grid;
  grid-template-columns: 1fr;

  @media (min-width: 980px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const Media = styled.div`
  position: relative;
  height: 190px;
  overflow: hidden;

  @media (min-width: 980px) {
    height: 100%;
    min-height: 250px;
  }
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transform: scale(1.02);
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.05),
    rgba(0, 0, 0, 0.22)
  );
`;

const Badge = styled.div`
  position: absolute;
  top: 16px;
  left: 16px;

  padding: 0.44rem 0.78rem;
  border-radius: 999px;

  font-size: 0.74rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  font-weight: 650;

  background: rgba(245, 244, 242, 0.85);
  color: rgba(0, 0, 0, 0.68);
`;

const Content = styled.div`
  padding: 1.25rem 1.25rem 1.15rem;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    padding: 1.1rem 1.05rem 1rem;
  }
`;

const PanelTitle = styled.h2`
  margin: 0;
  font-family: "Cormorant Garamond", ui-serif, Georgia, serif;
  font-weight: 300;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  font-size: 1.9rem;
  line-height: 1.05;
  color: rgba(0, 0, 0, 0.92);
`;

const Value = styled.p`
  margin: 0.75rem 0 0.85rem;
  font-size: 1.02rem;
  font-weight: 650;
  color: rgba(0, 0, 0, 0.75);
  line-height: 1.6;
`;

const Text = styled.p`
  margin: 0 0 1.05rem;
  font-size: 1.01rem;
  line-height: 1.75;
  color: rgba(0, 0, 0, 0.64);
`;

const Bullets = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 0.5rem;
`;

const Bullet = styled.li`
  display: grid;
  grid-template-columns: 16px 1fr;
  gap: 0.65rem;
  align-items: start;

  font-size: 0.98rem;
  line-height: 1.6;
  color: rgba(0, 0, 0, 0.62);

  &::before {
    content: "✓";
    font-weight: 900;
    color: ${({ theme }) => theme.colors.primary};
    line-height: 1.2;
  }
`;

const Actions = styled.div`
  margin-top: auto;
  display: flex;
  gap: 0.65rem;
  flex-wrap: wrap;
`;

const Primary = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.82rem 1.15rem;
  border-radius: 999px;

  background: rgba(0, 0, 0, 0.06);
  color: rgba(0, 0, 0, 0.86);
  border: 1px solid rgba(0, 0, 0, 0.1);

  font-weight: 750;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-size: 0.76rem;

  text-decoration: none;
  transition: transform 240ms ease, background 240ms ease;

  &:hover {
    background: rgba(0, 0, 0, 0.09);
    transform: translateY(-1px);
  }
`;

const Secondary = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.82rem 1.15rem;
  border-radius: 999px;

  background: ${({ theme }) => theme.colors.primary};
  color: #fff;

  font-weight: 850;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-size: 0.76rem;

  text-decoration: none;
  transition: transform 240ms ease, filter 240ms ease;

  &:hover {
    transform: translateY(-1px);
    filter: brightness(0.98);
  }
`;

// Help actions:
const HelpStrip = styled.aside`
  margin-top: 1.5rem;
  padding: 1.25rem 1.4rem;

  display: grid;
  gap: 1rem;

  border-radius: 22px;
  background: rgba(255, 255, 255, 0.45);
  border: 1px solid rgba(0, 0, 0, 0.06);

  @media (min-width: 980px) {
    grid-template-columns: 1fr auto;
    align-items: center;
  }
`;

const HelpText = styled.div`
  display: grid;
  gap: 0.35rem;

  strong {
    font-size: 0.9rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: rgba(0, 0, 0, 0.82);
  }

  span {
    font-size: 1rem;
    line-height: 1.6;
    color: rgba(0, 0, 0, 0.65);
  }
`;

const HelpActions = styled.div`
  display: flex;
  gap: 0.6rem;
  flex-wrap: wrap;
`;

const HelpButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  padding: 0.68rem 1.02rem;
  border-radius: 999px;

  background: rgba(0, 0, 0, 0.06);
  color: rgba(0, 0, 0, 0.85);
  border: 1px solid rgba(0, 0, 0, 0.1);

  font-weight: 750;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-size: 0.72rem;

  text-decoration: none;
  transition: transform 200ms ease, background 200ms ease;

  &:hover {
    background: rgba(0, 0, 0, 0.1);
    transform: translateY(-1px);
  }
`;

const SROnly = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
`;

/* =========================
   Component
========================= */

export default function Mosquiteras() {
  const location = useLocation();
  const canonical = useCanonicalUrl();

  const siteName = "Traver Decoración Textil";
  const baseUrl = import.meta?.env?.VITE_SITE_URL || window.location.origin;

  // ✅ Better SEO title length + location keywords
  const metaTitle = `Mosquiteras a medida en Castellón y Valencia | ${siteName}`;
  const metaDescription =
    "Mosquiteras a medida para ventanas y puertas: enrollables, correderas, extensibles y fijas. Servicio en Castellón y Valencia. Asesoramiento e instalación profesional.";

  const tabs = useMemo(
    () => [
      {
        id: "enrollables",
        label: "Enrollables",
        title: "Mosquiteras enrollables a medida",
        img: mEnrollable,
        value: "Apertura práctica y estética discreta para uso diario.",
        text: "Ideales para ventanas: se recogen cuando no las necesitas y mantienen una línea limpia en el hueco.",
        bullets: [
          "Recogida superior con muelle",
          "Guías laterales para mejor cierre",
          "Fabricación a medida",
        ],
      },
      {
        id: "correderas",
        label: "Correderas",
        title: "Mosquiteras correderas para puertas y ventanales",
        img: mPuerta,
        value: "Perfectas para aperturas laterales y balconeras.",
        text: "Se deslizan suavemente sobre carriles y son una solución robusta para grandes superficies acristaladas.",
        bullets: [
          "Deslizamiento cómodo",
          "Ideales para correderas",
          "Estructura resistente",
        ],
      },
      {
        id: "extensibles",
        label: "Extensibles",
        title: "Mosquiteras extensibles",
        img: mExtensible,
        value: "Solución simple y funcional para usos puntuales.",
        text: "Prácticas para segundas residencias o espacios donde buscas una opción flexible y rápida.",
        bullets: [
          "Instalación sencilla",
          "Buen equilibrio calidad/precio",
          "Uso flexible",
        ],
      },
      {
        id: "fijas",
        label: "Fijas",
        title: "Mosquiteras fijas",
        img: mFija,
        value: "Protección permanente con diseño limpio.",
        text: "Recomendadas para ventanas de uso constante cuando no necesitas apertura de la mosquitera.",
        bullets: [
          "Estructura estable",
          "Mantenimiento mínimo",
          "Alta durabilidad",
        ],
      },
    ],
    []
  );

  // ✅ Initialize active tab from hash (deep links)
  const initialFromHash = readHashTabId(location.hash);
  const [active, setActive] = useState(
    initialFromHash &&
      tabs.some((t) => toSlug(t.id) === toSlug(initialFromHash))
      ? tabs.find((t) => toSlug(t.id) === toSlug(initialFromHash)).id
      : tabs[0].id
  );

  const current = tabs.find((t) => t.id === active) || tabs[0];

  // ✅ Keep hash in sync when user switches tabs
  useEffect(() => {
    const nextHash = `#${toSlug(current.id)}`;
    if (window.location.hash !== nextHash) {
      window.history.replaceState(null, "", nextHash);
    }
  }, [current.id]);

  // ✅ Better JSON-LD: Business + Service
  const businessJsonLd = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: siteName,
    url: baseUrl,
    areaServed: [
      { "@type": "AdministrativeArea", name: "Castellón" },
      { "@type": "AdministrativeArea", name: "Valencia" },
    ],
  };

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Mosquiteras a medida",
    serviceType: "Instalación de mosquiteras",
    provider: {
      "@type": "HomeAndConstructionBusiness",
      name: siteName,
      url: baseUrl,
    },
    areaServed: [
      { "@type": "AdministrativeArea", name: "Castellón" },
      { "@type": "AdministrativeArea", name: "Valencia" },
    ],
    description: metaDescription,
    url: canonical,
  };

  return (
    <Page>
      <Helmet>
        {/* Primary */}
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={canonical} />

        {/* Open Graph */}
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content={mEnrollable} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={mEnrollable} />

        {/* JSON-LD */}
        <script type="application/ld+json">
          {JSON.stringify(businessJsonLd)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(serviceJsonLd)}
        </script>
      </Helmet>

      <Hero>
        <Container>
          <Eyebrow>Mosquiteras · Confort & ventilación</Eyebrow>

          <Title>
            Mosquiteras <span>a medida</span>
          </Title>

          <Sub>
            Mosquiteras para ventanas y puertas con instalación limpia y medida
            precisa. Elige el sistema ideal (enrollable, corredera, extensible o
            fija) y te orientamos según tu tipo de apertura y uso diario.
          </Sub>

          <TabsBar role="tablist" aria-label="Opciones de mosquiteras a medida">
            {tabs.map((t) => (
              <TabButton
                key={t.id}
                type="button"
                onClick={() => setActive(t.id)}
                $active={t.id === active}
                role="tab"
                aria-selected={t.id === active}
                aria-controls={`panel-${t.id}`}
                id={`tab-${t.id}`}
              >
                {t.label}
              </TabButton>
            ))}
          </TabsBar>
        </Container>
      </Hero>

      <Section aria-label="Tipos de mosquiteras">
        <Container>
          {/* Small SEO-friendly list of the options */}
          <SROnly as="h2">Tipos de mosquiteras disponibles</SROnly>
          <SROnly as="ul">
            {tabs.map((t) => (
              <li key={t.id}>{t.title}</li>
            ))}
          </SROnly>

          <Panel
            id={`panel-${current.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${current.id}`}
          >
            <Media>
              <Img
                src={current.img}
                alt={current.title}
                loading="lazy"
                decoding="async"
              />
              <Overlay />
              <Badge>Opciones</Badge>
            </Media>

            <Content>
              <PanelTitle>{current.title}</PanelTitle>
              <Value>{current.value}</Value>
              <Text>{current.text}</Text>

              <Bullets aria-label="Ventajas principales">
                {current.bullets.map((b) => (
                  <Bullet key={b}>{b}</Bullet>
                ))}
              </Bullets>

              <Actions>
                <Primary to="/contact">Pedir propuesta</Primary>
                <Secondary to="/contact">Hablar con nosotros</Secondary>
              </Actions>
            </Content>
          </Panel>

          <HelpStrip aria-label="Ayuda y contacto">
            <HelpText>
              <strong>¿No encuentras lo que buscas?</strong>
              <span>
                Estamos aquí para ayudarte. Llámanos, escríbenos por WhatsApp o
                envíanos un email y te orientamos sin compromiso.
              </span>
            </HelpText>

            <HelpActions>
              {/* TODO: replace with real contact data */}
              <HelpButton href="tel:+34600000000">Llamar</HelpButton>
              <HelpButton
                href="https://wa.me/34600000000"
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp
              </HelpButton>
              <HelpButton href="mailto:info@traverdecoraciontextil.es">
                Email
              </HelpButton>
            </HelpActions>
          </HelpStrip>
        </Container>
      </Section>
    </Page>
  );
}
