import { X } from "lucide-react";
import { useEffect, useRef } from "react";
import styled from "styled-components";
import AsesoramientoForm from "./AsesoramientoForm";

/* =========================
   Drawer UI
========================= */

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 5000;

  background: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);

  display: flex;
  justify-content: flex-end;
`;

const Drawer = styled.aside`
  width: min(520px, 92vw);
  height: 100%;
  background: #fff;

  border-left: 1px solid rgba(17, 17, 17, 0.1);
  box-shadow: -40px 0 120px rgba(0, 0, 0, 0.25);

  display: grid;
  grid-template-rows: auto 1fr;

  transform: translateX(${({ $open }) => ($open ? "0%" : "100%")});
  transition: transform 320ms cubic-bezier(0.22, 1, 0.36, 1);

  @media (max-width: 768px) {
    width: 100%;
    border-left: 0;
    border-top-left-radius: 18px;
    border-top-right-radius: 18px;
  }
`;

const Top = styled.div`
  padding: 1.05rem 1.05rem 0.95rem;
  border-bottom: 1px solid rgba(17, 17, 17, 0.08);
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
`;

const TitleBlock = styled.div`
  display: grid;
  gap: 0.35rem;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 1.05rem;
  font-weight: 900;
  color: #111;
`;

const Sub = styled.p`
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.55;
  color: rgba(17, 17, 17, 0.65);
`;

const ContextPill = styled.div`
  margin-top: 0.2rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;

  padding: 0.45rem 0.75rem;
  border-radius: 999px;

  background: rgba(17, 17, 17, 0.05);
  border: 1px solid rgba(17, 17, 17, 0.08);

  font-size: 0.85rem;
  color: rgba(17, 17, 17, 0.7);

  strong {
    color: rgba(17, 17, 17, 0.9);
    font-weight: 800;
  }
`;

const CloseBtn = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 12px;
  border: 1px solid rgba(17, 17, 17, 0.1);
  background: rgba(17, 17, 17, 0.03);

  display: grid;
  place-items: center;

  cursor: pointer;

  svg {
    width: 18px;
    height: 18px;
    color: rgba(17, 17, 17, 0.7);
  }
`;

const Body = styled.div`
  padding: 1rem 1.05rem 1.2rem;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
`;

/**
 * Right-side drawer to request proposals.
 *
 * Props:
 * - open: boolean
 * - onClose: () => void
 * - packLabel: string (e.g. "Dormitorio")
 */
export default function AsesoramientoModal({ open, onClose, packLabel }) {
  const closeBtnRef = useRef(null);
  const lastActiveRef = useRef(null);

  // ESC close + scroll lock + focus management
  useEffect(() => {
    if (!open) return;

    lastActiveRef.current = document.activeElement;

    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", onKey);

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // focus close button for accessibility
    setTimeout(() => closeBtnRef.current?.focus(), 0);

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;

      // restore focus
      if (lastActiveRef.current?.focus) lastActiveRef.current.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <Overlay
      role="dialog"
      aria-modal="true"
      aria-label="Formulario de asesoramiento"
      onMouseDown={(e) => {
        // click outside drawer closes
        if (e.target === e.currentTarget) onClose?.();
      }}
    >
      <Drawer $open={open}>
        <Top>
          <TitleBlock>
            <Title>Solicitar asesoramiento</Title>
            <Sub>Déjanos tus datos y te respondemos lo antes posible.</Sub>

            {packLabel && (
              <ContextPill>
                Solicitud: <strong>{packLabel}</strong>
              </ContextPill>
            )}
          </TitleBlock>

          <CloseBtn
            ref={closeBtnRef}
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
          >
            <X />
          </CloseBtn>
        </Top>

        <Body>
          <AsesoramientoForm packLabel={packLabel} />
        </Body>
      </Drawer>
    </Overlay>
  );
}
