import { Building2, ShieldCheck, Users, type LucideIcon } from "lucide-react";
import Reveal from "../Reveal";
import SmartImage from "../SmartImage";
import { useLanguage } from "../../i18n/LanguageContext";

interface AboutPhoto {
  id: string;
  icon: LucideIcon;
  /**
   * PLACEHOLDER — path TANPA ekstensi ke public/images/about/<nama>.
   * Taruh file di public/images/about/<nama>.webp (atau .jpg / .png, bebas
   * salah satu) — otomatis kedeteksi, gak perlu ubah kode ini.
   */
  imageBase: string;
}

// Satu foto hero — placeholder Interior & Tim sengaja dihapus (kosong/belum
// ada aset asli terlihat kurang matang). Tinggal tambah lagi kalau nanti ada
// foto interior/tim yang siap, ikuti pola AboutPhoto di atas.
const MAIN_PHOTO: AboutPhoto = {
  id: "gedung",
  icon: Building2,
  imageBase: "/images/about/gedung",
};

const FACT_ICONS = [Building2, ShieldCheck, Users];

/**
 * WireContinuation — "melanjutkan" kabel listrik yang kepotong di tepi kiri
 * foto gedung. Elemen ini nempel langsung ke tile foto (bukan ke baris/grid
 * secara keseluruhan) supaya posisinya selalu presisi relatif ke tepi foto,
 * berapa pun ukuran layarnya. Titik mulai garis sengaja overlap sedikit ke
 * dalam foto (masuk ke zona feather mask), biar nyambung mulus alih-alih
 * kelihatan sebagai garis terpisah yang "ngambang".
 */
function WireContinuation() {
  // Kabel nyata itu NGELENDUT (sag, kayak parabola/catenary) — bukan garis lurus
  // diagonal — dan sedikit bergoyang ketiup angin, gak diam kaku. Dua hal itu
  // yang bikin sebelumnya kerasa "digambar pakai penggaris". Di sini:
  // - Bentuk path dikasih titik lendutan di tengah (bukan cubic lurus 2 kontrol)
  // - Tiap kabel dibungkus <g> sendiri dengan animasi goyang (rotate tipis)
  //   yang durasi & delay-nya beda-beda supaya gerakannya gak seragam/robotic
  return (
    <svg
      className="pointer-events-none absolute -left-[50%] top-[8%] hidden h-[30%] w-[76%] overflow-visible text-forest md:block"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="wireFade" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0" />
          <stop offset="40%" stopColor="currentColor" stopOpacity="0.5" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.8" />
        </linearGradient>
      </defs>

      {/* Kabel 1 — ngelendut turun, lalu naik lagi dikit sebelum fade
          (pola sag kabel asli: turun-datar-turun lagi, gak monoton lurus) */}
      <g
        className="wire-sway"
        style={{ transformOrigin: "97px 30px", animationDuration: "5.5s" }}
      >
        <path
          d="M 97 30 C 84 33, 70 40, 58 42 C 46 44, 38 42, 30 46 C 20 51, 10 56, 0 58"
          fill="none"
          stroke="url(#wireFade)"
          strokeWidth="1"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          className="wire-draw-primary"
        />
      </g>

      {/* Kabel 2 — dari titik sambung sama, lendutan lebih dalam & lebih lambat
          goyangnya (durasi beda) biar gak gerak seragam kayak robot */}
      <g
        className="wire-sway"
        style={{
          transformOrigin: "97px 30px",
          animationDuration: "7.2s",
          animationDelay: "-2s",
        }}
      >
        <path
          d="M 97 30 C 82 24, 66 21, 52 24 C 40 27, 34 34, 22 33 C 12 32, 6 26, 0 22"
          fill="none"
          stroke="url(#wireFade)"
          strokeWidth="0.85"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          className="wire-draw-secondary"
        />
      </g>

      {/* Titik sambung — nandain satu titik asal yang sama (kayak di tiang) */}
      <circle cx="97" cy="30" r="0.9" fill="currentColor" opacity="0.7" />
    </svg>
  );
}

