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
        <div className="grid gap-12 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:gap-16">
          {/* Kiri: framing singkat, bukan cuma judul doang */}
          <Reveal>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-gold">
              Jaminan Kami
            </p>
            <h2 className="font-heading text-3xl font-extrabold leading-tight text-forest md:text-4xl">
              Kenapa Pilih Al-Waliy sebagai Mitra Maklon
            </h2>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-ink/70 md:text-base">
              Bukan cuma soal produksi — kami pegang tanggung jawab dari
              legalitas sampai brand Anda siap dipasarkan.
            </p>
          </Reveal>

          {/* Kanan: list, bukan grid kartu kotak — biar beda pola sama
              Certifications & ProductTypes yang di atas/bawahnya */}
          <div className="flex flex-col divide-y divide-forest/10 border-t border-forest/10">
            {REASONS.map((reason, i) => (
              <Reveal key={reason.title} delay={i * 0.08}>
                <div className="flex items-start gap-4 py-6">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[4px] bg-forest text-cream">
                    <reason.icon size={18} strokeWidth={2} />
                  </div>
                  <div>
                    <h3 className="font-heading text-base font-bold text-forest">
                      {reason.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-ink/70">
                      {reason.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
