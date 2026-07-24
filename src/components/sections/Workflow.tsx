import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    num: "01",
    title: "Konsultasi & Riset",
    desc: "Diskusi konsep, target pasar, dan kebutuhan produk Anda.",
  },
  {
    num: "02",
    title: "Formulasi & Sample",
    desc: "Tim R&D mengembangkan formula, Anda evaluasi dan revisi sample.",
  },
  {
    num: "03",
    title: "Legalitas",
    desc: "Pengurusan sertifikasi halal, notifikasi BPOM, dan CoA.",
  },
  {
    num: "04",
    title: "Produksi",
    desc: "Produksi massal sesuai standar GMP dengan quality control ketat.",
  },
  {
    num: "05",
    title: "Pengiriman",
    desc: "Produk jadi dikemas dan dikirim, siap Anda pasarkan.",
  },
];

export function Workflow() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('[data-flow="heading"]', {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: { trigger: rootRef.current, start: "top 75%" },
      });
      gsap.from('[data-flow="step"]', {
        opacity: 0,
        x: -16,
        duration: 0.5,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: '[data-flow="list"]', start: "top 80%" },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      id="process"
      className="border-b border-hairline py-20 md:py-28"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div data-flow="heading" className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-stamp">
            Alur Kerja
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold leading-tight tracking-tight text-ink md:text-4xl">
            Dari diskusi sampai produk di tangan Anda.
          </h2>
        </div>

        <div
          data-flow="list"
          className="mt-14 divide-y divide-hairline border-t border-b border-hairline"
        >
          {STEPS.map((s) => (
            <div
              key={s.num}
              data-flow="step"
              className="flex flex-col gap-2 py-6 md:flex-row md:items-baseline md:gap-8 md:py-7"
            >
              <span className="font-mono text-sm text-stamp md:w-12 md:shrink-0">
                {s.num}
              </span>
              <h3 className="font-display text-lg font-semibold text-ink md:w-56 md:shrink-0">
                {s.title}
              </h3>
              <p className="font-body text-sm leading-relaxed text-ink/70 md:text-[15px]">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
