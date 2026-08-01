import { useEffect, useState } from "react";
import {
  Building2,
  Blend,
  Droplets,
  FlaskConical,
  PackageCheck,
  Shirt,
  Tag,
  X,
  type LucideIcon,
} from "lucide-react";
import Reveal from "../Reveal";

interface FacilitySpec {
  label: string;
  value: string;
}

interface FacilityItem {
  id: string;
  category: string;
  title: string;
  icon: LucideIcon;
  /**
   * PLACEHOLDER ASET — kosongkan/undefined = tampil ikon generik.
   * Begitu foto asli tersedia: import gambarnya (mis. dari src/assets/facility/...)
   * lalu isi field ini dengan hasil import tsb. Kartu & modal otomatis pakai <img>
   * begitu field ini terisi, tidak perlu ubah struktur lain.
   */
  image?: string;
  description: string;
  specs: FacilitySpec[];
}

const FACILITY_ITEMS: FacilityItem[] = [
  {
    id: "gedung",
    category: "Fasilitas",
    title: "Gedung Produksi",
    icon: Building2,
    description:
      "Bangunan produksi milik sendiri di Bekasi, dirancang mengikuti alur produksi satu arah sesuai standar CPOTB — dari penerimaan bahan baku sampai gudang produk jadi.",
    specs: [
      { label: "Lokasi", value: "Tambun Selatan, Bekasi" },
      { label: "Standar", value: "CPOTB" },
    ],
  },

  /* ── "Alat Tempur" produksi — dipecah per mesin, masing-masing punya
     spek sendiri, biar keliatan konkret ke calon klien (bukan cuma
     klaim generik "punya alat produksi"). Tambah mesin lain di masa
     depan tinggal duplikat pola item di bawah ini. ── */
  {
    id: "mesin-mixing",
    category: "Peralatan",
    title: "Mesin Mixing",
    icon: Blend,
    description:
      "Mesin pencampur untuk mengolah dan menghomogenkan bahan baku herbal maupun madu sebelum masuk tahap pengisian, memastikan komposisi tiap batch konsisten.",
    specs: [
      { label: "Kapasitas", value: "Detail akan diperbarui" },
      { label: "Fungsi", value: "Homogenisasi bahan baku" },
      { label: "Perawatan", value: "Terjadwal & terdokumentasi" },
    ],
  },
  {
    id: "mesin-filling",
    category: "Peralatan",
    title: "Mesin Filling",
    icon: Droplets,
    description:
      "Mesin pengisian untuk menuang produk cair, madu, maupun serbuk ke dalam kemasan secara presisi dan higienis, menjaga takaran tiap unit tetap konsisten.",
    specs: [
      { label: "Kapasitas", value: "Detail akan diperbarui" },
      { label: "Fungsi", value: "Pengisian ke kemasan" },
      { label: "Perawatan", value: "Terjadwal & terdokumentasi" },
    ],
  },

  {
    id: "ruang-penuangan",
    category: "Ruang Produksi",
    title: "Ruang Penuangan (Filling)",
    icon: FlaskConical,
    description:
      "Ruang khusus untuk proses penuangan produk cair dan madu ke dalam kemasan, dijaga kebersihan dan suhunya sesuai standar CPOTB.",
    specs: [
      { label: "Standar", value: "CPOTB" },
      { label: "Kebersihan", value: "Terpantau berkala" },
    ],
  },
  {
    id: "ruang-pengemasan",
    category: "Ruang Produksi",
    title: "Ruang Pengemasan",
    icon: PackageCheck,
    description:
      "Ruang tempat produk jadi dikemas dan diberi label sebelum masuk tahap penyimpanan dan distribusi ke mitra.",
    specs: [
      { label: "Standar", value: "CPOTB" },
      { label: "Pengecekan", value: "Quality control per batch" },
    ],
  },
  {
    id: "pakaian-produksi",
    category: "Standar Kerja",
    title: "Pakaian & APD Produksi",
    icon: Shirt,
    description:
      "Seluruh staf produksi menggunakan pakaian dan alat pelindung diri (APD) sesuai standar higienitas produksi herbal.",
    specs: [
      { label: "Kelengkapan", value: "Masker, sarung tangan, penutup kepala" },
    ],
  },
  {
    id: "stiker-label",
    category: "Kemasan",
    title: "Stiker & Label Kemasan",
    icon: Tag,
    description:
      "Label kemasan mencantumkan informasi produk, legalitas (BPOM/Halal), dan identitas brand sesuai kebutuhan mitra maklon.",
    specs: [{ label: "Kustomisasi", value: "Sesuai identitas brand mitra" }],
  },
];

