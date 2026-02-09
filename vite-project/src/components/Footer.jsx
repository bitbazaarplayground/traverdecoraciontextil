import { Link } from "react-router-dom";
import styled from "styled-components";
import { CONTACT } from "../config/contact";
import { trackEvent } from "../lib/analytics";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <Wrap>
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
`;

const Inner = styled.div`
  width: min(1120px, calc(100% - 2.4rem));
  margin: 0 auto;
  padding: 3.2rem 0 1.6rem;

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

// OPCION 2:
// import { Link } from "react-router-dom";
// import styled from "styled-components";
// import { CONTACT } from "../config/contact";

// export default function Footer() {
//   const year = new Date().getFullYear();

//   return (
//     <Wrap>
//       <Inner>
//         <Top>
//           <Brand>
//             <LogoRow to="/" aria-label={`${CONTACT.siteName} - Inicio`}>
//               <LogoImg src="/logo.png" alt={CONTACT.siteName} loading="lazy" />
//               <BrandText>
//                 <BrandName>{CONTACT.siteName}</BrandName>
//                 <BrandTag>Decoración textil · Protección solar · A medida</BrandTag>
//               </BrandText>
//             </LogoRow>

//             <Small>
//               Servicio en <strong>Castellón</strong> y <strong>Valencia</strong>{" "}
//               (provincia). Proyectos seleccionados fuera de zona según alcance.
//             </Small>

//             <Hours>
//               <HoursTitle>Horario</HoursTitle>
//               <HoursText>
//                 Lunes – Viernes: <strong>9:30–14:00</strong> ·{" "}
//                 <strong>17:00–19:00</strong>
//               </HoursText>
//             </Hours>

//             <AccentLine aria-hidden="true" />
//           </Brand>

//           <Cols>
//             <Col>
//               <ColTitle>Servicios</ColTitle>
//               <ColLink to="/cortinas-estores">Cortinas & estores</ColLink>
//               <ColLink to="/toldos-proteccionsolar">Toldos</ColLink>
//               <ColLink to="/automatizacion">Automatización</ColLink>
//               <ColLink to="/mosquiteras">Mosquiteras</ColLink>
//               <ColLink to="/panel-japones">Panel japonés</ColLink>
//               <ColLink to="/venecianas">Venecianas</ColLink>
//             </Col>

//             <Col>
//               <ColTitle>Empresa</ColTitle>
//               <ColLink to="/propuestas">Propuestas</ColLink>
//               <ColLink to="/services">Servicios</ColLink>
//               <ColLink to="/contact">Contacto</ColLink>

//               <Divider />

//               <ColTitle style={{ marginTop: "0.35rem" }}>Legal</ColTitle>
//               <ColLink to="/aviso-legal">Aviso legal</ColLink>
//               <ColLink to="/politica-privacidad">Política de privacidad</ColLink>
//               <ColLink to="/politica-cookies">Política de cookies</ColLink>
//             </Col>

//             <Col>
//               <ColTitle>Contacto</ColTitle>

//               <ActionRow>
//                 <Action href={`tel:${CONTACT.phoneLandlineTel}`} aria-label="Llamar por teléfono">
//                   <Pill>
//                     <DotPink aria-hidden="true" />
//                     Llamar: {CONTACT.phoneLandline}
//                   </Pill>
//                 </Action>
//               </ActionRow>

//               <ActionRow>
//                 <Action
//                   href={CONTACT.whatsappUrl}
//                   target="_blank"
//                   rel="noreferrer"
//                   aria-label="Abrir WhatsApp"
//                 >
//                   <Pill>
//                     <DotPink aria-hidden="true" />
//                     WhatsApp: +34 {CONTACT.whatsappNumber}
//                   </Pill>
//                 </Action>
//               </ActionRow>

//               <ActionRow>
//                 <Action href={`mailto:${CONTACT.email}`} aria-label="Enviar email">
//                   <Pill>
//                     <DotPink aria-hidden="true" />
//                     Email: {CONTACT.email}
//                   </Pill>
//                 </Action>
//               </ActionRow>

//               <ActionRow>
//                 <Action
//                   href={CONTACT.mapsUrl}
//                   target="_blank"
//                   rel="noreferrer"
//                   aria-label="Abrir ubicación en Google Maps"
//                 >
//                   <Pill>
//                     <DotPink aria-hidden="true" />
//                     {CONTACT.address.streetAddress}, {CONTACT.address.postalCode}{" "}
//                     {CONTACT.address.addressLocality}, {CONTACT.address.addressRegion},{" "}
//                     Spain
//                   </Pill>
//                 </Action>
//               </ActionRow>

