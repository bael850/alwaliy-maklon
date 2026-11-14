import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "../Reveal";
import { useLanguage } from "../../i18n/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

export default function Workflow() {
  const { t } = useLanguage();
  const tracks = t.workflow.tracks;

  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const timelineRef = useRef<HTMLOListElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);

  const track = tracks[active];

  // Garis emas mengisi mengikuti scroll (satu tween ber-scrub). Tahap yang
  // sudah lewat "menyala" lewat satu IntersectionObserver, lebih ringan dari
  // satu ScrollTrigger per tahap. Dibangun ulang tiap ganti jalur.
  useEffect(() => {
    const timeline = timelineRef.current;
    const fill = fillRef.current;
    if (!timeline || !fill) return;

    const rows = Array.from(
      timeline.querySelectorAll<HTMLElement>("[data-step]"),
    );

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(fill, { scaleY: 1 });
      rows.forEach((row) => (row.dataset.lit = "true"));
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        fill,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: timeline,
            start: "top 65%",
            end: "bottom 60%",
            scrub: true,
          },
        },
      );
    }, timeline);

    // Menyala bila tahap sudah melewati garis 65% tinggi layar;
    // padam lagi bila ditarik balik ke bawah garis itu.
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const el = entry.target as HTMLElement;
          const passed =
            entry.isIntersecting ||
            entry.boundingClientRect.top < (entry.rootBounds?.top ?? 0);
          if (passed) el.dataset.lit = "true";
          else delete el.dataset.lit;
        }
      },
      { rootMargin: "0px 0px -35% 0px", threshold: 0 },
    );
    rows.forEach((row) => io.observe(row));

    const raf = requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ctx.revert();
    };
  }, [active]);

  // Navigasi tab dengan panah kiri/kanan (pola WAI-ARIA tabs).
  const onTabKeyDown = (e: KeyboardEvent, i: number) => {
    const total = tracks.length;
    let next = i;
    if (e.key === "ArrowRight") next = (i + 1) % total;
    else if (e.key === "ArrowLeft") next = (i - 1 + total) % total;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = total - 1;
    else return;
    e.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <section id="workflow" className="bg-forest py-16 md:py-28">
      <style>{`
        .wf-swap { animation: wfSwap 0.5s ease-out; }
        @keyframes wfSwap { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
        @media (prefers-reduced-motion: reduce) { .wf-swap { animation: none; } }
      `}</style>

      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <div className="max-w-2xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-gold-light">
              {t.workflow.eyebrow}
            </p>
            <h2 className="font-heading text-3xl font-extrabold leading-tight text-cream md:text-5xl">
              {t.workflow.heading}
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-cream/70 md:text-base">
              {t.workflow.paragraph}
            </p>
          </div>
        </Reveal>

        {/* Tab jalur kerja sama */}
        <div
          role="tablist"
          aria-label={t.workflow.tabsAria}
          className="mt-8 grid grid-cols-3 gap-2 md:mt-14 md:gap-4"
        >
          {tracks.map((item, i) => {
            const isActive = i === active;
            return (
              <button
                key={item.name}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`wf-tab-${i}`}
                aria-selected={isActive}
                aria-controls="wf-panel"
                tabIndex={isActive ? 0 : -1}
                onClick={() => setActive(i)}
                onKeyDown={(e) => onTabKeyDown(e, i)}
                className={[
                  "rounded-[4px] border px-2 py-3 text-center transition-colors duration-300 md:p-5 md:text-left",
                  isActive
                    ? "border-gold bg-cream text-forest"
                    : "border-cream/20 text-cream hover:border-gold-light",
                ].join(" ")}
              >
                <span className="block font-heading text-[13px] font-bold leading-tight min-[400px]:text-sm md:mt-1 md:text-xl md:leading-snug">
                  {item.name}
                </span>
                <span
                  className={[
                    "mt-2 hidden text-sm leading-relaxed md:block",
                    isActive ? "text-ink/70" : "text-cream/60",
                  ].join(" ")}
                >
                  {item.blurb}
                </span>
              </button>
            );
          })}
        </div>

        {/* HP: penjelasan jalur yang aktif */}
        <p
          key={`blurb-${active}`}
          className="wf-swap mt-4 text-[15px] leading-relaxed text-cream/80 md:hidden"
          aria-live="polite"
        >
          {track.blurb}
        </p>

        {/* Timeline A-Z — key=active supaya animasi masuk ulang tiap ganti jalur */}
        <div
          key={active}
          id="wf-panel"
          role="tabpanel"
          aria-labelledby={`wf-tab-${active}`}
          className="wf-swap mt-10 md:mt-20"
        >
          <ol ref={timelineRef} className="relative">
            {/* Garis dasar + isian emas */}
            <div
              aria-hidden="true"
              className="absolute bottom-4 left-5 top-4 w-px bg-cream/15 md:left-1/2 md:-translate-x-1/2"
            >
              <div
                ref={fillRef}
                className="h-full w-full origin-top bg-gradient-to-b from-gold via-gold to-gold-light"
                style={{ transform: "scaleY(0)" }}
              />
            </div>

            {track.steps.map((step, i) => {
              const isLeft = i % 2 === 0;
              return (
                <li
                  key={step.title}
                  data-step
                  className="group relative pb-10 pl-16 last:pb-0 md:grid md:grid-cols-2 md:gap-0 md:pb-14 md:pl-0"
                >
                  {/* Penanda tahap — menyala emas saat dilewati */}
                  <span className="absolute left-0 top-0 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-cream/30 bg-forest font-heading text-sm font-bold text-cream/70 transition-colors duration-500 group-data-[lit=true]:border-gold group-data-[lit=true]:bg-gold group-data-[lit=true]:text-forest group-data-[lit=true]:shadow-[0_0_0_6px_rgba(212,175,106,0.18)] md:left-1/2 md:-translate-x-1/2">
                    <span className="tabular-nums">{i + 1}</span>
                  </span>

                  <div
                    className={[
                      "rounded-[4px] border border-cream/15 bg-cream/[0.04] p-5 translate-y-1 opacity-60 transition-[opacity,transform,border-color,background-color] duration-500 group-data-[lit=true]:border-gold/50 group-data-[lit=true]:bg-cream/[0.08] group-data-[lit=true]:opacity-100 md:p-6 group-data-[lit=true]:translate-y-0",
                      isLeft
                        ? "md:col-start-1 md:mr-14 md:text-right"
                        : "md:col-start-2 md:ml-14",
                    ].join(" ")}
                  >
                    <h3 className="font-heading text-lg font-bold text-cream md:text-xl">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-cream/70 md:text-base">
                      {step.desc}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>

          <div className="mt-12 flex justify-center md:mt-16">
            <a
              href="#contact"
              className="btn-gold inline-flex items-center gap-2 px-6 py-3.5 text-sm"
            >
              {t.workflow.ctaLabel}
              <ArrowRight size={16} strokeWidth={2.5} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
