import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { CONTACT } from "../../config/contact";

/* IMAGES */
import bano1 from "../../assets/venecianas/bano1.png";
import cocina1 from "../../assets/venecianas/cocina1.png";
import oficina1 from "../../assets/venecianas/oficina1.png";
import oficina2 from "../../assets/venecianas/oficina2.png";
import venecianaMaderaOficina from "../../assets/venecianas/venecianaMaderaOficina.png";

/* =========================
   PAGE
========================= */

const Page = styled.main`
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

/* =========================
   HERO
========================= */

const Hero = styled.section`
  padding: clamp(4rem, 7vw, 6.5rem) 1.5rem 2.6rem;
  text-align: center;
`;

const HeroInner = styled.div`
  max-width: 980px;
  margin: 0 auto;
`;

const Eyebrow = styled.p`
  margin: 0 0 1rem;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  font-size: 0.75rem;
  color: rgba(0, 0, 0, 0.55);
`;

const Title = styled.h1`
  margin: 0;
  font-family: "Cormorant Garamond", ui-serif, Georgia, serif;
  font-weight: 300;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  font-size: clamp(2.2rem, 5vw, 4.4rem);
  line-height: 1.05;
`;

const Intro = styled.p`
  margin: 1.2rem auto 0;
  max-width: 78ch;
  font-size: 1.05rem;
  line-height: 1.75;
  color: rgba(0, 0, 0, 0.65);
`;

/* =========================
   FEATURE STRIP
========================= */

const Features = styled.section`
  padding: 0 1.5rem 3.2rem;
`;

const FeaturesInner = styled.div`
  max-width: 1120px;
  margin: 0 auto;
`;

const FeatureGrid = styled.div`
  display: grid;
  gap: 1rem;

  @media (min-width: 820px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1.1rem;
  }
`;

const FeatureCard = styled.div`
  border-radius: 22px;
  padding: 1.25rem 1.25rem;

  background: rgba(255, 255, 255, 0.6);
  box-shadow: 0 24px 70px rgba(0, 0, 0, 0.07);
`;

const FeatureTitle = styled.h3`
  margin: 0 0 0.45rem;
  font-size: 0.85rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  font-weight: 800;
  color: rgba(0, 0, 0, 0.78);
`;

const FeatureText = styled.p`
  margin: 0;
  font-size: 1rem;
  line-height: 1.65;
  color: rgba(0, 0, 0, 0.63);
`;

/* =========================
   GALLERY
========================= */

const Section = styled.section`
  padding: 0 1.5rem 5.5rem;
