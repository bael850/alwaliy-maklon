import { useEffect, useState } from "react";
import { BadgeCheck, ShieldCheck, Factory, Scale, X } from "lucide-react";
import Reveal from "../Reveal";
import halalImg from "../../assets/certificates/halal-mui.png";
import bpomImg from "../../assets/certificates/bpom.png";
import cpotbImg from "../../assets/certificates/cpotb.png";

interface CertItem {
  id: string;
  title: string;
  issuer: string;
  icon: typeof BadgeCheck;
  desc: string;
  /** PLACEHOLDER — isi dengan hasil import scan/foto sertifikat asli begitu tersedia. */
  image?: string;
  note: string;
}

const CERTS: CertItem[] = [
  {
    id: "halal-mui",
    title: "Halal MUI / BPJPH",
    issuer: "Majelis Ulama Indonesia / BPJPH",
    icon: BadgeCheck,
    image: halalImg,
    desc: "Sertifikasi halal resmi dari Majelis Ulama Indonesia dan Badan Penyelenggara Jaminan Produk Halal.",
    note: "Nomor sertifikat & masa berlaku akan ditampilkan di sini setelah scan dokumen tersedia.",
  },
  {
    id: "bpom",
    title: "Terdaftar BPOM",
    issuer: "Badan Pengawas Obat dan Makanan RI",
    icon: ShieldCheck,
    image: bpomImg,
    desc: "Produk melalui evaluasi dan terdaftar di Badan Pengawas Obat dan Makanan Republik Indonesia.",
    note: "Nomor registrasi BPOM akan ditampilkan di sini setelah scan dokumen tersedia.",
  },
  {
    id: "cpotb",
    title: "Standar CPOTB",
    issuer: "Cara Pembuatan Obat Tradisional yang Baik",
    icon: Factory,
    image: cpotbImg,
    desc: "Memenuhi Cara Pembuatan Obat Tradisional yang Baik — standar produksi herbal tertinggi di Indonesia.",
    note: "Detail sertifikasi fasilitas akan ditampilkan di sini setelah scan dokumen tersedia.",
  },
  {
    id: "legalitas",
    title: "Badan Hukum Resmi",
    issuer: "CV Al-Waliy Sejahtera",
    icon: Scale,
    desc: "CV Al-Waliy Sejahtera terdaftar sebagai badan hukum resmi dengan legalitas usaha lengkap.",
    note: "Dokumen legalitas usaha akan ditampilkan di sini setelah scan dokumen tersedia.",
  },
];

const ARABIC_QUOTE =
  "كَانَ النَّبِيُّ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ يُعْجِبُهُ الْحَلْوَاءُ وَالْعَسَلُ";

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

          <div className="mb-12 max-w-2xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-gold-light">
              Legalitas &amp; Standar
            </p>
            <h2 className="font-heading text-3xl font-extrabold leading-tight text-cream md:text-4xl">
              Bukan Sekadar Klaim — Ini Jaminan Tertulis
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-cream/70 md:text-base">
              Klik tiap sertifikat untuk melihat detailnya.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {CERTS.map((cert, i) => (
            <Reveal key={cert.id} delay={i * 0.06}>
              <button
                type="button"
                onClick={() => setActiveId(cert.id)}
                className="group flex h-full w-full flex-col rounded-[4px] border border-cream/15 bg-forest-light/40 p-6 text-left transition-colors hover:border-gold"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center overflow-hidden rounded-[4px] bg-gold text-forest">
                  {cert.image ? (
                    <img
                      src={cert.image}
                      alt={cert.title}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <cert.icon size={20} strokeWidth={2} />
                  )}
                </div>
                <h3 className="font-heading text-base font-bold text-cream">
                  {cert.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-cream/70">
                  {cert.desc}
                </p>
              </button>
            </Reveal>
          ))}
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
              <div className="mb-5 flex aspect-[3/4] items-center justify-center overflow-hidden rounded-[4px] bg-forest/5">
                {activeItem.image ? (
                  <img
                    src={activeItem.image}
                    alt={activeItem.title}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
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
