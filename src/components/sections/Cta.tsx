import { MapPin, MessageCircle, Globe } from "lucide-react";

const WA_NUMBER = "6281515264972";
const WA_MESSAGE =
  "Assalamualaikum, saya mau tanya terkait layanan maklon Al-Waliy...";
const WA_HREF = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_MESSAGE)}`;

export default function Cta() {
  return (
    <section className="bg-forest py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="grid gap-10 md:grid-cols-2 md:items-center md:gap-16">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-gold-light">
              Hubungi Kami
            </p>
            <h2 className="font-heading text-3xl font-extrabold leading-tight text-cream md:text-4xl">
              Siap Wujudkan Produk Herbal dengan Brand Anda Sendiri?
            </h2>
            <p className="mt-4 max-w-md text-cream/80">
              Tim kami siap membantu — dari informasi produk, formulasi, hingga
              konsultasi produksi maklon sesuai kebutuhan brand Anda.
            </p>

            <a
              href={WA_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-[4px] bg-gold px-7 py-3.5 text-sm font-semibold text-forest transition-colors hover:bg-gold-light"
            >
              <MessageCircle size={18} strokeWidth={2.5} />
              Konsultasi Gratis via WhatsApp
            </a>
          </div>

          <div className="flex flex-col gap-5 rounded-[4px] border border-cream/15 bg-forest-light/30 p-6 md:p-8">
            <div className="flex items-start gap-3">
              <MapPin
                size={20}
                strokeWidth={2}
                className="mt-0.5 shrink-0 text-gold"
              />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-cream/50">
                  Lokasi
                </p>
                <p className="text-cream">
                  Sumberjaya, Tambun Selatan, Kab. Bekasi 17510
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MessageCircle
                size={20}
                strokeWidth={2}
                className="mt-0.5 shrink-0 text-gold"
              />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-cream/50">
                  WhatsApp
                </p>
                <a
                  href={WA_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cream hover:text-gold-light"
                >
                  +62 815-1526-4972
                </a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Globe
                size={20}
                strokeWidth={2}
                className="mt-0.5 shrink-0 text-gold"
              />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-cream/50">
                  Website Utama
                </p>
                <a
                  href="https://alwaliy-sejahtera.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cream hover:text-gold-light"
                >
                  alwaliy-sejahtera.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
