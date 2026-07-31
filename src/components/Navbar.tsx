import { useEffect, useState } from "react";
import { Menu, X, MessageCircle } from "lucide-react";
import logoImage from "../assets/logo.png";

const NAV_LINKS = [
  { label: "Tentang", href: "#tentang" },
  { label: "Layanan", href: "#layanan" },
  { label: "Proses", href: "#proses" },
  { label: "Sertifikasi", href: "#sertifikasi" },
  { label: "FAQ", href: "#faq" },
];

const WA_NUMBER = "6281515264972";
const WA_MESSAGE =
  "Assalamualaikum, saya mau tanya terkait layanan maklon Al-Waliy...";
const WA_HREF = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_MESSAGE)}`;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll saat mobile menu terbuka
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const handleLinkClick = () => setMenuOpen(false);

  return (
    <header
      className={[
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-cream/95 backdrop-blur-sm shadow-[0_1px_0_rgba(27,67,50,0.08)]"
          : "bg-transparent",
      ].join(" ")}
    >
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="flex h-16 md:h-20 items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 shrink-0">
            <img
              src={logoImage}
              alt="Logo Al-Waliy"
              className="h-8 w-8 md:h-9 md:w-9 object-contain"
            />
            <span className="flex items-baseline gap-2">
              <span
                className={[
                  "font-heading text-lg md:text-xl font-extrabold tracking-tight transition-colors",
                  scrolled ? "text-forest" : "text-cream",
                ].join(" ")}
              >
                AL-WALIY
              </span>
              <span
                className={[
                  "text-[11px] md:text-xs font-medium uppercase tracking-[0.14em] transition-colors",
                  scrolled ? "text-gold" : "text-gold-light",
                ].join(" ")}
              >
                Maklon
              </span>
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={[
                  "text-sm font-medium transition-colors hover:text-gold",
                  scrolled ? "text-ink" : "text-cream",
                ].join(" ")}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <a
            href={WA_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-2 rounded-[4px] bg-forest px-5 py-2.5 text-sm font-semibold text-cream transition-colors hover:bg-forest-light"
          >
            <MessageCircle size={16} strokeWidth={2.5} />
            Konsultasi Gratis
          </a>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Tutup menu" : "Buka menu"}
            aria-expanded={menuOpen}
            className={[
              "md:hidden inline-flex h-10 w-10 items-center justify-center rounded-[4px] transition-colors",
              scrolled ? "text-forest" : "text-cream",
            ].join(" ")}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={[
          "md:hidden overflow-hidden bg-cream transition-[max-height,opacity] duration-300 ease-in-out",
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
        ].join(" ")}
      >
        <nav className="flex flex-col gap-1 px-5 pb-6 pt-2">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={handleLinkClick}
              className="rounded-[4px] px-3 py-3 text-base font-medium text-ink transition-colors hover:bg-forest/5 hover:text-forest"
            >
              {link.label}
            </a>
          ))}
          <a
            href={WA_HREF}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleLinkClick}
            className="mt-2 inline-flex items-center justify-center gap-2 rounded-[4px] bg-forest px-5 py-3 text-sm font-semibold text-cream"
          >
            <MessageCircle size={16} strokeWidth={2.5} />
            Konsultasi Gratis
          </a>
        </nav>
      </div>
    </header>
  );
}
