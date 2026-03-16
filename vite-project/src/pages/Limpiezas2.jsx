import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import styled from "styled-components";
import FaqAccordion from "../components/faq/FaqAccordion";
import ServiceHero from "../components/heroes/ServiceHero";
import { CONTACT } from "../config/contact";
import { trackEvent } from "../lib/analytics";
import StickyCtaButton from "../mobile/StickyCtaButton";

const hero_480 = "/limpieza/limpieza-480.webp";
const hero_768 = "/limpieza/limpieza-768.webp";
const hero_1280 = "/limpieza/limpieza-1280.webp";
const hero_1920 = "/limpieza/limpieza-1920.webp";

const curtain_480 = "/limpieza/colgarCortina-480.webp";
const curtain_768 = "/limpieza/colgarCortina-768.webp";
const curtain_1280 = "/limpieza/colgarCortina-1280.webp";
const curtain_1920 = "/limpieza/colgarCortina-1920.webp";

const getSrcSet = (img480, img768, img1280, img1920) =>
  [
    img480 && `${img480} 480w`,
    img768 && `${img768} 768w`,
    img1280 && `${img1280} 1280w`,
    img1920 && `${img1920} 1920w`,
  ]
    .filter(Boolean)
    .join(", ");

const bannerSizes =
  "(min-width: 1200px) 1120px, (min-width: 768px) calc(100vw - 4rem), calc(100vw - 3rem)";

const introImageSizes =
  "(min-width: 1200px) 480px, (min-width: 920px) 42vw, calc(100vw - 3rem)";

const Page = styled.main`
  width: 100%;
  background: radial-gradient(
      circle at top,
      rgba(196, 151, 98, 0.06),
      transparent 30%
    ),
    linear-gradient(180deg, #ffffff 0%, #fcfbf9 52%, #ffffff 100%);
  color: #151515;
`;

const Section = styled.section`
  max-width: 1120px;
  margin: 0 auto;
  padding: 6.5rem 2rem;

  @media (max-width: 1024px) {
    padding: 5.5rem 2rem;
  }

  @media (max-width: 768px) {
    padding: 4.5rem 1.5rem;
  }
`;

const SoftSection = styled(Section)`
  position: relative;

  &:before {
    content: "";
    position: absolute;
    inset: 0 1.25rem;
    border-radius: 36px;
    background: linear-gradient(180deg, #fcfbf9 0%, #f8f4ee 100%);
    border: 1px solid rgba(17, 17, 17, 0.05);
    z-index: 0;
  }

  @media (max-width: 768px) {
    &:before {
      inset: 0 0.75rem;
      border-radius: 28px;
    }
  }
`;

const SoftSectionInner = styled.div`
  position: relative;
  z-index: 1;
`;

const SectionTop = styled.div`
  margin-bottom: 2.8rem;

  @media (max-width: 768px) {
    margin-bottom: 2rem;
  }
`;

const Kicker = styled.p`
  margin: 0 0 0.75rem 0;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  font-size: 0.78rem;
  font-weight: 700;
  color: rgba(17, 17, 17, 0.52);
  position: relative;
  display: inline-block;
  padding-bottom: 0.7rem;

  &:after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0.08rem;
    width: 52px;
    height: 1px;
    background: rgba(196, 151, 98, 0.75);
  }
`;

const SectionTitle = styled.h2`
  margin: 0;
  font-size: clamp(1.9rem, 3vw, 2.75rem);
  font-weight: 600;
  line-height: 1.08;
  letter-spacing: -0.03em;
  color: rgba(17, 17, 17, 0.96);
  max-width: 12ch;

  span {
    color: ${({ theme }) => theme.colors.primary};
  }

  @media (max-width: 768px) {
    max-width: 100%;
    line-height: 1.12;
  }
`;

const SectionLead = styled.p`
  margin: 1rem 0 0;
  font-size: 1.05rem;
  line-height: 1.8;
  color: rgba(17, 17, 17, 0.62);
  max-width: 72ch;

  @media (max-width: 768px) {
    font-size: 1rem;
    line-height: 1.78;
  }
`;

const IntroGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(320px, 0.95fr);
  gap: 3rem;
  align-items: center;

  @media (max-width: 1024px) {
    gap: 2.2rem;
  }

  @media (max-width: 920px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const IntroText = styled.div`
  p {
    margin: 0 0 1.1rem;
    font-size: 1.04rem;
    line-height: 1.9;
    color: #4b4b4b;
    max-width: 62ch;
  }

  p:last-child {
    margin-bottom: 0;
  }

  @media (max-width: 768px) {
    p {
      font-size: 1rem;
      line-height: 1.85;
    }
  }
`;

const IntroVisual = styled.div`
  position: relative;
`;

const IntroImageWrap = styled.div`
  position: relative;
  border-radius: 30px;
  overflow: hidden;
  min-height: 540px;
  background: #f4f1ec;
  box-shadow: 0 34px 80px rgba(15, 23, 42, 0.12);

  @media (max-width: 920px) {
    min-height: 420px;
  }

  @media (max-width: 768px) {
    min-height: 360px;
    border-radius: 24px;
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
  object-position: center;
`;

const IntroBadge = styled.div`
  position: absolute;
  left: 1.15rem;
  bottom: 1.15rem;
  z-index: 1;
  max-width: 320px;
  padding: 1rem 1rem 1rem 1.05rem;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(14px);
  border: 1px solid rgba(255, 255, 255, 0.65);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);

  strong {
    display: block;
    margin-bottom: 0.35rem;
    font-size: 0.96rem;
    color: #151515;
  }

  span {
    display: block;
    color: rgba(17, 17, 17, 0.66);
    line-height: 1.6;
    font-size: 0.92rem;
  }

  @media (max-width: 768px) {
    left: 0.9rem;
    right: 0.9rem;
    bottom: 0.9rem;
    max-width: none;
    border-radius: 18px;
  }
`;

const BenefitsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.2rem;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const BenefitCard = styled.article`
  background: rgba(255, 255, 255, 0.78);
  backdrop-filter: blur(8px);
  border-radius: 24px;
  padding: 1.6rem;
  border: 1px solid rgba(15, 23, 42, 0.06);
  box-shadow: 0 16px 42px rgba(15, 23, 42, 0.05);
  transition: transform 0.25s ease, box-shadow 0.25s ease,
    border-color 0.25s ease;

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 26px 60px rgba(15, 23, 42, 0.08);
      border-color: rgba(196, 151, 98, 0.24);
    }
  }

  h3 {
    margin: 0 0 0.8rem;
    font-size: 1.08rem;
    color: #151515;
  }

  p {
    margin: 0;
    color: #555;
    line-height: 1.8;
  }
`;

const PricingWrap = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.4rem;

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
  }
`;

const PriceCard = styled.article`
  position: relative;
  overflow: hidden;
  background: linear-gradient(180deg, #ffffff 0%, #fcfbf9 100%);
  border-radius: 30px;
  padding: 2.1rem;
  border: 1px solid rgba(17, 17, 17, 0.08);
  box-shadow: 0 26px 70px rgba(0, 0, 0, 0.06);

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
    font-size: 1.22rem;
    color: #151515;
  }

  p {
    margin: 0 0 1.15rem;
    color: rgba(17, 17, 17, 0.66);
    line-height: 1.78;
  }

  @media (max-width: 768px) {
    padding: 1.6rem;
    border-radius: 24px;
  }
`;

const FeaturedPriceCard = styled(PriceCard)`
  background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.97),
      rgba(250, 247, 241, 0.97)
    ),
    #fff;
  border-color: rgba(196, 151, 98, 0.24);
  box-shadow: 0 30px 75px rgba(15, 23, 42, 0.08),
    0 0 0 1px rgba(196, 151, 98, 0.08);

  &:after {
    content: "Más solicitado";
    position: absolute;
    top: 1rem;
    right: 1rem;
    padding: 0.44rem 0.78rem;
    border-radius: 999px;
    background: #111;
    color: #fff;
    font-size: 0.72rem;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }
`;

const PriceLabel = styled.span`
  display: inline-block;
  margin-bottom: 0.8rem;
  padding: 0.42rem 0.78rem;
  border-radius: 999px;
  background: rgba(17, 17, 17, 0.05);
  color: rgba(17, 17, 17, 0.8);
  font-size: 0.78rem;
  font-weight: 800;
`;

const Price = styled.div`
  font-size: clamp(2rem, 3vw, 2.65rem);
  font-weight: 900;
  letter-spacing: -0.04em;
  margin-bottom: 0.9rem;
  color: #151515;
`;

const PriceNote = styled.div`
  font-size: 0.95rem;
  color: #666;
  line-height: 1.8;
`;

const PricePoints = styled.ul`
  list-style: none;
  margin: 1.2rem 0 0;
  padding: 0;
`;

const PricePoint = styled.li`
  position: relative;
  padding-left: 1.35rem;
  color: rgba(17, 17, 17, 0.72);
  line-height: 1.74;
  font-size: 0.96rem;

  & + & {
    margin-top: 0.5rem;
  }

  &:before {
    content: "";
    position: absolute;
    left: 0;
    top: 0.72rem;
    width: 0.46rem;
    height: 0.46rem;
    border-radius: 999px;
    background: ${({ theme }) => theme.colors.primary};
  }
