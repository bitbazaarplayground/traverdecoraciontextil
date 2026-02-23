import { MessageCircle } from "lucide-react";
import styled from "styled-components";
import { CONTACT } from "../config/contact";

function buildWhatsAppHref(message) {
  return `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(
    message
  )}`;
}

export default function StickyCtaButton({
  message = "Hola, quiero información sobre automatización integral.",
  label = "WhatsApp",
}) {
  const href = buildWhatsAppHref(message);

  return (
    <Wrap>
      <Fab
        href={href}
        target="_blank"
        rel="noreferrer"
        aria-label="Abrir WhatsApp"
      >
        <MessageCircle size={18} />
      </Fab>
    </Wrap>
  );
}

/* MOBILE WRAPPER */
const Wrap = styled.div`
  position: fixed;
  right: 14px;
  bottom: 14px;
  z-index: 60;

  /* Only show on mobile */
  @media (min-width: 900px) {
    display: none;
  }
`;

/* BUTTON */
const Fab = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 10px;

  padding: 12px 14px;
  border-radius: 999px;

  background: ${({ theme }) => theme.colors.primary};
  color: #0b0c0f;

  font-weight: 900;
  text-decoration: none;

  box-shadow: 0 16px 45px rgba(0, 0, 0, 0.35);
  border: 1px solid rgba(255, 255, 255, 0.12);

  transition: transform 0.15s ease, opacity 0.15s ease;

  &:hover {
    opacity: 0.95;
  }

  &:active {
    transform: translateY(1px);
  }

  /* Very small phones → icon only */
  @media (max-width: 360px) {
    span {
      display: none;
    }
    padding: 12px;
  }
`;
