import { certifications } from "../../../lib/data";

export default function Certifications() {
  return (
    <section
      id="sertifikasi"
      className="border-t border-forest-600/60 px-6 py-20"
    >
      <div className="mx-auto max-w-6xl">
        <h2 className="font-display text-3xl font-semibold text-parchment">
          Legalitas & sertifikasi
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {certifications.map((c) => (
            <div
              key={c.code}
              className="rounded-2xl border border-clay/40 bg-forest-800 p-6 text-center"
            >
              <div className="font-display text-2xl font-bold text-clay">
                {c.code}
              </div>
              <p className="mt-2 text-sm text-parchment-muted">{c.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
