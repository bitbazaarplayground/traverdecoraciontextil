import { useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import styled from "styled-components";
import FaqAccordion from "../components/faq/FaqAccordion";
import { CONTACT } from "../config/contact";
// Images
import welcome1200 from "../assets/Automatizacion/ctaAuto-1200.webp";
import welcome400 from "../assets/Automatizacion/ctaAuto-400.webp";
import welcome600 from "../assets/Automatizacion/ctaAuto-600.webp";
import welcome800 from "../assets/Automatizacion/ctaAuto-800.webp";

const responsiveImages = {
  welcome: {
    400: welcome400,
    600: welcome600,
    800: welcome800,
    1200: welcome1200,
  },
};

const getSrcSet = (images) =>
  `${images[400]} 400w, ${images[600]} 600w, ${images[800]} 800w, ${images[1200]} 1200w`;

export default function Nosotros() {
  const baseUrl = (
    import.meta.env.VITE_SITE_URL || window.location.origin
  ).replace(/\/$/, "");

  const canonical = `${baseUrl}/nosotros`;
  const siteName = CONTACT.siteName || "Traver Decoración Textil";

  const title =
    "Nosotros | Traver Decoración Textil, tradición y detalle desde 1989";
  const description =
    "Conoce Traver Decoración Textil, empresa fundada en 1989 especializada en toldos, cortinas, tapizados, papeles pintados y decoración textil en Castellón. Soluciones a medida para viviendas y espacios profesionales.";
  const ogImage = `${baseUrl}/og.png`;
  const ogImageAlt =
    "Traver Decoración Textil, tradición, detalle y diseño desde 1989";

  const faqItems = [
    {
      q: "¿Qué tipo de proyectos realizamos?",
      a: "Trabajamos tanto para clientes particulares como para espacios profesionales. Hemos participado en proyectos para viviendas, colegios, alojamientos turísticos, Airbnb, hoteles y otros entornos que buscan soluciones textiles, funcionalidad y una estética cuidada.",
      aText:
        "Trabajamos tanto para clientes particulares como para espacios profesionales. Hemos participado en proyectos para viviendas, colegios, alojamientos turísticos, Airbnb, hoteles y otros entornos que buscan soluciones textiles, funcionalidad y una estética cuidada.",
    },
    {
      q: "¿En qué estamos especializados?",
      a: "Estamos especializados en toldos, cortinas, tapizados, papeles pintados y soluciones de decoración textil e interiorismo, siempre adaptándonos a las necesidades de cada espacio. Buscamos equilibrio entre diseño, confort, durabilidad y una instalación profesional.",
      aText:
        "Estamos especializados en toldos, cortinas, tapizados, papeles pintados y soluciones de decoración textil e interiorismo, siempre adaptándonos a las necesidades de cada espacio. Buscamos equilibrio entre diseño, confort, durabilidad y una instalación profesional.",
    },
    {
      q: "¿Trabajamos proyectos a medida?",
      a: "Sí. Cada proyecto se estudia de forma personalizada para ofrecer una propuesta adaptada al estilo, al uso del espacio y a las necesidades reales del cliente.",
      aText:
        "Sí. Cada proyecto se estudia de forma personalizada para ofrecer una propuesta adaptada al estilo, al uso del espacio y a las necesidades reales del cliente.",
    },
    {
      q: "¿Qué nos diferencia?",
      a: "La experiencia de una empresa fundada en 1989, la atención cercana, el cuidado por el detalle y la combinación de funcionalidad con una estética elegante y duradera.",
      aText:
        "La experiencia de una empresa fundada en 1989, la atención cercana, el cuidado por el detalle y la combinación de funcionalidad con una estética elegante y duradera.",
    },
    {
      q: "¿Dónde estamos y en qué zonas trabajamos?",
      a: "Estamos en Almassora, Castellón, y trabajamos principalmente en Castellón y alrededores, además de proyectos seleccionados según alcance.",
      aText:
        "Estamos en Almassora, Castellón, y trabajamos principalmente en Castellón y alrededores, además de proyectos seleccionados según alcance.",
    },
  ];

  const aboutPageJsonLd = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "@id": `${canonical}#aboutpage`,
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
        "@id": `${baseUrl}/#business`,
      },
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: ogImage,
      },
    }),
    [baseUrl, canonical, description, ogImage, siteName, title]
  );

  const organizationJsonLd = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "HomeAndConstructionBusiness",
      "@id": `${baseUrl}/#business`,
      name: siteName,
      url: `${baseUrl}/`,
      logo: `${baseUrl}/favicon.png`,
      image: ogImage,
      foundingDate: "1989",
      telephone: CONTACT.phoneLandline,
      email: CONTACT.email,
      address: {
        "@type": "PostalAddress",
        ...CONTACT.address,
      },
      description,
      areaServed: {
        "@type": "Place",
        name: "Castellón",
      },
      knowsAbout: [
        "Toldos",
        "Cortinas",
        "Tapizados",
        "Papeles pintados",
        "Decoración textil",
        "Interiorismo",
        "Instalación profesional",
      ],
    }),
    [baseUrl, description, ogImage, siteName]
  );

  const breadcrumbJsonLd = useMemo(
    () => ({
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
          name: "Nosotros",
          item: canonical,
        },
      ],
    }),
    [baseUrl, canonical]
  );

  const jsonLd = useMemo(
    () => [aboutPageJsonLd, organizationJsonLd, breadcrumbJsonLd],
    [aboutPageJsonLd, organizationJsonLd, breadcrumbJsonLd]
  );

  return (
    <>
      <Helmet>
        <html lang="es" />
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
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />
        <meta name="twitter:image:alt" content={ogImageAlt} />

        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <Page>
        <HeroSection>
          <HeroMedia aria-hidden="true">
            <picture>
              <source
                media="(max-width: 400px)"
                srcSet="/nosotros/nosotros-400.webp"
              />
              <source
                media="(max-width: 480px)"
                srcSet="/nosotros/nosotros-480.webp"
              />
              <source
                media="(max-width: 768px)"
                srcSet="/nosotros/nosotros-768.webp"
              />
              <source
                media="(max-width: 1280px)"
                srcSet="/nosotros/nosotros-1280.webp"
              />
              <HeroImage
                src="/nosotros/nosotros-1920.webp"
                alt=""
                width="1920"
                height="1080"
                loading="eager"
                decoding="async"
                fetchPriority="high"
              />
            </picture>
          </HeroMedia>

          <HeroOverlay />
          <HeroContent>
            <Eyebrow>Desde 1989</Eyebrow>
            <HeroTitle>
              <span>Tradición,</span> detalle y diseño para vestir cada espacio
            </HeroTitle>
            <HeroText>
              En Traver Decoración Textil llevamos más de tres décadas creando
              soluciones a medida en toldos, cortinas, tapizados, papeles
              pintados y decoración textil para hogares y espacios
              profesionales.
            </HeroText>
          </HeroContent>
        </HeroSection>

        <ContentShell id="nosotros-contenido">
          <IntroGrid>
            <IntroCard>
              <SectionLabel>Nuestra esencia</SectionLabel>
              <SectionTitle>
                Una empresa con experiencia y mirada actual
              </SectionTitle>
              <Paragraph>
                Fundada en 1989, nuestra empresa ha crecido manteniendo una
                misma filosofía: ofrecer un trato cercano, soluciones bien
                pensadas y un resultado final que combine calidad, utilidad y
                belleza.
              </Paragraph>
              <Paragraph>
                A lo largo de los años hemos trabajado en proyectos muy
                diversos, adaptándonos a cada entorno con el mismo compromiso
                por el detalle, la funcionalidad y la excelencia en la
                instalación.
              </Paragraph>
            </IntroCard>

            <StatsCard>
              <StatItem>
                <StatNumber>1989</StatNumber>
                <StatLabel>Año de fundación</StatLabel>
              </StatItem>
              <StatItem>
                <StatNumber>+35</StatNumber>
                <StatLabel>Años de experiencia</StatLabel>
              </StatItem>
              <StatItem>
                <StatNumber>100%</StatNumber>
                <StatLabel>Atención personalizada</StatLabel>
              </StatItem>
            </StatsCard>
          </IntroGrid>

          <Section>
            <SectionLabel>Qué hacemos</SectionLabel>
            <SectionTitle>
              <span>Soluciones</span> textiles e interiorismo con identidad
              propia
            </SectionTitle>

            <Paragraph>
              Trabajamos con especial dedicación en la venta e instalación de{" "}
              <strong>
                toldos, cortinas, tapizados, papeles pintados y soluciones de
                decoración textil e interiorismo
              </strong>
              , cuidando tanto el rendimiento del producto como su integración
              visual en el espacio.
            </Paragraph>

            <ServicesGrid>
              <ServiceCard>
                <ServiceTitle>Toldos</ServiceTitle>
                <ServiceText>
                  Soluciones que aportan confort, protección solar y una imagen
                  exterior elegante y funcional.
                </ServiceText>
              </ServiceCard>

              <ServiceCard>
                <ServiceTitle>Cortinas</ServiceTitle>
                <ServiceText>
                  Propuestas pensadas para vestir cada estancia con equilibrio
                  entre privacidad, luz y estilo.
                </ServiceText>
              </ServiceCard>

              <ServiceCard>
                <ServiceTitle>Tapizados</ServiceTitle>
                <ServiceText>
                  Acabados textiles que aportan confort, personalidad y una
                  presencia elegante tanto en entornos residenciales como
                  profesionales.
                </ServiceText>
              </ServiceCard>

              <ServiceCard>
                <ServiceTitle>Papeles pintados</ServiceTitle>
                <ServiceText>
                  Recursos decorativos para transformar paredes y dar carácter
                  al espacio con estilo, textura y armonía visual.
                </ServiceText>
              </ServiceCard>

              <ServiceCard>
                <ServiceTitle>Decoración textil</ServiceTitle>
                <ServiceText>
                  Detalles y acabados que elevan la personalidad del espacio y
                  aportan calidez visual.
                </ServiceText>
              </ServiceCard>

              <ServiceCard>
                <ServiceTitle>Instalación profesional</ServiceTitle>
                <ServiceText>
                  Un servicio realizado con precisión y cuidado para garantizar
                  un resultado duradero y bien resuelto.
                </ServiceText>
              </ServiceCard>
            </ServicesGrid>
          </Section>

          <Section>
            <SectionLabel>Dónde trabajamos</SectionLabel>
            <SectionTitle>
              Proyectos para viviendas y espacios profesionales
            </SectionTitle>

            <Paragraph>
              Nuestra trayectoria incluye trabajos en{" "}
              <strong>
                hogares, colegios, alojamientos turísticos, Airbnb, hoteles
              </strong>{" "}
              y otros espacios que necesitan soluciones textiles con
              personalidad, resistencia y una presentación impecable.
            </Paragraph>

            <Paragraph>
              Cada proyecto se aborda de forma individual, entendiendo las
              necesidades del cliente, el uso del espacio y el estilo que se
              quiere transmitir.
            </Paragraph>
          </Section>

          <HighlightBox>
            <HighlightLabel>Por qué elegirnos</HighlightLabel>
            <HighlightTitle>
              Experiencia que se nota en cada <span>detalle</span>
            </HighlightTitle>

            <HighlightList>
              <li>Más de tres décadas de experiencia en el sector</li>
              <li>Atención cercana y asesoramiento personalizado</li>
              <li>Soluciones a medida para cada espacio</li>
              <li>Equilibrio entre estética, confort y funcionalidad</li>
              <li>Instalación profesional y acabados cuidados</li>
            </HighlightList>
          </HighlightBox>

          <Section id="faq">
            <SectionLabel>Preguntas frecuentes</SectionLabel>
            <SectionTitle>Lo que suelen preguntarnos</SectionTitle>
            <FaqAccordion
              items={faqItems}
              withSchema={true}
              canonicalUrl={canonical}
              ariaLabel="Preguntas frecuentes sobre nosotros"
            />
          </Section>

          <CtaSection>
            <CtaMedia aria-hidden="true">
              <CtaImage
                src={welcome800}
                srcSet={getSrcSet(responsiveImages.welcome)}
                sizes="(max-width: 768px) 100vw, 1120px"
                alt=""
                loading="lazy"
                decoding="async"
              />
            </CtaMedia>

            <CtaOverlay />

            <CtaInner>
              <CtaLabel>Estamos aquí para ayudarte</CtaLabel>
              <CtaTitle>
                Cuéntanos tu proyecto y te ayudamos a darle forma
              </CtaTitle>
              <CtaText>
                Si buscas una solución cuidada para tu hogar o tu espacio
                profesional, estaremos encantados de asesorarte con cercanía,
                experiencia y atención al detalle.
              </CtaText>

              <CtaActions>
                <PrimaryCta to="/contact">Contactar</PrimaryCta>
                <SecondaryCta to="/services">Ver servicios</SecondaryCta>
              </CtaActions>
            </CtaInner>
          </CtaSection>
        </ContentShell>
      </Page>
    </>
  );
}

