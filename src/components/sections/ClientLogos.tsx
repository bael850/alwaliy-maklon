import { Building2 } from "lucide-react";
import Reveal from "../Reveal";

/**
 * PLACEHOLDER — JANGAN PUBLISH LIVE SEBELUM ADA IZIN TERTULIS DARI KLIEN.
 * Ganti tiap entry di bawah dengan { name: "Nama Brand", logo: importedLogoImage }
 * begitu logo asli tersedia DAN izin publikasi sudah didapat dari klien terkait.
 * Menampilkan logo pihak lain tanpa izin bisa jadi masalah merek dagang/endorsement.
 */
const CLIENTS = [
  { name: "Mitra Maklon 1" },
  { name: "Mitra Maklon 2" },
  { name: "Mitra Maklon 3" },
  { name: "Mitra Maklon 4" },
  { name: "Mitra Maklon 5" },
  { name: "Mitra Maklon 6" },
];

export default function ClientLogos() {
  return (
    <div className="border-y border-forest/10 bg-white py-14 md:py-16">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <p className="mb-8 text-center text-sm font-semibold uppercase tracking-[0.14em] text-gold">
            Sudah Dipercaya Brand-Brand Berikut
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-5">
            {CLIENTS.map((client) => (
              <div
                key={client.name}
                className="flex h-16 w-40 items-center justify-center gap-2 rounded-[4px] border border-forest/10 opacity-60 grayscale transition-all hover:opacity-100 hover:grayscale-0"
              >
                {/* Placeholder ikon — ganti dengan <img src={client.logo} alt={client.name}
                    className="h-full w-full object-contain p-3" /> begitu logo asli siap */}
                <Building2
                  size={18}
                  strokeWidth={1.75}
                  className="text-forest/50"
                />
                <span className="text-xs font-medium text-forest/50">
                  {client.name}
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </div>
  );
}
