import { useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import AsesoramientoModal from "./components/AsesoramientoModal";
import AutomatizacionCompleta from "./components/AutomatizacionCompleta";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import AutomatizacionIndividual from "./components/automatizacion/AutomatizacionIndividual";
import Mosquiteras from "./components/ventanas/Mosquiteras";
import PanelJapones from "./components/ventanas/PanelJapones";
import Venecianas from "./components/ventanas/Venecianas";
import AdminBookings from "./pages/Admin/AdminBookings";
import AdminCalendar from "./pages/Admin/AdminCalendar";
import AdminClients from "./pages/Admin/AdminClientes";
import AdminCustomer from "./pages/Admin/AdminCustomer";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminLayout from "./pages/Admin/AdminLayout";
import AdminResetPassword from "./pages/Admin/AdminResetPassword";
import AdminSettings from "./pages/Admin/AdminSettings";
import AuthCallback from "./pages/AuthCallback";
import Automatizacion from "./pages/Automatizacion";
import ContactPage from "./pages/ContactPage";
import CortinasEstores from "./pages/CortinasEstores";
import HomePage from "./pages/HomePage";
import Propuestas from "./pages/Propuestas";
import Servicios from "./pages/Servicios";
import ToldosProteccionSolar from "./pages/ToldosProteccionSolar";

export default function App() {
  const [isAsesoramientoOpen, setIsAsesoramientoOpen] = useState(false);
  const [modalPack, setModalPack] = useState(null);

  const { pathname } = useLocation();
  const isAdminRoute = pathname === "/admin" || pathname.startsWith("/admin/");

  const openAsesoramiento = (pack = "General") => {
    setModalPack(pack);
    setIsAsesoramientoOpen(true);
  };

  const closeAsesoramiento = () => {
    setIsAsesoramientoOpen(false);
    setModalPack(null);
  };

  return (
    <>
      <ScrollToTop />
      {!isAdminRoute && <Navbar />}

      <Routes>
        <Route
          path="/"
          element={<HomePage onOpenAsesoramiento={openAsesoramiento} />}
        />

        {/* PROPUESTAS */}
        <Route
          path="/propuestas"
          element={<Propuestas onOpenAsesoramiento={openAsesoramiento} />}
        />

        {/* AUTOMATIZACION */}
        <Route path="/automatizacion" element={<Automatizacion />} />
        <Route
          path="/automatizacion/completa"
          element={<AutomatizacionCompleta />}
        />
        <Route
          path="/automatizacion/individual"
          element={<AutomatizacionIndividual />}
        />

        {/* CONTACTO */}
        <Route path="/contact" element={<ContactPage />} />

        {/* SERVICIOS / CATEGORIAS */}
        <Route path="/panel-japones" element={<PanelJapones />} />
        <Route path="/venecianas" element={<Venecianas />} />
        <Route path="/cortinas-estores" element={<CortinasEstores />} />
        <Route
          path="/toldos-proteccionsolar"
          element={<ToldosProteccionSolar />}
        />
        <Route path="/mosquiteras" element={<Mosquiteras />} />
        <Route path="/services" element={<Servicios />} />

        {/* ADMIN */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="requests" element={<AdminBookings />} />
          <Route path="calendario" element={<AdminCalendar />} />
          <Route path="clientes" element={<AdminClients />} />
          <Route path="clientes/:customerKey" element={<AdminCustomer />} />

          <Route path="ajustes" element={<AdminSettings />} />
        </Route>

        {/* AUTH */}
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="/admin/reset-password" element={<AdminResetPassword />} />
      </Routes>

      {/* ✅ Global modal (outside Routes) */}
      <AsesoramientoModal
        open={isAsesoramientoOpen}
        packLabel={modalPack}
        onClose={closeAsesoramiento}
      />

      {!isAdminRoute && <Footer />}
    </>
  );
}
