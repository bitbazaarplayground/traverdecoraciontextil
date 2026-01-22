import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabaseClient.js";
import { Button, Card, Input, Table } from "./adminStyles";
import { formatLocal } from "./utils";

/** Brand palette */
const COLORS = {
  barley: "#a07f55",
  coffee: "#756452",
  givry: "#f8e3be",
  stone: "#918170",
  bg: "rgba(245,245,245,0.9)",
  border: "rgba(17,17,17,0.10)",
};

function toCustomerKey(bk) {
  return (bk.phone || bk.email || "").trim().toLowerCase();
}

function statusLabel(s) {
  return (
    {
      nuevo: "Nuevo",
      presupuesto: "Presupuesto",
      en_proceso: "En proceso",
      finalizado: "Finalizado",
      no_interesado: "No interesado",
    }[s] ||
    s ||
    "—"
  );
}

function StatusChip({ value }) {
  const v = value || "nuevo";
  const bg =
    v === "finalizado"
      ? "#e6f7ea"
      : v === "presupuesto"
      ? "#fff4e5"
      : v === "en_proceso"
      ? "#eef2ff"
      : v === "no_interesado"
      ? "#fdecec"
      : "#eef2ff";

  return (
    <span
      style={{
        padding: "0.2rem 0.5rem",
        borderRadius: 999,
        fontSize: "0.72rem",
        fontWeight: 900,
        background: bg,
        whiteSpace: "nowrap",
        border: `1px solid ${COLORS.border}`,
      }}
    >
      {statusLabel(v)}
    </span>
  );
}

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

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const [bookings, setBookings] = useState([]);
  const [blackouts, setBlackouts] = useState([]);

  const [query, setQuery] = useState("");

  // calendar state (mini view)
  const [calMonth, setCalMonth] = useState(() => startOfMonth(new Date()));

  // auth session
  useEffect(() => {
    supabase.auth
      .getSession()
      .then(({ data }) => setSession(data.session || null));

    const { data: sub } = supabase.auth.onAuthStateChange(
      (_event, newSession) => setSession(newSession)
    );

    return () => sub?.subscription?.unsubscribe?.();
  }, []);

  async function loadDashboardData() {
    setLoading(true);
    setMsg("");

    try {
      const { data: sess } = await supabase.auth.getSession();
      const token = sess?.session?.access_token;
      if (!token) throw new Error("Sesión no válida.");

      const res = await fetch("/.netlify/functions/admin-bookings?limit=500", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || "No se pudo cargar datos.");

      setBookings(data.bookings || []);
      setBlackouts(data.blackouts || []);
    } catch (e) {
      setMsg(e?.message || "Error cargando datos");
      setBookings([]);
      setBlackouts([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (session) loadDashboardData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  const now = new Date();

  // KPIs
  const kpis = useMemo(() => {
    const upcoming = bookings.filter((b) => new Date(b.start_time) >= now);

    const presupuestos = bookings.filter((b) => {
      const s = b.status_admin || "nuevo";
      return s === "nuevo" || s === "presupuesto";
    });

    const instalaciones = bookings.filter((b) => {
      const s = b.status_admin || "nuevo";
      return s === "en_proceso" || s === "finalizado";
    });

    const bloquesProx = blackouts.filter((x) => new Date(x.end_time) >= now);

    return {
      clientesSolicitando: new Set(upcoming.map(toCustomerKey)).size,
      presupuestosPend: presupuestos.length,
      instalacionesProg: instalaciones.length,
      bloqueosCalendario: bloquesProx.length,
    };
  }, [bookings, blackouts]);

  // Requests list (dashboard summary)
  const requestList = useMemo(() => {
    const q = query.trim().toLowerCase();

    return bookings
      .filter((b) => new Date(b.start_time) >= now)
      .filter((b) => {
        if (!q) return true;
        const hay = [b.customer_name, b.phone, b.email, b.city, b.pack]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        return hay.includes(q);
      })
      .sort((a, b) => new Date(a.start_time) - new Date(b.start_time))
      .slice(0, 6);
  }, [bookings, query]);

  // Blackouts list (dashboard summary)
  const upcomingBlocks = useMemo(() => {
    return blackouts
      .filter((b) => new Date(b.end_time) >= now)
      .sort((a, b) => new Date(a.start_time) - new Date(b.start_time))
      .slice(0, 4);
  }, [blackouts]);

  // Mini calendar: build days grid
  const calendarDays = useMemo(() => {
    const start = startOfMonth(calMonth);
    const end = endOfMonth(calMonth);

    // Convert Sunday-based to Monday-based index (Mon=0..Sun=6)
    const firstDow = (start.getDay() + 6) % 7;
    const totalDays = end.getDate();

    const cells = [];
    for (let i = 0; i < firstDow; i++) cells.push(null);
    for (let d = 1; d <= totalDays; d++) {
      cells.push(new Date(start.getFullYear(), start.getMonth(), d));
    }

    // pad to complete weeks
    while (cells.length % 7 !== 0) cells.push(null);

    return cells;
  }, [calMonth]);

  const monthStats = useMemo(() => {
    // count bookings + blocks per day (current month)
    const start = startOfMonth(calMonth);
    const end = endOfMonth(calMonth);

    const counts = new Map(); // iso -> { bookings, blocks }
    function bump(map, dayIso, k) {
      const prev = map.get(dayIso) || { bookings: 0, blocks: 0 };
      prev[k] += 1;
      map.set(dayIso, prev);
    }

    for (const b of bookings) {
      const dt = new Date(b.start_time);
      if (dt < start || dt > end) continue;
      bump(counts, isoDate(dt), "bookings");
    }

    for (const bl of blackouts) {
      const dt = new Date(bl.start_time);
      if (dt < start || dt > end) continue;
      bump(counts, isoDate(dt), "blocks");
    }

    return counts;
  }, [bookings, blackouts, calMonth]);

  const kpiCardStyle = {
    border: `1px solid ${COLORS.border}`,
    background: "white",
  };

  return (
    <div style={{ display: "grid", gap: "1rem" }}>
      {/* Header */}
      <Card style={{ ...kpiCardStyle }}>
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
            <h2 style={{ margin: 0, color: COLORS.coffee }}>
              Bienvenido, Admin
            </h2>
            <p
              style={{
                margin: "0.25rem 0 0",
                opacity: 0.8,
                color: COLORS.stone,
              }}
            >
              Gestiona solicitudes, disponibilidad del calendario y más.
            </p>
            {msg && <p style={{ margin: "0.5rem 0 0", opacity: 0.9 }}>{msg}</p>}
          </div>

          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            <Button onClick={loadDashboardData} disabled={loading}>
              {loading ? "Cargando..." : "Actualizar"}
            </Button>
            <Button type="button" onClick={() => navigate("/admin/requests")}>
              Ver bandeja
            </Button>
          </div>
        </div>
      </Card>

      {/* KPI row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
          gap: "0.75rem",
        }}
      >
        {[
          ["Clientes solicitando", kpis.clientesSolicitando],
          ["Presupuestos pendientes", kpis.presupuestosPend],
          ["Instalaciones programadas", kpis.instalacionesProg],
          ["Bloqueos calendario", kpis.bloqueosCalendario],
        ].map(([label, value]) => (
          <Card key={label} style={kpiCardStyle}>
            <div style={{ display: "grid", gap: 6 }}>
              <div
                style={{ opacity: 0.85, fontWeight: 900, color: COLORS.stone }}
              >
                {label}
              </div>
              <div
                style={{
                  fontSize: "1.7rem",
                  fontWeight: 900,
                  color: COLORS.coffee,
                }}
              >
                {value}
              </div>
              <div
                style={{
                  height: 4,
                  borderRadius: 999,
                  background: COLORS.givry,
                  border: `1px solid ${COLORS.border}`,
                }}
              />
            </div>
          </Card>
        ))}
      </div>

      {/* Two-column panels */}
      <div
        className="dashGrid"
        style={{
          display: "grid",
          gridTemplateColumns: "1.35fr 0.85fr",
          gap: "1rem",
          alignItems: "start",
        }}
      >
        {/* Left: Requests */}
        <Card style={kpiCardStyle}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "0.75rem",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <div style={{ display: "grid", gap: 2 }}>
              <h3 style={{ margin: 0, color: COLORS.coffee }}>
                Solicitudes de clientes
              </h3>
              <div
                style={{
                  opacity: 0.8,
                  fontSize: "0.9rem",
                  color: COLORS.stone,
                }}
              >
                Próximas reservas / peticiones recientes
              </div>
            </div>

            <Button type="button" onClick={() => navigate("/admin/requests")}>
              Ver todas
            </Button>
          </div>

          <div style={{ height: "0.75rem" }} />

          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar clientes..."
          />

          <div style={{ height: "0.75rem" }} />

          <Table>
            <thead>
              <tr>
                <th>Cliente</th>
                <th>Fecha</th>
                <th>Pack</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {requestList.map((bk) => (
                <tr
                  key={bk.id}
                  onClick={() => navigate("/admin/requests")}
                  style={{ cursor: "pointer" }}
                >
                  <td>
                    <div style={{ fontWeight: 900 }}>{bk.customer_name}</div>
                    <div style={{ opacity: 0.75, color: COLORS.stone }}>
                      {bk.city || "—"}
                    </div>
                  </td>
                  <td>
                    <div style={{ fontWeight: 800 }}>
                      {formatLocal(bk.start_time)}
                    </div>
                    <div style={{ opacity: 0.75, color: COLORS.stone }}>
                      {formatLocal(bk.end_time)}
                    </div>
                  </td>
                  <td style={{ fontWeight: 800 }}>{bk.pack}</td>
                  <td>
                    <StatusChip value={bk.status_admin || "nuevo"} />
                  </td>
                </tr>
              ))}

              {requestList.length === 0 && (
                <tr>
                  <td colSpan="4" style={{ opacity: 0.7 }}>
                    No hay solicitudes próximas.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card>

        {/* Right: Calendar */}
        <Card style={kpiCardStyle}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "0.75rem",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <div style={{ display: "grid", gap: 2 }}>
              <h3 style={{ margin: 0, color: COLORS.coffee }}>
                Calendario y bloqueos
              </h3>
              <div
                style={{
                  opacity: 0.8,
                  fontSize: "0.9rem",
                  color: COLORS.stone,
                }}
              >
                Haz clic en un día para ver detalles
              </div>
            </div>

            <Button type="button" onClick={() => navigate("/admin/calendario")}>
              Abrir
            </Button>
          </div>

          <div style={{ height: "0.75rem" }} />

          {/* Mini month header */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.5rem 0.25rem",
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

          {/* Week labels */}
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

          {/* Days grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(7, 1fr)",
              gap: "0.35rem",
              padding: "0.1rem",
            }}
          >
            {calendarDays.map((d, idx) => {
              if (!d) {
                return <div key={`empty-${idx}`} style={{ height: 42 }} />;
              }

              const key = isoDate(d);
              const stats = monthStats.get(key);
              const isToday = sameDay(d, new Date());

              const hasBookings = (stats?.bookings || 0) > 0;
              const hasBlocks = (stats?.blocks || 0) > 0;

              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => navigate(`/admin/calendario?date=${key}`)}
                  style={{
                    height: 42,
                    borderRadius: 12,
                    border: `1px solid ${COLORS.border}`,
                    background: isToday ? COLORS.givry : "white",
                    cursor: "pointer",
                    fontWeight: 900,
                    color: COLORS.coffee,
                    position: "relative",
                    outline: "none",
                  }}
                  title="Ver día"
                >
                  {d.getDate()}

                  {/* tiny indicators */}
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

          <div style={{ height: "0.9rem" }} />

          {/* Upcoming blocks preview */}
          <div style={{ display: "grid", gap: "0.6rem" }}>
            {upcomingBlocks.map((b) => (
              <div
                key={b.id}
                style={{
                  padding: "0.75rem",
                  borderRadius: 14,
                  border: `1px solid ${COLORS.border}`,
                  background: "rgba(17,17,17,0.02)",
                  display: "grid",
                  gap: 4,
                }}
              >
                <div style={{ fontWeight: 900, color: COLORS.coffee }}>
                  {formatLocal(b.start_time)} → {formatLocal(b.end_time)}
                </div>
                <div style={{ opacity: 0.85, color: COLORS.stone }}>
                  {b.reason || "Bloqueado"}
                </div>
              </div>
            ))}

            {upcomingBlocks.length === 0 && (
              <div style={{ opacity: 0.8, color: COLORS.stone }}>
                No hay bloqueos próximos.
              </div>
            )}
          </div>

          <div style={{ height: "0.9rem" }} />

          <Button
            type="button"
            onClick={() => navigate("/admin/calendario")}
            style={{ width: "100%" }}
          >
            Bloquear fechas
          </Button>
        </Card>
      </div>

      <style>{`
        @media (max-width: 980px) {
          .dashGrid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
