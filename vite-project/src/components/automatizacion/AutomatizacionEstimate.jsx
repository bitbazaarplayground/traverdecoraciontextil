import {
  BadgeCheck,
  Blinds,
  ChevronDown,
  ChevronUp,
  Lightbulb,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Sun,
  Thermometer,
  Waves,
  Wrench,
} from "lucide-react";
import { useMemo, useState } from "react";
import styled from "styled-components";

/* =========================
       PREMIUM PACKAGE MODULE (RESPONSIVE + SMOOTH EXPAND)
    ========================= */

const Wrap = styled.section`
  margin-top: 1.6rem;
  border-radius: 26px;
  overflow: hidden;

  border: 0;
  background: radial-gradient(
      1200px 520px at 18% 0%,
      rgba(229, 0, 126, 0.16),
      transparent 55%
    ),
    radial-gradient(
      900px 520px at 85% 35%,
      rgba(255, 255, 255, 0.07),
      transparent 60%
    ),
    rgba(11, 12, 15, 0.96);

  box-shadow: 0 44px 120px rgba(0, 0, 0, 0.55);

  outline: 1px solid rgba(255, 255, 255, 0.07);
  outline-offset: -1px;
`;

const TopBar = styled.div`
  padding: 1.05rem 1.15rem;
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
  outline: 1px solid rgba(255, 255, 255, 0.1);
  outline-offset: -1px;

  font-size: 0.85rem;
  color: rgba(244, 244, 245, 0.86);

  svg {
    width: 16px;
    height: 16px;
    opacity: 0.9;
  }
`;

const PriceRow = styled.div`
  padding: 1.25rem 1.15rem 0.95rem;
  display: grid;
  gap: 0.6rem;
`;

const PriceTitle = styled.h3`
  margin: 0;
  font-size: 1.08rem;
  font-weight: 750;
  color: rgba(244, 244, 245, 0.92);
  letter-spacing: -0.01em;
`;

const PriceValue = styled.div`
  font-size: clamp(2rem, 3.5vw, 2.45rem);
  font-weight: 850;
  line-height: 1.05;
  color: rgba(244, 244, 245, 0.98);

  span {
    color: ${({ theme }) => theme.colors.primary};
    text-shadow: 0 0 22px rgba(229, 0, 126, 0.35);
  }
`;

const Desc = styled.p`
  margin: 0.25rem 0 0 0;
  max-width: 72ch;
  color: rgba(244, 244, 245, 0.72);
  line-height: 1.7;
  font-size: 0.98rem;
`;

const HeroMedia = styled.div`
  position: relative;
  width: 100%;
  height: 420px;
  overflow: hidden;
  background: #0b0c0f;

  outline: 1px solid rgba(255, 255, 255, 0.08);
  outline-offset: -1px;

  @media (max-width: 768px) {
    height: 300px;
  }
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;

  transform: scale(1.02);
  filter: saturate(1.02) contrast(1.03);
`;

const MediaGlow = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;

  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.12),
    rgba(0, 0, 0, 0.38)
  );
`;

const Content = styled.div`
  padding: 1.05rem 1.15rem 1.25rem;
`;

const Card = styled.div`
  border-radius: 22px;
  padding: 1.15rem 1.1rem;

  background: rgba(255, 255, 255, 0.035);
  outline: 1px solid rgba(255, 255, 255, 0.09);
  outline-offset: -1px;

  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
`;

const CardTitle = styled.h4`
  margin: 0 0 0.25rem 0;
  font-size: 1.05rem;
  font-weight: 850;
  color: rgba(244, 244, 245, 0.95);
`;

const CardSub = styled.p`
  margin: 0 0 0.95rem 0;
  color: rgba(244, 244, 245, 0.7);
  line-height: 1.65;
  font-size: 0.95rem;
