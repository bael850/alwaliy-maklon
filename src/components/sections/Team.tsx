import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, User } from "lucide-react";
import Reveal from "../Reveal";
import SmartImage from "../SmartImage";
import { useLanguage } from "../../i18n/LanguageContext";
import { useAvailableImages } from "../../lib/useAvailableImages";

/**
 * PLACEHOLDER — foto tim di public/images/team/member-1.(webp|jpg|png), dst.
 * Urutan 1:1 dengan t.team.members di translations.ts.
 *
 * Desktop (lg+): deretan panel vertikal. Panel aktif melebar, sisanya jadi
 * irisan sempit dengan nama vertikal. Hover / fokus / klik mengganti panel.
 * Mobile & tablet: strip horizontal scroll-snap dengan kartu bertingkat.
 */
const photoBase = (i: number) => `/images/team/member-${i + 1}`;
const pad = (n: number) => String(n).padStart(2, "0");
const EASE = "cubic-bezier(0.7, 0, 0.2, 1)";
const EASE_OUT = "cubic-bezier(0.215, 0.61, 0.355, 1)";

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

interface TeamMember {
  name: string;
  role: string;
  photo: string;
}

/**
 * Hanya anggota yang fotonya sudah ada di public/images/team yang tampil.
 * Belum ada foto sama sekali = section tidak muncul. Foto ditambah = otomatis
 * muncul, tanpa ubah kode.
 */
export default function Team() {
  const { t } = useLanguage();
  const all = t.team.members;
  const { ready, has } = useAvailableImages(all.map((_, i) => photoBase(i)));
  const members: TeamMember[] = all
    .map((m, i) => ({ ...m, photo: photoBase(i) }))
    .filter((_, i) => has[i]);

  if (!ready || members.length === 0) return null;
  return <TeamStage members={members} />;
}

