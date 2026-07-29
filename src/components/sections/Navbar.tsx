import { useState } from "react";

const links = [
  { href: "#tentang", label: "Tentang" },
  { href: "#produk", label: "Produk" },
  { href: "#alur", label: "Alur Kerja" },
  { href: "#sertifikasi", label: "Sertifikasi" },
  { href: "#faq", label: "FAQ" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-forest-600/60 bg-forest/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a
          href="#"
          className="font-display text-lg font-semibold tracking-tight text-parchment"
        >
          Al-Waliy <span className="text-honey">Maklon</span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="focus-ring rounded text-sm text-parchment-muted transition-colors hover:text-honey"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#cta"
          className="focus-ring hidden rounded-full bg-honey px-5 py-2 text-sm font-semibold text-forest transition-colors hover:bg-honey-300 md:inline-block"
        >
          Konsultasi Gratis
        </a>

        <button
          className="focus-ring rounded p-2 text-parchment md:hidden"
          aria-label="Buka menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="block h-0.5 w-6 bg-parchment mb-1.5" />
          <span className="block h-0.5 w-6 bg-parchment mb-1.5" />
          <span className="block h-0.5 w-6 bg-parchment" />
        </button>
      </nav>

      {open && (
        <ul className="flex flex-col gap-1 border-t border-forest-600/60 px-6 py-4 md:hidden">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="focus-ring block rounded py-2 text-parchment-muted hover:text-honey"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#cta"
              onClick={() => setOpen(false)}
              className="focus-ring mt-2 block rounded-full bg-honey px-5 py-2 text-center text-sm font-semibold text-forest"
            >
              Konsultasi Gratis
            </a>
          </li>
        </ul>
      )}
    </header>
  );
}
