import { useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";

/* =========================
   FORM (NETLIFY + BOOKING)
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

const InlineNote = styled.p`
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.55;
  color: rgba(17, 17, 17, 0.58);
`;

const InlineError = styled.p`
  margin: 0;
  color: rgba(180, 30, 30, 0.85);
`;

/* Helpers */
function encode(data) {
  return new URLSearchParams(data).toString();
}

function firstDayWithSlots(days) {
  return (days || []).find((d) => (d.slots || []).length > 0)?.date || "";
}

function normalizeSpanishPhone(input) {
  const digits = String(input || "").replace(/\D/g, ""); // keep only numbers
  // Spain: 9 digits, starts 6/7/8/9
  if (!/^[6789]\d{8}$/.test(digits)) return null;
  return digits;
}
function normalizeSpanishDigits(raw) {
  const p = normalizePhone(raw);
  if (!p) return null;

  let digits = p;
  if (digits.startsWith("+")) digits = digits.slice(1);
  if (digits.startsWith("0034")) digits = digits.slice(4);
  else if (digits.startsWith("34")) digits = digits.slice(2);

  // ✅ only accept Spain 9-digit numbers starting 6/7/8/9
  if (!/^[6789]\d{8}$/.test(digits)) return null;

  return digits;
}

function isValidEmail(v) {
  const s = String(v || "").trim();
  if (!s) return true; // ✅ optional
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

// pragmatic Spain-focused: allow +34, 0034, spaces, dashes.
// Validate final digits length and starting digit.
function normalizePhone(raw) {
  return String(raw || "")
    .replace(/[^\d+]/g, "")
    .trim();
}

function isValidSpanishPhone(raw) {
  const p = normalizePhone(raw);

  if (!p) return true; // ✅ optional

  // remove prefixes
  let digits = p;
  if (digits.startsWith("+")) digits = digits.slice(1);
  if (digits.startsWith("0034")) digits = digits.slice(4);
  else if (digits.startsWith("34")) digits = digits.slice(2);

  // Spain numbers are typically 9 digits and start 6/7/8/9
  if (!/^\d{9}$/.test(digits)) return false;
  return /^[6789]/.test(digits);
}

/* Real WhatsApp icon (SVG) */
function WhatsAppIcon({ size = 18 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      aria-hidden="true"
      focusable="false"
    >
      <path
        fill="#25D366"
        d="M19.11 17.42c-.27-.14-1.58-.78-1.82-.87-.24-.09-.42-.14-.6.14-.18.27-.69.87-.84 1.05-.15.18-.31.2-.58.07-.27-.14-1.12-.41-2.13-1.31-.79-.7-1.32-1.56-1.47-1.83-.15-.27-.02-.42.12-.55.12-.12.27-.31.4-.47.13-.16.18-.27.27-.45.09-.18.04-.34-.02-.47-.07-.14-.6-1.45-.82-1.99-.22-.53-.44-.46-.6-.47h-.51c-.18 0-.47.07-.71.34-.24.27-.93.91-.93 2.22 0 1.31.95 2.57 1.08 2.75.13.18 1.87 2.86 4.53 4.01.63.27 1.12.43 1.5.55.63.2 1.2.17 1.65.1.5-.07 1.58-.65 1.8-1.28.22-.63.22-1.17.15-1.28-.07-.11-.24-.18-.51-.31z"
      />
      <path
        fill="#25D366"
        d="M26.67 5.33A13.27 13.27 0 0 0 16.02 1C8.83 1 3 6.83 3 14.02c0 2.31.6 4.56 1.74 6.55L3 31l10.62-1.69a13.03 13.03 0 0 0 6.4 1.63h.01c7.19 0 13.02-5.83 13.02-13.02 0-3.48-1.35-6.75-3.78-9.19zM20.02 28.6h-.01c-2.07 0-4.1-.56-5.88-1.62l-.42-.25-6.3 1 1.03-6.14-.27-.44a11 11 0 0 1-1.69-5.78C6.48 8.1 10.1 4.48 16.02 4.48c2.97 0 5.76 1.16 7.86 3.25a11.04 11.04 0 0 1 3.26 7.86c0 5.92-3.62 11.01-7.12 11.01z"
      />
    </svg>
  );
}

/**
 * Props:
 * - packLabel: string shown/stored as hidden field "pack"
 * - onSuccess: callback after successful submit
 * - variant: "full" | "simple"
 */
export default function AsesoramientoForm({
  onSuccess,
  packLabel,
  variant = "full",
}) {
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [showSuccess, setShowSuccess] = useState(false);
  const [lockUI, setLockUI] = useState(false);
  const successRef = useRef(null);
  const successTimerRef = useRef(null);

  useEffect(() => {
    console.log(
      "[AssesoramientoForm] status =",
      status,
      "showSuccess =",
      showSuccess
    );
  }, [status, showSuccess]);

  useEffect(() => {
    console.log("[AsesoramientoForm] mounted", { packLabel, variant });
    return () =>
      console.log("[AsesoramientoForm] unmounted", { packLabel, variant });
  }, [packLabel, variant]);

  /**
   * meetingMode:
   * - "remoto"    => Netlify contact (default)
   * - "domicilio" => booking + address + slots
   * - "tienda"    => booking + slots (no address)
   * - "otro"      => Netlify contact
   */
  const [meetingMode, setMeetingMode] = useState("remoto");

  // Address (only for domicilio)
  const [addr, setAddr] = useState({
    address_line1: "",
    postal_code: "",
    city: "",
    address_notes: "",
  });

  // Availability / slots (used for domicilio + tienda)
  const [availability, setAvailability] = useState([]); // [{date, slots:[{label,start,end}]}]
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedStart, setSelectedStart] = useState(""); // UTC ISO (slot.start)
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [slotError, setSlotError] = useState("");

  const needsBooking = meetingMode === "domicilio" || meetingMode === "tienda";
  const needsAddress = meetingMode === "domicilio";

  // Email and phone validation
  const [formError, setFormError] = useState("");

  const daysForSelect = useMemo(() => availability || [], [availability]);
  const slotsForSelectedDate = useMemo(() => {
    return daysForSelect.find((d) => d.date === selectedDate)?.slots || [];
  }, [daysForSelect, selectedDate]);

  const showWhatsAppCTA = meetingMode === "remoto" || meetingMode === "otro";

  async function loadAvailability() {
    setLoadingSlots(true);
    setSlotError("");

    try {
      const res = await fetch("/.netlify/functions/availability?days=14", {
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok)
        throw new Error(data?.error || "No se pudo cargar disponibilidad");

      setAvailability(data.days || []);
      setSelectedDate((prev) => {
        if (prev) {
          const has = (data.days || []).find((d) => d.date === prev)?.slots
            ?.length;
          if (has) return prev;
        }
        return firstDayWithSlots(data.days);
      });
    } catch (e) {
      setSlotError(e?.message || "No se pudo cargar disponibilidad.");
      setAvailability([]);
      setSelectedDate("");
      setSelectedStart("");
    } finally {
      setLoadingSlots(false);
    }
  }

  function resetBookingState() {
    setAvailability([]);
    setSelectedDate("");
    setSelectedStart("");
    setSlotError("");
    setLoadingSlots(false);
  }

  function resetAddress() {
    setAddr({
      address_line1: "",
      postal_code: "",
      city: "",
      address_notes: "",
    });
  }

  // When meeting mode changes
  useEffect(() => {
    setSelectedStart("");
    setSlotError("");

    if (needsBooking) {
      if (availability.length === 0 && !loadingSlots) loadAvailability();
    } else {
      resetBookingState();
      resetAddress();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [meetingMode]);

  // Auto-pick first slot on date change (booking modes)
  useEffect(() => {
    if (!needsBooking) return;
    if (selectedDate && slotsForSelectedDate.length > 0) {
      setSelectedStart(slotsForSelectedDate[0].start);
    } else {
      setSelectedStart("");
    }
  }, [needsBooking, selectedDate, slotsForSelectedDate]);

  // ✅ REPLACE YOUR CURRENT "Show + auto-hide success message" useEffect WITH THIS:
  // Show + auto-hide success message (30s)
  useEffect(() => {
    if (status !== "success") return;

    setShowSuccess(true);

    // lock interactions briefly (prevents double taps)
    setLockUI(true);
    const lockT = setTimeout(() => setLockUI(false), 900);

    // focus + scroll into view (nice on mobile)
    requestAnimationFrame(() => {
      if (successRef.current) {
        successRef.current.focus?.();
        successRef.current.scrollIntoView?.({
          behavior: "smooth",
          block: "center",
        });
      }
    });

    // IMPORTANT: clear any previous timer, then start a fresh 30s timer
    if (successTimerRef.current) clearTimeout(successTimerRef.current);

    successTimerRef.current = setTimeout(() => {
      setShowSuccess(false); // ✅ hide the success card
      // setStatus("idle");  // ❌ remove this (can cause “instant disappear”)
    }, 30000);

    return () => {
      clearTimeout(lockT);
      if (successTimerRef.current) clearTimeout(successTimerRef.current);
    };
  }, [status]);

  // Close success on click outside (premium, but optional)
  useEffect(() => {
    if (!(status === "success" && showSuccess)) return;

    const onAnyPointer = (e) => {
      if (lockUI) return;

      const box = successRef.current;
      if (box && box.contains(e.target)) return;

      setShowSuccess(false);
      setStatus("idle");
    };

    window.addEventListener("mousedown", onAnyPointer);
    window.addEventListener("touchstart", onAnyPointer);

    return () => {
      window.removeEventListener("mousedown", onAnyPointer);
      window.removeEventListener("touchstart", onAnyPointer);
    };
  }, [status, showSuccess, lockUI]);

  async function handleSubmit(e) {
    e.preventDefault();

    // prevent double submit
    if (status === "loading") return;

    // reset errors
    setFormError("");
    setSlotError("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const nombre = String(formData.get("nombre") || "").trim();
    const telefono = String(formData.get("telefono") || "").trim();
    const email = String(formData.get("email") || "").trim();

    if (!nombre) {
      setStatus("error");
      setFormError("Por favor, incluye tu nombre.");
      return;
    }

    if (!telefono && !email) {
      setStatus("error");
      setFormError("Por favor, incluye un teléfono o un email.");
      return;
    }

    if (telefono && !isValidSpanishPhone(telefono)) {
      setStatus("error");
      setFormError("Por favor, introduce un teléfono válido.");
      return;
    }

    if (email && !isValidEmail(email)) {
      setStatus("error");
      setFormError("Por favor, introduce un email válido.");
      return;
    }

    // ✅ only now set loading
    setStatus("loading");

    // ------- Booking flow (domicilio or tienda) -------
    if (needsBooking) {
      try {
        if (!selectedStart) {
          setStatus("error");
          setSlotError("Selecciona una fecha y hora.");
          return;
        }

        if (needsAddress) {
          if (!addr.address_line1 || !addr.postal_code || !addr.city) {
            setStatus("error");
            setSlotError("Completa la dirección para la visita a domicilio.");
            return;
          }
        }

        const res = await fetch("/.netlify/functions/book", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            pack: packLabel || "Sin especificar",
            customer_name: nombre,
            phone: telefono ? normalizeSpanishDigits(telefono) : null,
            email: email ? email.trim() : null,
            contact_preference: String(
              formData.get("preferencia") || "WhatsApp"
            ).trim(),

            message: formData.get("mensaje") || "",
            home_visit: needsAddress,
            address_line1: needsAddress ? addr.address_line1 : null,
            postal_code: needsAddress ? addr.postal_code : null,
            city: needsAddress ? addr.city : null,
            address_notes: needsAddress ? addr.address_notes || null : null,
            start: selectedStart,
          }),
        });

        const data = await res.json().catch(() => ({}));

        if (!res.ok) {
          if (data?.code === "SLOT_TAKEN") {
            await loadAvailability();
            setSlotError(
              "Ese horario ya no está disponible. Hemos actualizado la disponibilidad."
            );
          } else {
            setSlotError(data?.error || "No se pudo reservar.");
          }
          setStatus("error");
          return;
        }

        // Success
        console.log(
          "[AsesoramientoForm] booking success -> setting status=success"
        );
        setStatus("success");

        form.reset();
        resetAddress();
        resetBookingState();
        setMeetingMode("remoto");

        console.log("[AsesoramientoForm] before onSuccess");
        // onSuccess?.();
        console.log("[AsesoramientoForm] after onSuccess");

        return;
      } catch (err) {
        console.error(err);
        setStatus("error");
        setSlotError("No se pudo reservar. Inténtalo de nuevo.");
        return;
      }
    }

    // ------- Netlify form flow (normal enquiry) -------
    try {
      const res = await fetch("/.netlify/functions/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pack: packLabel || "Sin especificar",
          customer_name: nombre,
          phone: telefono ? normalizeSpanishDigits(telefono) : null,
          email: email ? email.trim() : null,
          contact_preference: String(
            formData.get("preferencia") || "WhatsApp"
          ).trim(),
          message: formData.get("mensaje") || "",
          meeting_mode: meetingMode,
        }),
      });

      // const data = await res.json().catch(() => ({}));
      // if (!res.ok) throw new Error(data?.error || "No se pudo enviar.");

      setStatus("success");
      form.reset();
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  }

  // Success UI
  if (status === "success" && showSuccess) {
    const whatsappHref =
      "https://wa.me/34614952856?text=" +
      encodeURIComponent(
        `Hola, he enviado una solicitud desde la web (${
          packLabel || "sin pack"
        }).`
      );

    return (
      <>
        <style>{`
          @keyframes popIn {
            from { opacity: 0; transform: translateY(10px) scale(0.99); }
            to   { opacity: 1; transform: translateY(0) scale(1); }
          }
        `}</style>

        <div
          ref={successRef}
          tabIndex={-1}
          aria-live="polite"
          role="status"
          style={{
            position: "relative",
            padding: "1rem",
            borderRadius: 18,
            border: "1px solid rgba(17,17,17,0.12)",
            background: "rgba(255,255,255,0.92)",
            backdropFilter: "blur(10px)",
            display: "grid",
            gap: "0.5rem",
            boxShadow: "0 10px 30px rgba(17,17,17,0.06)",
            animation: "popIn 260ms ease-out",
            outline: "none",
            pointerEvents: lockUI ? "none" : "auto",
            opacity: lockUI ? 0.985 : 1,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <strong style={{ fontSize: "1.05rem", color: "rgba(17,17,17,0.92)" }}>
            ¡Gracias!
          </strong>

          <p
            style={{ margin: 0, color: "rgba(17,17,17,0.66)", lineHeight: 1.6 }}
          >
            Hemos recibido tu solicitud y te responderemos lo antes posible.
          </p>

          {/* ✅ Mature UX: only for remoto / otro */}
          {showWhatsAppCTA && (
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                marginTop: "0.35rem",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.6rem 0.9rem",
                borderRadius: 999,
                border: "1px solid rgba(17,17,17,0.14)",
                background: "rgba(17,17,17,0.02)",
                color: "rgba(17,17,17,0.85)",
                fontWeight: 900,
                fontSize: "0.78rem",
                textDecoration: "none",
                width: "fit-content",
              }}
            >
              <WhatsAppIcon size={18} />
              Hablar por WhatsApp
            </a>
          )}

          <div
            style={{
              marginTop: "0.25rem",
              display: "flex",
              gap: "0.6rem",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <span
              style={{
                padding: "0.25rem 0.6rem",
                borderRadius: 999,
                border: "1px solid rgba(17,17,17,0.10)",
                background: "rgba(17,17,17,0.03)",
                fontWeight: 800,
                fontSize: "0.78rem",
                color: "rgba(17,17,17,0.72)",
              }}
            >
              Confirmado
            </span>
          </div>
        </div>
      </>
    );
  }

  // Normal form UI
  return (
    <>
      <FormHint>
        <em>
          {variant === "simple"
            ? "Cuéntanos qué necesitas y te respondemos lo antes posible."
            : "Déjanos tus datos y te respondemos lo antes posible."}
        </em>
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

        {/* Context */}
        <input
          type="hidden"
          name="pack"
          value={packLabel || "Sin especificar"}
        />
        <input type="hidden" name="meeting_mode" value={meetingMode} />

        <Row>
          <Field>
            <span>Nombre</span>
            <Input name="nombre" required autoComplete="name" />
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
          <span>¿Cómo prefieres el asesoramiento?</span>
          <Select
            value={meetingMode}
            onChange={(e) => setMeetingMode(e.target.value)}
            disabled={status === "loading"}
          >
            <option value="remoto">
              Online / teléfono (te contactamos en 24–48h)
            </option>
            <option value="tienda">En la tienda (elige fecha y hora)</option>
            <option value="domicilio">
              Visita a domicilio (elige fecha y hora)
            </option>
            <option value="otro">Otro / no lo tengo claro</option>
          </Select>

          {meetingMode === "remoto" && (
            <InlineNote>
              Te responderemos lo antes posible (normalmente en 24–48 horas
              laborables).
            </InlineNote>
          )}

          {needsBooking && (
            <InlineNote>
              Selecciona una fecha y hora. La cita se reserva en bloques de 2
              horas.
            </InlineNote>
          )}
        </Field>

        {/* Address only for domicilio */}
        {needsAddress && (
          <>
            <Row>
              <Field>
                <span>Dirección</span>
                <Input
                  value={addr.address_line1}
                  onChange={(e) =>
                    setAddr((p) => ({ ...p, address_line1: e.target.value }))
                  }
                  placeholder="Calle, número, etc."
                  required
                  disabled={status === "loading"}
                />
              </Field>

              <Field>
                <span>Código postal</span>
                <Input
                  value={addr.postal_code}
                  onChange={(e) =>
                    setAddr((p) => ({ ...p, postal_code: e.target.value }))
                  }
                  placeholder="12000"
                  required
                  disabled={status === "loading"}
                />
              </Field>
            </Row>

            <Row>
              <Field>
                <span>Ciudad</span>
                <Input
                  value={addr.city}
                  onChange={(e) =>
                    setAddr((p) => ({ ...p, city: e.target.value }))
                  }
                  placeholder="Castellón"
                  required
                  disabled={status === "loading"}
                />
              </Field>

              <Field>
                <span>Notas (opcional)</span>
                <Input
                  value={addr.address_notes}
                  onChange={(e) =>
                    setAddr((p) => ({ ...p, address_notes: e.target.value }))
                  }
                  placeholder="Piso, acceso, parking, etc."
                  disabled={status === "loading"}
                />
              </Field>
            </Row>
          </>
        )}

        {/* Slots for domicilio + tienda */}
        {needsBooking && (
          <>
            <Field>
              <span>Fecha</span>
              <Select
                value={selectedDate}
                onChange={(e) => {
                  setSelectedDate(e.target.value);
                  setSlotError("");
                }}
                disabled={loadingSlots || status === "loading"}
                required
              >
                <option value="" disabled>
                  {loadingSlots ? "Cargando..." : "Selecciona una fecha"}
                </option>

                {daysForSelect.map((d) => (
                  <option
                    key={d.date}
                    value={d.date}
                    disabled={!d.slots?.length}
                  >
                    {d.date}{" "}
                    {d.slots?.length
                      ? `(${d.slots.length} horas)`
                      : "(Sin horas)"}
                  </option>
                ))}
              </Select>
            </Field>

            <Field>
              <span>Hora de inicio</span>
              <Select
                value={selectedStart}
                onChange={(e) => {
                  setSelectedStart(e.target.value);
                  setSlotError("");
                }}
                disabled={!selectedDate || loadingSlots || status === "loading"}
                required
              >
                {!selectedDate && (
                  <option value="" disabled>
                    Selecciona una fecha primero
                  </option>
                )}

                {selectedDate && slotsForSelectedDate.length === 0 && (
                  <option value="" disabled>
                    No hay horas disponibles para este día
                  </option>
                )}

                {slotsForSelectedDate.map((s) => (
                  <option key={s.start} value={s.start}>
                    {s.label}
                  </option>
                ))}
              </Select>

              {slotError && <InlineError>{slotError}</InlineError>}
            </Field>
          </>
        )}

        <Field>
          <span>Mensaje</span>
          <TextArea
            name="mensaje"
            required
            placeholder="Cuéntanos qué necesitas (tipo de estancia, medidas aproximadas, estilo, domótica, etc.)"
            disabled={status === "loading"}
          />
        </Field>

        {formError && <InlineError>{formError}</InlineError>}

        <Submit type="submit" disabled={status === "loading"}>
          {status === "loading"
            ? "Enviando..."
            : needsBooking
            ? "Reservar cita"
            : "Enviar solicitud"}
        </Submit>

        {status === "error" && !needsBooking && (
          <InlineError>
            No se pudo enviar. Por favor, inténtalo de nuevo.
          </InlineError>
        )}

        {status === "error" && needsBooking && (
          <InlineError>
            No se pudo reservar. Revisa la fecha/hora y vuelve a intentarlo.
          </InlineError>
        )}
      </Form>
    </>
  );
}
