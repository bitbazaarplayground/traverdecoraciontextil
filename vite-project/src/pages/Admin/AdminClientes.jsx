import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabaseClient.js";
import { Button, Card, Table, Wrap } from "./adminStyles";
import { formatLocal } from "./utils";

// Reuse your existing customer drawer (if you already extracted it)
// If not, keep this file self-contained for now and we’ll extract later.
import CustomerDrawer from "./components/CustomerDrawer.jsx"; // <-- if you have it
// If you DON'T have CustomerDrawer yet, tell me and I’ll paste an inline version.

function toCustomerKey(bk) {
  return (bk.phone || bk.email || "").trim().toLowerCase();
}

function inNextDays(dateIso, days = 7) {
  const now = new Date();
  const max = new Date();
  max.setDate(now.getDate() + days);

  const dt = new Date(dateIso);
  return dt >= now && dt <= max;
}

export default function AdminClients() {
  const location = useLocation();
  const navigate = useNavigate();

  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const [bookings, setBookings] = useState([]);
  const [query, setQuery] = useState("");

  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [statusFilter, setStatusFilter] = useState("todos");

  // Notes/images state live in CustomerDrawer in your refactor (recommended).
  // If your CustomerDrawer expects props for these, we’ll wire it in next.

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
      (_event, newSession) => {
        setSession(newSession);
      }
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

      const data = await res.json().catch(() => ({})); // ✅ safe parse
      if (!res.ok) throw new Error(data?.error || "No se pudo cargar datos.");

      setBookings(data.bookings || []);
    } catch (e) {
      console.error(e);
      setMsg(e?.message || "No se pudieron cargar clientes.");
      setBookings([]);
    } finally {
      setLoading(false);
    }
  }
  //   Realtime updates for bookings/status
  useEffect(() => {
    if (!session || !isAllowed) return;

    const channel = supabase
      .channel("rt-admin-clients-bookings")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "bookings" },
        (payload) => {
          setBookings((prev) => {
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

    return () => {
      supabase.removeChannel(channel);
    };
  }, [session, isAllowed]);
  // Open customer drawer when coming from dashboard: /admin/clientes?open=<bookingId>
  useEffect(() => {
    if (!session || !isAllowed) return;

    const params = new URLSearchParams(location.search);
    const openId = params.get("open");
    if (!openId) return;

    // If bookings already loaded, open immediately
    const found = (bookings || []).find((b) => String(b.id) === String(openId));
    if (found) {
      setSelectedCustomer(found);

      // Optional: remove ?open= from URL so refresh won't reopen
      params.delete("open");
      navigate(
        {
          pathname: location.pathname,
          search: params.toString() ? `?${params}` : "",
        },
        { replace: true }
      );
      return;
    }

    // If not found yet, trigger a load (once) and we’ll resolve it when bookings arrives.
    // We avoid spamming by only calling loadBookings if we currently have no bookings loaded.
    if ((bookings || []).length === 0 && !loading) {
      loadBookings();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, isAllowed, location.search, bookings]);

  useEffect(() => {
    if (session && isAllowed) loadBookings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, isAllowed]);

  // Build unique clients list from bookings
  const clients = useMemo(() => {
    const map = new Map();

    for (const bk of bookings) {
      const key = toCustomerKey(bk);
      if (!key) continue;

      const prev = map.get(key);

      const next = {
        customer_key: key,
        customer_name: bk.customer_name || prev?.customer_name || "—",
        phone: bk.phone || prev?.phone || "",
        email: bk.email || prev?.email || null,
        city: bk.city || prev?.city || "",
        last_booking_start: bk.start_time,
        last_booking_pack: bk.pack,
        last_status_admin: bk.status_admin || "nuevo", // ✅ ADD
        bookings_count: (prev?.bookings_count || 0) + 1,
        refBooking: bk, // ✅ default to current booking
      };

      // If prev exists and prev booking is newer, keep prev "latest"
      if (
        prev?.last_booking_start &&
        new Date(prev.last_booking_start) > new Date(bk.start_time)
      ) {
        next.last_booking_start = prev.last_booking_start;
        next.last_booking_pack = prev.last_booking_pack;
        next.last_status_admin = prev.last_status_admin || "nuevo";
        next.refBooking = prev.refBooking;
      }

      map.set(key, next);
    }

    // sort by most recent booking
    return Array.from(map.values()).sort(
      (a, b) =>
        new Date(b.last_booking_start).getTime() -
        new Date(a.last_booking_start).getTime()
    );
  }, [bookings]);

  const upcomingClients = useMemo(() => {
    // Upcoming is derived from bookings, not unique clients only.
    // We show upcoming bookings grouped by customer key.
    const map = new Map();
    for (const bk of bookings) {
      if (!bk?.start_time) continue;
      if (!inNextDays(bk.start_time, 7)) continue;

      const key = toCustomerKey(bk);
      if (!key) continue;

      const prev = map.get(key);
      const item = {
        customer_key: key,
        customer_name: bk.customer_name,
        phone: bk.phone,
        city: bk.city,
        next_visit: bk.start_time,
        pack: bk.pack,
        refBooking: bk,
      };

      if (!prev || new Date(bk.start_time) < new Date(prev.next_visit)) {
        map.set(key, item);
      }
    }

    return Array.from(map.values()).sort(
      (a, b) => new Date(a.next_visit) - new Date(b.next_visit)
    );
  }, [bookings]);

  const filteredClients = useMemo(() => {
    const q = query.trim().toLowerCase();

    return clients.filter((c) => {
      const matchesStatus =
        statusFilter === "todos"
          ? true
          : (c.last_status_admin || "nuevo") === statusFilter;

      if (!matchesStatus) return false;

      if (!q) return true;

      const hay = [
        c.customer_name,
        c.phone,
        c.email,
        c.city,
        c.last_booking_pack,
      ]
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
              Busca clientes y revisa notas e imágenes.
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
                  <Button
                    type="button"
                    onClick={() => setSelectedCustomer(c.refBooking)}
                  >
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
              <th>Última visita</th>
              <th>Pack</th>
              <th>Reservas</th>
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
                <td>{formatLocal(c.last_booking_start)}</td>
                <td>{c.last_booking_pack}</td>
                <td>{c.bookings_count}</td>
                <td>
                  <Button
                    type="button"
                    onClick={() => setSelectedCustomer(c.refBooking)}
                  >
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

      {/* Customer drawer */}
      {selectedCustomer && (
        <CustomerDrawer
          customer={selectedCustomer}
          onClose={() => setSelectedCustomer(null)}
          onStatusChange={(nextStatus) => {
            // update drawer view instantly
            setSelectedCustomer((prev) =>
              prev ? { ...prev, status_admin: nextStatus } : prev
            );

            // update bookings list so clients recompute instantly
            setBookings((prev) =>
              prev.map((b) =>
                b.id === selectedCustomer.id
                  ? { ...b, status_admin: nextStatus }
                  : b
              )
            );
          }}
        />
      )}
    </Wrap>
  );
}
