import { useState } from "react";
import { faqs } from "../../lib/data";

export default function Faq() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="border-t border-forest-600/60 bg-forest-800/40 px-6 py-20"
    >
      <div className="mx-auto max-w-3xl">
        <h2 className="font-display text-3xl font-semibold text-parchment">
          Pertanyaan yang sering diajukan
        </h2>
        <div className="mt-8 divide-y divide-forest-600/60">
          {faqs.map((f, i) => {
            const isOpen = openIdx === i;
            return (
              <div key={f.q}>
                <button
                  className="focus-ring flex w-full items-center justify-between gap-4 py-5 text-left"
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                  aria-expanded={isOpen}
                >
                  <span className="font-medium text-parchment">{f.q}</span>
                  <span
                    className={`shrink-0 text-honey transition-transform ${isOpen ? "rotate-45" : ""}`}
                  >
                    +
                  </span>
                </button>
                {isOpen && (
                  <p className="pb-5 text-sm text-parchment-muted">{f.a}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