const Page = styled.main`
  background: radial-gradient(
      circle at top,
      rgba(196, 151, 98, 0.08),
      transparent 26%
    ),
    linear-gradient(180deg, #f8f5ef 0%, #fcfbf8 35%, #f7f3ec 100%);
  color: #0f172a;
`;
const HeroSection = styled.section`
  position: relative;
  min-height: 45vh;
  display: grid;
  align-items: end;
  padding: clamp(5rem, 8vw, 7rem) 1.25rem 3.5rem;
  overflow: hidden;
  isolation: isolate;

  @media (max-width: 768px) {
    min-height: 62vh;
    padding: 4.5rem 1rem 2.5rem;
  }
`;

const HeroMedia = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;

  picture {
    display: block;
    width: 100%;
    height: 100%;
  }
`;

const HeroImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
  transform: scale(1.01);
`;

const HeroOverlay = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
  background: linear-gradient(
      135deg,
      rgba(15, 23, 42, 0.82),
      rgba(15, 23, 42, 0.48)
    ),
    linear-gradient(to top, rgba(15, 23, 42, 0.58), rgba(15, 23, 42, 0.08)),
    linear-gradient(to right, rgba(0, 0, 0, 0.18), transparent 55%);
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  width: min(100%, 980px);
  margin: 0 auto;

  @media (max-width: 768px) {
    width: min(100%, 680px);
  }
