import styled from "styled-components";

export const Wrap = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 2.25rem 1.25rem;
  display: grid;
  gap: 1.25rem;
`;

export const Card = styled.div`
  border: 1px solid rgba(17, 17, 17, 0.12);
  background: rgba(255, 255, 255, 0.7);
  border-radius: 18px;
  padding: 1.1rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04);
`;

export const Drawer = styled.div`
  border: 1px solid rgba(17, 17, 17, 0.12);
  background: rgba(255, 255, 255, 0.55);
  border-radius: 18px;
  padding: 1.1rem;
`;

export const Row = styled.div`
  display: grid;
  gap: 0.75rem;

  @media (min-width: 760px) {
    grid-template-columns: 1fr 1fr;
    align-items: end;
  }
`;

export const Label = styled.label`
  display: grid;
  gap: 0.35rem;
  font-size: 0.9rem;

  span {
    font-weight: 800;
    color: rgba(17, 17, 17, 0.78);
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.85rem 0.9rem;
  border-radius: 14px;
  border: 1px solid rgba(17, 17, 17, 0.12);
  background: rgba(17, 17, 17, 0.02);
  outline: none;
`;

export const Button = styled.button`
  padding: 0.9rem 1rem;
  border-radius: 14px;
  border: 0;
  font-weight: 900;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-size: 0.75rem;
  cursor: pointer;
  background: ${({ $variant }) =>
    $variant === "danger" ? "#ffdfdf" : "#f2f2f2"};

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const LinkButton = styled.button`
  border: 0;
  background: transparent;
  padding: 0;
  text-align: left;
  cursor: pointer;
  font-weight: 800;
  color: rgba(17, 17, 17, 0.78);
  text-decoration: underline;
  text-underline-offset: 3px;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.92rem;

  th,
  td {
    text-align: left;
    padding: 0.7rem 0.55rem;
    border-bottom: 1px solid rgba(17, 17, 17, 0.1);
    vertical-align: top;
  }

  th {
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    opacity: 0.7;
  }
`;
