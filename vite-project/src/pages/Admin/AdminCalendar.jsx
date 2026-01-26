// src/pages/Admin/AdminCalendar.jsx
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabaseClient.js";
import { Button, Card, Input, Label, Row, Table, Wrap } from "./adminStyles";

// ============================
// Config
// ============================
const TZ = "Europe/Madrid";
const LOCALE = "es-ES";
const ACCENT = "#a07f55"; // Barley Corn
const TEXT = "#756452"; // Coffee
const SOFT = "#f8e3be"; // Givry
const MUTED = "#918170"; // Stonewall

// Blocks should cover the booking window (2h)
const BLOCK_MINUTES = 120;

function addMinutesIso(iso, minutes) {
  return new Date(new Date(iso).getTime() + minutes * 60_000).toISOString();
}

// start ISO for selectedDay + hour (uses admin browser local TZ)
function startIsoForSelectedDayHour(selectedDay, hour) {
  const dt = new Date(
    selectedDay.getFullYear(),
    selectedDay.getMonth(),
    selectedDay.getDate(),
    hour,
    0,
    0,
    0
  );
  return dt.toISOString();
}

// Working hours -> hour-starts only (NO minutes)
// You can tweak these later or load from settings table.
function getWorkingHoursForDow(dow /* 0=Sun..6=Sat */) {
  // Mon-Fri
  if (dow >= 1 && dow <= 5) {
    return [
      { start: 9, end: 14 }, // 09-12 (hour starts)
      { start: 16, end: 20 }, // 16-19 (hour starts)
    ];
  }
  // Sat
  if (dow === 6) return [{ start: 10, end: 14 }];
  // Sun closed
  return [];
}

function pad2(n) {
  return String(n).padStart(2, "0");
}

function toYMD(date) {
  const y = date.getFullYear();
  const m = pad2(date.getMonth() + 1);
  const d = pad2(date.getDate());
  return `${y}-${m}-${d}`;
}

function startOfDay(date) {
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    0,
    0,
    0,
    0
  );
}
function endOfDay(date) {
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    23,
    59,
    59,
    999
  );
}

