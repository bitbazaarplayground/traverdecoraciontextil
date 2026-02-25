// src/components/automatizacion/AutomatizacionIndividual.jsx
import { ArrowRight } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import styled, { css, keyframes } from "styled-components";
import { CONTACT } from "../../config/contact";
import StickyCtaButton from "../../mobile/StickyCtaButton";
// IMAGES
import persianasImg from "../../assets/Automatizacion/benefit1.webp";
import cortinasImg from "../../assets/Automatizacion/domotica1.webp";
import toldosImg from "../../assets/Automatizacion/toldoInd.webp";
import AutomationFaq from "../../components/automatizacion/AutomationFaq";
// import toldosImg from "../../assets/Automatizacion/smartHom2.webp";

/* =========================
   MOTION (subtle, premium)
========================= */

const reduceMotion = css`
  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation: none !important;
      transition: none !important;
      scroll-behavior: auto !important;
    }
  }
`;

/* =========================
   PAGE FRAME
========================= */

const Page = styled.div`
  ${reduceMotion}

  background:
    radial-gradient(1200px 520px at 50% -2%, rgba(229, 0, 126, 0.10), transparent 60%),
    radial-gradient(900px 520px at 10% 18%, rgba(0, 0, 0, 0.06), transparent 55%),
    #f5f4f2;

  color: #151515;
  font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial,
    "Helvetica Neue", sans-serif;
`;

/* =========================
   HERO (FUTURISTIC — INDIVIDUAL)
========================= */

const Hero = styled.section`
  position: relative;
  padding: 5.25rem 2rem 2.75rem;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 4.25rem 1.5rem 2.25rem;
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
  filter: saturate(0.95) contrast(1.06);
  transform: scale(1.06);
`;

const HeroOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: radial-gradient(
      900px 520px at 50% 18%,
      rgba(255, 255, 255, 0.06),
      rgba(0, 0, 0, 0.46)
    ),
    linear-gradient(to bottom, rgba(0, 0, 0, 0.06), rgba(11, 12, 15, 0.22));
`;

const scan = keyframes`
  from { transform: translateY(-80%); opacity: 0; }
  30% { opacity: .25; }
  to { transform: translateY(120%); opacity: 0; }
`;

const HeroScan = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  height: 220px;
  top: 0;
  opacity: 0.25;
  background: linear-gradient(
    to bottom,
    transparent,
    rgba(196, 151, 98, 0.22),
    transparent
  );
  animation: ${scan} 4.8s ease-in-out infinite;
  pointer-events: none;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: 0.12;
  }
`;

const HeroGlow = styled.div`
  position: absolute;
  inset: 0;
  background: radial-gradient(
      900px 520px at 18% 10%,
      rgba(196, 151, 98, 0.16),
      transparent 55%
    ),
    radial-gradient(
      900px 520px at 82% 20%,
      rgba(229, 0, 126, 0.14),
      transparent 60%
    );
  pointer-events: none;
`;

const HeroInner = styled.div`
  position: relative;
  z-index: 1;
  max-width: 1180px;
  margin: 0 auto;
  display: grid;
  gap: 1.6rem;

  @media (min-width: 980px) {
    grid-template-columns: 1.05fr 0.95fr;
    align-items: start;
  }
`;

const HeroTop = styled.div`
  max-width: 74ch;
`;

/* Typography adapted from your “individual” wording */
const MicroLineDark = styled.p`
  letter-spacing: 0.22em;
  text-transform: uppercase;
  font-size: 0.8rem;
  color: rgba(244, 244, 245, 0.72);
  margin: 0 0 0.9rem 0;
`;

const HeroTitleDark = styled.h1`
  margin: 0;
  font-size: clamp(2.35rem, 4.6vw, 3.75rem);
  font-weight: 760;
  line-height: 1.03;
  letter-spacing: -0.03em;
  color: rgba(244, 244, 245, 0.98);
`;

