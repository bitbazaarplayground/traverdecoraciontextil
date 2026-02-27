// src/App.jsx
import { lazy, Suspense, useMemo, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import NetlifyFormsRegistry from "./components/contact/NetlifyFormsRegistry";
import QuickEnquiryModal from "./components/contact/QuickEnquiryModal";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import HomePage from "./pages/HomePage";

// ✅ Lazy load modal (only when opened)
const AsesoramientoModal = lazy(() =>
  import("./components/AsesoramientoModalSupabase")
);

// ✅ Public pages (lazy)
const Propuestas = lazy(() => import("./pages/Propuestas"));
const Automatizacion = lazy(() => import("./pages/Automatizacion"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const CortinasEstores = lazy(() => import("./pages/CortinasEstores"));
const Servicios = lazy(() => import("./pages/Servicios"));
const ToldosProteccionSolar = lazy(() =>
  import("./pages/ToldosProteccionSolar")
);

const AvisoLegal = lazy(() => import("./pages/AvisoLegal"));
const PoliticaPrivacidad = lazy(() => import("./pages/PoliticaPrivacidad"));
const PoliticaCookies = lazy(() => import("./pages/PoliticaCookies"));

const AuthCallback = lazy(() => import("./pages/AuthCallback"));
const AdminResetPassword = lazy(() =>
  import("./pages/Admin/AdminResetPassword")
);

// ✅ Components used as routes (lazy)
const AutomatizacionCompleta = lazy(() =>
  import("./components/AutomatizacionCompleta")
);
const AutomatizacionIndividual = lazy(() =>
  import("./components/automatizacion/AutomatizacionIndividual")
);

const PanelJapones = lazy(() => import("./components/ventanas/PanelJapones"));
const Venecianas = lazy(() => import("./components/ventanas/Venecianas"));
const Mosquiteras = lazy(() => import("./components/ventanas/Mosquiteras"));

// ✅ ADMIN (lazy) — this is where Supabase weight gets removed from main bundle
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
  // Form
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [enquiryPack, setEnquiryPack] = useState("General");
  const [enquirySource, setEnquirySource] = useState("cta");

  const { pathname } = useLocation();
  const isAdminRoute = useMemo(
    () => pathname === "/admin" || pathname.startsWith("/admin/"),
    [pathname]
  );

  const openAsesoramiento = (pack = "General") => {
    setModalPack(pack);
    setIsAsesoramientoOpen(true);
  };

  const closeAsesoramiento = () => {
    setIsAsesoramientoOpen(false);
    setModalPack(null);
  };
  function onOpenAsesoramiento(packLabel = "General", source = "cta") {
    setEnquiryPack(packLabel);
    setEnquirySource(source);
    setEnquiryOpen(true);
  }
  return (
    <>
      <ScrollToTop />
      {!isAdminRoute && <Navbar />}
      <NetlifyFormsRegistry />
      {/* ✅ One Suspense boundary for all lazy routes */}
      <Suspense fallback={null}>
        <Routes>
          <Route
            path="/"
            element={<HomePage onOpenAsesoramiento={onOpenAsesoramiento} />}
          />

          {/* PROPUESTAS */}
          <Route
            path="/propuestas"
            element={<Propuestas onOpenAsesoramiento={onOpenAsesoramiento} />}
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

          {/* LEGALES */}
          <Route path="/aviso-legal" element={<AvisoLegal />} />
          <Route path="/politica-privacidad" element={<PoliticaPrivacidad />} />
          <Route path="/politica-cookies" element={<PoliticaCookies />} />

          {/* ADMIN */}
          {/* <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="requests" element={<AdminBookings />} />
            <Route path="calendario" element={<AdminCalendar />} />
            <Route path="clientes" element={<AdminClients />} />
            <Route path="clientes/:customerKey" element={<AdminCustomer />} />
            <Route path="ajustes" element={<AdminSettings />} />
          </Route> */}

          {/* AUTH */}
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route
            path="/admin/reset-password"
            element={<AdminResetPassword />}
          />
        </Routes>
      </Suspense>

      {/* ✅ Modal only loads when needed */}
      {/* {isAsesoramientoOpen && (
        <Suspense fallback={null}>
          <AsesoramientoModal
            open={isAsesoramientoOpen}
            packLabel={modalPack}
            onClose={closeAsesoramiento}
          />
        </Suspense>
      )} */}
      <QuickEnquiryModal
        open={enquiryOpen}
        onClose={() => setEnquiryOpen(false)}
        packLabel={enquiryPack}
        source={enquirySource}
      />
      {!isAdminRoute && <Footer />}
    </>
  );
}
