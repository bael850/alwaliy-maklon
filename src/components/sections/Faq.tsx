import { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQS = [
  {
    q: "Berapa minimal order (MOQ) untuk maklon di Al-Waliy?",
    a: "MOQ bervariasi tergantung jenis produk dan kompleksitas formula. Kami punya opsi untuk brand baru dengan MOQ lebih ringan maupun untuk brand yang siap scale-up produksi besar. Diskusikan kebutuhan Anda saat konsultasi.",
  },
  {
    q: "Berapa lama proses dari konsultasi sampai produk jadi?",
    a: "Rata-rata 6-10 minggu, tergantung kompleksitas formula dan proses pengurusan legalitas (halal/BPOM). Produk dengan formula existing yang tinggal disesuaikan bisa lebih cepat.",
  },
  {
    q: "Apakah saya bisa custom formula sendiri?",
    a: "Bisa. Tim R&D kami akan membantu mengembangkan formula sesuai konsep dan kebutuhan brand Anda, termasuk penyesuaian bahan aktif, tekstur, dan wangi.",
  },
  {
    q: "Siapa yang mengurus sertifikat halal dan BPOM?",
    a: "Kami yang menangani seluruh proses pengurusan sertifikasi halal dan notifikasi BPOM atas nama produk Anda, sehingga Anda tidak perlu mengurusnya sendiri dari nol.",
  },
  {
    q: "Apakah kemasan juga disediakan oleh Al-Waliy?",
    a: "Ya, kami menyediakan opsi kemasan standar maupun custom sesuai desain brand Anda, termasuk proses pengisian dan pelabelan.",
  },
];

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="border-b border-hairline py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-6">
        <div className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-stamp">
            FAQ
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold leading-tight tracking-tight text-ink md:text-4xl">
            Pertanyaan yang sering diajukan.
          </h2>
        </div>

        <div className="mt-12 divide-y divide-hairline border-t border-b border-hairline">
          {FAQS.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={item.q}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-display text-base font-medium text-ink md:text-lg">
                    {item.q}
                  </span>
                  <ChevronDown
                    size={18}
                    className={`shrink-0 text-ink/50 transition-transform ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {isOpen && (
                  <p className="pb-5 font-body text-sm leading-relaxed text-ink/70 md:text-[15px]">
                    {item.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