const HeroScriptDark = styled.div`
  margin-top: 0.45rem;
  font-family: "Cormorant Garamond", serif;
  font-style: italic;
  font-weight: 300;
  font-size: clamp(1.55rem, 3.3vw, 2.7rem);
  line-height: 1.08;
  color: rgba(244, 244, 245, 0.92);

  em {
    color: ${({ theme }) => theme.colors.primary};
    text-shadow: 0 0 26px rgba(229, 0, 126, 0.35);
  }
`;

const HeroPDark = styled.p`
  margin: 1.05rem 0 0;
  max-width: 66ch;
  font-size: 1.12rem;
  line-height: 1.75;
  color: rgba(244, 244, 245, 0.78);
`;
/* =========================
   REASSURANCE / PROCESS MINI
   (matches Automatizacion.jsx system)
========================= */

const ReassureSection = styled.section`
  padding: clamp(1.6rem, 3.2vw, 2.4rem) 0 0;
`;

const ReassureInner = styled.div`
  width: min(1120px, calc(100% - 3rem));
  margin: 0 auto;

  @media (max-width: 768px) {
    width: min(1120px, calc(100% - 2rem));
  }
`;

const ReassureTop = styled.div`
  max-width: 860px;
  margin-bottom: 1.35rem;
`;

/* --- reuse from Automatizacion.jsx --- */
const Kicker = styled.p`
  margin: 0 0 0.55rem 0;
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

/* REQUIRED TITLE (DO NOT EDIT) — same as Automatizacion.jsx */
const Title = styled.h2`
  margin: 0;
  font-size: 2.15rem;
  line-height: 1.12;
  letter-spacing: -0.02em;
  color: rgba(17, 17, 17, 0.96);

  span {
    color: ${({ theme }) => theme.colors.primary};
  }

  @media (max-width: 768px) {
    font-size: 1.7rem;
  }
`;

const Lead = styled.p`
  margin: 0.75rem 0 0;
  font-size: 1.08rem;
  line-height: 1.7;
  color: rgba(17, 17, 17, 0.62);
`;

/* STEPS (kept) — same as Automatizacion.jsx */
const Steps = styled.div`
  margin-top: 1.7rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.1rem;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

const Step = styled.div`
  border-radius: 22px;
  border: 1px solid rgba(15, 23, 42, 0.1);
  background: linear-gradient(
    180deg,
    rgba(252, 252, 255, 1),
    rgba(219, 233, 244, 1)
  );
  padding: 1.35rem 1.35rem 1.25rem;
  box-shadow: 0 18px 60px rgba(15, 23, 42, 0.06);
  transition: transform 180ms ease, box-shadow 180ms ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 18px 50px rgba(0, 0, 0, 0.08);
  }
`;

const StepIndex = styled.div`
  font-weight: 900;
  letter-spacing: 0.08em;
  color: ${({ theme }) => theme.colors.primary};
  opacity: 0.95;
`;

const StepTitle = styled.h3`
  margin: 0.7rem 0 0.55rem;
  font-size: 1.15rem;
  letter-spacing: -0.01em;
  color: rgba(15, 23, 42, 0.9);
`;

const StepText = styled.p`
  margin: 0;
  line-height: 1.75;
  color: rgba(15, 23, 42, 0.68);
`;

/* =========================
   MAIN LAYOUT
========================= */

const Main = styled.main`
  padding: 1.2rem 0 4.2rem;
`;

const Wrap = styled.div`
  width: min(1120px, calc(100% - 2.4rem));
  margin: 0 auto;
`;

/* =========================
   PACKS
========================= */
const PacksSection = styled.section`
  padding: clamp(2.4rem, 4.2vw, 3.4rem) 0;
`;

const PacksHeader = styled.div`
  margin-bottom: 14px;
  display: grid;
  gap: 8px;
`;

const PacksKicker = styled.div`
  letter-spacing: 0.22em;
  text-transform: uppercase;
  font-size: 0.78rem;
  color: rgba(0, 0, 0, 0.58);
`;

const PacksTitle = styled.h2`
  margin: 0;
  font-size: clamp(1.7rem, 2.4vw, 2.2rem);
  letter-spacing: -0.02em;
  span {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const PacksMuted = styled.p`
  margin: 0;
  max-width: 70ch;
  color: rgba(0, 0, 0, 0.62);
  line-height: 1.65;
