import { ArrowUpRight } from "lucide-react";
import Reveal from "../Reveal";

/**
 * PLACEHOLDER — studi kasus di bawah anonim by design (kategori produk, bukan nama
 * brand), karena menyebut detail klien nyata butuh izin. Bisa diisi cerita nyata
 * (dengan izin klien) atau dibiarkan anonim permanen kalau klien tidak berkenan
 * disebut namanya.
 */
const CASE_STUDIES = [
  {
    category: "Madu Herbal",
    title: "Dari Konsep ke Produk Siap Jual",
    summary:
      "Brand baru memulai dari formulasi awal hingga siap dipasarkan dengan kemasan dan legalitas lengkap.",
  },
  {
    category: "Kapsul Suplemen",
    title: "Reformulasi untuk Perluasan Pasar",
    summary:
      "Membantu brand existing menyesuaikan formulasi produk agar memenuhi standar BPOM untuk kategori baru.",
  },
  {
    category: "Serbuk Minuman Herbal",
    title: "Kemasan & Branding dari Nol",
    summary:
      "Mendampingi brand tanpa pengalaman produksi sebelumnya, dari ide produk sampai siap jual.",
  },
];

export default function CaseStudies() {
  return (
    <section className="bg-cream py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <div className="mb-12 max-w-2xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-gold">
              Studi Kasus
            </p>
            <h2 className="font-heading text-3xl font-extrabold leading-tight text-forest md:text-4xl">
              Contoh Hasil Kerja Sama Maklon
            </h2>
          </div>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-3">
          {CASE_STUDIES.map((cs, i) => (
            <Reveal key={cs.title} delay={i * 0.1}>
              <div className="group flex h-full flex-col rounded-[4px] border border-forest/10 bg-white p-6 transition-colors hover:border-gold">
                <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-gold">
                  {cs.category}
                </p>
                <h3 className="mt-2 font-heading text-lg font-bold text-forest">
                  {cs.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-ink/70">
                  {cs.summary}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-forest/50">
                  Detail menyusul
                  <ArrowUpRight size={14} strokeWidth={2.5} />
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