function sameDay(a, b) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function formatLongDate(date) {
  return date.toLocaleDateString(LOCALE, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function formatHourLabel(h) {
  return `${pad2(h)}:00`;
}

// Overlap: [aStart,aEnd) overlaps [bStart,bEnd)
function overlaps(aStart, aEnd, bStart, bEnd) {
  return aStart < bEnd && aEnd > bStart;
}

function getBearerToken(eventLikeHeaders) {
  const h =
    eventLikeHeaders?.authorization || eventLikeHeaders?.Authorization || "";
  const match = String(h).match(/^Bearer\s+(.+)$/i);
  return match ? match[1] : null;
}

// ============================
// Component
// ============================
export default function AdminCalendar() {
  const navigate = useNavigate();

  const [session, setSession] = useState(null);

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  // Month navigation
  const [monthCursor, setMonthCursor] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });

  // Selected day
  const [selectedDay, setSelectedDay] = useState(() => {
    const now = new Date();
    return startOfDay(now);
  });

  // Data
  const [bookings, setBookings] = useState([]);
  const [blackouts, setBlackouts] = useState([]);

  // Block UI
  const [blockReason, setBlockReason] = useState("Bloqueado");
  const [selectedHours, setSelectedHours] = useState(() => new Set()); // hours like 9,10,16...
  const selectedHoursArr = useMemo(
    () => Array.from(selectedHours).sort((a, b) => a - b),
    [selectedHours]
  );

  // Auth session
  useEffect(() => {
    supabase.auth
      .getSession()
      .then(({ data }) => setSession(data.session || null));
    const { data: sub } = supabase.auth.onAuthStateChange(
      (_event, newSession) => setSession(newSession)
    );
    return () => sub?.subscription?.unsubscribe?.();
  }, []);

  const isAdmin = useMemo(() => !!session?.user, [session]);

  // Month grid days
  const monthGrid = useMemo(() => {
    const first = new Date(
      monthCursor.getFullYear(),
      monthCursor.getMonth(),
      1
    );
    const last = new Date(
      monthCursor.getFullYear(),
      monthCursor.getMonth() + 1,
      0
    );

    // calendar starts Monday
    const start = new Date(first);
    const day = start.getDay(); // 0 Sun..6 Sat
    const diffToMonday = (day + 6) % 7; // 0 if Monday
    start.setDate(start.getDate() - diffToMonday);

    const end = new Date(last);
    const endDay = end.getDay();
    const diffToSunday = (7 - ((endDay + 6) % 7) - 1 + 7) % 7;
    end.setDate(end.getDate() + diffToSunday);

    const days = [];
    const cur = new Date(start);
    while (cur <= end) {
      days.push(new Date(cur));
      cur.setDate(cur.getDate() + 1);
    }
    return { first, last, days };
  }, [monthCursor]);

  // Range fetch (for current month grid + a bit)
  const fetchRange = useMemo(() => {
    const from = startOfDay(monthGrid.days[0] || monthGrid.first);
    const to = endOfDay(
      monthGrid.days[monthGrid.days.length - 1] || monthGrid.last
    );
    return { from, to };
  }, [monthGrid]);

  async function loadCalendarData() {
    if (!session?.user) return;

    setLoading(true);
    setMsg("");

    try {
      const { data: sess } = await supabase.auth.getSession();
      const token = sess?.session?.access_token;
      if (!token) throw new Error("Sesión no válida.");

      const fromIso = fetchRange.from.toISOString();
      const toIso = fetchRange.to.toISOString();

      // ✅ Recommended: one admin endpoint returns bookings + blackouts
      const res = await fetch(
        `/.netlify/functions/admin-calendar?from=${encodeURIComponent(
          fromIso
        )}&to=${encodeURIComponent(toIso)}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || "Load failed");

      setBookings(Array.isArray(data.bookings) ? data.bookings : []);
      setBlackouts(Array.isArray(data.blackouts) ? data.blackouts : []);
      setMsg("");
    } catch (e) {
      console.error(e);
      setMsg(e?.message || "Load failed");
      setBookings([]);
      setBlackouts([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (isAdmin) loadCalendarData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAdmin, fetchRange.from.getTime(), fetchRange.to.getTime()]);

  // Derived: bookings and blocks for selected day
  const selectedDayBookings = useMemo(() => {
    const dayStart = startOfDay(selectedDay).getTime();
    const dayEnd = endOfDay(selectedDay).getTime();

    return (bookings || [])
      .filter((b) => b.start_time && b.end_time)
      .filter((b) => {
        const s = new Date(b.start_time).getTime();
        const e = new Date(b.end_time).getTime();
        return overlaps(s, e, dayStart, dayEnd);
      })
      .sort((a, b) => new Date(a.start_time) - new Date(b.start_time));
  }, [bookings, selectedDay]);

  const selectedDayBlackouts = useMemo(() => {
    const dayStart = startOfDay(selectedDay).getTime();
    const dayEnd = endOfDay(selectedDay).getTime();

    return (blackouts || [])
      .filter((b) => b.start_time && b.end_time)
      .filter((b) => {
        const s = new Date(b.start_time).getTime();
        const e = new Date(b.end_time).getTime();
        return overlaps(s, e, dayStart, dayEnd);
      })
      .sort((a, b) => new Date(a.start_time) - new Date(b.start_time));
  }, [blackouts, selectedDay]);

  // Markers for month grid (dots)
  const dayHasBooking = useMemo(() => {
    const map = new Map();
    for (const b of bookings || []) {
      if (!b.start_time) continue;
      const d = new Date(b.start_time);
      map.set(toYMD(d), true);
    }
    return map;
  }, [bookings]);

  const dayHasBlackout = useMemo(() => {
    const map = new Map();
    for (const bl of blackouts || []) {
      if (!bl.start_time) continue;
      const d = new Date(bl.start_time);
      map.set(toYMD(d), true);
    }
    return map;
  }, [blackouts]);

  // Slot grid for selected day
  const hourSlots = useMemo(() => {
    const dow = selectedDay.getDay(); // 0..6
    const segments = getWorkingHoursForDow(dow);
    const hours = [];
    for (const seg of segments) {
      for (let h = seg.start; h < seg.end; h++) {
        hours.push(h);
      }
    }
    return hours;
  }, [selectedDay]);

  // Determine if an hour is already blocked / already booked
  function hourState(h) {
    const start = new Date(
      selectedDay.getFullYear(),
      selectedDay.getMonth(),
      selectedDay.getDate(),
      h,
      0,
      0,
      0
    );

    // ✅ booking window is 2h
    const end = new Date(
      selectedDay.getFullYear(),
      selectedDay.getMonth(),
      selectedDay.getDate(),
      h,
      0,
      0,
      0
    );
    end.setHours(end.getHours() + 2);

    const startMs = start.getTime();
    const endMs = end.getTime();

    const isBlocked = selectedDayBlackouts.some((bl) => {
      const s = new Date(bl.start_time).getTime();
      const e = new Date(bl.end_time).getTime();
      return overlaps(startMs, endMs, s, e);
    });

    const isBooked = selectedDayBookings.some((b) => {
      const s = new Date(b.start_time).getTime();
      const e = new Date(b.end_time).getTime();
      return overlaps(startMs, endMs, s, e);
    });

    return {
      isBlocked,
      isBooked,
      startIso: start.toISOString(),
      endIso: end.toISOString(), // now 2h later
    };
  }

  function toggleHour(h) {
    const { isBlocked, isBooked } = hourState(h);
    if (isBlocked || isBooked) return;

    setSelectedHours((prev) => {
      const next = new Set(prev);
      if (next.has(h)) next.delete(h);
      else next.add(h);
      return next;
    });
  }

  async function createBlocks() {
    if (!selectedHoursArr.length) {
      setMsg("Selecciona una o más horas para bloquear.");
      return;
    }

    setLoading(true);
    setMsg("");

    try {
      const { data: sess } = await supabase.auth.getSession();
      const token = sess?.session?.access_token;
      if (!token) throw new Error("Sesión no válida.");

      const blocks = selectedHoursArr.map((h) => {
        const { startIso, endIso } = hourState(h);
        return {
          start_time: startIso,
          end_time: endIso,
          reason: blockReason || "Bloqueado",
        };
      });

      const res = await fetch("/.netlify/functions/admin-calendar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ blocks }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok)
        throw new Error(data?.error || "No se pudo crear el bloqueo.");

      setSelectedHours(new Set());
      setBlockReason("Bloqueado");
      await loadCalendarData();
      setMsg("Bloqueos añadidos ✅");
    } catch (e) {
      console.error(e);
      setMsg(e?.message || "No se pudo crear el bloqueo.");
    } finally {
      setLoading(false);
    }
  }
  async function blockWholeDay() {
    // get working segments for this weekday
    const dow = selectedDay.getDay();
    const segments = getWorkingHoursForDow(dow);

    if (!segments.length) {
      setMsg("Este día está cerrado. No hace falta bloquearlo.");
      return;
    }

    // day start = earliest segment start
    const startHour = Math.min(...segments.map((s) => s.start));
    // day end = latest segment end
    const endHour = Math.max(...segments.map((s) => s.end));

    setLoading(true);
    setMsg("");

    try {
      const { data: sess } = await supabase.auth.getSession();
      const token = sess?.session?.access_token;
      if (!token) throw new Error("Sesión no válida.");

      const startIso = startIsoForSelectedDayHour(selectedDay, startHour);
      const endIso = startIsoForSelectedDayHour(selectedDay, endHour);

      const blocks = [
        {
          start_time: startIso,
          end_time: endIso,
          reason: "Día bloqueado",
        },
      ];

      const res = await fetch("/.netlify/functions/admin-calendar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ blocks }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok)
        throw new Error(data?.error || "No se pudo bloquear el día.");

      setSelectedHours(new Set());
      await loadCalendarData();
      setMsg("Día bloqueado ✅");
    } catch (e) {
      console.error(e);
      setMsg(e?.message || "No se pudo bloquear el día.");
    } finally {
      setLoading(false);
    }
  }

  async function deleteBlackout(id) {
    if (!confirm("¿Eliminar este bloqueo?")) return;

    setLoading(true);
    setMsg("");

    try {
      const { data: sess } = await supabase.auth.getSession();
      const token = sess?.session?.access_token;
      if (!token) throw new Error("Sesión no válida.");

      const res = await fetch("/.netlify/functions/admin-calendar", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || "No se pudo eliminar.");

      await loadCalendarData();
      setMsg("Bloqueo eliminado ✅");
    } catch (e) {
      console.error(e);
      setMsg(e?.message || "No se pudo eliminar.");
    } finally {
      setLoading(false);
    }
  }

  if (!session) {
    return (
      <Wrap>
        <Card>
          <h2 style={{ margin: "0 0 0.35rem" }}>Calendario</h2>
          <p style={{ margin: 0, opacity: 0.75 }}>
            Inicia sesión para ver el calendario.
          </p>
        </Card>
      </Wrap>
    );
  }

  // ============================
  // UI
  // ============================
  return (
    <Wrap>
      <Card>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "1rem",
            flexWrap: "wrap",
          }}
        >
          <div>
            <h2 style={{ margin: "0 0 0.25rem", color: TEXT }}>Calendario</h2>
            <p style={{ margin: 0, opacity: 0.75 }}>
              Ver reservas por día + bloquear disponibilidad.
            </p>
            {msg && (
              <p style={{ margin: "0.5rem 0 0", opacity: 0.9, color: TEXT }}>
                {msg}
              </p>
            )}
          </div>

          <div style={{ display: "flex", gap: "0.6rem", alignItems: "center" }}>
            <Button onClick={loadCalendarData} disabled={loading}>
              {loading ? "Cargando..." : "Actualizar"}
            </Button>
          </div>
        </div>
      </Card>

      {/* Top grid */}
      <div
        style={{
          display: "grid",
          gap: "1rem",
          gridTemplateColumns: "1.1fr 1fr",
          alignItems: "start",
        }}
      >
        {/* Calendar */}
        <Card>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "0.75rem",
            }}
          >
            <Button
              type="button"
              onClick={() =>
                setMonthCursor(
                  (p) => new Date(p.getFullYear(), p.getMonth() - 1, 1)
                )
              }
              disabled={loading}
            >
              ‹
            </Button>

            <div style={{ fontWeight: 900, color: TEXT }}>
              {monthCursor.toLocaleDateString(LOCALE, {
                month: "long",
                year: "numeric",
              })}
            </div>

            <Button
              type="button"
              onClick={() =>
                setMonthCursor(
                  (p) => new Date(p.getFullYear(), p.getMonth() + 1, 1)
                )
              }
              disabled={loading}
            >
              ›
            </Button>
          </div>

          <div style={{ height: "0.75rem" }} />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(7, 1fr)",
              gap: "0.5rem",
            }}
          >
            {["L", "M", "X", "J", "V", "S", "D"].map((d) => (
              <div
                key={d}
                style={{
                  fontSize: "0.85rem",
                  fontWeight: 800,
                  opacity: 0.7,
                  textAlign: "center",
                  color: TEXT,
                }}
              >
                {d}
              </div>
            ))}

            {monthGrid.days.map((d) => {
              const inMonth = d.getMonth() === monthCursor.getMonth();
              const isSelected = sameDay(d, selectedDay);
              const key = toYMD(d);

              const hasB = dayHasBooking.get(key);
              const hasBl = dayHasBlackout.get(key);

              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => {
                    setSelectedDay(startOfDay(d));
                    setSelectedHours(new Set());
                    setMsg("");
                  }}
                  style={{
                    padding: "0.75rem 0.2rem",
                    borderRadius: 14,
                    border: isSelected
                      ? `2px solid ${ACCENT}`
                      : "1px solid rgba(17,17,17,0.10)",
                    background: isSelected ? `${SOFT}66` : "white",
                    cursor: "pointer",
                    opacity: inMonth ? 1 : 0.42,
                    position: "relative",
                  }}
                >
                  <div style={{ fontWeight: 900, color: TEXT }}>
                    {d.getDate()}
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      gap: "0.35rem",
                      marginTop: "0.35rem",
                    }}
                  >
                    {hasB && (
                      <span
                        style={{
                          width: 6,
                          height: 6,
                          borderRadius: 999,
                          background: ACCENT,
                          display: "inline-block",
                        }}
                      />
                    )}
                    {hasBl && (
                      <span
                        style={{
                          width: 6,
                          height: 6,
                          borderRadius: 2,
                          background: MUTED,
                          display: "inline-block",
                        }}
                      />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          <div
            style={{
              marginTop: "0.85rem",
              display: "flex",
              gap: "0.85rem",
              alignItems: "center",
              color: TEXT,
              opacity: 0.75,
            }}
          >
            <span
              style={{
                display: "inline-flex",
                gap: "0.35rem",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 999,
                  background: ACCENT,
                }}
              />{" "}
              Reservas
            </span>
            <span
              style={{
                display: "inline-flex",
                gap: "0.35rem",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 2,
                  background: MUTED,
                }}
              />{" "}
              Bloqueos
            </span>
          </div>
        </Card>

        {/* Day panel */}
        <Card>
          <div style={{ display: "grid", gap: "0.6rem" }}>
            <div style={{ fontWeight: 900, color: TEXT }}>
              Día seleccionado: {formatLongDate(selectedDay)}
            </div>

            {/* Reservas */}
            <div style={{ fontWeight: 900, marginTop: "0.5rem", color: TEXT }}>
              Reservas del día
            </div>
            <Table>
              <thead>
                <tr>
                  <th>Hora</th>
                  <th>Cliente</th>
                  <th>Pack</th>
                </tr>
              </thead>
              <tbody>
                {selectedDayBookings.map((b) => {
                  const s = new Date(b.start_time);
                  const label = s.toLocaleTimeString(LOCALE, {
                    hour: "2-digit",
                    minute: "2-digit",
                  });
                  return (
                    <tr key={b.id}>
                      <td>{label}</td>
                      <td>
                        {b.customer_name ? (
                          <button
                            type="button"
                            onClick={() =>
                              navigate(
                                `/admin/clientes/${encodeURIComponent(b.id)}`
                              )
                            }
                            style={{
                              background: "none",
                              border: "none",
                              padding: 0,
                              margin: 0,
                              cursor: "pointer",
                              color: ACCENT,
                              fontWeight: 800,
                              textDecoration: "underline",
                            }}
                            title="Abrir perfil del cliente"
                          >
                            {b.customer_name}
                          </button>
                        ) : (
                          "—"
                        )}
                      </td>

                      <td>{b.pack || "—"}</td>
                    </tr>
                  );
                })}

                {selectedDayBookings.length === 0 && (
                  <tr>
                    <td colSpan="3" style={{ opacity: 0.7 }}>
                      No hay reservas para este día.
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>

            {/* Bloqueos */}
            <div style={{ fontWeight: 900, marginTop: "0.8rem", color: TEXT }}>
              Bloqueos que afectan este día
            </div>
            <Table>
              <thead>
                <tr>
                  <th>Rango</th>
                  <th>Motivo</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {selectedDayBlackouts.map((bl) => {
                  const s = new Date(bl.start_time).toLocaleTimeString(LOCALE, {
                    hour: "2-digit",
                    minute: "2-digit",
                  });
                  const e = new Date(bl.end_time).toLocaleTimeString(LOCALE, {
                    hour: "2-digit",
                    minute: "2-digit",
                  });
                  return (
                    <tr key={bl.id}>
                      <td>
                        {s} → {e}
                      </td>
                      <td>{bl.reason || "Bloqueado"}</td>
                      <td>
                        <Button
                          $variant="danger"
                          disabled={loading}
                          onClick={() => deleteBlackout(bl.id)}
                        >
                          Eliminar
                        </Button>
                      </td>
                    </tr>
                  );
                })}

                {selectedDayBlackouts.length === 0 && (
                  <tr>
                    <td colSpan="3" style={{ opacity: 0.7 }}>
                      No hay bloqueos para este día.
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </Card>
      </div>

      {/* Block hours (hourly grid) */}
      <Card>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "0.75rem",
            flexWrap: "wrap",
          }}
        >
          <h3 style={{ marginTop: 0, color: TEXT }}>Bloquear horas</h3>

          <Button
            type="button"
            onClick={blockWholeDay}
            disabled={loading || hourSlots.length === 0}
            title={
              hourSlots.length === 0 ? "Día cerrado" : "Bloquear todo el día"
            }
          >
            Bloquear día
          </Button>
        </div>

        <p style={{ margin: "0 0 0.75rem", opacity: 0.75 }}>
          Selecciona horas (en punto). Se crean bloqueos de {BLOCK_MINUTES / 60}
          h.
        </p>

        {hourSlots.length === 0 ? (
          <p style={{ margin: 0, opacity: 0.75 }}>
            Este día no tiene horario (cerrado).
          </p>
        ) : (
          <>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(6, minmax(0, 1fr))",
                gap: "0.5rem",
                marginBottom: "0.75rem",
              }}
            >
              {hourSlots.map((h) => {
                const st = hourState(h);
                const isSelected = selectedHours.has(h);

                // disabled if booked or blocked
                const disabled = st.isBooked || st.isBlocked;

                const bg = st.isBooked
                  ? "rgba(180,30,30,0.08)"
                  : st.isBlocked
                  ? "rgba(145,129,112,0.18)"
                  : isSelected
                  ? "rgba(160,127,85,0.18)"
                  : "rgba(17,17,17,0.03)";

                const border = isSelected
                  ? `2px solid ${ACCENT}`
                  : "1px solid rgba(17,17,17,0.10)";

                const label = formatHourLabel(h);

                return (
                  <button
                    key={h}
                    type="button"
                    onClick={() => toggleHour(h)}
                    disabled={disabled || loading}
                    style={{
                      padding: "0.7rem 0.6rem",
                      borderRadius: 14,
                      border,
                      background: bg,
                      cursor: disabled ? "not-allowed" : "pointer",
                      opacity: disabled ? 0.55 : 1,
                      textAlign: "center",
                      fontWeight: 900,
                      color: TEXT,
                    }}
                    title={
                      st.isBooked
                        ? "Hay una reserva"
                        : st.isBlocked
                        ? "Ya bloqueado"
                        : "Seleccionar"
                    }
                  >
                    {label}
                    <div
                      style={{
                        fontSize: "0.78rem",
                        fontWeight: 800,
                        opacity: 0.7,
                        marginTop: "0.15rem",
                      }}
                    >
                      {st.isBooked
                        ? "Reserva"
                        : st.isBlocked
                        ? "Bloqueado"
                        : isSelected
                        ? "Seleccionado"
                        : "Libre"}
                    </div>
                  </button>
                );
              })}
            </div>

            <Row>
              <Label>
                <span>Motivo</span>
                <Input
                  value={blockReason}
                  onChange={(e) => setBlockReason(e.target.value)}
                  placeholder="Bloqueado / Vacaciones / etc."
                />
              </Label>

              <Button
                type="button"
                onClick={createBlocks}
                disabled={loading || selectedHoursArr.length === 0}
              >
                {selectedHoursArr.length
                  ? `Añadir bloqueos (${selectedHoursArr.length})`
                  : "Selecciona horas"}
              </Button>
            </Row>
          </>
        )}
      </Card>
    </Wrap>
  );
}
