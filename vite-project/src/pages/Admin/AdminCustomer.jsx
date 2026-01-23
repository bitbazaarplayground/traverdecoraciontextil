// src/pages/Admin/AdminCustomer.jsx
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../../lib/supabaseClient.js";
import { Card, Wrap } from "./adminStyles";
import CustomerDrawer from "./components/CustomerDrawer.jsx"; // reuse your existing component

export default function AdminCustomer() {
  const { bookingId } = useParams();
  const navigate = useNavigate();

  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [customerBooking, setCustomerBooking] = useState(null);

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

        // Simple: reuse existing endpoint and find by id
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
      <Card>
        {loading && <p style={{ margin: 0, opacity: 0.75 }}>Cargando…</p>}

        {!loading && customerBooking && (
          // Reuse drawer UI, but render it as “page section”
          <div style={{ position: "relative" }}>
            <CustomerDrawer
              customer={customerBooking}
              onClose={() => navigate(-1)} // close behaves like back
              onStatusChange={(nextStatus) => {
                setCustomerBooking((prev) =>
                  prev ? { ...prev, status_admin: nextStatus } : prev
                );
              }}
            />
          </div>
        )}

        {!loading && !customerBooking && !msg && (
          <p style={{ margin: 0, opacity: 0.75 }}>Cliente no disponible.</p>
        )}
      </Card>
    </Wrap>
  );
}
