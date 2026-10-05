import { useMemo, useState } from "react";
import { ImageIcon, ArrowUpRight } from "lucide-react";
import Reveal from "../Reveal";
import SmartImage from "../SmartImage";
import Lightbox, { type LightboxItem } from "../Lightbox";
import { useLanguage } from "../../i18n/LanguageContext";

type Filter = "all" | "client" | "own";

interface WorkMeta {
  id: string;
  kind: "client" | "own";
  category: number;
  imageBase: string;
}

// Urutan harus 1:1 dengan t.whatWeDo.items. category = indeks t.productTypes.types
const WORK_META: WorkMeta[] = [
  { id: "w1", kind: "client", category: 0, imageBase: "/images/work/1" },
  { id: "w2", kind: "own", category: 0, imageBase: "/images/work/2" },
  { id: "w3", kind: "client", category: 1, imageBase: "/images/work/3" },
  { id: "w4", kind: "own", category: 2, imageBase: "/images/work/4" },
  { id: "w5", kind: "client", category: 1, imageBase: "/images/work/5" },
  { id: "w6", kind: "own", category: 0, imageBase: "/images/work/6" },
  { id: "w7", kind: "client", category: 2, imageBase: "/images/work/7" },
  { id: "w8", kind: "own", category: 1, imageBase: "/images/work/8" },
];

const FILTERS: Filter[] = ["all", "client", "own"];
const pad = (n: number) => String(n).padStart(2, "0");

