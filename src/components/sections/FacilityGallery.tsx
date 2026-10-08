import { useEffect, useRef, useState } from "react";
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
import SmartImage from "../SmartImage";
import { useLanguage } from "../../i18n/LanguageContext";
import type { Translations } from "../../i18n/translations";
import { useAvailableImages } from "../../lib/useAvailableImages";

interface FacilityMeta {
  id: string;
  icon: LucideIcon;
  /**
   * PLACEHOLDER — path TANPA ekstensi ke public/images/facility/<nama>.
   * Taruh file di public/images/facility/<nama>.webp (atau .jpg / .png,
   * bebas salah satu) — otomatis kedeteksi, gak perlu ubah kode ini.
   */
  imageBase: string;
}

type FacilityText = Translations["facilityGallery"]["items"][number];

interface FacilityItem extends FacilityMeta, FacilityText {}

// Bagian non-teks (id, ikon, path gambar) tetap konstanta terpisah — urutannya
// HARUS 1:1 sama dengan urutan t.facilityGallery.items di translations.ts,
// karena di-zip pakai index di dalam komponen.
const FACILITY_META: FacilityMeta[] = [
  {
    id: "gedung",
    icon: Building2,
    imageBase: "/images/facility/gedung",
  },
  /* ── "Alat Tempur" produksi — dipecah per mesin, masing-masing punya
     spek sendiri, biar keliatan konkret ke calon klien (bukan cuma
     klaim generik "punya alat produksi"). Tambah mesin lain di masa
     depan tinggal duplikat pola item di bawah ini (dan tambah entri baru
     yang senada di translations.ts, di posisi index yang sama). ── */
  {
    id: "mesin-mixing",
    icon: Blend,
    imageBase: "/images/facility/mesin-mixing",
  },
  {
    id: "mesin-filling",
    icon: Droplets,
    imageBase: "/images/facility/mesin-filling",
  },
  {
    id: "ruang-penuangan",
    icon: FlaskConical,
    imageBase: "/images/facility/ruang-penuangan",
  },
  {
    id: "ruang-pengemasan",
    icon: PackageCheck,
    imageBase: "/images/facility/ruang-pengemasan",
  },
  {
    id: "pakaian-produksi",
    icon: Shirt,
    imageBase: "/images/facility/pakaian-produksi",
  },
  {
    id: "stiker-label",
    icon: Tag,
    imageBase: "/images/facility/stiker-label",
  },
];

const EASE = "cubic-bezier(0.7, 0, 0.2, 1)";
const EASE_OUT = "cubic-bezier(0.215, 0.61, 0.355, 1)";
const PINNED_QUERY =
  "(min-width: 1024px) and (prefers-reduced-motion: no-preference)";
const EXTENSIONS = ["webp", "avif", "jpg", "png"] as const;
const DEFAULT_RATIO = 4 / 3;
const pad = (n: number) => String(n).padStart(2, "0");
const clamp = (v: number, min: number, max: number) =>
  Math.min(max, Math.max(min, v));

/**
 * Baca rasio asli foto (lebar / tinggi) dengan urutan ekstensi yang sama
 * seperti SmartImage. null = file tidak ditemukan. Dipakai supaya bingkai
 * ukurannya PAS dengan fotonya, bukan kotak tetap yang memotong foto.
 */
function probeRatio(base: string): Promise<number | null> {
  return new Promise((resolve) => {
    let i = 0;
    const tryNext = () => {
      if (i >= EXTENSIONS.length) return resolve(null);
      const img = new Image();
      img.onload = () =>
        resolve(
          img.naturalHeight ? img.naturalWidth / img.naturalHeight : null,
        );
      img.onerror = () => {
        i += 1;
        tryNext();
      };
      img.src = `${base}.${EXTENSIONS[i]}`;
    };
    tryNext();
  });
}

