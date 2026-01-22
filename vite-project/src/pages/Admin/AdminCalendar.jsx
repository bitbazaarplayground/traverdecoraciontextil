import { useEffect, useMemo, useState } from "react";
import { supabase } from "../../lib/supabaseClient.js";
import { Button, Card, Input, Label, Row, Table, Wrap } from "./adminStyles";
import { formatLocal } from "./utils";

export default function AdminCalendar() {
  const [session, setSession] = useState(null);

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const [blackouts, setBlackouts] = useState([]);

  // Block form
  const [blockStart, setBlockStart] = useState("");
  const [blockEnd, setBlockEnd] = useState("");
  const [blockReason, setBlockReason] = useState("Bloqueado");

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

  async function loadBlackouts() {
    setLoading(true);
    setMsg("");

    try {
      const { data: sess } = await supabase.auth.getSession();
      const token = sess?.session?.access_token;
      if (!token) throw new Error("Sesión no válida.");

      // Reuse your existing admin endpoint so rules/permissions stay consistent
      const res = await fetch("/.netlify/functions/admin-bookings?limit=200", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "No se pudo cargar datos.");

      setBlackouts(data.blackouts || []);
    } catch (e) {
      setMsg(e?.message || "No se pudo cargar bloqueos.");
      setBlackouts([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (session && isAllowed) loadBlackouts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, isAllowed]);

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
    loadBlackouts();
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

    loadBlackouts();
  }

  if (!session) {
    return (
      <Wrap>
        <Card>
          <h2 style={{ margin: "0 0 0.35rem" }}>Calendario</h2>
          <p style={{ margin: 0, opacity: 0.75 }}>
            Inicia sesión para ver el calendario.
          </p>
        </Card>
      </Wrap>
    );
  }

  if (!isAllowed) {
    return (
      <Wrap>
        <Card>
          <h2 style={{ margin: "0 0 0.35rem" }}>Acceso denegado</h2>
          <p style={{ margin: 0, opacity: 0.75 }}>
            Este usuario no está en la lista de administradores.
          </p>
        </Card>
      </Wrap>
    );
  }

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
            <h2 style={{ margin: "0 0 0.25rem" }}>Calendario</h2>
            <p style={{ margin: 0, opacity: 0.75 }}>
              Bloquear disponibilidad y ver bloqueos.
            </p>
            {msg && (
              <p style={{ margin: "0.5rem 0 0", opacity: 0.85 }}>{msg}</p>
            )}
          </div>

          <div style={{ display: "flex", gap: "0.6rem" }}>
            <Button onClick={loadBlackouts} disabled={loading}>
              {loading ? "Cargando..." : "Actualizar"}
            </Button>
          </div>
        </div>
      </Card>

      {/* Bloquear horas */}
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

      {/* Placeholder for future calendar UI */}
      <Card>
        <h3 style={{ marginTop: 0 }}>Vista calendario (próximamente)</h3>
        <p style={{ margin: 0, opacity: 0.75 }}>
          Aquí mostraremos: próximas 48h, vista semanal y vista mensual.
        </p>
      </Card>
    </Wrap>
  );
}
