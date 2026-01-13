import { useState } from "react";
import styled from "styled-components";

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

  &:disabled {
    opacity: 0.65;
    cursor: not-allowed;
    transform: none;
  }
`;

/* Helpers */
function encode(data) {
  return new URLSearchParams(data).toString();
}

/**
 * Reusable Netlify form.
 * - packLabel: string shown/stored as hidden field "pack"
 * - onSuccess: callback after successful submit (e.g., close collapse/modal)
 */
export default function AsesoramientoForm({ onSuccess, packLabel }) {
  const [status, setStatus] = useState("idle"); // idle | loading | success | error

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("loading");

    const form = e.currentTarget;
    const formData = new FormData(form);

    // Ensure Netlify receives form-name in body
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

  if (status === "success") {
    return (
      <div style={{ padding: "0.75rem 0", display: "grid", gap: "0.4rem" }}>
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
        <em>Déjanos tus datos y te respondemos lo antes posible.</em>
      </FormHint>

      <Form
        name="asesoramiento"
        method="POST"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        onSubmit={handleSubmit}
      >
        {/* Netlify required fields */}
        <input type="hidden" name="form-name" value="asesoramiento" />
        <input type="hidden" name="bot-field" />

        {/* Context field: which pack/solicitud */}
        <input
          type="hidden"
          name="pack"
          value={packLabel || "Sin especificar"}
        />

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
