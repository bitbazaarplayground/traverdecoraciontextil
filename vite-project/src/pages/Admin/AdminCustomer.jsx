// src/pages/Admin/AdminCustomer.jsx
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../../lib/supabaseClient.js";
import { Button, Card, Wrap } from "./adminStyles";
import CustomerDrawer from "./components/CustomerDrawer.jsx";

/* ---------------------------
   Helpers
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

  if (v.includes("@")) return v.toLowerCase();
  return digitsOnly(v);
}

function lower(value) {
  return String(value || "")
    .trim()
    .toLowerCase();
}

export default function AdminCustomer() {
  const { customerKey: customerKeyParam } = useParams();
  const navigate = useNavigate();

  const [session, setSession] = useState(null);

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const [customer, setCustomer] = useState(null);
  const [history, setHistory] = useState([]);
  const [latestRow, setLatestRow] = useState(null);

  // Key from URL (can be email or phone)
  const inputKey = useMemo(
    () => normalizeCustomerKey(customerKeyParam),
    [customerKeyParam]
  );

  /* ---------------------------
     Auth session
  ---------------------------- */
  useEffect(() => {
    supabase.auth
      .getSession()
      .then(({ data }) => setSession(data.session || null));

    const { data: sub } = supabase.auth.onAuthStateChange(
      (_event, newSession) => setSession(newSession)
    );

    return () => sub?.subscription?.unsubscribe?.();
  }, []);

  /* ---------------------------
     Derived display values
     IMPORTANT: These hooks MUST be above any return.
  ---------------------------- */
  const nameList = useMemo(() => {
    const set = new Set();

    for (const r of history || []) {
      const n = String(r?.customer_name || "").trim();
      if (n) set.add(n);
    }

    const cn = String(customer?.name || "").trim();
    if (cn) set.add(cn);

    return Array.from(set);
  }, [history, customer]);

  const title = nameList.length ? nameList.join(" · ") : "Cliente";

  const drawerCustomer =
    latestRow ||
    (customer
      ? {
          id: customer.customer_key,
          customer_key: customer.customer_key,
          customer_name: customer.name || "—",
          phone: customer.phone || "",
          email: customer.email || "",
          city: customer.city || "",
          status_admin: customer.status || "nuevo",
          contact_preference: "WhatsApp",
          meeting_mode: null,
          pack: null,
          message: "",
          created_at: customer.updated_at || customer.created_at || null,
        }
      : null);

  /* ---------------------------
     Load customer + history (via admin function)
  ---------------------------- */
  useEffect(() => {
    if (!session?.user || !inputKey) return;

    let alive = true;

    async function load() {
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

        const payload = await res.json().catch(() => ({}));
        if (!res.ok)
          throw new Error(payload?.error || "No se pudo cargar datos.");

        const all = [
          ...(Array.isArray(payload.bookings) ? payload.bookings : []),
          ...(Array.isArray(payload.enquiries) ? payload.enquiries : []),
        ];

        const inputIsEmail = inputKey.includes("@");
        const inputEmail = inputIsEmail ? inputKey : "";
        const inputPhone = inputIsEmail ? "" : digitsOnly(inputKey);

        const matched = all.filter((r) => {
          const ck = lower(r.customer_key);
          const rEmail = lower(r.email);
          const rPhone = digitsOnly(r.phone);

          // primary
          if (ck && ck === inputKey) return true;

          // backups for old/odd links
          if (inputEmail && rEmail && rEmail === inputEmail) return true;
          if (inputPhone && rPhone && rPhone === inputPhone) return true;

          return false;
        });

        matched.sort(
          (a, b) =>
            new Date(b.created_at || 0).getTime() -
            new Date(a.created_at || 0).getTime()
        );

        const newest = matched[0] || null;
        const canonicalKey = normalizeCustomerKey(
          newest?.customer_key || inputKey
        );

        if (canonicalKey && canonicalKey !== inputKey) {
          navigate(`/admin/clientes/${encodeURIComponent(canonicalKey)}`, {
            replace: true,
          });
          return;
        }

        // Try load customers row (if RLS allows). If not, we still show booking-based drawer.
        let customerRow = null;
        try {
          const { data: cRow } = await supabase
            .from("customers")
            .select("*")
            .eq("customer_key", canonicalKey)
            .maybeSingle();
          customerRow = cRow || null;
        } catch {
          customerRow = null;
        }

        if (!alive) return;

        setHistory(matched);
        setLatestRow(newest);
        setCustomer(customerRow);

        if (!customerRow && matched.length === 0) {
          setMsg("Cliente no encontrado (sin historial y sin ficha).");
        }
      } catch (e) {
        if (!alive) return;
        console.error(e);
        setMsg(e?.message || "No se pudo cargar el cliente.");
        setCustomer(null);
        setHistory([]);
        setLatestRow(null);
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
     Not logged in (return AFTER hooks)
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
              setCustomer((prev) =>
                prev ? { ...prev, status: nextStatus } : prev
              );

              const key = normalizeCustomerKey(drawerCustomer.customer_key);

              const { error } = await supabase.from("customers").upsert(
                {
                  customer_key: key,
                  status: nextStatus,
                  name: customer?.name || latestRow?.customer_name || null,
                  phone: latestRow?.phone || customer?.phone || null,
                  email: latestRow?.email || customer?.email || null,
                  updated_at: new Date().toISOString(),
                },
                { onConflict: "customer_key" }
              );

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

// // src/pages/Admin/AdminCustomer.jsx
// import { useEffect, useMemo, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { supabase } from "../../lib/supabaseClient.js";
// import { Button, Card, Wrap } from "./adminStyles";
// import CustomerDrawer from "./components/CustomerDrawer.jsx";

// /* ---------------------------
//    customer key helpers
// ---------------------------- */
// function digitsOnly(value) {
//   return String(value || "").replace(/\D+/g, "");
// }

// function normalizeCustomerKey(raw) {
//   let v = "";
//   try {
//     v = decodeURIComponent(String(raw || "")).trim();
//   } catch {
//     v = String(raw || "").trim();
//   }

//   if (!v) return "";

//   // email
//   if (v.includes("@")) return v.toLowerCase();

//   // phone
//   return digitsOnly(v);
// }

// function isEmailKey(key) {
//   return String(key || "").includes("@");
// }

// // Prefer email as canonical profile key (matches your current merging behaviour)
// function canonicalKeyFromRow(row) {
//   const email = String(row?.email || "")
//     .trim()
//     .toLowerCase();
//   if (email) return email;

//   const phone = digitsOnly(row?.phone);
//   if (phone) return phone;

//   const ck = String(row?.customer_key || "")
//     .trim()
//     .toLowerCase();
//   if (ck) return ck;

//   return "";
// }

// function uniqueNamesFromHistory(rows) {
//   const seen = new Set();
//   const list = [];

//   for (const r of rows || []) {
//     const n = String(r?.customer_name || "").trim();
//     if (!n) continue;
//     const k = n.toLowerCase();
//     if (seen.has(k)) continue;
//     seen.add(k);
//     list.push(n);
//   }
//   return list;
// }

// export default function AdminCustomer() {
//   const { customerKey: customerKeyParam } = useParams();
//   const navigate = useNavigate();

//   const [session, setSession] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [msg, setMsg] = useState("");

//   const [customer, setCustomer] = useState(null); // customers row
//   const [latestBooking, setLatestBooking] = useState(null); // newest booking/enquiry
//   const [history, setHistory] = useState([]); // full booking/enquiry history

//   // URL key (can be phone or email)
//   const inputKey = useMemo(
//     () => normalizeCustomerKey(customerKeyParam),
//     [customerKeyParam]
//   );

//   // ✅ Hooks MUST be above any early return
//   const displayName =
//     customer?.name || latestBooking?.customer_name || "Cliente";
//   const namesUsed = useMemo(() => uniqueNamesFromHistory(history), [history]);

//   /* ---------------------------
//      Auth session
//   ---------------------------- */
//   useEffect(() => {
//     supabase.auth.getSession().then(({ data }) => {
//       setSession(data.session || null);
//     });

//     const { data: sub } = supabase.auth.onAuthStateChange(
//       (_event, newSession) => setSession(newSession)
//     );

//     return () => sub?.subscription?.unsubscribe?.();
//   }, []);

//   /* ---------------------------
//      Load customer + history
//   ---------------------------- */
//   useEffect(() => {
//     if (!session?.user || !inputKey) return;

//     let alive = true;

//     async function load() {
//       setLoading(true);
//       setMsg("");

//       try {
//         // -------------------------
//         // A) Resolve canonical key
//         // -------------------------
//         let canonical = inputKey;

//         // If the URL is a phone, try find bookings by phone and extract email
//         if (!isEmailKey(inputKey)) {
//           const phoneKey = digitsOnly(inputKey);

//           const { data: byPhone, error: byPhoneErr } = await supabase
//             .from("bookings")
//             .select("email,phone,customer_key,created_at")
//             .eq("phone", phoneKey)
//             .order("created_at", { ascending: false })
//             .limit(10);

//           if (byPhoneErr) throw new Error(byPhoneErr.message);

//           const rows = Array.isArray(byPhone) ? byPhone : [];
//           if (rows.length) {
//             const maybeEmail = String(rows[0]?.email || "")
//               .trim()
//               .toLowerCase();
//             if (maybeEmail) canonical = maybeEmail;
//             else {
//               const maybeCk = String(rows[0]?.customer_key || "")
//                 .trim()
//                 .toLowerCase();
//               canonical = maybeCk || phoneKey;
//             }
//           } else {
//             canonical = phoneKey;
//           }
//         }

//         canonical = normalizeCustomerKey(canonical);

//         if (!alive) return;

//         // Redirect to canonical (email) if we discovered it
//         if (canonical && canonical !== inputKey) {
//           navigate(`/admin/clientes/${encodeURIComponent(canonical)}`, {
//             replace: true,
//           });
//           return;
//         }

//         // -------------------------
//         // B) Load full history
//         // -------------------------
//         const ors = [];

//         if (canonical) {
//           if (isEmailKey(canonical)) ors.push(`email.eq.${canonical}`);
//           ors.push(`customer_key.eq.${canonical}`);
//         }

//         if (!isEmailKey(inputKey)) {
//           const phoneKey = digitsOnly(inputKey);
//           if (phoneKey) ors.push(`phone.eq.${phoneKey}`);
//         }

//         let historyQuery = supabase.from("bookings").select("*");
//         if (ors.length) historyQuery = historyQuery.or(ors.join(","));

//         const { data: historyRows, error: histErr } = await historyQuery
//           .order("created_at", { ascending: false })
//           .limit(200);

//         if (histErr) throw new Error(histErr.message);

//         if (!alive) return;

//         const rows = Array.isArray(historyRows) ? historyRows : [];
//         setHistory(rows);
//         setLatestBooking(rows[0] || null);

//         // -------------------------
//         // C) Load customers row
//         // -------------------------
//         const keyForCustomer =
//           canonical ||
//           canonicalKeyFromRow(rows[0]) ||
//           normalizeCustomerKey(inputKey);

//         let customerRow = null;

//         if (keyForCustomer) {
//           const { data: cRow, error: cErr } = await supabase
//             .from("customers")
//             .select("*")
//             .eq("customer_key", keyForCustomer)
//             .maybeSingle();

//           if (cErr) throw new Error(cErr.message);
//           customerRow = cRow || null;
//         }

//         if (!alive) return;

//         setCustomer(customerRow);

//         if (!customerRow && rows.length === 0) {
//           setMsg("Cliente no encontrado (sin historial y sin ficha).");
//         }
//       } catch (e) {
//         if (!alive) return;
//         console.error(e);
//         setMsg(e?.message || "No se pudo cargar el cliente.");
//         setCustomer(null);
//         setLatestBooking(null);
//         setHistory([]);
//       } finally {
//         if (alive) setLoading(false);
//       }
//     }

//     load();

//     return () => {
//       alive = false;
//     };
//   }, [session, inputKey, navigate]);

//   /* ---------------------------
//      Not logged in (SAFE: all hooks already ran)
//   ---------------------------- */
//   if (!session) {
//     return (
//       <Wrap>
//         <Card>
//           <h2 style={{ margin: "0 0 0.35rem" }}>Cliente</h2>
//           <p style={{ margin: 0, opacity: 0.75 }}>
//             Inicia sesión para ver esta ficha.
//           </p>
//         </Card>
//       </Wrap>
//     );
//   }

//   /* ---------------------------
//      Drawer "customer" object
//   ---------------------------- */
//   const drawerCustomer = latestBooking
//     ? {
//         ...latestBooking,
//         customer_key:
//           latestBooking.customer_key ||
//           canonicalKeyFromRow(latestBooking) ||
//           inputKey,
//         // override name for stable display (the "profile name")
//         customer_name: displayName,
//         name: displayName,
//       }
//     : customer
//     ? {
//         id: customer.customer_key,
//         customer_key: customer.customer_key,
//         customer_name: displayName,
//         name: displayName,
//         phone: customer.phone || "",
//         email: customer.email || "",
//         city: customer.city || "",
//         status_admin: customer.status || "nuevo",
//         contact_preference: customer.contact_preference || "WhatsApp",
//         meeting_mode: null,
//         pack: null,
//         message: "",
//         created_at: customer.updated_at || customer.created_at || null,
//       }
//     : null;

//   return (
//     <Wrap>
//       <div style={{ display: "grid", gap: "0.75rem" }}>
//         <Card>
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "space-between",
//               gap: "1rem",
//               alignItems: "center",
//               flexWrap: "wrap",
//             }}
//           >
//             <div>
//               <h2 style={{ margin: 0 }}>{displayName}</h2>
//               <p style={{ margin: "0.25rem 0 0", opacity: 0.75 }}>
//                 Ficha privada del cliente
//               </p>

//               {namesUsed.length > 1 && (
//                 <p style={{ margin: "0.35rem 0 0", opacity: 0.85 }}>
//                   <strong>Nombres usados:</strong> {namesUsed.join(", ")}
//                 </p>
//               )}

//               {msg && (
//                 <p style={{ margin: "0.5rem 0 0", opacity: 0.85 }}>{msg}</p>
//               )}
//             </div>

//             <div style={{ display: "flex", gap: "0.5rem" }}>
//               <Button type="button" onClick={() => navigate(-1)}>
//                 ← Volver
//               </Button>
//             </div>
//           </div>
//         </Card>

//         {loading && (
//           <Card>
//             <p style={{ margin: 0, opacity: 0.75 }}>Cargando…</p>
//           </Card>
//         )}

//         {!loading && drawerCustomer && (
//           <CustomerDrawer
//             customer={drawerCustomer}
//             history={history}
//             onClose={() => navigate(-1)}
//             onStatusChange={async (nextStatus) => {
//               setCustomer((prev) =>
//                 prev ? { ...prev, status: nextStatus } : prev
//               );

//               const key = normalizeCustomerKey(
//                 customer?.customer_key ||
//                   drawerCustomer.customer_key ||
//                   inputKey
//               );

//               if (!key) {
//                 setMsg("No se pudo guardar estado: customer_key vacío.");
//                 return;
//               }

//               const { error } = await supabase
//                 .from("customers")
//                 .update({
//                   status: nextStatus,
//                   updated_at: new Date().toISOString(),
//                 })
//                 .eq("customer_key", key);

//               if (error) setMsg(error.message);
//             }}
//           />
//         )}

//         {!loading && !drawerCustomer && !msg && (
//           <Card>
//             <p style={{ margin: 0, opacity: 0.75 }}>Cliente no disponible.</p>
//           </Card>
//         )}
//       </div>
//     </Wrap>
//   );
// }
