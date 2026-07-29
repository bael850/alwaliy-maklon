import { workflow } from "../../lib/data";

export default function Workflow() {
  return (
    <section
      id="alur"
      className="border-t border-forest-600/60 bg-forest-800/40 px-6 py-20"
    >
      <div className="mx-auto max-w-6xl">
        <h2 className="font-display text-3xl font-semibold text-parchment">
          Alur kerja produksi
        </h2>
        <div className="relative mt-12 grid gap-8 md:grid-cols-5">
          <div className="absolute left-0 right-0 top-5 hidden h-px bg-forest-600 md:block" />
          {workflow.map((w) => (
            <div key={w.step} className="relative">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-honey bg-forest font-display font-semibold text-honey">
                {w.step}
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold text-parchment">
                {w.title}
              </h3>
              <p className="mt-1 text-sm text-parchment-muted">{w.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
