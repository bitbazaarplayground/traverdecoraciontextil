import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabaseClient";
import { Button } from "./adminStyles";

// ------- Small helpers -------
const navItemStyle = ({ isActive }) => ({
  display: "flex",
  alignItems: "center",
  gap: "0.6rem",
  padding: "0.7rem 0.85rem",
  borderRadius: 12,
  textDecoration: "none",
  fontWeight: 800,
  fontSize: "0.95rem",
  color: "rgba(17,17,17,0.88)",
  background: isActive ? "rgba(17,17,17,0.07)" : "transparent",
});

const bottomItemStyle = ({ isActive }) => ({
  flex: 1,
  textDecoration: "none",
  padding: "0.65rem 0.5rem",
  borderRadius: 12,
  display: "grid",
  placeItems: "center",
  gap: 4,
  fontWeight: 900,
  fontSize: "0.75rem",
  color: isActive ? "rgba(17,17,17,0.9)" : "rgba(17,17,17,0.6)",
  background: isActive ? "rgba(17,17,17,0.06)" : "transparent",
});

function Icon({ children }) {
  return (
    <span
      aria-hidden="true"
      style={{
        width: 22,
        height: 22,
        display: "grid",
        placeItems: "center",
        borderRadius: 8,
        background: "rgba(17,17,17,0.06)",
        fontSize: 12,
        fontWeight: 900,
      }}
    >
      {children}
    </span>
  );
}

export default function AdminLayout() {
  const navigate = useNavigate();

  async function signOut() {
    await supabase.auth.signOut();
    navigate("/admin");
    window.location.reload();
  }

  return (
    <div style={{ minHeight: "100vh", background: "rgba(245,245,245,0.9)" }}>
      {/* Small CSS (kept inside this file) */}
      <style>{`
        .adminShell {
          min-height: 100vh;
          display: grid;
          grid-template-columns: 280px 1fr;
        }
        .adminSidebar {
          position: sticky;
          top: 0;
          height: 100vh;
          padding: 1.25rem 1rem;
          border-right: 1px solid rgba(17,17,17,0.08);
          background: rgba(255,255,255,0.7);
          backdrop-filter: blur(8px);
        }
        .adminMain {
          display: grid;
          grid-template-rows: auto 1fr;
          min-width: 0;
        }
        .adminTopbar {
          position: sticky;
          top: 0;
          z-index: 10;
          padding: 1rem 1.25rem;
          border-bottom: 1px solid rgba(17,17,17,0.08);
          background: rgba(255,255,255,0.75);
          backdrop-filter: blur(8px);
        }
        .adminContent {
          padding: 1.25rem;
          max-width: 1200px;
          width: 100%;
          margin: 0 auto;
          min-width: 0;
        }

        /* Responsive: collapse sidebar + show bottom nav */
        .adminBottomNav {
          display: none;
        }
        @media (max-width: 900px) {
          .adminShell {
            grid-template-columns: 1fr;
          }
          .adminSidebar {
            display: none;
          }
          .adminContent {
            padding-bottom: 5.5rem; /* room for bottom nav */
          }
          .adminBottomNav {
            display: flex;
            position: fixed;
            left: 0;
            right: 0;
            bottom: 0;
            padding: 0.6rem;
            background: rgba(255,255,255,0.8);
            border-top: 1px solid rgba(17,17,17,0.08);
            backdrop-filter: blur(10px);
            gap: 0.5rem;
          }
        }
      `}</style>

      <div className="adminShell">
        {/* Sidebar (desktop) */}
        <aside className="adminSidebar">
          {/* Brand */}
          <div
            style={{ display: "grid", gap: "0.35rem", marginBottom: "1rem" }}
          >
            <div style={{ fontWeight: 900, fontSize: "1.15rem" }}>
              TRAVER <span style={{ opacity: 0.6 }}>ADMIN</span>
            </div>
            <div style={{ opacity: 0.65, fontSize: "0.9rem" }}>
              Gestión · Clientes · Calendario
            </div>
          </div>

          {/* Nav */}
          <nav style={{ display: "grid", gap: "0.35rem" }}>
            {/* NOTE: Keep your current routes for now */}
            <NavLink to="/admin" end style={navItemStyle}>
              <Icon>▦</Icon> Bandeja
            </NavLink>

            <NavLink to="/admin/clientes" style={navItemStyle}>
              <Icon>👥</Icon> Clientes
            </NavLink>

            <NavLink to="/admin/calendario" style={navItemStyle}>
              <Icon>📅</Icon> Calendario
            </NavLink>

            {/* Placeholders (we’ll wire these later) */}
            <NavLink to="/admin/presupuestos" style={navItemStyle}>
              <Icon>🧾</Icon> Presupuestos
            </NavLink>

            <NavLink to="/admin/ajustes" style={navItemStyle}>
              <Icon>⚙</Icon> Ajustes
            </NavLink>
          </nav>

          <div style={{ height: "1rem" }} />

          <div style={{ marginTop: "auto" }}>
            <Button type="button" onClick={signOut} style={{ width: "100%" }}>
              Cerrar sesión
            </Button>
          </div>
        </aside>

        {/* Main */}
        <div className="adminMain">
          {/* Top bar */}
          <header className="adminTopbar">
            <div
              style={{
                maxWidth: 1200,
                margin: "0 auto",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "1rem",
                flexWrap: "wrap",
              }}
            >
              <div style={{ display: "grid", gap: 2 }}>
                <div style={{ fontWeight: 900, fontSize: "1.1rem" }}>
                  Traver Admin
                </div>
                <div style={{ opacity: 0.7, fontSize: "0.9rem" }}>
                  Manage all requests, calendar availability, and more.
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
          </header>

          {/* Page content */}
          <main className="adminContent">
            <Outlet />
          </main>
        </div>
      </div>

      {/* Mobile bottom nav */}
      <nav className="adminBottomNav">
        <NavLink to="/admin" end style={bottomItemStyle}>
          <span style={{ fontSize: 16 }}>▦</span>
          <span>Dashboard</span>
        </NavLink>
        <NavLink to="/admin" style={bottomItemStyle}>
          <span style={{ fontSize: 16 }}>🧾</span>
          <span>Requests</span>
        </NavLink>
        <NavLink to="/admin/calendario" style={bottomItemStyle}>
          <span style={{ fontSize: 16 }}>📅</span>
          <span>Calendar</span>
        </NavLink>
        <NavLink to="/admin/presupuestos" style={bottomItemStyle}>
          <span style={{ fontSize: 16 }}>💬</span>
          <span>Quotes</span>
        </NavLink>
        <NavLink to="/admin/ajustes" style={bottomItemStyle}>
          <span style={{ fontSize: 16 }}>⚙</span>
          <span>More</span>
        </NavLink>
      </nav>
    </div>
  );
}
