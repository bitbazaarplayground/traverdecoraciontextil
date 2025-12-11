import { motion } from "framer-motion";
import { Award, CheckCircle, Home, Zap } from "lucide-react"; // ← sleek icons
import styled from "styled-components";

const Section = styled.section`
  width: 100%;
  padding: 4rem 2rem;
  background: #fff;

  @media (max-width: 768px) {
    padding: 3rem 1.5rem;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 2.3rem;
  font-weight: 600;
  margin-bottom: 2.5rem;
  color: ${({ theme }) => theme.colors.primary};
`;

const Grid = styled.div`
  display: grid;
  gap: 1.8rem;

  @media (min-width: 900px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const Card = styled(motion.div)`
  padding: 2rem 1.6rem;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.92);
  border: 1px solid rgba(0, 0, 0, 0.06);
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.07);

  display: flex;
  flex-direction: column;
  align-items: center;

  transition: transform 0.25s ease, box-shadow 0.25s ease;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  }
`;

const IconWrapper = styled.div`
  width: 60px;
  height: 60px;
  margin-bottom: 1rem;

  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary};
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    color: white;
    width: 30px;
    height: 30px;
  }
`;

const CardTitle = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 0.6rem;
  font-weight: 600;
  color: #111;
`;

const CardText = styled.p`
  color: #555;
  font-size: 1rem;
  line-height: 1.5;
`;

export default function WhyChooseUs() {
  const fadeUp = {
    hidden: { opacity: 0, y: 35 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <Section>
      <Container>
        <Title>¿Por Qué Elegirnos?</Title>

        <Grid>
          {/* EXPERIENCE */}
          <Card
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <IconWrapper>
              <Award />
            </IconWrapper>
            <CardTitle>Más de 30 Años de Experiencia</CardTitle>
            <CardText>
              Profesionales en decoración textil con trayectoria y resultados
              garantizados.
            </CardText>
          </Card>

          {/* INSTALLATION */}
          <Card
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <IconWrapper>
              <Home />
            </IconWrapper>
            <CardTitle>Instalación Profesional</CardTitle>
            <CardText>
              Nuestro equipo se encarga de la medición, montaje y acabados sin
              complicaciones.
            </CardText>
          </Card>

          {/* PREMIUM PRODUCTS */}
          <Card
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <IconWrapper>
              <CheckCircle />
            </IconWrapper>
            <CardTitle>Calidad y Garantía</CardTitle>
            <CardText>
              Trabajamos solo con materiales y sistemas de alta calidad,
              duraderos y elegantes.
            </CardText>
          </Card>

          {/* AUTOMATION */}
          <Card
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <IconWrapper>
              <Zap />
            </IconWrapper>
            <CardTitle>Automatización Inteligente</CardTitle>
            <CardText>
              Domótica avanzada para controlar cortinas, persianas y toldos
              desde tu móvil.
            </CardText>
          </Card>
        </Grid>
      </Container>
    </Section>
  );
}
