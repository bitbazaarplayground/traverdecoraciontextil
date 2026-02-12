import { lazy, Suspense, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";

import AsesoramientoModal from "./components/AsesoramientoModal";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";

import Automatizacion from "./pages/Automatizacion";
import AvisoLegal from "./pages/AvisoLegal";
import ContactPage from "./pages/ContactPage";
import CortinasEstores from "./pages/CortinasEstores";
import HomePage from "./pages/HomePage";
import PoliticaCookies from "./pages/PoliticaCookies";
import PoliticaPrivacidad from "./pages/PoliticaPrivacidad";
import Propuestas from "./pages/Propuestas";
import ToldosProteccionSolar from "./pages/ToldosProteccionSolar";

import AutomatizacionIndividual from "./components/automatizacion/AutomatizacionIndividual";
import AutomatizacionCompleta from "./components/AutomatizacionCompleta";
import Mosquiteras from "./components/ventanas/Mosquiteras";
import PanelJapones from "./components/ventanas/PanelJapones";
import Venecianas from "./components/ventanas/Venecianas";

// ✅ ADMIN (lazy)
const AdminLayout = lazy(() => import("./pages/Admin/AdminLayout"));
const AdminDashboard = lazy(() => import("./pages/Admin/AdminDashboard"));
const AdminBookings = lazy(() => import("./pages/Admin/AdminBookings"));
const AdminCalendar = lazy(() => import("./pages/Admin/AdminCalendar"));
const AdminClients = lazy(() => import("./pages/Admin/AdminClientes"));
const AdminCustomer = lazy(() => import("./pages/Admin/AdminCustomer"));
const AdminSettings = lazy(() => import("./pages/Admin/AdminSettings"));
const AuthCallback = lazy(() => import("./pages/AuthCallback"));
const AdminResetPassword = lazy(() =>
  import("./pages/Admin/AdminResetPassword")
);

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

      <Suspense fallback={null}>
        <Routes>
          <Route
            path="/"
            element={<HomePage onOpenAsesoramiento={openAsesoramiento} />}
          />

          <Route
            path="/propuestas"
            element={<Propuestas onOpenAsesoramiento={openAsesoramiento} />}
          />

          <Route path="/automatizacion" element={<Automatizacion />} />
          <Route
            path="/automatizacion/completa"
            element={<AutomatizacionCompleta />}
          />
          <Route
            path="/automatizacion/individual"
            element={<AutomatizacionIndividual />}
          />

          <Route path="/contact" element={<ContactPage />} />

          <Route path="/panel-japones" element={<PanelJapones />} />
          <Route path="/venecianas" element={<Venecianas />} />
          <Route path="/cortinas-estores" element={<CortinasEstores />} />
          <Route
            path="/toldos-proteccionsolar"
            element={<ToldosProteccionSolar />}
          />
          <Route path="/mosquiteras" element={<Mosquiteras />} />
          <Route path="/services" element={<Propuestas /* or Servicios */ />} />

          <Route path="/aviso-legal" element={<AvisoLegal />} />
          <Route path="/politica-privacidad" element={<PoliticaPrivacidad />} />
          <Route path="/politica-cookies" element={<PoliticaCookies />} />

          {/* AUTH */}
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route
            path="/admin/reset-password"
            element={<AdminResetPassword />}
          />

          {/* ✅ ADMIN (lazy loaded) */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="requests" element={<AdminBookings />} />
            <Route path="calendario" element={<AdminCalendar />} />
            <Route path="clientes" element={<AdminClients />} />
            <Route path="clientes/:customerKey" element={<AdminCustomer />} />
            <Route path="ajustes" element={<AdminSettings />} />
          </Route>
        </Routes>
      </Suspense>

      <AsesoramientoModal
        open={isAsesoramientoOpen}
        packLabel={modalPack}
        onClose={closeAsesoramiento}
      />

      {!isAdminRoute && <Footer />}
    </>
  );
}
