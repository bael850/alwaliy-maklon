import { Leaf } from "lucide-react";

export default function PullQuote() {
  return (
    <section className="overflow-hidden bg-cream py-20 md:py-28">
      <div className="relative mx-auto max-w-3xl px-5 text-center md:px-8">
        {/* Tanda kutip raksasa transparan di belakang teks — motif editorial
            pull-quote, sekaligus ngisi ruang kosong yang sebelumnya polos. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -top-2 left-1/2 -translate-x-1/2 select-none font-heading text-[7rem] leading-none text-gold/15 md:-top-4 md:text-[9rem]"
        >
          &rdquo;
        </span>

        <p className="relative font-heading text-2xl italic leading-snug text-forest md:text-3xl">
          "Alam menyediakan, kami meracik — kini giliran brand Anda yang
          memasarkan."
        </p>

        {/* Pemisah kecil bermotif daun — nyambung ke identitas herbal brand,
            gantiin jarak kosong polos antara kutipan dan atribusi. */}
        <div
          className="mt-6 flex items-center justify-center gap-3"
          aria-hidden="true"
        >
          <span className="h-px w-10 bg-gold/40" />
          <Leaf size={15} strokeWidth={2} className="text-gold" />
          <span className="h-px w-10 bg-gold/40" />
        </div>

        <p className="mt-4 text-sm font-medium uppercase tracking-[0.14em] text-gold">
          CV Al-Waliy Sejahtera — sejak 2014
        </p>
      </div>
    </section>
  );
}
