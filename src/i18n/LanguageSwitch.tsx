import { useLanguage } from "./LanguageContext";

/**
 * Toggle teks simpel "ID | EN". Kata yang aktif ditebalkan/kontras penuh,
 * yang tidak aktif diredam — pola umum language switcher, gak perlu ikon
 * bendera (menghindari ambiguitas bendera negara vs bahasa).
 */
export default function LanguageSwitch({
  className = "",
}: {
  className?: string;
}) {
  const { lang, setLang, t } = useLanguage();

  return (
    <div
      className={`inline-flex items-center gap-1.5 text-sm font-semibold ${className}`}
      role="group"
      aria-label={t.common.switchLanguageAria}
    >
      <button
        type="button"
        onClick={() => setLang("id")}
        aria-pressed={lang === "id"}
        className={
          lang === "id"
            ? "opacity-100"
            : "opacity-45 transition-opacity hover:opacity-75"
        }
      >
        ID
      </button>
      <span aria-hidden="true" className="opacity-30">
        |
      </span>
      <button
        type="button"
        onClick={() => setLang("en")}
        aria-pressed={lang === "en"}
        className={
          lang === "en"
            ? "opacity-100"
            : "opacity-45 transition-opacity hover:opacity-75"
        }
      >
        EN
      </button>
    </div>
  );
}
