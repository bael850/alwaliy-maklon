import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Address bar browser HP naik-turun saat scroll memicu "resize". Tanpa ini
// ScrollTrigger menghitung ulang terus dan animasi terasa patah-patah.
ScrollTrigger.config({ ignoreMobileResize: true });

/**
 * Nyalain smooth inertia-scroll (Lenis) dan nyambungin ke GSAP ticker
 * biar ScrollTrigger tetap akurat. Otomatis di-skip kalau user
 * punya preferensi "reduced motion" di OS/browser-nya.
 *
 * Return function cleanup — panggil di useEffect cleanup React.
 */
let instance: Lenis | null = null;

/**
 * Kunci / lepas scroll halaman (dipakai menu mobile). Selain overflow:hidden
 * di body, Lenis juga dihentikan supaya halaman tidak ikut bergeser di
 * belakang menu.
 */
export function setScrollLocked(locked: boolean): void {
  if (locked) instance?.stop();
  else instance?.start();
  document.body.style.overflow = locked ? "hidden" : "";
}

export function initSmoothScroll(): () => void {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (prefersReducedMotion) {
    return () => {};
  }

  const lenis = new Lenis({
    duration: 1.1,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  });

  instance = lenis;
  lenis.on("scroll", ScrollTrigger.update);

  const tickerFn = (time: number) => {
    lenis.raf(time * 1000);
  };
  gsap.ticker.add(tickerFn);
  gsap.ticker.lagSmoothing(0);

  return () => {
    gsap.ticker.remove(tickerFn);
    lenis.destroy();
    instance = null;
  };
}
