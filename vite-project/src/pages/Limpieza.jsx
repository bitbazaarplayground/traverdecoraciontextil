import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import styled from "styled-components";
import FaqAccordion from "../components/faq/FaqAccordion";
import ServiceHero from "../components/heroes/ServiceHero";
import { CONTACT } from "../config/contact";
import { trackEvent } from "../lib/analytics";
import StickyCtaButton from "../mobile/StickyCtaButton";

import steam1200 from "../assets/servicios/limpieza/steam-1200.webp";
import steam400 from "../assets/servicios/limpieza/steam-400.webp";
import steam600 from "../assets/servicios/limpieza/steam-600.webp";
import steam800 from "../assets/servicios/limpieza/steam-800.webp";

const hero_480 = "/limpieza/limpieza-480.webp";
const hero_768 = "/limpieza/limpieza-768.webp";
const hero_1280 = "/limpieza/limpieza-1280.webp";
const hero_1920 = "/limpieza/limpieza-1920.webp";

const curtain_480 = "/limpieza/colgarCortina-480.webp";
const curtain_768 = "/limpieza/colgarCortina-768.webp";
const curtain_1280 = "/limpieza/colgarCortina-1280.webp";
const curtain_1920 = "/limpieza/colgarCortina-1920.webp";

const buildSrcSet = (sources) =>
  sources
    .filter((source) => source?.src && source?.width)
    .map(({ src, width }) => `${src} ${width}w`)
    .join(", ");

const introImageSrcSet = buildSrcSet([
  { src: steam400, width: 400 },
  { src: steam600, width: 600 },
  { src: steam800, width: 800 },
  { src: steam1200, width: 1200 },
]);

const bannerImageSrcSet = buildSrcSet([
  { src: curtain_480, width: 480 },
  { src: curtain_768, width: 768 },
  { src: curtain_1280, width: 1280 },
  { src: curtain_1920, width: 1920 },
]);

const introImageSizes =
  "(min-width: 1200px) 500px, (min-width: 920px) 42vw, (min-width: 768px) calc(100vw - 4rem), calc(100vw - 2.5rem)";

const bannerSizes =
  "(min-width: 1200px) 1120px, (min-width: 768px) calc(100vw - 4rem), calc(100vw - 2.5rem)";

const Page = styled.main`
  width: 100%;
  background: #fff;
  color: #151515;
`;

const Section = styled.section`
  max-width: 1120px;
  margin: 0 auto;
  padding: 4.25rem 2rem;

  @media (max-width: 768px) {
    padding: 3.25rem 1.25rem;
  }
`;

const SectionTop = styled.div`
  margin-bottom: 1.8rem;

  @media (max-width: 768px) {
    margin-bottom: 1.45rem;
  }
`;

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

const SectionTitle = styled.h2`
  margin: 0;
  font-size: 2.2rem;
  font-weight: 600;
  line-height: 1.12;
  letter-spacing: -0.02em;
  color: rgba(17, 17, 17, 0.96);

  span {
    color: ${({ theme }) => theme.colors.primary};
  }

  @media (max-width: 768px) {
    font-size: 1.7rem;
    line-height: 1.14;
  }
`;

const SectionLead = styled.p`
  margin: 0.7rem 0 0;
  font-size: 1.08rem;
  line-height: 1.7;
  color: rgba(17, 17, 17, 0.62);
  max-width: 70ch;

  @media (max-width: 768px) {
    font-size: 0.995rem;
    line-height: 1.68;
  }
`;

const IntroGrid = styled.div`
  display: grid;
  grid-template-columns: 1.08fr 0.92fr;
  gap: 1.6rem;
  align-items: start;

  @media (max-width: 920px) {
    grid-template-columns: 1fr;
    gap: 1.4rem;
  }

  @media (max-width: 768px) {
    gap: 1.15rem;
  }
`;

const IntroText = styled.div`
  p {
    margin: 0 0 0.95rem;
    font-size: 1.04rem;
    line-height: 1.82;
    color: #4b4b4b;
  }

  p:last-child {
    margin-bottom: 0;
  }

  @media (max-width: 768px) {
    p {
      margin: 0 0 0.85rem;
      font-size: 0.99rem;
      line-height: 1.76;
    }
  }
`;

const IntroVisual = styled.div`
  position: relative;
`;

