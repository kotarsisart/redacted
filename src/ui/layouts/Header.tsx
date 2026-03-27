import { useI18n } from "../../data/I18nProvider";
import { languages } from "../../data/languages";

import "../styles/sections/_header.scss";
import LogoSwitcher from "../elements/header/LogoSwitcher";

import kotarsisShort from "../../assets/icons/header/kotarsis-header-short.svg";
import kotarsisLong from "../../assets/icons/header/kotarsis-header-long.svg";
import redactedShort from "../../assets/icons/header/redacted-header-short.svg";
import redactedLong from "../../assets/icons/header/redacted-header-long.svg";
import globe from "../../assets/icons/header/globe.svg";

interface HeaderProps {
  onOpenLanguages: () => void;
}

export default function Header({ onOpenLanguages }: HeaderProps) {
  const { locale, t } = useI18n();
  const langObj = languages.find((l) => l.routeCode === locale);

  return (
    <header className="header">
      <a
        href="https://kotarsis.com"
        className="header-logo__link"
        rel="noopener noreferrer"
      >
        <LogoSwitcher
          className="header-logo"
          main={{
            short: redactedShort,
            long: redactedLong,
            alt: t("header.logo.projectAlt"),
          }}
          alt={{
            short: kotarsisShort,
            long: kotarsisLong,
            alt: t("header.logo.kotarsisAlt"),
          }}
        />
      </a>

      <div
        className="header__lang-select"
        onClick={onOpenLanguages}
      >
        <p className="header__lang-select-text">
          {langObj?.name ?? locale.toUpperCase()}
        </p>

        <img
          src={globe}
          alt={t("header.languageIconAlt")}
          className="header__lang-select-icon"
        />
      </div>
    </header>
  );
}
