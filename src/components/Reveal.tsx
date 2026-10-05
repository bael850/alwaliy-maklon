import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  /** Jeda animasi dalam detik, untuk efek stagger antar elemen. */
  delay?: number;
  /** Jarak geser vertikal awal (px). */
  y?: number;
  className?: string;
}

// Satu observer dipakai semua Reveal, jauh lebih ringan daripada satu
// ScrollTrigger per elemen. Animasinya murni CSS (opacity + transform).
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
      { rootMargin: "0px 0px -12% 0px", threshold: 0.01 },
    );
  }
  return observer;
}

export default function Reveal({
  children,
  delay = 0,
  y = 28,
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
      className={["reveal", className].filter(Boolean).join(" ")}
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
