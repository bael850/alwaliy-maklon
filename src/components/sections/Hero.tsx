export default function Hero() {
  return (
    <section className="honeycomb-bg relative overflow-hidden bg-honey-drip px-6 pb-20 pt-16 md:pt-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
        <div>
          <span className="focus-ring inline-block rounded-full border border-honey/40 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-honey">
            Jasa Maklon Herbal & Madu
          </span>
          <h1 className="mt-6 font-display text-4xl font-semibold leading-tight text-parchment md:text-5xl">
            Wujudkan produk herbal dan madu dengan
            <span className="text-honey"> merek Anda sendiri</span>
          </h1>
          <p className="mt-5 max-w-md text-parchment-muted">
            CV Al-Waliy Sejahtera membantu Anda dari formulasi, produksi, hingga
            legalitas BPOM dan Halal — tanpa perlu membangun pabrik sendiri.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#cta"
              className="focus-ring rounded-full bg-honey px-6 py-3 text-sm font-semibold text-forest transition-colors hover:bg-honey-300"
            >
              Mulai Konsultasi
            </a>
            <a
              href="#alur"
              className="focus-ring rounded-full border border-parchment-muted/40 px-6 py-3 text-sm font-semibold text-parchment transition-colors hover:border-honey hover:text-honey"
            >
              Lihat Alur Kerja
            </a>
          </div>
        </div>

        <div className="relative mx-auto aspect-square w-full max-w-sm">
          <div className="absolute inset-0 grid grid-cols-3 gap-3 [&>div]:aspect-square">
            {Array.from({ length: 9 }).map((_, i) => (
              <div
                key={i}
                className="hex bg-forest-700"
                style={{
                  opacity: [0.9, 0.6, 0.9, 0.6, 1, 0.6, 0.9, 0.6, 0.9][i],
                  transform: i % 2 === 0 ? "translateY(0)" : "translateY(10%)",
                }}
              />
            ))}
          </div>
          <div className="hex absolute inset-[30%] flex items-center justify-center bg-honey text-forest shadow-lg">
            <span className="font-display text-2xl font-bold">Al-Waliy</span>
          </div>
        </div>
      </div>
    </section>
  );
}
