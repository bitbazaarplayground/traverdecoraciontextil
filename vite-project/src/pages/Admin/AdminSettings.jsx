import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { supabase } from "../../lib/supabaseClient";
import { Button, Card, Input, Label, Row, Wrap } from "./adminStyles";

export default function AdminSettings() {
  const outlet = useOutletContext() || {};
  const setAdminNameInLayout = outlet.setAdminName; // may be undefined if not wired yet

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  // Future-proof: keep settings grouped
  const [profile, setProfile] = useState({
    name: "",
  });

  useEffect(() => {
    let alive = true;

    async function loadProfile() {
      setLoading(true);
      setMsg("");

      try {
        const { data: sess } = await supabase.auth.getSession();
        const user = sess?.session?.user;
        if (!user) throw new Error("Sesión no válida.");

        const { data, error } = await supabase
          .from("admin_users")
          .select("name")
          .eq("user_id", user.id)
          .maybeSingle();

        if (error) throw error;

        if (!alive) return;

        const name = data?.name || "";
        setProfile((p) => ({ ...p, name }));

        // keep layout greeting in sync
        if (typeof setAdminNameInLayout === "function") {
          setAdminNameInLayout(name || "Admin");
        }
      } catch (e) {
        console.error(e);
        if (!alive) return;
        setMsg(e?.message || "No se pudo cargar Ajustes.");
      } finally {
        if (alive) setLoading(false);
      }
    }

    loadProfile();
    return () => {
      alive = false;
    };
  }, [setAdminNameInLayout]);

  async function saveProfile(e) {
    e?.preventDefault?.();
    setLoading(true);
    setMsg("");

    try {
      const { data: sess } = await supabase.auth.getSession();
      const user = sess?.session?.user;
      if (!user) throw new Error("Sesión no válida.");

      const name = (profile.name || "").trim();
      if (name.length < 2) {
        throw new Error("El nombre debe tener al menos 2 caracteres.");
      }

      const { error } = await supabase
        .from("admin_users")
        .upsert({ user_id: user.id, name }, { onConflict: "user_id" });

      if (error) throw error;

      if (typeof setAdminNameInLayout === "function") {
        setAdminNameInLayout(name);
      }

      setMsg("Nombre actualizado ✅");
    } catch (e) {
      console.error(e);
      setMsg(e?.message || "No se pudo guardar.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Wrap>
      <Card>
        <div style={{ display: "grid", gap: 6 }}>
          <h2 style={{ margin: 0 }}>Ajustes</h2>
          <p style={{ margin: 0, opacity: 0.75 }}>
            Actualiza tu perfil de admin. (Más opciones aquí más adelante.)
          </p>
          {msg && <p style={{ margin: "0.5rem 0 0" }}>{msg}</p>}
        </div>
      </Card>

      <Card>
        <h3 style={{ marginTop: 0 }}>Perfil</h3>

        <form onSubmit={saveProfile}>
          <Row>
            <Label>
              <span>Tu nombre</span>
              <Input
                value={profile.name}
                onChange={(e) =>
                  setProfile((p) => ({ ...p, name: e.target.value }))
                }
                placeholder="Ej. Nico"
                disabled={loading}
              />
            </Label>

            <Button type="submit" disabled={loading}>
              {loading ? "Guardando..." : "Guardar"}
            </Button>
          </Row>
        </form>
      </Card>

      {/* Future sections */}
      <Card>
        <h3 style={{ marginTop: 0 }}>Próximamente</h3>
        <p style={{ margin: 0, opacity: 0.75 }}>
          Zona horaria, duración de bloqueos, horarios, permisos, etc.
        </p>
      </Card>
    </Wrap>
  );
}