const IntroImageWrap = styled.div`
  position: relative;
  border-radius: 28px;
  overflow: hidden;
  min-height: 520px;
  background: #f4f1ec;
  box-shadow: 0 22px 52px rgba(15, 23, 42, 0.1);

  @media (max-width: 920px) {
    min-height: 400px;
  }

  @media (max-width: 768px) {
    min-height: 320px;
    border-radius: 20px;
    box-shadow: 0 16px 36px rgba(15, 23, 42, 0.08);
  }

  &:after {
    content: "";
    position: absolute;
    inset: auto 0 0 0;
    height: 44%;
    background: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.42) 0%,
      rgba(0, 0, 0, 0.12) 54%,
      rgba(0, 0, 0, 0) 100%
    );
    pointer-events: none;
  }
`;

const IntroImage = styled.img`
  width: 100%;
  height: 100%;
  position: absolute;
  inset: 0;
  object-fit: cover;
  object-position: center center;
  display: block;

  @media (max-width: 768px) {
    object-position: center 42%;
  }
`;

const IntroBadge = styled.div`
  position: absolute;
  left: 1.15rem;
  right: auto;
  bottom: 1.15rem;
  z-index: 1;
  max-width: 320px;
  padding: 1rem 1rem 1rem 1.05rem;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border: 1px solid rgba(255, 255, 255, 0.65);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);

  strong {
    display: block;
    margin-bottom: 0.35rem;
    font-size: 0.96rem;
    color: #151515;
    line-height: 1.35;
  }

  span {
    display: block;
    color: rgba(17, 17, 17, 0.66);
    line-height: 1.6;
    font-size: 0.92rem;
  }

  @media (max-width: 768px) {
    left: 0.75rem;
    right: 0.75rem;
    bottom: 0.75rem;
    max-width: none;
    padding: 0.85rem 0.9rem;
    border-radius: 16px;
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.08);

    strong {
      font-size: 0.9rem;
      margin-bottom: 0.25rem;
    }

    span {
      font-size: 0.85rem;
      line-height: 1.5;
    }
  }
`;

const BenefitsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 0.8rem;
  }
`;

const BenefitCard = styled.article`
  background: #fbfaf8;
  border-radius: 22px;
  padding: 1.45rem;
  border: 1px solid rgba(15, 23, 42, 0.06);

  h3 {
    margin: 0 0 0.7rem;
    font-size: 1.05rem;
    color: #151515;
  }

  p {
    margin: 0;
    color: #555;
    line-height: 1.75;
  }

  @media (max-width: 768px) {
    border-radius: 18px;
    padding: 1.15rem;

    h3 {
      font-size: 1rem;
      margin-bottom: 0.55rem;
    }

    p {
      font-size: 0.95rem;
      line-height: 1.68;
    }
  }
`;

const PricingWrap = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.2rem;

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
    gap: 0.95rem;
  }
`;

const PriceCard = styled.article`
  position: relative;
  overflow: hidden;
  background: linear-gradient(180deg, #ffffff 0%, #fcfbf9 100%);
  border-radius: 28px;
  padding: 1.95rem;
  border: 1px solid rgba(17, 17, 17, 0.08);
  box-shadow: 0 24px 65px rgba(0, 0, 0, 0.06);

  &:before {
    content: "";
    position: absolute;
    inset: 0 0 auto;
    height: 5px;
    background: linear-gradient(
      90deg,
      ${({ theme }) => theme.colors.primary},
      rgba(196, 151, 98, 0.2)
    );
  }

  h3 {
    margin: 0 0 0.7rem;
    font-size: 1.18rem;
    color: #151515;
  }

  p {
    margin: 0 0 1.15rem;
    color: rgba(17, 17, 17, 0.66);
    line-height: 1.74;
  }

  @media (max-width: 768px) {
    border-radius: 22px;
    padding: 1.35rem;
    box-shadow: 0 18px 42px rgba(0, 0, 0, 0.05);

    h3 {
      font-size: 1.08rem;
    }

    p {
      font-size: 0.95rem;
      line-height: 1.68;
    }
  }
`;