`;

const Eyebrow = styled.p`
  margin: 0 0 0.8rem;
  color: rgba(255, 244, 230, 0.9);
  letter-spacing: 0.24em;
  text-transform: uppercase;
  font-size: 0.78rem;
  font-weight: 700;
`;

const HeroTitle = styled.h1`
  margin: 0;
  max-width: 12ch;
  color: #fffdf9;
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(2.35rem, 6vw, 5rem);
  line-height: 0.98;
  font-weight: 700;

  span {
    color: ${({ theme }) => theme.colors.primary};
  }

  @media (max-width: 768px) {
    max-width: 13ch;
    line-height: 1.02;
  }
`;

const HeroText = styled.p`
  margin: 1.35rem 0 0;
  max-width: 720px;
  color: rgba(255, 248, 240, 0.88);
  font-size: clamp(1rem, 1.3vw, 1.1rem);
  line-height: 1.9;

  @media (max-width: 768px) {
    max-width: 38rem;
    line-height: 1.8;
  }
`;
const ContentShell = styled.div`
  width: min(1120px, calc(100% - 2rem));
  margin: 0 auto;
  padding: 3.5rem 0 5rem;
`;

const IntroGrid = styled.section`
  display: grid;
  grid-template-columns: 1.5fr 0.9fr;
  gap: 1.25rem;
  margin-bottom: 1.5rem;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const IntroCard = styled.div`
  background: rgba(255, 255, 255, 0.78);
  border: 1px solid rgba(196, 151, 98, 0.18);
  border-radius: 28px;
  box-shadow: 0 24px 80px rgba(15, 23, 42, 0.08);
  padding: clamp(1.4rem, 3vw, 2rem);
  backdrop-filter: blur(8px);
`;

