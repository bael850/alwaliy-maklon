import { useRef, useState, type KeyboardEvent } from "react";
import { ArrowRight } from "lucide-react";
import Reveal from "../Reveal";
import { useLanguage } from "../../i18n/LanguageContext";

export default function Workflow() {
  const { t } = useLanguage();
  const tracks = t.workflow.tracks;

  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const track = tracks[active];

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
    <section id="workflow" className="bg-forest py-16 md:py-32">
      <style>{`
        .wf-swap { animation: wfSwap 0.5s ease-out; }
        @keyframes wfSwap { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
        @media (prefers-reduced-motion: reduce) { .wf-swap { animation: none; } }
      `}</style>

      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal className="max-w-3xl">
          <p className="mb-5 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.14em] text-gold-light">
            <span aria-hidden="true" className="h-px w-10 bg-gold" />
            {t.workflow.eyebrow}
          </p>
          <h2 className="font-heading text-3xl font-extrabold leading-[1.08] text-cream sm:text-4xl md:text-6xl">
            {t.workflow.heading}
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-cream/70">
            {t.workflow.paragraph}
          </p>
        </Reveal>

        {/* Tab jalur: teks bergaris bawah, bukan kotak */}
        <div
          role="tablist"
          aria-label={t.workflow.tabsAria}
          className="mt-10 flex gap-6 overflow-x-auto border-b border-cream/20 md:mt-16 md:gap-12"
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
                  "-mb-px shrink-0 whitespace-nowrap border-b-2 pb-4 font-heading text-base font-bold transition-colors duration-300 md:text-2xl",
                  isActive
                    ? "border-gold text-cream"
                    : "border-transparent text-cream/45 hover:text-cream/80",
                ].join(" ")}
              >
                {item.name}
              </button>
            );
          })}
        </div>

        <div
          key={active}
          id="wf-panel"
          role="tabpanel"
          aria-labelledby={`wf-tab-${active}`}
          className="wf-swap"
        >
          <p
            className="mt-6 max-w-2xl text-base leading-relaxed text-cream/80 md:text-lg"
            aria-live="polite"
          >
            {track.blurb}
          </p>

          {/* Tahapan: baris bernomor besar, judul di tengah, penjelasan di kanan */}
          <ol className="mt-10 border-t border-cream/20 md:mt-14">
            {track.steps.map((step, i) => (
              <li
                key={step.title}
                className="grid grid-cols-[3.5rem_1fr] gap-x-4 border-b border-cream/15 py-6 md:grid-cols-[6rem_1fr_1.2fr] md:items-baseline md:gap-x-8 md:py-9"
              >
                <span className="font-heading text-3xl font-extrabold leading-none tabular-nums text-gold md:text-5xl">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-heading text-xl font-bold leading-snug text-cream md:text-2xl">
                  {step.title}
                </h3>
                <p className="col-start-2 mt-2 text-[15px] leading-relaxed text-cream/70 md:col-start-3 md:mt-0 md:text-base">
                  {step.desc}
                </p>
              </li>
            ))}
          </ol>

          <div className="mt-12 md:mt-16">
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
