// src/pages/Admin/AdminCustomer.jsx
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../../lib/supabaseClient.js";
import { Button, Card, Wrap } from "./adminStyles";
import CustomerDrawer from "./components/CustomerDrawer.jsx";

/* ---------------------------
   customer_key helpers
---------------------------- */
function digitsOnly(value) {
  return String(value || "").replace(/\D+/g, "");
}

function normalizeCustomerKey(raw) {
  let v = "";
  try {
    v = decodeURIComponent(String(raw || "")).trim();
  } catch {
    v = String(raw || "").trim();
  }

  // email
  if (v.includes("@")) return v.toLowerCase();

  // phone
  return digitsOnly(v);
}

export default function AdminCustomer() {
  const { customerKey: customerKeyParam } = useParams();
  const navigate = useNavigate();

  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const [customer, setCustomer] = useState(null); // row from customers (optional but preferred)
  const [latestBooking, setLatestBooking] = useState(null); // newest booking/enquiry
  const [history, setHistory] = useState([]); // all bookings/enquiries for this customer_key

  const customerKey = useMemo(
    () => normalizeCustomerKey(customerKeyParam),
    [customerKeyParam]
  );

  /* ---------------------------
     Auth session
  ---------------------------- */
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session || null);
    });

    const { data: sub } = supabase.auth.onAuthStateChange(
      (_event, newSession) => setSession(newSession)
    );

    return () => sub?.subscription?.unsubscribe?.();
  }, []);

  const title = useMemo(() => customer?.name || "Cliente", [customer]);

  /* ---------------------------
     Load customer + history
  ---------------------------- */
  useEffect(() => {
    if (!session?.user || !customerKey) return;

    let alive = true;

    async function loadCustomerAndHistory() {
      setLoading(true);
      setMsg("");

      try {
        // 1) Load full history FIRST (this is your source of truth now)
        const { data: bookingRows, error: bookingErr } = await supabase
          .from("bookings")
          .select("*")
          .eq("customer_key", customerKey)
          .order("created_at", { ascending: false })
          .limit(200);

        if (bookingErr) throw new Error(bookingErr.message);

        if (!alive) return;

        const rows = Array.isArray(bookingRows) ? bookingRows : [];
        setHistory(rows);
        setLatestBooking(rows[0] || null);

        // 2) Load customer row (if it exists)
        const { data: customerRow, error: customerErr } = await supabase
          .from("customers")
          .select("*")
          .eq("customer_key", customerKey)
          .maybeSingle();

        if (customerErr) throw new Error(customerErr.message);

        if (!alive) return;

        // If customer row doesn't exist yet, we can still show the drawer using booking info.
        setCustomer(customerRow || null);

        // Optional UX: if neither exists, show a clear message
        if (!customerRow && rows.length === 0) {
          setMsg("Cliente no encontrado (sin historial y sin ficha).");
        }
      } catch (e) {
        if (!alive) return;
        console.error(e);
        setMsg(e?.message || "No se pudo cargar el cliente.");
        setCustomer(null);
        setLatestBooking(null);
        setHistory([]);
      } finally {
        if (alive) setLoading(false);
      }
    }

    loadCustomerAndHistory();

    return () => {
      alive = false;
    };
  }, [session, customerKey]);

  /* ---------------------------
     Not logged in
  ---------------------------- */
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

  /* ---------------------------
     Drawer "customer" object
     CustomerDrawer expects booking-like fields,
     so we prefer latestBooking; fallback to customers row.
  ---------------------------- */
  const drawerCustomer =
    latestBooking ||
    (customer
      ? {
          id: customer.customer_key, // stable
          customer_key: customer.customer_key,
          customer_name: customer.name || "—",
          phone: customer.phone || "",
          email: customer.email || "",
          city: customer.city || "",
          status_admin: customer.status || "nuevo",
          contact_preference: customer.contact_preference || "WhatsApp",
          meeting_mode: null,
          pack: null,
          message: "",
          created_at: customer.updated_at || customer.created_at || null,
        }
      : null);

  return (
    <Wrap>
      <div style={{ display: "grid", gap: "0.75rem" }}>
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
            history={history}
            onClose={() => navigate(-1)}
            onStatusChange={async (nextStatus) => {
              // Optimistic update
              setCustomer((prev) =>
                prev ? { ...prev, status: nextStatus } : prev
              );

              // Persist
              const { error } = await supabase
                .from("customers")
                .update({
                  status: nextStatus,
                  updated_at: new Date().toISOString(),
                })
                .eq("customer_key", customerKey);

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