const FeaturedPriceCard = styled(PriceCard)`
  background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.96),
      rgba(250, 247, 241, 0.96)
    ),
    #fff;
  border-color: rgba(196, 151, 98, 0.22);
  box-shadow: 0 28px 70px rgba(15, 23, 42, 0.08),
    0 0 0 1px rgba(196, 151, 98, 0.07);

  &:after {
    content: "Más solicitado";
    position: absolute;
    top: 1rem;
    right: 1rem;
    padding: 0.42rem 0.75rem;
    border-radius: 999px;
    background: #111;
    color: #fff;
    font-size: 0.73rem;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  @media (max-width: 768px) {
    &:after {
      top: 0.85rem;
      right: 0.85rem;
      padding: 0.36rem 0.62rem;
      font-size: 0.66rem;
    }
  }
`;

const PriceLabel = styled.span`
  display: inline-block;
  margin-bottom: 0.7rem;
  padding: 0.4rem 0.76rem;
  border-radius: 999px;
  background: rgba(17, 17, 17, 0.05);
  color: rgba(17, 17, 17, 0.8);
  font-size: 0.8rem;
  font-weight: 800;
`;

const Price = styled.div`
  font-size: clamp(2rem, 3vw, 2.55rem);
  font-weight: 900;
  letter-spacing: -0.03em;
  margin-bottom: 0.85rem;
  color: #151515;

  @media (max-width: 768px) {
    margin-bottom: 0.65rem;
  }
`;

const PriceNote = styled.div`
  font-size: 0.95rem;
  color: #666;
  line-height: 1.76;

  @media (max-width: 768px) {
    font-size: 0.92rem;
    line-height: 1.68;
  }
`;

const PricePoints = styled.ul`
  list-style: none;
  margin: 1.1rem 0 0;
  padding: 0;

  @media (max-width: 768px) {
    margin-top: 0.9rem;
  }
`;

const PricePoint = styled.li`
  position: relative;
  padding-left: 1.35rem;
  color: rgba(17, 17, 17, 0.72);
  line-height: 1.72;
  font-size: 0.95rem;

  & + & {
    margin-top: 0.45rem;
  }

  &:before {
    content: "";
    position: absolute;
    left: 0;
    top: 0.7rem;
    width: 0.45rem;
    height: 0.45rem;
    border-radius: 999px;
    background: ${({ theme }) => theme.colors.primary};
  }

  @media (max-width: 768px) {
    font-size: 0.92rem;
    line-height: 1.66;

    &:before {
      top: 0.62rem;
    }
  }
`;

const Banner = styled.section`
  max-width: 1120px;
  margin: 0 auto 4rem;
  padding: 0 2rem;

  @media (max-width: 768px) {
    padding: 0 1.25rem;
    margin-bottom: 3.25rem;
  }
`;

const BannerInner = styled.div`
  border-radius: 28px;
  overflow: hidden;
  min-height: 400px;
  position: relative;
  display: grid;
  align-items: end;
  isolation: isolate;

  @media (max-width: 768px) {
    min-height: 300px;
    border-radius: 20px;
  }
`;

const BannerImage = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  z-index: 0;
  display: block;
`;

const BannerOverlay = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.68) 0%,
    rgba(0, 0, 0, 0.28) 48%,
    rgba(0, 0, 0, 0.08) 100%
  );
`;

const BannerContent = styled.div`
  position: relative;
  z-index: 2;
  padding: 2rem;
  color: white;
  max-width: 720px;

  h2 {
    margin: 0 0 0.8rem;
    font-size: clamp(2rem, 3vw, 2.6rem);
    line-height: 1.08;
  }

  p {
    margin: 0;
    line-height: 1.82;
    color: rgba(255, 255, 255, 0.86);
  }

  @media (max-width: 768px) {
    padding: 1.25rem;

    h2 {
      margin-bottom: 0.6rem;
      font-size: 1.6rem;
      line-height: 1.12;
    }

    p {
      font-size: 0.95rem;
      line-height: 1.64;
    }
  }
`;

const ProcessGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1rem;
  position: relative;

  @media (max-width: 980px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 0.8rem;
  }
