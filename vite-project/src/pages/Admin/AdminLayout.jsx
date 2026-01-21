import React from "react";
import { Outlet } from "react-router-dom";
import { supabase } from "../../lib/supabaseClient";
import { Button } from "./adminStyles";

export default function AdminLayout() {
  async function signOut() {
    await supabase.auth.signOut();
    window.location.reload();
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "rgba(245,245,245,0.9)",
        padding: "1rem",
      }}
    >
      {/* Admin Top Bar */}
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto 1rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "1rem",
          flexWrap: "wrap",
        }}
      >
        <div>
          <div style={{ fontWeight: 900, fontSize: "1.1rem" }}>
            Traver Admin
          </div>
          <div style={{ opacity: 0.7, fontSize: "0.9rem" }}>
            Reservas · Clientes · Notas · Imágenes
          </div>
        </div>

        <div style={{ display: "flex", gap: "0.5rem" }}>
          <Button type="button" onClick={() => window.location.reload()}>
            Recargar
          </Button>
          <Button type="button" onClick={signOut}>
            Salir
          </Button>
        </div>
      </div>

      {/* Admin content */}
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <Outlet />
      </div>
    </div>
  );
}
