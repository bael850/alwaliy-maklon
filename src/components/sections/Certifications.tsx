import { BadgeCheck, ShieldCheck, Factory, Scale } from "lucide-react";

const CERTS = [
  {
    icon: BadgeCheck,
    title: "Halal MUI / BPJPH",
    desc: "Sertifikasi halal resmi dari Majelis Ulama Indonesia dan Badan Penyelenggara Jaminan Produk Halal.",
  },
  {
    icon: ShieldCheck,
    title: "Terdaftar BPOM",
    desc: "Produk melalui evaluasi dan terdaftar di Badan Pengawas Obat dan Makanan Republik Indonesia.",
  },
  {
    icon: Factory,
    title: "Standar CPOTB",
    desc: "Memenuhi Cara Pembuatan Obat Tradisional yang Baik — standar produksi herbal tertinggi di Indonesia.",
  },
  {
    icon: Scale,
    title: "Badan Hukum Resmi",
    desc: "CV Al-Waliy Sejahtera terdaftar sebagai badan hukum resmi dengan legalitas usaha lengkap.",
  },
];

export default function Certifications() {
  return (
    <section id="sertifikasi" className="bg-forest py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="mb-12 max-w-2xl">
          <p className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-gold-light">
            <span className="text-cream/30">02</span> Legalitas &amp; Standar
          </p>
          <h2 className="font-heading text-3xl font-extrabold leading-tight text-cream md:text-4xl">
            Bukan Sekadar Klaim — Ini Jaminan Tertulis
          </h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {CERTS.map((cert) => (
            <div
              key={cert.title}
              className="rounded-[4px] border border-cream/15 bg-forest-light/40 p-6"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-[4px] bg-gold text-forest">
                <cert.icon size={20} strokeWidth={2} />
              </div>
              <h3 className="font-heading text-base font-bold text-cream">
                {cert.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-cream/70">
                {cert.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
