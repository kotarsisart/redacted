import { useState, useEffect, useMemo } from "react";
import { useI18n } from "../../data/I18nProvider";
import "../styles/sections/_anger.scss";

/**
 * Anger
 *
 * Interactive escalation mechanic driven by repeated user input.
 *
 * Each click increases intensity (visual + emotional),
 * progressively revealing internal states until a breaking point is reached.
 *
 * Once broken, interaction is disabled and the state becomes final.
 */
export default function Anger() {
  const { t, locale } = useI18n();

  const [clicks, setClicks] = useState(0); // tracks user interaction intensity
  const [currentText, setCurrentText] = useState<string | null>(null); // currently visible emotional state
  const [isBroken, setIsBroken] = useState(false); // final irreversible state

  // Localized emotional states mapped to progression thresholds
  const states = useMemo(() => {
    return {
      first: t("anger.states.first"),
      second: t("anger.states.second"),
      third: t("anger.states.third"),
      fourth: t("anger.states.fourth"),
    };
  }, [locale]);

  // Progression logic based on click thresholds
  useEffect(() => {
    if (clicks === 2) setCurrentText(states.first);
    if (clicks === 7) setCurrentText(states.second);
    if (clicks === 12) setCurrentText(states.third);

    if (clicks === 20) {
      setCurrentText(states.fourth);
      setIsBroken(true); // lock interaction at final stage
    }
  }, [clicks, states]);

  // Prevent further interaction after breaking point
  const handleClick = () => {
    if (isBroken) return;
    setClicks((prev) => prev + 1);
  };

  return (
    <section
      className={`anger ${isBroken ? "is-broken" : ""}`}
      style={{
        // Visual intensity increases with interaction
        filter: `contrast(${1 + clicks * 0.1})`,
      }}
    >
      {/* Section title */}
      <h2 className="anger__title zoom-in delay-200">
        {t("anger.title")}
      </h2>

      {/* Subline hinting at interaction */}
      <p className="anger__subline zoom-out delay-600">
        {t("anger.subline")}
      </p>

      {/* Main interaction trigger */}
      <button
        className={`anger__button ${isBroken ? "is-disabled" : ""}`}
        onClick={handleClick}
        style={{
          // Increasing instability / resistance effect
          transform: `translateX(-${clicks * 3}px)`,
        }}
        disabled={isBroken}
      >
        {t("anger.button")}
      </button>

      {/* Emotional state output */}
      <div className="anger__states">
        <p
          key={currentText} // forces re-mount for transition animation
          className={`anger__state ${
            currentText ? "visible" : ""
          }`}
        >
          {currentText}
        </p>
      </div>
    </section>
  );
}
