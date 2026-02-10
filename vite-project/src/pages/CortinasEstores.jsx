import { Helmet } from "react-helmet-async";
import Slider from "react-slick";
import styled from "styled-components";
import { CONTACT } from "../config/contact";

// Assets
import heroImg from "../assets/CortinasEstores/carousel/cortinas1.jpeg";
import zebraBg from "../assets/zebra_pattern.webp";

import cortina2 from "../assets/CortinasEstores/carousel/cortinas2.jpeg";
import cortina3 from "../assets/CortinasEstores/carousel/cortinas3.jpeg";
import cortina4 from "../assets/CortinasEstores/carousel/cortinas4.jpeg";
import cortina5 from "../assets/CortinasEstores/carousel/cortinas5.jpeg";
import cortina6 from "../assets/CortinasEstores/carousel/cortinas6.webp";

// Inspiracion
import blackoutImg from "../assets/CortinasEstores/inspiracion/blackout.jpeg";
import chenilleImg from "../assets/CortinasEstores/inspiracion/chenille.jpeg";
import linenImg from "../assets/CortinasEstores/inspiracion/linen.jpeg";
import patternedImg from "../assets/CortinasEstores/inspiracion/patterned.jpeg";
import sheerImg from "../assets/CortinasEstores/inspiracion/sheer.jpg";
import velvetImg from "../assets/CortinasEstores/inspiracion/velvet.jpeg";

// Slick styles
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

import EnfoqueSlider from "../components/EnfoqueSlider";
import ComplementosVentana from "../components/ventanas/ComplementosVentana";

/* =========================
   PAGE
========================= */

const Page = styled.main`
  width: 100%;
  background: #fff;
`;

/* =========================
   HERO
========================= */

const Hero = styled.section`
  position: relative;
  min-height: 45vh;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 3.5rem;
  padding: 5rem 2rem;
  text-align: center;
  color: white;

  background-image: url(${heroImg});
  background-size: cover;
  background-position: center;

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.35));
  }

  @media (max-width: 768px) {
    min-height: 70vh;
  }
`;

const HeroInner = styled.div`
  position: relative;
  z-index: 1;
  max-width: 820px;
`;

const HeroEyebrow = styled.p`
  font-size: 0.85rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  opacity: 0.85;
  margin-bottom: 1.2rem;
`;

const HeroTitle = styled.h1`
  font-size: 3.4rem;
  font-weight: 600;
  line-height: 1.15;
  margin-bottom: 1.4rem;

  span {
    color: ${({ theme }) => theme.colors.primary};
  }

  @media (max-width: 768px) {
    font-size: 2.3rem;
  }
`;

const HeroText = styled.p`
  font-size: 1.15rem;
  line-height: 1.7;
  opacity: 0.9;
`;

/* =========================
   EDITORIAL SECTION
========================= */

const Editorial = styled.section`
  padding: 6rem 2rem;

  @media (max-width: 768px) {
    padding: 4rem 1.5rem;
  }
`;

const EditorialInner = styled.div`
  max-width: 900px;
  margin: 0 auto;
  text-align: center;
`;

const EditorialTitle = styled.h2`
  font-size: 2.3rem;
  font-weight: 600;
  color: #222;
  margin-bottom: 1.8rem;
`;

const EditorialText = styled.p`
  font-size: 1.1rem;
  line-height: 1.8;
  color: #555;
`;

/* =========================
   FEATURE STRIP
========================= */

const Features = styled.section`
  padding: 4.5rem 2rem;
  background: #fafafa;
`;

const FeaturesGrid = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3rem;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
`;

const Feature = styled.div`
  text-align: center;
`;

const FeatureTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 0.6rem;
  color: #222;
`;

const FeatureText = styled.p`
  font-size: 1rem;
  line-height: 1.65;
  color: #555;
`;

/* =========================
   CTA
========================= */

const CTA = styled.section`
  padding: 5.5rem 2rem;
  text-align: center;

  background: linear-gradient(
      rgba(255, 255, 255, 0.88),
      rgba(255, 255, 255, 0.88)
    ),
    url(${zebraBg});

  background-size: cover;
  background-position: center;
`;

const CTATitle = styled.h2`
  font-size: 2.2rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #121212;
`;

const CTAText = styled.p`
  max-width: 620px;
  margin: 0 auto;
  font-size: 1.05rem;
  line-height: 1.7;
  color: #555;
`;

