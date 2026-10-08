import { useEffect, useRef, type ReactNode } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import SmartImage from "./SmartImage";

export interface LightboxItem {
  id: string;
  /** Path TANPA ekstensi di public/ — dibaca SmartImage (.webp/.avif/.jpg/.png). */
  imageBase: string;
  title: string;
  /** Teks kecil di atas judul (mis. tahun). */
  meta?: string;
  description?: string;
  /** "contain" untuk dokumen/sertifikat (tidak dipotong). Default "cover". */
  fit?: "cover" | "contain";
  /** Ditampilkan kalau file gambarnya belum ada. */
  fallback?: ReactNode;
}

interface LightboxProps {
  items: LightboxItem[];
  /** null = tertutup. */
  index: number | null;
  onClose: () => void;
  onIndexChange: (index: number) => void;
  labels: { close: string; prev: string; next: string };
}

const FOCUSABLE = "button, [href], [tabindex]:not([tabindex='-1'])";

/**
 * Modal galeri generik — dipakai Journey, dan nanti What We Do / Facility.
 * Esc = tutup, ←/→ = pindah item, Tab dikunci di dalam dialog, scroll body
 * dikunci selama terbuka, fokus dikembalikan ke elemen pemicu saat ditutup.
 */
export default function Lightbox({
  items,
  index,
  onClose,
  onIndexChange,
  labels,
}: LightboxProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const isOpen = index !== null;
  const total = items.length;

  // Kunci scroll + kembalikan fokus.
  useEffect(() => {
    if (!isOpen) return;
    const trigger = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = prevOverflow;
      trigger?.focus?.();
    };
  }, [isOpen]);

  // Keyboard.
  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowRight") {
        onIndexChange((index + 1) % total);
      } else if (e.key === "ArrowLeft") {
        onIndexChange((index - 1 + total) % total);
      } else if (e.key === "Tab" && dialogRef.current) {
        const nodes =
          dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE);
        if (nodes.length === 0) return;
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [index, total, onClose, onIndexChange]);

  if (index === null) return null;
  const item = items[index];

  const go = (delta: number) => onIndexChange((index + delta + total) % total);

  return (
    <div
      data-lenis-prevent
      className="lightbox-backdrop fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm sm:p-6"
      onClick={onClose}
    >
      <style>{`
        .lightbox-backdrop { animation: lbFade 0.25s ease-out; }
        .lightbox-panel { animation: lbPop 0.35s cubic-bezier(0.22, 1, 0.36, 1); }
        .lightbox-swap { animation: lbSwap 0.4s ease-out; }
        @keyframes lbFade { from { opacity: 0; } to { opacity: 1; } }
        @keyframes lbPop { from { opacity: 0; transform: translateY(16px) scale(0.97); } to { opacity: 1; transform: none; } }
        @keyframes lbSwap { from { opacity: 0; transform: translateX(12px); } to { opacity: 1; transform: none; } }
        @media (prefers-reduced-motion: reduce) {
          .lightbox-backdrop, .lightbox-panel, .lightbox-swap { animation: none; }
        }
      `}</style>

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={item.title}
        onClick={(e) => e.stopPropagation()}
        className="lightbox-panel relative flex h-full w-full flex-col overflow-hidden bg-forest text-cream sm:h-auto sm:max-h-[90vh] sm:max-w-5xl sm:rounded-[4px] md:flex-row"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label={labels.close}
          className="absolute right-3 top-3 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-black/40 text-cream transition-colors hover:bg-black/60"
        >
          <X size={22} />
        </button>

        {/* Gambar */}
        <div
          key={`img-${item.id}`}
          className="lightbox-swap relative flex min-h-0 flex-1 items-center justify-center bg-black/30 md:w-3/5 md:flex-none"
        >
          <div className="aspect-[3/4] max-h-[56dvh] w-full md:max-h-[90vh]">
            <SmartImage
              basePath={item.imageBase}
              alt={item.title}
              className={
                item.fit === "contain"
                  ? "h-full w-full bg-cream object-contain p-4"
                  : "h-full w-full object-cover"
              }
              fallback={
                <div className="flex h-full w-full items-center justify-center text-cream/30">
                  {item.fallback}
                </div>
              }
            />
          </div>
        </div>

        {/* Teks */}
        <div className="flex max-h-[44dvh] shrink-0 flex-col justify-between gap-6 overflow-y-auto p-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] md:max-h-none md:w-2/5 md:p-8">
          <div key={`txt-${item.id}`} className="lightbox-swap">
            {item.meta && (
              <p className="font-heading text-4xl font-extrabold text-gold md:text-5xl">
                {item.meta}
              </p>
            )}
            <h3 className="mt-3 font-heading text-xl font-bold leading-snug md:text-2xl">
              {item.title}
            </h3>
            {item.description && (
              <p className="mt-3 text-sm leading-relaxed text-cream/75 md:text-base">
                {item.description}
              </p>
            )}
          </div>

          {total > 1 && (
            <div className="flex items-center justify-end border-t border-cream/15 pt-4">
              <div className="flex gap-1">
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label={labels.prev}
                  className="flex h-11 w-11 items-center justify-center rounded-[4px] transition-colors hover:bg-cream/10"
                >
                  <ChevronLeft size={22} />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label={labels.next}
                  className="flex h-11 w-11 items-center justify-center rounded-[4px] transition-colors hover:bg-cream/10"
                >
                  <ChevronRight size={22} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
