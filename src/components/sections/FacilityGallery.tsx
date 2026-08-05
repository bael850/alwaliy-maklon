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

// Baris lubang sprocket ala pita film — dibuat pakai mask radial-gradient
// berulang (teknik sama seperti tepi sobekan nota di MaklonComparison),
// jadi tak perlu asset gambar sama sekali.
function SprocketRow() {
  return (
    <div
      aria-hidden="true"
      className="h-3.5 w-full bg-[#1c1c1c]"
      style={{
        WebkitMaskImage:
          "radial-gradient(circle at 9px 7px, transparent 3.5px, black 4px)",
        maskImage:
          "radial-gradient(circle at 9px 7px, transparent 3.5px, black 4px)",
        WebkitMaskSize: "18px 14px",
        maskSize: "18px 14px",
        WebkitMaskRepeat: "repeat-x",
        maskRepeat: "repeat-x",
      }}
    />
  );
}

export default function FacilityGallery() {
  const { t } = useLanguage();

  // Zip metadata non-teks (ikon, id, path gambar) dengan teks hasil terjemahan,
  // by index — sama pola kayak section lain yang punya array campuran.
  const FACILITY_ITEMS: FacilityItem[] = FACILITY_META.map((meta, i) => ({
    ...meta,
    ...t.facilityGallery.items[i],
  }));

  const [activeId, setActiveId] = useState<string | null>(null);
  const activeItem =
    FACILITY_ITEMS.find((item) => item.id === activeId) ?? null;

  const scrollerRef = useRef<HTMLDivElement>(null);
  // true selama drag aktif secara fisik menggerakkan mouse; dipakai untuk
  // membedakan "klik" vs "drag" supaya klik kartu buat buka modal tetap jalan
  // normal walau container-nya juga bisa di-drag buat scroll.
  const draggingRef = useRef(false);
  const hasDraggedRef = useRef(false);

  // Konversi scroll roda mouse (vertikal) jadi gerakan horizontal di galeri,
  // dengan EASING — bukan langsung `scrollLeft += e.deltaY` mentah.
  // Wheel event biasanya datang dalam step besar (terutama mouse non-trackpad),
  // kalau ditambahin langsung ke scrollLeft hasilnya "nyentak" tiap step.
  // Di sini delta ditumpuk ke `pending`, lalu dikejar sedikit-sedikit tiap
  // frame (rAF) — jadi kerasa meluncur, bukan lompat-lompat.
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    let rafId: number | null = null;
    let pending = 0; // sisa jarak yang belum "dikejar"

    const step = () => {
      if (Math.abs(pending) < 0.5) {
        pending = 0;
        rafId = null;
        return;
      }
      const move = pending * 0.18; // makin kecil = makin halus/lambat nyusul
      el.scrollLeft += move;
      pending -= move;
      rafId = requestAnimationFrame(step);
    };

    const onWheel = (e: WheelEvent) => {
      if (el.scrollWidth <= el.clientWidth) return;
      // Kalau user memang lagi scroll horizontal (trackpad/shift+wheel),
      // biarkan browser handle sendiri secara native.
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;

      e.preventDefault();
      pending += e.deltaY;
      if (rafId === null) rafId = requestAnimationFrame(step);
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      el.removeEventListener("wheel", onWheel);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // Drag-to-scroll dengan mouse (klik-tahan-geser) + MOMENTUM saat dilepas —
  // dukung juga user desktop yang gak punya trackpad/scroll horizontal sama
  // sekali. Tanpa momentum, scroll berhenti mendadak pas mouse dilepas
  // (padahal scroll fisik biasanya masih "meluncur" dikit sebelum berhenti).
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    let startX = 0;
    let startScrollLeft = 0;
    let lastX = 0;
    let lastTime = 0;
    let velocity = 0; // px per ms, dihitung dari gerakan mouse terakhir
    let momentumRaf: number | null = null;

    const stopMomentum = () => {
      if (momentumRaf) cancelAnimationFrame(momentumRaf);
      momentumRaf = null;
    };

    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return; // touch pakai native scroll
      stopMomentum();
      draggingRef.current = true;
      hasDraggedRef.current = false;
      startX = lastX = e.clientX;
      startScrollLeft = el.scrollLeft;
      lastTime = performance.now();
      velocity = 0;
      el.setPointerCapture(e.pointerId);
      el.classList.add("cursor-grabbing");
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!draggingRef.current) return;
      const now = performance.now();
      const dx = e.clientX - startX;
      if (Math.abs(dx) > 4) hasDraggedRef.current = true;
      el.scrollLeft = startScrollLeft - dx;

      const dt = now - lastTime;
      if (dt > 0) velocity = (lastX - e.clientX) / dt;
      lastX = e.clientX;
      lastTime = now;
    };

    const applyMomentum = () => {
      velocity *= 0.95; // deselerasi tiap frame, biar melambat natural
      if (Math.abs(velocity) < 0.02) {
        momentumRaf = null;
        return;
      }
      el.scrollLeft += velocity * 16;
      momentumRaf = requestAnimationFrame(applyMomentum);
    };

    const endDrag = (e: PointerEvent) => {
      if (!draggingRef.current) return;
      draggingRef.current = false;
      el.classList.remove("cursor-grabbing");
      try {
        el.releasePointerCapture(e.pointerId);
      } catch {
        // no-op — pointer capture mungkin sudah lepas duluan
      }
      if (Math.abs(velocity) > 0.05) {
        momentumRaf = requestAnimationFrame(applyMomentum);
      }
    };

    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("pointermove", onPointerMove);
    el.addEventListener("pointerup", endDrag);
    el.addEventListener("pointercancel", endDrag);

    return () => {
      stopMomentum();
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerup", endDrag);
      el.removeEventListener("pointercancel", endDrag);
    };
  }, []);

  const handleItemClick = (id: string) => {
    // Kalau baru aja selesai drag (mouse bergerak > 4px), jangan buka modal —
    // itu artinya user lagi geser galeri, bukan mau klik kartunya.
    if (hasDraggedRef.current) return;
    setActiveId(id);
  };

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
              {t.facilityGallery.eyebrow}
            </p>
            <h2 className="font-heading text-3xl font-extrabold leading-tight text-forest md:text-4xl">
              {t.facilityGallery.heading}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-ink/70 md:text-base">
              {t.facilityGallery.paragraph}
            </p>
          </div>
        </Reveal>
      </div>

      {/* Pita film — band gelap full-bleed dengan lubang sprocket di atas
          & bawah, tiap fasilitas ditampilkan sebagai "cetakan foto" bingkai
          putih di atasnya. Ini beda total dari grid kartu putih generik di
          section lain, dan pas dengan framing teks di atas ("lihat langsung
          tempat produk dibuat" — kesan tur pabrik/dokumenter). Logika
          drag-scroll & momentum di bawah TIDAK diubah, cuma tampilannya. */}
      <Reveal delay={0.1}>
        <div className="bg-[#1c1c1c] py-5">
          <SprocketRow />
          <div
            ref={scrollerRef}
            className="hide-scrollbar flex snap-x snap-proximity gap-5 overflow-x-auto px-5 py-6 md:px-8 cursor-grab select-none"
          >
            {FACILITY_ITEMS.map((item, i) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleItemClick(item.id)}
                className="group w-64 shrink-0 snap-start text-left md:w-72"
              >
                <div className="relative border-[6px] border-white bg-white shadow-[0_8px_24px_rgba(0,0,0,0.45)] transition-transform duration-300 group-hover:-translate-y-1">
                  <span
                    className="absolute -left-2.5 -top-2.5 z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-gold text-[10px] font-bold text-forest shadow-md"
                    aria-hidden="true"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex aspect-[4/3] items-center justify-center overflow-hidden bg-forest/5 transition-colors group-hover:bg-forest/10">
                    <SmartImage
                      basePath={item.imageBase}
                      alt={item.title}
                      className="h-full w-full object-cover pointer-events-none"
                      fallback={
                        <item.icon
                          size={36}
                          strokeWidth={1.5}
                          className="text-forest/40"
                        />
                      }
                    />
                  </div>
                </div>
                <div className="mt-3 px-0.5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-gold-light/90">
                    {item.category}
                  </p>
                  <h3 className="mt-1 font-heading text-base font-bold text-cream">
                    {item.title}
                  </h3>
                </div>
              </button>
            ))}
          </div>
          <SprocketRow />
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
                  {activeItem.category} · No.{" "}
                  {String(
                    FACILITY_ITEMS.findIndex((i) => i.id === activeItem.id) + 1,
                  ).padStart(2, "0")}
                  /{String(FACILITY_ITEMS.length).padStart(2, "0")}
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
                aria-label={t.facilityGallery.closeAria}
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
                <SmartImage
                  basePath={activeItem.imageBase}
                  alt={activeItem.title}
                  className="h-full w-full object-cover"
                  fallback={
                    <activeItem.icon
                      size={56}
                      strokeWidth={1.5}
                      className="text-forest/40"
                    />
                  }
                />
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
