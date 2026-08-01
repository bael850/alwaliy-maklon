import {
  Building2,
  ShieldCheck,
  Users,
  DoorOpen,
  type LucideIcon,
} from "lucide-react";
import Reveal from "../Reveal";
import SmartImage from "../SmartImage";

interface AboutPhoto {
  id: string;
  label: string;
  icon: LucideIcon;
  /**
   * PLACEHOLDER — path TANPA ekstensi ke public/images/about/<nama>.
   * Taruh file di public/images/about/<nama>.webp (atau .jpg / .png, bebas
   * salah satu) — otomatis kedeteksi, gak perlu ubah kode ini.
   */
  imageBase: string;
}

// Foto besar (kiri) + 2 foto kecil (kanan) — sesuaikan label & urutan
// sesuai foto yang tersedia (gedung, interior, lobby, tim, dll).
const MAIN_PHOTO: AboutPhoto = {
  id: "gedung",
  label: "Gedung Produksi",
  icon: Building2,
  imageBase: "/images/about/gedung",
};

const SIDE_PHOTOS: AboutPhoto[] = [
  {
    id: "interior",
    label: "Interior & Ruang Kerja",
    icon: DoorOpen,
    imageBase: "/images/about/interior",
  },
  {
    id: "tim",
    label: "Tim Al-Waliy",
    icon: Users,
    imageBase: "/images/about/tim",
  },
];

const FACTS = [
  {
    icon: Building2,
    title: "Berdiri Sejak 2014",
    desc: "Memproduksi madu herbal & sari kurma di fasilitas berstandar CPOTB, Bekasi.",
  },
  {
    icon: ShieldCheck,
    title: "Legalitas Terverifikasi",
    desc: "Sertifikasi Halal MUI & BPJPH yang dapat diverifikasi publik, terdaftar BPOM.",
  },
  {
    icon: Users,
    title: "Dipercaya Banyak Mitra",
    desc: "Melayani konsumen akhir, reseller, dan mitra maklon di seluruh Indonesia.",
  },
];

/**
 * PLACEHOLDER — angka "50+ Brand Bermitra" dan "5 Jenis Kategori Produk" di bawah
 * masih perkiraan/ilustrasi. Ganti dengan angka aktual (data internal) sebelum
 * publish live, supaya klaim yang ditampilkan akurat dan bisa dipertanggungjawabkan.
 */
const STATS = [
  { value: "10+", label: "Tahun Pengalaman Produksi" },
  { value: "50+", label: "Brand Sudah Bermitra" },
  { value: "4", label: "Standar Legalitas Terpenuhi" },
  { value: "5", label: "Jenis Kategori Produk" },
];

function PhotoTile({
  photo,
  className = "",
  iconSize = 32,
}: {
  photo: AboutPhoto;
  className?: string;
  iconSize?: number;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-[4px] border border-forest/10 bg-forest/5 ${className}`}
    >
      <SmartImage
        basePath={photo.imageBase}
        alt={photo.label}
        className="h-full w-full object-cover"
        fallback={
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 p-4 text-center">
            <photo.icon
              size={iconSize}
              strokeWidth={1.5}
              className="text-forest/30"
            />
            <span className="text-[11px] font-medium uppercase tracking-[0.08em] text-forest/40">
              {photo.label}
            </span>
          </div>
        }
      />
    </div>
  );
}

export default function AboutMaklon() {
  return (
    <section id="tentang" className="bg-cream py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16 md:items-center">
          {/* Kiri: narasi */}
          <Reveal>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-gold">
              Profil Kami
            </p>
            <h2 className="font-heading text-3xl font-extrabold leading-tight text-forest md:text-4xl">
              Produsen Herbal Berpengalaman, Kini Terbuka untuk Brand Anda
            </h2>
            <p className="mt-5 text-base leading-relaxed text-ink/80 md:text-lg">
              CV Al-Waliy Sejahtera memproduksi madu herbal dan sari kurma
              premium sejak 2014. Selain melayani konsumen akhir lewat
              marketplace kami sendiri, kami juga membuka layanan{" "}
              <strong className="text-forest">maklon</strong> — memproduksi
              herbal sesuai formulasi dan kebutuhan brand Anda, dengan standar
              kualitas yang sama seperti produk kami sendiri.
            </p>
            <a
              href="#proses"
              className="mt-6 inline-flex items-center text-sm font-semibold text-forest underline underline-offset-4 hover:text-gold"
            >
              Lihat cara kerja sama kami
            </a>
          </Reveal>

          {/* Kanan: mini galeri foto — 1 foto besar + 2 foto kecil.
              PLACEHOLDER: taruh file di public/images/about/<nama>.(webp|jpg|png)
              sesuai imageBase di MAIN_PHOTO / SIDE_PHOTOS di atas — otomatis
              kedeteksi, gak perlu ubah kode. */}
          <Reveal delay={0.1}>
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              <PhotoTile
                photo={MAIN_PHOTO}
                className="col-span-2 aspect-[16/10]"
                iconSize={40}
              />
              {SIDE_PHOTOS.map((photo) => (
                <PhotoTile
                  key={photo.id}
                  photo={photo}
                  className="aspect-square"
                />
              ))}
            </div>
          </Reveal>
        </div>

        {/* Fact cards — dipindah jadi baris horizontal di bawah, biar kolom
            kanan di atas fokus buat galeri foto. */}
        <div className="mt-14 grid gap-4 sm:grid-cols-3">
          {FACTS.map((fact, i) => (
            <Reveal key={fact.title} delay={i * 0.08}>
              <div className="flex h-full gap-4 rounded-[4px] border border-forest/10 bg-white p-5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[4px] bg-forest/5 text-forest">
                  <fact.icon size={20} strokeWidth={2} />
                </div>
                <div>
                  <h3 className="font-heading text-base font-bold text-forest">
                    {fact.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink/70">
                    {fact.desc}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Stats strip */}
        <Reveal delay={0.15}>
          <div className="mt-14 grid grid-cols-2 gap-8 border-t border-forest/10 pt-12 md:grid-cols-4 md:gap-6">
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-heading text-3xl font-extrabold text-forest md:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs font-medium uppercase tracking-[0.08em] text-ink/60 md:text-sm">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
