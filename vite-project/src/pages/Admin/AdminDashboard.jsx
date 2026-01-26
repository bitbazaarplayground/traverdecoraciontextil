import { useEffect, useMemo, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { supabase } from "../../lib/supabaseClient.js";
import { Button, Card, Input } from "./adminStyles";
import { formatLocal } from "./utils";

/** Brand palette */
const COLORS = {
  barley: "#a07f55",
  coffee: "#756452",
  givry: "#f8e3be",
  stone: "#918170",
  bg: "#f1ebe6",
  border: "rgba(17,17,17,0.10)",
  softLine: "rgba(17,17,17,0.06)",
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

  const border =
    v === "finalizado"
      ? "rgba(60,140,90,0.20)"
      : v === "presupuesto"
      ? "rgba(190,120,20,0.20)"
      : v === "en_proceso"
      ? "rgba(70,90,190,0.18)"
      : v === "no_interesado"
      ? "rgba(190,70,70,0.18)"
      : "rgba(70,90,190,0.18)";

  return (
    <span
      style={{
        padding: "0.22rem 0.55rem",
        borderRadius: 999,
        fontSize: "0.72rem",
        fontWeight: 900,
        background: bg,
        border: `1px solid ${border}`,
        whiteSpace: "nowrap",
      }}
    >
      {statusLabel(v)}
    </span>
  );
}

function initials(name) {
  const parts = String(name || "")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  if (!parts.length) return "—";
  const a = parts[0]?.[0] || "";
  const b = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (a + b).toUpperCase();
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
  const outlet = useOutletContext() || {};
  const adminName = outlet.adminName || "Admin";

  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const [bookings, setBookings] = useState([]);
  const [blackouts, setBlackouts] = useState([]);

  // ✅ NEW: customers table (source of truth for status)
  const [customers, setCustomers] = useState([]);

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

      // 1) bookings + blackouts from your existing endpoint
      const res = await fetch("/.netlify/functions/admin-bookings?limit=500", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || "No se pudo cargar datos.");

      setBookings(Array.isArray(data.bookings) ? data.bookings : []);
      setBlackouts(Array.isArray(data.blackouts) ? data.blackouts : []);

      // 2) ✅ customers from Supabase (join in UI)
      //    Note: this relies on RLS being correct for admins.
      const { data: customerRows, error: custErr } = await supabase
        .from("customers")
        .select("customer_key,status,interested_at,completed_at,updated_at");

      if (custErr) {
        console.warn("Customers load error:", custErr.message);
        // We don't hard-fail the dashboard: it still works with fallback.
        setCustomers([]);
      } else {
        setCustomers(Array.isArray(customerRows) ? customerRows : []);
      }
    } catch (e) {
      setMsg(e?.message || "Error cargando datos");
      setBookings([]);
      setBlackouts([]);
      setCustomers([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (session) loadDashboardData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  const now = new Date();

  // ✅ map customer_key -> customer row
  const customerByKey = useMemo(() => {
    const map = new Map();
    for (const c of customers || []) {
      if (!c?.customer_key) continue;
      map.set(String(c.customer_key).trim().toLowerCase(), c);
    }
    return map;
  }, [customers]);

  // ✅ helper: get customer status for a booking
  function getCustomerStatusForBooking(bk) {
    const key = toCustomerKey(bk);
    const row = customerByKey.get(key);
    return (row?.status || "nuevo").trim().toLowerCase();
  }

  // ✅ KPIs should be customer-pipeline based
  const kpis = useMemo(() => {
    const upcomingBookings = bookings.filter(
      (b) => new Date(b.start_time) >= now
    );

    // Unique customers with upcoming bookings (still useful KPI)
    const clientesSolicitando = new Set(upcomingBookings.map(toCustomerKey))
      .size;

    // Customers in stages (pipeline)
    let presupuestosPend = 0;
    let instalacionesProg = 0;

    for (const c of customers || []) {
      const s = (c.status || "nuevo").toLowerCase();
      if (s === "nuevo" || s === "presupuesto") presupuestosPend += 1;
      if (s === "en_proceso" || s === "finalizado") instalacionesProg += 1;
    }

    const bloqueosCalendario = blackouts.filter(
      (x) => new Date(x.end_time) >= now
    ).length;

    return {
      clientesSolicitando,
      presupuestosPend,
      instalacionesProg,
      bloqueosCalendario,
    };
  }, [bookings, blackouts, customers]);

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

  // ✅ Installations: derived from customer pipeline status (not booking status)
  const installations = useMemo(() => {
    // show upcoming bookings for customers in en_proceso/finalizado
    return bookings
      .map((b) => ({ b, status: getCustomerStatusForBooking(b) }))
      .filter(({ b, status }) => {
        const dt = new Date(b.start_time);
        return (
          dt >= now && (status === "en_proceso" || status === "finalizado")
        );
      })
      .sort((a, b) => new Date(a.b.start_time) - new Date(b.b.start_time))
      .slice(0, 6)
      .map((x) => ({ ...x.b, _customer_status: x.status }));
  }, [bookings, customers]); // customerByKey is derived from customers

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

    while (cells.length % 7 !== 0) cells.push(null);
    return cells;
  }, [calMonth]);

  const monthStats = useMemo(() => {
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

  return (
    <div style={{ display: "grid", gap: "1rem" }}>
      <style>{`
        .kpiGrid {
          display: grid;
          gap: 0.75rem;
          grid-template-columns: repeat(4, minmax(0, 1fr));
        }
        .mainGrid {
          display: grid;
          gap: 1rem;
          align-items: start;
          grid-template-columns: 1.35fr 0.85fr;
        }
        .softCard {
          border: 1px solid ${COLORS.border};
          background: rgba(255,255,255,0.88);
        }

        .reqList { margin-top: 0.9rem; display: grid; }
        .reqRow {
          display: grid;
          grid-template-columns: 42px 1.2fr 1fr auto;
          gap: 0.85rem;
          align-items: center;
          padding: 0.9rem 0.25rem;
          border-top: 1px solid ${COLORS.softLine};
          cursor: pointer;
        }
        .reqRow:first-child { border-top: none; padding-top: 0.4rem; }
        .reqRow:hover {
          background: rgba(248,227,190,0.22);
          border-radius: 12px;
          padding-left: 0.6rem;
          padding-right: 0.6rem;
          margin-left: -0.35rem;
          margin-right: -0.35rem;
        }
        .reqAvatar {
          width: 38px;
          height: 38px;
          border-radius: 999px;
          border: 1px solid ${COLORS.border};
          background: rgba(17,17,17,0.03);
          display: grid;
          place-items: center;
          font-weight: 900;
          color: ${COLORS.coffee};
          font-size: 0.8rem;
        }
        .reqTitle { font-weight: 900; color: ${COLORS.coffee}; line-height: 1.1; }
        .reqSub { opacity: 0.78; color: ${COLORS.stone}; font-size: 0.88rem; margin-top: 0.15rem; }
        .reqMeta { text-align: right; }
        .reqMetaTop { font-weight: 900; color: ${COLORS.coffee}; font-size: 0.92rem; }
        .reqMetaBottom { opacity: 0.78; color: ${COLORS.stone}; font-size: 0.86rem; margin-top: 0.15rem; }

        .calNavBtn {
          border: 1px solid ${COLORS.border};
          background: white;
          border-radius: 12px;
          padding: 0.35rem 0.55rem;
          cursor: pointer;
          font-weight: 900;
          color: ${COLORS.coffee};
        }

        .instHeaderRow {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          gap: 0.75rem;
          flex-wrap: wrap;
          border-top: 1px solid ${COLORS.softLine};
          margin-top: 1rem;
          padding-top: 0.85rem;
        }
        .instTable {
          width: 100%;
          border-collapse: collapse;
          margin-top: 0.65rem;
        }
        .instTable th {
          text-align: left;
          font-size: 0.75rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: ${COLORS.stone};
          padding: 0.55rem 0;
          border-bottom: 1px solid ${COLORS.softLine};
        }
        .instTable td {
          padding: 0.75rem 0;
          border-bottom: 1px solid ${COLORS.softLine};
          vertical-align: top;
          color: ${COLORS.coffee};
        }
        .instDot {
          width: 10px;
          height: 10px;
          border-radius: 999px;
          border: 1px solid ${COLORS.border};
          display: inline-block;
          margin-right: 0.5rem;
          transform: translateY(1px);
        }

        @media (max-width: 1100px) { .mainGrid { grid-template-columns: 1fr; } }
        @media (max-width: 980px) {
          .kpiGrid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .reqRow {
            grid-template-columns: 42px 1fr;
            grid-template-rows: auto auto;
            row-gap: 0.35rem;
          }
          .reqMeta { text-align: left; }
          .reqMeta, .reqStatus { grid-column: 2 / -1; }
          .reqStatus { justify-self: start; }
        }
        @media (max-width: 520px) { .kpiGrid { grid-template-columns: 1fr; } }
      `}</style>

      {/* Header */}
      <Card className="softCard">
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
              Bienvenido, {adminName}
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
            {msg && (
              <p
                style={{
                  margin: "0.5rem 0 0",
                  opacity: 0.9,
                  color: COLORS.coffee,
                }}
              >
                {msg}
              </p>
            )}
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
      <div className="kpiGrid">
        {[
          ["Clientes solicitando", kpis.clientesSolicitando],
          ["Presupuestos pendientes", kpis.presupuestosPend],
          ["Instalaciones programadas", kpis.instalacionesProg],
          ["Bloqueos calendario", kpis.bloqueosCalendario],
        ].map(([label, value]) => (
          <Card key={label} className="softCard">
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

      {/* Main grid */}
      <div className="mainGrid">
        {/* Left: Requests */}
        <Card className="softCard">
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

          <div style={{ height: "0.85rem" }} />

          <div
            style={{
              display: "flex",
              gap: "0.75rem",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <div style={{ flex: 1, minWidth: 240 }}>
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar clientes..."
              />
            </div>
          </div>

          {/* List */}
          <div className="reqList">
            {requestList.map((bk) => {
              const s = new Date(bk.start_time);
              const time = s.toLocaleTimeString("es-ES", {
                hour: "2-digit",
                minute: "2-digit",
              });
              const date = s.toLocaleDateString("es-ES", {
                weekday: "short",
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              });

              const customerStatus = getCustomerStatusForBooking(bk);

              const go = () =>
                navigate(`/admin/clientes/${encodeURIComponent(bk.id)}`);

              return (
                <div
                  key={bk.id}
                  className="reqRow"
                  onClick={go}
                  role="button"
                  tabIndex={0}
                  aria-label={`Abrir ficha de ${bk.customer_name || "cliente"}`}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") go();
                    if (e.key === " ") {
                      e.preventDefault(); // prevent page scroll
                      go();
                    }
                  }}
                >
                  <div className="reqAvatar">{initials(bk.customer_name)}</div>

                  <div>
                    <div className="reqTitle">{bk.customer_name || "—"}</div>
                    <div className="reqSub">{bk.city || "—"}</div>
                  </div>

                  <div className="reqMeta">
                    <div className="reqMetaTop">
                      {date}, {time}
                    </div>
                    <div className="reqMetaBottom">{bk.pack || "—"}</div>
                  </div>

                  <div className="reqStatus" style={{ justifySelf: "end" }}>
                    <StatusChip value={customerStatus} />
                  </div>
                </div>
              );
            })}

            {requestList.length === 0 && (
              <div
                style={{
                  padding: "0.9rem 0",
                  opacity: 0.8,
                  color: COLORS.stone,
                }}
              >
                No hay solicitudes próximas.
              </div>
            )}
          </div>

          {/* Installations */}
          <div className="instHeaderRow">
            <div
              style={{
                fontWeight: 900,
                color: COLORS.coffee,
                fontSize: "1.05rem",
              }}
            >
              Instalaciones en curso y próximas
            </div>

            <button
              type="button"
              onClick={() => navigate("/admin/requests")}
              style={{
                border: "none",
                background: "transparent",
                padding: 0,
                cursor: "pointer",
                fontWeight: 900,
                color: COLORS.barley,
              }}
            >
              Ver todas las instalaciones
            </button>
          </div>

          <table className="instTable">
            <thead>
              <tr>
                <th>Cliente</th>
                <th>Pack</th>
                <th>Estado</th>
                <th style={{ textAlign: "right" }}>Fecha</th>
              </tr>
            </thead>
            <tbody>
              {installations.map((bk) => {
                const status = bk._customer_status || "en_proceso";
                const dotBg = status === "finalizado" ? "#61b07a" : "#e0b15c";

                return (
                  <tr key={`inst-${bk.id}`}>
                    <td style={{ fontWeight: 900 }}>
                      {bk.customer_name || "—"}
                      <div
                        style={{
                          opacity: 0.75,
                          color: COLORS.stone,
                          fontWeight: 700,
                        }}
                      >
                        {bk.city || "—"}
                      </div>
                    </td>
                    <td style={{ fontWeight: 800 }}>{bk.pack || "—"}</td>
                    <td>
                      <span className="instDot" style={{ background: dotBg }} />
                      <span style={{ fontWeight: 900 }}>
                        {statusLabel(status)}
                      </span>
                    </td>
                    <td style={{ textAlign: "right", fontWeight: 900 }}>
                      {formatLocal(bk.start_time)}
                    </td>
                  </tr>
                );
              })}

              {installations.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    style={{
                      opacity: 0.8,
                      color: COLORS.stone,
                      padding: "0.9rem 0",
                    }}
                  >
                    No hay instalaciones registradas todavía.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </Card>

        {/* Right: Calendar */}
        <Card className="softCard">
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

          {/* Month header */}
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
              className="calNavBtn"
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
              className="calNavBtn"
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
              if (!d)
                return <div key={`empty-${idx}`} style={{ height: 42 }} />;

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

          <Button
            type="button"
            onClick={() => navigate("/admin/calendario")}
            style={{ width: "100%" }}
          >
            Ver calendario
          </Button>
        </Card>
      </div>
    </div>
  );
}

/**
 * Suggested next components (optional):
 * 1) <RequestsTabs />: "All / New / Pending / Closed" chip filters like screenshot
 * 2) <InstallationsStore />: a real table for installations instead of inferring from bookings
 * 3) <MiniCalendar />: extracted component with consistent sizing + keyboard navigation
 */
