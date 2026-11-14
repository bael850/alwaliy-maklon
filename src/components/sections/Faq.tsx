import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import Reveal from "../Reveal";
import { useLanguage } from "../../i18n/LanguageContext";

export default function Faq() {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-cream py-16 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="grid gap-10 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-4">
            <div className="md:sticky md:top-28">
              <Reveal>
                <p className="mb-5 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.14em] text-gold">
                  <span aria-hidden="true" className="h-px w-10 bg-gold" />
                  {t.faq.eyebrow}
                </p>
                <h2 className="font-heading text-3xl font-extrabold leading-[1.1] text-forest md:text-4xl">
                  {t.faq.heading}
                </h2>
              </Reveal>
            </div>
          </div>

          <div className="border-t-2 border-forest md:col-span-8">
            {t.faq.faqs.map((item, i) => {
              const isOpen = openIndex === i;
              const panelId = `faq-panel-${i}`;
              return (
                <div key={item.q} className="border-b border-forest/15">
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpenIndex(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      className="flex w-full items-start gap-4 py-6 text-left md:gap-6 md:py-7"
                    >
                      <span
                        aria-hidden="true"
                        className="w-8 shrink-0 pt-1 font-heading text-sm font-bold tabular-nums text-gold"
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="flex-1 font-heading text-lg font-bold leading-snug text-forest md:text-xl">
                        {item.q}
                      </span>
                      <span
                        aria-hidden="true"
                        className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-forest/25 text-forest"
                      >
                        {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                      </span>
                    </button>
                  </h3>
                  {/* inert: jawaban yang tertutup tidak terbaca screen reader
                      dan tidak bisa di-tab */}
                  <div
                    id={panelId}
                    inert={!isOpen}
                    className={[
                      "grid transition-[grid-template-rows,opacity] duration-300 ease-in-out",
                      isOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0",
                    ].join(" ")}
                  >
                    <div className="min-h-0 overflow-hidden">
                      <p className="max-w-2xl pb-7 pl-12 text-base leading-relaxed text-ink/70 md:pl-14">
                        {item.a}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
