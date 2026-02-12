import styled from "styled-components";
import assesoramiento840 from "../assets/process/InteriorPlanning-mobile.webp";
import assesoramiento1100 from "../assets/process/InteriorPlanning.webp";
import catalogo840 from "../assets/process/catalogoP-mobile.webp";
import catalogo1100 from "../assets/process/catalogoP.webp";
import final840 from "../assets/process/final-mobile.webp";
import final1100 from "../assets/process/final.webp";
import jose840 from "../assets/process/instalacionProfessional-mobile.webp";
import jose1100 from "../assets/process/instalacionProfessional.webp";

/* =========================
   RESPONSIVE IMAGE SIZES
========================= */

const CARD_SIZES = "(max-width: 768px) 92vw, (max-width: 1100px) 45vw, 520px";

/* =========================
   SECTION
========================= */

const Section = styled.section`
  width: 100%;
  padding: 3.4rem 1.5rem;

  background: #fafafa;

  @media (max-width: 768px) {
    padding: 2.8rem 1rem;
  }
`;

const Header = styled.div`
  max-width: 900px;
  margin: 0 auto 2.1rem;

  text-align: center;
`;

const Title = styled.h2`
  text-align: center;
  font-size: 2.2rem;
  font-weight: 600;
  color: #222;
  margin-bottom: 1rem;

  span {
    color: ${({ theme }) => theme.colors.primary};
  }

  @media (max-width: 768px) {
    font-size: 1.7rem;
  }
`;

const Intro = styled.p`
  font-size: 1rem;
  color: #555;
  line-height: 1.6;
`;

/* =========================
   GRID
========================= */

const StepsGrid = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.7rem;
  }
`;

/* =========================
   STEP CARD
========================= */

const StepCard = styled.div`
  background: #fff;
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-4px);
  }
  @media (hover: none) {
    &:hover {
      transform: none;
    }
  }
`;

const StepImageWrap = styled.div`
  position: relative;
  width: 100%;
  height: 195px;
  overflow: hidden;

  @media (max-width: 768px) {
    height: 175px;
  }
`;

const StepImg = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const StepContent = styled.div`
  padding: 1.25rem 1.5rem;
`;

const StepNumber = styled.span`
  display: block;
  font-size: 0.85rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #999;
  margin-bottom: 0.5rem;
`;

const StepTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: #222;
  margin-bottom: 0.5rem;
`;

const StepText = styled.p`
  font-size: 0.95rem;
  color: #555;
  line-height: 1.55;
`;

/* =========================
   DATA
========================= */

const steps = [
  {
    number: "Paso 1",
    title: "Asesoramiento personalizado",
    text: "Escuchamos tus ideas, necesidades y estilo para ofrecerte soluciones a medida.",
    image: assesoramiento1100,
    imageSrcSet: `${assesoramiento840} 840w, ${assesoramiento1100} 1100w`,
    imageSizes: CARD_SIZES,
  },
  {
    number: "Paso 2",
    title: "Selección de materiales",
    text: "Te ayudamos a elegir tejidos, papeles y sistemas que encajen con tu espacio y tu forma de vivir.",
    image: catalogo1100,
    imageSrcSet: `${catalogo840} 840w, ${catalogo1100} 1100w`,
    imageSizes: CARD_SIZES,
  },
  {
    number: "Paso 3",
    title: "Instalación profesional",
    text: "Nuestro equipo se encarga de la instalación con precisión y cuidado, respetando tu hogar.",
    image: jose1100,
    imageSrcSet: `${jose840} 840w, ${jose1100} 1100w`,
    imageSizes: CARD_SIZES,
  },
  {
    number: "Paso 4",
    title: "Resultado final",
    text: "Un espacio equilibrado, funcional y elegante, pensado para disfrutarlo cada día.",
    image: final1100,
    imageSrcSet: `${final840} 840w, ${final1100} 1100w`,
    imageSizes: CARD_SIZES,
  },
];

/* =========================
   COMPONENT
========================= */

export default function Process() {
  return (
    <Section>
      <Header>
        <Title>
          Te ayudamos a decorar la <span>casa de tus sueños</span>
        </Title>
        <Intro>
          Acompañamos cada proyecto desde la idea inicial hasta el resultado
          final, cuidando cada detalle para que el proceso sea sencillo y sin
          preocupaciones.
        </Intro>
      </Header>

      <StepsGrid>
        {steps.map((step) => (
          <StepCard key={step.number}>
            <StepImageWrap>
              <StepImg
                src={step.image}
                {...(step.imageSrcSet
                  ? { srcSet: step.imageSrcSet, sizes: step.imageSizes }
                  : {})}
                alt={step.title}
                width="1100"
                height="718"
                loading="lazy"
                decoding="async"
              />
            </StepImageWrap>

            <StepContent>
              <StepNumber>{step.number}</StepNumber>
              <StepTitle>{step.title}</StepTitle>
              <StepText>{step.text}</StepText>
            </StepContent>
          </StepCard>
        ))}
      </StepsGrid>
    </Section>
  );
}