const StatsCard = styled.div`
  background: linear-gradient(
    180deg,
    rgba(15, 23, 42, 0.96),
    rgba(15, 23, 42, 0.9)
  );
  border-radius: 28px;
  padding: clamp(1.4rem, 3vw, 2rem);
  box-shadow: 0 26px 90px rgba(15, 23, 42, 0.18);
  display: grid;
  gap: 1rem;
`;

const StatItem = styled.div`
  padding: 0.85rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);

  &:last-child {
    border-bottom: 0;
  }
`;

const StatNumber = styled.div`
  color: #f3d2a2;
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(2rem, 4vw, 2.6rem);
  font-weight: 700;
`;

const StatLabel = styled.div`
  color: rgba(255, 248, 240, 0.78);
  font-size: 0.98rem;
  line-height: 1.6;
`;

const Section = styled.section`
  margin-top: 1.25rem;
  background: rgba(255, 255, 255, 0.72);
  border: 1px solid rgba(196, 151, 98, 0.14);
  border-radius: 28px;
  box-shadow: 0 20px 70px rgba(15, 23, 42, 0.06);
  padding: clamp(1.4rem, 3vw, 2rem);
`;

const SectionLabel = styled.p`
  margin: 0 0 0.55rem;
  color: #b1844f;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  font-size: 0.76rem;
  font-weight: 800;
`;

