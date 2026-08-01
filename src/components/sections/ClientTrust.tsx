import { Building2, Quote } from "lucide-react";
import Reveal from "../Reveal";

/**
 * PLACEHOLDER — JANGAN PUBLISH LIVE SEBELUM ADA IZIN TERTULIS DARI KLIEN.
 * Ganti tiap entry di bawah dengan { name: "Nama Brand", logo: importedLogoImage }
 * begitu logo asli tersedia DAN izin publikasi sudah didapat dari klien terkait.
 * Menampilkan logo pihak lain tanpa izin bisa jadi masalah merek dagang/endorsement.
 */
const CLIENTS = [
  { name: "Mitra Maklon 1" },
  { name: "Mitra Maklon 2" },
  { name: "Mitra Maklon 3" },
  { name: "Mitra Maklon 4" },
  { name: "Mitra Maklon 5" },
  { name: "Mitra Maklon 6" },
];

/**
 * PLACEHOLDER — semua kutipan & nama di bawah ini contoh, BUKAN testimoni asli.
 * Ganti dengan kutipan nyata dari klien maklon (dengan izin) sebelum publish live.
 */
const TESTIMONIALS = [
  {
    quote:
      "Prosesnya jelas dari awal, mulai dari formulasi sampai legalitas selesai lebih cepat dari perkiraan kami.",
    name: "Nama Klien",
    role: "Founder, Brand Herbal (Placeholder)",
  },
  {
    quote:
      "Support desain kemasan sangat membantu karena tim kami tidak perlu cari vendor terpisah.",
    name: "Nama Klien",
    role: "Owner, Brand Madu (Placeholder)",
  },
  {
    quote:
      "Komunikasinya responsif, dan hasil produksinya konsisten setiap batch.",
    name: "Nama Klien",
    role: "Marketing Manager, Brand Suplemen (Placeholder)",
  },
];

export default function ClientTrust() {
  return (
    <section className="bg-forest py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        {/* Logo strip — digabung ke sini dari ClientLogos standalone, dipakai
            sebagai pembuka blok trust sebelum testimoni yang lebih detail. */}
        <Reveal>
          <p className="mb-8 text-center text-sm font-semibold uppercase tracking-[0.14em] text-gold-light">
            Sudah Dipercaya Brand-Brand Berikut
          </p>
        </Reveal>
        <Reveal delay={0.06}>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-5">
            {CLIENTS.map((client) => (
              <div
                key={client.name}
                className="flex h-16 w-40 items-center justify-center gap-2 rounded-[4px] border border-cream/15 opacity-70 grayscale transition-all hover:opacity-100 hover:grayscale-0"
              >
                {/* Placeholder ikon — ganti dengan <img src={client.logo} alt={client.name}
                    className="h-full w-full object-contain p-3" /> begitu logo asli siap */}
                <Building2
                  size={18}
                  strokeWidth={1.75}
                  className="text-cream/60"
                />
                <span className="text-xs font-medium text-cream/60">
                  {client.name}
                </span>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Testimoni — sub-heading sendiri biar tetap jelas beda konten dari
            logo strip di atas, meski satu section & satu background. */}
        <div className="mt-16 border-t border-cream/10 pt-14">
          <Reveal>
            <div className="mb-12 max-w-2xl">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-gold-light">
                Kata Mitra Kami
              </p>
              <h2 className="font-heading text-3xl font-extrabold leading-tight text-cream md:text-4xl">
                Pengalaman Brand yang Sudah Bermitra
              </h2>
            </div>
          </Reveal>

          <div className="grid gap-5 md:grid-cols-3">
            {TESTIMONIALS.map((t, i) => (
              <Reveal key={t.name + i} delay={i * 0.1}>
                <div className="flex h-full flex-col rounded-[4px] border border-cream/15 bg-forest-light/30 p-6">
                  <Quote size={24} strokeWidth={2} className="text-gold" />
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-cream/90">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="mt-5 border-t border-cream/10 pt-4">
                    <p className="text-sm font-bold text-cream">{t.name}</p>
                    <p className="text-xs text-cream/60">{t.role}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
