import { useState } from "react";
import {
  languages,
  type LanguageItem,
} from "../../data/languages";

import "../modals/_language-page.scss";
import { useI18n } from "../../data/I18nProvider";

interface LanguagePageProps {
  onClose: () => void;
  onSelect: (langCode: string) => void;
}

export default function LanguagePage({ onClose, onSelect }: LanguagePageProps) {
  const { setLocale } = useI18n();
  const [leaving, setLeaving] = useState(false);

  function close() {
    setLeaving(true);
    setTimeout(() => onClose(), 300);
  }

  // Persist selected language, update app state, and sync routing after animation
  function selectLanguage(code: string) {
    const lang = languages.find((l) => l.code === code);
    if (!lang) return;

    // save the language
    setLocale(lang.routeCode);
    localStorage.setItem("lang", lang.routeCode);

    // UI closes
    setLeaving(true);
    setTimeout(() => {
      onSelect(lang.routeCode);
    }, 300);
  }

  // Build hierarchical language structure (main group → subgroup → items)
  const grouped = languages.reduce((acc, lang) => {
    const main = lang.mainGroup;
    const sub = lang.subGroup || "Other";

    if (!acc[main]) acc[main] = {};
    if (!acc[main][sub]) acc[main][sub] = [];

    acc[main][sub].push(lang);
    return acc;
  }, {} as Record<LanguageItem["mainGroup"], Record<string, LanguageItem[]>>);

  return (
    <div className={`lang-select ${leaving ? "is-leaving" : ""}`}>
      <div className="lang-select__inner">
        <p className="lang-select__close" onClick={close}>×</p>

        {Object.entries(grouped).map(([main, subgroups]) => (
          <div key={main} className="lang-select__group">
            <h3 className="lang-select__group-title">{main} Languages</h3>

            <div className="lang-select__subgroups">
              {Object.entries(subgroups).map(([sub, langs]) => (
                <div key={sub} className="lang-select__subgroup">
                  {sub !== "Other" && (
                    <h4 className="lang-select__subgroup-title">{sub}</h4>
                  )}

                  <ul className="lang-select__list">
                    {langs.map((lang) => (
                      <li
                        key={lang.code}
                        className={`lang-select__item ${
                          lang.enabled ? "" : "is-disabled"
                        }`}
                        onClick={() =>
                          lang.enabled && selectLanguage(lang.code)
                        }
                      >
                        <img src={lang.flag} alt={lang.alt} className="lang-select__flag" />
                        <span className="lang-select__name">{lang.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
