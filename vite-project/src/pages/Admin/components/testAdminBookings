import { useEffect, useMemo, useState } from "react";
import { supabase } from "../../lib/supabaseClient.js";
import { Button, Card, Input, Label, Row, Table, Wrap } from "./adminStyles";
import AdminLogin from "./components/AdminLogin.jsx";
import CustomerDrawer from "./components/CustomerDrawer.jsx";

import { formatLocal } from "./utils";

export default function AdminBookings() {
  const [session, setSession] = useState(null);
  // login
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const [bookings, setBookings] = useState([]);
  const [blackouts, setBlackouts] = useState([]);

  const [selectedCustomer, setSelectedCustomer] = useState(null);

  // Block form
  const [blockStart, setBlockStart] = useState("");
  const [blockEnd, setBlockEnd] = useState("");
  const [blockReason, setBlockReason] = useState("Bloqueado");

  // Image bucket
  const [images, setImages] = useState([]);
  const [imgLoading, setImgLoading] = useState(false);

  // Notes
  const [adminNote, setAdminNote] = useState("");
  const [noteLoading, setNoteLoading] = useState(false);

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
    if (window.location.href.includes("type=recovery")) {
      window.location.replace("/admin/reset-password");
    }
  }, []);

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

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "No se pudo cargar datos.");

      setBookings(data.bookings || []);
      setBlackouts(data.blackouts || []);
    } catch (e) {
      setMsg(e.message);
      setBookings([]);
      setBlackouts([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (session && isAllowed) loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, isAllowed]);

  useEffect(() => {
    if (!selectedCustomer) return;

    const key = (selectedCustomer.phone || selectedCustomer.email || "")
      .trim()
      .toLowerCase();

    if (!key) return;

    loadCustomerImages(key);
    loadCustomerNote(key);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCustomer]);

  async function signOut() {
    setSelectedCustomer(null);
    await supabase.auth.signOut();
  }

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

  // ---------- LOAD / SAVE CUSTOMER NOTE ----------
  async function loadCustomerNote(customerKey) {
    setNoteLoading(true);
    try {
      const { data, error } = await supabase
        .from("customer_admin_notes")
        .select("note")
        .eq("customer_key", customerKey)
        .maybeSingle();

      if (error) throw error;
      setAdminNote(data?.note || "");
    } catch (err) {
      console.error(err);
      setAdminNote("");
    } finally {
      setNoteLoading(false);
    }
  }

  async function saveCustomerNote(customerKey) {
    setNoteLoading(true);
    try {
      const { error } = await supabase.from("customer_admin_notes").upsert(
        {
          customer_key: customerKey,
          note: adminNote || "",
          updated_at: new Date().toISOString(),
        },
        { onConflict: "customer_key" }
      );

      if (error) throw error;
      setMsg("Nota guardada ✅");
    } catch (err) {
      console.error(err);
      setMsg(err?.message || "Error guardando nota");
    } finally {
      setNoteLoading(false);
    }
  }

  // ---------- LOAD CUSTOMER IMAGES ----------
  async function loadCustomerImages(customerKey) {
    setImgLoading(true);

    // 0) If offline, try to use cache immediately
    const cached = loadImagesCache(customerKey);
    if (!navigator.onLine && cached?.images) {
      setImages(cached.images);
      setMsg(
        `Modo offline. Última sincronización: ${new Date(
          cached.savedAt
        ).toLocaleString()}`
      );
      setImgLoading(false);
      return;
    }

    try {
      const { data: sess } = await supabase.auth.getSession();
      const token = sess?.session?.access_token;
      if (!token) throw new Error("Sesión no válida.");

      const res = await fetch(
        `/.netlify/functions/admin-customer-images?key=${encodeURIComponent(
          customerKey
        )}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || "No se pudieron cargar imágenes.");
      }

      const imgs = data.images || [];
      setImages(imgs);

      // 1) Save successful results to cache
      saveImagesCache(customerKey, imgs);

      // 2) Clear offline message if we successfully loaded online
      if (msg?.startsWith("Modo offline")) setMsg("");
    } catch (e) {
      // 3) If fetch fails, fallback to cache if possible
      const fallback = loadImagesCache(customerKey);
      if (fallback?.images) {
        setImages(fallback.images);
        setMsg(
          `No se pudo sincronizar. Mostrando caché (última: ${new Date(
            fallback.savedAt
          ).toLocaleString()})`
        );
      } else {
        setImages([]);
        setMsg(e?.message || "No se pudieron cargar imágenes.");
      }
    } finally {
      setImgLoading(false);
    }
  }
  // Save image caption
  async function saveImageCaption(img) {
    const { data: sess } = await supabase.auth.getSession();
    const token = sess?.session?.access_token;
    if (!token) throw new Error("Sesión no válida.");

    const res = await fetch("/.netlify/functions/admin-customer-images", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id: img.id, caption: img.caption || "" }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data?.error || "No se pudo guardar la nota");
  }

  // Browser safe
  function fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result; // "data:image/png;base64,...."
        const base64 = String(result).split(",")[1];
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }
  function cacheKeyForCustomer(key) {
    return `customer-images-cache:${key}`;
  }

  function saveImagesCache(key, images) {
    try {
      localStorage.setItem(
        cacheKeyForCustomer(key),
        JSON.stringify({ savedAt: Date.now(), images })
      );
    } catch {}
  }

  function loadImagesCache(key) {
    try {
      const raw = localStorage.getItem(cacheKeyForCustomer(key));
      if (!raw) return null;
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }
  async function uploadCustomerImages(customerKey, files) {
    if (!customerKey) throw new Error("Customer key no válido.");
    if (!files?.length) return;

    setImgLoading(true);
    try {
      const { data: sess } = await supabase.auth.getSession();
      const token = sess?.session?.access_token;
      if (!token) throw new Error("Sesión no válida.");

      for (const file of files) {
        const base64 = await fileToBase64(file);

        const res = await fetch("/.netlify/functions/admin-customer-images", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            key: customerKey,
            filename: file.name,
            contentType: file.type,
            base64,
          }),
        });

        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data?.error || "Error subiendo imagen");
      }

      await loadCustomerImages(customerKey);
      setMsg("Imágenes subidas ✅");
    } catch (err) {
      console.error(err);
      setMsg(err?.message || "Error subiendo imagen");
      throw err;
    } finally {
      setImgLoading(false);
    }
  }

  async function deleteCustomerImage(imageId) {
    if (!imageId) throw new Error("Imagen sin id.");
    try {
      const { data: sess } = await supabase.auth.getSession();
      const token = sess?.session?.access_token;
      if (!token) throw new Error("Sesión no válida.");

      const res = await fetch("/.netlify/functions/admin-customer-images", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id: imageId }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || "No se pudo eliminar");

      // optimistic UI
      setImages((prev) => prev.filter((p) => p.id !== imageId));
      setMsg("Imagen eliminada ✅");
    } catch (err) {
      console.error(err);
      setMsg(err?.message || "Error eliminando imagen");
      throw err;
    }
  }

  // ---------- LOGIN SCREEN ----------
  if (!session) {
    return (
      <AdminLogin adminAllowlist={adminAllowlist} onSession={setSession} />
    );
  }

  // ---------- NOT ALLOWED ----------
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

  // ---------- DASHBOARD ----------
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
            <h2 style={{ margin: "0 0 0.25rem" }}>Panel de reservas</h2>
            <p style={{ margin: 0, opacity: 0.75 }}>
              Ver reservas + bloquear disponibilidad.
            </p>
            {msg && (
              <p style={{ margin: "0.5rem 0 0", opacity: 0.85 }}>{msg}</p>
            )}
          </div>

          <div style={{ display: "flex", gap: "0.6rem" }}>
            <Button
              onClick={async () => {
                await loadData();

                if (selectedCustomer) {
                  const key = (
                    selectedCustomer.phone ||
                    selectedCustomer.email ||
                    ""
                  )
                    .trim()
                    .toLowerCase();
                  if (key) {
                    await loadCustomerImages(key);
                    await loadCustomerNote(key);
                  }
                }
              }}
              disabled={loading}
            >
              {loading ? "Cargando..." : "Actualizar"}
            </Button>

            <Button onClick={signOut}>Salir</Button>
          </div>
        </div>
      </Card>
      <CustomerDrawer
        customer={selectedCustomer}
        images={images}
        imgLoading={imgLoading}
        adminNote={adminNote}
        noteLoading={noteLoading}
        setAdminNote={setAdminNote}
        setImages={setImages}
        setMsg={setMsg}
        saveCustomerNote={saveCustomerNote}
        saveImageCaption={saveImageCaption}
        uploadCustomerImages={uploadCustomerImages}
        deleteCustomerImage={deleteCustomerImage}
        onClose={() => {
          setSelectedCustomer(null);
          setImages([]);
          setAdminNote("");
          setMsg("");
        }}
      />

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

      <Card>
        <h3 style={{ marginTop: 0 }}>Reservas</h3>
        <Table>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Cliente</th>
              <th>Contexto</th>
              <th>Mensaje</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((bk) => (
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
                  <div>
                    <button
                      type="button"
                      onClick={() => setSelectedCustomer(bk)}
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
                  <div style={{ opacity: 0.75 }}>Estado: {bk.status}</div>
                </td>

                <td style={{ whiteSpace: "pre-wrap" }}>{bk.message || ""}</td>
              </tr>
            ))}

            {bookings.length === 0 && (
              <tr>
                <td colSpan="4" style={{ opacity: 0.7 }}>
                  No hay reservas aún.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Card>
    </Wrap>
  );
}
