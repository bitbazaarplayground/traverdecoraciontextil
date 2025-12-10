import { motion } from "framer-motion";
import styled from "styled-components";

const Section = styled.section`
  padding: 5rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h2`
  font-size: 2.8rem;
  text-align: center;
  margin-bottom: 3rem;
  font-weight: 700;
  letter-spacing: -0.5px;

  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 2rem;
`;

const Card = styled(motion.div)`
  background: #fff;
  padding: 2rem;
  border-radius: 20px;
  box-shadow: rgba(0, 0, 0, 0.07) 0px 4px 20px;
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const CardTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  font-weight: 600;
`;

const CardText = styled.p`
  font-size: 1rem;
  line-height: 1.5;
  color: #444;
`;

const servicesList = [
  {
    title: "Cortinas a Medida",
    text: "Diseño, confección e instalación profesional de cortinas personalizadas.",
  },
  {
    title: "Toldos",
    text: "Soluciones de sombra y protección solar adaptadas a cualquier espacio.",
  },
  {
    title: "Tapicerías",
    text: "Renovación de muebles y tejidos con materiales de alta calidad.",
  },
  {
    title: "Papeles Pintados",
    text: "Selección de papeles exclusivos para transformar ambientes.",
  },
  {
    title: "Motorización",
    text: "Automatización de cortinas, persianas y toldos con sistemas modernos.",
  },
  {
    title: "Proyectos Integrales",
    text: "Asesoramiento, diseño y ejecución completa de proyectos decorativos.",
  },
];

export default function Services() {
  return (
    <Section id="services">
      <Title>Nuestros Servicios</Title>

      <Grid>
        {servicesList.map((service, index) => (
          <Card
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <CardTitle>{service.title}</CardTitle>
            <CardText>{service.text}</CardText>
          </Card>
        ))}
      </Grid>
    </Section>
  );
}
