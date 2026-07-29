import { products } from "../../lib/data";

export default function ProductTypes() {
  return (
    <section id="produk" className="border-t border-forest-600/60 px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-display text-3xl font-semibold text-parchment">
          Jenis produk yang kami produksi
        </h2>
        <p className="mt-3 max-w-2xl text-parchment-muted">
          Setiap kategori dapat disesuaikan formulanya sesuai konsep dan target
          pasar merek Anda.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {products.map((p) => (
            <div
              key={p.title}
              className="rounded-2xl border border-forest-600/60 bg-forest-800 p-6 transition-colors hover:border-honey/50"
            >
              <h3 className="font-display text-xl font-semibold text-honey">
                {p.title}
              </h3>
              <p className="mt-2 text-sm text-parchment-muted">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
