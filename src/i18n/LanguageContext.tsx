import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { translations, type Lang, type Translations } from "./translations";

const STORAGE_KEY = "alwaliy-lang";

/** Title & deskripsi halaman per bahasa (ikut berganti saat tombol bahasa ditekan). */
const SEO: Record<Lang, { title: string; description: string }> = {
  id: {
    title: "Jasa Maklon Madu & Herbal Bersertifikat | Al-Waliy Sejahtera",
    description:
      "Jasa maklon madu, herbal, kapsul, dan cair bersertifikat Halal MUI, BPOM, dan CPOTB. Al-Waliy Sejahtera — mitra produksi dari formulasi sampai kemasan siap jual.",
  },
  en: {
    title:
      "Certified Honey & Herbal Maklon (Contract Manufacturing) | Al-Waliy Sejahtera",
    description:
      "Honey, herbal, capsule, and liquid maklon (contract manufacturing) certified Halal MUI, BPOM, and CPOTB. Al-Waliy Sejahtera, your production partner from formulation to ready-to-sell packaging.",
  },
};

function applySeo(lang: Lang) {
  const { title, description } = SEO[lang];
  document.documentElement.lang = lang;
  document.title = title;
  const set = (selector: string, value: string) =>
    document.querySelector(selector)?.setAttribute("content", value);
  set('meta[name="description"]', description);
  set('meta[property="og:title"]', title);
  set('meta[property="og:description"]', description);
  set('meta[property="og:locale"]', lang === "id" ? "id_ID" : "en_US");
  set('meta[name="twitter:title"]', title);
  set('meta[name="twitter:description"]', description);
}

interface LanguageContextValue {
  lang: Lang;
  t: Translations;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

function readInitialLang(): Lang {
  // Default SELALU Indonesia — tidak ada deteksi otomatis dari browser.
  // Satu-satunya alasan bisa jadi "en" di awal adalah kalau user pernah
  // eksplisit switch sebelumnya di browser yang sama (localStorage).
  if (typeof window === "undefined") return "id";
  const saved = window.localStorage.getItem(STORAGE_KEY);
  return saved === "en" ? "en" : "id";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(readInitialLang);

  const setLang = (next: Lang) => {
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // localStorage bisa gagal (mode privat, dll) — biarkan, gak fatal.
    }
  };

  // Sinkronkan <html lang>, title, dan meta setiap bahasa berubah, termasuk
  // saat pertama dimuat (bahasa tersimpan EN dari kunjungan sebelumnya).
  useEffect(() => {
    applySeo(lang);
  }, [lang]);

  const toggleLang = () => setLang(lang === "id" ? "en" : "id");

  const value = useMemo<LanguageContextValue>(
    () => ({ lang, t: translations[lang], setLang, toggleLang }),
    [lang],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error(
      "useLanguage() harus dipanggil di dalam <LanguageProvider>",
    );
  }
  return ctx;
}
