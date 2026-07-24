import { useState } from 'react'
import { Menu, X } from 'lucide-react'

const NAV_LINKS = [
  { href: '#about', label: 'Tentang Maklon' },
  { href: '#why-us', label: 'Kenapa Kami' },
  { href: '#products', label: 'Jenis Produk' },
  { href: '#process', label: 'Alur Kerja' },
  { href: '#certifications', label: 'Sertifikasi' },
  { href: '#faq', label: 'FAQ' },
]

export function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-hairline/60 bg-paper/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#" className="flex items-center gap-2">
          <span className="font-display text-lg font-semibold tracking-tight text-forest">
            Al-Waliy
          </span>
          <span className="font-mono text-[11px] uppercase tracking-widest text-stamp">
            Maklon
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-body text-sm text-ink/70 transition-colors hover:text-forest"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="#cta"
          className="hidden rounded-sm bg-forest px-5 py-2.5 font-body text-sm font-medium text-paper transition-colors hover:bg-ink md:inline-block"
        >
          Konsultasi Gratis
        </a>

        <button
          type="button"
          className="text-ink md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Tutup menu' : 'Buka menu'}
          aria-expanded={open}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-hairline/60 bg-paper px-6 py-4 md:hidden">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="py-2.5 font-body text-sm text-ink/80"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#cta"
            className="mt-2 rounded-sm bg-forest px-5 py-3 text-center font-body text-sm font-medium text-paper"
            onClick={() => setOpen(false)}
          >
            Konsultasi Gratis
          </a>
        </nav>
      )}
    </header>
  )
}
