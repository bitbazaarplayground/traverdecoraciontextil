import styled from "styled-components";

/* =========================
   WRAPPER (MERGED FEEL)
========================= */

const EstimateBlock = styled.div`
  margin-top: 1.8rem;
  display: grid;
  gap: 1.25rem;
`;

/* =========================
   PRICE ANCHOR (PREMIUM)
========================= */

const PriceCard = styled.div`
  border-radius: 22px;
  padding: 1.8rem;
  background: radial-gradient(
      900px 300px at 20% 0%,
      rgba(0, 0, 0, 0.03),
      transparent 60%
    ),
    rgba(0, 0, 0, 0.02);
  border: 1px solid rgba(0, 0, 0, 0.06);
`;

const PriceBig = styled.div`
  font-size: 2rem;
  font-weight: 750;
  margin: 0.35rem 0 0.6rem 0;

  span {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const PriceSmall = styled.p`
  margin: 0;
  font-size: 0.98rem;
  line-height: 1.65;
  color: rgba(17, 17, 17, 0.65);
`;

/* =========================
   INCLUSIONS (IMAGE + LIST)
========================= */

const InclusionsGrid = styled.div`
  display: grid;
  gap: 1.25rem;

  @media (min-width: 980px) {
    grid-template-columns: 1.05fr 0.95fr;
    align-items: start;
  }
`;

const InclusionsMedia = styled.div`
  border-radius: 22px;
  overflow: hidden;
  border: 1px solid rgba(17, 17, 17, 0.08);
  background: #0b0c0f;
  box-shadow: 0 30px 90px rgba(0, 0, 0, 0.12);
`;

const InclusionsImg = styled.img`
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
`;

const InclusionsCard = styled.div`
  border-radius: 22px;
  border: 1px solid rgba(17, 17, 17, 0.08);
  background: #fff;
  padding: 1.35rem;
  box-shadow: 0 30px 90px rgba(0, 0, 0, 0.08);
`;

const InclusionsTitle = styled.h3`
  font-size: 1.35rem;
  font-weight: 650;
  color: #111;
  margin-bottom: 0.35rem;
`;

const InclusionsSub = styled.p`
  color: rgba(17, 17, 17, 0.68);
  line-height: 1.65;
  margin-bottom: 1rem;
`;

const InclusionsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 0.65rem;
`;

const Inclusion = styled.li`
  display: grid;
  grid-template-columns: 10px 1fr;
  gap: 0.7rem;
  align-items: start;

  color: rgba(17, 17, 17, 0.85);
  line-height: 1.55;

  strong {
    color: rgba(17, 17, 17, 0.95);
    font-weight: 700;
  }
`;

const Dot = styled.span`
  width: 10px;
  height: 10px;
  margin-top: 0.35rem;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.primary};
  opacity: 0.9;
`;

const FinePrint = styled.p`
  margin-top: 0.9rem;
  font-size: 0.92rem;
  line-height: 1.6;
  color: rgba(17, 17, 17, 0.6);
`;

/* =========================
   COMPONENT
========================= */

/**
 * Premium estimate block: price anchor + what’s included.
 *
 * Props:
 * - kicker: string (e.g. "Orientativo")
 * - priceText: string (e.g. "Desde")
 * - priceValue: string (e.g. "~3.500€")
 * - description: string
 * - imageSrc: string
 * - imageAlt: string
 * - title: string
 * - sub: string
 * - items: Array<{ strong: string, text?: string }>
 * - finePrint: string
 * - KickerComponent: optional React component (your <Kicker /> styled component)
 */
export default function AutomatizacionEstimate({
  kicker = "Orientativo",
  priceText = "Desde",
  priceValue = "~3.500€",
  description,
  imageSrc,
  imageAlt,
  title = "Qué suele incluir un sistema completo",
  sub = "Orientativo para un hogar medio. Ajustamos número de motores, tejidos y sensores según medidas y uso real.",
  items = [],
  finePrint,
  KickerComponent,
}) {
  return (
    <EstimateBlock>
      <PriceCard>
        {KickerComponent ? <KickerComponent>{kicker}</KickerComponent> : null}

        <PriceBig>
          {priceText} <span>{priceValue}</span>
        </PriceBig>

        {description ? <PriceSmall>{description}</PriceSmall> : null}
      </PriceCard>

      <InclusionsGrid>
        <InclusionsMedia>
          <InclusionsImg src={imageSrc} alt={imageAlt} loading="lazy" />
        </InclusionsMedia>

        <InclusionsCard>
          <InclusionsTitle>{title}</InclusionsTitle>
          <InclusionsSub>{sub}</InclusionsSub>

          <InclusionsList>
            {items.map((it, idx) => (
              <Inclusion key={`${it.strong}-${idx}`}>
                <Dot />
                <div>
                  <strong>{it.strong}</strong>
                  {it.text ? ` ${it.text}` : null}
                </div>
              </Inclusion>
            ))}
          </InclusionsList>

          {finePrint ? <FinePrint>{finePrint}</FinePrint> : null}
        </InclusionsCard>
      </InclusionsGrid>
    </EstimateBlock>
  );
}
