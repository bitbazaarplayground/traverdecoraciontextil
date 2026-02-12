// src/App.jsx
import { lazy, Suspense, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";

import AsesoramientoModal from "./components/AsesoramientoModal";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";

// Pages (lazy)
const HomePage = lazy(() => import("./pages/HomePage"));
const Propuestas = lazy(() => import("./pages/Propuestas"));
const Automatizacion = lazy(() => import("./pages/Automatizacion"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const CortinasEstores = lazy(() => import("./pages/CortinasEstores"));
const ToldosProteccionSolar = lazy(() =>
  import("./pages/ToldosProteccionSolar")
);
const Servicios = lazy(() => import("./pages/Servicios"));
const AvisoLegal = lazy(() => import("./pages/AvisoLegal"));
const PoliticaPrivacidad = lazy(() => import("./pages/PoliticaPrivacidad"));
const PoliticaCookies = lazy(() => import("./pages/PoliticaCookies"));
const AuthCallback = lazy(() => import("./pages/AuthCallback"));
const AdminResetPassword = lazy(() =>
  import("./pages/Admin/AdminResetPassword")
);

// Components/pages used by routes (lazy)
const AutomatizacionCompleta = lazy(() =>
  import("./components/AutomatizacionCompleta")
);
const AutomatizacionIndividual = lazy(() =>
  import("./components/automatizacion/AutomatizacionIndividual")
);

// Ventanas (lazy)
const Mosquiteras = lazy(() => import("./components/ventanas/Mosquiteras"));
const PanelJapones = lazy(() => import("./components/ventanas/PanelJapones"));
const Venecianas = lazy(() => import("./components/ventanas/Venecianas"));

// ✅ Admin area as ONE lazy-loaded app
const AdminApp = lazy(() => import("./pages/Admin/AdminApp"));

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

          {/* Servicios / categorías */}
          <Route path="/panel-japones" element={<PanelJapones />} />
          <Route path="/venecianas" element={<Venecianas />} />
          <Route path="/cortinas-estores" element={<CortinasEstores />} />
          <Route
            path="/toldos-proteccionsolar"
            element={<ToldosProteccionSolar />}
          />
          <Route path="/mosquiteras" element={<Mosquiteras />} />
          <Route path="/services" element={<Servicios />} />

          {/* Legales */}
          <Route path="/aviso-legal" element={<AvisoLegal />} />
          <Route path="/politica-privacidad" element={<PoliticaPrivacidad />} />
          <Route path="/politica-cookies" element={<PoliticaCookies />} />

          {/* Auth */}
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route
            path="/admin/reset-password"
            element={<AdminResetPassword />}
          />

          {/* ✅ Admin (everything inside AdminApp, chunked away from homepage) */}
          <Route path="/admin/*" element={<AdminApp />} />
        </Routes>
      </Suspense>

      {/* Global modal */}
      <AsesoramientoModal
        open={isAsesoramientoOpen}
        packLabel={modalPack}
        onClose={closeAsesoramiento}
      />

      {!isAdminRoute && <Footer />}
    </>
  );
}
