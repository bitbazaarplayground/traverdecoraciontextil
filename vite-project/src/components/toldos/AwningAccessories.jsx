import styled from "styled-components";

/**
 * AwningAccessories
 * - Layout: 1 large card (left) + 4 cards (right)
 * - Background images with gradient overlay
 * - Designed to "sit inside" a parent Section without adding huge vertical gaps
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
    key: "sun",
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
    <Wrap aria-label="Accesorios para toldos">
      <Inner>
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
    </Wrap>
  );
}

/* =========================
   STYLES
========================= */

const Wrap = styled.section`
  width: 100%;
  background: transparent;

  /* IMPORTANT:
     This component is rendered inside other sections.
     Keep vertical spacing controlled and not "section-sized". */
  padding: 0;
  margin: 0;
`;

const Inner = styled.div`
  max-width: 1120px;
  margin: 0 auto;
`;

const Header = styled.div`
  text-align: center;
  max-width: 760px;
  margin: 0 auto 2rem;

  @media (max-width: 768px) {
    margin-bottom: 1.6rem;
  }
`;

const Title = styled.h2`
  font-size: 2.15rem;
  line-height: 1.12;
  margin: 0 0 0.65rem;
  font-weight: 750;
  color: #0f172a;

  @media (max-width: 768px) {
    font-size: 1.85rem;
  }
`;

const Subtitle = styled.p`
  margin: 0 auto;
  font-size: 1.05rem;
  line-height: 1.7;
  color: rgba(17, 17, 17, 0.68);
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1.35fr 1fr 1fr;
  grid-auto-rows: 210px;
  gap: 1.25rem;

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

  border: 1px solid rgba(2, 6, 23, 0.08);
  box-shadow: 0 18px 44px rgba(2, 6, 23, 0.12);
  transform: translateZ(0);
  transition: transform 0.25s ease, box-shadow 0.25s ease;

  min-height: ${(p) => (p.$variant === "big" ? "auto" : "210px")};

  ${(p) =>
    p.$variant === "big"
      ? `
        grid-row: span 2;
        grid-column: 1 / 2;
        min-height: 440px;
      `
      : ""}

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 26px 64px rgba(2, 6, 23, 0.16);
  }

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
  padding: 1.5rem;
  color: #fff;

  @media (max-width: 768px) {
    padding: 1.2rem;
  }
`;

const CardTitle = styled.h3`
  margin: 0 0 0.35rem;
  font-size: 1.32rem;
  font-weight: 750;
  letter-spacing: -0.01em;

  @media (max-width: 768px) {
    font-size: 1.18rem;
  }
`;

const CardText = styled.p`
  margin: 0;
  font-size: 0.98rem;
  line-height: 1.5;
  opacity: 0.92;

  @media (max-width: 768px) {
    font-size: 0.95rem;
  }
`;
