import { ShieldCheck, PackagePlus, FileCheck2, Sparkles } from "lucide-react";
import Reveal from "../Reveal";

const REASONS = [
  {
    icon: ShieldCheck,
    title: "Legalitas Lengkap",
    desc: "Bantu pengurusan Halal MUI, BPOM, dan hak merek untuk produk Anda.",
  },
  {
    icon: PackagePlus,
    title: "Formulasi Fleksibel",
    desc: "Serbuk, kapsul, cair, hingga madu — disesuaikan dengan konsep brand Anda.",
  },
  {
    icon: FileCheck2,
    title: "Standar CPOTB",
    desc: "Diproduksi di fasilitas yang memenuhi Cara Pembuatan Obat Tradisional yang Baik.",
  },
  {
    icon: Sparkles,
    title: "Desain & Kemasan",
    desc: "Dukungan desain kemasan dan branding, bukan cuma urusan produksi.",
  },
];

export default function WhyUs() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal className="mb-12 max-w-2xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-gold">
            Jaminan Kami
          </p>
          <h2 className="font-heading text-3xl font-extrabold leading-tight text-forest md:text-4xl">
            Kenapa Pilih Al-Waliy sebagai Mitra Makloo
          </h2>
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {REASONS.map((reason, i) => (
            <Reveal key={reason.title} delay={i * 0.08}>
              <div className="rounded-[4px] border border-forest/10 bg-cream p-6">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-[4px] bg-forest text-cream">
                  <reason.icon size={20} strokeWidth={2} />
                </div>
                <h3 className="font-heading text-base font-bold text-forest">
                  {reason.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/70">
                  {reason.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
