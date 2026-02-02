import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { supabase } from "../../lib/supabaseClient.js";
import { Button, Card, Input, Label, Row, Table, Wrap } from "./adminStyles";
import AdminLogin from "./components/AdminLogin.jsx";
import { formatLocal, meetingModeLabel, toCustomerKey } from "./utils";

/**
 * AdminBookings.jsx
 * ---------------------------------------------------------
 * Sections (notes):
 * 1) Auth + allowlist gating
 * 2) Data loading (Netlify function, Bearer token)
 * 3) Helpers (labels, formatting)
 * 4) Mutations (blackouts)
 * 5) Filters (status + time)
 * 6) UI (header, drawer, blackout form, tables)
 *
 * Fixes included (per your list):
 *
 * ✅ (2) Drawer status change updates BOTH bookings + enquiries
 * ✅ (3) “Citas” table shows status_admin (safe & explicit) instead of bk.status
 * ✅ (5) Added “Recibido” column for bookings too (created_at)
 */

export default function AdminBookings() {
  const navigate = useNavigate();

  // -------------------------
  // 1) AUTH / ACCESS CONTROL
  // -------------------------
  const [session, setSession] = useState(null);
  useEffect(() => {
    console.log("[AdminBookings] mounted");
    return () => console.log("[AdminBookings] unmounted");
  }, []);

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

  // -------------------------
  // 2) UI / FEEDBACK STATE
  // -------------------------
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  // -------------------------
  // 3) DATA STATE
  // -------------------------
  const [bookings, setBookings] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [blackouts, setBlackouts] = useState([]);

  // -------------------------
  // 4) BLACKOUT FORM STATE
  // -------------------------
  const [blockStart, setBlockStart] = useState("");
  const [blockEnd, setBlockEnd] = useState("");
  const [blockReason, setBlockReason] = useState("Bloqueado");

  // -------------------------
  // 5) FILTERS
  // -------------------------
  const [statusFilter, setStatusFilter] = useState("todos");
  const [timeFilter, setTimeFilter] = useState("upcoming");

  // ✅ enquiries have their own filter
  const [enquiryStatusFilter, setEnquiryStatusFilter] = useState("todos");

  // -------------------------
  // 6) ROUTING QUIRK (RECOVERY)
  // -------------------------
  useEffect(() => {
    if (window.location.href.includes("type=recovery")) {
      window.location.replace("/admin/reset-password");
    }
  }, []);

  // -------------------------
  // 7) SESSION BOOTSTRAP
  // -------------------------
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

  // -------------------------
  // 8) HELPERS (ONE COPY ONLY ✅)
  // -------------------------

  function receivedLabel(row) {
    // Prefer created_at if your table has it
    if (row.created_at) return formatLocal(row.created_at);
    return "-";
  }

  function goToCustomer(row) {
    const key = toCustomerKey(row);
    if (!key) {
      alert("Este registro no tiene teléfono ni email para abrir la ficha.");
      return;
    }
    navigate(`/admin/clientes/${encodeURIComponent(key)}`);
  }

  // -------------------------
  // 9) DATA LOADING
  // -------------------------
  async function loadData() {
    setLoading(true);
    setMsg("");

    try {
      const { data: sess } = await supabase.auth.getSession();
      const token = sess?.session?.access_token;
      if (!token) throw new Error("Sesión no válida.");

      const res = await fetch("/.netlify/functions/admin-bookings?limit=200", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || "No se pudo cargar datos.");

      console.log("[AdminBookings] loaded:", {
        bookings: (data.bookings || []).length,
        enquiries: (data.enquiries || []).length,
        blackouts: (data.blackouts || []).length,
        firstEnquiry: data.enquiries?.[0],
      });

      setBookings(data.bookings || []);
      setEnquiries(data.enquiries || []);
      setBlackouts(data.blackouts || []);
    } catch (e) {
      setMsg(e?.message || "Error cargando datos");
      setBookings([]);
      setEnquiries([]);
      setBlackouts([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (session && isAllowed) loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, isAllowed]);

  // -------------------------
  // 10) AUTH ACTIONS
  // -------------------------
  async function signOut() {
    await supabase.auth.signOut();
  }

  // -------------------------
  // 11) BLACKOUT MUTATIONS
  // -------------------------
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
    loadData();
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

    loadData();
  }

  // -------------------------
  // 12) FILTERED ARRAYS
  // -------------------------
  const filteredBookings = useMemo(() => {
    const now = new Date();

    return (bookings || []).filter((b) => {
      const status = b.status_admin || "nuevo";
      const matchesStatus =
        statusFilter === "todos" ? true : status === statusFilter;

      const start = new Date(b.start_time);
      const matchesTime =
        timeFilter === "all"
          ? true
          : timeFilter === "upcoming"
          ? start >= now
          : start < now;

      return matchesStatus && matchesTime;
    });
  }, [bookings, statusFilter, timeFilter]);

  const filteredEnquiries = useMemo(() => {
    return (enquiries || []).filter((e) => {
      const status = e.status_admin || "nuevo";
      return enquiryStatusFilter === "todos"
        ? true
        : status === enquiryStatusFilter;
    });
  }, [enquiries, enquiryStatusFilter]);

  // -------------------------
  // 13) RENDER: LOGIN SCREEN
  // -------------------------
  console.log("[AdminBookings] render check:", {
    hasSession: !!session,
    isAllowed,
  });

  if (!session) {
    return (
      <AdminLogin adminAllowlist={adminAllowlist} onSession={setSession} />
    );
  }

  // -------------------------
  // 14) RENDER: NOT ALLOWED
  // -------------------------
  if (!isAllowed) {
    return (
      <Wrap>
        <Card>
          <h2 style={{ margin: "0 0 0.35rem" }}>Acceso denegado</h2>
          <p style={{ margin: 0, opacity: 0.75 }}>
            Este usuario no está en la lista de administradores.
          </p>
          <div style={{ marginTop: "1rem" }}>
            <Button onClick={signOut}>Cerrar sesión</Button>
          </div>
        </Card>
      </Wrap>
    );
  }

  // -------------------------
  // 15) RENDER: DASHBOARD
  // -------------------------
  return (
    <Wrap>
      {/* Header */}
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
            <h2 style={{ margin: "0 0 0.25rem" }}>Panel de reservas</h2>
            <p style={{ margin: 0, opacity: 0.75 }}>
              Ver reservas + bloquear disponibilidad.
            </p>
            {msg && (
              <p style={{ margin: "0.5rem 0 0", opacity: 0.85 }}>{msg}</p>
            )}
          </div>

          <div style={{ display: "flex", gap: "0.6rem" }}>
            <Button onClick={loadData} disabled={loading}>
              {loading ? "Cargando..." : "Actualizar"}
            </Button>
            <Button onClick={signOut}>Salir</Button>
          </div>
        </div>
      </Card>

      {/* Blackouts */}
      <Card>
        <h3 style={{ marginTop: 0 }}>Bloquear horas</h3>
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

        <h4 style={{ margin: "0 0 0.6rem" }}>Bloqueos</h4>
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

      {/* Bookings table */}
      <Card>
        <h3 style={{ marginTop: 0 }}>Citas (Tienda / Domicilio)</h3>

        {/* Filters */}
        <div
          style={{
            display: "flex",
            gap: "0.75rem",
            flexWrap: "wrap",
            marginTop: "0.75rem",
            marginBottom: "0.75rem",
          }}
        >
          <select
            value={enquiryStatusFilter}
            onChange={(e) => setEnquiryStatusFilter(e.target.value)}
            style={{
              padding: "0.5rem 0.65rem",
              borderRadius: 12,
              border: "1px solid rgba(17,17,17,0.12)",
              background: "rgba(17,17,17,0.02)",
              fontWeight: 800,
            }}
          >
            <option value="todos">Todos</option>
            <option value="nuevo">Nuevo</option>
            <option value="presupuesto">Presupuesto</option>
            <option value="en_proceso">En proceso</option>
            <option value="finalizado">Finalizado</option>
            <option value="no_interesado">No interesado</option>
          </select>

          <select
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value)}
            style={{
              padding: "0.5rem 0.65rem",
              borderRadius: 12,
              border: "1px solid rgba(17,17,17,0.12)",
              background: "rgba(17,17,17,0.02)",
              fontWeight: 800,
            }}
          >
            <option value="upcoming">Próximas</option>
            <option value="past">Pasadas</option>
            <option value="all">Todas</option>
          </select>
        </div>

        <Table>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Recibido</th> {/* ✅ Fix #5 */}
              <th>Cliente</th>
              <th>Contexto</th>
              <th>Mensaje</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.map((bk) => (
              <tr key={bk.id}>
                <td>
                  <div>
                    <strong>{formatLocal(bk.start_time)}</strong>
                  </div>
                  <div style={{ opacity: 0.75 }}>
                    {formatLocal(bk.end_time)}
                  </div>
                </td>

                <td>
                  <strong>{receivedLabel(bk)}</strong> {/* ✅ Fix #5 */}
                </td>

                <td>
                  <div>
                    <button
                      type="button"
                      onClick={() => goToCustomer(bk)}
                      style={{
                        border: 0,
                        background: "transparent",
                        padding: 0,
                        cursor: "pointer",
                        fontWeight: 900,
                        textDecoration: "underline",
                        textUnderlineOffset: 3,
                      }}
                    >
                      {bk.customer_name}
                    </button>
                  </div>
                  <div style={{ opacity: 0.8 }}>{bk.phone}</div>
                  {bk.email && <div style={{ opacity: 0.8 }}>{bk.email}</div>}
                  {bk.home_visit && (
                    <div style={{ opacity: 0.8, marginTop: "0.25rem" }}>
                      {bk.address_line1}, {bk.postal_code} {bk.city}
                    </div>
                  )}
                </td>

                <td>
                  <div>
                    <strong>{bk.pack}</strong>
                  </div>
                  <div style={{ opacity: 0.75 }}>{bk.contact_preference}</div>

                  {/* ✅ Fix #3 (safe & explicit): show admin workflow status */}
                  <div style={{ opacity: 0.75 }}>
                    Estado: {bk.status_admin || "nuevo"}
                  </div>

                  {/* Optional context line if helpful */}
                  <div style={{ opacity: 0.75 }}>
                    <em>{meetingModeLabel(bk)}</em>
                  </div>
                </td>

                <td style={{ whiteSpace: "pre-wrap" }}>{bk.message || ""}</td>
              </tr>
            ))}

            {filteredBookings.length === 0 && (
              <tr>
                <td colSpan="5" style={{ opacity: 0.7 }}>
                  No hay reservas que coincidan.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Card>

      {/* Enquiries table */}
      <Card>
        <h3 style={{ marginTop: 0 }}>Solicitudes (Online / Teléfono / Otro)</h3>

        {/* Status filter only */}
        <div
          style={{
            display: "flex",
            gap: "0.75rem",
            flexWrap: "wrap",
            marginTop: "0.75rem",
            marginBottom: "0.75rem",
          }}
        >
          <select
            value={enquiryStatusFilter}
            onChange={(e) => setEnquiryStatusFilter(e.target.value)}
            style={{
              padding: "0.5rem 0.65rem",
              borderRadius: 12,
              border: "1px solid rgba(17,17,17,0.12)",
              background: "rgba(17,17,17,0.02)",
              fontWeight: 800,
            }}
          >
            <option value="todos">Todos</option>
            <option value="nuevo">Nuevo</option>
            <option value="presupuesto">Presupuesto</option>
            <option value="en_proceso">En proceso</option>
            <option value="finalizado">Finalizado</option>
            <option value="no_interesado">No interesado</option>
          </select>
        </div>

        <Table>
          <thead>
            <tr>
              <th>Recibido</th>
              <th>Cliente</th>
              <th>Tipo</th>
              <th>Mensaje</th>
            </tr>
          </thead>
          <tbody>
            {filteredEnquiries.map((enq) => (
              <tr key={enq.id}>
                <td>
                  <strong>{receivedLabel(enq)}</strong>
                </td>

                <td>
                  <div>
                    <button
                      type="button"
                      onClick={() => goToCustomer(enq)}
                      style={{
                        border: 0,
                        background: "transparent",
                        padding: 0,
                        cursor: "pointer",
                        fontWeight: 900,
                        textDecoration: "underline",
                        textUnderlineOffset: 3,
                      }}
                    >
                      {enq.customer_name}
                    </button>
                  </div>
                  <div style={{ opacity: 0.8 }}>{enq.phone}</div>
                  {enq.email && <div style={{ opacity: 0.8 }}>{enq.email}</div>}
                </td>

                <td>
                  <div>
                    <strong>{meetingModeLabel(enq)}</strong>
                  </div>
                  <div style={{ opacity: 0.75 }}>{enq.contact_preference}</div>
                  <div style={{ opacity: 0.75 }}>
                    Estado: {enq.status_admin || "nuevo"}
                  </div>
                </td>

                <td style={{ whiteSpace: "pre-wrap" }}>{enq.message || ""}</td>
              </tr>
            ))}

            {filteredEnquiries.length === 0 && (
              <tr>
                <td colSpan="4" style={{ opacity: 0.7 }}>
                  No hay solicitudes que coincidan.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Card>
    </Wrap>
  );
}
