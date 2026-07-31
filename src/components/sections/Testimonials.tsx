import { Quote } from "lucide-react";
import Reveal from "../Reveal";

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

export default function Testimonials() {
  return (
    <section className="bg-forest py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
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
    </section>
  );
}