`;

const StepCard = styled.article`
  background: linear-gradient(180deg, #ffffff 0%, #fcfbf8 100%);
  border-radius: 22px;
  padding: 1.45rem;
  border: 1px solid rgba(15, 23, 42, 0.06);
  box-shadow: 0 14px 34px rgba(15, 23, 42, 0.04);
  position: relative;
  overflow: hidden;
  transition: transform 0.25s ease, box-shadow 0.25s ease,
    border-color 0.25s ease;

  &:before {
    content: "";
    position: absolute;
    inset: 0 auto 0 0;
    width: 4px;
    background: linear-gradient(
      to bottom,
      ${({ theme }) => theme.colors.primary},
      rgba(196, 151, 98, 0.18)
    );
  }

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 26px 60px rgba(15, 23, 42, 0.08);
      border-color: rgba(196, 151, 98, 0.28);
    }
  }

  strong {
    display: inline-flex;
    width: 2.15rem;
    height: 2.15rem;
    border-radius: 999px;
    align-items: center;
    justify-content: center;
    margin-bottom: 0.95rem;
    background: ${({ theme }) => theme.colors.primary};
    color: #111;
    font-size: 0.95rem;
    font-weight: 900;
    box-shadow: 0 10px 24px rgba(196, 151, 98, 0.28);
  }

  h3 {
    margin: 0 0 0.6rem;
    font-size: 1.05rem;
    color: #151515;
  }

  p {
    margin: 0;
    color: #555;
    line-height: 1.72;
  }

  @media (max-width: 768px) {
    border-radius: 18px;
    padding: 1.15rem;

    strong {
      width: 2rem;
      height: 2rem;
      margin-bottom: 0.8rem;
      font-size: 0.9rem;
    }

    h3 {
      font-size: 1rem;
      margin-bottom: 0.45rem;
    }

    p {
      font-size: 0.94rem;
      line-height: 1.66;
    }
  }
`;

const TrustStrip = styled.div`
  margin-top: 2rem;
  padding: 1.35rem 1.25rem;
  border-radius: 18px;
  border: 1px solid rgba(17, 17, 17, 0.08);
  background: linear-gradient(180deg, #fcfbf9 0%, #f8f5ef 100%);
  display: grid;
  gap: 0.75rem;

  @media (min-width: 900px) {
    grid-template-columns: 1.2fr 0.8fr;
    align-items: center;
  }

  @media (max-width: 768px) {
    margin-top: 1.4rem;
    padding: 1rem;
    border-radius: 16px;
  }
`;

const TrustText = styled.p`
  margin: 0;
  color: rgba(17, 17, 17, 0.72);
  line-height: 1.75;

  @media (max-width: 768px) {
    font-size: 0.95rem;
    line-height: 1.68;
  }
`;

const TrustCTA = styled(Link)`
  justify-self: start;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.85rem 1.45rem;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.primary};
  color: #0b0c0f;
  font-weight: 850;
  text-decoration: none;
  transition: opacity 0.25s ease, transform 0.25s ease;

  @media (min-width: 900px) {
    justify-self: end;
  }

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      opacity: 0.92;
      transform: translateY(-1px);
    }
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 0.9rem 1.2rem;
  }
`;

const FaqWrap = styled.div`
  margin-top: 1.5rem;

  @media (max-width: 768px) {
    margin-top: 1.15rem;
  }
