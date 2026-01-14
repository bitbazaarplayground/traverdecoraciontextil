import styled from "styled-components";

/**
 * AwningAccessories
 * - Layout like the reference: 1 large card (left) + 4 cards (right)
 * - Uses background images with a dark gradient overlay
 * - Pass images as URLs (recommended: from /public, e.g. "/toldos/cofre.jpg")
 */

const DEFAULT_ITEMS = [
  {
    key: "smart",
    title: "Tecnología inteligente",
    description:
      "Control sin esfuerzo con integración domótica y automatización.",
    image: "/toldos/cofre.jpg",
    size: "big",
  },
  {
    key: "led",
    title: "Iluminación LED",
    description: "Crea un ambiente espectacular en tu terraza al atardecer.",
    image: "/toldos/pergola.jpg",
  },
  {
    key: "wind",
    title: "Sensor de viento",
    description: "Protección automática: se recoge si detecta rachas fuertes.",
    image: "/toldos/vela.webp",
  },
  {
    key: "heat",
    title: "Calefacción exterior",
    description: "Confort todo el año con calor instantáneo y discreto.",
    image: "/toldos/toldo1.jpeg",
  },
  {
    key: "light",
    title: "Sensor de sol",
    description:
      "Extiende o recoge el toldo según la intensidad solar para máximo confort.",
    image: "/toldos/toldo2.jpg",
  },
];

export default function AwningAccessories({
  title = "Accesorios para Toldos",
  subtitle = "Sensores, iluminación y opciones premium para completar tu espacio exterior.",
  items = DEFAULT_ITEMS,
}) {
  const big = items.find((i) => i.size === "big") || items[0];
  const rest = items.filter((i) => i.key !== big.key).slice(0, 4);

  return (
    <Section>
      <Inner>
        <Header>
          <Title>{title}</Title>
          <Subtitle>{subtitle}</Subtitle>
        </Header>

        <Grid>
          <Card $bg={big.image} $variant="big">
            <Overlay />
            <CardContent>
              <CardTitle>{big.title}</CardTitle>
              <CardText>{big.description}</CardText>
            </CardContent>
          </Card>

          {rest.map((item, idx) => (
            <Card key={item.key || idx} $bg={item.image}>
              <Overlay />
              <CardContent>
                <CardTitle>{item.title}</CardTitle>
                <CardText>{item.description}</CardText>
              </CardContent>
            </Card>
          ))}
        </Grid>
      </Inner>
    </Section>
  );
}

/* =========================
   STYLES
========================= */

const Section = styled.section`
  width: 100%;
  padding: 5rem 1.5rem;
  background: #fff;

  @media (max-width: 768px) {
    padding: 3.5rem 1rem;
  }
`;

const Inner = styled.div`
  max-width: 1100px;
  margin: 0 auto;
`;

const Header = styled.div`
  text-align: center;
  max-width: 760px;
  margin: 0 auto 2.8rem;
`;

const Title = styled.h2`
  font-size: 2.7rem;
  line-height: 1.1;
  margin: 0 0 0.8rem;
  font-weight: 650;
  color: #0f172a;

  @media (max-width: 768px) {
    font-size: 2.05rem;
  }
`;

const Subtitle = styled.p`
  margin: 0 auto;
  font-size: 1.05rem;
  line-height: 1.7;
  color: #64748b;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1.35fr 1fr 1fr;
  grid-auto-rows: 210px;
  gap: 1.6rem;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    grid-auto-rows: auto;
  }
`;

const Card = styled.div`
  position: relative;
  border-radius: 18px;
  overflow: hidden;
  background-image: url(${(p) => p.$bg});
  background-size: cover;
  background-position: center;
  box-shadow: 0 16px 30px rgba(2, 6, 23, 0.12);
  transform: translateZ(0);
  min-height: ${(p) => (p.$variant === "big" ? "auto" : "210px")};

  ${(p) =>
    p.$variant === "big"
      ? `
        grid-row: span 2;
        grid-column: 1 / 2;
        min-height: 440px;
      `
      : `
        grid-column: auto;
      `}

  @media (max-width: 900px) {
    grid-row: auto;
    grid-column: auto;
    min-height: 240px;
  }
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(2, 6, 23, 0.78),
    rgba(2, 6, 23, 0.28),
    rgba(2, 6, 23, 0.05)
  );
`;

const CardContent = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  padding: 1.6rem;
  color: #fff;

  @media (max-width: 768px) {
    padding: 1.25rem;
  }
`;

const CardTitle = styled.h3`
  margin: 0 0 0.35rem;
  font-size: 1.35rem;
  font-weight: 650;
  letter-spacing: -0.01em;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const CardText = styled.p`
  margin: 0;
  font-size: 0.98rem;
  line-height: 1.45;
  opacity: 0.92;

  @media (max-width: 768px) {
    font-size: 0.95rem;
  }
`;
