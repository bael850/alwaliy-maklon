import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ShieldCheck, FlaskConical, PackageOpen, Users } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const REASONS = [
  {
    icon: ShieldCheck,
    title: "Sertifikasi Lengkap",
    description:
      "Fasilitas produksi standar GMP, sertifikat halal, notifikasi BPOM, dan CoA di setiap batch — bukan sekadar janji, tapi dokumen yang bisa Anda pegang.",
  },
  {
    icon: FlaskConical,
    title: "Tim R&D In-House",
    description:
      "Formulasi dikembangkan sendiri oleh tim riset kami, bukan sekadar meniru produk pasaran. Anda bisa custom formula sesuai konsep brand.",
  },
  {
    icon: PackageOpen,
    title: "MOQ Fleksibel",
    description:
      "Cocok untuk brand yang baru mulai maupun yang sudah siap scale-up produksi, tanpa harus terikat minimum order yang memberatkan.",
  },
  {
    icon: Users,
    title: "Pendampingan End-to-End",
    description:
      "Dari diskusi konsep, pengembangan formula, produksi, sampai produk siap kirim — satu tim yang sama mendampingi Anda di setiap tahap.",
  },
];

export function WhyUs() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('[data-why="heading"]', {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: { trigger: rootRef.current, start: "top 75%" },
      });

      gsap.from('[data-why="card"]', {
        opacity: 0,
        y: 24,
        duration: 0.6,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: '[data-why="grid"]', start: "top 80%" },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      id="why-us"
      className="border-b border-hairline py-20 md:py-28"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div data-why="heading" className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-stamp">
            Kenapa Al-Waliy
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold leading-tight tracking-tight text-ink md:text-4xl">
            Mitra produksi, bukan sekadar pabrik.
          </h2>
        </div>

        <div
          data-why="grid"
          className="mt-14 grid gap-6 md:grid-cols-2 md:gap-8"
        >
          {REASONS.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              data-why="card"
              className="rounded-sm border border-hairline bg-white/50 p-7 md:p-8"
            >
              <Icon size={26} className="text-forest" strokeWidth={1.75} />
              <h3 className="mt-5 font-display text-lg font-semibold text-ink">
                {title}
              </h3>
              <p className="mt-2.5 font-body text-[15px] leading-relaxed text-ink/70">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
