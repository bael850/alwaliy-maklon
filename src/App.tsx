import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Hero from "./components/components/sections/Hero";
import AboutMaklon from "./components/components/sections/AboutMaklon";
import WhyUs from "./components/components/sections/WhyUs";
import ProductTypes from "./components/components/sections/ProductTypes";
import Workflow from "./components/components/sections/Workflow";
import Certifications from "./components/components/sections/Certifications";
import Faq from "./components/components/sections/Faq";
import Cta from "./components/components/sections/Cta";

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
