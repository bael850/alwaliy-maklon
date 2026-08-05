import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "../../i18n/LanguageContext";

export default function Faq() {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-5 md:px-8">
        <div className="mb-12">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-gold">
            {t.faq.eyebrow}
          </p>
          <h2 className="font-heading text-3xl font-extrabold leading-tight text-forest md:text-4xl">
            {t.faq.heading}
          </h2>
        </div>

        <div className="divide-y divide-forest/10 border-y border-forest/10">
          {t.faq.faqs.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={item.q}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center gap-3.5 py-5 text-left"
                >
                  {/* Badge huruf — biar kerasa sesi tanya-jawab konsultasi,
                      bukan accordion FAQ generik. Hurufnya ikut bahasa aktif
                      ("T" untuk Tanya, "Q" untuk Question). */}
                  <span
                    aria-hidden="true"
                    className={[
                      "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border font-heading text-xs font-bold transition-colors duration-200",
                      isOpen
                        ? "border-forest bg-forest text-cream"
                        : "border-forest/25 text-forest/60",
                    ].join(" ")}
                  >
                    {t.faq.badgeLetter}
                  </span>
                  <span className="flex-1 font-heading text-base font-bold text-forest md:text-lg">
                    {item.q}
                  </span>
                  <ChevronDown
                    size={20}
                    strokeWidth={2.5}
                    className={[
                      "shrink-0 text-gold transition-transform duration-200",
                      isOpen ? "rotate-180" : "",
                    ].join(" ")}
                  />
                </button>
                <div
                  className={[
                    "grid overflow-hidden transition-all duration-300 ease-in-out",
                    isOpen
                      ? "grid-rows-[1fr] opacity-100 pb-5"
                      : "grid-rows-[0fr] opacity-0",
                  ].join(" ")}
                >
                  <div className="min-h-0 pl-[2.6rem]">
                    {/* Aksen garis kiri pada jawaban — kesan "kutipan
                        jawaban konsultasi", nyambung ke badge huruf di atas */}
                    <p className="border-l-2 border-gold/40 pl-4 text-sm leading-relaxed text-ink/70 md:text-base">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