//               <ActionRow>
//                 <Action
//                   href={CONTACT.facebookUrl}
//                   target="_blank"
//                   rel="noreferrer"
//                   aria-label="Abrir Facebook"
//                 >
//                   <Pill>
//                     <DotPink aria-hidden="true" />
//                     Facebook
//                   </Pill>
//                 </Action>
//               </ActionRow>
//             </Col>
//           </Cols>
//         </Top>

//         <Bottom>
//           <Copy>
//             © {year} {CONTACT.siteName}. Todos los derechos reservados.
//           </Copy>

//           <MiniLinks>
//             <MiniLink to="/contact">Pedir asesoramiento</MiniLink>
//             <Dot>·</Dot>
//             <MiniLink to="/propuestas">Ver propuestas</MiniLink>
//           </MiniLinks>
//         </Bottom>
//       </Inner>
//     </Wrap>
//   );
// }

// /* =========================
//    styles
// ========================= */

// const Wrap = styled.footer`
//   background: #0b0c0f;
//   color: rgba(244, 244, 245, 0.92);
//   border-top: 1px solid rgba(229, 0, 126, 0.22);
// `;

// const Inner = styled.div`
//   width: min(1120px, calc(100% - 2.4rem));
//   margin: 0 auto;
//   padding: 3.2rem 0 1.6rem;

//   @media (max-width: 768px) {
//     width: calc(100% - 2rem);
//     padding: 2.2rem 0 1.3rem;
//   }
// `;

// const Top = styled.div`
//   display: grid;
//   gap: 2rem;

//   @media (min-width: 980px) {
//     grid-template-columns: 1.1fr 1.9fr;
//     gap: 2.2rem;
//   }
// `;

// const Brand = styled.div``;

// const LogoRow = styled(Link)`
//   display: inline-flex;
//   align-items: center;
//   gap: 0.9rem;
//   text-decoration: none;
//   color: inherit;
// `;

// const LogoImg = styled.img`
//   width: 44px;
//   height: 44px;
//   object-fit: contain;
//   border-radius: 10px;
//   background: rgba(229, 0, 126, 0.08);
//   border: 1px solid rgba(229, 0, 126, 0.22);
//   padding: 6px;
// `;

// const BrandText = styled.div`
//   display: grid;
//   gap: 0.15rem;
// `;

// const BrandName = styled.div`
//   font-weight: 900;
//   letter-spacing: 0.01em;
// `;

// const BrandTag = styled.div`
//   font-size: 0.95rem;
//   color: rgba(244, 244, 245, 0.72);
// `;

// const Small = styled.p`
//   margin: 1.1rem 0 0;
//   line-height: 1.7;
//   color: rgba(244, 244, 245, 0.72);

//   strong {
//     color: rgba(244, 244, 245, 0.92);
//   }
// `;

// const Hours = styled.div`
//   margin-top: 1rem;
//   padding: 0.95rem 1rem;
//   border-radius: 16px;
//   background: rgba(255, 255, 255, 0.04);
//   border: 1px solid rgba(255, 255, 255, 0.08);
// `;

// const HoursTitle = styled.div`
//   font-size: 0.78rem;
//   letter-spacing: 0.18em;
//   text-transform: uppercase;
//   color: rgba(229, 0, 126, 0.78);
// `;

// const HoursText = styled.div`
//   margin-top: 0.35rem;
//   color: rgba(244, 244, 245, 0.9);
// `;

// const AccentLine = styled.div`
//   height: 2px;
//   width: 78px;
//   margin-top: 1.25rem;
//   border-radius: 999px;
//   background: ${({ theme }) => theme.colors.primary};
//   opacity: 0.9;

//   @media (max-width: 768px) {
//     width: 64px;
//   }
// `;

// const Cols = styled.div`
//   display: grid;
//   gap: 1.6rem;

//   @media (min-width: 760px) {
//     grid-template-columns: repeat(3, 1fr);
//     gap: 1.2rem;
//   }

//   @media (max-width: 768px) {
//     gap: 1.35rem;
//   }
// `;

