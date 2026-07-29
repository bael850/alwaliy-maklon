const reasons = [
  {
    title: "Fasilitas Produksi Sendiri",
    desc: "Proses produksi dilakukan di fasilitas kami sendiri, bukan melalui pihak ketiga.",
  },
  {
    title: "Tim Formulasi Berpengalaman",
    desc: "Racikan disusun oleh tim yang memahami karakter bahan herbal dan madu lokal.",
  },
  {
    title: "Legalitas Terurus Lengkap",
    desc: "Pendampingan izin edar BPOM dan sertifikasi Halal MUI hingga terbit.",
  },
  {
    title: "Fleksibel untuk Skala Kecil",
    desc: "Minimum order ramah untuk usaha yang baru memulai maupun yang ingin berkembang.",
  },
];

export default function WhyUs() {
  return (
    <section className="border-t border-forest-600/60 bg-forest-800/40 px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-display text-3xl font-semibold text-parchment">
          Kenapa memilih kami
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((r) => (
            <div
              key={r.title}
              className="rounded-2xl border border-forest-600/60 p-6"
            >
              <div className="hex mb-4 h-10 w-10 bg-honey" />
              <h3 className="font-display text-lg font-semibold text-parchment">
                {r.title}
              </h3>
              <p className="mt-2 text-sm text-parchment-muted">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
