// src/App.jsx
import { lazy, Suspense, useMemo, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import AutomatizacionCompleta from "./components/automatizacion/AutomatizacionCompleta";
import AutomatizacionIndividual from "./components/automatizacion/AutomatizacionIndividual";
import ScrollToTop from "./components/ScrollToTop";

const Navbar = lazy(() => import("./components/Navbar"));
const Footer = lazy(() => import("./components/Footer"));
const HomePage = lazy(() => import("./pages/HomePage"));
const Propuestas = lazy(() => import("./pages/Propuestas"));
const Automatizacion = lazy(() => import("./pages/Automatizacion"));
const ToldosProteccionSolar = lazy(() =>
  import("./pages/ToldosProteccionSolar")
);
const Mosquiteras = lazy(() => import("./components/ventanas/Mosquiteras"));
const Venecianas = lazy(() => import("./components/ventanas/Venecianas"));

const QuickEnquiryModal = lazy(() =>
  import("./components/contact/QuickEnquiryModal")
);

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

export default function App() {
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [enquiryPack, setEnquiryPack] = useState("General");
  const [enquirySource, setEnquirySource] = useState("cta");

  const { pathname } = useLocation();

  const isAdminRoute = useMemo(
    () => pathname === "/admin" || pathname.startsWith("/admin/"),
    [pathname]
  );

  function onOpenAsesoramiento(packLabel = "General", source = "cta") {
    setEnquiryPack(packLabel);
    setEnquirySource(source);
    setEnquiryOpen(true);
  }

  return (
    <>
      <ScrollToTop />

      {!isAdminRoute && (
        <Suspense fallback={null}>
          <Navbar />
        </Suspense>
      )}

      <Suspense fallback={null}>
        <Routes>
          <Route
            path="/"
            element={<HomePage onOpenAsesoramiento={onOpenAsesoramiento} />}
          />
          <Route
            path="/propuestas"
            element={<Propuestas onOpenAsesoramiento={onOpenAsesoramiento} />}
          />
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
          <Route
            path="/contact"
            element={<ContactPage onOpenAsesoramiento={onOpenAsesoramiento} />}
          />
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
          <Route path="/aviso-legal" element={<AvisoLegal />} />
          <Route path="/politica-privacidad" element={<PoliticaPrivacidad />} />
          <Route path="/politica-cookies" element={<PoliticaCookies />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route
            path="/admin/reset-password"
            element={<AdminResetPassword />}
          />
        </Routes>
      </Suspense>

      {enquiryOpen && (
        <Suspense fallback={null}>
          <QuickEnquiryModal
            open={enquiryOpen}
            onClose={() => setEnquiryOpen(false)}
            packLabel={enquiryPack}
            source={enquirySource}
          />
        </Suspense>
      )}

      {!isAdminRoute && (
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      )}
    </>
  );
}

// // src/App.jsx
// import { lazy, Suspense, useMemo, useState } from "react";
// import { Route, Routes, useLocation } from "react-router-dom";

// import AutomatizacionCompleta from "./components/automatizacion/AutomatizacionCompleta";
// import AutomatizacionIndividual from "./components/automatizacion/AutomatizacionIndividual";

// import Footer from "./components/Footer";
// import Navbar from "./components/Navbar";
// import ScrollToTop from "./components/ScrollToTop";
// import Mosquiteras from "./components/ventanas/Mosquiteras";
// import Venecianas from "./components/ventanas/Venecianas";
// import Automatizacion from "./pages/Automatizacion";
// import HomePage from "./pages/HomePage";
// import Propuestas from "./pages/Propuestas";
// import ToldosProteccionSolar from "./pages/ToldosProteccionSolar";

// const QuickEnquiryModal = lazy(() =>
//   import("./components/contact/QuickEnquiryModal")
// );

// const ContactPage = lazy(() => import("./pages/ContactPage"));
// const CortinasEstores = lazy(() => import("./pages/CortinasEstores"));
// const Servicios = lazy(() => import("./pages/Servicios"));

// const AvisoLegal = lazy(() => import("./pages/AvisoLegal"));
// const PoliticaPrivacidad = lazy(() => import("./pages/PoliticaPrivacidad"));
// const PoliticaCookies = lazy(() => import("./pages/PoliticaCookies"));

// const AuthCallback = lazy(() => import("./pages/AuthCallback"));
// const AdminResetPassword = lazy(() =>
//   import("./pages/Admin/AdminResetPassword")
// );

// const PanelJapones = lazy(() => import("./components/ventanas/PanelJapones"));

// export default function App() {
//   // Form
//   const [enquiryOpen, setEnquiryOpen] = useState(false);
//   const [enquiryPack, setEnquiryPack] = useState("General");
//   const [enquirySource, setEnquirySource] = useState("cta");

//   const { pathname } = useLocation();
//   const isAdminRoute = useMemo(
//     () => pathname === "/admin" || pathname.startsWith("/admin/"),
//     [pathname]
//   );

//   function onOpenAsesoramiento(packLabel = "General", source = "cta") {
//     setEnquiryPack(packLabel);
//     setEnquirySource(source);
//     setEnquiryOpen(true);
//   }
//   return (
//     <>
//       <ScrollToTop />
//       {!isAdminRoute && <Navbar />}

//       {/* ✅ One Suspense boundary for all lazy routes */}
//       <Suspense fallback={null}>
//         <Routes>
//           <Route
//             path="/"
//             element={<HomePage onOpenAsesoramiento={onOpenAsesoramiento} />}
//           />

//           {/* PROPUESTAS */}
//           <Route
//             path="/propuestas"
//             element={<Propuestas onOpenAsesoramiento={onOpenAsesoramiento} />}
//           />

//           {/* AUTOMATIZACION */}
//           <Route
//             path="/automatizacion"
//             element={
//               <Automatizacion onOpenAsesoramiento={onOpenAsesoramiento} />
//             }
//           />
//           <Route
//             path="/automatizacion/completa"
//             element={
//               <AutomatizacionCompleta
//                 onOpenAsesoramiento={onOpenAsesoramiento}
//               />
//             }
//           />
//           <Route
//             path="/automatizacion/individual"
//             element={
//               <AutomatizacionIndividual
//                 onOpenAsesoramiento={onOpenAsesoramiento}
//               />
//             }
//           />

//           {/* CONTACTO */}
//           <Route
//             path="/contact"
//             element={<ContactPage onOpenAsesoramiento={onOpenAsesoramiento} />}
//           />

//           {/* SERVICIOS / CATEGORIAS */}
//           <Route
//             path="/panel-japones"
//             element={<PanelJapones onOpenAsesoramiento={onOpenAsesoramiento} />}
//           />
//           <Route
//             path="/venecianas"
//             element={<Venecianas onOpenAsesoramiento={onOpenAsesoramiento} />}
//           />
//           <Route
//             path="/cortinas-estores"
//             element={
//               <CortinasEstores onOpenAsesoramiento={onOpenAsesoramiento} />
//             }
//           />
//           <Route
//             path="/toldos-proteccion-solar"
//             element={
//               <ToldosProteccionSolar
//                 onOpenAsesoramiento={onOpenAsesoramiento}
//               />
//             }
//           />
//           <Route
//             path="/mosquiteras"
//             element={<Mosquiteras onOpenAsesoramiento={onOpenAsesoramiento} />}
//           />
//           <Route
//             path="/services"
//             element={<Servicios onOpenAsesoramiento={onOpenAsesoramiento} />}
//           />

//           {/* LEGALES */}
//           <Route path="/aviso-legal" element={<AvisoLegal />} />
//           <Route path="/politica-privacidad" element={<PoliticaPrivacidad />} />
//           <Route path="/politica-cookies" element={<PoliticaCookies />} />

//           {/* AUTH */}
//           <Route path="/auth/callback" element={<AuthCallback />} />
//           <Route
//             path="/admin/reset-password"
//             element={<AdminResetPassword />}
//           />
//         </Routes>
//       </Suspense>

//       {/* ✅ Modal only loads when needed */}
//       {/* {isAsesoramientoOpen && (
//         <Suspense fallback={null}>
//           <AsesoramientoModal
//             open={isAsesoramientoOpen}
//             packLabel={modalPack}
//             onClose={closeAsesoramiento}
//           />
//         </Suspense>
//       )} */}
//       {enquiryOpen && (
//         <Suspense fallback={null}>
//           <QuickEnquiryModal
//             open={enquiryOpen}
//             onClose={() => setEnquiryOpen(false)}
//             packLabel={enquiryPack}
//             source={enquirySource}
//           />
//         </Suspense>
//       )}

//       {!isAdminRoute && <Footer />}
//     </>
//   );
// }