function TeamStage({ members }: { members: TeamMember[] }) {
  const { t } = useLanguage();
  const total = members.length;

  const [active, setActive] = useState(Math.min(2, total - 1));
  const [reduce] = useState(prefersReducedMotion);
  const [inView, setInView] = useState(reduce);
  const stripRef = useRef<HTMLDivElement>(null);

  // Satu momen masuk: panel naik berurutan saat strip terlihat.
  useEffect(() => {
    if (reduce) return;
    const el = stripRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [reduce]);

  const go = (dir: 1 | -1) => setActive((a) => (a + dir + total) % total);

  const fallbackIcon = (size: number) => (
    <div className="flex h-full w-full items-center justify-center bg-forest/[0.07]">
      <User size={size} strokeWidth={1.25} className="text-forest/25" />
    </div>
  );

  return (
    <section id="team" className="bg-cream py-16 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        {/* Kepala editorial: judul besar kiri, paragraf rapat ke bawah di kanan */}
        <div className="grid items-end gap-8 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-8">
            <p className="mb-6 flex items-center gap-3 text-sm font-semibold text-gold">
              <span aria-hidden="true" className="h-px w-10 bg-gold" />
              {t.team.eyebrow}
            </p>
            <h2 className="font-heading text-4xl font-extrabold leading-[1.02] tracking-tight text-forest md:text-6xl lg:text-7xl">
              {t.team.heading}
            </h2>
          </Reveal>
          <Reveal delay={0.12} className="lg:col-span-4">
            <p className="border-t border-forest/20 pt-5 text-base leading-relaxed text-ink/75 md:text-lg">
              {t.team.paragraph}
            </p>
          </Reveal>
        </div>

        {/* ===== Desktop: panel melebar ===== */}
        <div
          ref={stripRef}
          role="group"
          aria-label={t.team.heading}
          className="mt-16 hidden h-[34rem] gap-2 lg:flex xl:h-[38rem]"
        >
          {members.map((member, i) => {
            const isActive = i === active;
            const delay = reduce ? 0 : i * 0.07;
            return (
              <button
                key={i}
                type="button"
                aria-pressed={isActive}
                aria-label={`${member.name}, ${member.role}`}
                onClick={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                className="relative min-w-0 overflow-hidden rounded-[4px] bg-forest/5 text-left"
                style={{
                  flexGrow: isActive ? 7 : 1,
                  flexBasis: 0,
                  opacity: inView ? 1 : 0,
                  transform: inView ? "none" : "translateY(48px)",
                  transition: reduce
                    ? "none"
                    : `flex-grow 0.8s ${EASE}, opacity 0.9s ${EASE_OUT} ${delay}s, transform 0.9s ${EASE_OUT} ${delay}s`,
                }}
              >
                {/* Foto dengan lebar tetap, di-crop panel, supaya tidak
                    ikut mengecil/melar saat panel berubah lebar. */}
                <div
                  className="absolute inset-y-0 left-1/2 w-[36rem] -translate-x-1/2"
                  style={{
                    filter: isActive
                      ? "grayscale(0) brightness(1)"
                      : "grayscale(1) brightness(0.92)",
                    transform: `translateX(-50%) scale(${isActive ? 1 : 1.12})`,
                    transition: reduce
                      ? "none"
                      : `filter 0.8s ${EASE}, transform 1.1s ${EASE}`,
                  }}
                >
                  <SmartImage
                    basePath={member.photo}
                    alt=""
                    className="h-full w-full object-cover"
                    fallback={fallbackIcon(64)}
                  />
                </div>

                {/* Nama vertikal di irisan sempit */}
                <span
                  aria-hidden="true"
                  className="absolute bottom-5 left-1/2 -translate-x-1/2 font-heading text-sm font-semibold whitespace-nowrap text-forest [writing-mode:vertical-rl] rotate-180"
                  style={{
                    opacity: isActive ? 0 : 0.85,
                    transition: reduce ? "none" : "opacity 0.4s ease",
                  }}
                >
                  {member.name}
                </span>

                {/* Nama + jabatan di panel aktif */}
                <span
                  className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-forest/90 via-forest/50 to-transparent p-6 pt-24 text-cream"
                  style={{
                    opacity: isActive ? 1 : 0,
                    transform: isActive ? "none" : "translateY(16px)",
                    transition: reduce
                      ? "none"
                      : `opacity 0.5s ease ${isActive ? 0.35 : 0}s, transform 0.6s ${EASE_OUT} ${isActive ? 0.3 : 0}s`,
                  }}
                >
                  <span className="block font-heading text-3xl font-bold leading-tight whitespace-nowrap">
                    {member.name}
                  </span>
                  <span className="mt-1 block text-base whitespace-nowrap text-gold-light">
                    {member.role}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        {/* Kontrol desktop: penghitung, rel progres, panah */}
        <div className="mt-6 hidden items-center gap-6 lg:flex">
          <p
            className="font-heading text-sm font-semibold tabular-nums text-forest"
            aria-live="polite"
          >
            {pad(active + 1)}
            <span className="text-forest/40"> / {pad(total)}</span>
          </p>
          <div className="h-px flex-1 bg-forest/15" aria-hidden="true">
            <div
              className="h-px bg-gold"
              style={{
                width: `${((active + 1) / total) * 100}%`,
                transition: reduce ? "none" : `width 0.8s ${EASE}`,
              }}
            />
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Sebelumnya / Previous"
              className="flex h-11 w-11 items-center justify-center rounded-[4px] border border-forest/25 text-forest transition-colors hover:bg-forest hover:text-cream"
            >
              <ArrowLeft size={18} />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Berikutnya / Next"
              className="flex h-11 w-11 items-center justify-center rounded-[4px] border border-forest/25 text-forest transition-colors hover:bg-forest hover:text-cream"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        {/* ===== Mobile & tablet: strip scroll-snap, kartu bertingkat ===== */}
        <ul className="snap-strip hide-scrollbar fade-edge-r -mx-5 mt-10 flex snap-x snap-mandatory items-start gap-4 overflow-x-auto px-5 pb-4 md:-mx-8 md:px-8 lg:hidden">
          {members.map((member, i) => (
            <li
              key={i}
              className={`w-[68%] shrink-0 snap-start sm:w-[44%] md:w-[34%] ${
                i % 2 === 1 ? "mt-10" : ""
              }`}
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-[4px] bg-forest/5">
                <SmartImage
                  basePath={member.photo}
                  alt={`${member.name}, ${member.role}`}
                  className="h-full w-full object-cover"
                  fallback={fallbackIcon(48)}
                />
              </div>
              <div className="mt-4 border-l-2 border-gold pl-3">
                <p className="font-heading text-lg font-bold leading-snug text-forest">
                  {member.name}
                </p>
                <p className="mt-0.5 text-sm text-ink/65">{member.role}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
