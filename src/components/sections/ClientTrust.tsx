import { Building2, Check, CheckCheck } from "lucide-react";
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

/**
 * PLACEHOLDER — semua kutipan, nama, dan jam di bawah ini contoh, BUKAN testimoni asli.
 * Ganti dengan kutipan nyata dari klien maklon (dengan izin) sebelum publish live.
 * `time` sengaja dibuat variatif biar chat kelihatan natural, bukan seragam.
 */
const TESTIMONIALS = [
  {
    quote:
      "Prosesnya jelas dari awal, mulai dari formulasi sampai legalitas selesai lebih cepat dari perkiraan kami.",
    name: "Nama Klien",
    role: "Founder, Brand Herbal (Placeholder)",
    time: "09.14",
  },
  {
    quote:
      "Support desain kemasan sangat membantu karena tim kami tidak perlu cari vendor terpisah.",
    name: "Nama Klien",
    role: "Owner, Brand Madu (Placeholder)",
    time: "14.02",
  },
  {
    quote:
      "Komunikasinya responsif, dan hasil produksinya konsisten setiap batch.",
    name: "Nama Klien",
    role: "Marketing Manager, Brand Suplemen (Placeholder)",
    time: "20.47",
  },
];

// Warna dipetik dari palet WA asli tapi diredam dikit biar tetap nyatu
// dengan tema forest/gold/cream di seluruh situs, bukan norak hijau terang.
const WA_GREEN = "#3EA872"; // bubble outgoing / aksen centang
const WA_TEAL_DARK = "#0B3D2E"; // header chat, senada forest

export default function ClientTrust() {
  return (
    <section className="bg-forest py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        {/* Logo strip */}
        <Reveal>
          <p className="mb-8 text-center text-sm font-semibold uppercase tracking-[0.14em] text-gold-light">
            Sudah Dipercaya Brand-Brand Berikut
          </p>
        </Reveal>
        <Reveal delay={0.06}>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-5">
            {CLIENTS.map((client) => (
              <div
                key={client.name}
                className="flex h-16 w-40 items-center justify-center gap-2 rounded-[4px] border border-cream/15 opacity-70 grayscale transition-all hover:opacity-100 hover:grayscale-0"
              >
                {/* Placeholder ikon — ganti dengan <img src={client.logo} alt={client.name}
                    className="h-full w-full object-contain p-3" /> begitu logo asli siap */}
                <Building2
                  size={18}
                  strokeWidth={1.75}
                  className="text-cream/60"
                />
                <span className="text-xs font-medium text-cream/60">
                  {client.name}
                </span>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Testimoni — dibungkus jadi "jendela chat WhatsApp" karena kanal
            komunikasi utama bisnis ini memang WA. Header kontak + bubble
            pesan masuk lengkap dengan nama pengirim, jam, dan centang biru. */}
        <div className="mt-16 border-t border-cream/10 pt-14">
          <Reveal>
            <div className="mb-12 max-w-2xl">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-gold-light">
                Kata Mitra Kami
              </p>
              <h2 className="font-heading text-3xl font-extrabold leading-tight text-cream md:text-4xl">
                Pengalaman Brand yang Sudah Bermitra
              </h2>
            </div>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((t, i) => (
              <Reveal key={t.name + i} delay={i * 0.1}>
                <div
                  className="flex h-full flex-col overflow-hidden rounded-[10px] border border-cream/15 shadow-lg"
                  role="group"
                  aria-label={`Testimoni dari ${t.name}`}
                >
                  {/* Header ala kontak WhatsApp */}
                  <div
                    className="flex items-center gap-2.5 px-4 py-3"
                    style={{ backgroundColor: WA_TEAL_DARK }}
                  >
                    <div
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold text-cream"
                      style={{ backgroundColor: WA_GREEN }}
                      aria-hidden="true"
                    >
                      {t.name
                        .split(" ")
                        .map((w) => w[0])
                        .join("")
                        .slice(0, 2)
                        .toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-cream">
                        {t.name}
                      </p>
                      <p className="truncate text-[11px] text-cream/55">
                        {t.role}
                      </p>
                    </div>
                  </div>

                  {/* Area chat — background bertekstur titik halus meniru
                      wallpaper WA, tanpa perlu file gambar eksternal. */}
                  <div
                    className="flex-1 px-3 py-5"
                    style={{
                      backgroundColor: "#0E241C",
                      backgroundImage:
                        "radial-gradient(rgba(245,240,230,0.05) 1px, transparent 1px)",
                      backgroundSize: "14px 14px",
                    }}
                  >
                    <div className="relative max-w-[92%] rounded-lg rounded-tl-none bg-cream/95 px-3 py-2.5 shadow-sm">
                      {/* ekor bubble */}
                      <span
                        className="absolute -left-[7px] top-0 h-0 w-0 border-b-[8px] border-r-[8px] border-b-transparent"
                        style={{ borderRightColor: "rgba(245,240,230,0.95)" }}
                        aria-hidden="true"
                      />
                      <p className="text-[13.5px] leading-relaxed text-forest">
                        {t.quote}
                      </p>
                      <div className="mt-1.5 flex items-center justify-end gap-1">
                        <span className="text-[10.5px] text-forest/45">
                          {t.time}
                        </span>
                        <CheckCheck
                          size={14}
                          strokeWidth={2.25}
                          style={{ color: "#34B7F1" }}
                          aria-hidden="true"
                        />
                      </div>
                    </div>
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
