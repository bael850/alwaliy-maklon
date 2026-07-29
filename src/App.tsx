import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Hero from "./components/sections/Hero";
import AboutMaklon from "./components/sections/AboutMaklon";
import TrustBadgeStrip from "./components/sections/TrustBadgeStrip";
import WhyUs from "./components/sections/WhyUs";
import ProductTypes from "./components/sections/ProductTypes";
import Workflow from "./components/sections/Workflow";
import Certifications from "./components/sections/Certifications";
import PullQuote from "./components/sections/PullQuote";
import Faq from "./components/sections/Faq";
import Cta from "./components/sections/Cta";

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <AboutMaklon />
        <TrustBadgeStrip />
        <WhyUs />
        <ProductTypes />
        <Workflow />
        <Certifications />
        <PullQuote />
        <Faq />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
