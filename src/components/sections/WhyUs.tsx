import { useEffect, useRef } from "react";
import { Camera } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "../Reveal";
import SmartImage from "../SmartImage";
import { useLanguage } from "../../i18n/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

export default function WhyUs() {
  const { t } = useLanguage();
  const photoRef = useRef<HTMLDivElement>(null);
  const checkRefs = useRef<Array<SVGPathElement | null>>([]);

  // Foto bukti mutu "jatuh & mendarat" ke clipboard — bukan cuma fade,
  // tapi turun dari atas dengan sedikit overshoot rotasi, kayak beneran
  // baru dijepretkan ke lembar checklist.
  useEffect(() => {
    const el = photoRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) return;

    // Mulai dari rotasi berbeda dari posisi istirahat (rotate-6 di className)
    // supaya back.out kerasa "mendarat miring" alih-alih diam di tempat.
    gsap.set(el, { y: -60, opacity: 0, rotate: -14 });

    const ctx = gsap.context(() => {
      gsap.to(el, {
        y: 0,
        opacity: 1,
        rotate: 6,
        duration: 0.7,
        delay: 0.5,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          once: true,
        },
      });
    }, photoRef);

    return () => ctx.revert();
  }, []);

  // Centang "digambar" pas item-nya sendiri masuk viewport — dipisah dari
  // CSS animation-delay biasa karena section ini jauh di bawah halaman;
  // delay berbasis waktu-mount bisa keburu selesai sebelum user scroll
  // sampai sini. Tiap path dapat trigger ScrollTrigger sendiri-sendiri.
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const paths = checkRefs.current.filter(
      (p): p is SVGPathElement => p !== null,
    );
    if (paths.length === 0) return;

    if (prefersReducedMotion) {
      gsap.set(paths, { strokeDashoffset: 0 });
      return;
    }

    gsap.set(paths, { strokeDasharray: 16, strokeDashoffset: 16 });

    const ctx = gsap.context(() => {
      paths.forEach((path, i) => {
        gsap.to(path, {
          strokeDashoffset: 0,
          duration: 0.35,
          delay: 0.35 + i * 0.06,
          ease: "power1.out",
          scrollTrigger: {
            trigger: path,
            start: "top 90%",
            once: true,
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="grid gap-12 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:gap-16 md:items-start">
          {/* Kiri: framing singkat */}
          <Reveal>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-gold">
              {t.whyUs.eyebrow}
            </p>
            <h2 className="font-heading text-3xl font-extrabold leading-tight text-forest md:text-4xl">
              {t.whyUs.heading}
            </h2>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-ink/70 md:text-base">
              {t.whyUs.paragraph}
            </p>
          </Reveal>

          {/* Kanan: disajikan sebagai clipboard lembar pemeriksaan mutu —
              jepitan logam di atas, lubang ring binder di kiri, tiap alasan
              jadi item checklist. Konsisten dengan nuansa produksi/QC herbal,
              dan beda dari pola tag, stempel, chat, nota, & filmstrip di
              section lain. */}
          <Reveal delay={0.08}>
            <div className="relative mt-4 rounded-[3px] border border-forest/15 bg-white pb-2 pl-9 pr-6 pt-9 shadow-[0_14px_36px_-16px_rgba(28,44,34,0.3)] md:pl-11 md:pr-8">
              {/* Jepitan logam clipboard */}
              <div
                aria-hidden="true"
                className="absolute left-1/2 top-0 h-6 w-24 -translate-x-1/2 -translate-y-1/2 rounded-[4px] bg-gradient-to-b from-[#d9d9d4] via-[#a8a8a2] to-[#8a8a84] shadow-[0_2px_6px_rgba(0,0,0,0.35)]"
              >
                <div className="absolute left-1/2 top-1/2 h-2 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#6f6f6a]" />
              </div>

              {/* Foto bukti — PLACEHOLDER: taruh file di
                  public/images/whyus/bukti-mutu.(webp|jpg|png). Ditampilkan
                  miring & menempel di pojok, seolah foto beneran dilampirkan
                  ke lembar checklist (kayak dokumentasi inspeksi mutu asli).
                  Disembunyikan di layar sangat kecil biar gak numpuk sama
                  jepitan clipboard. */}
              <div
                ref={photoRef}
                className="absolute -right-3 -top-4 z-20 hidden w-24 rotate-6 sm:block md:-right-5 md:-top-6 md:w-28"
              >
                <div className="border-[5px] border-white bg-white shadow-[0_10px_20px_rgba(0,0,0,0.25)]">
                  <div className="flex aspect-[4/5] items-center justify-center overflow-hidden bg-forest/5">
                    <SmartImage
                      basePath="/images/whyus/bukti-mutu"
                      alt={t.whyUs.photoAlt}
                      className="h-full w-full object-cover"
                      fallback={
                        <Camera
                          size={22}
                          strokeWidth={1.5}
                          className="text-forest/30"
                        />
                      }
                    />
                  </div>
                </div>
              </div>

              {/* Lubang ring binder di margin kiri — strip mask berulang
                  (teknik sama seperti sprocket film & tepi nota), jadi
                  otomatis rapi ngikutin tinggi card berapa pun, gak
                  "nyasar" ke tengah teks seperti versi 3-titik sebelumnya. */}
              <div
                aria-hidden="true"
                className="absolute bottom-6 left-3 top-9 w-3 md:left-4"
                style={{
                  WebkitMaskImage:
                    "radial-gradient(circle at 6px 8px, transparent 4px, black 4.5px)",
                  maskImage:
                    "radial-gradient(circle at 6px 8px, transparent 4px, black 4.5px)",
                  WebkitMaskSize: "12px 26px",
                  maskSize: "12px 26px",
                  WebkitMaskRepeat: "repeat-y",
                  maskRepeat: "repeat-y",
                  backgroundColor: "rgba(27,67,50,0.12)",
                }}
              />

              {/* Judul lembar, ala kop dokumen QC */}
              <div className="mb-1 border-b border-dashed border-forest/20 pb-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-gold">
                  {t.whyUs.sheetTitle}
                </p>
              </div>

              <div className="divide-y divide-dashed divide-forest/15">
                {t.whyUs.reasons.map((reason, i) => (
                  <Reveal key={reason.title} delay={0.14 + i * 0.08}>
                    <div className="flex items-start gap-4 py-5">
                      {/* Checkbox — centangnya "digambar" (stroke-dashoffset,
                          teknik sama kayak kabel di AboutMaklon), telat
                          dikit dari kotaknya sendiri biar kerasa dua gerakan
                          terpisah: kotak muncul, baru dicentang. */}
                      <span
                        aria-hidden="true"
                        className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-[3px] border-2 border-forest bg-forest text-cream"
                      >
                        <svg
                          viewBox="0 0 16 16"
                          className="h-3.5 w-3.5"
                          fill="none"
                        >
                          <path
                            ref={(el) => {
                              checkRefs.current[i] = el;
                            }}
                            d="M3 8.5L6.2 11.5L13 4.5"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                      <div>
                        <h3 className="font-heading text-base font-bold text-forest">
                          {reason.title}
                        </h3>
                        <p className="mt-1 text-sm leading-relaxed text-ink/70">
                          {reason.desc}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
