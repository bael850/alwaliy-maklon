export default function AboutMaklon() {
  return (
    <section id="tentang" className="border-t border-forest-600/60 px-6 py-20">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2 md:gap-16">
        <div>
          <h2 className="font-display text-3xl font-semibold text-parchment">
            Apa itu jasa maklon?
          </h2>
          <p className="mt-4 text-parchment-muted">
            Maklon adalah layanan produksi produk atas nama merek Anda sendiri
            (private label). Anda cukup membawa ide dan merek, kami yang
            menangani formulasi, produksi, pengemasan, hingga legalitas —
            sehingga Anda bisa fokus membangun bisnis dan pemasaran.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-6">
          {[
            ["10+", "Tahun pengalaman produksi herbal"],
            ["50+", "Merek yang telah kami bantu"],
            ["4", "Kategori produk yang kami produksi"],
            ["100%", "Pendampingan legalitas BPOM & Halal"],
          ].map(([num, label]) => (
            <div
              key={label}
              className="rounded-2xl border border-forest-600/60 bg-forest-800 p-5"
            >
              <div className="font-display text-3xl font-semibold text-honey">
                {num}
              </div>
              <div className="mt-1 text-sm text-parchment-muted">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
