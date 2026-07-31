import Reveal from "../Reveal";

/**
 * PLACEHOLDER — angka "50+ Brand Bermitra" dan "5 Jenis Kategori Produk" di bawah
 * masih perkiraan/ilustrasi. Ganti dengan angka aktual (data internal) sebelum
 * publish live, supaya klaim yang ditampilkan akurat dan bisa dipertanggungjawabkan.
 */
const STATS = [
  { value: "10+", label: "Tahun Pengalaman Produksi" },
  { value: "50+", label: "Brand Sudah Bermitra" },
  { value: "4", label: "Standar Legalitas Terpenuhi" },
  { value: "5", label: "Jenis Kategori Produk" },
];

export default function StatsSection() {
  return (
    <div className="bg-white py-14 md:py-16">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-6">
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-heading text-3xl font-extrabold text-forest md:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs font-medium uppercase tracking-[0.08em] text-ink/60 md:text-sm">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </div>
  );
}
