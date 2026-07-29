import { ArrowRight } from "lucide-react";
import heroImage from "../../assets/hero.png";

const WA_NUMBER = "6281515264972";
const WA_MESSAGE =
  "Assalamualaikum, saya mau konsultasi soal layanan makloon Al-Waliy...";
const WA_HREF = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_MESSAGE)}`;

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[92vh] items-end overflow-hidden"
    >
      {/* Background image */}
      <img
        src={heroImage}
        alt="Proses produksi herbal Al-Waliy"
        className="absolute inset-0 h-full w-full object-cover"
      />
      {/* Overlay gradient — gelap di bawah biar teks kebaca, tipis di atas biar navbar transparan tetap kontras */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-16 pt-40 md:px-8 md:pb-24">
        <p className="mb-4 text-xs md:text-sm font-semibold uppercase tracking-[0.18em] text-gold-light">
          Produksi Bersertifikat Halal MUI &amp; BPOM
        </p>

        <h1 className="max-w-3xl font-heading text-4xl font-extrabold leading-[1.08] text-cream md:text-6xl">
          Wujudkan Brand Herbal &amp; Madu Anda Sendiri
        </h1>

        <p className="mt-5 max-w-xl text-base leading-relaxed text-cream/85 md:text-lg">
          Jasa makloon produksi herbal dan madu dari produsen berpengalaman
          sejak 2014 — dari formulasi, kemasan, hingga legalitas, tanpa Anda
          perlu membangun pabrik sendiri.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a
            href={WA_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-[4px] border-[1.5px] border-cream px-6 py-3.5 text-sm font-semibold text-cream transition-colors hover:bg-cream hover:text-forest"
          >
            Konsultasi Gratis
            <ArrowRight size={16} strokeWidth={2.5} />
          </a>
          <a
            href="#layanan"
            className="inline-flex items-center gap-2 text-sm font-semibold text-cream/90 underline underline-offset-4 transition-colors hover:text-gold-light"
          >
            Lihat Layanan
          </a>
        </div>
      </div>
    </section>
  );
}