const SectionTitle = styled.h2`
  margin: 0 0 1rem;
  color: rgba(15, 23, 42, 0.96);
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(1.7rem, 3vw, 2.4rem);
  line-height: 1.1;
  font-weight: 700;

  span {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Paragraph = styled.p`
  margin: 0 0 1rem;
  color: rgba(15, 23, 42, 0.72);
  line-height: 1.9;
  font-size: 1rem;

  strong {
    color: rgba(15, 23, 42, 0.95);
    font-weight: 800;
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
  margin-top: 1.2rem;

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`;

const ServiceCard = styled.div`
  border-radius: 22px;
  padding: 1.15rem;
  background: rgba(248, 245, 239, 0.9);
  border: 1px solid rgba(15, 23, 42, 0.08);
`;

const ServiceTitle = styled.h3`
  margin: 0 0 0.45rem;
  color: rgba(15, 23, 42, 0.95);
  font-size: 1.04rem;
  font-weight: 800;
`;

const ServiceText = styled.p`
  margin: 0;
  color: rgba(15, 23, 42, 0.7);
  line-height: 1.8;
  font-size: 0.97rem;
`;

const AreasList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.7rem;
  margin-top: 1.2rem;
`;

const AreaPill = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 42px;
  padding: 0.7rem 1rem;
  border-radius: 999px;
  background: rgba(15, 23, 42, 0.05);
  border: 1px solid rgba(15, 23, 42, 0.08);
  color: rgba(15, 23, 42, 0.82);
  font-weight: 700;
  font-size: 0.95rem;
`;

const HighlightBox = styled.section`
  margin-top: 1.25rem;
  border-radius: 28px;
  padding: clamp(1.5rem, 3vw, 2.2rem);
  background: linear-gradient(
      135deg,
      rgba(196, 151, 98, 0.14),
      rgba(255, 255, 255, 0.84)
    ),
    rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(196, 151, 98, 0.2);
  box-shadow: 0 24px 80px rgba(15, 23, 42, 0.07);
`;

const HighlightLabel = styled.p`
  margin: 0 0 0.45rem;
  color: #b1844f;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  font-size: 0.76rem;
  font-weight: 800;
`;

const HighlightTitle = styled.h2`
  margin: 0 0 1rem;
  color: rgba(15, 23, 42, 0.96);
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(1.8rem, 3vw, 2.5rem);
  line-height: 1.1;

  span {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const HighlightList = styled.ul`
  margin: 0;
  padding-left: 1.2rem;
  color: rgba(15, 23, 42, 0.76);
  line-height: 1.95;

  li::marker {
    color: #b1844f;
  }
`;

// CTA

const CtaSection = styled.section`
  position: relative;
  margin-top: 1.25rem;
  border-radius: 28px;
  overflow: hidden;
  box-shadow: 0 26px 90px rgba(15, 23, 42, 0.16);
  text-align: center;
  isolation: isolate;
  min-height: 360px;
  display: grid;
  place-items: center;
  min-height: 300px;

  @media (max-width: 768px) {
    min-height: 260px;
  }
`;

const CtaMedia = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
`;

const CtaImage = styled.img`
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  object-position: center;
  transform: scale(1.01);

  @media (max-width: 768px) {
    transform: scale(1.14) translateY(42px);
  }

  @media (max-width: 480px) {
    transform: scale(1.18) translateY(48px);
  }
`;

const CtaOverlay = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
  background: linear-gradient(
      135deg,
      rgba(15, 23, 42, 0.82),
      rgba(15, 23, 42, 0.58)
    ),
    linear-gradient(to top, rgba(15, 23, 42, 0.62), rgba(15, 23, 42, 0.12));
`;

const CtaInner = styled.div`
  position: relative;
  z-index: 2;
  width: min(100%, 900px);
  padding: clamp(1.8rem, 4vw, 2.6rem);
`;

const CtaLabel = styled.p`
  position: absolute;
  top: 0.4rem;
  left: 0.4rem;

  margin: 0;
  color: rgba(243, 210, 162, 0.92);
  letter-spacing: 0.12em;
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: uppercase;

  @media (max-width: 768px) {
    top: 1rem;
    left: 1.1rem;
  }
`;

const CtaTitle = styled.h2`
  margin: 0;
  color: #fffdf9;
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(1.7rem, 2.6vw, 2.3rem);
  line-height: 1.08;
`;

const CtaText = styled.p`
  margin: 0.8rem auto 0;
  max-width: 680px;
  color: rgba(255, 248, 240, 0.84);
  line-height: 1.75;
  font-size: 0.98rem;
`;

const CtaActions = styled.div`
  margin-top: 1.2rem;
  display: flex;
  justify-content: center;
  gap: 0.9rem;
  flex-wrap: wrap;
`;

const PrimaryCta = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  padding: 0.95rem 1.6rem;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.primary};
  color: #0b0c0f;
  font-weight: 850;
  text-decoration: none;
  transition: transform 0.25s ease, opacity 0.25s ease;

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      opacity: 0.94;
      transform: translateY(-1px);
    }
  }
`;

const SecondaryCta = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  padding: 0.95rem 1.6rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.07);
  border: 1px solid rgba(255, 255, 255, 0.14);
  color: rgba(255, 255, 255, 0.92);
  font-weight: 700;
  text-decoration: none;
  transition: transform 0.25s ease, background 0.25s ease;

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      background: rgba(255, 255, 255, 0.1);
      transform: translateY(-1px);
    }
  }
`;