// const Col = styled.div`
//   display: grid;
//   align-content: start;
//   gap: 0.6rem;
// `;

// const ColTitle = styled.div`
//   font-size: 0.78rem;
//   letter-spacing: 0.18em;
//   text-transform: uppercase;
//   color: rgba(229, 0, 126, 0.75);
//   margin-bottom: 0.15rem;
// `;

// const ColLink = styled(Link)`
//   text-decoration: none;
//   color: rgba(244, 244, 245, 0.88);
//   line-height: 1.55;

//   &:hover {
//     color: ${({ theme }) => theme.colors.primary};
//   }
// `;

// const Divider = styled.div`
//   height: 1px;
//   background: rgba(255, 255, 255, 0.08);
//   margin: 0.45rem 0;
// `;

// const ActionRow = styled.div``;

// const Action = styled.a`
//   text-decoration: none;
//   color: rgba(244, 244, 245, 0.88);
//   line-height: 1.55;

//   &:hover {
//     color: ${({ theme }) => theme.colors.primary};
//   }
// `;

// const Pill = styled.span`
//   display: inline-flex;
//   align-items: center;
//   gap: 0.55rem;
//   padding: 0.55rem 0.75rem;
//   border-radius: 999px;
//   background: rgba(255, 255, 255, 0.04);
//   border: 1px solid rgba(255, 255, 255, 0.08);

//   @media (max-width: 768px) {
//     width: 100%;
//     justify-content: flex-start;
//   }
// `;

// const DotPink = styled.span`
//   width: 8px;
//   height: 8px;
//   border-radius: 999px;
//   background: ${({ theme }) => theme.colors.primary};
//   box-shadow: 0 0 0 4px rgba(229, 0, 126, 0.12);
// `;

// const Bottom = styled.div`
//   margin-top: 2.2rem;
//   padding-top: 1.2rem;
//   border-top: 1px solid rgba(255, 255, 255, 0.08);

//   display: flex;
//   gap: 0.8rem;
//   align-items: center;
//   justify-content: space-between;
//   flex-wrap: wrap;

//   @media (max-width: 768px) {
//     margin-top: 1.7rem;
//     padding-top: 1rem;
//   }
// `;

// const Copy = styled.div`
//   font-size: 0.95rem;
//   color: rgba(244, 244, 245, 0.68);
// `;

// const MiniLinks = styled.div`
//   display: inline-flex;
//   align-items: center;
//   gap: 0.55rem;
//   flex-wrap: wrap;
// `;

// const MiniLink = styled(Link)`
//   text-decoration: none;
//   color: rgba(244, 244, 245, 0.8);

//   &:hover {
//     color: ${({ theme }) => theme.colors.primary};
//   }
// `;

// const Dot = styled.span`
//   color: rgba(244, 244, 245, 0.35);
// `;

// OPCION 3
// import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
// import styled from "styled-components";

// /* =========================
//    FOOTER WRAPPER
// ========================= */

// const FooterWrapper = styled.footer`
//   background: #0e0e0e;
//   color: #d1d1d1;
//   padding: 4rem 1.5rem 2rem;
// `;

// const FooterInner = styled.div`
//   max-width: 1100px;
//   margin: 0 auto;
//   display: grid;
//   grid-template-columns: 1.5fr 1fr 1fr;
//   gap: 3rem;

//   @media (max-width: 768px) {
//     grid-template-columns: 1fr;
//     gap: 2.5rem;
//   }
// `;

// /* =========================
//    BRAND
// ========================= */

// const Brand = styled.div``;

// const BrandTitle = styled.h3`
//   font-size: 1.7rem;
//   font-weight: 600;
//   color: #fff;
//   margin-bottom: 0.75rem;
// `;

// const BrandText = styled.p`
//   font-size: 0.95rem;
//   line-height: 1.6;
//   color: #b5b5b5;
//   max-width: 420px;
// `;

// const TrustLine = styled.p`
//   margin-top: 1.5rem;
//   font-size: 0.9rem;
//   color: #9a9a9a;
//   font-style: italic;
// `;

// /* =========================
//    COLUMN
// ========================= */

// const Column = styled.div``;

// const ColumnTitle = styled.h4`
//   font-size: 0.95rem;
//   font-weight: 600;
//   letter-spacing: 0.08em;
//   text-transform: uppercase;
//   color: #fff;
//   margin-bottom: 1.2rem;
// `;

