import { FileDown } from "lucide-react";
import Reveal from "../Reveal";

/**
 * PLACEHOLDER — arahkan href ke file PDF asli begitu company profile jadi.
 * Taruh file di folder `public/` (mis. public/company-profile.pdf) supaya
 * bisa diakses langsung lewat "/company-profile.pdf" tanpa perlu import.
 */
const COMPANY_PROFILE_HREF = "/company-profile.pdf";

export default function CompanyProfileDownload() {
  return (
    <div className="bg-forest-light/10 py-14 md:py-16">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <div className="flex flex-col items-center gap-5 rounded-[4px] border border-forest/10 bg-white p-8 text-center md:flex-row md:justify-between md:text-left">
            <div>
              <h2 className="font-heading text-xl font-bold text-forest md:text-2xl">
                Butuh Materi untuk Presentasi Internal?
              </h2>
              <p className="mt-2 max-w-lg text-sm leading-relaxed text-ink/70">
                Unduh company profile kami dalam format PDF — lengkap dengan
                profil perusahaan, legalitas, dan jenis layanan maklon.
              </p>
            </div>
            <a
              href={COMPANY_PROFILE_HREF}
              download
              className="inline-flex shrink-0 items-center gap-2 rounded-[4px] bg-forest px-6 py-3.5 text-sm font-semibold text-cream transition-colors hover:bg-forest-light"
            >
              <FileDown size={18} strokeWidth={2.25} />
              Download Company Profile
            </a>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
