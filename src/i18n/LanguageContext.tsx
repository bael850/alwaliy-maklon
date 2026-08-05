import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { translations, type Lang, type Translations } from "./translations";

const STORAGE_KEY = "alwaliy-lang";

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
    if (typeof document !== "undefined") {
      document.documentElement.lang = next;
    }
  };

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
