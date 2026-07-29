import { Pill, FlaskConical, Droplets, Container } from "lucide-react";

const WA_NUMBER = "6281515264972";
const WA_MESSAGE = "Assalamualaikum, saya mau konsultasi soal makloon produk ";
const waHref = (product: string) =>
  `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_MESSAGE + product)}`;

const PRODUCT_TYPES = [
  {
    icon: Container,
    title: "Madu Herbal",
    desc: "Madu murni dikombinasikan dengan ekstrak herbal sesuai formulasi brand Anda.",
  },
  {
    icon: Pill,
    title: "Kapsul & Tablet",
    desc: "Suplemen herbal dalam bentuk kapsul atau tablet, praktis dan mudah dikonsumsi.",
  },
  {
    icon: FlaskConical,
    title: "Serbuk",
    desc: "Jamu atau minuman herbal serbuk, siap seduh dengan berbagai varian rasa.",
  },
  {
    icon: Droplets,
    title: "Cair / Sirup",
    desc: "Sari kurma, sirup herbal, hingga cuka alami dalam kemasan botol.",
  },
];

export default function ProductTypes() {
  return (
    <section id="layanan" className="bg-cream py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="mb-12 max-w-2xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-gold">
            Layanan Kami
          </p>
          <h2 className="font-heading text-3xl font-extrabold leading-tight text-forest md:text-4xl">
            Jenis Produk yang Bisa Kami Produksi
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PRODUCT_TYPES.map((type) => (
            <div
              key={type.title}
              className="group flex flex-col rounded-[4px] border border-forest/10 bg-white p-6 transition-colors hover:border-forest/30"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-[4px] bg-forest/5 text-forest">
                <type.icon size={20} strokeWidth={2} />
              </div>
              <h3 className="font-heading text-base font-bold text-forest">
                {type.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-ink/70">
                {type.desc}
              </p>
              <a
                href={waHref(type.title)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center text-sm font-semibold text-forest underline underline-offset-4 group-hover:text-gold"
              >
                Konsultasikan
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
