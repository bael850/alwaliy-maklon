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

// Strip bergerigi di kepala tiap "nota" — meniru sobekan kertas roll kasir.
// Dibuat pakai mask radial-gradient berulang, jadi tak perlu asset gambar.
function PerforatedEdge({ tone }: { tone: "light" | "dark" }) {
  return (
    <div
      aria-hidden="true"
      className={`h-3 w-full ${tone === "light" ? "bg-cream/40" : "bg-white"}`}
      style={{
        WebkitMaskImage:
          "radial-gradient(circle at 8px 6px, transparent 6px, black 6.5px)",
        maskImage:
          "radial-gradient(circle at 8px 6px, transparent 6px, black 6.5px)",
        WebkitMaskSize: "16px 12px",
        maskSize: "16px 12px",
        WebkitMaskRepeat: "repeat-x",
        maskRepeat: "repeat-x",
      }}
    />
  );
}

// Satu baris item nota dengan garis titik-titik penghubung ke keterangan,
// meniru layout aspek...harga pada struk/kwitansi asli.
function ReceiptRow({
  label,
  detail,
  positive,
}: {
  label: string;
  detail: string;
  positive: boolean;
}) {
  return (
    <li className="flex items-baseline gap-2 py-3">
      {positive ? (
        <Check
          size={14}
          strokeWidth={3}
          className="mt-1 shrink-0 text-forest"
        />
      ) : (
        <X size={14} strokeWidth={3} className="mt-1 shrink-0 text-ink/30" />
      )}
      <span className="shrink-0 text-sm font-semibold text-forest">
        {label}
      </span>
      <span
        className="mt-1 flex-1 border-b border-dotted border-ink/25"
        aria-hidden="true"
      />
      <span
        className={`max-w-[45%] text-right text-sm leading-snug ${
          positive ? "text-ink/75" : "text-ink/45"
        }`}
      >
        {detail}
      </span>
    </li>
  );
}

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

        {/* Perbandingan disajikan sebagai dua "nota" berdampingan, bukan
            tabel HTML biasa — biar konsisten dengan nuansa apotek/kwitansi
            yang dipakai section lain, dan beda dari grid kartu di section
            sekitarnya. */}
        <div className="relative grid gap-8 md:grid-cols-2 md:gap-6">
          {/* Badge VS di tengah, cuma muncul di layar md ke atas */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 md:flex">
            <span className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-gold bg-white font-heading text-xs font-extrabold text-forest shadow-md">
              VS
            </span>
          </div>

          {/* Nota kiri — Maklon Al-Waliy */}
          <Reveal delay={0.06}>
            <div className="overflow-hidden rounded-[3px] border border-forest/15 bg-cream/40 shadow-[0_1px_0_rgba(0,0,0,0.03),0_10px_24px_-16px_rgba(28,44,34,0.35)]">
              <PerforatedEdge tone="light" />
              <div className="px-6 pb-6 pt-2">
                <div className="mb-1 flex items-center justify-between border-b border-dashed border-forest/20 pb-3">
                  <p className="font-heading text-sm font-extrabold uppercase tracking-[0.08em] text-forest">
                    Maklon Al-Waliy
                  </p>
                  <span className="rounded-full bg-forest px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-gold-light">
                    Rekomendasi
                  </span>
                </div>
                <ul className="divide-y divide-forest/10">
                  {ROWS.map((row) => (
                    <ReceiptRow
                      key={row.aspect}
                      label={row.aspect}
                      detail={row.maklon}
                      positive
                    />
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>

          {/* Nota kanan — Bangun Pabrik Sendiri */}
          <Reveal delay={0.12}>
            <div className="overflow-hidden rounded-[3px] border border-ink/10 bg-white shadow-[0_1px_0_rgba(0,0,0,0.02),0_10px_24px_-16px_rgba(28,44,34,0.18)]">
              <PerforatedEdge tone="dark" />
              <div className="px-6 pb-6 pt-2">
                <div className="mb-1 flex items-center justify-between border-b border-dashed border-ink/15 pb-3">
                  <p className="font-heading text-sm font-extrabold uppercase tracking-[0.08em] text-ink/50">
                    Bangun Pabrik Sendiri
                  </p>
                </div>
                <ul className="divide-y divide-ink/10">
                  {ROWS.map((row) => (
                    <ReceiptRow
                      key={row.aspect}
                      label={row.aspect}
                      detail={row.sendiri}
                      positive={false}
                    />
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Studi kasus */}
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
