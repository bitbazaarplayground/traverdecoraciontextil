import React, { useMemo, useState } from "react";
import { Button, Card, Input, Table } from "../adminStyles";
import { formatLocal } from "../utils";

function statusLabel(s) {
  return (
    {
      nuevo: "Nuevo",
      presupuesto: "Presupuesto",
      en_proceso: "En proceso",
      finalizado: "Finalizado",
      no_interesado: "No interesado",
    }[s] ||
    s ||
    "—"
  );
}

export default function BookingsList({
  bookings,
  loading,
  onRefresh,
  selectedCustomer,
  onSelectCustomer,
}) {
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState("upcoming"); // upcoming | today | past | all
  const [statusFilter, setStatusFilter] = useState("todos");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const now = new Date();

    function matches(bk) {
      if (!q) return true;
      const hay = [bk.customer_name, bk.phone, bk.email, bk.city, bk.pack]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return hay.includes(q);
    }

    function isToday(iso) {
      const d = new Date(iso);
      return (
        d.getFullYear() === now.getFullYear() &&
        d.getMonth() === now.getMonth() &&
        d.getDate() === now.getDate()
      );
    }

    return (bookings || [])
      .filter(matches)
      .filter((bk) =>
        statusFilter === "todos" ? true : bk.status_admin === statusFilter
      )
      .filter((bk) => {
        const start = new Date(bk.start_time);
        const end = new Date(bk.end_time);

        if (tab === "all") return true;
        if (tab === "today") return isToday(bk.start_time);
        if (tab === "upcoming") return start > now;
        if (tab === "past") return end < now;
        return true;
      })
      .sort((a, b) => new Date(a.start_time) - new Date(b.start_time));
  }, [bookings, query, tab, statusFilter]);

  return (
    <Card>
      <div style={{ display: "grid", gap: "0.75rem" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "0.75rem",
            flexWrap: "wrap",
          }}
        >
          <div>
            <h2 style={{ margin: 0 }}>Reservas</h2>
            <div style={{ opacity: 0.7, marginTop: 4 }}>
              {filtered.length} resultados
            </div>
          </div>

          <Button onClick={onRefresh} disabled={loading}>
            {loading ? "Cargando..." : "Actualizar"}
          </Button>
        </div>

        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar por nombre, teléfono, ciudad, pack..."
        />

        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          {[
            ["upcoming", "Próximas"],
            ["today", "Hoy"],
            ["past", "Pasadas"],
            ["all", "Todas"],
          ].map(([k, label]) => (
            <Button
              key={k}
              type="button"
              onClick={() => setTab(k)}
              style={{
                background: tab === k ? "#e9e9e9" : undefined,
              }}
            >
              {label}
            </Button>
          ))}
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{
            padding: "0.6rem 0.75rem",
            borderRadius: 12,
            border: "1px solid rgba(17,17,17,0.12)",
            background: "rgba(17,17,17,0.02)",
            fontWeight: 800,
            maxWidth: 260,
          }}
        >
          <option value="todos">Todos los estados</option>
          <option value="nuevo">Nuevo</option>
          <option value="presupuesto">Presupuesto</option>
          <option value="en_proceso">En proceso</option>
          <option value="finalizado">Finalizado</option>
          <option value="no_interesado">No interesado</option>
        </select>

        <Table>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Cliente</th>
              <th>Pack</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((bk) => {
              const isSelected = selectedCustomer?.id === bk.id;

              return (
                <tr
                  key={bk.id}
                  onClick={() => onSelectCustomer(bk)}
                  style={{
                    cursor: "pointer",
                    background: isSelected ? "rgba(0,0,0,0.03)" : "transparent",
                  }}
                >
                  <td>
                    <strong>{formatLocal(bk.start_time)}</strong>
                    <div style={{ opacity: 0.7 }}>
                      {formatLocal(bk.end_time)}
                    </div>
                  </td>
                  <td>
                    <div style={{ fontWeight: 900 }}>{bk.customer_name}</div>
                    <div style={{ opacity: 0.75 }}>{bk.phone}</div>
                    {bk.city && <div style={{ opacity: 0.75 }}>{bk.city}</div>}
                  </td>
                  <td>
                    <div
                      style={{
                        display: "flex",
                        gap: "0.5rem",
                        alignItems: "center",
                        flexWrap: "wrap",
                      }}
                    >
                      <strong>{bk.pack}</strong>

                      <span
                        style={{
                          padding: "0.2rem 0.45rem",
                          borderRadius: 999,
                          fontSize: "0.7rem",
                          fontWeight: 800,
                          background:
                            bk.status_admin === "finalizado"
                              ? "#e6f7ea"
                              : bk.status_admin === "presupuesto"
                              ? "#fff4e5"
                              : "#eef2ff",
                        }}
                      >
                        {statusLabel(bk.status_admin)}
                      </span>
                    </div>

                    <div style={{ opacity: 0.75 }}>{bk.status}</div>
                  </td>
                </tr>
              );
            })}

            {filtered.length === 0 && (
              <tr>
                <td colSpan="3" style={{ opacity: 0.7 }}>
                  No hay reservas que coincidan.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </Card>
  );
}
