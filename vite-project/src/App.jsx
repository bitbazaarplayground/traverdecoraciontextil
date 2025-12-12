import { Route, Routes } from "react-router-dom";
import "./App.css";

import BrandLogos from "./components/BrandLogos";
import ContactCTA from "./components/ContactCTA";
import GalleryCarousel from "./components/GalleryCarousel";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import ServicesSection from "./components/ServicesSection";
import WhyChooseUs from "./components/WhyChooseUs";
import ContactPage from "./pages/ContactPage";

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
              <WhyChooseUs />
              <ContactCTA />
              <GalleryCarousel />
              <BrandLogos />
            </>
          }
        />

        {/* CONTACT PAGE */}

        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </>
  );
}

export default App;
