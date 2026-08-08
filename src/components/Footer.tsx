import { MessageCircle } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";

function InstagramIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37a4 4 0 1 1-7.914 1.174A4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function FacebookIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

const WA_NUMBER = "6285713896599";
const WA_HREF = `https://wa.me/${WA_NUMBER}`;

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-ink text-cream/70">
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <p className="font-heading text-lg font-extrabold text-cream">
              AL-WALIY <span className="text-gold-light">Maklon</span>
            </p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed">
              {t.footer.tagline}
            </p>
            <div className="mt-5 flex gap-3">
              <a
                href="https://www.instagram.com/alwaliy.official/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-[4px] border border-cream/15 transition-colors hover:border-gold hover:text-gold-light"
              >
                <InstagramIcon size={16} />
              </a>
              <a
                href="https://www.facebook.com/share/14J7AKuhvh7/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-[4px] border border-cream/15 transition-colors hover:border-gold hover:text-gold-light"
              >
                <FacebookIcon size={16} />
              </a>
              <a
                href={WA_HREF}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="flex h-9 w-9 items-center justify-center rounded-[4px] border border-cream/15 transition-colors hover:border-gold hover:text-gold-light"
              >
                <MessageCircle size={16} />
              </a>
            </div>
          </div>

          {/* Layanan */}
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.12em] text-cream/40">
              {t.footer.layananHeading}
            </p>
            <ul className="flex flex-col gap-2.5 text-sm">
              {t.footer.layananLinks.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="transition-colors hover:text-gold-light"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Perusahaan */}
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.12em] text-cream/40">
              {t.footer.perusahaanHeading}
            </p>
            <ul className="flex flex-col gap-2.5 text-sm">
              {t.footer.perusahaanLinks.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="transition-colors hover:text-gold-light"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Bantuan */}
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.12em] text-cream/40">
              {t.footer.bantuanHeading}
            </p>
            <ul className="flex flex-col gap-2.5 text-sm">
              {t.footer.bantuanLinks.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="transition-colors hover:text-gold-light"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Lokasi — teks dulu, Maps embed ditunda sampai verifikasi GBP kelar */}
        <div className="mt-12 border-t border-cream/10 pt-8">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-cream/40">
            {t.footer.lokasiHeading}
          </p>
          <p className="text-sm text-cream/80">{t.footer.alamatLengkap}</p>
        </div>

        {/* Cert badges */}
        <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-cream/10 pt-8 text-xs font-semibold uppercase tracking-wide text-cream/50">
          <span>Halal MUI</span>
          <span>BPOM RI</span>
          <span>CPOTB</span>
        </div>

        {/* Copyright */}
        <div className="mt-8 flex flex-col gap-2 text-xs text-cream/40 sm:flex-row sm:items-center sm:justify-between">
          <p>{t.footer.copyright}</p>
          <p>{t.footer.alamatLengkap}</p>
        </div>
      </div>
    </footer>
  );
}
