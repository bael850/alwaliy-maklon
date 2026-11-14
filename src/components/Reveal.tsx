import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

/**
 * up     : naik dari bawah (default, perilaku lama)
 * fade   : hanya muncul, tanpa bergeser
 * left   : masuk dari kiri
 * right  : masuk dari kanan
 * scale  : membesar halus dari 96%
 * mask   : tirai terbuka dari bawah ke atas. Cocok untuk foto; isi <img>
 *          juga mengecil pelan dari 115% ke 100%.
 */
type Variant = "up" | "fade" | "left" | "right" | "scale" | "mask";

interface RevealProps {
  children: ReactNode;
  /** Jeda animasi dalam detik, untuk efek stagger antar elemen. */
  delay?: number;
  /** Jarak geser vertikal awal (px), dipakai variant "up". */
  y?: number;
  /** Gaya masuk. Default "up". */
  variant?: Variant;
  /** Anak langsung muncul berurutan (jeda 0,08 dtk per anak, maks. 8 anak). */
  stagger?: boolean;
  className?: string;
}

// Satu observer dipakai semua Reveal, jauh lebih ringan daripada satu
// ScrollTrigger per elemen. Animasinya murni CSS (opacity + transform + clip-path).
let observer: IntersectionObserver | null = null;
function getObserver() {
  if (!observer) {
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-in");
          observer?.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.01 },
    );
  }
  return observer;
}

export default function Reveal({
  children,
  delay = 0,
  y = 28,
  variant = "up",
  stagger = false,
  className,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = getObserver();
    obs.observe(el);
    return () => obs.unobserve(el);
  }, []);

  return (
    <div
      ref={ref}
      className={[
        "reveal",
        `reveal-${variant}`,
        stagger ? "reveal-stagger" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={
        {
          "--reveal-delay": `${delay}s`,
          "--reveal-y": `${y}px`,
        } as CSSProperties
      }
    >
      {children}
    </div>
  );
}
