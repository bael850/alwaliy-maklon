import { MessageCircle } from "lucide-react";

export function Cta() {
  return (
    <section id="cta" className="bg-forest py-20 text-paper md:py-28">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-paper/60">
          Mulai Sekarang
        </p>
        <h2 className="mt-3 font-display text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
          Siap wujudkan produk Anda sendiri?
        </h2>
        <p className="mx-auto mt-5 max-w-lg font-body text-base leading-relaxed text-paper/80">
          Konsultasi gratis dengan tim kami — ceritakan konsep produk Anda, kami
          bantu hitung estimasi biaya dan waktu produksinya.
        </p>

        <a
          href="https://wa.me/6281234567890"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-9 inline-flex items-center gap-2 rounded-sm bg-stamp px-7 py-3.5 font-body text-sm font-medium text-paper transition-opacity hover:opacity-90"
        >
          <MessageCircle size={18} />
          Konsultasi Gratis via WhatsApp
        </a>
      </div>
    </section>
  );
}
