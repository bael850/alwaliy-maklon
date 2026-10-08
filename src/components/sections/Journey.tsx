import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
} from "react";
import { ChevronLeft, ChevronRight, Flag, Maximize2 } from "lucide-react";
import Reveal from "../Reveal";
import SmartImage from "../SmartImage";
import Lightbox, { type LightboxItem } from "../Lightbox";
import { useLanguage } from "../../i18n/LanguageContext";
import { useAvailableImages } from "../../lib/useAvailableImages";

/**
 * Foto tiap momen. URUTAN HARUS 1:1 dengan t.journey.items.
 * PLACEHOLDER: taruh file di public/images/journey/<n>.(webp|jpg|png).
 */
const IMAGE_BASES = [
  "/images/journey/1",
  "/images/journey/2",
  "/images/journey/3",
  "/images/journey/4",
  "/images/journey/5",
];

/** Jarak geser (px) di bawah ini dianggap klik, bukan drag. */
const DRAG_THRESHOLD = 6;
/**
 * Loop tak berujung: daftar kartu digandakan COPIES kali, pengguna selalu
 * berada di salinan tengah (MID). Begitu bergeser keluar dari salinan tengah,
 * scroll dipindah satu set penuh — posisi kartunya identik, jadi tidak
 * terlihat melompat.
 */
const COPIES = 5;
const MID = 2;

interface JourneyEntry {
  base: string;
  /** Index asli di IMAGE_BASES / t.journey.items */
  textIndex: number;
}

/**
 * Hanya momen yang fotonya sudah ada di public/images/journey yang tampil.
 * Belum ada foto sama sekali = section tidak muncul. Foto ditambah =
 * otomatis muncul, tanpa ubah kode.
 */
export default function Journey() {
  const { ready, has } = useAvailableImages(IMAGE_BASES);
  const entries: JourneyEntry[] = IMAGE_BASES.map((base, i) => ({
    base,
    textIndex: i,
  })).filter((_, i) => has[i]);

  if (!ready || entries.length === 0) return null;
  return <JourneyCarousel entries={entries} />;
}