`;

/* Responsive “package breakdown” columns.
     - Mobile: 1 column (less clutter, still compact)
     - Tablet+: 2/3 columns automatically based on space
  */
const Columns = styled.div`
  display: grid;
  gap: 0.95rem;
  grid-template-columns: 1fr;

  @media (min-width: 620px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (min-width: 980px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1.05rem;
    align-items: start;
  }
`;

const Column = styled.div`
  padding: 0.9rem;
  border-radius: 18px;

  background: rgba(255, 255, 255, 0.03);
  outline: 1px solid rgba(255, 255, 255, 0.07);
  outline-offset: -1px;
`;

const GroupHeader = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 0.75rem;
  margin-bottom: 0.65rem;
`;

const GroupTitle = styled.h5`
  margin: 0;
  font-size: 0.9rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(244, 244, 245, 0.72);
  font-weight: 850;
`;

const GroupHint = styled.span`
  font-size: 0.85rem;
  color: rgba(244, 244, 245, 0.58);
  text-align: right;
`;

const ItemsGrid = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  display: grid;
  gap: 0.55rem;
`;

const Item = styled.li`
  display: grid;
  grid-template-columns: 34px 1fr;
  gap: 0.7rem;
  align-items: center;

  padding: 0.65rem 0.7rem;
  border-radius: 16px;

  background: rgba(255, 255, 255, 0.03);
  outline: 1px solid rgba(255, 255, 255, 0.06);
  outline-offset: -1px;
`;

const IconBox = styled.div`
  width: 34px;
  height: 34px;
  border-radius: 12px;

  display: grid;
  place-items: center;

  background: rgba(229, 0, 126, 0.12);
  outline: 1px solid rgba(229, 0, 126, 0.18);
  outline-offset: -1px;

  svg {
    width: 17px;
    height: 17px;
    color: rgba(244, 244, 245, 0.95);
  }
`;

const ItemText = styled.div`
  color: rgba(244, 244, 245, 0.9);
  line-height: 1.3;

  strong {
    display: block;
    font-weight: 850;
    color: rgba(244, 244, 245, 0.96);
    letter-spacing: -0.01em;
  }

  span {
    display: block;
    font-size: 0.9rem;
    color: rgba(244, 244, 245, 0.68);
    margin-top: 0.1rem;
  }
`;

/* Smooth expand (no layout jump / no “fatigue”) */
const ExtraWrap = styled.div`
  overflow: hidden;
  transition: max-height 360ms ease, opacity 260ms ease;
  max-height: ${({ $open }) => ($open ? "1200px" : "0px")};
  opacity: ${({ $open }) => ($open ? 1 : 0)};
`;

const FadeEdge = styled.div`
  position: relative;
  margin-top: 0.35rem;

  /* subtle fade hint when collapsed */
  ${({ $show }) =>
    $show
      ? `
      &::after{
        content:"";
        position:absolute;
        left:0; right:0; bottom:-2px;
        height:44px;
        pointer-events:none;
        background: linear-gradient(
          to bottom,
          rgba(11,12,15,0),
          rgba(11,12,15,0.85)
        );
        border-radius: 18px;
      }
    `
      : ""}
`;

const ExpandRow = styled.div`
  margin-top: 0.95rem;
  display: flex;
  justify-content: flex-start;
`;

const ExpandBtn = styled.button`
  appearance: none;
  border: 0;
  cursor: pointer;

  display: inline-flex;
  align-items: center;
  gap: 0.5rem;

  padding: 0.6rem 0.8rem;
  border-radius: 999px;

  background: rgba(255, 255, 255, 0.06);
  outline: 1px solid rgba(255, 255, 255, 0.1);
  outline-offset: -1px;

  color: rgba(244, 244, 245, 0.9);
  font-weight: 750;
  font-size: 0.9rem;

  svg {
    width: 16px;
    height: 16px;
    opacity: 0.92;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.08);
  }
`;

const FinePrint = styled.p`
  margin: 0.95rem 1.15rem 1.15rem;
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
  mantenimiento: Wrench,
  garantia: BadgeCheck,
  extra: Sparkles,
};

function normalizeGroup(key) {
  const k = (key || "").toLowerCase();
  if (k.includes("interior")) return "interior";
  if (k.includes("exterior")) return "exterior";
  if (k.includes("control")) return "control";
  if (k.includes("servicio")) return "control";
  return "extra";
}

const groupMeta = {
  interior: { title: "Interior", hint: "Cortinas, estores, privacidad" },
  exterior: { title: "Exterior", hint: "Toldos, protección solar" },
  control: { title: "Control & servicio", hint: "App, instalación, soporte" },
  extra: { title: "Extras", hint: "Opcionales y ampliaciones" },
};

