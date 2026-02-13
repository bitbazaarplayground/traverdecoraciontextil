import { lazy, Suspense, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";

import AsesoramientoModal from "./components/AsesoramientoModal";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";

// ✅ PUBLIC ROUTES (lazy)
const HomePage = lazy(() => import("./pages/HomePage"));
const Propuestas = lazy(() => import("./pages/Propuestas"));
const Automatizacion = lazy(() => import("./pages/Automatizacion"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const CortinasEstores = lazy(() => import("./pages/CortinasEstores"));
const ToldosProteccionSolar = lazy(() =>
  import("./pages/ToldosProteccionSolar")
);
const AvisoLegal = lazy(() => import("./pages/AvisoLegal"));
const PoliticaPrivacidad = lazy(() => import("./pages/PoliticaPrivacidad"));
const PoliticaCookies = lazy(() => import("./pages/PoliticaCookies"));

// ✅ “Ventanas” (lazy)
const Mosquiteras = lazy(() => import("./components/ventanas/Mosquiteras"));
const PanelJapones = lazy(() => import("./components/ventanas/PanelJapones"));
const Venecianas = lazy(() => import("./components/ventanas/Venecianas"));

// ✅ Automatización subroutes (lazy)
const AutomatizacionCompleta = lazy(() =>
  import("./components/AutomatizacionCompleta")
);
const AutomatizacionIndividual = lazy(() =>
  import("./components/automatizacion/AutomatizacionIndividual")
);

// ✅ AUTH (lazy)
const AuthCallback = lazy(() => import("./pages/AuthCallback"));
const AdminResetPassword = lazy(() =>
  import("./pages/Admin/AdminResetPassword")
);

// ✅ ADMIN (lazy)
const AdminLayout = lazy(() => import("./pages/Admin/AdminLayout"));
const AdminDashboard = lazy(() => import("./pages/Admin/AdminDashboard"));
const AdminBookings = lazy(() => import("./pages/Admin/AdminBookings"));
const AdminCalendar = lazy(() => import("./pages/Admin/AdminCalendar"));
const AdminClients = lazy(() => import("./pages/Admin/AdminClientes"));
const AdminCustomer = lazy(() => import("./pages/Admin/AdminCustomer"));
const AdminSettings = lazy(() => import("./pages/Admin/AdminSettings"));

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

          {/* LEGALES */}
          <Route path="/aviso-legal" element={<AvisoLegal />} />
          <Route path="/politica-privacidad" element={<PoliticaPrivacidad />} />
          <Route path="/politica-cookies" element={<PoliticaCookies />} />

          {/* AUTH */}
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route
            path="/admin/reset-password"
            element={<AdminResetPassword />}
          />

          {/* ADMIN */}
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
