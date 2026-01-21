import React, { useMemo, useState } from "react";
import { Button, Card, Input, Table } from "../adminStyles";
import { formatLocal } from "../utils";

export default function BookingsList({
  bookings,
  loading,
  onRefresh,
  selectedCustomer,
  onSelectCustomer,
}) {
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState("upcoming"); // upcoming | today | past | all

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
  }, [bookings, query, tab]);

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
                    <strong>{bk.pack}</strong>
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
