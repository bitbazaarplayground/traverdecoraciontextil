import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { supabase } from "../lib/supabaseClient.js";

const Wrap = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 2.25rem 1.25rem;
  display: grid;
  gap: 1.25rem;
`;

const Card = styled.div`
  border: 1px solid rgba(17, 17, 17, 0.12);
  background: rgba(255, 255, 255, 0.7);
  border-radius: 18px;
  padding: 1.1rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04);
`;

const Row = styled.div`
  display: grid;
  gap: 0.75rem;

  @media (min-width: 760px) {
    grid-template-columns: 1fr 1fr;
    align-items: end;
  }
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
  background: ${({ $variant }) =>
    $variant === "danger" ? "#ffdfdf" : "#f2f2f2"};

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const LinkButton = styled.button`
  border: 0;
  background: transparent;
  padding: 0;
  text-align: left;
  cursor: pointer;
  font-weight: 800;
  color: rgba(17, 17, 17, 0.78);
  text-decoration: underline;
  text-underline-offset: 3px;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.92rem;

  th,
  td {
    text-align: left;
    padding: 0.7rem 0.55rem;
    border-bottom: 1px solid rgba(17, 17, 17, 0.1);
    vertical-align: top;
  }

  th {
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    opacity: 0.7;
  }
`;

function formatLocal(dt) {
  if (!dt) return "";
  const d = new Date(dt);
  return d.toLocaleString("es-ES", {
    weekday: "short",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function AdminBookings() {
  const [session, setSession] = useState(null);

  // Login
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const [bookings, setBookings] = useState([]);
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

  async function signInWithPassword(e) {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setMsg("Email o contraseña incorrectos.");
      return;
    }

    // Immediately check allow-list
    const loggedEmail = data?.user?.email?.toLowerCase();
    if (
      adminAllowlist.length &&
      loggedEmail &&
      !adminAllowlist.includes(loggedEmail)
    ) {
      await supabase.auth.signOut();
      setMsg("Acceso denegado. Este email no está autorizado.");
      return;
    }

    setPassword("");
  }

  async function sendResetEmail() {
    if (!email) {
      setMsg("Introduce tu email para enviar el enlace de recuperación.");
      return;
    }

    setLoading(true);
    setMsg("");

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + "/auth/callback?type=recovery",
    });

    setLoading(false);

    if (error) {
      setMsg("No se pudo enviar el email de recuperación.");
      return;
    }

    setMsg("Te hemos enviado un email para restablecer tu contraseña.");
  }

  async function loadData() {
    setLoading(true);
    setMsg("");

    const b = await supabase
      .from("bookings")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(200);

    const bl = await supabase
      .from("blackouts")
      .select("*")
      .order("start_time", { ascending: true })
      .limit(200);

    setLoading(false);

    if (b.error) setMsg(b.error.message);
    else setBookings(b.data || []);

    if (bl.error) setMsg(bl.error.message);
    else setBlackouts(bl.data || []);
  }

  useEffect(() => {
    if (session && isAllowed) loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, isAllowed]);

  async function signOut() {
    await supabase.auth.signOut();
  }

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
    loadData();
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
    loadData();
  }

  // ---------- LOGIN SCREEN ----------
  if (!session) {
    return (
      <Wrap>
        <Card>
          <h2 style={{ margin: "0 0 0.35rem" }}>Admin</h2>
          <p style={{ margin: "0 0 1rem", opacity: 0.75 }}>
            Accede con email y contraseña.
          </p>

          <form
            onSubmit={signInWithPassword}
            style={{ display: "grid", gap: "0.75rem" }}
          >
            <Label>
              <span>Email</span>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@email.com"
                required
                type="email"
              />
            </Label>

            <Label>
              <span>Contraseña</span>
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                type="password"
              />
            </Label>

            <Button type="submit" disabled={loading}>
              {loading ? "Entrando..." : "Entrar"}
            </Button>

            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
              <LinkButton
                type="button"
                onClick={sendResetEmail}
                disabled={loading}
              >
                He olvidado mi contraseña
              </LinkButton>
            </div>

            {msg && <p style={{ margin: 0, opacity: 0.85 }}>{msg}</p>}
          </form>
        </Card>
      </Wrap>
    );
  }

  // ---------- NOT ALLOWED ----------
  if (!isAllowed) {
    return (
      <Wrap>
        <Card>
          <h2 style={{ margin: "0 0 0.35rem" }}>Acceso denegado</h2>
          <p style={{ margin: 0, opacity: 0.75 }}>
            Este usuario no está en la lista de administradores.
          </p>
          <div style={{ marginTop: "1rem" }}>
            <Button onClick={signOut}>Cerrar sesión</Button>
          </div>
        </Card>
      </Wrap>
    );
  }

  // ---------- DASHBOARD ----------
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
            <h2 style={{ margin: "0 0 0.25rem" }}>Panel de reservas</h2>
            <p style={{ margin: 0, opacity: 0.75 }}>
              Ver reservas + bloquear disponibilidad.
            </p>
            {msg && (
              <p style={{ margin: "0.5rem 0 0", opacity: 0.85 }}>{msg}</p>
            )}
          </div>

          <div style={{ display: "flex", gap: "0.6rem" }}>
            <Button onClick={loadData} disabled={loading}>
              {loading ? "Cargando..." : "Actualizar"}
            </Button>
            <Button onClick={signOut}>Salir</Button>
          </div>
        </div>
      </Card>

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

      <Card>
        <h3 style={{ marginTop: 0 }}>Reservas</h3>
        <Table>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Cliente</th>
              <th>Contexto</th>
              <th>Mensaje</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((bk) => (
              <tr key={bk.id}>
                <td>
                  <div>
                    <strong>{formatLocal(bk.start_time)}</strong>
                  </div>
                  <div style={{ opacity: 0.75 }}>
                    {formatLocal(bk.end_time)}
                  </div>
                </td>

                <td>
                  <div>
                    <strong>{bk.customer_name}</strong>
                  </div>
                  <div style={{ opacity: 0.8 }}>{bk.phone}</div>
                  {bk.email && <div style={{ opacity: 0.8 }}>{bk.email}</div>}
                  {bk.home_visit && (
                    <div style={{ opacity: 0.8, marginTop: "0.25rem" }}>
                      {bk.address_line1}, {bk.postal_code} {bk.city}
                    </div>
                  )}
                </td>

                <td>
                  <div>
                    <strong>{bk.pack}</strong>
                  </div>
                  <div style={{ opacity: 0.75 }}>{bk.contact_preference}</div>
                  <div style={{ opacity: 0.75 }}>Estado: {bk.status}</div>
                </td>

                <td style={{ whiteSpace: "pre-wrap" }}>{bk.message || ""}</td>
              </tr>
            ))}

            {bookings.length === 0 && (
              <tr>
                <td colSpan="4" style={{ opacity: 0.7 }}>
                  No hay reservas aún.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Card>
    </Wrap>
  );
}
