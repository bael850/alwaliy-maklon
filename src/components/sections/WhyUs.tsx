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
        <div className="grid gap-12 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:gap-16 md:items-start">
          {/* Kiri: framing singkat */}
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

          {/* Kanan: disajikan sebagai clipboard lembar pemeriksaan mutu —
              jepitan logam di atas, lubang ring binder di kiri, tiap alasan
              jadi item checklist. Konsisten dengan nuansa produksi/QC herbal,
              dan beda dari pola tag, stempel, chat, nota, & filmstrip di
              section lain. */}
          <Reveal delay={0.08}>
            <div className="relative mt-4 rounded-[3px] border border-forest/15 bg-white pb-2 pl-9 pr-6 pt-9 shadow-[0_14px_36px_-16px_rgba(28,44,34,0.3)] md:pl-11 md:pr-8">
              {/* Jepitan logam clipboard */}
              <div
                aria-hidden="true"
                className="absolute left-1/2 top-0 h-6 w-24 -translate-x-1/2 -translate-y-1/2 rounded-[4px] bg-gradient-to-b from-[#d9d9d4] via-[#a8a8a2] to-[#8a8a84] shadow-[0_2px_6px_rgba(0,0,0,0.35)]"
              >
                <div className="absolute left-1/2 top-1/2 h-2 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#6f6f6a]" />
              </div>

              {/* Lubang ring binder di margin kiri — strip mask berulang
                  (teknik sama seperti sprocket film & tepi nota), jadi
                  otomatis rapi ngikutin tinggi card berapa pun, gak
                  "nyasar" ke tengah teks seperti versi 3-titik sebelumnya. */}
              <div
                aria-hidden="true"
                className="absolute bottom-6 left-3 top-9 w-3 md:left-4"
                style={{
                  WebkitMaskImage:
                    "radial-gradient(circle at 6px 8px, transparent 4px, black 4.5px)",
                  maskImage:
                    "radial-gradient(circle at 6px 8px, transparent 4px, black 4.5px)",
                  WebkitMaskSize: "12px 26px",
                  maskSize: "12px 26px",
                  WebkitMaskRepeat: "repeat-y",
                  maskRepeat: "repeat-y",
                  backgroundColor: "rgba(27,67,50,0.12)",
                }}
              />

              {/* Judul lembar, ala kop dokumen QC */}
              <div className="mb-1 border-b border-dashed border-forest/20 pb-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-gold">
                  Lembar Jaminan Mutu
                </p>
              </div>

              <div className="divide-y divide-dashed divide-forest/15">
                {REASONS.map((reason, i) => (
                  <Reveal key={reason.title} delay={0.14 + i * 0.08}>
                    <div className="flex items-start gap-4 py-5">
                      {/* Checkbox tercentang */}
                      <span
                        aria-hidden="true"
                        className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-[3px] border-2 border-forest bg-forest text-cream"
                      >
                        <svg
                          viewBox="0 0 16 16"
                          className="h-3.5 w-3.5"
                          fill="none"
                        >
                          <path
                            d="M3 8.5L6.2 11.5L13 4.5"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
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
          </Reveal>
        </div>
      </div>
    </section>
  );
}
