// src/pages/Admin/AdminCustomer.jsx
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../../lib/supabaseClient.js";
import { Button, Card, Wrap } from "./adminStyles";
import CustomerDrawer from "./components/CustomerDrawer.jsx";

export default function AdminCustomer() {
  const { bookingId } = useParams();
  const navigate = useNavigate();

  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [customerBooking, setCustomerBooking] = useState(null);

  useEffect(() => {
    supabase.auth
      .getSession()
      .then(({ data }) => setSession(data.session || null));

    const { data: sub } = supabase.auth.onAuthStateChange(
      (_event, newSession) => setSession(newSession)
    );

    return () => sub?.subscription?.unsubscribe?.();
  }, []);

  const title = useMemo(() => {
    return customerBooking?.customer_name || "Cliente";
  }, [customerBooking]);

  useEffect(() => {
    if (!session?.user || !bookingId) return;

    let alive = true;

    async function loadOne() {
      setLoading(true);
      setMsg("");

      try {
        const { data: sess } = await supabase.auth.getSession();
        const token = sess?.session?.access_token;
        if (!token) throw new Error("Sesión no válida.");

        const res = await fetch(
          "/.netlify/functions/admin-bookings?limit=500",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data?.error || "No se pudo cargar datos.");

        const found = (data.bookings || []).find(
          (b) => String(b.id) === String(bookingId)
        );

        if (!alive) return;

        if (!found) {
          setCustomerBooking(null);
          setMsg("Cliente no encontrado (bookingId no existe).");
          return;
        }

        setCustomerBooking(found);
      } catch (e) {
        if (!alive) return;
        console.error(e);
        setMsg(e?.message || "No se pudo cargar el cliente.");
        setCustomerBooking(null);
      } finally {
        if (alive) setLoading(false);
      }
    }

    loadOne();

    return () => {
      alive = false;
    };
  }, [session, bookingId]);

  if (!session) {
    return (
      <Wrap>
        <Card>
          <h2 style={{ margin: "0 0 0.35rem" }}>Cliente</h2>
          <p style={{ margin: 0, opacity: 0.75 }}>
            Inicia sesión para ver esta ficha.
          </p>
        </Card>
      </Wrap>
    );
  }

  return (
    <Wrap>
      <div style={{ display: "grid", gap: "0.75rem" }}>
        {/* Top header row */}
        <Card>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "1rem",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <div>
              <h2 style={{ margin: 0 }}>{title}</h2>
              <p style={{ margin: "0.25rem 0 0", opacity: 0.75 }}>
                Ficha privada del cliente
              </p>
              {msg && (
                <p style={{ margin: "0.5rem 0 0", opacity: 0.85 }}>{msg}</p>
              )}
            </div>

            <div style={{ display: "flex", gap: "0.5rem" }}>
              <Button type="button" onClick={() => navigate(-1)}>
                ← Volver
              </Button>
            </div>
          </div>
        </Card>

        {/* Main content */}
        {loading && (
          <Card>
            <p style={{ margin: 0, opacity: 0.75 }}>Cargando…</p>
          </Card>
        )}

        {!loading && customerBooking && (
          <CustomerDrawer
            customer={customerBooking}
            onClose={() => navigate(-1)}
            onStatusChange={(nextStatus) => {
              setCustomerBooking((prev) =>
                prev ? { ...prev, status_admin: nextStatus } : prev
              );
            }}
          />
        )}

        {!loading && !customerBooking && !msg && (
          <Card>
            <p style={{ margin: 0, opacity: 0.75 }}>Cliente no disponible.</p>
          </Card>
        )}
      </div>
    </Wrap>
  );
}
