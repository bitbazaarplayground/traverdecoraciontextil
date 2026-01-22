import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabaseClient";
import { Button } from "./adminStyles";

const linkStyle = ({ isActive }) => ({
  padding: "0.5rem 0.75rem",
  borderRadius: 999,
  textDecoration: "none",
  fontWeight: 800,
  fontSize: "0.9rem",
  color: "rgba(17,17,17,0.85)",
  background: isActive ? "rgba(17,17,17,0.08)" : "transparent",
});

export default function AdminLayout() {
  const navigate = useNavigate();

  async function signOut() {
    await supabase.auth.signOut();
    navigate("/admin"); // or navigate("/") if you prefer
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

          {/* Nav */}
          <div
            style={{
              marginTop: "0.5rem",
              display: "flex",
              gap: "0.5rem",
              flexWrap: "wrap",
            }}
          >
            <NavLink to="/admin" end style={linkStyle}>
              Bandeja
            </NavLink>
            <NavLink to="/admin/calendario" style={linkStyle}>
              Calendario
            </NavLink>
            <NavLink to="/admin/clientes" style={linkStyle}>
              Clientes
            </NavLink>
          </div>
        </div>

        <div style={{ display: "flex", gap: "0.5rem" }}>
          <Button type="button" onClick={signOut}>
            Cerrar sesión
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
