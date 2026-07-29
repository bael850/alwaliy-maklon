import { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQS = [
  {
    q: "Berapa minimal order untuk layanan maklon?",
    a: "Minimal order kami sengaja fleksibel, disesuaikan jenis produk (serbuk, kapsul, cair, atau madu) dan kompleksitas formulasi — cocok baik untuk brand baru yang mau mulai skala kecil maupun yang sudah siap produksi lebih besar. Tim kami akan hitungkan MOQ paling efisien untuk Anda saat konsultasi.",
  },
  {
    q: "Apakah saya perlu formulasi sendiri?",
    a: "Tidak wajib. Anda bisa datang dengan formulasi sendiri, atau berdiskusi dengan tim kami untuk mengembangkan formulasi baru sesuai konsep produk yang Anda inginkan.",
  },
  {
    q: "Apakah legalitas produk (BPOM/Halal) diurus oleh Al-Waliy?",
    a: "Ya, kami membantu proses registrasi BPOM dan sertifikasi Halal MUI untuk produk yang diproduksi di fasilitas kami, sebagai bagian dari layanan maklon.",
  },
  {
    q: "Berapa lama proses dari konsultasi sampai produk jadi?",
    a: "Estimasi waktu tergantung kompleksitas formulasi dan proses legalitas, umumnya berkisar beberapa minggu hingga beberapa bulan. Timeline detail akan dibahas saat konsultasi awal.",
  },
  {
    q: "Bagaimana skema pembayaran untuk maklon?",
    a: "Skema pembayaran kami fleksibel dan disesuaikan dengan skala kerja sama, umumnya menggunakan sistem bertahap (DP di awal, pelunasan setelah produksi) agar lebih ringan bagi Anda. Detail lengkap akan dibahas saat konsultasi.",
  },
  {
    q: "Apakah kemasan dan desain juga disediakan?",
    a: "Ya, kami menyediakan dukungan desain kemasan dan branding sebagai bagian dari layanan, sehingga produk Anda siap dipasarkan dengan identitas merek yang jelas.",
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-5 md:px-8">
        <div className="mb-12">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-gold">
            Pertanyaan Umum
          </p>
          <h2 className="font-heading text-3xl font-extrabold leading-tight text-forest md:text-4xl">
            Masih Ada yang Ingin Ditanyakan?
          </h2>
        </div>

        <div className="divide-y divide-forest/10 border-y border-forest/10">
          {FAQS.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={item.q}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                >
                  <span className="font-heading text-base font-bold text-forest md:text-lg">
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
                  <p className="min-h-0 text-sm leading-relaxed text-ink/70 md:text-base">
                    {item.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
