// src/pages/AuthCallback.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NoIndex from "../components/NoIndex";

export default function AuthCallback() {
  const navigate = useNavigate();
  const [msg, setMsg] = useState("Verificando acceso...");

  useEffect(() => {
    let alive = true;

    async function run() {
      try {
        // ✅ Load Supabase only when this route is visited
        const { supabase } = await import("../lib/supabaseClient");

        // Supabase parses tokens from URL automatically
        const { data, error } = await supabase.auth.getSession();
        if (error) throw error;

        const params = new URLSearchParams(window.location.search);
        const type = params.get("type");

        if (!alive) return;

        if (type === "recovery") {
          navigate("/admin/reset-password", { replace: true });
          return;
        }

        if (!data?.session) {
          setMsg("No se encontró una sesión válida.");
          return;
        }

        // default
        navigate("/admin", { replace: true });
      } catch (e) {
        if (!alive) return;
        setMsg("Error al validar la sesión.");
      }
    }

    run();
    return () => {
      alive = false;
    };
  }, [navigate]);

  return (
    <NoIndex title="Auth CallBack">
      <div
        style={{
          minHeight: "60vh",
          display: "grid",
          placeItems: "center",
          padding: "2rem",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <h2 style={{ margin: 0 }}>Accediendo…</h2>
          <p style={{ marginTop: "0.75rem", opacity: 0.75 }}>{msg}</p>
        </div>
      </div>
    </NoIndex>
  );
}