`;

const SectionInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Gallery = styled.div`
  display: grid;
  gap: 1.2rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (min-width: 1100px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

const ImageCard = styled.figure`
  position: relative;
  border-radius: 22px;
  overflow: hidden;
  background: #eae9e6;
  margin: 0;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  aspect-ratio: 4 / 3;
  transition: transform 0.6s ease;

  ${ImageCard}:hover & {
    transform: scale(1.04);
  }
`;

const Label = styled.figcaption`
  position: absolute;
  left: 14px;
  bottom: 14px;

  padding: 0.45rem 0.75rem;
  border-radius: 999px;

  background: rgba(255, 255, 255, 0.88);
  font-size: 0.75rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(0, 0, 0, 0.7);
`;

/* =========================
   VALUE BLOCK + CTA
========================= */

const ValueSection = styled.section`
  padding: 0 1.5rem 5.8rem;
`;

const ValueCard = styled.div`
  max-width: 980px;
  margin: 0 auto;
  border-radius: 26px;
  background: rgba(255, 255, 255, 0.6);
  padding: 2.5rem 2.3rem;
  box-shadow: 0 32px 90px rgba(0, 0, 0, 0.08);
  text-align: center;
`;

const ValueTitle = styled.h2`
  margin: 0 0 1rem;
  font-family: "Cormorant Garamond", ui-serif, Georgia, serif;
  font-weight: 300;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  font-size: 2.2rem;
`;

const ValueText = styled.p`
  margin: 0 auto;
  max-width: 78ch;
  font-size: 1.05rem;
  line-height: 1.75;
  color: rgba(0, 0, 0, 0.65);
`;

const CTA = styled(Link)`
  display: inline-flex;
  margin-top: 2rem;
  padding: 0.95rem 2.1rem;
  border-radius: 999px;
  background: #111;
  color: #fff;
  text-decoration: none;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-size: 0.75rem;
  transition: transform 0.25s ease, opacity 0.25s ease;

  &:hover {
    transform: translateY(-1px);
    opacity: 0.92;
  }
`;

/* =========================
   COMPONENT
========================= */

export default function Venecianas() {
  const baseUrl = (
    import.meta.env.VITE_SITE_URL || window.location.origin
  ).replace(/\/$/, "");

  const canonical = `${baseUrl}/venecianas`;
  const siteName = CONTACT.siteName;

  const title =
    "Venecianas a medida | Traver Decoración Textil (Castellón y Valencia)";
  const description =
    "Venecianas a medida en Almassora: controla la luz con precisión y gana privacidad sin perder claridad. Opciones en aluminio y madera, medición e instalación profesional en Castellón y Valencia.";

  const ogImage = `${baseUrl}/og.png`;
  const ogImageAlt = "Venecianas a medida — Traver Decoración Textil";

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
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: `${baseUrl}/` },
      {
        "@type": "ListItem",
        position: 2,
        name: "Servicios",
        item: `${baseUrl}/services`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Venecianas",
        item: canonical,
      },
    ],
  };

  const jsonLd = [webPageJsonLd, breadcrumbJsonLd];

  const images = [
    {
      src: venecianaMaderaOficina,
      alt: "Veneciana de madera en oficina",
      label: "Oficina",
    },
    { src: oficina1, alt: "Venecianas en despacho moderno", label: "Despacho" },
    { src: oficina2, alt: "Venecianas en sala de trabajo", label: "Despacho" },
    { src: cocina1, alt: "Venecianas en cocina luminosa", label: "Cocina" },
    {
      src: bano1,
      alt: "Venecianas en baño (material resistente y fácil de limpiar)",
      label: "Baño",
    },
  ];

  return (
    <Page>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
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
        <HeroInner>
          <Eyebrow>Interior · Control de luz</Eyebrow>
          <Title>Venecianas</Title>
          <Intro>
            Las venecianas son una solución precisa y elegante: regulas la luz
            con un gesto, ajustas la privacidad sin perder claridad y mantienes
            una estética limpia en cualquier estancia. Ideales para oficinas,
            cocinas y baños por su facilidad de uso y mantenimiento.
          </Intro>
        </HeroInner>
      </Hero>

      {/* FEATURES */}
      <Features>
        <FeaturesInner>
          <FeatureGrid>
            <FeatureCard>
              <FeatureTitle>Control milimétrico</FeatureTitle>
              <FeatureText>
                Orienta las lamas para filtrar luz, evitar reflejos y ganar
                confort visual sin oscurecer el espacio.
              </FeatureText>
            </FeatureCard>

            <FeatureCard>
              <FeatureTitle>Materiales con criterio</FeatureTitle>
              <FeatureText>
                Aluminio para zonas húmedas y uso intensivo; madera para un
                acabado cálido y más decorativo.
              </FeatureText>
            </FeatureCard>

            <FeatureCard>
              <FeatureTitle>Acabado premium</FeatureTitle>
              <FeatureText>
                Medición precisa, instalación limpia y selección de color para
                que la veneciana se integre con el mobiliario.
              </FeatureText>
            </FeatureCard>
          </FeatureGrid>
        </FeaturesInner>
      </Features>

      {/* GALLERY */}
      <Section>
        <SectionInner>
          <Gallery>
            {images.map((img) => (
              <ImageCard key={img.alt}>
                <Img src={img.src} alt={img.alt} loading="lazy" />
                <Label>{img.label}</Label>
              </ImageCard>
            ))}
          </Gallery>
        </SectionInner>
      </Section>

      {/* VALUE */}
      <ValueSection>
        <ValueCard>
          <ValueTitle>Lo importante es la proporción</ValueTitle>
          <ValueText>
            No se trata solo de poner una veneciana. Se trata de elegir el ancho
            de lama, el tono y el tipo de accionamiento para que el resultado
            sea equilibrado y cómodo en el día a día. Si quieres, te preparamos
            una propuesta con opciones (aluminio o madera) y una recomendación
            clara según tu espacio.
          </ValueText>

          <CTA to="/contact">Solicitar propuesta</CTA>
        </ValueCard>
      </ValueSection>
    </Page>
  );
}
