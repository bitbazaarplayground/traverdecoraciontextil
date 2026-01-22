import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "../../lib/supabaseClient.js";
import { Button, Card, Input, Label, Row, Table, Wrap } from "./adminStyles";
import { formatLocal } from "./utils";

/** Brand palette */
const COLORS = {
  barley: "#a07f55",
  coffee: "#756452",
  givry: "#f8e3be",
  stone: "#918170",
  border: "rgba(17,17,17,0.10)",
};

function pad2(n) {
  return String(n).padStart(2, "0");
}
function isoDate(d) {
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
}
function startOfMonth(d) {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}
function endOfMonth(d) {
  return new Date(d.getFullYear(), d.getMonth() + 1, 0);
}
function addMonths(d, n) {
  return new Date(d.getFullYear(), d.getMonth() + n, 1);
}
function sameDay(a, b) {
  return (
    a &&
    b &&
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}
function monthLabel(d) {
  return d.toLocaleString("es-ES", { month: "long", year: "numeric" });
}
function parseYmd(ymd) {
  // expects YYYY-MM-DD
  if (!ymd || typeof ymd !== "string") return null;
  const m = ymd.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!m) return null;
  const y = Number(m[1]);
  const mo = Number(m[2]) - 1;
  const da = Number(m[3]);
  const dt = new Date(y, mo, da);
  // validate
  if (dt.getFullYear() !== y || dt.getMonth() !== mo || dt.getDate() !== da)
    return null;
  return dt;
}
function toLocalDatetimeInputValue(dt) {
  // "YYYY-MM-DDTHH:mm" in local time
  const y = dt.getFullYear();
  const m = pad2(dt.getMonth() + 1);
  const d = pad2(dt.getDate());
  const hh = pad2(dt.getHours());
  const mm = pad2(dt.getMinutes());
  return `${y}-${m}-${d}T${hh}:${mm}`;
}
function startOfDay(d) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0, 0);
}
function endOfDay(d) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate(), 23, 59, 0, 0);
}

