import {
  ClipboardList,
  TestTube2,
  FileSignature,
  Palette,
  Factory,
  Truck,
} from "lucide-react";

const STEPS = [
  {
    icon: ClipboardList,
    title: "Konsultasi",
    desc: "Diskusi konsep produk, target pasar, dan kebutuhan formulasi Anda.",
  },
  {
    icon: TestTube2,
    title: "Pembuatan Sampel",
    desc: "Sampel produk dibuat dan disempurnakan sampai sesuai konsep.",
  },
  {
    icon: FileSignature,
    title: "Perjanjian Kerja Sama",
    desc: "Kesepakatan volume produksi, harga, dan jadwal kerja dituangkan tertulis.",
  },
  {
    icon: Palette,
    title: "Registrasi & Desain",
    desc: "Pengurusan BPOM/Halal serta desain kemasan dan identitas merek.",
  },
  {
    icon: Factory,
    title: "Produksi Massal",
    desc: "Produksi dijalankan di fasilitas berstandar CPOTB sesuai jumlah yang disepakati.",
  },
  {
    icon: Truck,
    title: "Siap Dipasarkan",
    desc: "Produk jadi, dikemas rapi, dan siap Anda pasarkan dengan brand sendiri.",
  },
];

export default function Workflow() {
  return (
    <section id="proses" className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="mb-14 max-w-2xl">
          <p className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-gold">
            <span className="text-forest/40">02</span> Alur Kerja Sama
          </p>
          <h2 className="font-heading text-3xl font-extrabold leading-tight text-forest md:text-4xl">
            Enam Tahap, dari Ide sampai Produk Jadi
          </h2>
        </div>

        <ol className="relative border-l border-forest/15 pl-8 md:pl-10">
          {STEPS.map((step, i) => (
            <li key={step.title} className="relative pb-12 last:pb-0">
              {/* Marker bernomor */}
              <span className="absolute -left-[45px] flex h-9 w-9 items-center justify-center rounded-full bg-forest text-sm font-bold text-cream md:-left-[53px] md:h-10 md:w-10">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="flex items-start gap-3">
                <step.icon
                  size={20}
                  strokeWidth={2}
                  className="mt-1 shrink-0 text-gold"
                />
                <div>
                  <h3 className="font-heading text-lg font-bold text-forest">
                    {step.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink/70 md:text-base">
                    {step.desc}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