`;

const PackGrid = styled.div`
  display: grid;
  gap: 14px;

  @media (min-width: 860px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    align-items: stretch;
  }
`;

const PackCard = styled.article`
  background: rgba(255, 255, 255, 0.82);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 22px;
  overflow: hidden;
  box-shadow: 0 18px 60px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  transition: transform 180ms ease, box-shadow 180ms ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 26px 80px rgba(0, 0, 0, 0.1);
  }
`;

const PackMedia = styled.div`
  position: relative;
  aspect-ratio: 16 / 10;
  background: #e9e7e3;
  overflow: hidden;

  img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: saturate(1.02) contrast(1.02);
    transform: scale(1.02);
    transition: transform 260ms ease;
  }

  ${PackCard}:hover & img {
    transform: scale(1.06);
  }
`;

const PackMediaOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.06), rgba(0, 0, 0, 0.4));
`;

const PackMediaLabel = styled.div`
  position: absolute;
  left: 14px;
  bottom: 12px;
  color: rgba(255, 255, 255, 0.95);
  font-weight: 850;
  letter-spacing: -0.02em;
  text-shadow: 0 10px 40px rgba(0, 0, 0, 0.35);
`;

const PackBody = styled.div`
  padding: 14px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1;
`;

const PackLead = styled.p`
  margin: 0;
  color: rgba(0, 0, 0, 0.74);
  font-weight: 750;
  line-height: 1.45;
  min-height: 44px;
`;

const PackPrice = styled.div`
  display: grid;
  gap: 6px;
  font-weight: 850;
  color: rgba(0, 0, 0, 0.86);

  div {
    padding: 10px 12px;
    border-radius: 16px;
    background: rgba(0, 0, 0, 0.03);
    border: 1px solid rgba(0, 0, 0, 0.08);
    line-height: 1.35;
  }
`;

const PackList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 8px;

  li {
    display: grid;
    grid-template-columns: 18px 1fr;
    gap: 10px;
    align-items: start;
    font-size: 0.92rem;
    color: rgba(0, 0, 0, 0.72);
    line-height: 1.4;
  }
`;

const CheckDot = styled.span`
  width: 18px;
  height: 18px;
  border-radius: 999px;
  background: rgba(229, 0, 126, 0.1);
  border: 1px solid rgba(229, 0, 126, 0.18);
`;

const PackNote = styled.div`
  font-size: 0.9rem;
  color: rgba(0, 0, 0, 0.58);
