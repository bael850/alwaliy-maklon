import { useEffect, useState, type CSSProperties } from "react";
import {
  BadgeCheck,
  ShieldCheck,
  Factory,
  Scale,
  Check,
  X,
} from "lucide-react";
import Reveal from "../Reveal";
import SmartImage from "../SmartImage";

interface CertItem {
  id: string;
  title: string;
  issuer: string;
  icon: typeof BadgeCheck;
  desc: string;
  /**
   * PLACEHOLDER — path TANPA ekstensi ke public/images/certifications/<nama>.
   * Taruh file di public/images/certifications/<nama>.webp (atau .jpg / .png,
   * bebas salah satu) — otomatis kedeteksi, gak perlu ubah kode ini.
   */
  imageBase?: string;
  note: string;
  /** Teks pendek yang melingkar di cincin luar stempel — ganti sesuai istilah resmi tiap sertifikat. */
  ringText: string;
}

const CERTS: CertItem[] = [
  {
    id: "halal-mui",
    title: "Halal MUI / BPJPH",
    issuer: "Majelis Ulama Indonesia / BPJPH",
    icon: BadgeCheck,
    imageBase: "/images/certifications/halal-mui",
    desc: "Sertifikasi halal resmi dari Majelis Ulama Indonesia dan Badan Penyelenggara Jaminan Produk Halal.",
    note: "Nomor sertifikat & masa berlaku akan ditampilkan di sini setelah scan dokumen tersedia.",
    ringText: "• SERTIFIKAT HALAL RESMI",
  },
  {
    id: "bpom",
    title: "Terdaftar BPOM",
    issuer: "Badan Pengawas Obat dan Makanan RI",
    icon: ShieldCheck,
    imageBase: "/images/certifications/bpom",
    desc: "Produk melalui evaluasi dan terdaftar di Badan Pengawas Obat dan Makanan Republik Indonesia.",
    note: "Nomor registrasi BPOM akan ditampilkan di sini setelah scan dokumen tersedia.",
    ringText: "• TERDAFTAR & DIAWASI",
  },
  {
    id: "cpotb",
    title: "Standar CPOTB",
    issuer: "Cara Pembuatan Obat Tradisional yang Baik",
    icon: Factory,
    imageBase: "/images/certifications/cpotb",
    desc: "Memenuhi Cara Pembuatan Obat Tradisional yang Baik — standar produksi herbal tertinggi di Indonesia.",
    note: "Detail sertifikasi fasilitas akan ditampilkan di sini setelah scan dokumen tersedia.",
    ringText: "• STANDAR PRODUKSI RESMI",
  },
  {
    id: "legalitas",
    title: "Badan Hukum Resmi",
    issuer: "CV Al-Waliy Sejahtera",
    icon: Scale,
    imageBase: "/images/certifications/legalitas",
    desc: "CV Al-Waliy Sejahtera terdaftar sebagai badan hukum resmi dengan legalitas usaha lengkap.",
    note: "Dokumen legalitas usaha akan ditampilkan di sini setelah scan dokumen tersedia.",
    ringText: "• BADAN HUKUM TERDAFTAR",
  },
];

const ARABIC_QUOTE =
  "كَانَ النَّبِيُّ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ يُعْجِبُهُ الْحَلْوَاءُ وَالْعَسَلُ";

// Tiap stempel dikasih rotasi & offset vertikal beda-beda — biar berasa
// "dicap tangan satu-satu" (gak pernah presisi sejajar), bukan hasil print
// komputer yang simetris sempurna.
const SEAL_ROTATIONS = [-5, 4, -3, 6];

function CertSeal({ cert, index }: { cert: CertItem; index: number }) {
  const rot = SEAL_ROTATIONS[index % SEAL_ROTATIONS.length];
  const pathId = `seal-ring-${cert.id}`;

  return (
    <div
      className="group flex flex-col items-center"
      style={{ "--rot": `${rot}deg` } as CSSProperties}
    >
      <div className="relative h-32 w-32 rotate-[var(--rot)] transition-transform duration-500 ease-out group-hover:rotate-0 md:h-36 md:w-36">
        {/* Cincin luar — border ganda ala stempel/notaris resmi */}
        <div className="absolute inset-0 rounded-full border-[3px] border-gold" />
        <div className="absolute inset-[7px] rounded-full border border-dashed border-cream/40" />

        {/* Teks melengkung di sepanjang cincin — motif "stempel resmi" */}
        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 h-full w-full"
          aria-hidden="true"
        >
          <defs>
            <path
              id={pathId}
              d="M 50,50 m -40,0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0"
            />
          </defs>
          <text
            fontSize="6.2"
            fill="currentColor"
            letterSpacing="1.5"
            className="fill-cream/70 font-heading font-semibold uppercase"
          >
            <textPath href={`#${pathId}`} startOffset="2%">
              {cert.ringText.repeat(2)}
            </textPath>
          </text>
        </svg>

        {/* Badge/logo tengah */}
        <div className="absolute inset-[16px] flex items-center justify-center overflow-hidden rounded-full bg-cream p-3 md:inset-[18px]">
          {cert.imageBase ? (
            <SmartImage
              basePath={cert.imageBase}
              alt={cert.title}
              className="h-full w-full object-contain"
              fallback={
                <cert.icon size={26} strokeWidth={2} className="text-forest" />
              }
            />
          ) : (
            <cert.icon size={26} strokeWidth={2} className="text-forest" />
          )}
        </div>

        {/* Overlay "cap disetujui" — nempel di sudut, kayak stempel verifikasi kedua */}
        <div className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full border-2 border-forest bg-gold text-forest shadow-[0_2px_6px_rgba(0,0,0,0.25)]">
          <Check size={15} strokeWidth={3} />
        </div>
      </div>

      <h3 className="mt-5 max-w-[10rem] text-center font-heading text-sm font-bold text-cream md:text-base">
        {cert.title}
      </h3>
      <p className="mt-1 max-w-[11rem] text-center text-xs leading-relaxed text-cream/50">
        {cert.desc}
      </p>
    </div>
  );
}

