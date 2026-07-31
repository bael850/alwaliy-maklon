import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FloatingWhatsApp from "./components/FloatingWhatsApp";
import Hero from "./components/sections/Hero";
import AboutMaklon from "./components/sections/AboutMaklon";
import StatsSection from "./components/sections/StatsSection";
import Certifications from "./components/sections/Certifications";
import CertificateViewer from "./components/sections/CertificateViewer";
import FacilityGallery from "./components/sections/FacilityGallery";
import ClientLogos from "./components/sections/ClientLogos";
import Testimonials from "./components/sections/Testimonials";
import TrustBadgeStrip from "./components/sections/TrustBadgeStrip";
import WhyUs from "./components/sections/WhyUs";
import ProductTypes from "./components/sections/ProductTypes";
import MaklonComparison from "./components/sections/MaklonComparison";
import Workflow from "./components/sections/Workflow";
import CaseStudies from "./components/sections/CaseStudies";
import PullQuote from "./components/sections/PullQuote";
import Faq from "./components/sections/Faq";
import CompanyProfileDownload from "./components/sections/CompanyProfileDownload";
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
        <StatsSection />
        <Certifications />
        <CertificateViewer />
        <FacilityGallery />
        <ClientLogos />
        <Testimonials />
        <TrustBadgeStrip />
        <WhyUs />
        <ProductTypes />
        <MaklonComparison />
        <Workflow />
        <CaseStudies />
        <PullQuote />
        <Faq />
        <CompanyProfileDownload />
        <Cta />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
