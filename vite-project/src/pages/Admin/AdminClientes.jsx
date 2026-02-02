// src/pages/Admin/AdminClientes.jsx
// ✅ Profile-first navigation via customer_key (phone digits OR email lower)
// ✅ Aggregates by phone/email so repeated enquiries become ONE profile
// ✅ Includes BOTH bookings + enquiries from admin-bookings endpoint

import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabaseClient.js";
import { Button, Card, Table, Wrap } from "./adminStyles";
import { formatLocal, toCustomerKey } from "./utils";

function inNextDays(dateIso, days = 7) {
  const now = new Date();
  const max = new Date();
  max.setDate(now.getDate() + days);

  const dt = new Date(dateIso);
  return dt >= now && dt <= max;
}

function getActivityIso(row) {
  // For reserved bookings: start_time exists
  // For enquiries: use created_at
  return row?.start_time || row?.created_at || null;
}

export default function AdminClientes() {
  const location = useLocation();
  const navigate = useNavigate();

  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  // IMPORTANT: this holds BOTH reserved bookings + enquiries
  const [rows, setRows] = useState([]);

  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("todos");

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

  useEffect(() => {
    supabase.auth
      .getSession()
      .then(({ data }) => setSession(data.session || null));

    const { data: sub } = supabase.auth.onAuthStateChange(
      (_event, newSession) => setSession(newSession)
    );

    return () => sub?.subscription?.unsubscribe?.();
  }, []);

  async function loadBookings() {
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

      // ✅ FIX: include enquiries too
      const combined = [
        ...(Array.isArray(data.bookings) ? data.bookings : []),
        ...(Array.isArray(data.enquiries) ? data.enquiries : []),
      ];

      setRows(combined);
    } catch (e) {
      console.error(e);
      setMsg(e?.message || "No se pudieron cargar clientes.");
      setRows([]);
    } finally {
      setLoading(false);
    }
  }

  // Realtime updates (table: bookings) — enquiries are also in bookings table
  useEffect(() => {
    if (!session || !isAllowed) return;

    const channel = supabase
      .channel("rt-admin-clients-bookings")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "bookings" },
        (payload) => {
          setRows((prev) => {
            const old = prev || [];
            const type = payload.eventType;

            if (type === "INSERT") {
              const exists = old.some((b) => b.id === payload.new.id);
              return exists ? old : [payload.new, ...old];
            }

            if (type === "UPDATE") {
              return old.map((b) =>
                b.id === payload.new.id ? payload.new : b
              );
            }

            if (type === "DELETE") {
              return old.filter((b) => b.id !== payload.old.id);
            }

            return old;
          });
        }
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, [session, isAllowed]);

  // ✅ Profile-first opening:
  // /admin/clientes?open=<customerKey> -> redirects to /admin/clientes/:customerKey
  useEffect(() => {
    if (!session || !isAllowed) return;

    const params = new URLSearchParams(location.search);
    const openKey = params.get("open");
    if (!openKey) return;

    const key = decodeURIComponent(String(openKey)).trim().toLowerCase();
    if (!key) return;

    params.delete("open");
    navigate(
      {
        pathname: location.pathname,
        search: params.toString() ? `?${params}` : "",
      },
      { replace: true }
    );

    navigate(`/admin/clientes/${encodeURIComponent(key)}`, { replace: true });
  }, [session, isAllowed, location.search, navigate, location.pathname]);

  useEffect(() => {
    if (session && isAllowed) loadBookings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, isAllowed]);

  function goToCustomer(row) {
    const key = toCustomerKey(row);
    if (!key) {
      alert("Este registro no tiene teléfono ni email para abrir la ficha.");
      return;
    }
    navigate(`/admin/clientes/${encodeURIComponent(key)}`);
  }

  // Build unique clients list from BOTH bookings + enquiries
  const clients = useMemo(() => {
    const map = new Map();

    for (const r of rows || []) {
      const key = toCustomerKey(r);
      if (!key) continue;

      const prev = map.get(key);
      const activityIso = getActivityIso(r);

      const next = {
        customer_key: key,
        customer_name: r.customer_name || prev?.customer_name || "—",
        phone: r.phone || prev?.phone || "",
        email: r.email || prev?.email || null,
        city: r.city || prev?.city || "",
        last_activity_at: activityIso || prev?.last_activity_at || null,
        last_pack: r.pack || prev?.last_pack || "—",
        last_status_admin: r.status_admin || prev?.last_status_admin || "nuevo",
        total_count: (prev?.total_count || 0) + 1,
        refRow: r,
      };

      // keep prev as "latest" if prev is newer
      if (prev?.last_activity_at && activityIso) {
        if (new Date(prev.last_activity_at) > new Date(activityIso)) {
          next.last_activity_at = prev.last_activity_at;
          next.last_pack = prev.last_pack;
          next.last_status_admin = prev.last_status_admin || "nuevo";
          next.refRow = prev.refRow;
        }
      } else if (prev?.last_activity_at && !activityIso) {
        next.last_activity_at = prev.last_activity_at;
        next.last_pack = prev.last_pack;
        next.last_status_admin = prev.last_status_admin || "nuevo";
        next.refRow = prev.refRow;
      }

      map.set(key, next);
    }

    return Array.from(map.values()).sort((a, b) => {
      const ta = a.last_activity_at
        ? new Date(a.last_activity_at).getTime()
        : 0;
      const tb = b.last_activity_at
        ? new Date(b.last_activity_at).getTime()
        : 0;
      return tb - ta;
    });
  }, [rows]);

  // Upcoming (only real scheduled bookings)
  const upcomingClients = useMemo(() => {
    const map = new Map();

    for (const r of rows || []) {
      if (!r?.start_time) continue; // enquiries don't have visits
      if (!inNextDays(r.start_time, 7)) continue;

      const key = toCustomerKey(r);
      if (!key) continue;

      const prev = map.get(key);
      const item = {
        customer_key: key,
        customer_name: r.customer_name,
        phone: r.phone,
        city: r.city,
        next_visit: r.start_time,
        pack: r.pack,
        refRow: r,
      };

      if (!prev || new Date(r.start_time) < new Date(prev.next_visit)) {
        map.set(key, item);
      }
    }

    return Array.from(map.values()).sort(
      (a, b) => new Date(a.next_visit) - new Date(b.next_visit)
    );
  }, [rows]);

  const filteredClients = useMemo(() => {
    const q = query.trim().toLowerCase();

    return (clients || []).filter((c) => {
      const matchesStatus =
        statusFilter === "todos"
          ? true
          : (c.last_status_admin || "nuevo") === statusFilter;

      if (!matchesStatus) return false;
      if (!q) return true;

      const hay = [c.customer_name, c.phone, c.email, c.city, c.last_pack]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return hay.includes(q);
    });
  }, [clients, query, statusFilter]);

  if (!session) {
    return (
      <Wrap>
        <Card>
          <h2 style={{ margin: "0 0 0.35rem" }}>Clientes</h2>
          <p style={{ margin: 0, opacity: 0.75 }}>
            Inicia sesión para ver los clientes.
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
            <h2 style={{ margin: "0 0 0.25rem" }}>Clientes</h2>
            <p style={{ margin: 0, opacity: 0.75 }}>
              Busca clientes y revisa su historial.
            </p>
            {msg && (
              <p style={{ margin: "0.5rem 0 0", opacity: 0.85 }}>{msg}</p>
            )}
          </div>

          <div style={{ display: "flex", gap: "0.6rem" }}>
            <Button onClick={loadBookings} disabled={loading}>
              {loading ? "Cargando..." : "Actualizar"}
            </Button>
          </div>
        </div>

        <div style={{ height: "0.9rem" }} />

        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar por nombre, teléfono, ciudad, pack..."
          style={{
            width: "100%",
            padding: "0.85rem 0.9rem",
            borderRadius: 14,
            border: "1px solid rgba(17, 17, 17, 0.12)",
            background: "rgba(17, 17, 17, 0.02)",
            outline: "none",
          }}
        />
      </Card>

      {/* Upcoming (next 7 days) */}
      <Card>
        <h3 style={{ marginTop: 0 }}>Próximas visitas (7 días)</h3>
        <Table>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Cliente</th>
              <th>Pack</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {upcomingClients.map((c) => (
              <tr key={c.customer_key}>
                <td>
                  <strong>{formatLocal(c.next_visit)}</strong>
                </td>
                <td>
                  <div style={{ fontWeight: 900 }}>{c.customer_name}</div>
                  <div style={{ opacity: 0.8 }}>{c.phone}</div>
                  <div style={{ opacity: 0.7 }}>{c.city}</div>
                </td>
                <td>{c.pack}</td>
                <td>
                  <Button type="button" onClick={() => goToCustomer(c.refRow)}>
                    Abrir
                  </Button>
                </td>
              </tr>
            ))}

            {upcomingClients.length === 0 && (
              <tr>
                <td colSpan="4" style={{ opacity: 0.7 }}>
                  No hay visitas en los próximos 7 días.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Card>

      {/* All clients */}
      <Card>
        <h3 style={{ marginTop: 0 }}>Todos los clientes</h3>
        <p style={{ margin: "0 0 0.75rem", opacity: 0.75 }}>
          {filteredClients.length} clientes
        </p>

        <div
          style={{
            display: "flex",
            gap: "0.75rem",
            flexWrap: "wrap",
            marginBottom: "0.75rem",
          }}
        >
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{
              padding: "0.6rem 0.75rem",
              borderRadius: 12,
              border: "1px solid rgba(17,17,17,0.12)",
              background: "rgba(17,17,17,0.02)",
              fontWeight: 800,
            }}
          >
            <option value="todos">Todos los estados</option>
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
              <th>Cliente</th>
              <th>Última actividad</th>
              <th>Pack</th>
              <th>Registros</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filteredClients.map((c) => (
              <tr key={c.customer_key}>
                <td>
                  <div style={{ fontWeight: 900 }}>{c.customer_name}</div>
                  <div style={{ opacity: 0.8 }}>{c.phone}</div>
                  {c.email && <div style={{ opacity: 0.8 }}>{c.email}</div>}
                  {c.city && <div style={{ opacity: 0.7 }}>{c.city}</div>}
                </td>
                <td>{formatLocal(c.last_activity_at)}</td>
                <td>{c.last_pack}</td>
                <td>{c.total_count}</td>
                <td>
                  <Button type="button" onClick={() => goToCustomer(c.refRow)}>
                    Abrir
                  </Button>
                </td>
              </tr>
            ))}

            {filteredClients.length === 0 && (
              <tr>
                <td colSpan="5" style={{ opacity: 0.7 }}>
                  No hay clientes que coincidan con la búsqueda.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Card>
    </Wrap>
  );
}