`;

const Banner = styled.section`
  max-width: 1120px;
  margin: 0 auto 6rem;
  padding: 0 2rem;

  @media (max-width: 768px) {
    padding: 0 1.5rem;
    margin-bottom: 4.5rem;
  }
`;

const BannerInner = styled.div`
  border-radius: 34px;
  overflow: hidden;
  min-height: 470px;
  position: relative;
  display: grid;
  align-items: end;
  isolation: isolate;
  box-shadow: 0 36px 90px rgba(15, 23, 42, 0.12);

  @media (max-width: 768px) {
    min-height: 380px;
    border-radius: 26px;
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
`;

const BannerOverlay = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
  background: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.72) 0%,
      rgba(0, 0, 0, 0.28) 48%,
      rgba(0, 0, 0, 0.08) 100%
    ),
    linear-gradient(120deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0) 45%);
`;

const BannerContent = styled.div`
  position: relative;
  z-index: 2;
  padding: 2.4rem;
  color: white;
  max-width: 760px;

  h2 {
    margin: 0 0 0.9rem;
    font-size: clamp(2rem, 3vw, 2.9rem);
    line-height: 1.05;
    letter-spacing: -0.03em;
  }

  p {
    margin: 0;
    line-height: 1.85;
    color: rgba(255, 255, 255, 0.88);
    max-width: 62ch;
  }

  @media (max-width: 768px) {
    padding: 1.5rem;

    h2 {
      line-height: 1.1;
    }
  }
`;

const ProcessGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1rem;

  @media (max-width: 980px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const StepCard = styled.article`
  background: linear-gradient(180deg, #ffffff 0%, #fcfbf8 100%);
  border-radius: 24px;
  padding: 1.5rem;
  border: 1px solid rgba(15, 23, 42, 0.06);
  box-shadow: 0 16px 40px rgba(15, 23, 42, 0.04);
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
    width: 2.25rem;
    height: 2.25rem;
    border-radius: 999px;
    align-items: center;
    justify-content: center;
    margin-bottom: 1rem;
    background: ${({ theme }) => theme.colors.primary};
    color: #111;
    font-size: 0.95rem;
    font-weight: 900;
    box-shadow: 0 10px 24px rgba(196, 151, 98, 0.28);
  }

  h3 {
    margin: 0 0 0.65rem;
    font-size: 1.05rem;
    color: #151515;
  }

  p {
    margin: 0;
    color: #555;
    line-height: 1.74;
  }
`;

const TrustStrip = styled.div`
  margin-top: 2rem;
  padding: 1.45rem;
  border-radius: 22px;
  border: 1px solid rgba(17, 17, 17, 0.08);
  background: linear-gradient(180deg, #fcfbf9 0%, #f8f5ef 100%);
  display: grid;
  gap: 0.95rem;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.7);

  @media (min-width: 900px) {
    grid-template-columns: 1.2fr 0.8fr;
    align-items: center;
    padding: 1.5rem 1.6rem;
  }
`;

const TrustText = styled.p`
  margin: 0;
  color: rgba(17, 17, 17, 0.72);
  line-height: 1.8;
`;

const TrustCTA = styled(Link)`
  justify-self: start;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.92rem 1.5rem;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.primary};
  color: #0b0c0f;
  font-weight: 850;
  text-decoration: none;
  transition: opacity 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease;
  box-shadow: 0 14px 34px rgba(196, 151, 98, 0.22);

  @media (min-width: 900px) {
    justify-self: end;
  }

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      opacity: 0.94;
      transform: translateY(-1px);
      box-shadow: 0 20px 40px rgba(196, 151, 98, 0.28);
    }
  }
`;

const FaqWrap = styled.div`
  margin-top: 2rem;
`;

const CTASection = styled.section`
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 2rem 6rem;

  @media (max-width: 768px) {
    padding: 0 1.5rem 5rem;
  }
`;

const CTABox = styled.div`
  position: relative;
  overflow: hidden;
  background: radial-gradient(
      circle at top right,
      rgba(196, 151, 98, 0.18),
      transparent 30%
    ),
    #0b0c0f;
  color: #fff;
  border-radius: 32px;
  padding: 2.2rem;
  display: flex;
  gap: 1.3rem;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  box-shadow: 0 32px 80px rgba(15, 23, 42, 0.18);

  h2 {
    margin: 0 0 0.65rem;
    font-size: clamp(1.75rem, 3vw, 2.2rem);
    line-height: 1.08;
    letter-spacing: -0.03em;
  }

  p {
    margin: 0;
    color: rgba(255, 255, 255, 0.8);
    line-height: 1.8;
    max-width: 720px;
  }

  @media (max-width: 768px) {
    padding: 1.6rem;
    border-radius: 24px;
  }
`;

const CTAButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 1.65rem;
  border-radius: 999px;
  text-decoration: none;
  font-weight: 850;
  background: ${({ theme }) => theme.colors.primary};
  color: #111;
  white-space: nowrap;
  transition: transform 0.25s ease, opacity 0.25s ease, box-shadow 0.25s ease;
  box-shadow: 0 14px 34px rgba(196, 151, 98, 0.22);

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      transform: translateY(-1px);
      opacity: 0.94;
      box-shadow: 0 22px 44px rgba(196, 151, 98, 0.28);
    }
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
      "Los importes mostrados son precios base desde los que partir. Algunas piezas especiales, medidas grandes o tejidos delicados pueden requerir una valoración previa.",
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

export default function Limpieza2({ onOpenAsesoramiento }) {
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

  const serviceJsonLd = {
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
  };

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
      "@id": `${canonical}#service`,
    },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: ogImage,
    },
  };

  const jsonLd = [serviceJsonLd, webPageJsonLd];

  return (
    <Page>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="robots" content="index,follow" />
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

      <Section>
        <IntroGrid>
          <IntroText>
            <SectionTop>
              <Kicker>Servicio profesional</Kicker>
              <SectionTitle>
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
                src={curtain_1280}
                srcSet={getSrcSet(
                  curtain_480,
                  curtain_768,
                  curtain_1280,
                  curtain_1920
                )}
                sizes={introImageSizes}
                alt="Detalle de una cortina limpia y reinstalada con acabado impecable"
                loading="lazy"
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

      <SoftSection>
        <SoftSectionInner>
          <SectionTop>
            <Kicker>Por qué elegir este servicio</Kicker>
            <SectionTitle>
              Cuidamos la limpieza sin perder la <span>estética</span>
            </SectionTitle>
            <SectionLead>
              El objetivo no es solo limpiar, sino conservar la caída, la
              textura y la imagen del conjunto decorativo para que el espacio
              siga viéndose cuidado y coherente.
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
                Un servicio pensado para prolongar la buena presencia del textil
                y ayudar a mantener el espacio siempre impecable.
              </p>
            </BenefitCard>
          </BenefitsGrid>
        </SoftSectionInner>
      </SoftSection>

      <Section id="precios-limpieza">
        <SectionTop>
          <Kicker>Tarifas</Kicker>
          <SectionTitle>Precios base orientativos</SectionTitle>
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

      <Banner>
        <BannerInner>
          <BannerImage
            src={curtain_1280}
            srcSet={getSrcSet(
              curtain_480,
              curtain_768,
              curtain_1280,
              curtain_1920
            )}
            sizes={bannerSizes}
            alt="Profesional reinstalando una cortina en el domicilio del cliente"
            loading="lazy"
            decoding="async"
          />
          <BannerOverlay />
          <BannerContent>
            <h2>
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

      <Section>
        <SectionTop>
          <Kicker>Proceso</Kicker>
          <SectionTitle>Cómo funciona</SectionTitle>
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

      <SoftSection>
        <SoftSectionInner>
          <SectionTop>
            <Kicker>Preguntas frecuentes</Kicker>
            <SectionTitle>Resolvemos las dudas más habituales</SectionTitle>
            <SectionLead>
              Esta sección ayuda a transmitir confianza, aclarar condiciones del
              servicio y mejorar la experiencia antes de contactar.
            </SectionLead>
          </SectionTop>

          <FaqWrap>
            <FaqAccordion
              items={faqItems}
              withSchema
              canonicalUrl={canonical}
              defaultOpenIndex={-1}
              ariaLabel="Preguntas frecuentes sobre limpieza de cortinas y textiles"
            />
          </FaqWrap>
        </SoftSectionInner>
      </SoftSection>

      <CTASection>
        <CTABox>
          <div>
            <h2>¿Quieres saber qué opción encaja mejor con tus cortinas?</h2>
            <p>
              Te orientamos según el tipo de pieza, el tejido y si necesitas
              solo limpieza o un servicio completo con desmontaje y colocación
              de nuevo.
            </p>
          </div>

          <CTAButton
            to="/contact"
            onClick={(e) => {
              e.preventDefault();

              trackEvent("open_quick_enquiry", {
                source: "limpieza_bottom_cta",
                pack: "Limpieza",
              });

              onOpenAsesoramiento?.("Limpieza", "limpieza_bottom_cta");
            }}
          >
            Solicitar asesoramiento
          </CTAButton>
        </CTABox>
      </CTASection>

      <StickyCtaButton message="Hola, me interesa el servicio de limpieza y mantenimiento de cortinas. ¿Podéis orientarme sobre la opción más adecuada y si necesitáis valorar la pieza antes de dar precio?" />
    </Page>
  );
}
