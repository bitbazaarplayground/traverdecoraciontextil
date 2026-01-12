import { Clock, Mail, MapPin, MessageCircle, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
import styled from "styled-components";

const Page = styled.main`
  width: 100%;
  background: #fff;
  color: #111;
`;

const Wrap = styled.section`
  width: 100%;
  padding: 6rem 1.5rem 5.5rem;
  max-width: 1160px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 4.5rem 1rem 4.2rem;
  }
`;

const Header = styled.div`
  text-align: center;
  max-width: 760px;
  margin: 0 auto 3.2rem;
`;

const Eyebrow = styled.p`
  margin: 0 0 0.9rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  font-size: 0.8rem;
  color: rgba(17, 17, 17, 0.55);
`;

const Title = styled.h1`
  font-size: 2.8rem;
  font-weight: 650;
  margin: 0 0 1rem;
  color: #111;

  span {
    color: ${({ theme }) => theme.colors.primary};
  }

  @media (max-width: 768px) {
    font-size: 2.1rem;
  }
`;

const Subtitle = styled.p`
  margin: 0 auto;
  font-size: 1.1rem;
  line-height: 1.75;
  color: rgba(17, 17, 17, 0.68);
`;

const Grid = styled.div`
  display: grid;
  gap: 1.25rem;

  @media (min-width: 980px) {
    grid-template-columns: 1.1fr 0.9fr;
    gap: 1.25rem;
    align-items: start;
  }
`;

const MapCard = styled.div`
  border-radius: 24px;
  overflow: hidden;
  border: 1px solid rgba(17, 17, 17, 0.08);
  background: #fafafa;
`;

const MapTop = styled.div`
  padding: 1.2rem 1.2rem 1rem;
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
`;

const MapTitle = styled.h2`
  margin: 0;
  font-size: 1.2rem;
  font-weight: 750;
  color: #111;
`;

const MapLink = styled.a`
  font-size: 0.95rem;
  font-weight: 700;
  text-decoration: none;
  color: rgba(17, 17, 17, 0.75);

  &:hover {
    text-decoration: underline;
  }
`;

const MapFrame = styled.div`
  height: 360px;
  background: #eee;

  @media (max-width: 768px) {
    height: 280px;
  }

  iframe {
    width: 100%;
    height: 100%;
    border: 0;
  }
`;

const Panel = styled.aside`
  border-radius: 24px;
  border: 1px solid rgba(17, 17, 17, 0.08);
  background: #fff;
  box-shadow: 0 30px 90px rgba(0, 0, 0, 0.08);
  overflow: hidden;
`;

const PanelTop = styled.div`
  padding: 1.35rem 1.3rem 1.1rem;
  border-bottom: 1px solid rgba(17, 17, 17, 0.08);
`;

const PanelTitle = styled.h2`
  margin: 0 0 0.35rem;
  font-size: 1.2rem;
  font-weight: 750;
  color: #111;
`;

const PanelText = styled.p`
  margin: 0;
  font-size: 0.98rem;
  line-height: 1.7;
  color: rgba(17, 17, 17, 0.68);
`;

const PrimaryCTA = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.65rem;
  margin: 0.85rem 1.05rem 0;
  padding: 1rem 1.1rem;
  border-radius: 14px;

  background: ${({ theme }) => theme.colors.primary};
  color: #0b0c0f;
  font-weight: 900;
  text-decoration: none;
  transition: transform 0.25s ease, opacity 0.25s ease;

  &:hover {
    opacity: 0.92;
    transform: translateY(-1px);
  }
`;

const List = styled.div`
  padding: 0.35rem;
  display: grid;
  gap: 0.35rem;
`;

const ItemBase = `
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;

  padding: 1rem 1rem;
  border-radius: 18px;
  text-decoration: none;

  background: rgba(17, 17, 17, 0.03);
  border: 1px solid rgba(17, 17, 17, 0.06);

  transition: transform 0.2s ease, background 0.2s ease;

  &:hover {
    background: rgba(17, 17, 17, 0.05);
    transform: translateY(-1px);
  }
`;

const Item = styled.a`
  ${ItemBase}
`;

const ItemButton = styled.button`
  ${ItemBase}
  width: 100%;
  cursor: pointer;
  border: 1px solid rgba(17, 17, 17, 0.06);
`;

const ItemLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 0.85rem;

  svg {
    width: 20px;
    height: 20px;
    color: rgba(17, 17, 17, 0.55);
  }
`;

const ItemText = styled.div`
  display: grid;
  gap: 0.2rem;

  span {
    font-size: 1rem;
    font-weight: 750;
    color: rgba(17, 17, 17, 0.9);
  }

  small {
    font-size: 0.95rem;
    color: rgba(17, 17, 17, 0.65);
  }
`;

const Arrow = styled.div`
  font-weight: 900;
  color: rgba(17, 17, 17, 0.35);
`;

const StaticItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;

  padding: 1rem 1rem;
  border-radius: 18px;

  background: rgba(17, 17, 17, 0.03);
  border: 1px solid rgba(17, 17, 17, 0.06);

  ${ItemLeft} svg {
    color: rgba(17, 17, 17, 0.55);
  }
`;

/* =========================
   INLINE TOGGLE (DESKTOP)
========================= */

const InlineFormWrap = styled.div`
  padding: 0.85rem 1.05rem 0;
`;

const InlineToggle = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;

  padding: 0.95rem 1rem;
  border-radius: 18px;

  background: rgba(17, 17, 17, 0.03);
  border: 1px solid rgba(17, 17, 17, 0.06);

  cursor: pointer;
  transition: transform 0.2s ease, background 0.2s ease;

  &:hover {
    background: rgba(17, 17, 17, 0.05);
    transform: translateY(-1px);
  }

  @media (max-width: 768px) {
    display: none; /* mobile uses modal */
  }
`;

const InlineToggleLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 0.85rem;

  svg {
    width: 20px;
    height: 20px;
    color: rgba(17, 17, 17, 0.55);
  }
`;

const InlineToggleText = styled.div`
  display: grid;
  gap: 0.2rem;
  text-align: left;

  span {
    font-size: 1rem;
    font-weight: 800;
    color: rgba(17, 17, 17, 0.9);
  }

  small {
    font-size: 0.95rem;
    color: rgba(17, 17, 17, 0.65);
  }
`;

const InlineCollapse = styled.div`
  overflow: hidden;
  max-height: ${({ $open }) => ($open ? "520px" : "0px")};
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  transform: ${({ $open }) => ($open ? "translateY(0)" : "translateY(-4px)")};
  transition: max-height 0.35s ease, opacity 0.25s ease, transform 0.25s ease;

  @media (max-width: 768px) {
    display: none;
  }
`;

/* =========================
   MODAL (MOBILE)
========================= */

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 999;

  background: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);

  display: grid;
  place-items: center;

  padding: 1.1rem;
`;

const ModalCard = styled.div`
  width: min(560px, 100%);
  border-radius: 20px;
  background: #fff;
  border: 1px solid rgba(17, 17, 17, 0.1);
  box-shadow: 0 40px 120px rgba(0, 0, 0, 0.25);
  overflow: hidden;
`;

const ModalTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;

  padding: 1.05rem 1.05rem 0.9rem;
  border-bottom: 1px solid rgba(17, 17, 17, 0.08);
`;

const ModalTitle = styled.h3`
  margin: 0;
  font-size: 1.05rem;
  font-weight: 900;
  color: #111;
`;

const CloseButton = styled.button`
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

const ModalBody = styled.div`
  padding: 1rem 1.05rem 1.1rem;
`;

/* =========================
   FORM (NETLIFY)
========================= */

const FormHint = styled.p`
  margin: 0 0 0.85rem;
  font-size: 0.95rem;
  line-height: 1.6;
  color: rgba(17, 17, 17, 0.62);
`;

const Form = styled.form`
  display: grid;
  gap: 0.75rem;
`;

const Row = styled.div`
  display: grid;
  gap: 0.7rem;

  @media (min-width: 520px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const Field = styled.label`
  display: grid;
  gap: 0.35rem;

  span {
    font-size: 0.86rem;
    font-weight: 750;
    color: rgba(17, 17, 17, 0.78);
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 0.9rem 0.95rem;
  border-radius: 14px;
  border: 1px solid rgba(17, 17, 17, 0.12);
  background: rgba(17, 17, 17, 0.02);
  outline: none;
  font-size: 0.95rem;

  &:focus {
    border-color: rgba(17, 17, 17, 0.22);
    background: rgba(17, 17, 17, 0.03);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.9rem 0.95rem;
  border-radius: 14px;
  border: 1px solid rgba(17, 17, 17, 0.12);
  background: rgba(17, 17, 17, 0.02);
  outline: none;
  font-size: 0.95rem;

  &:focus {
    border-color: rgba(17, 17, 17, 0.22);
    background: rgba(17, 17, 17, 0.03);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.9rem 0.95rem;
  border-radius: 14px;
  border: 1px solid rgba(17, 17, 17, 0.12);
  background: rgba(17, 17, 17, 0.02);
  outline: none;
  font-size: 0.95rem;
  min-height: 120px;
  resize: vertical;

  &:focus {
    border-color: rgba(17, 17, 17, 0.22);
    background: rgba(17, 17, 17, 0.03);
  }
`;

const Submit = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  padding: 1rem 1.05rem;
  border-radius: 14px;
  border: 0;

  background: ${({ theme }) => theme.colors.primary};
  color: #0b0c0f;

  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  font-size: 0.78rem;

  cursor: pointer;
  transition: transform 0.25s ease, opacity 0.25s ease;

  &:hover {
    opacity: 0.92;
    transform: translateY(-1px);
  }
`;

/* Reusable form UI */
function encode(data) {
  return new URLSearchParams(data).toString();
}

function AsesoramientoForm({ onSuccess }) {
  const [status, setStatus] = useState("idle"); // idle | loading | success | error

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("loading");

    const form = e.currentTarget;
    const formData = new FormData(form);

    // Build a plain object to URL-encode
    const data = { "form-name": "asesoramiento" };
    for (const [key, value] of formData.entries()) data[key] = value;

    try {
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode(data),
      });

      if (!res.ok) throw new Error("Network response was not ok");

      setStatus("success");
      form.reset();
      if (onSuccess) onSuccess();
    } catch (err) {
      setStatus("error");
    }
  }

  // ✅ Success UI
  if (status === "success") {
    return (
      <div
        style={{
          padding: "0.75rem 0",
          display: "grid",
          gap: "0.4rem",
        }}
      >
        <strong style={{ fontSize: "1rem", color: "rgba(17,17,17,0.92)" }}>
          Gracias por contactarnos.
        </strong>
        <p style={{ margin: 0, color: "rgba(17,17,17,0.65)", lineHeight: 1.6 }}>
          Hemos recibido tu mensaje y te responderemos lo antes posible.
        </p>
      </div>
    );
  }

  return (
    <>
      <FormHint>
        Déjanos tus datos y te respondemos lo antes posible (normalmente en el
        mismo día laborable).
      </FormHint>

      <Form
        name="asesoramiento"
        method="POST"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        onSubmit={handleSubmit}
      >
        <input type="hidden" name="form-name" value="asesoramiento" />
        <input type="hidden" name="bot-field" />

        <Row>
          <Field>
            <span>Nombre</span>
            <Input name="nombre" required autoComplete="name" />
          </Field>

          <Field>
            <span>Teléfono / WhatsApp</span>
            <Input
              name="telefono"
              required
              autoComplete="tel"
              inputMode="tel"
            />
          </Field>
        </Row>

        <Row>
          <Field>
            <span>Email (opcional)</span>
            <Input name="email" type="email" autoComplete="email" />
          </Field>

          <Field>
            <span>Preferencia de contacto</span>
            <Select name="preferencia" defaultValue="WhatsApp">
              <option value="WhatsApp">WhatsApp</option>
              <option value="Llamada">Llamada</option>
              <option value="Email">Email</option>
            </Select>
          </Field>
        </Row>

        <Field>
          <span>Mensaje</span>
          <TextArea
            name="mensaje"
            required
            placeholder="Cuéntanos qué necesitas (tipo de estancia, medidas aproximadas, estilo, domótica, etc.)"
          />
        </Field>

        <Submit type="submit" disabled={status === "loading"}>
          {status === "loading" ? "Enviando..." : "Enviar solicitud"}
        </Submit>

        {status === "error" && (
          <p style={{ margin: 0, color: "rgba(180, 30, 30, 0.85)" }}>
            No se pudo enviar. Por favor, inténtalo de nuevo o usa WhatsApp.
          </p>
        )}
      </Form>
    </>
  );
}

export default function ContactPage() {
  const [isMobile, setIsMobile] = useState(false);
  const [inlineOpen, setInlineOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [status, setStatus] = useState("idle");

  // Detect mobile (<= 768px)
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const apply = () => setIsMobile(mq.matches);
    apply();

    const handler = () => apply();
    if (mq.addEventListener) mq.addEventListener("change", handler);
    else mq.addListener(handler);

    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", handler);
      else mq.removeListener(handler);
    };
  }, []);

  // Close modal on ESC + lock scroll
  useEffect(() => {
    if (!modalOpen) return;

    const onKey = (e) => {
      if (e.key === "Escape") setModalOpen(false);
    };
    window.addEventListener("keydown", onKey);

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [modalOpen]);

  const openForm = () => {
    if (isMobile) setModalOpen(true);
    else setInlineOpen((v) => !v);
  };

  return (
    <Page>
      <Wrap>
        <Header>
          <Eyebrow>Contacto · Asesoramiento</Eyebrow>
          <Title>
            Hablemos de tu <span>proyecto</span>.
          </Title>
          <Subtitle>
            Cortinas, estores, toldos y automatización. Te orientamos con
            honestidad y preparamos una propuesta ajustada a tu espacio.
          </Subtitle>
        </Header>

        <Grid>
          {/* MAP */}
          <MapCard>
            <MapTop>
              <MapTitle>Visítanos</MapTitle>
              <MapLink
                href="https://maps.app.goo.gl/nqxT2QX2NCbgYTDF9"
                target="_blank"
                rel="noopener noreferrer"
              >
                Abrir en Google Maps →
              </MapLink>
            </MapTop>

            <MapFrame>
              <iframe
                title="Ubicación Traver Decoración Textil"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3111.073908292976!2d-0.07220452365018995!3d39.94384209087051!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1290fd3cf9e940c7%3A0x43a24bed1dfc3786!2sCarrer%20de%20Sant%20Felip%2C%2067%2C%2012550%20Almassora%2C%20Castell%C3%B3n%2C%20Spain!5e0!3m2!1sen!2ses!4v1700000000000!5m2!1sen!2ses"
                loading="lazy"
                allowFullScreen
              />
            </MapFrame>
          </MapCard>

          {/* CONTACT PANEL */}
          <Panel>
            <PanelTop>
              <PanelTitle>Asesoramiento privado</PanelTitle>
              <PanelText>
                Si quieres una respuesta rápida, WhatsApp es lo más cómodo.
                También puedes llamarnos o, si lo prefieres, usar el formulario.
              </PanelText>
            </PanelTop>

            {/* Desktop inline toggle */}
            <InlineFormWrap>
              <InlineToggle
                type="button"
                onClick={openForm}
                aria-expanded={inlineOpen}
                aria-controls="asesoramiento-inline"
              >
                <InlineToggleLeft>
                  <Mail />
                  <InlineToggleText>
                    <span>Formulario</span>
                    <small>Envíanos tu consulta</small>
                  </InlineToggleText>
                </InlineToggleLeft>
                <Arrow>→</Arrow>
              </InlineToggle>

              <InlineCollapse id="asesoramiento-inline" $open={inlineOpen}>
                <div style={{ paddingTop: "0.85rem" }}>
                  <AsesoramientoForm
                    onSuccess={() =>
                      setTimeout(() => setModalOpen(false), 1200)
                    }
                  />
                </div>
              </InlineCollapse>
            </InlineFormWrap>

            <List>
              <Item href="tel:+34964562357">
                <ItemLeft>
                  <Phone />
                  <ItemText>
                    <span>Teléfono</span>
                    <small>+34 964 56 23 57</small>
                  </ItemText>
                </ItemLeft>
                <Arrow>→</Arrow>
              </Item>

              {/* Mobile: open modal form from the list item */}
              <ItemButton
                type="button"
                onClick={openForm}
                aria-label="Abrir formulario de asesoramiento"
                style={{ display: isMobile ? "flex" : "none" }}
              >
                <ItemLeft>
                  <Mail />
                  <ItemText>
                    <span>Formulario</span>
                    <small>Envíanos tu consulta</small>
                  </ItemText>
                </ItemLeft>
                <Arrow>→</Arrow>
              </ItemButton>
              <Item
                href="https://wa.me/34647856817"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ItemLeft>
                  <MessageCircle />
                  <ItemText>
                    <span>WhatsApp</span>
                    <small>Respuesta rápida</small>
                  </ItemText>
                </ItemLeft>
                <Arrow>→</Arrow>
              </Item>

              <StaticItem>
                <ItemLeft>
                  <Clock />
                  <ItemText>
                    <span>Horario</span>
                    <small>L–V: 9:30–14:00, 17:00–19:00</small>
                  </ItemText>
                </ItemLeft>
                <Arrow />
              </StaticItem>

              <Item
                href="https://maps.app.goo.gl/nqxT2QX2NCbgYTDF9"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ItemLeft>
                  <MapPin />
                  <ItemText>
                    <span>Tienda</span>
                    <small>Carrer de Sant Felip, 67 · Almassora</small>
                  </ItemText>
                </ItemLeft>
                <Arrow>→</Arrow>
              </Item>
            </List>

            {/* Mobile modal */}
            {modalOpen && (
              <ModalOverlay
                role="dialog"
                aria-modal="true"
                aria-label="Formulario de asesoramiento"
                onMouseDown={(e) => {
                  // click outside closes
                  if (e.target === e.currentTarget) setModalOpen(false);
                }}
              >
                <ModalCard>
                  <ModalTop>
                    <ModalTitle>Solicitar asesoramiento</ModalTitle>
                    <CloseButton
                      type="button"
                      onClick={() => setModalOpen(false)}
                      aria-label="Cerrar"
                    >
                      <X />
                    </CloseButton>
                  </ModalTop>

                  <ModalBody>
                    <AsesoramientoForm />
                  </ModalBody>
                </ModalCard>
              </ModalOverlay>
            )}
          </Panel>
        </Grid>
      </Wrap>
    </Page>
  );
}