function JourneyCarousel({ entries }: { entries: JourneyEntry[] }) {
  const { t } = useLanguage();
  const items = entries.map((e) => t.journey.items[e.textIndex]);

  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLLIElement | null)[]>([]);
  const frame = useRef(0);
  const idleTimer = useRef<number>(0);
  const touching = useRef(false);
  const drag = useRef({ down: false, startX: 0, startScroll: 0, moved: 0 });

  const n = items.length;
  const loop = Array.from({ length: COPIES * n }, (_, k) => k);

  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [activeDot, setActiveDot] = useState(0);

  /** Pindahkan scroll satu set penuh bila kartu tengah keluar dari salinan
   *  tengah. Mengembalikan jarak yang digeser (0 kalau tidak perlu). */
  const wrap = useCallback(() => {
    const track = trackRef.current;
    const a = cardRefs.current[0];
    const b = cardRefs.current[1];
    if (!track || !a || !b) return 0;
    const stride = b.offsetLeft - a.offsetLeft;
    if (stride <= 0) return 0;
    const setW = stride * n;
    const center = track.scrollLeft + track.clientWidth / 2;
    let c = (center - (a.offsetLeft + a.offsetWidth / 2)) / stride;
    let shift = 0;
    while (c < MID * n - 0.5) {
      shift += setW;
      c += n;
    }
    while (c >= (MID + 1) * n - 0.5) {
      shift -= setW;
      c -= n;
    }
    if (shift) track.scrollLeft += shift;
    return shift;
  }, [n]);

  // Efek "menyembul": kartu di tengah paling besar, terangkat & di lapisan
  // paling atas; kartu lain mengecil, turun, redup, dan terselip di belakangnya.
  // Ditulis langsung ke style (tanpa state) supaya halus saat scroll.
  const update = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const center = track.scrollLeft + track.clientWidth / 2;

    cardRefs.current.forEach((card) => {
      if (!card) return;
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      // dd = jarak dari tengah dalam satuan "selangkah kartu" (0 = di tengah,
      // 1 = tetangga langsung, 2 = dua kartu dari tengah).
      const step = card.offsetWidth * 0.78;
      const dd = Math.min(2, Math.abs(cardCenter - center) / step);
      if (dd >= 2 && card.dataset.far === "1") return;
      card.dataset.far = dd >= 2 ? "1" : "0";
      const near = Math.min(1, dd);
      const focus = 1 - near;

      const scale = 1.05 - 0.21 * near - 0.04 * (dd - near);
      const lift = 30 * near + 10 * (dd - near);
      card.style.transform = `translateY(${lift}px) scale(${scale})`;
      card.style.opacity = String(1 - 0.35 * near - 0.25 * (dd - near));
      card.style.zIndex = String(Math.round(100 - dd * 40));
      card.style.setProperty("--f", String(focus));
    });

    // Titik indikator mengikuti kartu di tengah (modulo jumlah momen).
    const a = cardRefs.current[0];
    const b = cardRefs.current[1];
    if (a && b && b.offsetLeft > a.offsetLeft) {
      const stride = b.offsetLeft - a.offsetLeft;
      const c = (center - (a.offsetLeft + a.offsetWidth / 2)) / stride;
      setActiveDot((((Math.round(c) % n) + n) % n) as number);
    }
  }, [n]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () => {
      cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(update);
      // Lompat balik ke salinan tengah hanya saat scroll sudah diam.
      window.clearTimeout(idleTimer.current);
      idleTimer.current = window.setTimeout(() => {
        if (drag.current.down || touching.current) return;
        if (wrap()) update();
      }, 140);
    };
    const onTouchStart = () => {
      touching.current = true;
    };
    const onTouchEnd = () => {
      touching.current = false;
      window.clearTimeout(idleTimer.current);
      idleTimer.current = window.setTimeout(() => {
        if (wrap()) update();
      }, 200);
    };
    update();
    track.addEventListener("scroll", onScroll, { passive: true });
    track.addEventListener("touchstart", onTouchStart, { passive: true });
    track.addEventListener("touchend", onTouchEnd, { passive: true });
    track.addEventListener("touchcancel", onTouchEnd, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame.current);
      window.clearTimeout(idleTimer.current);
      track.removeEventListener("touchstart", onTouchStart);
      track.removeEventListener("touchend", onTouchEnd);
      track.removeEventListener("touchcancel", onTouchEnd);
      track.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [update, wrap]);

  // Posisi awal: kartu pertama di salinan tengah, tepat di tengah layar.
  useEffect(() => {
    const track = trackRef.current;
    const card = cardRefs.current[MID * n];
    if (!track || !card) return;
    track.scrollTo({
      left: card.offsetLeft + card.offsetWidth / 2 - track.clientWidth / 2,
      behavior: "auto",
    });
    update();
  }, [n, update]);

  const scrollByCard = (dir: 1 | -1) => {
    const track = trackRef.current;
    const card = cardRefs.current[0];
    if (!track || !card) return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    track.scrollBy({
      left: dir * card.offsetWidth * 0.78,
      behavior: reduced ? "auto" : "smooth",
    });
  };

  // Drag mouse (touch pakai swipe native). Snap dimatikan selama drag, lalu
  // dinyalakan lagi sehingga browser merapikan ke kartu terdekat.
  const onMouseDown = (e: ReactMouseEvent) => {
    const track = trackRef.current;
    if (!track || e.button !== 0) return;
    drag.current = {
      down: true,
      startX: e.clientX,
      startScroll: track.scrollLeft,
      moved: 0,
    };
    track.style.scrollSnapType = "none";
    track.style.cursor = "grabbing";

    const onMove = (ev: MouseEvent) => {
      const dx = ev.clientX - drag.current.startX;
      drag.current.moved = Math.max(drag.current.moved, Math.abs(dx));
      track.scrollLeft = drag.current.startScroll - dx;
      // Wrap langsung saat drag; geser titik awal drag sejumlah lompatan.
      const shift = wrap();
      if (shift) drag.current.startScroll += shift;
    };
    const onUp = () => {
      drag.current.down = false;
      track.style.scrollSnapType = "";
      track.style.cursor = "";
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  };

  /** Salinan kartu data-ke-i yang paling dekat dengan tengah layar. */
  const nearestCopy = (i: number) => {
    const track = trackRef.current;
    const a = cardRefs.current[0];
    const b = cardRefs.current[1];
    if (!track || !a || !b) return MID * n + i;
    const stride = b.offsetLeft - a.offsetLeft;
    const c =
      (track.scrollLeft +
        track.clientWidth / 2 -
        (a.offsetLeft + a.offsetWidth / 2)) /
      stride;
    const k = i + n * Math.round((c - i) / n);
    return Math.min(COPIES * n - 1, Math.max(0, k));
  };

  // Geser track supaya kartu k tepat di tengah (tanpa menggeser halaman).
  const centerCard = (i: number) => {
    const track = trackRef.current;
    const card = cardRefs.current[i];
    if (!track || !card) return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    track.scrollTo({
      left: card.offsetLeft + card.offsetWidth / 2 - track.clientWidth / 2,
      behavior: reduced ? "auto" : "smooth",
    });
  };

  // Klik kartu yang belum di tengah = bawa ke tengah dulu (menyembul);
  // klik kartu yang sudah di tengah = buka Lightbox.
  const openCard = (i: number) => {
    if (drag.current.moved > DRAG_THRESHOLD) return;
    const track = trackRef.current;
    const card = cardRefs.current[i];
    if (!track || !card) return;
    const offCenter = Math.abs(
      card.offsetLeft +
        card.offsetWidth / 2 -
        (track.scrollLeft + track.clientWidth / 2),
    );
    if (offCenter > card.offsetWidth * 0.25) {
      centerCard(i);
      return;
    }
    setOpenIndex(i % n);
  };

  const lightboxItems: LightboxItem[] = items.map((item, i) => ({
    id: `journey-${i}`,
    imageBase: entries[i].base,
    title: item.title,
    meta: item.year,
    description: item.desc,
    fallback: <Flag size={56} strokeWidth={1.5} />,
  }));

  return (
    <section id="journey" className="overflow-hidden bg-forest py-16 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-gold-light">
                {t.journey.eyebrow}
              </p>
              <h2 className="font-heading text-3xl font-extrabold leading-tight text-cream md:text-5xl">
                {t.journey.heading}
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-cream/70 md:text-base">
                {t.journey.paragraph}
              </p>
            </div>

            <div className="hidden shrink-0 items-center gap-2 md:flex">
              <button
                type="button"
                onClick={() => scrollByCard(-1)}
                aria-label={t.journey.prevAria}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-cream/30 text-cream transition-colors hover:border-gold hover:text-gold"
              >
                <ChevronLeft size={22} />
              </button>
              <button
                type="button"
                onClick={() => scrollByCard(1)}
                aria-label={t.journey.nextAria}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-cream/30 text-cream transition-colors hover:border-gold hover:text-gold disabled:pointer-events-none disabled:opacity-30"
              >
                <ChevronRight size={22} />
              </button>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Track — scroll-snap native (swipe di mobile) + drag mouse di desktop. */}
      <div
        ref={trackRef}
        onMouseDown={onMouseDown}
        onDragStart={(e) => e.preventDefault()}
        className="hide-scrollbar relative mt-6 flex cursor-grab snap-x snap-mandatory overflow-x-auto overscroll-x-contain pb-12 pt-10 select-none [--card-w:min(68vw,290px)] md:mt-10 md:[--card-w:340px]"
      >
        <ul
          className="flex w-max items-center"
          style={{ paddingInline: "calc(50vw - var(--card-w) / 2)" }}
        >
          {loop.map((i) => {
            const item = items[i % n];
            const di = i % n;
            const isMid = Math.floor(i / n) === MID;
            return (
              <li
                key={i}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                aria-hidden={!isMid}
                style={{
                  marginLeft: i === 0 ? 0 : "calc(var(--card-w) * -0.22)",
                }}
                className="relative w-[var(--card-w)] shrink-0 snap-center"
              >
                <button
                  type="button"
                  onClick={() => openCard(i)}
                  tabIndex={isMid ? 0 : -1}
                  onFocus={(e) => {
                    if (e.currentTarget.matches(":focus-visible")) {
                      centerCard(nearestCopy(di));
                    }
                  }}
                  aria-label={`${t.journey.openAriaPrefix}${item.year} — ${item.title}`}
                  className="group relative block aspect-[3/4] w-full overflow-hidden rounded-[4px] bg-cream/5 text-left shadow-2xl shadow-black/50 ring-1 ring-cream/10"
                >
                  <SmartImage
                    basePath={entries[di].base}
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    fallback={
                      <div className="flex h-full w-full items-center justify-center">
                        <Flag
                          size={48}
                          strokeWidth={1.5}
                          className="text-cream/20"
                        />
                      </div>
                    }
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                  <span
                    style={{ opacity: "calc(var(--f, 1) * 0.9)" }}
                    className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-cream backdrop-blur-sm"
                  >
                    <Maximize2 size={16} />
                  </span>
                  <div
                    className="absolute inset-x-0 bottom-0 p-5"
                    style={{ opacity: "var(--f, 1)" }}
                  >
                    <p className="font-heading text-4xl font-extrabold leading-none text-gold">
                      {item.year}
                    </p>
                    <p className="mt-2 font-heading text-base font-bold leading-snug text-cream">
                      {item.title}
                    </p>
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Progress + petunjuk */}
      <div className="mx-auto mt-4 flex max-w-6xl items-center gap-5 px-5 md:px-8">
        <div className="flex flex-1 items-center gap-2" aria-hidden="true">
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              tabIndex={-1}
              onClick={() => centerCard(nearestCopy(i))}
              className={[
                "h-[3px] rounded-full transition-[width,background-color] duration-300",
                i === activeDot
                  ? "w-10 bg-gold"
                  : "w-5 bg-cream/20 hover:bg-cream/40",
              ].join(" ")}
            />
          ))}
        </div>
        <span className="shrink-0 text-xs font-medium uppercase tracking-[0.14em] text-cream/50">
          {t.journey.dragHint}
        </span>
      </div>

      <Lightbox
        items={lightboxItems}
        index={openIndex}
        onClose={() => setOpenIndex(null)}
        onIndexChange={setOpenIndex}
        labels={{
          close: t.journey.closeAria,
          prev: t.journey.prevAria,
          next: t.journey.nextAria,
        }}
      />
    </section>
  );
}
