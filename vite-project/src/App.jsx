import { Route, Routes } from "react-router-dom";
import "./App.css";
import ScrollToTop from "./components/ScrollToTop";

import BrandLogos from "./components/BrandLogos";
import ContactCTA from "./components/ContactCTA";
import Footer from "./components/Footer";
import GalleryCarousel from "./components/GalleryCarousel";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Process from "./components/Process";
import ServicesSection from "./components/ServicesSection";
import Automatizacion from "./pages/Automatizacion";
import ContactPage from "./pages/ContactPage";
import CortinasEstores from "./pages/CortinasEstores";
import Propuestas from "./pages/Propuestas";
import Servicios from "./pages/Servicios";
import ToldosProteccionSolar from "./pages/ToldosProteccionSolar";

function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />

      <Routes>
        {/* HOME PAGE */}
        <Route
          path="/"
          element={
            <>
              <Hero />
              <ServicesSection />
              <Process />
              <ContactCTA />
              <GalleryCarousel />
              <BrandLogos />
            </>
          }
        />

        {/* CONTACT PAGE */}

        <Route path="/contact" element={<ContactPage />} />
        <Route path="/propuestas" element={<Propuestas />} />

        <Route path="/automatizacion" element={<Automatizacion />} />
        <Route path="/cortinas-estores" element={<CortinasEstores />} />
        <Route
          path="/toldos-proteccionsolar"
          element={<ToldosProteccionSolar />}
        />
        <Route path="/services" element={<Servicios />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