`;

const faqItems = [
  {
    q: "¿Qué tipo de cortinas y textiles podéis limpiar?",
    a: "Trabajamos con cortinas, visillos y otros textiles decorativos, siempre valorando previamente el tipo de tejido, la confección y el sistema de instalación para aplicar el cuidado más adecuado.",
    aText:
      "Trabajamos con cortinas, visillos y otros textiles decorativos, siempre valorando previamente el tipo de tejido, la confección y el sistema de instalación para aplicar el cuidado más adecuado.",
  },
  {
    q: "¿Incluye desmontaje y montaje?",
    a: "Sí. Puedes elegir una opción básica de limpieza o el servicio completo a domicilio, que incluye desplazamiento, descolgado, limpieza y colocación de nuevo.",
    aText:
      "Sí. Puedes elegir una opción básica de limpieza o el servicio completo a domicilio, que incluye desplazamiento, descolgado, limpieza y colocación de nuevo.",
  },
  {
    q: "¿Los precios son fijos?",
    a: "Los importes mostrados son precios base desde los que partir. Algunas piezas especiales, medidas grandes o tejidos delicados pueden requerir una valoración previa.",
    aText:
      "Los importes mostrados son precios base desde los que partir. Algunas piezas especiales, medidas grandes o tejidos delicados pueden requerir valoración previa.",
  },
  {
    q: "¿Puedo solicitar solo la limpieza sin visita a domicilio?",
    a: "Sí. Si no necesitas desmontaje ni montaje, puedes contratar únicamente la limpieza de la pieza.",
    aText:
      "Sí. Si no necesitas desmontaje ni montaje, puedes contratar únicamente la limpieza de la pieza.",
  },
  {
    q: "¿Este servicio es útil como mantenimiento periódico?",
    a: "Sí. Es una muy buena opción para viviendas habituales, segundas residencias o espacios donde se quiere conservar la presencia del textil en perfecto estado durante más tiempo.",
    aText:
      "Sí. Es una muy buena opción para viviendas habituales, segundas residencias o espacios donde se quiere conservar la presencia del textil en perfecto estado durante más tiempo.",
  },
];

export default function Limpieza({ onOpenAsesoramiento }) {
  const baseUrl = (
    import.meta.env.VITE_SITE_URL || window.location.origin
  ).replace(/\/$/, "");

  const canonical = `${baseUrl}/limpieza`;
  const siteName = CONTACT.siteName || "Traver Decoración Textil";

  const title =
    "Limpieza de cortinas y textiles decorativos | Traver Decoración Textil";
  const description =
    "Servicio profesional de limpieza y mantenimiento para cortinas, visillos y textiles decorativos, con opción de desmontaje, limpieza y montaje a domicilio.";

  const ogImage = `${baseUrl}/limpieza/limpieza-1280.webp`;
  const ogImageAlt =
    "Servicio de limpieza y mantenimiento de cortinas y textiles decorativos";

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${canonical}#service`,
      name: "Limpieza y mantenimiento de textiles decorativos",
      serviceType: "Limpieza de cortinas y textiles decorativos",
      description,
      url: canonical,
      image: ogImage,
      areaServed: [
        {
          "@type": "AdministrativeArea",
          name: "Castellón",
        },
        {
          "@type": "AdministrativeArea",
          name: "Valencia",
        },
      ],
      provider: {
        "@type": "LocalBusiness",
        name: siteName,
        url: baseUrl,
      },
    },
    {
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
        "@id": `${canonical}#service`,
      },
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: ogImage,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqItems.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.aText,
        },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
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
          name: "Limpieza",
          item: canonical,
        },
      ],
    },
  ];

  return (
    <Page>
      <Helmet prioritizeSeoTags>
        <html lang="es" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="robots" content="index,follow,max-image-preview:large" />
        <link rel="canonical" href={canonical} />

        <meta property="og:site_name" content={siteName} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="es_ES" />
        <meta property="og:url" content={canonical} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:alt" content={ogImageAlt} />
        <meta property="og:image:width" content="1280" />
        <meta property="og:image:height" content="720" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />
        <meta name="twitter:image:alt" content={ogImageAlt} />

        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <ServiceHero
        eyebrow="Servicios · Traver Decoración Textil"
        title={
          <>
            Limpieza y mantenimiento de <span>textiles decorativos</span>
          </>
        }
        subtitle="Un servicio pensado para conservar cortinas, estores y otros textiles en perfecto estado, con cuidado profesional, recogida opcional e instalación de nuevo en su lugar."
        hero480={hero_480}
        hero768={hero_768}
        hero1280={hero_1280}
        hero1920={hero_1920}
        objectPosition="center"
        primaryLabel="Solicitar información"
        primaryTo="/contact"
        primaryTrackSource="limpieza_primary"
        primaryPack="Limpieza"
        secondaryLabel="Ver precios"
        secondaryHref="#precios-limpieza"
        onOpenAsesoramiento={onOpenAsesoramiento}
      />

      <Section aria-labelledby="limpieza-intro-title">
        <IntroGrid>
          <IntroText>
            <SectionTop>
              <Kicker>Servicio profesional</Kicker>
              <SectionTitle id="limpieza-intro-title">
                El cuidado profesional que tus textiles necesitan para seguir
                luciendo <span>impecables</span>
              </SectionTitle>
            </SectionTop>

            <p>
              La limpieza de cortinas y textiles decorativos debe estar a la
              altura del propio espacio. Por eso trabajamos con una visión
              estética y técnica: cuidar la pieza, respetar su confección y
              devolverla lista para seguir vistiendo el ambiente con la misma
              elegancia.
            </p>
            <p>
              No tratamos una cortina como una prenda cualquiera. Valoramos el
              tejido, la caída, el sistema de instalación y el contexto en el
              que la pieza forma parte de la decoración.
            </p>
            <p>
              El resultado que buscamos no es solo limpieza. Buscamos que el
              textil mantenga su presencia, que el espacio siga viéndose cuidado
              y que el cliente sienta que su casa o proyecto está en manos
              profesionales.
            </p>
          </IntroText>

          <IntroVisual>
            <IntroImageWrap>
              <IntroImage
                src={steam800}
                srcSet={introImageSrcSet}
                sizes={introImageSizes}
                width="1200"
                height="1600"
                alt="Limpieza profesional de una cortina con vapor"
                loading="eager"
                fetchPriority="high"
                decoding="async"
              />
              <IntroBadge>
                <strong>Servicio con recogida y reinstalación opcional</strong>
                <span>
                  Para que la experiencia sea tan cuidada como el resultado
                  final dentro del espacio.
                </span>
              </IntroBadge>
            </IntroImageWrap>
          </IntroVisual>
        </IntroGrid>
      </Section>

      <Section aria-labelledby="limpieza-beneficios-title">
        <SectionTop>
          <Kicker>Por qué elegir este servicio</Kicker>
          <SectionTitle id="limpieza-beneficios-title">
            Cuidamos la limpieza sin perder la <span>estética</span>
          </SectionTitle>
          <SectionLead>
            El objetivo no es solo limpiar, sino conservar la caída, la textura
            y la imagen del conjunto decorativo para que el espacio siga
            viéndose cuidado y coherente.
          </SectionLead>
        </SectionTop>

        <BenefitsGrid>
          <BenefitCard>
            <h3>Cuidado según el tejido</h3>
            <p>
              Valoramos cada pieza antes de intervenir para elegir la solución
              más adecuada según material, confección y uso.
            </p>
          </BenefitCard>

          <BenefitCard>
            <h3>Comodidad real</h3>
            <p>
              Con la opción a domicilio nos ocupamos del desmontaje y montaje,
              reduciendo molestias y ahorrando tiempo al cliente.
            </p>
          </BenefitCard>

          <BenefitCard>
            <h3>Mantenimiento con criterio</h3>
            <p>
              Un servicio pensado para prolongar la buena presencia del textil y
              ayudar a mantener el espacio siempre impecable.
            </p>
          </BenefitCard>
        </BenefitsGrid>
      </Section>

      <Section id="precios-limpieza" aria-labelledby="limpieza-precios-title">
        <SectionTop>
          <Kicker>Tarifas</Kicker>
          <SectionTitle id="limpieza-precios-title">
            Precios base orientativos
          </SectionTitle>
          <SectionLead>
            Mostrar una base orientativa ayuda a filtrar mejor el interés y
            transmite transparencia, sin perder margen para valorar piezas
            especiales o necesidades concretas.
          </SectionLead>
        </SectionTop>

        <PricingWrap>
          <PriceCard>
            <PriceLabel>Servicio base</PriceLabel>
            <h3>Lavado de 1 cortina</h3>
            <p>
              Para clientes que necesitan la limpieza de una pieza concreta sin
              incluir desplazamiento ni reinstalación.
            </p>
            <Price>Desde 45 €</Price>
            <PriceNote>
              Precio base por unidad. Las medidas especiales, confecciones
              complejas o tejidos delicados pueden requerir valoración previa.
            </PriceNote>

            <PricePoints>
              <PricePoint>Ideal para necesidades puntuales.</PricePoint>
              <PricePoint>
                Enfoque cuidadoso según el tipo de textil.
              </PricePoint>
              <PricePoint>
                Opción clara y sencilla para una sola pieza.
              </PricePoint>
            </PricePoints>
          </PriceCard>

          <FeaturedPriceCard>
            <PriceLabel>Servicio premium</PriceLabel>
            <h3>Servicio completo a domicilio</h3>
            <p>
              Incluye desplazamiento, desmontaje, limpieza y montaje de nuevo en
              el domicilio del cliente para una experiencia mucho más cómoda.
            </p>
            <Price>Desde 75 €</Price>
            <PriceNote>
              La opción ideal para quienes quieren un servicio integral, cómodo
              y con una ejecución coherente con el nivel del espacio.
            </PriceNote>

            <PricePoints>
              <PricePoint>Descolgado y reinstalación incluidos.</PricePoint>
              <PricePoint>Mayor comodidad y mejor experiencia.</PricePoint>
              <PricePoint>
                Perfecto para viviendas cuidadas y segundas residencias.
              </PricePoint>
            </PricePoints>
          </FeaturedPriceCard>
        </PricingWrap>
      </Section>

      <Banner aria-labelledby="limpieza-banner-title">
        <BannerInner>
          <BannerImage
            src={curtain_1280}
            srcSet={bannerImageSrcSet}
            sizes={bannerSizes}
            width="1920"
            height="1280"
            alt="Profesional reinstalando una cortina en el domicilio del cliente"
            loading="lazy"
            decoding="async"
          />
          <BannerOverlay />
          <BannerContent>
            <h2 id="limpieza-banner-title">
              Cuidamos cada textil para que el espacio siga viéndose impecable
            </h2>
            <p>
              No se trata solo de limpiar. Se trata de conservar el aspecto, la
              caída y la presencia de cada elemento textil dentro del conjunto
              decorativo del espacio.
            </p>
          </BannerContent>
        </BannerInner>
      </Banner>

      <Section aria-labelledby="limpieza-proceso-title">
        <SectionTop>
          <Kicker>Proceso</Kicker>
          <SectionTitle id="limpieza-proceso-title">Cómo funciona</SectionTitle>
          <SectionLead>
            Una secuencia clara transmite orden, profesionalidad y confianza.
            Especialmente importante cuando el servicio entra en casa del
            cliente.
          </SectionLead>
        </SectionTop>

        <ProcessGrid>
          <StepCard>
            <strong>1</strong>
            <h3>Consulta inicial</h3>
            <p>
              Valoramos el tipo de pieza, sus medidas y el servicio que mejor se
              adapta a lo que necesitas.
            </p>
          </StepCard>

          <StepCard>
            <strong>2</strong>
            <h3>Recogida o visita</h3>
            <p>
              Puedes traer la pieza o solicitar el servicio completo con
              desplazamiento al domicilio.
            </p>
          </StepCard>

          <StepCard>
            <strong>3</strong>
            <h3>Limpieza y cuidado</h3>
            <p>
              Aplicamos el tratamiento más adecuado según tejido, confección y
              uso habitual del textil.
            </p>
          </StepCard>

          <StepCard>
            <strong>4</strong>
            <h3>Entrega o reinstalación</h3>
            <p>
              Dejamos la cortina lista para volver a integrarse en el espacio
              con el mejor acabado posible.
            </p>
          </StepCard>
        </ProcessGrid>

        <TrustStrip>
          <TrustText>
            Tratamos cada pieza con criterio decorativo y técnico: valoramos
            tejido, confección, uso y sistema de instalación para que el
            resultado no solo esté limpio, sino también bien conservado y listo
            para volver a lucir en el espacio.
          </TrustText>

          <TrustCTA
            to="/contact"
            onClick={(e) => {
              e.preventDefault();

              trackEvent("open_quick_enquiry", {
                source: "limpieza_trust_cta",
                pack: "Limpieza",
              });

              onOpenAsesoramiento?.("Limpieza", "limpieza_trust_cta");
            }}
          >
            Consultar mi caso
          </TrustCTA>
        </TrustStrip>
      </Section>

      <Section aria-labelledby="limpieza-faq-title">
        <SectionTop>
          <Kicker>Preguntas frecuentes</Kicker>
          <SectionTitle id="limpieza-faq-title">
            Resolvemos las dudas más habituales
          </SectionTitle>
          <SectionLead>
            Esta sección ayuda a transmitir confianza, aclarar condiciones del
            servicio y mejorar la experiencia antes de contactar.
          </SectionLead>
        </SectionTop>

        <FaqWrap>
          <FaqAccordion
            items={faqItems}
            withSchema={false}
            canonicalUrl={canonical}
            defaultOpenIndex={-1}
            ariaLabel="Preguntas frecuentes sobre limpieza de cortinas y textiles"
          />
        </FaqWrap>
      </Section>

      <StickyCtaButton message="Hola, me interesa el servicio de limpieza y mantenimiento de cortinas. ¿Podéis orientarme sobre la opción más adecuada y si necesitáis valorar la pieza antes de dar precio?" />
    </Page>
  );
}
