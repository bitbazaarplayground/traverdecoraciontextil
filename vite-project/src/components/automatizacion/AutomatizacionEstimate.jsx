import {
  Blinds,
  Lightbulb,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Sun,
  Thermometer,
  Waves,
} from "lucide-react";
import styled from "styled-components";

/* =========================
     FUTURISTIC MODULE (NO ANIMATIONS)
  ========================= */

const Wrap = styled.section`
  margin-top: 2rem;
  border-radius: 26px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.08);

  background: radial-gradient(
      1200px 420px at 18% 0%,
      rgba(229, 0, 126, 0.18),
      transparent 55%
    ),
    radial-gradient(
      900px 420px at 85% 35%,
      rgba(255, 255, 255, 0.08),
      transparent 60%
    ),
    rgba(11, 12, 15, 0.96);

  box-shadow: 0 50px 140px rgba(0, 0, 0, 0.55);
`;

const TopBar = styled.div`
  padding: 1.1rem 1.2rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
  align-items: center;
  justify-content: space-between;

  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.02);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
`;

const Chips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
`;

const Chip = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.5rem 0.7rem;
  border-radius: 999px;

  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);

  font-size: 0.86rem;
  color: rgba(244, 244, 245, 0.86);

  svg {
    width: 16px;
    height: 16px;
    opacity: 0.9;
  }
`;

const PriceRow = styled.div`
  padding: 1.35rem 1.2rem 1.15rem;
  display: grid;
  gap: 0.5rem;

  @media (min-width: 980px) {
    grid-template-columns: 1fr auto;
    align-items: end;
    gap: 1.2rem;
  }
`;

const PriceTitle = styled.h3`
  margin: 0;
  font-size: 1.25rem;
  font-weight: 650;
  color: rgba(244, 244, 245, 0.92);
`;

const PriceValue = styled.div`
  font-size: 2.25rem;
  font-weight: 800;
  line-height: 1.05;
  color: rgba(244, 244, 245, 0.98);

  span {
    color: ${({ theme }) => theme.colors.primary};
    text-shadow: 0 0 22px rgba(229, 0, 126, 0.35);
  }

  @media (min-width: 980px) {
    font-size: 2.45rem;
  }
`;

const Desc = styled.p`
  margin: 0;
  max-width: 72ch;
  color: rgba(244, 244, 245, 0.72);
  line-height: 1.7;
  font-size: 0.98rem;
`;

const Content = styled.div`
  display: grid;
  gap: 1.1rem;
  padding: 1.1rem 1.2rem 1.25rem;

  @media (min-width: 980px) {
    grid-template-columns: 1.05fr 0.95fr;
    align-items: start;
  }
`;

/* Media */
const Media = styled.div`
  border-radius: 22px;
  overflow: hidden;
  position: relative;
  border: 1px solid rgba(255, 255, 255, 0.08);

  background: rgba(255, 255, 255, 0.03);

  min-height: 220px;

  @media (min-width: 980px) {
    min-height: 340px;
  }
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  transform: scale(1.02);
`;

/* Static overlay (NO animation) */
const MediaGlow = styled.div`
  position: absolute;
  inset: 0;

  pointer-events: none;
`;

/* Inclusions */
const Card = styled.div`
  border-radius: 22px;
  padding: 1.1rem 1.05rem;

  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.1);

  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
`;

const CardTitle = styled.h4`
  margin: 0 0 0.35rem 0;
  font-size: 1.05rem;
  font-weight: 800;
  color: rgba(244, 244, 245, 0.95);
`;

const CardSub = styled.p`
  margin: 0 0 0.9rem 0;
  color: rgba(244, 244, 245, 0.7);
  line-height: 1.65;
  font-size: 0.95rem;
`;

const Grid = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 0.65rem;

  @media (min-width: 520px) and (max-width: 979px) {
    grid-template-columns: 1fr 1fr;
    gap: 0.7rem;
  }
`;

const Item = styled.li`
  display: grid;
  grid-template-columns: 38px 1fr;
  gap: 0.75rem;
  align-items: center;

  padding: 0.75rem 0.85rem;
  border-radius: 18px;

  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);

  transition: transform 0.2s ease, background 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    background: rgba(255, 255, 255, 0.06);
  }
`;

const IconBox = styled.div`
  width: 38px;
  height: 38px;
  border-radius: 14px;

  display: grid;
  place-items: center;

  background: rgba(229, 0, 126, 0.14);
  border: 1px solid rgba(229, 0, 126, 0.22);

  svg {
    width: 18px;
    height: 18px;
    color: rgba(244, 244, 245, 0.95);
  }
`;

const ItemText = styled.div`
  color: rgba(244, 244, 245, 0.9);
  line-height: 1.35;

  strong {
    display: block;
    font-weight: 800;
    color: rgba(244, 244, 245, 0.96);
  }

  span {
    display: block;
    font-size: 0.92rem;
    color: rgba(244, 244, 245, 0.7);
    margin-top: 0.1rem;
  }
`;

const FinePrint = styled.p`
  margin: 0.9rem 0 0 0;
  font-size: 0.9rem;
  line-height: 1.6;
  color: rgba(244, 244, 245, 0.6);
  text-align: center;
`;

/* icon helper */
const defaultIconMap = {
  toldo: Sun,
  cortina: Waves,
  persiana: Blinds,
  luz: Lightbulb,
  app: Smartphone,
  sensores: Thermometer,
  instalacion: ShieldCheck,
  extra: Sparkles,
};

export default function AutomatizacionEstimate({
  kicker = "Orientativo",
  priceText = "Desde",
  priceValue = "~3.500€",
  description,
  imageSrc,
  imageAlt,
  title = "Qué incluye normalmente",
  sub = "Un ejemplo realista para un hogar medio. Ajustamos motores, tejidos y sensores según medidas y uso.",
  items = [],
  finePrint,
  chips = ["Somfy-ready", "Instalación certificada"],
}) {
  return (
    <Wrap>
      <TopBar>
        <Chips>
          <Chip>
            <Sparkles />
            {kicker}
          </Chip>

          {chips.map((c) => (
            <Chip key={c}>{c}</Chip>
          ))}
        </Chips>
      </TopBar>

      <PriceRow>
        <div>
          <PriceTitle>Inversión orientativa</PriceTitle>
          <PriceValue>
            {priceText} <span>{priceValue}</span>
          </PriceValue>
          {description ? <Desc>{description}</Desc> : null}
        </div>
      </PriceRow>

      <Content>
        <Media>
          {/* eager reduces "pop-in" */}
          <Img src={imageSrc} alt={imageAlt} loading="eager" />
          <MediaGlow />
        </Media>

        <Card>
          <CardTitle>{title}</CardTitle>
          <CardSub>{sub}</CardSub>

          <Grid>
            {items.map((it, idx) => {
              const Icon = (it.icon && defaultIconMap[it.icon]) || Sparkles;
              return (
                <Item key={`${it.strong}-${idx}`}>
                  <IconBox>
                    <Icon />
                  </IconBox>

                  <ItemText>
                    <strong>{it.strong}</strong>
                    {it.text ? <span>{it.text}</span> : null}
                  </ItemText>
                </Item>
              );
            })}
          </Grid>
        </Card>
      </Content>
      {finePrint ? <FinePrint>{finePrint}</FinePrint> : null}
    </Wrap>
  );
}
