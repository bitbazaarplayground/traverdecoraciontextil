import { Route, Routes } from "react-router-dom";
import "./App.css";

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

function App() {
  return (
    <>
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
              <Footer />
            </>
          }
        />

        {/* CONTACT PAGE */}

        <Route path="/contact" element={<ContactPage />} />
        <Route path="/automatizacion" element={<Automatizacion />} />
        <Route path="/cortinas-estores" element={<CortinasEstores />} />
      </Routes>
    </>
  );
}

export default App;

{
  /* <Route path="/automatizacion" element={<AutomatizacionHotspots />} /> */
}
