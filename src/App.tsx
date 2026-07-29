import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Hero from "./components/sections/Hero";
import AboutMaklon from "./components/sections/AboutMaklon";
import WhyUs from "./components/sections/WhyUs";
import ProductTypes from "./components/sections/ProductTypes";
import Workflow from "./components/sections/Workflow";
import Certifications from "./components/sections/Certifications";
import Faq from "./components/sections/Faq";
import Cta from "./components/sections/Cta";

export default function App() {
  return (
    <div className="min-h-screen bg-forest">
      <Navbar />
      <main>
        <Hero />
        <AboutMaklon />
        <WhyUs />
        <ProductTypes />
        <Workflow />
        <Certifications />
        <Faq />
        <Cta />
      </main>
      <Footer />
    </div>
  );
}
