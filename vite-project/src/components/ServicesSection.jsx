import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Img2 from "../assets/Home/HeroImg/img2.webp";
import Img3 from "../assets/Home/HeroImg/img3.webp";
import restaurante1 from "../assets/Home/HeroImg/restaurante1.AVIF";
import zebraBg from "../assets/zebra_pattern.png";

const SectionWrapper = styled.section`
  width: 100%;
  padding: 4rem 2rem;

  /* 🔥 Zebra background added here */
  background: linear-gradient(
      rgba(255, 255, 255, 0.85),
      rgba(255, 255, 255, 0.45)
    ),
    /* subtle overlay */ url(${zebraBg});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  @media (max-width: 768px) {
    padding: 3rem 1.5rem;
  }
`;

const TitleCenter = styled.h2`
  font-size: 2rem;
  text-align: center;
  margin-bottom: 2.5rem;
  font-weight: 600;
  color: #222;
`;

const CardGrid = styled.div`
  display: grid;
  gap: 1.5rem;

  @media (min-width: 900px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const Card = styled(motion.div)`
  background: #f9f9f9;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  transition: transform 0.3s ease;
`;

const CardImage = styled.div`
  width: 100%;
  height: 220px;
  background-size: cover;
  background-position: center;

  @media (min-width: 768px) {
    height: 260px;
  }
`;

const CardContent = styled.div`
  padding: 1.4rem;

  h3 {
    font-size: 1.4rem;
    margin-bottom: 0.6rem;
    font-weight: 600;
  }

  p {
    font-size: 1rem;
    color: #555;
    margin-bottom: 1.2rem;
  }
`;

const Button = styled(Link)`
  display: inline-block;
  padding: 0.7rem 1.4rem;
  border-radius: 50px;
  font-weight: 600;
  background: #000;
  color: #fff;
  text-decoration: none;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.85;
  }
`;

export default function ServiceSection() {
  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <SectionWrapper>
      <CardGrid>
        {/* CARD 1: CORTINAS */}
        <Card
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <CardImage
            style={{
              backgroundImage: `url(${Img2})`,
            }}
          />
          <CardContent>
            <h3>Cortinas & Estores</h3>
            <p>
              Soluciones elegantes y funcionales para controlar la luz y crear
              ambientes acogedores.
            </p>
            <Button to="/cortinas-estores">Ver más</Button>
          </CardContent>
        </Card>

        {/* CARD 2: TOLDOS */}
        <Card
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <CardImage
            style={{
              backgroundImage: `url(${restaurante1})`,
            }}
          />
          <CardContent>
            <h3>Toldos & Protección Solar</h3>
            <p>
              Control solar para interior y exterior, ideal para optimizar
              confort y eficiencia energética.
            </p>
            <Button to="/automatizacion">Ver más</Button>
          </CardContent>
        </Card>

        {/* CARD 3: Automación / Domótica */}
        <Card
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
        >
          <CardImage
            style={{
              backgroundImage: `url(${Img3})`,
            }}
          />
          <CardContent>
            <h3>Automatización del Hogar</h3>
            <p>
              Motoriza cortinas, persianas y toldos para un hogar inteligente,
              cómodo y moderno.
            </p>
            <Button to="/automatizacion">Ver más</Button>
          </CardContent>
        </Card>
      </CardGrid>
    </SectionWrapper>
  );
}
