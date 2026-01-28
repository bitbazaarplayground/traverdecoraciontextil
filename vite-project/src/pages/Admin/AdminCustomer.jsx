// src/pages/Admin/AdminCustomer.jsx
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../../lib/supabaseClient.js";
import { Button, Card, Wrap } from "./adminStyles";
import CustomerDrawer from "./components/CustomerDrawer.jsx";

function toCustomerKeyFromBooking(bk) {
  return (bk?.phone || bk?.email || "").trim().toLowerCase();
}

export default function AdminCustomer() {
  const { customerKey } = useParams(); // ✅ route param now
  const navigate = useNavigate();

  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const [customer, setCustomer] = useState(null); // row from customers
  const [latestBooking, setLatestBooking] = useState(null); // latest booking/enquiry row

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
    return customer?.display_name || customer?.customer_name || "Cliente";
  }, [customer]);

  useEffect(() => {
    if (!session?.user || !customerKey) return;

    let alive = true;

    async function loadOne() {
      setLoading(true);
      setMsg("");

      try {
        const decodedKey = decodeURIComponent(customerKey).trim().toLowerCase();
        if (!decodedKey) throw new Error("customerKey inválido.");

        // 1) Load customer record from customers table
        const { data: customerRow, error: customerErr } = await supabase
          .from("customers")
          .select("*")
          .eq("customer_key", decodedKey)
          .maybeSingle();

        if (customerErr) throw new Error(customerErr.message);

        if (!alive) return;

        if (!customerRow) {
          setCustomer(null);
          setLatestBooking(null);
          setMsg("Cliente no encontrado (customer_key no existe).");
          return;
        }

        setCustomer(customerRow);

        // 2) Load latest booking/enquiry for this customer_key (by phone/email match)
        //    We match using the same rule you use to compute customer_key.
        const { data: bookingRows, error: bookingErr } = await supabase
          .from("bookings")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(200);

        if (bookingErr) throw new Error(bookingErr.message);

        const match =
          (bookingRows || []).find(
            (b) => toCustomerKeyFromBooking(b) === decodedKey
          ) || null;

        setLatestBooking(match);
      } catch (e) {
        if (!alive) return;
        console.error(e);
        setMsg(e?.message || "No se pudo cargar el cliente.");
        setCustomer(null);
        setLatestBooking(null);
      } finally {
        if (alive) setLoading(false);
      }
    }

    loadOne();

    return () => {
      alive = false;
    };
  }, [session, customerKey]);

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

  // What CustomerDrawer expects: it currently expects a "booking-like" object.
  // We’ll pass latestBooking if available, otherwise we create a minimal object
  // from customer data so the drawer still renders.
  const drawerCustomer =
    latestBooking ||
    (customer
      ? {
          id: customer.customer_key, // stable id for React key / drawer
          customer_key: customer.customer_key,
          customer_name: customer.customer_name || customer.display_name || "—",
          phone: customer.phone || "",
          email: customer.email || "",
          city: customer.city || "",
          status_admin: customer.status || "nuevo",
          meeting_mode: null,
          pack: null,
          message: "",
          created_at: customer.updated_at || customer.created_at || null,
        }
      : null);

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

        {loading && (
          <Card>
            <p style={{ margin: 0, opacity: 0.75 }}>Cargando…</p>
          </Card>
        )}

        {!loading && drawerCustomer && (
          <CustomerDrawer
            customer={drawerCustomer}
            onClose={() => navigate(-1)}
            onStatusChange={async (nextStatus) => {
              // update UI immediately
              setCustomer((prev) =>
                prev ? { ...prev, status: nextStatus } : prev
              );
              setLatestBooking((prev) =>
                prev ? { ...prev, status_admin: nextStatus } : prev
              );

              // persist status to customers table (source of truth)
              const decodedKey = decodeURIComponent(customerKey)
                .trim()
                .toLowerCase();

              const { error } = await supabase
                .from("customers")
                .update({
                  status: nextStatus,
                  updated_at: new Date().toISOString(),
                })
                .eq("customer_key", decodedKey);

              if (error) setMsg(error.message);
            }}
          />
        )}

        {!loading && !drawerCustomer && !msg && (
          <Card>
            <p style={{ margin: 0, opacity: 0.75 }}>Cliente no disponible.</p>
          </Card>
        )}
      </div>
    </Wrap>
  );
}
