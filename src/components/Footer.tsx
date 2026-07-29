import { Instagram, Facebook, MessageCircle } from "lucide-react";

const WA_NUMBER = "6281515264972";
const WA_HREF = `https://wa.me/${WA_NUMBER}`;

const LAYANAN_LINKS = [
  { label: "Madu Herbal", href: "#layanan" },
  { label: "Kapsul & Tablet", href: "#layanan" },
  { label: "Serbuk", href: "#layanan" },
  { label: "Cair / Sirup", href: "#layanan" },
];

const PERUSAHAAN_LINKS = [
  { label: "Profil Kami", href: "#tentang" },
  { label: "Alur Kerja Sama", href: "#proses" },
  { label: "Sertifikasi", href: "#sertifikasi" },
  { label: "Toko Retail Al-Waliy", href: "https://alwaliy-sejahtera.com" },
];

const BANTUAN_LINKS = [
  { label: "FAQ", href: "#faq" },
  {
    label: "Kebijakan Privasi",
    href: "https://alwaliy-sejahtera.com/privacy-policy",
  },
  {
    label: "Syarat & Ketentuan",
    href: "https://alwaliy-sejahtera.com/terms-conditions",
  },
];

export default function Footer() {
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
              CV Al-Waliy Sejahtera — produsen herbal terpercaya sejak 2014,
              kini membuka layanan makloon untuk brand Anda.
            </p>
            <div className="mt-5 flex gap-3">
              <a
                href="https://www.instagram.com/alwaliy.official/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-[4px] border border-cream/15 transition-colors hover:border-gold hover:text-gold-light"
              >
                <Instagram size={16} />
              </a>
              <a
                href="https://www.facebook.com/share/14J7AKuhvh7/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-[4px] border border-cream/15 transition-colors hover:border-gold hover:text-gold-light"
              >
                <Facebook size={16} />
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
              Layanan
            </p>
            <ul className="flex flex-col gap-2.5 text-sm">
              {LAYANAN_LINKS.map((l) => (
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
              Perusahaan
            </p>
            <ul className="flex flex-col gap-2.5 text-sm">
              {PERUSAHAAN_LINKS.map((l) => (
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
              Bantuan
            </p>
            <ul className="flex flex-col gap-2.5 text-sm">
              {BANTUAN_LINKS.map((l) => (
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

        {/* Cert badges */}
        <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-cream/10 pt-8 text-xs font-semibold uppercase tracking-wide text-cream/50">
          <span>Halal MUI</span>
          <span>BPOM RI</span>
          <span>CPOTB</span>
        </div>

        {/* Copyright */}
        <div className="mt-8 flex flex-col gap-2 text-xs text-cream/40 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 CV Al-Waliy Sejahtera. All rights reserved.</p>
          <p>Sumberjaya, Kab. Bekasi, Jawa Barat</p>
        </div>
      </div>
    </footer>
  );
}
