import { useSmoothScroll } from '@/lib/lenis'
import { Navbar } from '@/components/sections/Navbar'
import { Hero } from '@/components/sections/Hero'
import { AboutMaklon } from '@/components/sections/AboutMaklon'
import { WhyUs } from '@/components/sections/WhyUs'
import { ProductTypes } from '@/components/sections/ProductTypes'
import { Workflow } from '@/components/sections/Workflow'
import { Certifications } from '@/components/sections/Certifications'
import { Faq } from '@/components/sections/Faq'
import { Cta } from '@/components/sections/Cta'
import { Footer } from '@/components/sections/Footer'

function App() {
  useSmoothScroll()

  return (
    <div className="bg-paper text-ink min-h-screen">
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
  )
}

export default App
