import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ArrowRight, FileCheck } from 'lucide-react'

export function Hero() {
  const rootRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.from('[data-hero="eyebrow"]', { opacity: 0, y: 12, duration: 0.5 })
        .from(
          '[data-hero="headline-line"]',
          { opacity: 0, y: 24, duration: 0.7, stagger: 0.08 },
          '-=0.25'
        )
        .from(
          '[data-hero="subhead"]',
          { opacity: 0, y: 16, duration: 0.6 },
          '-=0.35'
        )
        .from(
          '[data-hero="cta"]',
          { opacity: 0, y: 12, duration: 0.5, stagger: 0.08 },
          '-=0.3'
        )
        .from(
          '[data-hero="doc-card"]',
          { opacity: 0, x: 32, rotate: 3, duration: 0.8 },
          '-=0.6'
        )
        .from(
          '[data-hero="stamp"]',
          { opacity: 0, scale: 1.6, rotate: -24, duration: 0.4, ease: 'back.out(3)' },
          '-=0.15'
        )
    }, rootRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={rootRef}
      id="hero"
      className="relative overflow-hidden border-b border-hairline pt-32 pb-20 md:pt-40 md:pb-28"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-6 md:grid-cols-[1.1fr_0.9fr]">
        {/* Left: message */}
        <div>
          <p
            data-hero="eyebrow"
            className="font-mono text-xs uppercase tracking-[0.2em] text-stamp"
          >
            Maklon Kosmetik &amp; Skincare — B2B
          </p>

          <h1 className="mt-4 font-display text-4xl font-semibold leading-[1.1] tracking-tight text-ink md:text-5xl lg:text-[3.4rem]">
            <span data-hero="headline-line" className="block">
              Wujudkan produk Anda,
            </span>
            <span data-hero="headline-line" className="block">
              dari formula sampai
            </span>
            <span data-hero="headline-line" className="block text-forest">
              kemasan jadi.
            </span>
          </h1>

          <p
            data-hero="subhead"
            className="mt-6 max-w-md font-body text-base leading-relaxed text-ink/70 md:text-lg"
          >
            Al-Waliy Sejahtera memproduksi kosmetik dan skincare bersertifikat
            halal, CoA, dan notifikasi BPOM. Kami pegang produksinya, Anda
            pegang brand-nya.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              data-hero="cta"
              href="#cta"
              className="inline-flex items-center gap-2 rounded-sm bg-forest px-6 py-3.5 font-body text-sm font-medium text-paper transition-colors hover:bg-ink"
            >
              Konsultasi Gratis via WhatsApp
              <ArrowRight size={16} />
            </a>
            <a
              data-hero="cta"
              href="#process"
              className="inline-flex items-center gap-2 font-body text-sm font-medium text-ink/70 underline decoration-hairline decoration-2 underline-offset-4 transition-colors hover:text-forest"
            >
              Lihat alur kerjanya
            </a>
          </div>
        </div>

        {/* Right: document-style visual */}
        <div className="relative mx-auto w-full max-w-sm">
          <div
            data-hero="doc-card"
            className="relative rounded-sm border border-hairline bg-white/60 p-6 shadow-[0_18px_40px_-20px_rgba(26,31,27,0.35)]"
          >
            <div className="flex items-center justify-between border-b border-hairline pb-4">
              <span className="font-mono text-[10px] uppercase tracking-widest text-ink/50">
                Surat Jalan Produksi
              </span>
              <FileCheck size={16} className="text-forest" />
            </div>

            <dl className="mt-4 space-y-3 font-mono text-[13px]">
              <div className="flex justify-between gap-4">
                <dt className="text-ink/50">No. Batch</dt>
                <dd className="text-ink">AWS-2607-014</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-ink/50">Jenis Produk</dt>
                <dd className="text-ink">Serum Wajah</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-ink/50">Status</dt>
                <dd className="text-forest">Siap Produksi</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-ink/50">Sertifikasi</dt>
                <dd className="text-right text-ink">Halal · BPOM · CoA</dd>
              </div>
            </dl>

            {/* Stamp */}
            <div
              data-hero="stamp"
              className="pointer-events-none absolute -right-4 -bottom-4 flex h-24 w-24 -rotate-[14deg] items-center justify-center rounded-full border-[3px] border-stamp/80 text-center mix-blend-multiply"
            >
              <span className="font-mono text-[9px] font-semibold uppercase leading-tight tracking-widest text-stamp">
                Terverifikasi
                <br />
                Al-Waliy
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
