import React, { useEffect, useMemo, useRef, useState } from "react";
import { supabase } from "../../../lib/supabaseClient.js";
import { Button, Drawer, Table } from "../adminStyles";

function cacheKeyForCustomer(key) {
  return `customer-images-cache:${key}`;
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
function saveImagesCache(key, images) {
  try {
    localStorage.setItem(
      cacheKeyForCustomer(key),
      JSON.stringify({ savedAt: Date.now(), images })
    );
  } catch {}
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result; // data:image/png;base64,...
      const base64 = String(result).split(",")[1];
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function CustomerDrawer({ customer, onClose, onStatusChange }) {
  const customerKey = useMemo(() => {
    return (customer?.phone || customer?.email || "").trim().toLowerCase();
  }, [customer]);

  const [drawerMsg, setDrawerMsg] = useState("");

  // Notes
  const [adminNote, setAdminNote] = useState("");
  const [noteLoading, setNoteLoading] = useState(false);

  // Images
  const [images, setImages] = useState([]);
  const [imgLoading, setImgLoading] = useState(false);

  // Status
  const [status, setStatus] = useState(customer?.status_admin || "nuevo");
  useEffect(() => {
    setStatus(customer?.status_admin || "nuevo");
  }, [customer]);

  const address = customer?.home_visit
    ? [
        customer.address_line1,
        `${customer.postal_code || ""} ${customer.city || ""}`,
      ]
        .filter(Boolean)
        .join(", ")
    : "";

  // Keep ONE channel instance for broadcast (avoid creating new ones)
  const broadcastChannelRef = useRef(null);

  async function broadcastCustomerUpdated(key) {
    try {
      if (!key) return;

      // Lazily create & subscribe once
      if (!broadcastChannelRef.current) {
        broadcastChannelRef.current = supabase.channel("admin-sync");
        await broadcastChannelRef.current.subscribe();
      }

      await broadcastChannelRef.current.send({
        type: "broadcast",
        event: "customer_updated",
        payload: { customerKey: key, at: Date.now() },
      });
    } catch (e) {
      // Don't block UX if broadcast fails
      console.warn("Broadcast failed:", e?.message || e);
    }
  }

  // Listen to broadcasts from other admins and refresh this drawer if same customer
  useEffect(() => {
    if (!customerKey) return;

    const ch = supabase.channel("admin-sync");

    ch.on("broadcast", { event: "customer_updated" }, ({ payload }) => {
      const key = payload?.customerKey;
      if (!key) return;

      // only refresh if the drawer is open for same customer
      if (key === customerKey) {
        loadCustomerNote(customerKey);
        loadCustomerImages(customerKey);
        setDrawerMsg("Actualizado en tiempo real ✅");
      }
    });

    ch.subscribe();

    return () => {
      supabase.removeChannel(ch);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customerKey]);

  // ---------------- Notes ----------------
  async function loadCustomerNote(key) {
    if (!key) return;
    setNoteLoading(true);
    try {
      const { data, error } = await supabase
        .from("customer_admin_notes")
        .select("note")
        .eq("customer_key", key)
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

  async function saveCustomerNote(key) {
    if (!key) return;
    setNoteLoading(true);
    setDrawerMsg("");
    try {
      const { error } = await supabase.from("customer_admin_notes").upsert(
        {
          customer_key: key,
          note: adminNote || "",
          updated_at: new Date().toISOString(),
        },
        { onConflict: "customer_key" }
      );

      if (error) throw error;

      setDrawerMsg("Nota guardada ✅");
      await broadcastCustomerUpdated(key);
    } catch (err) {
      console.error(err);
      setDrawerMsg(err?.message || "Error guardando nota");
    } finally {
      setNoteLoading(false);
    }
  }

  // ---------------- Images ----------------
  async function loadCustomerImages(key) {
    if (!key) return;
    setImgLoading(true);

    const cached = loadImagesCache(key);
    if (!navigator.onLine && cached?.images) {
      setImages(cached.images);
      setDrawerMsg(
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
          key
        )}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const data = await res.json().catch(() => ({}));
      if (!res.ok)
        throw new Error(data?.error || "No se pudieron cargar imágenes.");

      const imgs = data.images || [];
      setImages(imgs);
      saveImagesCache(key, imgs);

      if (drawerMsg?.startsWith("Modo offline")) setDrawerMsg("");
    } catch (err) {
      console.error(err);

      const fallback = loadImagesCache(key);
      if (fallback?.images) {
        setImages(fallback.images);
        setDrawerMsg(
          `No se pudo sincronizar. Mostrando caché (última: ${new Date(
            fallback.savedAt
          ).toLocaleString()})`
        );
      } else {
        setImages([]);
        setDrawerMsg(err?.message || "No se pudieron cargar imágenes.");
      }
    } finally {
      setImgLoading(false);
    }
  }

  async function uploadCustomerImages(key, files) {
    if (!key) throw new Error("Customer key no válido.");
    if (!files?.length) return;

    setImgLoading(true);
    setDrawerMsg("");
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
            key,
            filename: file.name,
            contentType: file.type,
            base64,
          }),
        });

        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data?.error || "Error subiendo imagen");
      }

      await loadCustomerImages(key);
      setDrawerMsg("Imágenes subidas ✅");
      await broadcastCustomerUpdated(key);
    } catch (err) {
      console.error(err);
      setDrawerMsg(err?.message || "Error subiendo imagen");
      throw err;
    } finally {
      setImgLoading(false);
    }
  }

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

    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data?.error || "No se pudo guardar la nota");

    await broadcastCustomerUpdated(customerKey);
  }

  async function deleteCustomerImage(imageId) {
    if (!imageId) throw new Error("Imagen sin id.");

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

    setImages((prev) => prev.filter((p) => p.id !== imageId));
    setDrawerMsg("Imagen eliminada ✅");

    await broadcastCustomerUpdated(customerKey);
  }

  async function updateStatus(next) {
    try {
      const { data: sess } = await supabase.auth.getSession();
      const token = sess?.session?.access_token;
      if (!token) throw new Error("Sesión no válida.");

      const res = await fetch("/.netlify/functions/admin-bookings-status", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          bookingId: customer.id,
          status_admin: next,
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || "No se pudo guardar");

      setStatus(next);
      onStatusChange?.(next);
      setDrawerMsg("Estado actualizado ✅");

      await broadcastCustomerUpdated(customerKey);
    } catch (err) {
      console.error(err);
      alert(err?.message || "Error guardando estado");
    }
  }

  // Load everything when customer changes
  useEffect(() => {
    if (!customer) return;

    setDrawerMsg("");
    setImages([]);
    setAdminNote("");

    if (!customerKey) return;

    loadCustomerImages(customerKey);
    loadCustomerNote(customerKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customer, customerKey]);

  // Cleanup broadcast channel instance if component unmounts
  useEffect(() => {
    return () => {
      if (broadcastChannelRef.current) {
        supabase.removeChannel(broadcastChannelRef.current);
        broadcastChannelRef.current = null;
      }
    };
  }, []);

  if (!customer) return null;

  return (
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
          {drawerMsg && (
            <p style={{ margin: "0.5rem 0 0", opacity: 0.85 }}>{drawerMsg}</p>
          )}
        </div>

        <Button type="button" onClick={onClose}>
          Cerrar
        </Button>
      </div>

      <div style={{ height: "0.75rem" }} />

      <Table>
        <tbody>
          <tr>
            <th style={{ width: 220 }}>Nombre</th>
            <td>{customer.customer_name}</td>
          </tr>
          <tr>
            <th>Teléfono / WhatsApp</th>
            <td>{customer.phone}</td>
          </tr>
          <tr>
            <th>Email</th>
            <td>{customer.email || "—"}</td>
          </tr>
          <tr>
            <th>Preferencia</th>
            <td>{customer.contact_preference}</td>
          </tr>

          <tr>
            <th>Estado</th>
            <td>
              <select
                value={status}
                onChange={(e) => updateStatus(e.target.value)}
                style={{
                  padding: "0.4rem 0.6rem",
                  borderRadius: 10,
                  border: "1px solid rgba(17,17,17,0.15)",
                  fontWeight: 700,
                }}
              >
                <option value="nuevo">Nuevo</option>
                <option value="presupuesto">Presupuesto</option>
                <option value="en_proceso">En proceso</option>
                <option value="finalizado">Finalizado</option>
                <option value="no_interesado">No interesado</option>
              </select>
            </td>
          </tr>

          <tr>
            <th>Dirección</th>
            <td>
              {customer.home_visit ? (
                <div style={{ display: "grid", gap: "0.5rem" }}>
                  <div>{address}</div>
                  <div
                    style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}
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
                  </div>
                </div>
              ) : (
                "—"
              )}
            </td>
          </tr>

          <tr>
            <th>Notas</th>
            <td>{customer.address_notes || "—"}</td>
          </tr>

          <tr>
            <th>Notas internas</th>
            <td>
              <textarea
                value={adminNote}
                onChange={(e) => setAdminNote(e.target.value)}
                placeholder="Notas para admins/empleados (código de puerta, perro, instrucciones, etc.)"
                style={{
                  width: "100%",
                  minHeight: 90,
                  padding: "0.75rem",
                  borderRadius: 12,
                  border: "1px solid rgba(17,17,17,0.12)",
                  resize: "vertical",
                }}
              />

              <div style={{ marginTop: "0.5rem" }}>
                <Button
                  type="button"
                  disabled={noteLoading}
                  onClick={() => saveCustomerNote(customerKey)}
                >
                  {noteLoading ? "Guardando..." : "Guardar nota"}
                </Button>
              </div>
            </td>
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
                    if (!customerKey) return;

                    try {
                      await uploadCustomerImages(customerKey, files);
                    } finally {
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
                      <a href={img.url || "#"} target="_blank" rel="noreferrer">
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
                        style={{
                          width: "100%",
                          padding: "0.5rem 0.6rem",
                          borderRadius: 10,
                          border: "1px solid rgba(17,17,17,0.12)",
                        }}
                      />

                      <Button
                        type="button"
                        onClick={async () => {
                          if (!img.id) {
                            setDrawerMsg("Esta imagen no tiene id.");
                            return;
                          }
                          try {
                            await saveImageCaption(img);
                            setDrawerMsg("Nota guardada ✅");
                          } catch (err) {
                            console.error(err);
                            setDrawerMsg(
                              err?.message || "Error guardando nota"
                            );
                          }
                        }}
                      >
                        Guardar
                      </Button>

                      <Button
                        $variant="danger"
                        type="button"
                        onClick={async () => {
                          if (!confirm("¿Eliminar esta imagen?")) return;
                          if (!img.id) {
                            setDrawerMsg("Esta imagen no tiene id.");
                            return;
                          }
                          try {
                            await deleteCustomerImage(img.id);
                          } catch (err) {
                            console.error(err);
                            setDrawerMsg(
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
  );
}
