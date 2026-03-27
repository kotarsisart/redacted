import { createContext, useContext, useState, useMemo, useEffect, type ReactNode } from "react";
import en from "./locales/en.json";
import pl from "./locales/pl.json";
import uk from "./locales/uk.json";
import ru from "./locales/ru.json";
import be from "./locales/be.json";
import cs from "./locales/cs.json";
import sk from "./locales/sk.json";
import bg from "./locales/bg.json";
import mk from "./locales/mk.json";
import sr from "./locales/sr.json";
import hr from "./locales/hr.json";
import sl from "./locales/sl.json";

export const messages = { en, pl, uk, ru, be, cs, sk, bg, mk, sr, hr, sl };
export type Locale = keyof typeof messages;

interface I18nContextType {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (path: string) => string;
}

const I18nContext = createContext<I18nContextType | null>(null);

// Extract language from URL
function getLangFromUrl(): Locale | null {
  const parts = window.location.pathname.split("/").filter(Boolean);

  const maybeLang = parts[1];

  return maybeLang && maybeLang in messages
    ? (maybeLang as Locale)
    : null;
}


export function I18nProvider({ children }: { children: ReactNode }) {
  // Initial locale logic
  const initial =
    getLangFromUrl() ||
    (localStorage.getItem("lang") as Locale | null) ||
    "en";

  const [locale, setLocaleState] = useState<Locale>(initial);

  // Sync <html lang="xx"> when locale changes
  useEffect(() => {
    document.documentElement.setAttribute("lang", locale);
  }, [locale]);

  // Ensure localStorage sync + update URL
  function setLocale(l: Locale) {
    if (l === locale) return;
    
    localStorage.setItem("lang", l);
    setLocaleState(l);
    window.history.pushState({}, "", `/redacted/${l}`);
  }

  // If URL changed externally → update language
  useEffect(() => {
    const urlLang = getLangFromUrl();
    if (urlLang && urlLang !== locale) {
      setLocaleState(urlLang);
    }
  }, []);

  // Translator
  const t = useMemo(() => {
    return (path: string) => {
      const segments = path.split(".");
      let res: any = messages[locale];
      for (const key of segments) {
        res = res?.[key];
      }
      return res ?? path;
    };
  }, [locale]);

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be inside <I18nProvider>");
  return ctx;
}
