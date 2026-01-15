import { BadgeCheck, Sparkles } from "lucide-react";
import styled from "styled-components";

const Wrap = styled.div`
  padding: 0.9rem 1.15rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.9rem;
  flex-wrap: wrap;

  border-top: 1px solid rgba(255, 255, 255, 0.08);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);

  background: radial-gradient(
      900px 240px at 12% 10%,
      rgba(229, 0, 126, 0.22),
      transparent 60%
    ),
    rgba(255, 255, 255, 0.02);

  backdrop-filter: blur(10px);
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  min-width: min(520px, 100%);
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 14px;
  display: grid;
  place-items: center;

  background: rgba(229, 0, 126, 0.14);
  outline: 1px solid rgba(229, 0, 126, 0.22);
`;

const Text = styled.div`
  display: grid;
  gap: 0.18rem;
`;

const Pill = styled.span`
  width: fit-content;
  padding: 0.38rem 0.6rem;
  border-radius: 999px;
  font-size: 0.78rem;
  font-weight: 850;
  letter-spacing: 0.08em;
  text-transform: uppercase;

  background: rgba(255, 255, 255, 0.06);
  outline: 1px solid rgba(255, 255, 255, 0.1);
`;

const Title = styled.div`
  font-size: 0.98rem;
  font-weight: 850;

  span {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Note = styled.div`
  font-size: 0.88rem;
  color: gray;
`;

const Right = styled.div`
  margin-left: auto;
`;

const Badge = styled.div`
  display: inline-flex;
  gap: 0.45rem;
  padding: 0.5rem 0.7rem;
  border-radius: 999px;

  background: rgba(255, 255, 255, 0.06);
  outline: 1px solid rgba(255, 255, 255, 0.1);

  font-size: 0.85rem;
  font-weight: 750;
`;

export default function PromoBanner({
  label = "Promoción",
  title = "Alexa gratis",
  subtitle = "incluida al contratar este pack",
  note = "Unidades limitadas. Válido durante la campaña.",
}) {
  return (
    <Wrap>
      <Left>
        <Icon>
          <Sparkles size={18} />
        </Icon>

        <Text>
          <Pill>{label}</Pill>
          <Title>
            <span>{title}</span> — {subtitle}
          </Title>
          <Note>{note}</Note>
        </Text>
      </Left>

      <Right>
        <Badge>
          <BadgeCheck size={16} />
          Incluida sin coste
        </Badge>
      </Right>
    </Wrap>
  );
}
