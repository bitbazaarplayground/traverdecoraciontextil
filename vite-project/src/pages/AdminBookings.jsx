import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { supabase } from "../lib/supabaseClient.js";

const Wrap = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 2.25rem 1.25rem;
  display: grid;
  gap: 1.25rem;
`;

const Card = styled.div`
  border: 1px solid rgba(17, 17, 17, 0.12);
  background: rgba(255, 255, 255, 0.7);
  border-radius: 18px;
  padding: 1.1rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04);
`;

const Drawer = styled.div`
  border: 1px solid rgba(17, 17, 17, 0.12);
  background: rgba(255, 255, 255, 0.55);
  border-radius: 18px;
  padding: 1.1rem;
`;

const Row = styled.div`
  display: grid;
  gap: 0.75rem;

  @media (min-width: 760px) {
    grid-template-columns: 1fr 1fr;
    align-items: end;
  }
`;

const Label = styled.label`
  display: grid;
  gap: 0.35rem;
  font-size: 0.9rem;

  span {
    font-weight: 800;
    color: rgba(17, 17, 17, 0.78);
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 0.85rem 0.9rem;
  border-radius: 14px;
  border: 1px solid rgba(17, 17, 17, 0.12);
  background: rgba(17, 17, 17, 0.02);
  outline: none;
`;

const Button = styled.button`
  padding: 0.9rem 1rem;
  border-radius: 14px;
  border: 0;
  font-weight: 900;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-size: 0.75rem;
  cursor: pointer;
  background: ${({ $variant }) =>
    $variant === "danger" ? "#ffdfdf" : "#f2f2f2"};

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const LinkButton = styled.button`
  border: 0;
  background: transparent;
  padding: 0;
  text-align: left;
  cursor: pointer;
  font-weight: 800;
  color: rgba(17, 17, 17, 0.78);
  text-decoration: underline;
  text-underline-offset: 3px;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.92rem;

  th,
  td {
    text-align: left;
    padding: 0.7rem 0.55rem;
    border-bottom: 1px solid rgba(17, 17, 17, 0.1);
    vertical-align: top;
  }

  th {
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    opacity: 0.7;
  }
`;

function formatLocal(dt) {
  if (!dt) return "";
  const d = new Date(dt);
  return d.toLocaleString("es-ES", {
    weekday: "short",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function AdminBookings() {
  const [session, setSession] = useState(null);

  // Login
  const [mode, setMode] = useState("login"); // "login" | "forgot"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

  async function signInWithPassword(e) {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setMsg("Email o contraseña incorrectos.");
      return;
    }

    // Immediately check allow-list
    const loggedEmail = data?.user?.email?.toLowerCase();
    if (
      adminAllowlist.length &&
      loggedEmail &&
      !adminAllowlist.includes(loggedEmail)
    ) {
      await supabase.auth.signOut();
      setMsg("Acceso denegado. Este email no está autorizado.");
      return;
    }

    setPassword("");
  }

  async function sendResetEmail(e) {
    if (e?.preventDefault) e.preventDefault();

    if (!email) {
      setMsg("Introduce tu email para enviar el enlace de recuperación.");
      return;
    }

    setLoading(true);
    setMsg("");

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + "/auth/callback?type=recovery",
    });

    setLoading(false);

    if (error) {
      setMsg("No se pudo enviar el email de recuperación.");
      return;
    }

    setMsg("Te hemos enviado un email para restablecer tu contraseña.");
  }

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
  function buildAddressString(c) {
    if (!c?.home_visit) return "";
    const parts = [c.address_line1, `${c.postal_code || ""} ${c.city || ""}`];
    return parts.filter(Boolean).join(", ");
  }

  function googleMapsUrl(address) {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      address
    )}`;
  }

  function appleMapsUrl(address) {
    return `https://maps.apple.com/?q=${encodeURIComponent(address)}`;
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

  // ---------- LOGIN SCREEN ----------
  if (!session) {
    return (
      <Wrap>
        <Card>
          <h2 style={{ margin: "0 0 0.35rem" }}>Admin</h2>
          <p style={{ margin: "0 0 1rem", opacity: 0.75 }}>
            {mode === "login"
              ? "Accede con email y contraseña."
              : "Te enviaremos un enlace para restablecer tu contraseña."}
          </p>

          <form
            onSubmit={mode === "login" ? signInWithPassword : sendResetEmail}
            style={{ display: "grid", gap: "0.75rem" }}
          >
            <Label>
              <span>Email</span>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@email.com"
                required
                type="email"
              />
            </Label>

            {mode === "login" && (
              <Label>
                <span>Contraseña</span>
                <Input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  type="password"
                />
              </Label>
            )}

            <Button type="submit" disabled={loading}>
              {loading
                ? mode === "login"
                  ? "Entrando..."
                  : "Enviando..."
                : mode === "login"
                ? "Entrar"
                : "Enviar enlace"}
            </Button>

            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
              {mode === "login" ? (
                <LinkButton
                  type="button"
                  onClick={() => {
                    setMsg("");
                    setPassword("");
                    setMode("forgot");
                  }}
                  disabled={loading}
                >
                  He olvidado mi contraseña
                </LinkButton>
              ) : (
                <LinkButton
                  type="button"
                  onClick={() => {
                    setMsg("");
                    setPassword("");
                    setMode("login");
                  }}
                  disabled={loading}
                >
                  Volver a iniciar sesión
                </LinkButton>
              )}
            </div>

            {msg && <p style={{ margin: 0, opacity: 0.85 }}>{msg}</p>}
          </form>
        </Card>
      </Wrap>
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
            <Button onClick={loadData} disabled={loading}>
              {loading ? "Cargando..." : "Actualizar"}
            </Button>
            <Button onClick={signOut}>Salir</Button>
          </div>
        </div>
      </Card>
      {selectedCustomer && (
        <Drawer>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "1rem",
            }}
          >
            <div>
              <h3 style={{ margin: 0 }}>Cliente</h3>
              <p style={{ margin: "0.35rem 0 0", opacity: 0.75 }}>
                Historial y datos de contacto
              </p>
            </div>
            <Button type="button" onClick={() => setSelectedCustomer(null)}>
              Cerrar
            </Button>
          </div>

          <div style={{ height: "0.75rem" }} />

          <Table>
            <tbody>
              <tr>
                <th style={{ width: 220 }}>Nombre</th>
                <td>{selectedCustomer.customer_name}</td>
              </tr>
              <tr>
                <th>Teléfono / WhatsApp</th>
                <td>{selectedCustomer.phone}</td>
              </tr>
              <tr>
                <th>Email</th>
                <td>{selectedCustomer.email || "—"}</td>
              </tr>
              <tr>
                <th>Preferencia</th>
                <td>{selectedCustomer.contact_preference}</td>
              </tr>
              <tr>
                <th>Dirección</th>
                <td>
                  {selectedCustomer.home_visit
                    ? (() => {
                        const address = [
                          selectedCustomer.address_line1,
                          `${selectedCustomer.postal_code || ""} ${
                            selectedCustomer.city || ""
                          }`,
                        ]
                          .filter(Boolean)
                          .join(", ");

                        return (
                          <div style={{ display: "grid", gap: "0.5rem" }}>
                            <div>{address}</div>

                            <div
                              style={{
                                display: "flex",
                                gap: "0.5rem",
                                flexWrap: "wrap",
                              }}
                            >
                              <a
                                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                                  address
                                )}`}
                                target="_blank"
                                rel="noreferrer"
                                style={{
                                  fontWeight: 800,
                                  textDecoration: "underline",
                                  textUnderlineOffset: 3,
                                }}
                              >
                                Abrir en Google Maps
                              </a>

                              <a
                                href={`https://maps.apple.com/?q=${encodeURIComponent(
                                  address
                                )}`}
                                target="_blank"
                                rel="noreferrer"
                                style={{
                                  fontWeight: 800,
                                  textDecoration: "underline",
                                  textUnderlineOffset: 3,
                                }}
                              >
                                Abrir en Apple Maps
                              </a>
                            </div>
                          </div>
                        );
                      })()
                    : "—"}
                </td>
              </tr>

              <tr>
                <th>Notas</th>
                <td>{selectedCustomer.address_notes || "—"}</td>
              </tr>

              <tr>
                <th>Imágenes</th>
                <td>
                  <div style={{ marginTop: "0.25rem" }}>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={async (e) => {
                        const files = Array.from(e.target.files || []);
                        if (!files.length) return;

                        const key = (
                          selectedCustomer.phone ||
                          selectedCustomer.email ||
                          ""
                        )
                          .trim()
                          .toLowerCase();

                        if (!key) return;

                        setImgLoading(true);
                        try {
                          const { data: sess } =
                            await supabase.auth.getSession();
                          const token = sess?.session?.access_token;
                          if (!token) throw new Error("Sesión no válida.");

                          for (const file of files) {
                            const base64 = await fileToBase64(file);

                            const res = await fetch(
                              "/.netlify/functions/admin-customer-images",
                              {
                                method: "POST",
                                headers: {
                                  "Content-Type": "application/json",
                                  Authorization: `Bearer ${token}`,
                                },
                                body: JSON.stringify({
                                  key,
                                  filename: file.name,
                                  contentType: file.type,
                                  base64,
                                }),
                              }
                            );

                            const data = await res.json();
                            if (!res.ok)
                              throw new Error(
                                data?.error || "Error subiendo imagen"
                              );
                          }

                          await loadCustomerImages(key);
                        } catch (err) {
                          console.error(err);
                          setMsg(err?.message || "Error subiendo imagen");
                        } finally {
                          setImgLoading(false);
                          e.target.value = "";
                        }
                      }}
                    />

                    {imgLoading && (
                      <p style={{ opacity: 0.75, marginTop: "0.5rem" }}>
                        Cargando…
                      </p>
                    )}

                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(3, 1fr)",
                        gap: "0.5rem",
                        marginTop: "0.75rem",
                      }}
                    >
                      {images.map((img) => (
                        <div
                          key={img.id || img.path}
                          style={{ display: "grid", gap: "0.35rem" }}
                        >
                          <a
                            href={img.url || "#"}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <img
                              src={img.url || ""}
                              alt=""
                              style={{
                                width: "100%",
                                height: 110,
                                objectFit: "cover",
                                borderRadius: 12,
                                border: "1px solid rgba(17,17,17,0.12)",
                              }}
                            />
                          </a>

                          <input
                            value={img.caption || ""}
                            placeholder="Añadir nota..."
                            onChange={(e) => {
                              const caption = e.target.value;
                              setImages((prev) =>
                                prev.map((p) =>
                                  p.id === img.id ? { ...p, caption } : p
                                )
                              );
                            }}
                            onBlur={async () => {
                              // Si por lo que sea llega una imagen sin id, no intentes guardar
                              if (!img.id) {
                                setMsg(
                                  "Esta imagen no tiene id (no se puede guardar la nota)."
                                );
                                return;
                              }

                              try {
                                const { data: sess } =
                                  await supabase.auth.getSession();
                                const token = sess?.session?.access_token;
                                if (!token)
                                  throw new Error("Sesión no válida.");

                                const res = await fetch(
                                  "/.netlify/functions/admin-customer-images",
                                  {
                                    method: "PATCH",
                                    headers: {
                                      "Content-Type": "application/json",
                                      Authorization: `Bearer ${token}`,
                                    },
                                    body: JSON.stringify({
                                      id: img.id,
                                      caption: img.caption || "",
                                    }),
                                  }
                                );

                                const data = await res.json();
                                if (!res.ok)
                                  throw new Error(
                                    data?.error || "No se pudo guardar la nota"
                                  );

                                // opcional: si quieres limpiar un msg anterior al guardar bien
                                // setMsg("");
                              } catch (err) {
                                console.error(err);
                                setMsg(err?.message || "Error guardando nota");
                              }
                            }}
                            style={{
                              width: "100%",
                              padding: "0.5rem 0.6rem",
                              borderRadius: 10,
                              border: "1px solid rgba(17,17,17,0.12)",
                            }}
                          />

                          <Button
                            $variant="danger"
                            type="button"
                            onClick={async () => {
                              if (!confirm("¿Eliminar esta imagen?")) return;

                              try {
                                const { data: sess } =
                                  await supabase.auth.getSession();
                                const token = sess?.session?.access_token;
                                if (!token)
                                  throw new Error("Sesión no válida.");

                                const res = await fetch(
                                  "/.netlify/functions/admin-customer-images",
                                  {
                                    method: "DELETE",
                                    headers: {
                                      "Content-Type": "application/json",
                                      Authorization: `Bearer ${token}`,
                                    },
                                    body: JSON.stringify({ id: img.id }),
                                  }
                                );

                                const data = await res.json();
                                if (!res.ok)
                                  throw new Error(
                                    data?.error || "No se pudo eliminar"
                                  );

                                setImages((prev) =>
                                  prev.filter((p) => p.id !== img.id)
                                );
                              } catch (err) {
                                console.error(err);
                                setMsg(
                                  err?.message || "Error eliminando imagen"
                                );
                              }
                            }}
                          >
                            Eliminar
                          </Button>
                        </div>
                      ))}
                    </div>

                    {!imgLoading && images.length === 0 && (
                      <p style={{ marginTop: "0.5rem", opacity: 0.7 }}>
                        No hay imágenes aún.
                      </p>
                    )}
                  </div>
                </td>
              </tr>
            </tbody>
          </Table>
        </Drawer>
      )}
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
