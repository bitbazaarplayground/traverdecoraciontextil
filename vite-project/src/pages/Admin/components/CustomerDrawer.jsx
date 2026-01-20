import React from "react";
import { Button, Drawer, Table } from "../adminStyles";

export default function CustomerDrawer({
  customer,
  images,
  imgLoading,
  adminNote,
  noteLoading,
  setAdminNote,
  onClose,
  saveCustomerNote,
  saveImageCaption,
  setImages,
  setMsg,
  uploadCustomerImages,
  deleteCustomerImage,
}) {
  if (!customer) return null;

  const key = (customer.phone || customer.email || "").trim().toLowerCase();

  const address = customer.home_visit
    ? [
        customer.address_line1,
        `${customer.postal_code || ""} ${customer.city || ""}`,
      ]
        .filter(Boolean)
        .join(", ")
    : "";

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
        </div>

        <Button
          type="button"
          onClick={() => {
            onClose?.();
          }}
        >
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
                  onClick={async () => {
                    if (!key) return;
                    await saveCustomerNote(key);
                  }}
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
                    if (!key) return;

                    try {
                      await uploadCustomerImages(key, files);
                    } catch (err) {
                      // msg already set in parent
                    } finally {
                      e.target.value = "";
                    }
                  }}
                />

                <p style={{ marginTop: 0, opacity: 0.7 }}>
                  (Upload se mantiene en AdminBookings en este paso para no
                  romper nada. En el siguiente paso lo movemos aquí.)
                </p>

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
                            setMsg(
                              "Esta imagen no tiene id (no se puede guardar la nota)."
                            );
                            return;
                          }
                          try {
                            await saveImageCaption(img);
                            setMsg("Nota guardada ✅");
                          } catch (err) {
                            console.error(err);
                            setMsg(err?.message || "Error guardando nota");
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
                            setMsg(
                              "Esta imagen no tiene id (no se puede eliminar)."
                            );
                            return;
                          }

                          try {
                            await deleteCustomerImage(img.id);
                          } catch (err) {
                            // msg already set in parent
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
