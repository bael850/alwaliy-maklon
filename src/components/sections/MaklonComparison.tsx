import { Check, X, ArrowUpRight } from "lucide-react";
import Reveal from "../Reveal";

const ROWS = [
  {
    aspect: "Modal Awal",
    maklon: "Rendah — tanpa perlu bangun pabrik",
    sendiri: "Sangat tinggi — bangunan, alat, perizinan",
  },
  {
    aspect: "Waktu ke Pasar",
    maklon: "Lebih cepat, hitungan minggu-bulan",
    sendiri: "Bisa 1-2 tahun sebelum siap produksi",
  },
  {
    aspect: "Pengurusan Legalitas",
    maklon: "Dibantu tim berpengalaman",
    sendiri: "Diurus sendiri dari nol",
  },
  {
    aspect: "Risiko Operasional",
    maklon: "Ditanggung fasilitas produksi",
    sendiri: "Ditanggung sepenuhnya oleh brand",
  },
  {
    aspect: "Skalabilitas",
    maklon: "Fleksibel sesuai permintaan pasar",
    sendiri: "Terbatas kapasitas mesin sendiri",
  },
];

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

export default function MaklonComparison() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <div className="mb-12 max-w-2xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-gold">
              Maklon vs Bangun Pabrik Sendiri
            </p>
            <h2 className="font-heading text-3xl font-extrabold leading-tight text-forest md:text-4xl">
              Kenapa Banyak Brand Memilih Maklon
            </h2>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="overflow-x-auto rounded-[4px] border border-forest/10">
            <table className="w-full min-w-[560px] border-collapse text-left text-sm">
              <caption className="sr-only">
                Perbandingan maklon dengan membangun pabrik produksi sendiri
              </caption>
              <thead>
                <tr className="bg-forest text-cream">
                  <th scope="col" className="p-4 font-heading font-bold">
                    Aspek
                  </th>
                  <th
                    scope="col"
                    className="p-4 font-heading font-bold text-gold-light"
                  >
                    Maklon Al-Waliy
                  </th>
                  <th
                    scope="col"
                    className="p-4 font-heading font-bold text-cream/60"
                  >
                    Bangun Pabrik Sendiri
                  </th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map((row, i) => (
                  <tr
                    key={row.aspect}
                    className={i % 2 === 0 ? "bg-cream/50" : "bg-white"}
                  >
                    <th scope="row" className="p-4 font-semibold text-forest">
                      {row.aspect}
                    </th>
                    <td className="p-4 text-ink/80">
                      <span className="flex items-start gap-2">
                        <Check
                          size={16}
                          strokeWidth={2.5}
                          className="mt-0.5 shrink-0 text-forest"
                        />
                        {row.maklon}
                      </span>
                    </td>
                    <td className="p-4 text-ink/50">
                      <span className="flex items-start gap-2">
                        <X
                          size={16}
                          strokeWidth={2.5}
                          className="mt-0.5 shrink-0 text-ink/30"
                        />
                        {row.sendiri}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>

        {/* Studi kasus — digabung ke sini dari CaseStudies standalone, jadi
            argumen "kenapa maklon" langsung diikuti bukti nyata di bawahnya,
            bukan section terpisah yang mengulang topik serupa. */}
        <div className="mt-16 border-t border-forest/10 pt-12">
          <Reveal>
            <div className="mb-8 max-w-2xl">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-gold">
                Studi Kasus
              </p>
              <h3 className="font-heading text-2xl font-extrabold leading-tight text-forest md:text-3xl">
                Contoh Hasil Kerja Sama Maklon
              </h3>
            </div>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-3">
            {CASE_STUDIES.map((cs, i) => (
              <Reveal key={cs.title} delay={i * 0.1}>
                <div className="group flex h-full flex-col rounded-[4px] border border-forest/10 bg-cream/40 p-6 transition-colors hover:border-gold">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-gold">
                    {cs.category}
                  </p>
                  <h4 className="mt-2 font-heading text-lg font-bold text-forest">
                    {cs.title}
                  </h4>
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
      </div>
    </section>
  );
}
