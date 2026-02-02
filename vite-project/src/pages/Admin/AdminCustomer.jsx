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

function isEmailKey(key) {
  return String(key || "").includes("@");
}

export default function AdminCustomer() {
  const { customerKey: customerKeyParam } = useParams();
  const navigate = useNavigate();

  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const [customer, setCustomer] = useState(null);
  const [latestBooking, setLatestBooking] = useState(null);
  const [history, setHistory] = useState([]);

  // This is the key coming from the URL (can be phone or email)
  const inputKey = useMemo(
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
     Core loader:
     - Accepts URL key (phone/email)
     - Resolves canonical customer_key
     - Redirects if needed
     - Loads history + customer using canonical key
  ---------------------------- */
  useEffect(() => {
    if (!session?.user || !inputKey) return;

    let alive = true;

    async function load() {
      setLoading(true);
      setMsg("");

      try {
        // STEP 1: try using inputKey as canonical customer_key directly
        const { data: rows1, error: err1 } = await supabase
          .from("bookings")
          .select("*")
          .eq("customer_key", inputKey)
          .order("created_at", { ascending: false })
          .limit(200);

        if (err1) throw new Error(err1.message);

        const directRows = Array.isArray(rows1) ? rows1 : [];

        // Also try customers by customer_key
        const { data: customer1, error: cErr1 } = await supabase
          .from("customers")
          .select("*")
          .eq("customer_key", inputKey)
          .maybeSingle();

        if (cErr1) throw new Error(cErr1.message);

        if (!alive) return;

        // If we found anything directly, great
        if (directRows.length || customer1) {
          setHistory(directRows);
          setLatestBooking(directRows[0] || null);
          setCustomer(customer1 || null);
          return;
        }

        // STEP 2: fallback: inputKey might be phone/email (old links)
        // - if email-like => bookings.email
        // - else => bookings.phone (digits-only)
        let fbQuery = supabase.from("bookings").select("*");

        if (isEmailKey(inputKey)) {
          fbQuery = fbQuery.eq("email", inputKey.toLowerCase());
        } else {
          fbQuery = fbQuery.eq("phone", digitsOnly(inputKey));
        }

        const { data: rows2, error: err2 } = await fbQuery
          .order("created_at", { ascending: false })
          .limit(200);

        if (err2) throw new Error(err2.message);

        const fallbackRows = Array.isArray(rows2) ? rows2 : [];

        if (!alive) return;

        if (fallbackRows.length) {
          // Get canonical key from booking row (THIS is the truth)
          const canonical = normalizeCustomerKey(fallbackRows[0]?.customer_key);

          // Redirect to canonical route if needed
          if (canonical && canonical !== inputKey) {
            navigate(`/admin/clientes/${encodeURIComponent(canonical)}`, {
              replace: true,
            });
            return;
          }

          // If canonical equals inputKey (or missing), still render using fallback data
          setHistory(fallbackRows);
          setLatestBooking(fallbackRows[0] || null);

          // Try to load customer record using canonical
          if (canonical) {
            const { data: customer2, error: cErr2 } = await supabase
              .from("customers")
              .select("*")
              .eq("customer_key", canonical)
              .maybeSingle();

            if (!cErr2) setCustomer(customer2 || null);
          }

          return;
        }

        // STEP 3: nothing found
        setCustomer(null);
        setLatestBooking(null);
        setHistory([]);
        setMsg("Cliente no encontrado (sin historial y sin ficha).");
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

    load();

    return () => {
      alive = false;
    };
  }, [session, inputKey, navigate]);

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
  ---------------------------- */
  const drawerCustomer =
    latestBooking ||
    (customer
      ? {
          id: customer.customer_key,
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
              // optimistic UI (customer row might not exist; handle gracefully)
              setCustomer((prev) =>
                prev ? { ...prev, status: nextStatus } : prev
              );

              // Use canonical key (drawerCustomer has it)
              const key = normalizeCustomerKey(drawerCustomer.customer_key);

              const { error } = await supabase
                .from("customers")
                .update({
                  status: nextStatus,
                  updated_at: new Date().toISOString(),
                })
                .eq("customer_key", key);

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
