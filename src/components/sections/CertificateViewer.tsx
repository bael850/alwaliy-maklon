import { useEffect, useState } from "react";
import {
  BadgeCheck,
  ShieldCheck,
  Factory,
  Scale,
  X,
  type LucideIcon,
} from "lucide-react";
import Reveal from "../Reveal";

interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  icon: LucideIcon;
  /** PLACEHOLDER — isi dengan hasil import scan/foto sertifikat asli begitu tersedia. */
  image?: string;
  note: string;
}

const CERTIFICATES: CertificateItem[] = [
  {
    id: "halal-mui",
    title: "Sertifikat Halal MUI",
    issuer: "Majelis Ulama Indonesia / BPJPH",
    icon: BadgeCheck,
    note: "Nomor sertifikat & masa berlaku akan ditampilkan di sini setelah scan dokumen tersedia.",
  },
  {
    id: "bpom",
    title: "Izin Edar BPOM",
    issuer: "Badan Pengawas Obat dan Makanan RI",
    icon: ShieldCheck,
    note: "Nomor registrasi BPOM akan ditampilkan di sini setelah scan dokumen tersedia.",
  },
  {
    id: "cpotb",
    title: "Sertifikat CPOTB",
    issuer: "Cara Pembuatan Obat Tradisional yang Baik",
    icon: Factory,
    note: "Detail sertifikasi fasilitas akan ditampilkan di sini setelah scan dokumen tersedia.",
  },
  {
    id: "legalitas",
    title: "Legalitas Badan Usaha",
    issuer: "CV Al-Waliy Sejahtera",
    icon: Scale,
    note: "Dokumen legalitas usaha akan ditampilkan di sini setelah scan dokumen tersedia.",
  },
];

export default function CertificateViewer() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const activeItem = CERTIFICATES.find((c) => c.id === activeId) ?? null;

  // Body-scroll lock yang lebih robust: pakai position:fixed + simpan posisi
  // scroll, biar (a) gak ada scroll-chaining ke halaman belakang, dan
  // (b) posisi scroll user gak "loncat" ke atas begitu modal ditutup.
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
    <section className="bg-cream py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <div className="mb-10 max-w-2xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-gold">
              Dokumen Legalitas
            </p>
            <h2 className="font-heading text-3xl font-extrabold leading-tight text-forest md:text-4xl">
              Sertifikat Asli, Bukan Sekadar Klaim
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-ink/70 md:text-base">
              Klik tiap sertifikat untuk melihat lebih detail.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {CERTIFICATES.map((cert, i) => (
            <Reveal key={cert.id} delay={i * 0.08}>
              <button
                type="button"
                onClick={() => setActiveId(cert.id)}
                className="group flex w-full flex-col overflow-hidden rounded-[4px] border border-forest/10 bg-white text-left transition-colors hover:border-gold"
              >
                <div className="flex aspect-[3/4] items-center justify-center overflow-hidden bg-forest/5 transition-colors group-hover:bg-forest/10">
                  {cert.image ? (
                    <img
                      src={cert.image}
                      alt={cert.title}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <cert.icon
                      size={40}
                      strokeWidth={1.5}
                      className="text-forest/40"
                    />
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-heading text-sm font-bold text-forest">
                    {cert.title}
                  </h3>
                  <p className="mt-1 text-xs text-ink/60">{cert.issuer}</p>
                </div>
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
                {activeItem.note}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
