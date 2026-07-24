import { useSmoothScroll } from '@/lib/lenis'
import { Navbar } from '@/components/sections/Navbar'
import { Hero } from '@/components/sections/Hero'
import { ApaItuMaklon } from '@/components/sections/ApaItuMaklon'
import { KenapaAlWaliy } from '@/components/sections/KenapaAlWaliy'
import { JenisProduk } from '@/components/sections/JenisProduk'
import { AlurKerja } from '@/components/sections/AlurKerja'
import { Sertifikasi } from '@/components/sections/Sertifikasi'
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
        <ApaItuMaklon />
        <KenapaAlWaliy />
        <JenisProduk />
        <AlurKerja />
        <Sertifikasi />
        <Faq />
        <Cta />
      </main>
      <Footer />
    </div>
  )
}

export default App