// /* =========================
//    CONTACT ITEMS
// ========================= */

// const ContactItem = styled.a`
//   display: flex;
//   align-items: flex-start;
//   gap: 0.75rem;
//   margin-bottom: 1rem;
//   color: #b5b5b5;
//   text-decoration: none;
//   font-size: 0.95rem;

//   &:hover {
//     color: ${({ theme }) => theme.colors.primary};
//   }
// `;

// const ContactItemStatic = styled.div`
//   display: flex;
//   align-items: flex-start;
//   gap: 0.75rem;
//   margin-bottom: 1rem;
//   color: #b5b5b5;
//   font-size: 0.95rem;
// `;

// const IconCircle = styled.div`
//   width: 34px;
//   height: 34px;
//   border-radius: 50%;
//   background: rgba(255, 255, 255, 0.06);
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   color: ${({ theme }) => theme.colors.primary};
//   flex-shrink: 0;
// `;

// const ContactText = styled.div`
//   span {
//     display: block;
//     font-size: 0.75rem;
//     text-transform: uppercase;
//     letter-spacing: 0.08em;
//     color: #888;
//   }

//   small {
//     font-size: 0.95rem;
//     color: #d1d1d1;
//   }
// `;

// /* =========================
//    BOTTOM
// ========================= */

// const Bottom = styled.div`
//   max-width: 1100px;
//   margin: 3rem auto 0;
//   padding-top: 1.5rem;
//   border-top: 1px solid rgba(255, 255, 255, 0.08);
//   text-align: center;
//   font-size: 0.8rem;
//   color: #888;
// `;

// /* =========================
//    COMPONENT
// ========================= */

// export default function Footer() {
//   return (
//     <FooterWrapper>
//       <FooterInner>
//         {/* BRAND */}
//         <Brand>
//           <BrandTitle>Traver Decoración Textil</BrandTitle>
//           <BrandText>
//             Especialistas en decoración textil, cortinas, estores, toldos y
//             papel pintado. Proyectos a medida con un enfoque profesional y
//             cuidado por el detalle.
//           </BrandText>

//           <TrustLine>
//             Clientes en Castellón y provincia confían en nuestro trabajo desde
//             hace más de 32 años.
//           </TrustLine>
//         </Brand>

//         {/* CONTACT */}
//         <Column>
//           <ColumnTitle>Contacto</ColumnTitle>

//           <ContactItem
//             href="https://wa.me/34647856817"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <IconCircle>
//               <MessageCircle size={18} />
//             </IconCircle>
//             <ContactText>
//               <span>WhatsApp</span>
//               <small>647 856 817</small>
//             </ContactText>
//           </ContactItem>

//           <ContactItem href="tel:+34964562357">
//             <IconCircle>
//               <Phone size={18} />
//             </IconCircle>
//             <ContactText>
//               <span>Teléfono</span>
//               <small>+34 964 56 23 57</small>
//             </ContactText>
//           </ContactItem>

//           <ContactItem href="mailto:info@traverdecoracion.com">
//             <IconCircle>
//               <Mail size={18} />
//             </IconCircle>
//             <ContactText>
//               <span>Email</span>
//               <small>info@traverdecoracion.com</small>
//             </ContactText>
//           </ContactItem>
//         </Column>

//         {/* LOCATION */}
//         <Column>
//           <ColumnTitle>Visítanos</ColumnTitle>

//           <ContactItemStatic>
//             <IconCircle>
//               <Clock size={18} />
//             </IconCircle>
//             <ContactText>
//               <span>Horario</span>
//               <small>L–V: 9:30–14:00 · 17:00–19:00</small>
//             </ContactText>
//           </ContactItemStatic>

//           <ContactItem
//             href="https://maps.app.goo.gl/nqxT2QX2NCbgYTDF9"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <IconCircle>
//               <MapPin size={18} />
//             </IconCircle>
//             <ContactText>
//               <span>Tienda</span>
//               <small>
//                 Carrer de Sant Felip, 67
//                 <br />
//                 12550 Almassora
//               </small>
//             </ContactText>
//           </ContactItem>
//         </Column>
//       </FooterInner>

//       <Bottom>
//         © {new Date().getFullYear()} Traver Decoración Textil · Todos los
//         derechos reservados
//       </Bottom>
//     </FooterWrapper>
//   );
// }
