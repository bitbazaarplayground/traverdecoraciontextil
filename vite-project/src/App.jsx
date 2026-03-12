// src/App.jsx
import { lazy, Suspense, useMemo, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import AutomatizacionCompleta from "./components/automatizacion/AutomatizacionCompleta";
import AutomatizacionIndividual from "./components/automatizacion/AutomatizacionIndividual";
import NetlifyFormsRegistry from "./components/contact/NetlifyFormsRegistry";
import QuickEnquiryModal from "./components/contact/QuickEnquiryModal";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import Mosquiteras from "./components/ventanas/Mosquiteras";
import Venecianas from "./components/ventanas/Venecianas";
import Automatizacion from "./pages/Automatizacion";
import HomePage from "./pages/HomePage";
import Propuestas from "./pages/Propuestas";
import ToldosProteccionSolar from "./pages/ToldosProteccionSolar";
// ✅ Lazy load modal (only when opened)
// const AsesoramientoModal = lazy(() =>
//   import("./components/AsesoramientoModalSupabase")
// );

// ✅ Public pages (lazy)

const ContactPage = lazy(() => import("./pages/ContactPage"));
const CortinasEstores = lazy(() => import("./pages/CortinasEstores"));
const Servicios = lazy(() => import("./pages/Servicios"));

const AvisoLegal = lazy(() => import("./pages/AvisoLegal"));
const PoliticaPrivacidad = lazy(() => import("./pages/PoliticaPrivacidad"));
const PoliticaCookies = lazy(() => import("./pages/PoliticaCookies"));

const AuthCallback = lazy(() => import("./pages/AuthCallback"));
const AdminResetPassword = lazy(() =>
  import("./pages/Admin/AdminResetPassword")
);

const PanelJapones = lazy(() => import("./components/ventanas/PanelJapones"));

// ✅ ADMIN (lazy) — this is where Supabase weight gets removed from main bundle
// const AdminLayout = lazy(() => import("./pages/Admin/AdminLayout"));
// const AdminDashboard = lazy(() => import("./pages/Admin/AdminDashboard"));
// const AdminBookings = lazy(() => import("./pages/Admin/AdminBookings"));
// const AdminCalendar = lazy(() => import("./pages/Admin/AdminCalendar"));
// const AdminClients = lazy(() => import("./pages/Admin/AdminClientes"));
// const AdminCustomer = lazy(() => import("./pages/Admin/AdminCustomer"));
// const AdminSettings = lazy(() => import("./pages/Admin/AdminSettings"));

export default function App() {
  // const [isAsesoramientoOpen, setIsAsesoramientoOpen] = useState(false);
  // const [modalPack, setModalPack] = useState(null);
  // Form
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [enquiryPack, setEnquiryPack] = useState("General");
  const [enquirySource, setEnquirySource] = useState("cta");

  const { pathname } = useLocation();
  const isAdminRoute = useMemo(
    () => pathname === "/admin" || pathname.startsWith("/admin/"),
    [pathname]
  );

  // const openAsesoramiento = (pack = "General") => {
  //   setModalPack(pack);
  //   setIsAsesoramientoOpen(true);
  // };

  // const closeAsesoramiento = () => {
  //   setIsAsesoramientoOpen(false);
  //   setModalPack(null);
  // };
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
          <Route
            path="/automatizacion"
            element={
              <Automatizacion onOpenAsesoramiento={onOpenAsesoramiento} />
            }
          />
          <Route
            path="/automatizacion/completa"
            element={
              <AutomatizacionCompleta
                onOpenAsesoramiento={onOpenAsesoramiento}
              />
            }
          />
          <Route
            path="/automatizacion/individual"
            element={
              <AutomatizacionIndividual
                onOpenAsesoramiento={onOpenAsesoramiento}
              />
            }
          />

          {/* CONTACTO */}
          <Route
            path="/contact"
            element={<ContactPage onOpenAsesoramiento={onOpenAsesoramiento} />}
          />

          {/* SERVICIOS / CATEGORIAS */}
          <Route
            path="/panel-japones"
            element={<PanelJapones onOpenAsesoramiento={onOpenAsesoramiento} />}
          />
          <Route
            path="/venecianas"
            element={<Venecianas onOpenAsesoramiento={onOpenAsesoramiento} />}
          />
          <Route
            path="/cortinas-estores"
            element={
              <CortinasEstores onOpenAsesoramiento={onOpenAsesoramiento} />
            }
          />
          <Route
            path="/toldos-proteccion-solar"
            element={
              <ToldosProteccionSolar
                onOpenAsesoramiento={onOpenAsesoramiento}
              />
            }
          />
          <Route
            path="/mosquiteras"
            element={<Mosquiteras onOpenAsesoramiento={onOpenAsesoramiento} />}
          />
          <Route
            path="/services"
            element={<Servicios onOpenAsesoramiento={onOpenAsesoramiento} />}
          />

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