export default function AutomatizacionEstimate({
  priceText = "Desde",
  priceValue = "~3.500€",
  description,
  imageSrc,
  imageAlt,
  title = "Qué incluye normalmente",
  sub = "Un ejemplo realista para un hogar medio. Ajustamos motores, tejidos y sensores según medidas y uso.",
  items = [],
  finePrint,
  perks = [
    { icon: "garantia", label: "Configuración y puesta en marcha" },
    { icon: "mantenimiento", label: "Mantenimiento incluido 2 años" },
  ],
}) {
  const [expanded, setExpanded] = useState(false);

  // Build buckets once
  const buckets = useMemo(() => {
    const map = { interior: [], exterior: [], control: [], extra: [] };

    items.forEach((it) => {
      const explicit = normalizeGroup(it.group);

      if (explicit !== "extra") {
        map[explicit].push(it);
        return;
      }

      const icon = (it.icon || "").toLowerCase();
      if (icon === "cortina" || icon === "persiana") map.interior.push(it);
      else if (icon === "toldo") map.exterior.push(it);
      else if (
        icon === "app" ||
        icon === "instalacion" ||
        icon === "sensores" ||
        icon === "luz"
      )
        map.control.push(it);
      else map.extra.push(it);
    });

    // Only render non-empty sections (keeps layout tight)
    return Object.entries(map)
      .filter(([, arr]) => arr.length > 0)
      .map(([key, arr]) => ({
        key,
        meta: groupMeta[key] || groupMeta.extra,
        items: arr,
      }));
  }, [items]);

  // Less scroll fatigue: show a small “preview” per column
  const COLLAPSED_PER_COLUMN = 4;

  const hasMore = useMemo(() => {
    return buckets.some((b) => b.items.length > COLLAPSED_PER_COLUMN);
  }, [buckets]);

  return (
    <Wrap>
      {/* Top trust bar */}
      <TopBar>
        <Chips>
          {perks.map((p) => {
            const Icon = defaultIconMap[p.icon] || Sparkles;
            return (
              <Chip key={p.label}>
                <Icon />
                {p.label}
              </Chip>
            );
          })}
        </Chips>
      </TopBar>

      {/* PRICE + EXPLANATION FIRST */}
      <PriceRow>
        <div>
          <PriceTitle>Inversión orientativa</PriceTitle>
          <PriceValue>
            {priceText} <span>{priceValue}</span>
          </PriceValue>
          {description ? <Desc>{description}</Desc> : null}
        </div>
      </PriceRow>

      {/* IMAGE AFTER EXPLANATION */}
      <HeroMedia>
        <Img src={imageSrc} alt={imageAlt} loading="eager" />
        <MediaGlow />
      </HeroMedia>

      {/* INCLUDED */}
      <Content>
        <Card>
          <CardTitle>{title}</CardTitle>
          <CardSub>{sub}</CardSub>

          <Columns>
            {buckets.map((section) => {
              const preview = section.items.slice(0, COLLAPSED_PER_COLUMN);
              const extra = section.items.slice(COLLAPSED_PER_COLUMN);
              const showFade = !expanded && extra.length > 0;

              return (
                <Column key={section.key}>
                  <GroupHeader>
                    <GroupTitle>{section.meta.title}</GroupTitle>
                    <GroupHint>{section.meta.hint}</GroupHint>
                  </GroupHeader>

                  <FadeEdge $show={showFade}>
                    <ItemsGrid>
                      {preview.map((it, idx) => {
                        const Icon =
                          (it.icon && defaultIconMap[it.icon]) || Sparkles;
                        return (
                          <Item key={`${section.key}-${it.strong}-${idx}`}>
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
                    </ItemsGrid>

                    {/* Smooth expand content */}
                    {extra.length > 0 ? (
                      <ExtraWrap $open={expanded}>
                        <ItemsGrid style={{ marginTop: "0.55rem" }}>
                          {extra.map((it, idx) => {
                            const Icon =
                              (it.icon && defaultIconMap[it.icon]) || Sparkles;
                            return (
                              <Item
                                key={`${section.key}-extra-${it.strong}-${idx}`}
                              >
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
                        </ItemsGrid>
                      </ExtraWrap>
                    ) : null}
                  </FadeEdge>
                </Column>
              );
            })}
          </Columns>

          {/* Single dropdown (kept), expands smoothly */}
          {hasMore ? (
            <ExpandRow>
              <ExpandBtn
                type="button"
                onClick={() => setExpanded((v) => !v)}
                aria-expanded={expanded}
              >
                {expanded ? (
                  <>
                    <ChevronUp />
                    Ver menos
                  </>
                ) : (
                  <>
                    <ChevronDown />
                    Ver todo
                  </>
                )}
              </ExpandBtn>
            </ExpandRow>
          ) : null}
        </Card>
      </Content>

      {finePrint ? <FinePrint>{finePrint}</FinePrint> : null}
    </Wrap>
  );
}
