import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Hero from "./components/sections/Hero";
import AboutMaklon from "./components/sections/AboutMaklon";
import Certifications from "./components/sections/Certifications";
import TrustBadgeStrip from "./components/sections/TrustBadgeStrip";
import WhyUs from "./components/sections/WhyUs";
import ProductTypes from "./components/sections/ProductTypes";
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
        <TrustBadgeStrip />
        <WhyUs />
        <ProductTypes />
        <Workflow />
        <PullQuote />
        <Faq />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
