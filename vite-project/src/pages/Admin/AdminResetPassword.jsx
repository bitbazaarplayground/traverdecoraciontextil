// src/pages/Admin/AdminResetPassword.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import NoIndex from "../../components/NoIndex";

const Wrap = styled.div`
  max-width: 520px;
  margin: 0 auto;
  padding: 2.25rem 1.25rem;
  display: grid;
  gap: 1rem;
`;

const Card = styled.div`
  border: 1px solid rgba(17, 17, 17, 0.12);
  background: rgba(255, 255, 255, 0.7);
  border-radius: 18px;
  padding: 1.1rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04);
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
  background: ${({ theme }) => theme.colors.primary};
  color: #0b0c0f;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export default function AdminResetPassword() {
  const navigate = useNavigate();
  const [pw1, setPw1] = useState("");
  const [pw2, setPw2] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        // ✅ Load Supabase only when this route is visited
        const { supabase } = await import("../../lib/supabaseClient");
        await supabase.auth.getSession(); // parse tokens
      } catch {
        // ignore
      }
    })();

    return () => {
      alive = false;
    };
  }, []);

  async function handleReset(e) {
    e.preventDefault();
    setMsg("");

    if (pw1.length < 8) {
      setMsg("La contraseña debe tener al menos 8 caracteres.");
      return;
    }
    if (pw1 !== pw2) {
      setMsg("Las contraseñas no coinciden.");
      return;
    }

    setLoading(true);

    try {
      const { supabase } = await import("../../lib/supabaseClient");

      const { error } = await supabase.auth.updateUser({ password: pw1 });
      if (error) throw error;

      // Optional: sign out after reset (clean + secure)
      await supabase.auth.signOut();

      navigate("/admin", { replace: true });
    } catch (err) {
      setMsg(err?.message || "Error al actualizar la contraseña.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <NoIndex title="Restablecer contraseña">
      <Wrap>
        <Card>
          <h2 style={{ margin: "0 0 0.35rem" }}>Restablecer contraseña</h2>
          <p style={{ margin: "0 0 1rem", opacity: 0.75 }}>
            Escribe tu nueva contraseña para acceder al panel.
          </p>

          <form
            onSubmit={handleReset}
            style={{ display: "grid", gap: "0.75rem" }}
          >
            <Label>
              <span>Nueva contraseña</span>
              <Input
                type="password"
                value={pw1}
                onChange={(e) => setPw1(e.target.value)}
                required
              />
            </Label>

            <Label>
              <span>Repetir contraseña</span>
              <Input
                type="password"
                value={pw2}
                onChange={(e) => setPw2(e.target.value)}
                required
              />
            </Label>

            <Button type="submit" disabled={loading}>
              {loading ? "Guardando..." : "Guardar contraseña"}
            </Button>

            {msg && (
              <p style={{ margin: 0, color: "rgba(180, 30, 30, 0.85)" }}>
                {msg}
              </p>
            )}
          </form>
        </Card>
      </Wrap>
    </NoIndex>
  );
}
