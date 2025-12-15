import Slider from "react-slick";
import styled from "styled-components";

// Images
import cortina1 from "../assets/CortinasEstores/cortinas1.jpeg";
import cortina2 from "../assets/CortinasEstores/cortinas2.jpeg";
import cortina3 from "../assets/CortinasEstores/cortinas3.jpeg";
import cortina4 from "../assets/CortinasEstores/cortinas4.jpeg";
import cortina5 from "../assets/CortinasEstores/cortinas5.jpeg";

// Slick styles
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

/* =========================
   PAGE WRAPPER
========================= */

const Page = styled.main`
  width: 100%;
  background: #fff;
`;

/* =========================
   HERO
========================= */

const Hero = styled.section`
  min-height: 70vh;
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  align-items: center;
  padding: 4rem 2rem;
  gap: 3rem;
  background: #f6f6f6;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    padding: 3rem 1.5rem;
  }
`;

const HeroText = styled.div`
  max-width: 520px;
`;

const HeroImage = styled.div`
  width: 100%;
  height: 420px;
  border-radius: 22px;
  background-image: url(${cortina1});
  background-size: cover;
  background-position: center;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);

  @media (max-width: 900px) {
    height: 300px;
  }
`;

const HeroTitle = styled.h1`
  font-size: 3.2rem;
  font-weight: 600;
  color: #222;
  margin-bottom: 1.2rem;

  span {
    color: ${({ theme }) => theme.colors.primary};
  }

  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.2rem;
  line-height: 1.7;
  color: #555;
`;

/* =========================
   GENERIC SECTION
========================= */

const Section = styled.section`
  padding: 5rem 2rem;

  @media (max-width: 768px) {
    padding: 3.5rem 1.5rem;
  }
`;

const SectionInner = styled.div`
  max-width: 1100px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  font-size: 2.2rem;
  font-weight: 600;
  color: #222;
  margin-bottom: 1.5rem;
`;

const SectionText = styled.p`
  max-width: 720px;
  font-size: 1.05rem;
  line-height: 1.7;
  color: #555;
`;

/* =========================
   SOLUTIONS
========================= */

const SolutionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2.5rem;
  margin-top: 4rem;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const SolutionCard = styled.div`
  background: #fafafa;
  border-radius: 18px;
  padding: 2.5rem;
`;

const SolutionTitle = styled.h3`
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 0.8rem;
  color: #222;
`;

const SolutionText = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: #555;
`;

/* =========================
   CAROUSEL
========================= */

const CarouselSection = styled.section`
  padding: 4rem 2rem;
  background: #fafafa;

  .slick-slide > div {
    height: 100%;
  }
`;

const CarouselImageWrapper = styled.div`
  width: 100%;
  height: 420px;
  border-radius: 20px;
  overflow: hidden;

  @media (max-width: 768px) {
    height: 260px;
  }
`;

const CarouselImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

/* =========================
   CTA
========================= */

const CTA = styled.section`
  padding: 5rem 2rem;
  background: #111;
  color: #fff;
  text-align: center;
`;

const CTATitle = styled.h2`
  font-size: 2.4rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const CTAText = styled.p`
  max-width: 600px;
  margin: 0 auto;
  font-size: 1.05rem;
  line-height: 1.6;
  opacity: 0.85;
`;

const CTAButton = styled.a`
  display: inline-block;
  margin-top: 2rem;
  padding: 0.9rem 2.4rem;
  border-radius: 40px;
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  font-weight: 600;
  text-decoration: none;

  &:hover {
    opacity: 0.85;
  }
`;

/* =========================
   COMPONENT
========================= */

export default function CortinasEstores() {
  const sliderSettings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
  };

  const images = [cortina1, cortina2, cortina3, cortina4, cortina5];

  return (
    <Page>
      {/* HERO */}
      <Hero>
        <HeroText>
          <HeroTitle>
            Cortinas & <span>Estores</span> a medida
          </HeroTitle>
          <HeroSubtitle>
            Diseñamos soluciones textiles que transforman la luz, el espacio y
            la forma de vivir tu hogar, cuidando cada detalle desde la elección
            del tejido hasta la instalación final.
          </HeroSubtitle>
        </HeroText>

        <HeroImage />
      </Hero>

      {/* VALUE */}
      <Section>
        <SectionInner>
          <SectionTitle>Mucho más que vestir ventanas</SectionTitle>
          <SectionText>
            Las cortinas y estores definen la atmósfera de un espacio. Regulan
            la entrada de luz, aportan privacidad y contribuyen al confort
            térmico, siempre en armonía con el estilo y la arquitectura.
          </SectionText>

          <SolutionsGrid>
            <SolutionCard>
              <SolutionTitle>Luz natural equilibrada</SolutionTitle>
              <SolutionText>
                Controla la intensidad de la luz sin renunciar a la sensación de
                amplitud y bienestar.
              </SolutionText>
            </SolutionCard>

            <SolutionCard>
              <SolutionTitle>Privacidad y descanso</SolutionTitle>
              <SolutionText>
                Soluciones pensadas para dormitorios y zonas íntimas donde el
                confort visual es esencial.
              </SolutionText>
            </SolutionCard>

            <SolutionCard>
              <SolutionTitle>Grandes ventanales</SolutionTitle>
              <SolutionText>
                Sistemas elegantes y funcionales para grandes superficies
                acristaladas.
              </SolutionText>
            </SolutionCard>
          </SolutionsGrid>
        </SectionInner>
      </Section>

      {/* CAROUSEL */}
      <CarouselSection>
        <Slider {...sliderSettings}>
          {images.map((img, i) => (
            <CarouselImageWrapper key={i}>
              <CarouselImg src={img} alt={`Cortinas ${i + 1}`} />
            </CarouselImageWrapper>
          ))}
        </Slider>
      </CarouselSection>

      {/* CTA */}
      <CTA>
        <CTATitle>Te asesoramos en cada detalle</CTATitle>
        <CTAText>
          Nuestro equipo te acompaña para encontrar la solución perfecta según
          tu espacio y estilo de vida.
        </CTAText>
        <CTAButton href="/contacto">Solicitar asesoramiento</CTAButton>
      </CTA>
    </Page>
  );
}
