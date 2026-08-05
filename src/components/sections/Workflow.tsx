import { useEffect, useRef, useState } from "react";
import {
  ClipboardList,
  TestTube2,
  FileSignature,
  Palette,
  Factory,
  Truck,
  Users,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "../Reveal";
import SmartImage from "../SmartImage";

gsap.registerPlugin(ScrollTrigger);

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
  const [activeIndex, setActiveIndex] = useState(0);
  const stepRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    // Kartu "tahap aktif" yang di-drive activeIndex cuma tampil di md ke
    // atas (hidden md:block). Di mobile, bikin ScrollTrigger utk elemen
    // yang gak keliatan cuma buang-buang kerja tiap frame scroll — jadi
    // di-skip di bawah breakpoint md, dan dibikin ulang kalau resize
    // ngelewatin breakpoint (misal rotate layar / desktop window resize).
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const triggers = stepRefs.current.map((el, i) => {
        if (!el) return null;
        return ScrollTrigger.create({
          trigger: el,
          start: "top 55%",
          end: "bottom 55%",
          onEnter: () => setActiveIndex(i),
          onEnterBack: () => setActiveIndex(i),
        });
      });

      return () => {
        triggers.forEach((t) => t?.kill());
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section id="proses" className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="grid gap-10 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] md:gap-16">
          {/* Panel kiri — nempel selama user scroll ngelewatin 6 tahap di kanan */}
          <div className="md:sticky md:top-28 md:self-start">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-gold">
              Alur Kerja Sama
            </p>
            <h2 className="font-heading text-3xl font-extrabold leading-tight text-forest md:text-4xl">
              Enam Tahap, dari Ide sampai Produk Jadi
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink/70 md:text-base">
              Scroll untuk lihat tiap tahap — kartu ini menandai posisi Anda di
              keseluruhan proses.
            </p>

            {/* Foto pendukung — PLACEHOLDER: taruh file di
                public/images/workflow/tim-produksi.(webp|jpg|png). Tampil
                di kedua ukuran layar (beda dari kartu tahap aktif di bawah
                yang cuma muncul di desktop), biar versi mobile juga tetap
                dapat elemen visual, bukan cuma teks. */}
            <div className="mt-6 aspect-[4/3] max-w-sm overflow-hidden rounded-[4px] border border-forest/10 bg-forest/5">
              <SmartImage
                basePath="/images/workflow/tim-produksi"
                alt="Tim produksi Al-Waliy bekerja"
                className="h-full w-full object-cover"
                fallback={
                  <div className="flex h-full w-full items-center justify-center">
                    <Users
                      size={32}
                      strokeWidth={1.5}
                      className="text-forest/30"
                    />
                  </div>
                }
              />
            </div>

            {/* Kartu tahap aktif */}
            <div className="mt-8 hidden max-w-sm rounded-[4px] border border-forest/10 bg-cream p-6 md:block">
              <div className="flex items-center justify-between">
                <span className="font-heading text-sm font-bold uppercase tracking-[0.1em] text-gold">
                  Tahap {String(activeIndex + 1).padStart(2, "0")} / 06
                </span>
              </div>
              <p className="mt-3 font-heading text-xl font-bold text-forest">
                {STEPS[activeIndex].title}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-ink/70">
                {STEPS[activeIndex].desc}
              </p>

              {/* Progress — strip blister kapsul, bukan titik-titik polos.
                  Nyambung ke tema produk (kapsul/obat) yang jadi salah satu
                  jenis produksi Al-Waliy, sekaligus beda dari dot-bar generik. */}
              <div className="mt-6 flex gap-1.5">
                {STEPS.map((step, i) => (
                  <span
                    key={step.title}
                    className={[
                      "h-3 flex-1 rounded-full border transition-colors duration-300",
                      i <= activeIndex
                        ? "border-gold bg-gold"
                        : "border-forest/15 bg-transparent",
                    ].join(" ")}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Kanan — 6 tahap dihubungkan garis pipeline vertikal di belakang
              nomor tahap, biar kerasa satu alur berkelanjutan, bukan cuma
              daftar terpisah-pisah. */}
          <div className="relative flex flex-col gap-6">
            <div
              aria-hidden="true"
              className="absolute bottom-5 left-5 top-5 hidden w-px bg-forest/12 md:block"
            />
            {STEPS.map((step, i) => (
              <div
                key={step.title}
                ref={(el) => {
                  stepRefs.current[i] = el;
                }}
              >
                <Reveal>
                  <div
                    className={[
                      "relative flex items-start gap-4 rounded-[4px] border p-6 transition-colors duration-300",
                      i === activeIndex
                        ? "border-forest/30 bg-forest/[0.03]"
                        : "border-forest/10 bg-white",
                    ].join(" ")}
                  >
                    <span
                      className={[
                        "relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold transition-colors duration-300",
                        i === activeIndex
                          ? "bg-forest text-cream shadow-[0_0_0_5px_rgba(27,67,50,0.08)]"
                          : "bg-white text-forest ring-1 ring-inset ring-forest/20",
                      ].join(" ")}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="font-heading text-lg font-bold text-forest">
                        {step.title}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-ink/70 md:text-base">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
