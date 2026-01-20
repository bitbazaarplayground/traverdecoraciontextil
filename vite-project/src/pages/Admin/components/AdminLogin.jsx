import React, { useState } from "react";
import { supabase } from "../../../lib/supabaseClient.js";
import { Button, Card, Input, Label, LinkButton, Wrap } from "../adminStyles";

export default function AdminLogin({ adminAllowlist, onSession }) {
  const [mode, setMode] = useState("login"); // "login" | "forgot"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

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
    onSession?.(data?.session || null);
  }

  async function sendResetEmail(e) {
    if (e?.preventDefault) e.preventDefault();

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

  return (
    <Wrap>
      <Card>
        <h2 style={{ margin: "0 0 0.35rem" }}>Admin</h2>
        <p style={{ margin: "0 0 1rem", opacity: 0.75 }}>
          {mode === "login"
            ? "Accede con email y contraseña."
            : "Te enviaremos un enlace para restablecer tu contraseña."}
        </p>

        <form
          onSubmit={mode === "login" ? signInWithPassword : sendResetEmail}
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

          {mode === "login" && (
            <Label>
              <span>Contraseña</span>
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                type="password"
              />
            </Label>
          )}

          <Button type="submit" disabled={loading}>
            {loading
              ? mode === "login"
                ? "Entrando..."
                : "Enviando..."
              : mode === "login"
              ? "Entrar"
              : "Enviar enlace"}
          </Button>

          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            {mode === "login" ? (
              <LinkButton
                type="button"
                onClick={() => {
                  setMsg("");
                  setPassword("");
                  setMode("forgot");
                }}
                disabled={loading}
              >
                He olvidado mi contraseña
              </LinkButton>
            ) : (
              <LinkButton
                type="button"
                onClick={() => {
                  setMsg("");
                  setPassword("");
                  setMode("login");
                }}
                disabled={loading}
              >
                Volver a iniciar sesión
              </LinkButton>
            )}
          </div>

          {msg && <p style={{ margin: 0, opacity: 0.85 }}>{msg}</p>}
        </form>
      </Card>
    </Wrap>
  );
}