function PhotoTile({
  photo,
  label,
  className = "",
  iconSize = 32,
  signature = false,
}: {
  photo: AboutPhoto;
  label: string;
  className?: string;
  iconSize?: number;
  /** Foto "hero" mini-galeri — dapat treatment sinematik (feather + grade tipis) + lanjutan kabel. */
  signature?: boolean;
}) {
  return (
    <div className={`group relative ${className}`}>
      {/* Lanjutan kabel — nempel ke tile ini sendiri, bukan ke baris/grid */}
      {signature && <WireContinuation />}

      {/* Glow ambient di belakang — halus, cuma muncul pas hover */}
      {signature && (
        <div
          aria-hidden="true"
          className="absolute -inset-6 -z-10 rounded-[24px] bg-gradient-to-br from-gold/15 via-transparent to-forest/15 opacity-0 blur-2xl transition-opacity duration-700 group-hover:opacity-100"
        />
      )}

      <div
        className={`relative h-full w-full overflow-hidden rounded-[4px] ${
          signature ? "bg-cream" : "border border-forest/10 bg-forest/5"
        }`}
        style={
          signature
            ? {
                WebkitMaskImage:
                  "linear-gradient(to right, transparent 0%, black 8%, black 96%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 8%, black 96%, transparent 100%)",
                WebkitMaskComposite: "source-in",
                maskImage:
                  "linear-gradient(to right, transparent 0%, black 8%, black 96%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 8%, black 96%, transparent 100%)",
                maskComposite: "intersect",
              }
            : undefined
        }
      >
        <SmartImage
          basePath={photo.imageBase}
          alt={label}
          className="h-full w-full object-cover"
          fallback={
            <div className="flex h-full w-full flex-col items-center justify-center gap-2 p-4 text-center">
              <photo.icon
                size={iconSize}
                strokeWidth={1.5}
                className="text-forest/30"
              />
              <span className="text-[11px] font-medium uppercase tracking-[0.08em] text-forest/40">
                {label}
              </span>
            </div>
          }
        />

        {/* Color-grade sangat tipis — cuma nyatuin tone ke palet brand,
            sengaja dibikin ringan biar foto gak keliatan berkabut/kusam. */}
        {signature && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-forest/12 via-transparent to-gold/5 mix-blend-soft-light"
          />
        )}
      </div>
    </div>
  );
}

export default function AboutMaklon() {
  const { t } = useLanguage();

  return (
    <section id="tentang" className="bg-cream py-20 md:py-28">
      {/* Keyframe kabel "menggambar diri sendiri" — sekali jalan pas section muncul */}
      <style>{`
        .wire-draw-primary {
          stroke-dasharray: 160;
          stroke-dashoffset: 160;
          animation: wireDraw 1.8s ease-out 0.5s forwards;
        }
        .wire-draw-secondary {
          stroke-dasharray: 160;
          stroke-dashoffset: 160;
          animation: wireDraw 1.8s ease-out 0.75s forwards;
        }
        @keyframes wireDraw {
          to { stroke-dashoffset: 0; }
        }
        .wire-sway {
          animation-name: wireSway;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
          animation-direction: alternate;
        }
        @keyframes wireSway {
          0% { transform: rotate(-0.6deg) translateY(0px); }
          50% { transform: rotate(0.3deg) translateY(0.4px); }
          100% { transform: rotate(0.7deg) translateY(-0.3px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .wire-draw-primary, .wire-draw-secondary { animation: none; stroke-dashoffset: 0; }
          .wire-sway { animation: none; }
        }
      `}</style>

      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16 md:items-start">
          {/* Kiri: narasi */}
          <Reveal>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-gold">
              {t.aboutMaklon.eyebrow}
            </p>
            <h2 className="font-heading text-3xl font-extrabold leading-tight text-forest md:text-4xl">
              {t.aboutMaklon.heading}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-ink/80 md:text-lg">
              {t.aboutMaklon.paragraphBefore}
              <strong className="text-forest">
                {t.aboutMaklon.paragraphStrong}
              </strong>
              {t.aboutMaklon.paragraphAfter}
            </p>
            <a
              href="#proses"
              className="mt-6 inline-flex items-center text-sm font-semibold text-forest underline underline-offset-4 hover:text-gold"
            >
              {t.aboutMaklon.linkText}
            </a>
          </Reveal>

          {/* Kanan: satu foto hero gedung.
              PLACEHOLDER: taruh file di public/images/about/gedung.(webp|jpg|png)
              sesuai imageBase di MAIN_PHOTO di atas — otomatis kedeteksi, gak
              perlu ubah kode.
              CATATAN: rasio aspect-[4/5] (potret, gaya Instagram) + treatment
              sinematik (feather edge nyatu ke bg-cream, color-grade tipis,
              lanjutan kabel) sebagai elemen signature section ini. */}
          <Reveal delay={0.1}>
            <PhotoTile
              photo={MAIN_PHOTO}
              label={t.aboutMaklon.photoLabel}
              className="aspect-[4/5]"
              iconSize={40}
              signature
            />
          </Reveal>
        </div>

        {/* Fact cards — dipindah jadi baris horizontal di bawah, biar kolom
            kanan di atas fokus buat galeri foto. */}
        <div className="mt-14 grid gap-4 sm:grid-cols-3">
          {t.aboutMaklon.facts.map((fact, i) => {
            const Icon = FACT_ICONS[i % FACT_ICONS.length];
            return (
              <Reveal key={fact.title} delay={i * 0.08}>
                <div className="flex h-full gap-4 rounded-[4px] border border-forest/10 bg-white p-5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[4px] bg-forest/5 text-forest">
                    <Icon size={20} strokeWidth={2} />
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
            );
          })}
        </div>

        {/* Stats strip */}
        <Reveal delay={0.15}>
          <div className="mt-14 grid grid-cols-2 gap-8 border-t border-forest/10 pt-12 md:grid-cols-4 md:gap-6">
            {t.aboutMaklon.stats.map((stat) => (
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
