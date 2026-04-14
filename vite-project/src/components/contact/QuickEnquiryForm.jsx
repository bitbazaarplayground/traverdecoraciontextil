// src/components/contact/QuickEnquiryForm.jsx
import { useMemo, useState } from "react";
import styled from "styled-components";
import { trackFormSubmit } from "../../lib/analytics";

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

const PrivacyNotice = styled.p`
  margin: 0.25rem 0 0;
  font-size: 0.78rem;
  line-height: 1.55;
  color: rgba(17, 17, 17, 0.64);

  a {
    color: inherit;
    font-weight: 700;
    text-decoration: underline;
  }
`;

const CheckboxRow = styled.label`
  display: flex;
  align-items: flex-start;
  gap: 0.65rem;
  font-size: 0.82rem;
  line-height: 1.5;
  color: rgba(17, 17, 17, 0.72);
  cursor: pointer;

  a {
    color: inherit;
    font-weight: 700;
    text-decoration: underline;
  }
`;

const Checkbox = styled.input`
  margin-top: 0.15rem;
  width: 16px;
  height: 16px;
  flex: 0 0 16px;
  accent-color: ${({ theme }) => theme.colors.primary};
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

const InlineError = styled.p`
  margin: 0;
  color: rgba(180, 30, 30, 0.85);
  font-size: 0.88rem;
`;

const Success = styled.div`
  padding: 1rem;
  border-radius: 18px;
  border: 1px solid rgba(17, 17, 17, 0.12);
  background: rgba(255, 255, 255, 0.92);
  display: grid;
  gap: 0.5rem;
  box-shadow: 0 10px 30px rgba(17, 17, 17, 0.06);
`;

function encode(data) {
  return new URLSearchParams(data).toString();
}

function isValidEmail(v) {
  const s = String(v || "").trim();
  if (!s) return true;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

function isValidPhone(raw) {
  const s = String(raw || "").trim();
  if (!s) return true;
  const digits = s.replace(/\D/g, "");
  return digits.length >= 9;
}

export default function QuickEnquiryForm({
  packLabel,
  source = "cta",
  onSuccess,
}) {
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [error, setError] = useState("");

  const page = useMemo(() => {
    if (typeof window === "undefined") return "";
    return window.location.pathname + window.location.hash;
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    if (status === "loading") return;

    setError("");

    const form = e.currentTarget;
    const fd = new FormData(form);

    const nombre = String(fd.get("nombre") || "").trim();
    const telefono = String(fd.get("telefono") || "").trim();
    const email = String(fd.get("email") || "").trim();
    const mensaje = String(fd.get("mensaje") || "").trim();
    const privacidadAceptada = fd.get("privacidad") === "aceptada";

    if (!nombre) return setError("Por favor, incluye tu nombre.");
    if (!telefono && !email) {
      return setError("Incluye un teléfono o un email para poder responderte.");
    }
    if (telefono && !isValidPhone(telefono)) {
      return setError("Por favor, introduce un teléfono válido.");
    }
    if (email && !isValidEmail(email)) {
      return setError("Por favor, introduce un email válido.");
    }
    if (!mensaje) return setError("Por favor, escribe tu mensaje.");
    if (!privacidadAceptada) {
      return setError(
        "Debes aceptar la Política de Privacidad para enviar la solicitud."
      );
    }

    setStatus("loading");

    try {
      const body = encode({
        "form-name": "quick-enquiry",
        "bot-field": fd.get("bot-field") || "",
        nombre,
        telefono,
        email,
        preferencia: String(fd.get("preferencia") || "WhatsApp"),
        mensaje,
        privacidad: "aceptada",
        pack: packLabel || "Sin especificar",
        source,
        page,
      });

      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
      });

      if (!res.ok) throw new Error("Netlify submit failed");

      trackFormSubmit("quick-enquiry", source || "cta");
      setStatus("success");
      form.reset();
      onSuccess?.();
    } catch (err) {
      console.error(err);
      setStatus("error");
      setError("No se pudo enviar. Por favor, inténtalo de nuevo.");
    }
  }

  if (status === "success") {
    return (
      <Success role="status" aria-live="polite">
        <strong style={{ fontSize: "1.05rem", color: "rgba(17,17,17,0.92)" }}>
          ¡Gracias!
        </strong>
        <p style={{ margin: 0, color: "rgba(17,17,17,0.66)", lineHeight: 1.6 }}>
          Hemos recibido tu solicitud y te responderemos lo antes posible.
        </p>
      </Success>
    );
  }

  return (
    <Form
      name="quick-enquiry"
      method="POST"
      action="/"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
      noValidate
    >
      <input type="hidden" name="form-name" value="quick-enquiry" />

      <p hidden>
        <label>
          Don’t fill this out: <input name="bot-field" />
        </label>
      </p>

      <input type="hidden" name="pack" value={packLabel || "Sin especificar"} />
      <input type="hidden" name="source" value={source} />
      <input type="hidden" name="page" value={page} />

      <Row>
        <Field>
          <span>Nombre</span>
          <Input
            name="nombre"
            autoComplete="name"
            disabled={status === "loading"}
          />
        </Field>

        <Field>
          <span>Teléfono / WhatsApp</span>
          <Input
            name="telefono"
            autoComplete="tel"
            inputMode="tel"
            disabled={status === "loading"}
          />
        </Field>
      </Row>

      <Row>
        <Field>
          <span>Email (opcional)</span>
          <Input
            name="email"
            type="email"
            autoComplete="email"
            disabled={status === "loading"}
          />
        </Field>

        <Field>
          <span>Preferencia de contacto</span>
          <Select
            name="preferencia"
            defaultValue="WhatsApp"
            disabled={status === "loading"}
          >
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
          placeholder="Cuéntanos qué necesitas (tipo de estancia, estilo, medidas aproximadas, etc.)"
          disabled={status === "loading"}
        />
      </Field>

      <PrivacyNotice>
        Responsable: Traver Decoración Textil. Finalidad: gestionar tu solicitud
        de asesoramiento y poder responderte. Derechos: puedes solicitar acceso,
        rectificación o supresión de tus datos. Más información en nuestra{" "}
        <a href="politica-privacidad" target="_blank" rel="noopener noreferrer">
          Política de Privacidad
        </a>
        .
      </PrivacyNotice>

      <CheckboxRow>
        <Checkbox
          type="checkbox"
          name="privacidad"
          value="aceptada"
          disabled={status === "loading"}
        />
        <span>
          He leído y acepto la{" "}
          <a
            href="politica-privacidad"
            target="_blank"
            rel="noopener noreferrer"
          >
            Política de Privacidad
          </a>
          .
        </span>
      </CheckboxRow>

      {error && (
        <InlineError role="alert" aria-live="polite">
          {error}
        </InlineError>
      )}

      <Submit type="submit" disabled={status === "loading"}>
        {status === "loading" ? "Enviando..." : "Enviar solicitud"}
      </Submit>
    </Form>
  );
}
