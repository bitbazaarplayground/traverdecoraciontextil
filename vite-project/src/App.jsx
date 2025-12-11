import "./App.css";
import ContactCTA from "./components/ContactCTA";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import ServicesSection from "./components/ServicesSection";
import WhyChooseUs from "./components/WhyChooseUs";

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <ServicesSection />
      <WhyChooseUs />
      <ContactCTA />
    </>
  );
}

export default App;