/**
 * Layout:
 * - Desktop (lg+, tanpa reduced-motion): "tur" horizontal yang di-pin.
 *   Scroll vertikal halaman menggeser jalur foto ke kiri. Tidak ada kartu:
 *   foto tampil polos dengan proporsi aslinya, teks langsung di bawahnya.
 *   Gambar bergeser pelan di dalam bingkainya (parallax) dan terbuka dari
 *   bawah saat masuk. Klik foto = detail & spesifikasi.
 * - Mobile/tablet/reduced-motion: strip horizontal biasa dengan snap.
 */
interface AvailableMeta extends FacilityMeta {
  /** Index asli di FACILITY_META / t.facilityGallery.items */
  textIndex: number;
}

/**
 * Hanya fasilitas yang fotonya sudah ada di public/images/facility yang
 * tampil. Belum ada foto sama sekali = section tidak muncul. Foto
 * ditambah = otomatis muncul, tanpa ubah kode.
 */
export default function FacilityGallery() {
  const { ready, has } = useAvailableImages(
    FACILITY_META.map((m) => m.imageBase),
  );
  const metas: AvailableMeta[] = FACILITY_META.map((m, i) => ({
    ...m,
    textIndex: i,
  })).filter((_, i) => has[i]);

  if (!ready || metas.length === 0) return null;
  return <FacilityTour metas={metas} />;
}

