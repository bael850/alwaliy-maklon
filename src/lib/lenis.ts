import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Nyalain smooth inertia-scroll (Lenis) dan nyambungin ke GSAP ticker
 * biar ScrollTrigger tetap akurat. Otomatis di-skip kalau user
 * punya preferensi "reduced motion" di OS/browser-nya.
 *
 * Return function cleanup — panggil di useEffect cleanup React.
 */
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

  lenis.on("scroll", ScrollTrigger.update);

  const tickerFn = (time: number) => {
    lenis.raf(time * 1000);
  };
  gsap.ticker.add(tickerFn);
  gsap.ticker.lagSmoothing(0);

  return () => {
    gsap.ticker.remove(tickerFn);
    lenis.destroy();
  };
}
