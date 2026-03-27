import { useEffect, useState } from "react";
import { useI18n } from "../data/I18nProvider";
import "../ui/crash/_entry.scss";

type Props = {
  onDone: () => void;
};

type Phase = "text" | "fade" | "button";

/**
 * Entry stage of the crash flow.
 *
 * Introduces the user to the experience through timed text appearance and fade-out.
 * Timings are intentionally tuned to balance readability and curiosity,
 * encouraging the user to stay and observe the transition.
 */
export default function Entry({ onDone }: Props) {
  const { t } = useI18n();

  const [phase, setPhase] = useState<Phase>("text");

  useEffect(() => {
    // Timings are chosen so the user has enough time to read,
    // notices the transition, and remains engaged instead of dropping early
    const FADE_DELAY = 3500;
    const BUTTON_DELAY = 10000;

    const fade = setTimeout(() => setPhase("fade"), FADE_DELAY);
    const showBtn = setTimeout(() => setPhase("button"), BUTTON_DELAY);

    return () => {
      clearTimeout(fade);
      clearTimeout(showBtn);
    };
  }, []);

  return (
    <section className={`entry entry--${phase}`}>
      <div className="entry__text">
        <h1 className="entry__title">
          {t("entry.title")}
        </h1>

        <h2 className="entry__subline">
          {t("entry.subline")}
        </h2>

        <p className="entry__paragraph">
          {t("entry.paragraph")}
        </p>
      </div>

      <button
        className="entry__button"
        onClick={onDone}
      >
        {t("entry.button")}
      </button>
    </section>
  );
}
