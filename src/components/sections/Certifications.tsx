import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CERTS = [
  {
    code: "MUI-HAL",
    label: "Sertifikat Halal",
    issuer: "BPJPH / MUI",
    rotate: -6,
  },
  {
    code: "POM-NA",
    label: "Notifikasi BPOM",
    issuer: "Badan POM RI",
    rotate: 4,
  },
  {
    code: "COA-QC",
    label: "Certificate of Analysis",
    issuer: "Lab Internal",
    rotate: -3,
  },
  {
    code: "GMP-STD",
    label: "Standar GMP",
    issuer: "Fasilitas Produksi",
    rotate: 5,
  },
];

export function Certifications() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('[data-cert="heading"]', {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: { trigger: rootRef.current, start: "top 75%" },
      });

      const cards = gsap.utils.toArray<HTMLElement>('[data-cert="card"]');
      cards.forEach((card, i) => {
        const stamp = card.querySelector('[data-cert="stamp"]');
        const rotate = card.dataset.rotate || "0";

        gsap.from(card, {
          opacity: 0,
          y: 16,
          duration: 0.4,
          delay: i * 0.12,
          ease: "power2.out",
          scrollTrigger: { trigger: '[data-cert="grid"]', start: "top 78%" },
        });

        gsap.fromTo(
          stamp,
          { opacity: 0, scale: 2.4, rotate: 0 },
          {
            opacity: 1,
            scale: 1,
            rotate,
            duration: 0.35,
            delay: i * 0.12 + 0.25,
            ease: "power4.out",
            scrollTrigger: { trigger: '[data-cert="grid"]', start: "top 78%" },
          },
        );
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      id="certifications"
      className="border-b border-hairline py-20 md:py-28"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div data-cert="heading" className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-stamp">
            Sertifikasi
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold leading-tight tracking-tight text-ink md:text-4xl">
            Legalitas yang benar-benar tercap, bukan sekadar tercantum.
          </h2>
        </div>

        <div
          data-cert="grid"
          className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {CERTS.map((c) => (
            <div
              key={c.code}
              data-cert="card"
              data-rotate={c.rotate}
              className="relative overflow-hidden rounded-sm border border-hairline bg-white/60 p-6 pb-10"
            >
              <span className="font-mono text-[11px] uppercase tracking-widest text-ink/40">
                {c.code}
              </span>
              <h3 className="mt-2 font-display text-base font-semibold leading-snug text-ink">
                {c.label}
              </h3>
              <p className="mt-1 font-body text-xs text-ink/50">{c.issuer}</p>

              <div
                data-cert="stamp"
                className="pointer-events-none absolute bottom-3 right-3 flex h-16 w-16 items-center justify-center rounded-full border-2 border-stamp/80 text-center mix-blend-multiply"
              >
                <span className="font-mono text-[7px] font-semibold uppercase leading-tight tracking-widest text-stamp">
                  Verified
                  <br />
                  Al-Waliy
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
