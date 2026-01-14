import Slider from "react-slick";
import styled from "styled-components";

// Assets
import heroImg from "../assets/CortinasEstores/carousel/cortinas1.jpeg";
import zebraBg from "../assets/zebra_pattern.png";

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
   FEATURE STRIP (NEW)
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
   CTA (REFINED)
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
   CAROUSEL (KEEP, CLEAN)
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
   ENFOQUE / PROCESS-LITE
========================= */

const EnfoqueSection = styled.section`
  padding: 5rem 2rem;
  background: #fff;

  @media (max-width: 768px) {
    padding: 3.5rem 1.5rem;
  }
`;

const EnfoqueInner = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  text-align: center;
`;

const EnfoqueTitle = styled.h2`
  font-size: 2.2rem;
  font-weight: 600;
  color: #121212;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const EnfoqueIntro = styled.p`
  max-width: 720px;
  margin: 0 auto 3.5rem;
  font-size: 1.05rem;
  line-height: 1.7;
  color: #555;
`;

const EnfoqueGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2.5rem;
  text-align: left;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const EnfoqueItem = styled.div`
  padding: 2.5rem;
  border-radius: 18px;
  background: #fafafa;
`;

const EnfoqueItemTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  color: #222;
  margin-bottom: 0.8rem;
`;

const EnfoqueItemText = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: #555;
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
   COMPONENT
========================= */

export default function CortinasEstoresPremium() {
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
                Natural, ligero y elegante. Ideal para crear ambientes
                relajados, luminosos y atemporales.
              </FabricDescription>
            </FabricItem>

            <FabricItem>
              <FabricImageWrapper>
                <FabricImage src={sheerImg} alt="Visillos a medida" />
              </FabricImageWrapper>
              <FabricName>Visillos</FabricName>
              <FabricDescription>
                Suavizan la luz sin bloquearla, aportando privacidad y una
                sensación de amplitud en salones y zonas comunes.
              </FabricDescription>
            </FabricItem>

            <FabricItem>
              <FabricImageWrapper>
                <FabricImage src={velvetImg} alt="Cortinas de terciopelo" />
              </FabricImageWrapper>
              <FabricName>Terciopelo</FabricName>
              <FabricDescription>
                Textura rica y sofisticada que aporta carácter y profundidad a
                espacios como comedores o dormitorios.
              </FabricDescription>
            </FabricItem>

            <FabricItem>
              <FabricImageWrapper>
                <FabricImage
                  src={blackoutImg}
                  alt="Cortinas térmicas y blackout"
                />
              </FabricImageWrapper>
              <FabricName>Cortinas térmicas / blackout</FabricName>
              <FabricDescription>
                Pensadas para mejorar el confort, reducir la entrada de luz y
                ayudar a regular la temperatura del hogar.
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
                Diseños que aportan personalidad y estilo, adaptándose al
                carácter de cada espacio.
              </FabricDescription>
            </FabricItem>

            <FabricItem>
              <FabricImageWrapper>
                <FabricImage
                  src={chenilleImg}
                  alt="Cortinas técnicas y chenille"
                />
              </FabricImageWrapper>
              <FabricName>Cortinas técnicas</FabricName>
              <FabricDescription>
                Soluciones funcionales y discretas para grandes ventanales o
                espacios donde el control de la luz es esencial.
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

      {/* CTA */}
      <CTA>
        <CTATitle>Te asesoramos en cada detalle</CTATitle>
        <CTAText>
          Te acompañamos desde la elección del tejido hasta la instalación
          final, cuidando cada decisión para lograr el resultado perfecto.
        </CTAText>
        <CTAButton href="/contacto">Solicitar asesoramiento</CTAButton>
      </CTA>
      {/* ENFOQUE */}
      <EnfoqueSection>
        <EnfoqueInner>
          <EnfoqueTitle>Cuidamos cada detalle del proceso</EnfoqueTitle>

          <EnfoqueIntro>
            Cada proyecto es único. Por eso trabajamos de forma cercana y
            cuidada, combinando experiencia, materiales de calidad y una
            ejecución impecable.
          </EnfoqueIntro>

          <EnfoqueGrid>
            <EnfoqueItem>
              <EnfoqueItemTitle>Asesoramiento personalizado</EnfoqueItemTitle>
              <EnfoqueItemText>
                Escuchamos tus necesidades y te guiamos en la elección de
                tejidos, sistemas y soluciones que mejor encajan con tu espacio.
              </EnfoqueItemText>
            </EnfoqueItem>

            <EnfoqueItem>
              <EnfoqueItemTitle>Materiales seleccionados</EnfoqueItemTitle>
              <EnfoqueItemText>
                Trabajamos con marcas y fabricantes reconocidos para garantizar
                calidad, durabilidad y un acabado impecable.
              </EnfoqueItemText>
            </EnfoqueItem>

            <EnfoqueItem>
              <EnfoqueItemTitle>Instalación profesional</EnfoqueItemTitle>
              <EnfoqueItemText>
                Nuestro equipo se encarga de la instalación con precisión y
                respeto por tu hogar, cuidando cada detalle hasta el final.
              </EnfoqueItemText>
            </EnfoqueItem>
          </EnfoqueGrid>
        </EnfoqueInner>
      </EnfoqueSection>

      {/* CAROUSEL */}
      <CarouselSection>
        <Slider {...sliderSettings}>
          {images.map((img, i) => (
            <CarouselImage key={i}>
              <img src={img} alt={`Cortinas ${i + 1}`} />
            </CarouselImage>
          ))}
        </Slider>
      </CarouselSection>
    </Page>
  );
}
