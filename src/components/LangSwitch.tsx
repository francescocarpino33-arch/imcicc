import { LANGS, useLang, useSetLang } from "@/i18n/lang";
import { COPY } from "@/i18n/copy";

/** EN / IT. The current language is marked; the other one switches the whole site. */
export function LangSwitch({ className = "" }: { className?: string }) {
  const lang = useLang();
  const setLang = useSetLang();
  return (
    <div
      role="group"
      aria-label="Language / Lingua"
      className={`inline-flex items-center wdth-label text-[0.8125rem] font-medium ${className}`}
    >
      {LANGS.map((l, i) => (
        <span key={l} className="inline-flex items-center">
          {i > 0 && (
            <span aria-hidden className="mx-1.5 opacity-40">
              /
            </span>
          )}
          <button
            type="button"
            lang={l}
            onClick={() => l !== lang && setLang(l)}
            aria-pressed={l === lang}
            title={COPY[l].langName}
            className={`nav-link cursor-pointer uppercase py-2 ${l === lang ? "active" : ""}`}
          >
            {l}
          </button>
        </span>
      ))}
    </div>
  );
}
