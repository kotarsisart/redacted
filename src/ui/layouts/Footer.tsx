import '../styles/sections/_footer.scss';
import { useI18n } from "../../data/I18nProvider";
import coffee from '../../assets/icons/logos/redacted-coffee.svg';

export default function Footer() {
  const { t } = useI18n();

  return (
    <section className="footer">
      <p className="footer__title fade-up delay-400">
        {t("footer.title")}
      </p>

      <div className="footer__links">
        <p className="footer__link">
          {t("footer.author")}
        </p>

        <a
          href="https://t.me/kotarsis_art"
          className="footer__link"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t("footer.telegram")}
        </a>

        <a
          href="https://buymeacoffee.com/kotarsis"
          className="footer__bmac"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={coffee}
            alt={t("footer.coffeeAlt")}
            className="footer__bmac-icon"
          />
          <p className="footer__link">
            {t("footer.support")}
          </p>
        </a>

        <a
          href="mailto:kotarsis.studio@gmail.com?subject=Custom website"
          className="footer__link"
        >
          {t("footer.custom")}
        </a>
      </div>

      <p className="footer__copyright">
        {t("footer.copyright")}
      </p>
    </section>
  );
}
