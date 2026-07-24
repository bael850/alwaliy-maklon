import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PRODUCTS = [
  {
    code: "SR-01",
    name: "Serum & Essence",
    desc: "Formula konsentrat untuk perawatan wajah spesifik.",
  },
  {
    code: "CR-02",
    name: "Cream & Lotion",
    desc: "Pelembap wajah dan tubuh, tekstur ringan hingga kaya.",
  },
  {
    code: "CL-03",
    name: "Sabun & Body Wash",
    desc: "Cair maupun batang, untuk wajah dan tubuh.",
  },
  {
    code: "MK-04",
    name: "Masker Wajah",
    desc: "Sheet mask, clay mask, dan wash-off mask.",
  },
  {
    code: "LP-05",
    name: "Lip Care",
    desc: "Lip balm, lip serum, hingga lip tint.",
  },
  {
    code: "HR-06",
    name: "Hair Care",
    desc: "Shampoo, conditioner, dan hair tonic.",
  },
];

export function ProductTypes() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('[data-products="heading"]', {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: { trigger: rootRef.current, start: "top 75%" },
      });
      gsap.from('[data-products="card"]', {
        opacity: 0,
        y: 20,
        duration: 0.5,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: '[data-products="grid"]', start: "top 80%" },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      id="products"
      className="border-b border-hairline py-20 md:py-28"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div data-products="heading" className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-stamp">
            Jenis Produk
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold leading-tight tracking-tight text-ink md:text-4xl">
            Satu fasilitas, beragam kategori produk.
          </h2>
        </div>

        <div
          data-products="grid"
          className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {PRODUCTS.map((p) => (
            <div
              key={p.code}
              data-products="card"
              className="rounded-sm border border-hairline bg-white/50 p-6"
            >
              <span className="font-mono text-[11px] uppercase tracking-widest text-ink/40">
                {p.code}
              </span>
              <h3 className="mt-2 font-display text-lg font-semibold text-ink">
                {p.name}
              </h3>
              <p className="mt-2 font-body text-sm leading-relaxed text-ink/70">
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