`;

const PackCtas = styled.div`
  margin-top: auto; /* ✅ pushes CTAs to the bottom */
  padding-top: 8px;

  display: grid;
  gap: 10px;

  @media (min-width: 520px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const PackTertiary = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.55rem;
  padding: 0.8rem 1.1rem;
  border-radius: 999px;
  border: 1px dashed rgba(0, 0, 0, 0.16);
  background: rgba(255, 255, 255, 0.7);
  color: rgba(0, 0, 0, 0.76);
  text-decoration: none;
  font-weight: 850;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-size: 0.78rem;

  &:hover {
    transform: translateY(-2px);
    filter: brightness(1.02);
    background: ${({ theme }) => theme.colors.primary};
  }

  @media (min-width: 520px) {
    grid-column: 1 / -1;
  }
`;

const PackFine = styled.p`
  margin: 0;
  margin-top: 8px;
  font-size: 0.82rem;
  color: rgba(0, 0, 0, 0.46);
  line-height: 1.55;
`;

/* =========================
   HELPERS
========================= */

function buildWhatsAppLink(message) {
  const base = CONTACT.whatsappUrl; // e.g. https://wa.me/34614952856
  const text = encodeURIComponent(message);
  return `${base}?text=${text}`;
}

/* =========================
   COMPONENT
========================= */

export default function AutomatizacionIndividual({ contactTo = "/contact" }) {
  const location = useLocation();

  const baseUrl = (
    import.meta.env.VITE_SITE_URL || window.location.origin
  ).replace(/\/$/, "");
  const canonical = `${baseUrl}/automatizacion/individual`;
  const siteName = CONTACT.siteName;

  const title =
    "Automatización individual | Cortinas, screens y toldos motorizados en Castellón y Valencia";
  const description =
    "Automatiza por zonas: cortinas y estores motorizados, screens y persianas, o toldos con WiFi y app. Instalación profesional, configuración guiada y soporte en Castellón y Valencia.";
  const ogImage = `${baseUrl}/og.png`;

  const sections = useMemo(
    () => [
      {
        id: "cortinas",
        title: "Cortinas & estores",
        lead: "Caída impecable, silencio absoluto y control preciso de la luz interior.",
        paragraph:
          "Una automatización bien hecha no se nota: simplemente mejora tu día. Motores discretos, movimiento suave y un resultado que encaja con tu estilo.",
        prices: [
          "Motor + controlador (instalación incluida): 220€",
          "Estor + motor + controlador (instalación incluida): 345€",
        ],
        bullets: [
          "Motor silencioso y ajuste fino",
          "Control por mando / app (según sistema)",
          "Instalación y puesta en marcha incluidas",
          "Garantía y soporte post-instalación",
        ],
        cta: "Pedir propuesta cortinas/estores",
        whatsappMsg:
          "Hola, me gustaría más información sobre cortinas y estores motorizados. ¿Podemos agendar una visita?",
        imageSrc: cortinasImg,
        imageAlt: "Cortinas y estores motorizados en interior luminoso",
        finePrint:
          "*El precio final puede variar según medidas, tejidos y número de motores.",
      },

      {
        id: "persianas",
        title: "Persianas & screens",
        lead: "Control solar, privacidad y confort térmico sin renunciar al diseño.",
        paragraph:
          "Cuando buscas luz bonita sin deslumbramiento, el screen suele ser la solución más equilibrada. Con automatización, tu casa se adapta con naturalidad.",
        prices: ["Desde 990€ (instalación incluida)"],
        bullets: [
          "Tejido técnico screen (según elección)",
          "Movimiento suave y preciso",
          "Escenas día / noche / ausencia",
          "Instalación y configuración incluidas",
        ],
        cta: "Pedir propuesta screens",
        whatsappMsg:
          "Hola, me gustaría más información sobre persianas y screens motorizados. ¿Podemos agendar una visita?",
        imageSrc: persianasImg,
        imageAlt: "Screen enrollable con luz suave y diseño limpio",
        finePrint:
          "*El precio final depende de medidas, tejidos y configuración.",
      },

      {
        id: "toldos",
        title: "Toldos & exterior",
        lead: "Protección inteligente con control por WiFi y app móvil.",
        paragraph:
          "En exterior, automatizar es proteger. Tu toldo se adapta mejor al uso diario, mejora el confort de la terraza y puede configurarse con escenas según necesidades.",
        prices: [
          "Toldo 4m x 2m acrílico + motor WiFi + app (instalación + IVA incl.): 1380€",
          "Toldo cofre 4m x 2m + motor WiFi + app (instalación + IVA incl.): 1998€",
        ],

        bullets: [
          "Motor WiFi + control con app",
          "Mando y calibración de límites",
          "Sensores (sol/viento) según necesidad",
          "Instalación segura y pruebas finales",
        ],
        cta: "Pedir propuesta toldos",
        whatsappMsg:
          "Hola, me gustaría más información sobre toldos motorizados con WiFi y app. ¿Podemos agendar una visita?",
        imageSrc: toldosImg,
        imageAlt: "Toldo motorizado en terraza exterior",
        finePrint:
          "*Instalación eléctrica sujeta a condiciones. El precio final puede variar según medidas y extras.",
      },
    ],
    []
  );
  const faqs = useMemo(
    () => [
      {
        q: "¿Puedo empezar solo con una estancia y ampliar después?",
        a: "Sí. Puedes motorizar una cortina, un screen o un toldo en una sola estancia y ampliar más adelante. Diseñamos la base para que futuras automatizaciones queden integradas y fáciles de usar.",
        aText:
          "Sí. Puedes motorizar una cortina, un screen o un toldo en una sola estancia y ampliar más adelante. Diseñamos la base para que futuras automatizaciones queden integradas y fáciles de usar.",
      },
      {
        q: "¿Necesito hacer obra para motorizar cortinas o persianas?",
        a: "En la mayoría de casos no es necesaria obra. Buscamos una instalación limpia y discreta, cuidando cableado, remates y ajustes para que solo se note el resultado.",
        aText:
          "En la mayoría de casos no es necesaria obra. Buscamos una instalación limpia y discreta, cuidando cableado, remates y ajustes para que solo se note el resultado.",
      },
      {
        q: "¿Se controla con mando, con móvil o con ambos?",
        a: "Depende del sistema elegido. Podemos configurar control por mando, por app móvil o ambas opciones. En la visita te recomendamos la solución adecuada según uso y presupuesto.",
        aText:
          "Depende del sistema elegido. Podemos configurar control por mando, por app móvil o ambas opciones. En la visita te recomendamos la solución adecuada según uso y presupuesto.",
      },
      {
        q: "¿Cuánto tarda la instalación?",
        a: "En la mayoría de proyectos de automatización por estancia, la instalación se realiza en una sola visita. El tiempo final depende de las medidas y del número de elementos a motorizar.",
        aText:
          "En la mayoría de proyectos de automatización por estancia, la instalación se realiza en una sola visita. El tiempo final depende de las medidas y del número de elementos a motorizar.",
      },
    ],
    []
  );
  // Scroll-to-hash support
  useEffect(() => {
    const hash = location.hash.replace("#", "");
    if (!hash) return;
    document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
  }, [location.hash]);

  // Scroll reveal (IntersectionObserver)
  const revealRefs = useRef([]);
  useEffect(() => {
    const nodes = revealRefs.current.filter(Boolean);
    if (!nodes.length) return;

    // Reduced motion: just show
    const prefersReduced = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)"
    )?.matches;
    if (prefersReduced) {
      nodes.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    if (!("IntersectionObserver" in window)) {
      nodes.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: "80px 0px", threshold: 0.12 }
    );

    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  // Track active section (for mobile WhatsApp FAB message)
  const [activeId, setActiveId] = useState(sections[0]?.id || "cortinas");
  useEffect(() => {
    const ids = sections.map((s) => s.id);
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean);

    if (!els.length) return;

    if (!("IntersectionObserver" in window)) return;

    const io = new IntersectionObserver(
      (entries) => {
        // pick the most visible
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) => (b.intersectionRatio || 0) - (a.intersectionRatio || 0)
          )[0];

        if (visible?.target?.id) setActiveId(visible.target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0.12, 0.25, 0.5] }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [sections]);

  const activeSection = sections.find((s) => s.id === activeId) || sections[0];
  const fabHref = buildWhatsAppLink(
    activeSection?.whatsappMsg ||
      "Hola, me gustaría más información. ¿Podemos agendar una visita?"
  );

  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${canonical}#webpage`,
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
    about: {
      "@type": "Service",
      name: "Automatización individual",
      areaServed: CONTACT.areaServed?.map((name) => ({
        "@type": "AdministrativeArea",
        name,
      })),
      provider: {
        "@type": "Organization",
        name: siteName,
        telephone: CONTACT.phoneLandline,
        email: CONTACT.email,
        url: `${baseUrl}/`,
      },
    },
  };

  return (
    <Page>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonical} />
        <meta name="robots" content="index,follow" />

        <meta property="og:site_name" content={siteName} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="es_ES" />
        <meta property="og:url" content={canonical} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={ogImage} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />

        <script type="application/ld+json">
          {JSON.stringify(webPageJsonLd)}
        </script>
      </Helmet>

      {/*  HERO  */}
      <Hero>
        <HeroBg>
          <HeroImg src={persianasImg} alt="" aria-hidden="true" />
          <HeroOverlay />
          <HeroScan />
          <HeroGlow />
        </HeroBg>

        <HeroInner>
          <HeroTop>
            <MicroLineDark>
              Automatización · Decoración textil · Protección solar
            </MicroLineDark>
            <HeroTitleDark>Automatiza lo esencial.</HeroTitleDark>
            {/* <HeroTitleDark>Elige por interés.</HeroTitleDark> */}
            {/* Control absoluto, por partes. */}
            <HeroScriptDark>
              Nosotros lo dejamos <em>perfecto</em>.
            </HeroScriptDark>

            <HeroPDark>
              Cortinas, screens o toldos con una propuesta clara, instalación
              profesional y un resultado que se siente desde el primer día.
            </HeroPDark>
          </HeroTop>
        </HeroInner>
      </Hero>
      {/* REASSURANCE / PROCESS MINI */}
      <ReassureSection>
        <ReassureInner>
          <ReassureTop>
            <Kicker>Automatización individual</Kicker>
            <Title>
              Automatiza <span>a tu ritmo</span>
            </Title>
            <Lead>
              Por estancias o por piezas: empiezas por lo esencial y ampliamos
              cuando te encaje. Instalación limpia, ajuste fino y cero
              sorpresas.
            </Lead>
          </ReassureTop>

          <Steps>
            <Step>
              <StepIndex>01</StepIndex>
              <StepTitle>Una estancia o un elemento</StepTitle>
              <StepText>
                Salón, dormitorio o terraza. Motorizar una pieza ya cambia tu
                día a día sin comprometer toda la vivienda.
              </StepText>
            </Step>

            <Step>
              <StepIndex>02</StepIndex>
              <StepTitle>Propuesta clara</StepTitle>
              <StepText>
                Te recomendamos el sistema adecuado según medidas, tejido y uso
                (mando o app, según el caso).
              </StepText>
            </Step>

            <Step>
              <StepIndex>03</StepIndex>
              <StepTitle>Instalamos y calibramos</StepTitle>
              <StepText>
                Montaje profesional, límites ajustados y pruebas finales para
                que todo funcione perfecto desde el primer día.
              </StepText>
            </Step>
          </Steps>
        </ReassureInner>
      </ReassureSection>
      <Main>
        {/* PACKS (catalog style) */}
        <PacksSection id="packs">
          <Wrap>
            <PacksHeader>
              <PacksKicker>Configuraciones</PacksKicker>
              <PacksTitle>
                <span>Elige</span> dónde empezar
              </PacksTitle>
              <PacksMuted>
                Orientativo según medidas, tejido y sistema de control (mando o
                app).
              </PacksMuted>
            </PacksHeader>

            <PackGrid>
              {sections.map((s) => (
                <PackCard key={s.id}>
                  <PackMedia>
                    <img src={s.imageSrc} alt={s.imageAlt} loading="lazy" />
                    <PackMediaOverlay />
                    <PackMediaLabel>{s.title}</PackMediaLabel>
                  </PackMedia>

                  <PackBody>
                    <PackLead>{s.lead}</PackLead>

                    <PackPrice>
                      {(s.prices || []).slice(0, 2).map((p) => (
                        <div key={p}>{p}</div>
                      ))}
                    </PackPrice>

                    <PackList>
                      {s.bullets.slice(0, 4).map((b) => (
                        <li key={b}>
                          <CheckDot aria-hidden="true" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </PackList>

                    <PackNote>{s.availability}</PackNote>

                    <PackCtas>
                      <PackTertiary href={`#${s.id}`}>
                        Solicitar Propuesta <ArrowRight size={16} />
                      </PackTertiary>
                    </PackCtas>

                    <PackFine>{s.finePrint}</PackFine>
                  </PackBody>
                </PackCard>
              ))}
            </PackGrid>
          </Wrap>
        </PacksSection>
        <AutomationFaq
          items={faqs}
          kicker="Dudas rápidas"
          title={
            <>
              Preguntas <span>frecuentes</span>
            </>
          }
          lead="Resolvemos lo importante antes de la visita."
          withSchema
          canonicalUrl={canonical}
        />
      </Main>

      <StickyCtaButton message="Hola, quiero una propuesta para automatización por estancias. ¿Podemos agendar una visita?" />
    </Page>
  );
}