export default function Certifications() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const activeItem = CERTS.find((c) => c.id === activeId) ?? null;

  // Body-scroll lock robust: position:fixed + simpan posisi scroll, biar
  // (a) gak ada scroll-chaining ke halaman belakang, dan (b) posisi scroll
  // user gak "loncat" ke atas begitu modal ditutup.
  useEffect(() => {
    if (!activeItem) return;

    const scrollY = window.scrollY;
    const { style } = document.body;
    style.position = "fixed";
    style.top = `-${scrollY}px`;
    style.left = "0";
    style.right = "0";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveId(null);
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      style.position = "";
      style.top = "";
      style.left = "";
      style.right = "";
      window.scrollTo(0, scrollY);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeItem]);

  return (
    <section id="sertifikasi" className="bg-forest py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <p
            dir="rtl"
            className="mb-6 text-center font-heading text-sm text-gold-light/80 md:text-base"
          >
            {ARABIC_QUOTE}
          </p>

          <div className="mb-16 max-w-2xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-gold-light">
              Legalitas &amp; Standar
            </p>
            <h2 className="font-heading text-3xl font-extrabold leading-tight text-cream md:text-4xl">
              Bukan Sekadar Klaim — Ini Jaminan Tertulis
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-cream/70 md:text-base">
              Tiap sertifikat adalah dokumen resmi yang bisa diverifikasi —
              ketuk stempelnya untuk lihat detail.
            </p>
          </div>
        </Reveal>

        {/* Garis putus-putus di belakang barisan stempel — kayak baris tanda
            tangan/cap di dokumen resmi, cuma keliatan di desktop biar gak
            berantakan pas kartu ke-stack vertikal di mobile. */}
        <div className="relative">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-0 right-0 top-16 hidden h-px md:block md:top-[4.5rem]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(to right, rgba(250,248,244,0.18) 0 6px, transparent 6px 16px)",
            }}
          />
          <div className="relative flex flex-wrap justify-center gap-x-10 gap-y-14 md:gap-x-14">
            {CERTS.map((cert, i) => (
              <Reveal key={cert.id} delay={i * 0.08}>
                <button
                  type="button"
                  onClick={() => setActiveId(cert.id)}
                  aria-label={`Lihat detail ${cert.title}`}
                  className="rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
                >
                  <CertSeal cert={cert} index={i} />
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {activeItem && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm sm:p-5"
          onClick={() => setActiveId(null)}
        >
          {/* Mobile: full-screen (h-full, tanpa rounded).
              Desktop (sm:): card di tengah, max-height 85vh. */}
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="certificate-modal-title"
            onClick={(e) => e.stopPropagation()}
            className="relative flex h-full w-full flex-col overflow-hidden bg-white sm:h-auto sm:max-h-[85vh] sm:w-full sm:max-w-md sm:rounded-[4px]"
          >
            {/* Header sticky — tombol close SELALU keliatan & gak ikut discroll */}
            <div className="flex shrink-0 items-center justify-between gap-4 border-b border-forest/10 px-5 py-3.5">
              <h3
                id="certificate-modal-title"
                className="font-heading text-sm font-bold text-forest md:text-base"
              >
                {activeItem.title}
              </h3>
              <button
                type="button"
                onClick={() => setActiveId(null)}
                aria-label="Tutup"
                className="-mr-2 flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-forest/60 transition-colors hover:bg-forest/5 hover:text-forest active:bg-forest/10"
              >
                <X size={22} />
              </button>
            </div>

            {/* Konten scrollable — overscroll-contain biar scroll berhenti
                di sini, gak "bocor" nge-scroll halaman di belakangnya. */}
            <div
              data-lenis-prevent
              className="flex-1 overflow-y-auto overscroll-contain p-5 md:p-8"
            >
              <div className="mb-5 flex aspect-[3/4] items-center justify-center overflow-hidden rounded-[4px] bg-forest/5 p-6">
                {activeItem.imageBase ? (
                  <SmartImage
                    basePath={activeItem.imageBase}
                    alt={activeItem.title}
                    className="h-full w-full object-contain"
                    fallback={
                      <activeItem.icon
                        size={64}
                        strokeWidth={1.5}
                        className="text-forest/40"
                      />
                    }
                  />
                ) : (
                  <activeItem.icon
                    size={64}
                    strokeWidth={1.5}
                    className="text-forest/40"
                  />
                )}
              </div>

              <p className="text-sm text-ink/60">{activeItem.issuer}</p>
              <p className="mt-3 text-sm leading-relaxed text-ink/70">
                {activeItem.desc}
              </p>
              <p className="mt-3 border-t border-forest/10 pt-3 text-xs leading-relaxed text-ink/50">
                {activeItem.note}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
