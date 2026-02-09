import { useRef } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { CONTACT } from "../config/contact";
import { trackEvent } from "../lib/analytics";

export default function Footer({ onOpenAsesoramiento }) {
  const year = new Date().getFullYear();
  const wrapRef = useRef(null);

  const setGlow = (e) => {
    const el = wrapRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    el.style.setProperty("--mx", `${x}px`);
    el.style.setProperty("--my", `${y}px`);
    el.style.setProperty("--glow", "1");
  };

  const clearGlow = () => {
    const el = wrapRef.current;
    if (!el) return;
    el.style.setProperty("--glow", "0");
  };

  return (
    <Wrap
      ref={wrapRef}
      onMouseMove={setGlow}
      onMouseEnter={() => {
        // ensure it fades in smoothly when entering
        wrapRef.current?.style.setProperty("--glow", "1");
      }}
      onMouseLeave={clearGlow}
    >
      <GlowLayer aria-hidden="true" />

      <Inner>
        <Top>
          <Brand>
            <LogoRow to="/" aria-label={`${CONTACT.siteName} - Inicio`}>
              <LogoImg src="/logo.png" alt={CONTACT.siteName} loading="lazy" />
              <BrandText>
                <BrandName>
                  {CONTACT.siteName}
                  <BrandDot aria-hidden="true" />
                </BrandName>
                <BrandTag>
                  Decoración textil · Protección solar · A medida
                </BrandTag>
              </BrandText>
            </LogoRow>

            <Small>
              Servicio en <strong>Castellón</strong> y <strong>Valencia</strong>{" "}
              (provincia). Proyectos seleccionados fuera de zona según alcance.
            </Small>

            <Hours>
              <HoursTitle>Horario</HoursTitle>
              <HoursText>
                Lunes – Viernes: <strong>9:30–14:00</strong> ·{" "}
                <strong>17:00–19:00</strong>
              </HoursText>
            </Hours>

            <AccentLine aria-hidden="true" />
          </Brand>

          {/* Desktop columns */}
          <Cols aria-label="Enlaces del sitio">
            <Col>
              <ColTitle>Servicios</ColTitle>
              <ColLink to="/cortinas-estores">Cortinas & estores</ColLink>
              <ColLink to="/toldos-proteccionsolar">Toldos</ColLink>
              <ColLink to="/automatizacion">Automatización</ColLink>
              <ColLink to="/mosquiteras">Mosquiteras</ColLink>
              <ColLink to="/panel-japones">Panel japonés</ColLink>
              <ColLink to="/venecianas">Venecianas</ColLink>
            </Col>

            <Col>
              <ColTitle>Empresa</ColTitle>
              <ColLink to="/propuestas">Propuestas</ColLink>
              <ColLink to="/services">Servicios</ColLink>
              <ColLink to="/contact">Contacto</ColLink>

              <Divider />

              <ColLink to="/aviso-legal">Aviso legal</ColLink>
              <ColLink to="/politica-privacidad">
                Política de privacidad
              </ColLink>
              <ColLink to="/politica-cookies">Política de cookies</ColLink>
            </Col>

            <Col>
              <ColTitle>Contacto</ColTitle>

              <ActionRow>
                <Action
                  href={`tel:${CONTACT.phoneLandlineTel}`}
                  aria-label="Llamar por teléfono"
                >
                  Llamar: {CONTACT.phoneLandline}
                </Action>
              </ActionRow>

              <ActionRow>
                <Action
                  href={CONTACT.whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Abrir WhatsApp"
                >
                  WhatsApp: +34 {CONTACT.whatsappNumber}
                </Action>
              </ActionRow>

              <ActionRow>
                <Action
                  href={`mailto:${CONTACT.email}`}
                  aria-label="Enviar email"
                >
                  Email: {CONTACT.email}
                </Action>
              </ActionRow>

              <ActionRow>
                <Action
                  href={CONTACT.mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Abrir ubicación en Google Maps"
                >
                  {CONTACT.address.streetAddress},{" "}
                  {CONTACT.address.addressLocality}
                </Action>
              </ActionRow>

              <ActionRow>
                <Action
                  href={CONTACT.facebookUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Abrir Facebook"
                >
                  Facebook
                </Action>
              </ActionRow>

              <FooterCTA>
                <CTAButton to="/contact">Pedir asesoramiento</CTAButton>
                <CTAButtonGhost
                  href={CONTACT.whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  WhatsApp
                </CTAButtonGhost>
              </FooterCTA>
            </Col>
          </Cols>

          {/* Mobile accordion */}
          <MobileCols aria-label="Enlaces del sitio (móvil)">
            <Acc>
              <AccSummary>Servicios</AccSummary>
              <AccBody>
                <MobileLink to="/cortinas-estores">
                  Cortinas & estores
                </MobileLink>
                <MobileLink to="/toldos-proteccionsolar">Toldos</MobileLink>
                <MobileLink to="/automatizacion">Automatización</MobileLink>
                <MobileLink to="/mosquiteras">Mosquiteras</MobileLink>
                <MobileLink to="/panel-japones">Panel japonés</MobileLink>
                <MobileLink to="/venecianas">Venecianas</MobileLink>
              </AccBody>
            </Acc>

            <Acc>
              <AccSummary>Empresa</AccSummary>
              <AccBody>
                <MobileLink to="/propuestas">Propuestas</MobileLink>
                <MobileLink to="/services">Servicios</MobileLink>
                <MobileLink to="/contact">Contacto</MobileLink>

                <Divider />

                <MobileLink to="/aviso-legal">Aviso legal</MobileLink>
                <MobileLink to="/politica-privacidad">
                  Política de privacidad
                </MobileLink>
                <MobileLink to="/politica-cookies">
                  Política de cookies
                </MobileLink>
              </AccBody>
            </Acc>

            <Acc>
              <AccSummary>Contacto</AccSummary>
              <AccBody>
                <ActionRow>
                  <MobileAction href={`tel:${CONTACT.phoneLandlineTel}`}>
                    Llamar: {CONTACT.phoneLandline}
                  </MobileAction>
                </ActionRow>
                <ActionRow>
                  <MobileAction
                    href={CONTACT.whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    WhatsApp: +34 {CONTACT.whatsappNumber}
                  </MobileAction>
                </ActionRow>
                <ActionRow>
                  <MobileAction href={`mailto:${CONTACT.email}`}>
                    Email: {CONTACT.email}
                  </MobileAction>
                </ActionRow>
                <ActionRow>
                  <MobileAction
                    href={CONTACT.mapsUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {CONTACT.address.streetAddress},{" "}
                    {CONTACT.address.addressLocality}
                  </MobileAction>
                </ActionRow>
                <ActionRow>
                  <MobileAction
                    href={CONTACT.facebookUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Facebook
                  </MobileAction>
                </ActionRow>

                <FooterCTA>
                  <CTAButton
                    as="button"
                    type="button"
                    onClick={() => {
                      trackEvent("open_asesoramiento", { source: "footer" });
                      onOpenAsesoramiento?.("General");
                    }}
                  >
                    Pedir asesoramiento
                  </CTAButton>

                  <CTAButtonGhost
                    href={CONTACT.whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() =>
                      trackEvent("whatsapp_click", { source: "footer" })
                    }
                  >
                    WhatsApp
                  </CTAButtonGhost>
                </FooterCTA>
              </AccBody>
            </Acc>
          </MobileCols>
        </Top>

        <Bottom>
          <Copy>
            © {year} {CONTACT.siteName}. Todos los derechos reservados.
          </Copy>
          <MiniLinks>
            <MiniLink to="/contact">Pedir asesoramiento</MiniLink>
            <Dot>·</Dot>
            <MiniLink to="/propuestas">Ver propuestas</MiniLink>
          </MiniLinks>
        </Bottom>
      </Inner>
    </Wrap>
  );
}

/* =========================
   STYLES
========================= */

const Wrap = styled.footer`
  background: #0b0c0f;
  color: rgba(244, 244, 245, 0.92);
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  position: relative;
  overflow: hidden;

  --mx: 50%;
  --my: 30%;
  --glow: 0;
`;
const GlowLayer = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  opacity: 0;
  transition: opacity 420ms ease;
  will-change: background, opacity;

  @media (hover: hover) and (pointer: fine) {
    opacity: calc(var(--glow) * 0.9);

    background: radial-gradient(
      520px 360px at var(--mx) var(--my),
      rgba(229, 0, 126, 0.14),
      rgba(229, 0, 126, 0.08) 30%,
      rgba(229, 0, 126, 0) 60%
    );
  }
`;

const Inner = styled.div`
  width: min(1120px, calc(100% - 2.4rem));
  margin: 0 auto;
  padding: 3.2rem 0 1.6rem;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    width: calc(100% - 2rem);
    padding: 2.4rem 0 1.3rem;
  }
`;

const Top = styled.div`
  display: grid;
  gap: 2rem;

  @media (min-width: 980px) {
    grid-template-columns: 1.1fr 1.9fr;
    gap: 2.2rem;
  }
`;

const Brand = styled.div``;

const LogoRow = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.9rem;
  text-decoration: none;
  color: inherit;
`;

const LogoImg = styled.img`
  width: 44px;
  height: 44px;
  object-fit: contain;
  border-radius: 10px;

  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(229, 0, 126, 0.35);
  padding: 6px;

  box-shadow: 0 0 0 1px rgba(229, 0, 126, 0.12),
    0 14px 34px rgba(229, 0, 126, 0.12);
`;

const BrandText = styled.div`
  display: grid;
  gap: 0.15rem;
`;

const BrandName = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  font-weight: 900;
  letter-spacing: 0.01em;
`;

const BrandDot = styled.span`
  width: 10px;
  height: 10px;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.primary};
  box-shadow: 0 0 0 1px rgba(229, 0, 126, 0.22),
    0 12px 28px rgba(229, 0, 126, 0.22);
`;

const BrandTag = styled.div`
  font-size: 0.95rem;
  color: rgba(244, 244, 245, 0.7);
`;

const Small = styled.p`
  margin: 1.1rem 0 0;
  line-height: 1.7;
  color: rgba(244, 244, 245, 0.72);

  strong {
    color: rgba(244, 244, 245, 0.92);
  }
`;

const Hours = styled.div`
  margin-top: 1rem;
  padding: 0.95rem 1rem;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
`;

const HoursTitle = styled.div`
  font-size: 0.78rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(244, 244, 245, 0.72);
`;

const HoursText = styled.div`
  margin-top: 0.35rem;
  color: rgba(244, 244, 245, 0.86);
`;

const AccentLine = styled.div`
  margin-top: 1.15rem;
  height: 2px;
  width: 78px;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.primary};
  opacity: 0.9;
`;

const Cols = styled.div`
  display: none;

  @media (min-width: 760px) {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.2rem;
  }
`;

const Col = styled.div`
  display: grid;
  align-content: start;
  gap: 0.6rem;
`;

const ColTitle = styled.div`
  font-size: 0.78rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(244, 244, 245, 0.78);
  margin-bottom: 0.35rem;

  display: inline-flex;
  align-items: center;
  gap: 0.6rem;

  &::after {
    content: "";
    width: 34px;
    height: 2px;
    border-radius: 999px;
    background: ${({ theme }) => theme.colors.primary};
    opacity: 0.75;
  }
`;

const ColLink = styled(Link)`
  position: relative;
  text-decoration: none;
  color: rgba(244, 244, 245, 0.86);
  line-height: 1.55;
  width: fit-content;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -3px;
    width: 0%;
    height: 2px;
    border-radius: 999px;
    background: ${({ theme }) => theme.colors.primary};
    opacity: 0.85;
    transition: width 220ms ease;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
  &:hover::after {
    width: 100%;
  }

  &:focus-visible {
    outline: 3px solid rgba(229, 0, 126, 0.28);
    outline-offset: 3px;
    border-radius: 10px;
  }
`;

const Divider = styled.div`
  height: 1px;
  background: rgba(255, 255, 255, 0.08);
  margin: 0.4rem 0;
`;

const ActionRow = styled.div``;

const Action = styled.a`
  position: relative;
  text-decoration: none;
  color: rgba(244, 244, 245, 0.86);
  line-height: 1.55;
  width: fit-content;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -3px;
    width: 0%;
    height: 2px;
    border-radius: 999px;
    background: ${({ theme }) => theme.colors.primary};
    opacity: 0.85;
    transition: width 220ms ease;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
  &:hover::after {
    width: 100%;
  }

  &:focus-visible {
    outline: 3px solid rgba(229, 0, 126, 0.28);
    outline-offset: 3px;
    border-radius: 10px;
  }
`;

const FooterCTA = styled.div`
  margin-top: 0.8rem;
  display: flex;
  gap: 0.6rem;
  flex-wrap: wrap;
`;

const CTAButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.72rem 1.05rem;
  border-radius: 999px;

  background: ${({ theme }) => theme.colors.primary};
  color: #0b0c0f;
  font-weight: 900;
  text-decoration: none;

  box-shadow: 0 0 0 1px rgba(229, 0, 126, 0.22),
    0 16px 40px rgba(229, 0, 126, 0.25);

  transition: transform 220ms ease, opacity 220ms ease, box-shadow 220ms ease;

  &:hover {
    opacity: 0.96;
    transform: translateY(-1px);
    box-shadow: 0 0 0 1px rgba(229, 0, 126, 0.28),
      0 22px 55px rgba(229, 0, 126, 0.32);
  }

  &:focus-visible {
    outline: 3px solid rgba(229, 0, 126, 0.28);
    outline-offset: 3px;
  }
`;

const CTAButtonGhost = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.72rem 1.05rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.14);
  color: rgba(244, 244, 245, 0.92);
  font-weight: 800;
  text-decoration: none;

  transition: transform 220ms ease, border-color 220ms ease, color 220ms ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-1px);
  }

  &:focus-visible {
    outline: 3px solid rgba(229, 0, 126, 0.28);
    outline-offset: 3px;
  }
`;

/* Mobile accordion */
const MobileCols = styled.div`
  display: grid;
  gap: 0.75rem;

  @media (min-width: 760px) {
    display: none;
  }
`;

const Acc = styled.details`
  border-radius: 16px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);

  &[open] {
    border-color: rgba(229, 0, 126, 0.28);
    box-shadow: 0 0 0 1px rgba(229, 0, 126, 0.12),
      0 20px 60px rgba(0, 0, 0, 0.35);
  }

  &[open] summary::after {
    transform: rotate(45deg);
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const AccSummary = styled.summary`
  list-style: none;
  cursor: pointer;
  padding: 1rem 1rem; /* a bit bigger tap target */

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.8rem;

  font-weight: 900;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-size: 0.78rem;
  color: rgba(244, 244, 245, 0.88);

  &::-webkit-details-marker {
    display: none;
  }

  &:focus-visible {
    outline: 3px solid rgba(229, 0, 126, 0.28);
    outline-offset: 3px;
    border-radius: 12px;
  }

  &::after {
    content: "+";
    font-size: 1.15rem;
    line-height: 1;
    color: rgba(244, 244, 245, 0.45);
    transition: transform 0.2s ease, color 0.2s ease;
  }
`;

const AccBody = styled.div`
  padding: 0 1rem 1rem;
  display: grid;
  gap: 0.6rem;
`;

const MobileLink = styled(ColLink)`
  width: 100%;
  padding: 0.15rem 0;
  &::after {
    bottom: -2px;
  }
`;

const MobileAction = styled(Action)`
  width: 100%;
  padding: 0.15rem 0;
  &::after {
    bottom: -2px;
  }
`;

const Bottom = styled.div`
  margin-top: 2.2rem;
  padding-top: 1.2rem;
  border-top: 1px solid rgba(229, 0, 126, 0.22);

  display: flex;
  gap: 0.8rem;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const Copy = styled.div`
  font-size: 0.95rem;
  color: rgba(244, 244, 245, 0.68);
`;

const MiniLinks = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  flex-wrap: wrap;
`;

const MiniLink = styled(Link)`
  text-decoration: none;
  color: rgba(244, 244, 245, 0.78);

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Dot = styled.span`
  color: rgba(244, 244, 245, 0.35);
`;
