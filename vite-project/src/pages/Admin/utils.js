export function formatLocal(dt) {
  if (!dt) return "";
  const d = new Date(dt);
  return d.toLocaleString("es-ES", {
    weekday: "short",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function meetingModeLabel(row) {
  if (row?.meeting_mode) {
    switch (String(row.meeting_mode).trim().toLowerCase()) {
      case "remoto":
        return "Online / Teléfono";
      case "tienda":
        return "En tienda";
      case "domicilio":
        return "Visita a domicilio";
      case "otro":
        return "Otro / No lo tengo claro";
      default:
        return row.meeting_mode;
    }
  }

  // fallback for older rows
  if (row?.status === "reserved")
    return row?.home_visit ? "Visita a domicilio" : "En tienda";
  if (row?.status === "enquiry") return "Online / Teléfono";
  return "—";
}

export function digitsOnly(value) {
  return String(value || "").replace(/\D+/g, "");
}

// Canonical customer key: PHONE FIRST (digits-only), else email lowercase
export function toCustomerKey(bk) {
  const phone = digitsOnly(bk?.phone);
  if (phone) return phone;

  const email = String(bk?.email || "")
    .trim()
    .toLowerCase();
  if (email) return email;

  return "";
}
