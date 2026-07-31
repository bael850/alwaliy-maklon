import { useEffect, useState } from "react";
import {
  Building2,
  Factory,
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
  {
    id: "alat-produksi",
    category: "Peralatan",
    title: "Alat & Mesin Produksi",
    icon: Factory,
    description:
      "Peralatan produksi untuk mengolah bahan baku herbal dan madu menjadi produk jadi, mulai dari pencampuran, pemasakan, hingga pengisian ke kemasan.",
    specs: [
      { label: "Kapasitas", value: "Detail akan diperbarui" },
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

  useEffect(() => {
    if (!activeItem) return;

    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveId(null);
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
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
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-5 backdrop-blur-sm"
          onClick={() => setActiveId(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="facility-modal-title"
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-[4px] bg-white p-6 md:p-8"
          >
            <button
              type="button"
              onClick={() => setActiveId(null)}
              aria-label="Tutup"
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-[4px] text-forest/50 transition-colors hover:bg-forest/5 hover:text-forest"
            >
              <X size={20} />
            </button>

            <div className="mb-5 flex aspect-[4/3] items-center justify-center overflow-hidden rounded-[4px] bg-forest/5">
              {activeItem.image ? (
                <img
                  src={activeItem.image}
                  alt={activeItem.title}
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

            <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-gold">
              {activeItem.category}
            </p>
            <h3
              id="facility-modal-title"
              className="mt-1 font-heading text-xl font-bold text-forest"
            >
              {activeItem.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-ink/70">
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
      )}
    </section>
  );
}
