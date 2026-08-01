import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FloatingWhatsApp from "./components/FloatingWhatsApp";
import Hero from "./components/sections/Hero";
import AboutMaklon from "./components/sections/AboutMaklon";
import Certifications from "./components/sections/Certifications";
import ProductTypes from "./components/sections/ProductTypes";
import MaklonComparison from "./components/sections/MaklonComparison";
import FacilityGallery from "./components/sections/FacilityGallery";
import ClientTrust from "./components/sections/ClientTrust";
import WhyUs from "./components/sections/WhyUs";
import Workflow from "./components/sections/Workflow";
import PullQuote from "./components/sections/PullQuote";
import Faq from "./components/sections/Faq";
import Cta from "./components/sections/Cta";

export default function App() {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Lewati ke konten utama
      </a>
      <Navbar />
      <main id="main-content">
        <Hero />
        <AboutMaklon />
        <Certifications />
        <ProductTypes />
        <MaklonComparison />
        <FacilityGallery />
        <ClientTrust />
        <WhyUs />
        <Workflow />
        <PullQuote />
        <Faq />
        <Cta />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
