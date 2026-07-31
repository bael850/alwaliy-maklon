import { Building2, ShieldCheck, Users } from "lucide-react";
import Reveal from "../Reveal";

const FACTS = [
  {
    icon: Building2,
    title: "Berdiri Sejak 2014",
    desc: "Memproduksi madu herbal & sari kurma di fasilitas berstandar CPOTB, Bekasi.",
  },
  {
    icon: ShieldCheck,
    title: "Legalitas Terverifikasi",
    desc: "Sertifikasi Halal MUI & BPJPH yang dapat diverifikasi publik, terdaftar BPOM.",
  },
  {
    icon: Users,
    title: "Dipercaya Banyak Mitra",
    desc: "Melayani konsumen akhir, reseller, dan mitra maklon di seluruh Indonesia.",
  },
];

export default function AboutMaklon() {
  return (
    <section id="tentang" className="bg-cream py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          {/* Kiri: narasi */}
          <Reveal>
            <p className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-gold">
              <span className="text-forest/40">01</span> Profil Kami
            </p>
            <h2 className="font-heading text-3xl font-extrabold leading-tight text-forest md:text-4xl">
              Produsen Herbal Berpengalaman, Kini Terbuka untuk Brand Anda
            </h2>
            <p className="mt-5 text-base leading-relaxed text-ink/80 md:text-lg">
              CV Al-Waliy Sejahtera memproduksi madu herbal dan sari kurma
              premium sejak 2014. Selain melayani konsumen akhir lewat
              marketplace kami sendiri, kami juga membuka layanan{" "}
              <strong className="text-forest">maklon</strong> — memproduksi
              herbal sesuai formulasi dan kebutuhan brand Anda, dengan standar
              kualitas yang sama seperti produk kami sendiri.
            </p>
            <a
              href="#proses"
              className="mt-6 inline-flex items-center text-sm font-semibold text-forest underline underline-offset-4 hover:text-gold"
            >
              Lihat cara kerja sama kamii
            </a>
          </Reveal>

          {/* Kanan: fact cards */}
          <div className="flex flex-col gap-4">
            {FACTS.map((fact, i) => (
              <Reveal key={fact.title} delay={i * 0.1}>
                <div className="flex gap-4 rounded-[4px] border border-forest/10 bg-white p-5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[4px] bg-forest/5 text-forest">
                    <fact.icon size={20} strokeWidth={2} />
                  </div>
                  <div>
                    <h3 className="font-heading text-base font-bold text-forest">
                      {fact.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-ink/70">
                      {fact.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