const CTAButton = styled.a`
  display: inline-block;
  margin-top: 2.2rem;
  padding: 0.9rem 2.4rem;
  border-radius: 40px;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  font-weight: 600;
  text-decoration: none;

  &:hover {
    opacity: 0.85;
  }
`;

/* =========================
   CAROUSEL
========================= */

const CarouselSection = styled.section`
  padding: 4rem 2rem;
`;

const CarouselImage = styled.div`
  height: 420px;
  border-radius: 20px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (max-width: 768px) {
    height: 260px;
  }
`;

/* =========================
   FABRICS / HANDMADE SECTION
========================= */

const FabricsSection = styled.section`
  padding: 5.5rem 2rem;
  background: #fff;

  @media (max-width: 768px) {
    padding: 3.5rem 1.5rem;
  }
`;

const FabricsInner = styled.div`
  max-width: 1100px;
  margin: 0 auto;
`;

const FabricsHeader = styled.div`
  max-width: 720px;
  margin: 0 auto 4rem;
  text-align: center;
`;

const FabricsTitle = styled.h2`
  font-size: 2.2rem;
  font-weight: 600;
  color: #121212;
  margin-bottom: 1.2rem;

  span {
    color: ${({ theme }) => theme.colors.primary};
  }
  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const FabricsIntro = styled.p`
  font-size: 1.05rem;
  line-height: 1.7;
  color: #555;
`;

const FabricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2.5rem;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const FabricItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
`;

const FabricImageWrapper = styled.div`
  width: 100%;
  height: 220px;
  border-radius: 18px;
  overflow: hidden;

  @media (max-width: 768px) {
    height: 200px;
  }
`;

const FabricImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;

  ${FabricItem}:hover & {
    transform: scale(1.04);
  }
`;

const FabricName = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  color: #222;
  margin-bottom: 0.4rem;
`;

const FabricDescription = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: #555;
`;

const HandmadeNote = styled.div`
  max-width: 820px;
  margin: 7rem auto 1rem;
  font-size: 1.05rem;
  line-height: 1.7;
  color: #444;
  text-align: center;
  strong {
    font-weight: 600;
    color: #222;
  }
`;

/* =========================
   FAQ (UI)
========================= */

const FAQSection = styled.section`
  padding: 5.5rem 2rem;
  background: #fafafa;
`;

const FAQInner = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

const FAQTitle = styled.h2`
  font-size: 2rem;
  font-weight: 650;
  color: #121212;
  margin: 0 0 1.2rem 0;
  text-align: center;
`;

const FAQGrid = styled.div`
  display: grid;
  gap: 0.9rem;
  margin-top: 1.6rem;
`;

const FAQItem = styled.details`
  border-radius: 16px;
  background: #fff;
  border: 1px solid rgba(17, 17, 17, 0.08);
  padding: 1.05rem 1.1rem;
`;

const FAQSummary = styled.summary`
  list-style: none;
  cursor: pointer;
  font-weight: 750;
  color: rgba(17, 17, 17, 0.9);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;

  &::-webkit-details-marker {
    display: none;
  }

  &::after {
    content: "+";
    font-size: 1.25rem;
    line-height: 1;
    color: rgba(17, 17, 17, 0.6);
  }

  ${FAQItem}[open] &::after {
    content: "–";
  }
`;

const FAQBody = styled.p`
  margin: 0.85rem 0 0 0;
  color: rgba(17, 17, 17, 0.68);
  line-height: 1.7;