export default function WhatWeDo() {
  const { t } = useLanguage();
  const [filter, setFilter] = useState<Filter>("all");
  const [active, setActive] = useState(0);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const categories = t.productTypes.types;

  const visible = useMemo(
    () =>
      WORK_META.map((meta, i) => ({ meta, text: t.whatWeDo.items[i] })).filter(
        ({ meta }) => filter === "all" || meta.kind === filter,
      ),
    [filter, t.whatWeDo.items],
  );

  const current = Math.min(active, visible.length - 1);
  const now = visible[current];

  const count = (f: Filter) =>
    f === "all"
      ? WORK_META.length
      : WORK_META.filter((m) => m.kind === f).length;

  const label = (kind: WorkMeta["kind"], client: string) =>
    kind === "client"
      ? `${t.whatWeDo.forClient} ${client}`
      : t.whatWeDo.ownProduct;

  const lightboxItems: LightboxItem[] = visible.map(({ meta, text }) => ({
    id: meta.id,
    imageBase: meta.imageBase,
    title: text.name,
    meta: categories[meta.category].title,
    description: label(meta.kind, text.client),
    fallback: <ImageIcon size={56} strokeWidth={1.5} />,
  }));

  return (
    <section id="what" className="bg-forest py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <div className="grid gap-6 md:grid-cols-12 md:items-end">
            <div className="md:col-span-7">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-gold-light">
                {t.whatWeDo.eyebrow}
              </p>
              <h2 className="font-heading text-3xl font-extrabold leading-[1.1] text-cream md:text-5xl">
                {t.whatWeDo.heading}
              </h2>
            </div>
            <p className="text-sm leading-relaxed text-cream/70 md:col-span-5 md:text-base">
              {t.whatWeDo.paragraph}
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-12 grid gap-8 md:mt-16 md:grid-cols-12 md:gap-12">
            {/* Panggung: foto besar yang berganti */}
            <div className="md:order-2 md:col-span-7">
              <button
                type="button"
                onClick={() => setOpenIndex(current)}
                aria-label={`${t.whatWeDo.viewAriaPrefix}${now.text.name}`}
                className="group relative block aspect-[4/5] w-full overflow-hidden rounded-[4px] bg-cream/5 text-left md:aspect-[5/6]"
              >
                {visible.map(({ meta, text }, i) => (
                  <div
                    key={meta.id}
                    aria-hidden={i !== current}
                    className={[
                      "absolute inset-0 transition-[opacity,transform] duration-700 ease-out",
                      i === current
                        ? "scale-100 opacity-100"
                        : "scale-105 opacity-0",
                    ].join(" ")}
                  >
                    <SmartImage
                      basePath={meta.imageBase}
                      alt={i === current ? text.name : ""}
                      className="h-full w-full object-cover"
                      fallback={
                        <div className="flex h-full w-full items-center justify-center">
                          <ImageIcon
                            size={56}
                            strokeWidth={1.25}
                            className="text-cream/20"
                          />
                        </div>
                      }
                    />
                  </div>
                ))}

                <div className="absolute inset-0 bg-gradient-to-t from-forest/90 via-transparent to-forest/30" />

                <div className="absolute inset-x-0 top-0 flex items-start justify-between p-5 md:p-6">
                  <span className="font-heading text-5xl font-extrabold leading-none text-gold md:text-7xl">
                    {pad(current + 1)}
                  </span>
                  <span
                    className={[
                      "rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.1em]",
                      now.meta.kind === "own"
                        ? "bg-gold text-forest"
                        : "bg-cream/90 text-forest",
                    ].join(" ")}
                  >
                    {now.meta.kind === "own"
                      ? t.whatWeDo.ownBadge
                      : t.whatWeDo.clientBadge}
                  </span>
                </div>

                <div
                  key={now.meta.id}
                  className="wwd-caption absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 md:p-6"
                >
                  <div className="min-w-0">
                    <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-gold-light">
                      {categories[now.meta.category].title}
                    </p>
                    <h3 className="mt-1 font-heading text-xl font-extrabold leading-tight text-cream md:text-3xl">
                      {now.text.name}
                    </h3>
                    <p className="mt-1 text-sm text-cream/70">
                      {label(now.meta.kind, now.text.client)}
                    </p>
                  </div>
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold text-forest transition-transform duration-300 group-hover:scale-110">
                    <ArrowUpRight size={20} />
                  </span>
                </div>
              </button>
            </div>

            {/* Indeks: filter + daftar judul */}
            <div className="md:order-1 md:col-span-5">
              <div
                role="group"
                aria-label={t.whatWeDo.filterAria}
                className="flex flex-wrap gap-x-6 gap-y-2 border-b border-cream/15"
              >
                {FILTERS.map((f) => (
                  <button
                    key={f}
                    type="button"
                    aria-pressed={filter === f}
                    onClick={() => {
                      setFilter(f);
                      setActive(0);
                      setOpenIndex(null);
                    }}
                    className={[
                      "-mb-px border-b-2 pb-3 text-sm font-semibold transition-colors",
                      filter === f
                        ? "border-gold text-cream"
                        : "border-transparent text-cream/50 hover:text-cream",
                    ].join(" ")}
                  >
                    {t.whatWeDo.filters[f]}
                    <span className="ml-1.5 text-xs tabular-nums text-cream/40">
                      {count(f)}
                    </span>
                  </button>
                ))}
              </div>

              <ul className="mt-2">
                {visible.map(({ meta, text }, i) => {
                  const on = i === current;
                  return (
                    <li key={meta.id} className="border-b border-cream/10">
                      <button
                        type="button"
                        aria-current={on}
                        onClick={() => setActive(i)}
                        onPointerEnter={(e) => {
                          if (e.pointerType === "mouse") setActive(i);
                        }}
                        onFocus={() => setActive(i)}
                        className="group flex w-full items-baseline gap-4 py-4 text-left"
                      >
                        <span
                          className={[
                            "w-7 shrink-0 font-heading text-sm font-bold tabular-nums transition-colors",
                            on ? "text-gold" : "text-cream/30",
                          ].join(" ")}
                        >
                          {pad(i + 1)}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span
                            className={[
                              "block font-heading text-base font-bold leading-snug transition-all duration-300 md:text-lg",
                              on
                                ? "translate-x-1 text-cream"
                                : "text-cream/50 group-hover:text-cream/80",
                            ].join(" ")}
                          >
                            {text.name}
                          </span>
                          <span
                            className={[
                              "mt-0.5 block text-xs transition-colors",
                              on ? "text-gold-light" : "text-cream/35",
                            ].join(" ")}
                          >
                            {categories[meta.category].title}
                            {" / "}
                            {label(meta.kind, text.client)}
                          </span>
                        </span>
                        <span
                          aria-hidden="true"
                          className={[
                            "h-px shrink-0 bg-gold transition-all duration-500",
                            on ? "w-8" : "w-0",
                          ].join(" ")}
                        />
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>

      <style>{`
        .wwd-caption { animation: wwdCaption 0.55s cubic-bezier(0.22, 1, 0.36, 1) both; }
        @keyframes wwdCaption { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
        @media (prefers-reduced-motion: reduce) { .wwd-caption { animation: none; } }
      `}</style>

      <Lightbox
        items={lightboxItems}
        index={openIndex}
        onClose={() => setOpenIndex(null)}
        onIndexChange={setOpenIndex}
        labels={{
          close: t.whatWeDo.closeAria,
          prev: t.whatWeDo.prevAria,
          next: t.whatWeDo.nextAria,
        }}
      />
    </section>
  );
}