export default function FacilityGallery() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const activeItem =
    FACILITY_ITEMS.find((item) => item.id === activeId) ?? null;

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
    <section id="fasilitas" className="bg-cream py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <div className="mb-10 max-w-2xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-gold">
              Fasilitas Kami
            </p>
            <h2 className="font-heading text-3xl font-extrabold leading-tight text-forest md:text-4xl">
              Lihat Langsung Tempat Produk Anda Dibuat
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-ink/70 md:text-base">
              Klik tiap foto untuk lihat detail dan spesifikasinya.
            </p>
          </div>
        </Reveal>
      </div>

      {/* Scroll horizontal — full-bleed dari max-w container biar leluasa di mobile */}
      <Reveal delay={0.1}>
        <div className="hide-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 md:px-8">
          {FACILITY_ITEMS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveId(item.id)}
              className="group w-64 shrink-0 snap-start overflow-hidden rounded-[4px] border border-forest/10 bg-white text-left transition-colors hover:border-gold md:w-72"
            >
              <div className="flex aspect-[4/3] items-center justify-center overflow-hidden bg-forest/5 transition-colors group-hover:bg-forest/10">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <item.icon
                    size={36}
                    strokeWidth={1.5}
                    className="text-forest/40"
                  />
                )}
              </div>
              <div className="p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-gold">
                  {item.category}
                </p>
                <h3 className="mt-1 font-heading text-base font-bold text-forest">
                  {item.title}
                </h3>
              </div>
            </button>
          ))}
        </div>
      </Reveal>

      {/* Modal detail */}
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
            aria-labelledby="facility-modal-title"
            onClick={(e) => e.stopPropagation()}
            className="relative flex h-full w-full flex-col overflow-hidden bg-white sm:h-auto sm:max-h-[85vh] sm:w-full sm:max-w-lg sm:rounded-[4px]"
          >
            {/* Header sticky — tombol close SELALU keliatan & gak ikut discroll */}
            <div className="flex shrink-0 items-center justify-between gap-4 border-b border-forest/10 px-5 py-3.5">
              <div className="min-w-0">
                <p className="truncate text-[11px] font-semibold uppercase tracking-[0.1em] text-gold">
                  {activeItem.category}
                </p>
                <h3
                  id="facility-modal-title"
                  className="truncate font-heading text-sm font-bold text-forest md:text-base"
                >
                  {activeItem.title}
                </h3>
              </div>
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
              <div className="mb-5 flex aspect-[4/3] items-center justify-center overflow-hidden rounded-[4px] bg-forest/5">
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
                    size={56}
                    strokeWidth={1.5}
                    className="text-forest/40"
                  />
                )}
              </div>

              <p className="text-sm leading-relaxed text-ink/70">
                {activeItem.description}
              </p>

              <dl className="mt-5 space-y-2 border-t border-forest/10 pt-4">
                {activeItem.specs.map((spec) => (
                  <div
                    key={spec.label}
                    className="flex justify-between gap-4 text-sm"
                  >
                    <dt className="font-medium text-ink/50">{spec.label}</dt>
                    <dd className="text-right font-semibold text-forest">
                      {spec.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