`;

/* =========================
   COMPONENT
========================= */

export default function CortinasEstoresPremium() {
  const baseUrl = (
    import.meta.env.VITE_SITE_URL || window.location.origin
  ).replace(/\/$/, "");

  const canonical = `${baseUrl}/cortinas-estores`;
  const siteName = CONTACT.siteName;

  const title =
    "Cortinas y estores a medida | Traver Decoración Textil (Castellón y Valencia)";
  const description =
    "Cortinas y estores a medida en Almassora: tejidos seleccionados, caída impecable y control de luz y privacidad. Medición y instalación profesional en Castellón y Valencia.";

  const ogImage = `${baseUrl}/og.png`;
  const ogImageAlt = "Cortinas y estores a medida — Traver Decoración Textil";

  const faqItems = [
    {
      q: "¿Qué diferencia hay entre cortinas y estores?",
      a: "Las cortinas aportan más presencia textil y caída decorativa; los estores son más minimalistas y prácticos para controlar luz en ventanas con poco espacio. Te recomendamos según uso, estilo y orientación.",
    },
    {
      q: "¿Hacéis visita y medición en casa?",
      a: "Sí. La medición precisa es clave para que el resultado quede perfecto. Te asesoramos sobre tejido, confección y sistema antes de fabricar.",
    },
    {
      q: "¿Tenéis opciones térmicas o blackout?",
      a: "Sí. Hay tejidos térmicos y blackout para reducir entrada de luz y mejorar confort. En dormitorios solemos proponer combinaciones (visillo + blackout) para flexibilidad.",
    },
    {
      q: "¿Cuánto tarda el proceso?",
      a: "Depende del tejido y la confección. Tras la visita y la elección, te confirmamos plazos reales de fabricación e instalación.",
    },
    {
      q: "¿Instaláis también rieles y sistemas?",
      a: "Sí. Instalamos rieles, barras y sistemas de estor con una puesta a punto final para que el movimiento sea suave y limpio.",
    },
  ];

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
        name: "Cortinas y Estores",
        item: canonical,
      },
    ],
  };

  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${canonical}#webpage`,
    url: canonical,
    name: title,
    description,
    inLanguage: "es-ES",
    isPartOf: { "@id": `${baseUrl}/#website` },
  };

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${canonical}#service`,
    name: "Cortinas y estores a medida",
    description,
    areaServed: [
      { "@type": "AdministrativeArea", name: "Castellón" },
      { "@type": "AdministrativeArea", name: "Valencia" },
    ],
    provider: {
      "@type": "LocalBusiness",
      name: siteName,
      url: `${baseUrl}/`,
      telephone: CONTACT.phoneLandline,
      email: CONTACT.email,
      address: {
        "@type": "PostalAddress",
        ...CONTACT.address,
      },
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const jsonLd = [webPageJsonLd, breadcrumbJsonLd, serviceJsonLd, faqJsonLd];

  const sliderSettings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 600,
    autoplay: true,
    autoplaySpeed: 3500,
  };

  const images = [cortina2, cortina3, cortina4, cortina5, cortina6];

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
          <HeroEyebrow>Decoración textil a medida</HeroEyebrow>
          <HeroTitle>
            Cortinas & <span>Estores</span>
          </HeroTitle>
          <HeroText>
            Diseñamos soluciones que regulan la luz, aportan privacidad y elevan
            la estética de cada espacio con equilibrio y elegancia.
          </HeroText>
        </HeroInner>
      </Hero>

      {/* EDITORIAL (añade contexto semántico útil) */}
      <Editorial>
        <EditorialInner>
          <EditorialTitle>Caída, luz y proporción</EditorialTitle>
          <EditorialText>
            Un buen resultado depende del tejido, la confección y la medición.
            Te orientamos para elegir la combinación adecuada (visillo, lino,
            terciopelo o blackout) y el sistema más limpio para tu ventana.
          </EditorialText>
        </EditorialInner>
      </Editorial>

      {/* FEATURES */}
      <Features>
        <FeaturesGrid>
          <Feature>
            <FeatureTitle>Asesoramiento real</FeatureTitle>
            <FeatureText>
              Te recomendamos tejido y confección según orientación, privacidad
              y estilo del espacio.
            </FeatureText>
          </Feature>

          <Feature>
            <FeatureTitle>Medición precisa</FeatureTitle>
            <FeatureText>
              Ajuste perfecto para que la caída sea impecable y el sistema
              funcione suave.
            </FeatureText>
          </Feature>

          <Feature>
            <FeatureTitle>Instalación profesional</FeatureTitle>
            <FeatureText>
              Rieles, barras y estores instalados con acabado limpio y puesta a
              punto final.
            </FeatureText>
          </Feature>
        </FeaturesGrid>
      </Features>

      {/* FABRICS & HANDMADE */}
      <FabricsSection>
        <FabricsInner>
          <FabricsHeader>
            <FabricsTitle>
              <span>Inspiración</span> que empieza en el tejido
            </FabricsTitle>
            <FabricsIntro>
              Detrás de cada cortina hay una decisión, una textura y una forma
              de entender la luz. Diseñamos y confeccionamos cada proyecto a
              medida, cuidando cada detalle para lograr espacios equilibrados y
              acogedores.
            </FabricsIntro>
          </FabricsHeader>

          <FabricsGrid>
            <FabricItem>
              <FabricImageWrapper>
                <FabricImage src={linenImg} alt="Cortinas de lino a medida" />
              </FabricImageWrapper>
              <FabricName>Lino</FabricName>
              <FabricDescription>
                Natural, ligero y elegante. Ideal para ambientes relajados,
                luminosos y atemporales.
              </FabricDescription>
            </FabricItem>

            <FabricItem>
              <FabricImageWrapper>
                <FabricImage src={sheerImg} alt="Visillos a medida" />
              </FabricImageWrapper>
              <FabricName>Visillos</FabricName>
              <FabricDescription>
                Suavizan la luz sin bloquearla, aportando privacidad y amplitud
                en zonas comunes.
              </FabricDescription>
            </FabricItem>

            <FabricItem>
              <FabricImageWrapper>
                <FabricImage
                  src={velvetImg}
                  alt="Cortinas de terciopelo a medida"
                />
              </FabricImageWrapper>
              <FabricName>Terciopelo</FabricName>
              <FabricDescription>
                Textura rica y sofisticada que aporta carácter y profundidad en
                estancias principales.
              </FabricDescription>
            </FabricItem>

            <FabricItem>
              <FabricImageWrapper>
                <FabricImage
                  src={blackoutImg}
                  alt="Cortinas térmicas y blackout a medida"
                />
              </FabricImageWrapper>
              <FabricName>Térmicas / blackout</FabricName>
              <FabricDescription>
                Para mejorar el confort, reducir entrada de luz y ayudar a
                regular temperatura.
              </FabricDescription>
            </FabricItem>

            <FabricItem>
              <FabricImageWrapper>
                <FabricImage
                  src={patternedImg}
                  alt="Cortinas con tejidos estampados"
                />
              </FabricImageWrapper>
              <FabricName>Tejidos estampados</FabricName>
              <FabricDescription>
                Aportan personalidad y estilo, adaptándose al carácter de cada
                espacio.
              </FabricDescription>
            </FabricItem>

            <FabricItem>
              <FabricImageWrapper>
                <FabricImage
                  src={chenilleImg}
                  alt="Cortinas técnicas y chenille"
                />
              </FabricImageWrapper>
              <FabricName>Técnicas</FabricName>
              <FabricDescription>
                Funcionales y discretas para grandes ventanales o necesidades de
                control solar.
              </FabricDescription>
            </FabricItem>
          </FabricsGrid>

          <HandmadeNote>
            <strong>
              Cada cortina se confecciona a medida por personas, no por
              máquinas.
            </strong>{" "}
            Por eso el ajuste, la caída y el acabado final marcan la diferencia
            frente a soluciones estándar.
          </HandmadeNote>
        </FabricsInner>
      </FabricsSection>

      {/* SISTEMAS + ENFOQUE */}
      <ComplementosVentana id="sistemas" />
      <EnfoqueSlider />

      {/* CAROUSEL */}
      <CarouselSection>
        <Slider {...sliderSettings}>
          {images.map((img, i) => (
            <CarouselImage key={i}>
              <img
                src={img}
                alt={`Cortinas y estores instalados — ejemplo ${i + 1}`}
                loading="lazy"
              />
            </CarouselImage>
          ))}
        </Slider>
      </CarouselSection>

      {/* FAQ (UI + schema ya incluido arriba) */}
      <FAQSection>
        <FAQInner>
          <FAQTitle>Preguntas frecuentes</FAQTitle>
          <FAQGrid>
            {faqItems.map((f) => (
              <FAQItem key={f.q}>
                <FAQSummary>{f.q}</FAQSummary>
                <FAQBody>{f.a}</FAQBody>
              </FAQItem>
            ))}
          </FAQGrid>
        </FAQInner>
      </FAQSection>

      {/* CTA FINAL */}
      <CTA>
        <CTATitle>¿Te preparamos una propuesta a medida?</CTATitle>
        <CTAText>
          Cuéntanos tu espacio y lo que quieres mejorar. Te aconsejamos tejidos,
          sistema y una solución equilibrada para luz y privacidad.
        </CTAText>
        <CTAButton href="/contact">Solicitar asesoramiento</CTAButton>
      </CTA>
    </Page>
  );
}