function FacilityTour({ metas }: { metas: AvailableMeta[] }) {
  const { t } = useLanguage();

  // Zip metadata non-teks (ikon, id, path gambar) dengan teks hasil terjemahan,
  // lewat index asli (textIndex), bukan posisi setelah difilter.
  const FACILITY_ITEMS: FacilityItem[] = metas.map((meta) => ({
    ...meta,
    ...t.facilityGallery.items[meta.textIndex],
  }));
  const total = FACILITY_ITEMS.length;

  const [activeId, setActiveId] = useState<string | null>(null);
  const activeItem =
    FACILITY_ITEMS.find((item) => item.id === activeId) ?? null;

  // undefined = belum dibaca, null = file tidak ada, angka = rasio asli
  const [ratios, setRatios] = useState<(number | null | undefined)[]>(() =>
    Array(total).fill(undefined),
  );
  const [pinned, setPinned] = useState(
    () =>
      typeof window !== "undefined" && window.matchMedia(PINNED_QUERY).matches,
  );
  const [dist, setDist] = useState(0);
  const [current, setCurrent] = useState(0);
  const [revealed, setRevealed] = useState<boolean[]>(() =>
    Array(total).fill(false),
  );
  const [stripIn, setStripIn] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const frameRefs = useRef<(HTMLDivElement | null)[]>([]);
  const parRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    let alive = true;
    metas.forEach((meta, i) => {
      probeRatio(meta.imageBase).then((r) => {
        if (!alive) return;
        setRatios((prev) => {
          const next = prev.slice();
          next[i] = r;
          return next;
        });
      });
    });
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    const mq = window.matchMedia(PINNED_QUERY);
    const onChange = () => setPinned(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // ===== Mode pinned: scroll vertikal -> geser horizontal + parallax =====
  useEffect(() => {
    if (!pinned) return;
    const section = sectionRef.current;
    const track = trackRef.current;
    const fill = fillRef.current;
    if (!section || !track || !fill) return;

    let raf = 0;
    let maxShift = 0;
    let lastCurrent = -1;
    const seen: boolean[] = Array(total).fill(false);

    const measure = () => {
      maxShift = Math.max(0, track.scrollWidth - window.innerWidth);
      setDist(maxShift);
    };

    const update = () => {
      raf = 0;
      const rect = section.getBoundingClientRect();
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const range = rect.height - vh;
      const p = range > 0 ? Math.min(1, Math.max(0, -rect.top / range)) : 0;

      track.style.transform = `translate3d(${-p * maxShift}px,0,0)`;
      fill.style.transform = `scaleX(${p})`;

      let best = 0;
      let bestDist = Infinity;
      let changed = false;
      frameRefs.current.forEach((el, i) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        const center = r.left + r.width / 2;
        const par = parRefs.current[i];
        // Gambar sedikit diperbesar lalu digeser di dalam bingkainya.
        if (par)
          par.style.transform = `translate3d(${(vw / 2 - center) * 0.025}px,0,0) scale(1.14)`;
        // Buka foto hanya setelah section benar-benar masuk layar.
        if (!seen[i] && rect.top < vh * 0.5 && r.left < vw * 0.9) {
          seen[i] = true;
          changed = true;
        }
        const d = Math.abs(center - vw / 2);
        if (d < bestDist) {
          bestDist = d;
          best = i;
        }
      });
      if (changed) setRevealed(seen.slice());
      if (best !== lastCurrent) {
        lastCurrent = best;
        setCurrent(best);
      }
    };

    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    const onResize = () => {
      measure();
      schedule();
    };

    measure();
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", onResize);
    // Lebar jalur berubah saat rasio foto selesai dibaca.
    const ro = new ResizeObserver(onResize);
    ro.observe(track);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", onResize);
      ro.disconnect();
    };
  }, [pinned, total]);

  // ===== Mode strip: foto terbuka saat strip terlihat =====
  useEffect(() => {
    if (pinned) return;
    const el = stripRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStripIn(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [pinned]);

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
    closeRef.current?.focus();

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

  const ratioOf = (i: number) => clamp(ratios[i] ?? DEFAULT_RATIO, 0.6, 1.8);
  // Tinggi (vh) mengikuti orientasi; lebar selalu tinggi x rasio asli.
  const pinnedHeight = (i: number) => (ratioOf(i) >= 1 ? 46 : 54);

  const fallbackIcon = (item: FacilityItem, size: number) => (
    <div className="flex h-full w-full items-center justify-center">
      <item.icon size={size} strokeWidth={1.25} className="text-cream/30" />
    </div>
  );

  return (
    <section
      id="facility"
      ref={sectionRef}
      className={`relative bg-forest ${pinned ? "" : "py-16 md:py-32"}`}
      style={pinned ? { height: `calc(100vh + ${dist}px)` } : undefined}
    >
      {pinned ? (
        /* ================= DESKTOP: tur horizontal yang di-pin ================= */
        <div className="sticky top-0 h-screen overflow-hidden">
          <div
            ref={trackRef}
            className="flex h-full w-max items-center gap-[6vw] pt-20 pr-[10vw] pb-24 pl-[8vw] will-change-transform"
          >
            {/* Frame pembuka: judul */}
            <div className="w-[36vw] shrink-0">
              <p className="mb-6 flex items-center gap-3 text-sm font-semibold text-gold-light">
                <span aria-hidden="true" className="h-px w-10 bg-gold-light" />
                {t.facilityGallery.eyebrow}
              </p>
              <h2 className="font-heading text-5xl leading-[1.02] font-extrabold tracking-tight text-cream xl:text-7xl">
                {t.facilityGallery.heading}
              </h2>
              <p className="mt-7 max-w-sm text-base leading-relaxed text-cream/70">
                {t.facilityGallery.paragraph}
              </p>
            </div>

            {FACILITY_ITEMS.map((item, i) => {
              const h = pinnedHeight(i);
              const w = h * ratioOf(i);
              const missing = ratios[i] === null;
              return (
                <div
                  key={item.id}
                  ref={(el) => {
                    frameRefs.current[i] = el;
                  }}
                  className={`shrink-0 ${
                    i % 2 === 1 ? "translate-y-[4vh]" : "-translate-y-[3vh]"
                  }`}
                  style={{ width: `${w}vh` }}
                >
                  <button
                    type="button"
                    onClick={() => setActiveId(item.id)}
                    aria-label={`${item.title}, ${item.category}`}
                    className="group block w-full cursor-pointer text-left"
                  >
                    {/* Foto polos: bingkai = ukuran foto, tanpa kartu */}
                    <div
                      className={`relative overflow-hidden ${
                        missing ? "border border-cream/20" : ""
                      }`}
                      style={{
                        height: `${h}vh`,
                        clipPath: revealed[i]
                          ? "inset(0 0 0 0)"
                          : "inset(100% 0 0 0)",
                        transition: `clip-path 1.1s ${EASE}`,
                      }}
                    >
                      <div
                        ref={(el) => {
                          parRefs.current[i] = el;
                        }}
                        className="absolute inset-0 will-change-transform"
                        style={{ transform: "scale(1.14)" }}
                      >
                        <SmartImage
                          basePath={item.imageBase}
                          alt=""
                          className="h-full w-full object-cover"
                          fallback={fallbackIcon(item, 48)}
                        />
                      </div>
                    </div>

                    <div
                      className="mt-4"
                      style={{
                        opacity: revealed[i] ? 1 : 0,
                        transform: revealed[i] ? "none" : "translateY(14px)",
                        transition: `opacity 0.8s ${EASE_OUT} 0.4s, transform 0.8s ${EASE_OUT} 0.4s`,
                      }}
                    >
                      <p className="text-sm text-gold-light">{item.category}</p>
                      <h3 className="mt-1 font-heading text-2xl leading-snug font-bold text-cream xl:text-3xl">
                        {item.title}
                      </h3>
                      {/* Garis yang memanjang saat hover = penanda bisa diklik */}
                      <span
                        aria-hidden="true"
                        className="mt-4 block h-px w-10 bg-gold transition-all duration-500 group-hover:w-full group-focus-visible:w-full"
                      />
                    </div>
                  </button>
                </div>
              );
            })}
          </div>

          {/* Bilah bawah: penghitung, rel progres, nama fasilitas aktif */}
          <div className="absolute inset-x-0 bottom-0 flex items-center gap-6 px-[8vw] pb-8">
            <p className="font-heading text-sm font-semibold text-cream tabular-nums">
              {pad(current + 1)}
              <span className="text-cream/40"> / {pad(total)}</span>
            </p>
            <div className="h-[2px] flex-1 bg-cream/15" aria-hidden="true">
              <div
                ref={fillRef}
                className="h-[2px] origin-left bg-gold"
                style={{ transform: "scaleX(0)" }}
              />
            </div>
            <p className="w-56 truncate text-right text-sm text-cream/70">
              {FACILITY_ITEMS[current]?.title}
            </p>
          </div>
        </div>
      ) : (
        /* ================= MOBILE / TABLET / REDUCED MOTION ================= */
        <>
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <Reveal>
              <p className="mb-6 flex items-center gap-3 text-sm font-semibold text-gold-light">
                <span aria-hidden="true" className="h-px w-10 bg-gold-light" />
                {t.facilityGallery.eyebrow}
              </p>
              <h2 className="max-w-4xl font-heading text-4xl leading-[1.02] font-extrabold tracking-tight text-cream md:text-6xl">
                {t.facilityGallery.heading}
              </h2>
              <p className="mt-6 max-w-md text-base leading-relaxed text-cream/70">
                {t.facilityGallery.paragraph}
              </p>
            </Reveal>
          </div>

          <div
            ref={stripRef}
            className="snap-strip hide-scrollbar fade-edge-r mt-10 flex snap-x snap-proximity items-start gap-6 overflow-x-auto px-5 pb-2 [--h:15rem] md:mt-16 md:gap-10 md:px-8 md:[--h:22rem]"
          >
            {FACILITY_ITEMS.map((item, i) => {
              const delay = i * 0.08;
              const missing = ratios[i] === null;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveId(item.id)}
                  aria-label={`${item.title}, ${item.category}`}
                  className={`group shrink-0 snap-start text-left ${
                    i % 2 === 1 ? "mt-8 md:mt-12" : ""
                  }`}
                  style={{ width: `calc(var(--h) * ${ratioOf(i)})` }}
                >
                  <div
                    className={`relative overflow-hidden ${
                      missing ? "border border-cream/20" : ""
                    }`}
                    style={{
                      height: "var(--h)",
                      clipPath: stripIn
                        ? "inset(0 0 0 0)"
                        : "inset(100% 0 0 0)",
                      transition: `clip-path 1.1s ${EASE} ${delay}s`,
                    }}
                  >
                    <SmartImage
                      basePath={item.imageBase}
                      alt=""
                      className="h-full w-full object-cover"
                      fallback={fallbackIcon(item, 44)}
                    />
                  </div>
                  <div
                    className="mt-4"
                    style={{
                      opacity: stripIn ? 1 : 0,
                      transition: `opacity 0.8s ease ${delay + 0.4}s`,
                    }}
                  >
                    <p className="text-sm text-gold-light">{item.category}</p>
                    <h3 className="mt-1 font-heading text-xl leading-snug font-bold text-cream">
                      {item.title}
                    </h3>
                    <span
                      aria-hidden="true"
                      className="mt-3 block h-px w-10 bg-gold"
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </>
      )}

      {/* Modal detail */}
      {activeItem && (
        <div
          className="fac-backdrop fixed inset-0 z-[100] flex items-center justify-center bg-black/75 backdrop-blur-sm sm:p-6"
          onClick={() => setActiveId(null)}
        >
          <style>{`
            .fac-backdrop { animation: facFade 0.25s ease-out; }
            .fac-panel { animation: facPop 0.45s cubic-bezier(0.22, 1, 0.36, 1); }
            @keyframes facFade { from { opacity: 0; } to { opacity: 1; } }
            @keyframes facPop { from { opacity: 0; transform: translateY(20px) scale(0.98); } to { opacity: 1; transform: none; } }
            @media (prefers-reduced-motion: reduce) {
              .fac-backdrop, .fac-panel { animation: none; }
            }
          `}</style>

          {/* Mobile: full-screen. Desktop: dua kolom, foto besar + spesifikasi. */}
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="facility-modal-title"
            onClick={(e) => e.stopPropagation()}
            className="fac-panel relative flex h-full w-full flex-col overflow-hidden bg-cream sm:h-auto sm:max-h-[88vh] sm:max-w-5xl sm:rounded-[4px] md:flex-row"
          >
            <button
              ref={closeRef}
              type="button"
              onClick={() => setActiveId(null)}
              aria-label={t.facilityGallery.closeAria}
              className="absolute top-3 right-3 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-forest/80 text-cream transition-colors hover:bg-forest"
            >
              <X size={22} />
            </button>

            <div className="relative aspect-[4/3] shrink-0 bg-forest/10 md:aspect-auto md:min-h-[30rem] md:w-3/5">
              <SmartImage
                basePath={activeItem.imageBase}
                alt={activeItem.title}
                className="absolute inset-0 h-full w-full object-cover"
                fallback={
                  <div className="flex h-full w-full items-center justify-center">
                    <activeItem.icon
                      size={56}
                      strokeWidth={1.25}
                      className="text-forest/35"
                    />
                  </div>
                }
              />
            </div>

            {/* Konten scrollable — overscroll-contain biar scroll berhenti
                di sini, gak "bocor" nge-scroll halaman di belakangnya. */}
            <div
              data-lenis-prevent
              className="flex-1 overflow-y-auto overscroll-contain p-6 md:w-2/5 md:flex-none md:p-10"
            >
              <p className="text-sm font-semibold text-gold">
                {activeItem.category}
              </p>
              <h3
                id="facility-modal-title"
                className="mt-2 font-heading text-3xl leading-[1.1] font-extrabold text-forest md:text-4xl"
              >
                {activeItem.title}
              </h3>
              <p className="mt-5 text-base leading-relaxed text-ink/75">
                {activeItem.description}
              </p>

              <dl className="mt-8 border-t border-forest/20">
                {activeItem.specs.map((spec) => (
                  <div
                    key={spec.label}
                    className="flex justify-between gap-4 border-b border-forest/10 py-3 text-sm"
                  >
                    <dt className="text-ink/55">{spec.label}</dt>
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
