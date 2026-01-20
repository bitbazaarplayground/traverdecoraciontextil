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
