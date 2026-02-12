// src/pages/Admin/AdminApp.jsx
import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import AdminLayout from "./AdminLayout";

// Lazy admin pages
const AdminDashboard = lazy(() => import("./AdminDashboard"));
const AdminBookings = lazy(() => import("./AdminBookings"));
const AdminCalendar = lazy(() => import("./AdminCalendar"));
const AdminClients = lazy(() => import("./AdminClientes"));
const AdminCustomer = lazy(() => import("./AdminCustomer"));
const AdminSettings = lazy(() => import("./AdminSettings"));

export default function AdminApp() {
  return (
    <Suspense fallback={null}>
      <Routes>
        <Route path="/" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="requests" element={<AdminBookings />} />
          <Route path="calendario" element={<AdminCalendar />} />
          <Route path="clientes" element={<AdminClients />} />
          <Route path="clientes/:customerKey" element={<AdminCustomer />} />
          <Route path="ajustes" element={<AdminSettings />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
