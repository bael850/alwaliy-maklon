import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FloatingWhatsApp from "./components/FloatingWhatsApp";
import Hero from "./components/sections/Hero";
import WhoWeAre from "./components/sections/WhoWeAre";
import Journey from "./components/sections/Journey";
import Certifications from "./components/sections/Certifications";
import WhatWeDo from "./components/sections/WhatWeDo";
import ProductTypes from "./components/sections/ProductTypes";
import FacilityGallery from "./components/sections/FacilityGallery";
import ClientTrust from "./components/sections/ClientTrust";
import WhyUs from "./components/sections/WhyUs";
import Workflow from "./components/sections/Workflow";
import PullQuote from "./components/sections/PullQuote";
import Faq from "./components/sections/Faq";
import Cta from "./components/sections/Cta";
import CompanyProfileDownload from "./components/sections/CompanyProfileDownload";
import VisionMission from "./components/sections/VisionMission";
import Team from "./components/sections/Team";
import BeyondOffice from "./components/sections/BeyondOffice";
import { isOn } from "./lib/content-status";
import { LanguageProvider, useLanguage } from "./i18n/LanguageContext";

function AppContent() {
  const { t } = useLanguage();
  const certsVisible =
    isOn("certBpom") ||
    isOn("certCpotb") ||
    isOn("certLegal") ||
    isOn("certHalal");
  const clientsVisible = isOn("testimonials") || isOn("partnerLogos");

  return (
    <>
      <a href="#main-content" className="skip-link">
        {t.common.skipToContent}
      </a>
      <Navbar />
      <main id="main-content">
        <Hero />
        {isOn("whoWeAre") && <WhoWeAre />}
        {isOn("journeyYears") && <Journey />}
        {isOn("whyUs") && <WhyUs />}
        {certsVisible && <Certifications />}
        {isOn("visionMission") && <VisionMission />}
        {isOn("works") && <WhatWeDo />}
        {isOn("productTypes") && <ProductTypes />}
        {isOn("workflow") && <Workflow />}
        {clientsVisible && <ClientTrust />}
        {isOn("team") && <Team />}
        {isOn("facilityGallery") && <FacilityGallery />}
        {isOn("beyondOffice") && <BeyondOffice />}
        <PullQuote />
        {isOn("faq") && <Faq />}
        {isOn("companyProfile") && <CompanyProfileDownload />}
        {isOn("cta") && <Cta />}
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
