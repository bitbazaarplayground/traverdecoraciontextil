import { useEffect, useMemo, useState } from "react";
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

/**
 * Props:
 * - packLabel: string shown/stored as hidden field "pack"
 * - onSuccess: callback after successful submit
 * - variant: "full" | "simple" (optional)
 */
export default function AsesoramientoForm({
  onSuccess,
  packLabel,
  variant = "full",
}) {
  const [status, setStatus] = useState("idle"); // idle | loading | success | error

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
  // Booking mode (home visit)
  const [homeVisit, setHomeVisit] = useState(false);

  const needsBooking = meetingMode === "domicilio" || meetingMode === "tienda";
  const needsAddress = meetingMode === "domicilio";

  const daysForSelect = useMemo(() => availability || [], [availability]);
  const slotsForSelectedDate = useMemo(() => {
    return daysForSelect.find((d) => d.date === selectedDate)?.slots || [];
  }, [daysForSelect, selectedDate]);

  useEffect(() => {
    if (!homeVisit) return;

    // when date changes, auto-pick the first available slot
    if (selectedDate && slotsForSelectedDate.length > 0) {
      setSelectedStart(slotsForSelectedDate[0].start);
    } else {
      setSelectedStart("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [homeVisit, selectedDate, slotsForSelectedDate.length]);

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
      console.log("availability days:", data.days);

      setSelectedDate((prev) => {
        if (prev) {
          const has = (data.days || []).find((d) => d.date === prev)?.slots
            ?.length;
          if (has) return prev;
        }
        return firstDayWithSlots(data.days);
      });
    } catch (e) {
      setSlotError(e.message);
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
      // load slots when booking mode enabled
      if (availability.length === 0 && !loadingSlots) loadAvailability();
    } else {
      // contact-only mode
      resetBookingState();
      resetAddress();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [meetingMode]);

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("loading");

    const form = e.currentTarget;
    const formData = new FormData(form);

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
            customer_name: formData.get("nombre"),
            phone: formData.get("telefono"),
            email: formData.get("email") || null,
            contact_preference: formData.get("preferencia") || "WhatsApp",
            message: formData.get("mensaje") || "",
            home_visit: needsAddress, // true only for domicilio
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
        setStatus("success");
        form.reset();
        resetAddress();
        resetBookingState();
        setMeetingMode("remoto");

        if (onSuccess) onSuccess();
        return;
      } catch (err) {
        setStatus("error");
        setSlotError("No se pudo reservar. Inténtalo de nuevo.");
        return;
      }
    }

    // ------- Netlify form flow (normal enquiry) -------
    try {
      const data = { "form-name": "asesoramiento" };
      for (const [key, value] of formData.entries()) data[key] = value;

      // store meetingMode too (helps admin know intent)
      data.meeting_mode = meetingMode;

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
          ¡Gracias!
        </strong>
        <p style={{ margin: 0, color: "rgba(17,17,17,0.65)", lineHeight: 1.6 }}>
          Hemos recibido tu solicitud y te responderemos lo antes posible.
        </p>
      </div>
    );
  }

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

        {/* Context field: which pack/solicitud */}
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

        <Submit type="submit" disabled={status === "loading"}>
          {status === "loading"
            ? "Enviando..."
            : needsBooking
            ? "Reservar cita"
            : "Enviar solicitud"}
        </Submit>

        {status === "error" && !needsBooking && (
          <InlineError>
            No se pudo enviar. Por favor, inténtalo de nuevo o usa WhatsApp.
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