export default function AdminCalendar() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [session, setSession] = useState(null);

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const [blackouts, setBlackouts] = useState([]);
  const [bookings, setBookings] = useState([]);

  // Selected day (driven by URL ?date=YYYY-MM-DD)
  const [selectedDate, setSelectedDate] = useState(() => {
    const urlDate = parseYmd(searchParams.get("date"));
    return urlDate || new Date();
  });

  // Month shown in calendar UI
  const [calMonth, setCalMonth] = useState(() => startOfMonth(selectedDate));

  // Block form
  const [blockStart, setBlockStart] = useState("");
  const [blockEnd, setBlockEnd] = useState("");
  const [blockReason, setBlockReason] = useState("Bloqueado");

  const adminAllowlist = useMemo(() => {
    const raw = import.meta.env.VITE_ADMIN_EMAILS || "";
    return raw
      .split(",")
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean);
  }, []);

  const isAllowed = useMemo(() => {
    const userEmail = session?.user?.email?.toLowerCase();
    if (!userEmail) return false;
    if (adminAllowlist.length === 0) return true;
    return adminAllowlist.includes(userEmail);
  }, [session, adminAllowlist]);

  // Keep selectedDate in sync with URL if it changes
  useEffect(() => {
    const urlDate = parseYmd(searchParams.get("date"));
    if (urlDate) {
      setSelectedDate(urlDate);
      setCalMonth(startOfMonth(urlDate));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  useEffect(() => {
    supabase.auth
      .getSession()
      .then(({ data }) => setSession(data.session || null));

    const { data: sub } = supabase.auth.onAuthStateChange(
      (_event, newSession) => {
        setSession(newSession);
      }
    );

    return () => sub?.subscription?.unsubscribe?.();
  }, []);

  async function loadCalendarData() {
    setLoading(true);
    setMsg("");

    try {
      const { data: sess } = await supabase.auth.getSession();
      const token = sess?.session?.access_token;
      if (!token) throw new Error("Sesión no válida.");

      // Reuse your existing admin endpoint so rules/permissions stay consistent
      const res = await fetch("/.netlify/functions/admin-bookings?limit=500", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || "No se pudo cargar datos.");

      setBlackouts(data.blackouts || []);
      setBookings(data.bookings || []);
    } catch (e) {
      setMsg(e?.message || "No se pudo cargar calendario.");
      setBlackouts([]);
      setBookings([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (session && isAllowed) loadCalendarData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, isAllowed]);

  async function addBlackout(e) {
    e.preventDefault();
    setMsg("");

    if (!blockStart || !blockEnd) {
      setMsg("Completa inicio y fin.");
      return;
    }

    const startIso = new Date(blockStart).toISOString();
    const endIso = new Date(blockEnd).toISOString();

    if (new Date(endIso) <= new Date(startIso)) {
      setMsg("El fin debe ser posterior al inicio.");
      return;
    }

    setLoading(true);
    const { error } = await supabase.from("blackouts").insert({
      start_time: startIso,
      end_time: endIso,
      reason: blockReason || "Bloqueado",
    });
    setLoading(false);

    if (error) {
      setMsg(error.message);
      return;
    }

    setBlockStart("");
    setBlockEnd("");
    setBlockReason("Bloqueado");
    loadCalendarData();
  }

  async function deleteBlackout(id) {
    if (!confirm("¿Eliminar bloqueo?")) return;
    setLoading(true);
    const { error } = await supabase.from("blackouts").delete().eq("id", id);
    setLoading(false);

    if (error) {
      setMsg(error.message);
      return;
    }

    loadCalendarData();
  }

  // Calendar grid
  const calendarDays = useMemo(() => {
    const start = startOfMonth(calMonth);
    const end = endOfMonth(calMonth);

    // Monday-based index (Mon=0..Sun=6)
    const firstDow = (start.getDay() + 6) % 7;
    const totalDays = end.getDate();

    const cells = [];
    for (let i = 0; i < firstDow; i++) cells.push(null);
    for (let d = 1; d <= totalDays; d++) {
      cells.push(new Date(start.getFullYear(), start.getMonth(), d));
    }
    while (cells.length % 7 !== 0) cells.push(null);

    return cells;
  }, [calMonth]);

  const dayCounts = useMemo(() => {
    // per-day counts for the visible month
    const start = startOfMonth(calMonth);
    const end = endOfMonth(calMonth);

    const map = new Map(); // iso -> { bookings, blocks }
    function bump(dayIso, key) {
      const prev = map.get(dayIso) || { bookings: 0, blocks: 0 };
      prev[key] += 1;
      map.set(dayIso, prev);
    }

    for (const b of bookings) {
      const dt = new Date(b.start_time);
      if (dt < start || dt > end) continue;
      bump(isoDate(dt), "bookings");
    }

    for (const bl of blackouts) {
      const dt = new Date(bl.start_time);
      if (dt < start || dt > end) continue;
      bump(isoDate(dt), "blocks");
    }

    return map;
  }, [bookings, blackouts, calMonth]);

  // Bookings for selected day (local day)
  const bookingsForDay = useMemo(() => {
    const d0 = startOfDay(selectedDate).getTime();
    const d1 = endOfDay(selectedDate).getTime();

    return (bookings || [])
      .filter((b) => {
        const t = new Date(b.start_time).getTime();
        return t >= d0 && t <= d1;
      })
      .sort((a, b) => new Date(a.start_time) - new Date(b.start_time));
  }, [bookings, selectedDate]);

  // Blocks that overlap selected day
  const blocksForDay = useMemo(() => {
    const dayStart = startOfDay(selectedDate).getTime();
    const dayEnd = endOfDay(selectedDate).getTime();

    return (blackouts || [])
      .filter((b) => {
        const a = new Date(b.start_time).getTime();
        const c = new Date(b.end_time).getTime();
        // overlap test
        return a <= dayEnd && c >= dayStart;
      })
      .sort((a, b) => new Date(a.start_time) - new Date(b.start_time));
  }, [blackouts, selectedDate]);

  function pickDay(d) {
    setSelectedDate(d);
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set("date", isoDate(d));
      return next;
    });
  }

  function quickBlockFullDay() {
    const s = startOfDay(selectedDate);
    const e = endOfDay(selectedDate);

    setBlockStart(toLocalDatetimeInputValue(s));
    setBlockEnd(toLocalDatetimeInputValue(e));
    setBlockReason("Bloqueado");
    setMsg("Listo: rango rellenado para bloquear el día completo.");
  }

  function quickBlockMorning() {
    const s = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate(),
      9,
      0,
      0,
      0
    );
    const e = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate(),
      14,
      0,
      0,
      0
    );

    setBlockStart(toLocalDatetimeInputValue(s));
    setBlockEnd(toLocalDatetimeInputValue(e));
    setBlockReason("Bloqueado");
    setMsg("Listo: rango rellenado (mañana).");
  }

  function quickBlockAfternoon() {
    const s = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate(),
      15,
      0,
      0,
      0
    );
    const e = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate(),
      20,
      0,
      0,
      0
    );

    setBlockStart(toLocalDatetimeInputValue(s));
    setBlockEnd(toLocalDatetimeInputValue(e));
    setBlockReason("Bloqueado");
    setMsg("Listo: rango rellenado (tarde).");
  }

  // ---------- UI Guards ----------
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

  if (!isAllowed) {
    return (
      <Wrap>
        <Card>
          <h2 style={{ margin: "0 0 0.35rem" }}>Acceso denegado</h2>
          <p style={{ margin: 0, opacity: 0.75 }}>
            Este usuario no está en la lista de administradores.
          </p>
        </Card>
      </Wrap>
    );
  }

  // ---------- MAIN ----------
  return (
    <Wrap>
      {/* Header */}
      <Card
        style={{
          border: `1px solid ${COLORS.border}`,
          background: "white",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "1rem",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <div>
            <h2 style={{ margin: "0 0 0.25rem", color: COLORS.coffee }}>
              Calendario
            </h2>
            <p style={{ margin: 0, opacity: 0.8, color: COLORS.stone }}>
              Ver reservas por día + bloquear disponibilidad.
            </p>
            {msg && <p style={{ margin: "0.5rem 0 0", opacity: 0.9 }}>{msg}</p>}
          </div>

          <div style={{ display: "flex", gap: "0.6rem" }}>
            <Button onClick={loadCalendarData} disabled={loading}>
              {loading ? "Cargando..." : "Actualizar"}
            </Button>
          </div>
        </div>
      </Card>

      {/* Top grid: Calendar + Day details */}
      <div
        className="calGrid"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "1rem",
          alignItems: "start",
        }}
      >
        {/* Calendar (month) */}
        <Card
          style={{ border: `1px solid ${COLORS.border}`, background: "white" }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "0.6rem",
            }}
          >
            <button
              type="button"
              onClick={() => setCalMonth((m) => addMonths(m, -1))}
              style={{
                border: `1px solid ${COLORS.border}`,
                background: "white",
                borderRadius: 12,
                padding: "0.35rem 0.55rem",
                cursor: "pointer",
                fontWeight: 900,
                color: COLORS.coffee,
              }}
              aria-label="Mes anterior"
            >
              ‹
            </button>

            <div
              style={{
                fontWeight: 900,
                color: COLORS.coffee,
                textTransform: "capitalize",
              }}
            >
              {monthLabel(calMonth)}
            </div>

            <button
              type="button"
              onClick={() => setCalMonth((m) => addMonths(m, 1))}
              style={{
                border: `1px solid ${COLORS.border}`,
                background: "white",
                borderRadius: 12,
                padding: "0.35rem 0.55rem",
                cursor: "pointer",
                fontWeight: 900,
                color: COLORS.coffee,
              }}
              aria-label="Mes siguiente"
            >
              ›
            </button>
          </div>

          <div style={{ height: "0.75rem" }} />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(7, 1fr)",
              gap: "0.35rem",
              padding: "0.25rem 0.1rem",
              color: COLORS.stone,
              fontWeight: 900,
              fontSize: "0.78rem",
            }}
          >
            {["L", "M", "X", "J", "V", "S", "D"].map((d) => (
              <div key={d} style={{ textAlign: "center" }}>
                {d}
              </div>
            ))}
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(7, 1fr)",
              gap: "0.35rem",
              padding: "0.1rem",
            }}
          >
            {calendarDays.map((d, idx) => {
              if (!d)
                return <div key={`empty-${idx}`} style={{ height: 44 }} />;

              const key = isoDate(d);
              const stats = dayCounts.get(key);
              const hasBookings = (stats?.bookings || 0) > 0;
              const hasBlocks = (stats?.blocks || 0) > 0;

              const isSelected = sameDay(d, selectedDate);
              const isToday = sameDay(d, new Date());

              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => pickDay(d)}
                  style={{
                    height: 44,
                    borderRadius: 12,
                    border: `1px solid ${COLORS.border}`,
                    background: isSelected
                      ? COLORS.givry
                      : isToday
                      ? "rgba(248,227,190,0.55)"
                      : "white",
                    cursor: "pointer",
                    fontWeight: 900,
                    color: COLORS.coffee,
                    position: "relative",
                    outline: "none",
                  }}
                  title="Ver día"
                >
                  {d.getDate()}

                  <div
                    style={{
                      position: "absolute",
                      left: 8,
                      bottom: 7,
                      display: "flex",
                      gap: 6,
                      alignItems: "center",
                    }}
                  >
                    {hasBookings && (
                      <span
                        style={{
                          width: 7,
                          height: 7,
                          borderRadius: 999,
                          background: COLORS.barley,
                        }}
                        title="Hay reservas"
                      />
                    )}
                    {hasBlocks && (
                      <span
                        style={{
                          width: 7,
                          height: 7,
                          borderRadius: 999,
                          background: COLORS.stone,
                        }}
                        title="Hay bloqueos"
                      />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          <div style={{ height: "0.75rem" }} />

          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 999,
                  background: COLORS.barley,
                }}
              />
              <span style={{ opacity: 0.85, color: COLORS.stone }}>
                Reservas
              </span>
            </div>

            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 999,
                  background: COLORS.stone,
                }}
              />
              <span style={{ opacity: 0.85, color: COLORS.stone }}>
                Bloqueos
              </span>
            </div>
          </div>
        </Card>

        {/* Day panel */}
        <Card
          style={{ border: `1px solid ${COLORS.border}`, background: "white" }}
        >
          <h3 style={{ marginTop: 0, color: COLORS.coffee }}>
            Día seleccionado:{" "}
            <span style={{ textTransform: "capitalize" }}>
              {selectedDate.toLocaleDateString("es-ES", {
                weekday: "long",
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </span>
          </h3>

          <div style={{ display: "grid", gap: "0.75rem" }}>
            {/* Quick block buttons */}
            <div
              style={{
                display: "flex",
                gap: "0.5rem",
                flexWrap: "wrap",
              }}
            >
              <Button type="button" onClick={quickBlockFullDay}>
                Bloquear día completo
              </Button>
              <Button type="button" onClick={quickBlockMorning}>
                Bloquear mañana
              </Button>
              <Button type="button" onClick={quickBlockAfternoon}>
                Bloquear tarde
              </Button>
            </div>

            <div>
              <h4 style={{ margin: "0 0 0.5rem", color: COLORS.coffee }}>
                Reservas del día
              </h4>

              <Table>
                <thead>
                  <tr>
                    <th>Hora</th>
                    <th>Cliente</th>
                    <th>Pack</th>
                  </tr>
                </thead>
                <tbody>
                  {bookingsForDay.map((bk) => (
                    <tr key={bk.id}>
                      <td>
                        <strong>{formatLocal(bk.start_time)}</strong>
                        <div style={{ opacity: 0.75 }}>
                          {formatLocal(bk.end_time)}
                        </div>
                      </td>
                      <td>
                        <div style={{ fontWeight: 900 }}>
                          {bk.customer_name}
                        </div>
                        <div style={{ opacity: 0.75 }}>{bk.phone}</div>
                        {bk.city && (
                          <div style={{ opacity: 0.75 }}>{bk.city}</div>
                        )}
                      </td>
                      <td style={{ fontWeight: 900 }}>{bk.pack}</td>
                    </tr>
                  ))}

                  {bookingsForDay.length === 0 && (
                    <tr>
                      <td colSpan="3" style={{ opacity: 0.7 }}>
                        No hay reservas para este día.
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>

            <div>
              <h4 style={{ margin: "0 0 0.5rem", color: COLORS.coffee }}>
                Bloqueos que afectan este día
              </h4>

              <Table>
                <thead>
                  <tr>
                    <th>Rango</th>
                    <th>Motivo</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {blocksForDay.map((b) => (
                    <tr key={b.id}>
                      <td>
                        {formatLocal(b.start_time)} → {formatLocal(b.end_time)}
                      </td>
                      <td>{b.reason}</td>
                      <td>
                        <Button
                          $variant="danger"
                          onClick={() => deleteBlackout(b.id)}
                          disabled={loading}
                        >
                          Eliminar
                        </Button>
                      </td>
                    </tr>
                  ))}

                  {blocksForDay.length === 0 && (
                    <tr>
                      <td colSpan="3" style={{ opacity: 0.7 }}>
                        No hay bloqueos para este día.
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          </div>
        </Card>
      </div>

      {/* Blocking form */}
      <Card
        style={{ border: `1px solid ${COLORS.border}`, background: "white" }}
      >
        <h3 style={{ marginTop: 0, color: COLORS.coffee }}>Bloquear horas</h3>

        <p style={{ margin: "0 0 0.75rem", opacity: 0.8, color: COLORS.stone }}>
          Consejo: usa los botones rápidos arriba (día completo / mañana /
          tarde) y luego pulsa “Añadir bloqueo”.
        </p>

        <form onSubmit={addBlackout}>
          <Row>
            <Label>
              <span>Inicio</span>
              <Input
                type="datetime-local"
                value={blockStart}
                onChange={(e) => setBlockStart(e.target.value)}
                required
              />
            </Label>
            <Label>
              <span>Fin</span>
              <Input
                type="datetime-local"
                value={blockEnd}
                onChange={(e) => setBlockEnd(e.target.value)}
                required
              />
            </Label>
          </Row>

          <div style={{ height: "0.75rem" }} />

          <Row>
            <Label>
              <span>Motivo</span>
              <Input
                value={blockReason}
                onChange={(e) => setBlockReason(e.target.value)}
                placeholder="Bloqueado / Vacaciones / etc."
              />
            </Label>
            <Button type="submit" disabled={loading}>
              Añadir bloqueo
            </Button>
          </Row>
        </form>

        <div style={{ height: "1rem" }} />

        <h4 style={{ margin: "0 0 0.6rem", color: COLORS.coffee }}>
          Todos los bloqueos
        </h4>

        <Table>
          <thead>
            <tr>
              <th>Rango</th>
              <th>Motivo</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {blackouts.map((b) => (
              <tr key={b.id}>
                <td>
                  {formatLocal(b.start_time)} → {formatLocal(b.end_time)}
                </td>
                <td>{b.reason}</td>
                <td>
                  <Button
                    $variant="danger"
                    onClick={() => deleteBlackout(b.id)}
                    disabled={loading}
                  >
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))}

            {blackouts.length === 0 && (
              <tr>
                <td colSpan="3" style={{ opacity: 0.7 }}>
                  No hay bloqueos.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Card>

      <style>{`
        @media (max-width: 980px) {
          .calGrid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </Wrap>
  );
}
