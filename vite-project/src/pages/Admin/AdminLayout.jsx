// src/pages/Admin/AdminLayout.jsx
import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import NoIndex from "../../components/NoIndex";
import { supabase } from "../../lib/supabaseClient";
import { Button } from "./adminStyles";
// ------- Small helpers -------
const navItemStyle = ({ isActive }) => ({
  display: "flex",
  alignItems: "center",
  gap: "0.75rem",

  // ✅ full-width row feel
  width: "100%",
  padding: "0.85rem 1rem",
  borderRadius: 0,
  textDecoration: "none",

  fontWeight: 800,
  fontSize: "0.95rem",
  color: isActive ? "#4f4234" : "#6a5a49",

  background: isActive ? "#f7f1e7" : "transparent",
  transition: "background 150ms ease",

  // ✅ left indicator bar
  borderLeft: isActive ? "4px solid #b08d57" : "4px solid transparent",
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

  const [adminName, setAdminName] = useState("Admin");

  async function signOut() {
    await supabase.auth.signOut();
    navigate("/admin");
    window.location.reload();
  }

  useEffect(() => {
    let alive = true;

    async function loadAdminName() {
      const { data } = await supabase.auth.getSession();
      const user = data?.session?.user;
      if (!user) return;

      const { data: adminRow } = await supabase
        .from("admin_users")
        .select("name")
        .eq("user_id", user.id)
        .maybeSingle();

      if (!alive) return;

      const name = adminRow?.name?.trim();
      if (name) {
        setAdminName(name);
        return;
      }

      // fallback: email prefix
      const email = user.email || "";
      const fallback = email.includes("@") ? email.split("@")[0] : "Admin";
      setAdminName(fallback || "Admin");
    }

    loadAdminName();

    return () => {
      alive = false;
    };
  }, []);

  return (
    <NoIndex title="Admin Panel">
      <div style={{ minHeight: "100vh", background: "#f1ebe6" }}>
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
          padding: 1.75rem 1rem;

          border-right: 1px solid rgba(17,17,17,0.08);
          background: #eae3df;

          backdrop-filter: blur(8px);
          display: flex;
          flex-direction: column;
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
        .adminNavLink:hover {
          background: #f7f1e7 !important;
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
          .adminNavLink:hover {
            background: #f7f0e7 !important;
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
              style={{
                display: "grid",
                gap: "0.15rem",
                marginBottom: "1.75rem",
                paddingLeft: "0.25rem",
              }}
            >
              <div
                style={{
                  fontFamily:
                    '"Playfair Display","Cormorant Garamond","Times New Roman",serif',
                  fontWeight: 700,
                  fontSize: "1.35rem",
                  letterSpacing: "0.08em",
                  color: "#a58048",
                  textTransform: "uppercase",
                  lineHeight: 1.1,
                }}
              >
                Traver
              </div>

              <div
                style={{
                  fontFamily:
                    '"Playfair Display","Cormorant Garamond","Times New Roman",serif',
                  fontWeight: 500,
                  fontSize: "0.72rem",
                  letterSpacing: "0.22em",
                  color: "#645345",
                  textTransform: "uppercase",
                  lineHeight: 1.1,
                }}
              >
                Decoración Textil
              </div>
            </div>

            {/* Nav */}
            <nav style={{ display: "grid", margin: "0 -1rem" }}>
              <NavLink
                to="/admin"
                end
                style={navItemStyle}
                className="adminNavLink"
              >
                <Icon>▦</Icon> Bandeja
              </NavLink>

              <NavLink
                to="/admin/clientes"
                style={navItemStyle}
                className="adminNavLink"
              >
                <Icon>👥</Icon> Clientes
              </NavLink>

              <NavLink
                to="/admin/calendario"
                style={navItemStyle}
                className="adminNavLink"
              >
                <Icon>📅</Icon> Calendario
              </NavLink>

              <NavLink
                to="/admin/presupuestos"
                style={navItemStyle}
                className="adminNavLink"
              >
                <Icon>🧾</Icon> Presupuestos
              </NavLink>

              <NavLink
                to="/admin/ajustes"
                style={navItemStyle}
                className="adminNavLink"
              >
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
            {/* Page content */}
            <main className="adminContent">
              <Outlet context={{ adminName, setAdminName }} />
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
      <Outlet />
    </NoIndex>
  );
}
