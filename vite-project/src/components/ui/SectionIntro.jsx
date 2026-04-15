// src/components/ui/SectionIntro.jsx
import styled from "styled-components";

/**
 * Reusable section header:
 * - Kicker with gold underline
 * - Title (supports <span> for primary color)
 * - Lead under title
 *
 * Props:
 * - kicker?: string
 * - title: ReactNode
 * - lead?: ReactNode
 * - align?: "left" | "center"
 * - maxWidth?: string (e.g. "920px")
 * - className?: string
 * - children?: ReactNode (for extras like BenefitsStrip)
 */
export default function SectionIntro({
  kicker,
  title,
  lead,
  align = "left",
  maxWidth = "920px",
  className,
  children,
}) {
  return (
    <Wrap
      $align={align}
      $maxWidth={maxWidth}
      data-align={align}
      className={className}
    >
      {kicker ? <Kicker>{kicker}</Kicker> : null}
      <Title>{title}</Title>
      {lead ? <Lead>{lead}</Lead> : null}
      {children}
    </Wrap>
  );
}

const Wrap = styled.div`
  max-width: ${({ $maxWidth }) => $maxWidth};
  margin: ${({ $align }) => ($align === "center" ? "0 auto 3rem" : "0 0 3rem")};
  text-align: ${({ $align }) => $align};

  @media (max-width: 768px) {
    margin-bottom: 2rem;
  }
`;

const Kicker = styled.p`
  margin: 0 0 0.55rem 0;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  font-size: 0.82rem;
  color: rgba(17, 17, 17, 0.55);
  position: relative;
  display: inline-block;
  padding-bottom: 0.55rem;

  &:after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0.1rem;
    width: 48px;
    height: 1px;
    background: rgba(196, 151, 98, 0.65);
  }
`;

const Title = styled.h2`
  margin: 0;
  font-size: 2.15rem;
  font-weight: 600;
  line-height: 1.12;
  letter-spacing: -0.02em;
  color: #111;

  span {
    color: ${({ theme }) => theme.colors.primary};
  }

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Lead = styled.p`
  margin: 0.8rem 0 0;
  max-width: min(860px, 92%);
  font-size: 1.06rem;
  line-height: 1.8;
  color: rgba(17, 17, 17, 0.68);
  text-wrap: pretty;

  ${Wrap}[data-align="center"] & {
    margin-left: auto;
    margin-right: auto;
  }

  @media (max-width: 768px) {
    max-width: 100%;
    font-size: 1rem;
    line-height: 1.72;
  }
`;
