import { useState, useEffect, useMemo } from "react";
import { useI18n } from "../../data/I18nProvider";
import "../styles/sections/_bargaining.scss";
import check from "../../assets/icons/bargaining/check.svg";

type OptionId =
  | "enableFallback"
  | "reduceLoad"
  | "safeMode"
  | "retryGently";

/**
 * Bargaining
 *
 * Interactive negotiation mechanic where the user selects "solutions"
 * and attempts to apply them.
 *
 * Each attempt gives feedback (progress, processing),
 * but never actually resolves anything — reinforcing the illusion of control.
 */
export default function Bargaining() {
  const { t } = useI18n();

  const [selected, setSelected] = useState<OptionId[]>([]); // currently selected options
  const [isApplying, setIsApplying] = useState(false); // active "apply" state
  const [lastApplied, setLastApplied] = useState<OptionId[]>([]); // prevents identical re-apply
  const [progress, setProgress] = useState(0); // progress bar value
  const [showProcessing, setShowProcessing] = useState(false); // delayed "processing" label
  const [attempts, setAttempts] = useState(0); // number of user attempts (affects speed)

  // Layout structure for options (2 columns)
  const columns: OptionId[][] = useMemo(
    () => [
      ["enableFallback", "reduceLoad"],
      ["safeMode", "retryGently"],
    ],
    []
  );

  // Toggle option selection
  const toggleOption = (option: OptionId) => {
    if (isApplying) return;

    setSelected((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
  };

  // Handle "apply" action
  const handleApply = () => {
    if (selected.length === 0 || isApplying) return;

    // Prevent applying identical configuration
    const isSame =
      selected.length === lastApplied.length &&
      selected.every((item) => lastApplied.includes(item));

    if (isSame) return;

    setLastApplied(selected);
    setAttempts((prev) => prev + 1);
    setIsApplying(true);
  };

  // Simulated processing loop (progress + delays)
  useEffect(() => {
    if (!isApplying) return;

    setProgress(0);
    setShowProcessing(false);

    // Delay before showing "processing" to simulate system response
    const processingDelay = setTimeout(() => {
      setShowProcessing(true);
    }, 1000);

    let start: number | null = null;

    const base = 5000;
    // Each attempt makes the system "faster" (illusion of improvement)
    const duration = base / (1 + attempts * 0.5);

    const animate = (timestamp: number) => {
      if (!start) start = timestamp;

      const elapsed = timestamp - start;
      const percent = Math.min((elapsed / duration) * 100, 100);

      setProgress(percent);

      const ALLOW_NEW_TRY = 1000;

      if (percent < 100) {
        requestAnimationFrame(animate);
      } else {
        clearTimeout(processingDelay);

        // Small cooldown before allowing next attempt
        setTimeout(() => {
          setIsApplying(false);
          setProgress(0);
          setShowProcessing(false);
        }, ALLOW_NEW_TRY);
      }
    };

    requestAnimationFrame(animate);

    return () => {
      clearTimeout(processingDelay);
    };
  }, [isApplying, attempts]);

  return (
    <section className="bargaining">
      {/* Section title */}
      <h2 className="bargaining__title fade-up delay-400">
        {t("bargaining.title")}
      </h2>

      {/* Instructional subline */}
      <p className="bargaining__subline fade-down delay-800">
        {t("bargaining.subline")}
      </p>

      {/* Selection hint */}
      <p className="bargaining__select fade-down delay-1200">
        {t("bargaining.select")}
      </p>

      {/* Options grid */}
      <div className="bargaining__parameters">
        {columns.map((col, i) => (
          <div key={i} className="bargaining__parameters-inner">
            {col.map((option) => (
              <div
                key={option}
                className="bargaining__parameter"
                onClick={() => toggleOption(option)}
              >
                <p className="bargaining__parameter-text">
                  {t(`bargaining.options.${option}`)}
                </p>

                {/* Checkbox indicator */}
                <div className="bargaining__parameter-checkbox">
                  <img
                    src={check}
                    alt="check"
                    className={`bargaining__parameter-icon ${
                      selected.includes(option) ? "visible" : ""
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Call to action */}
      <p className="bargaining__press">
        {t("bargaining.press")}
      </p>

      {/* Apply button */}
      <button
        className={`bargaining__button ${
          selected.length > 0 ? "ready" : ""
        } ${isApplying ? "activated" : ""}`}
        onClick={handleApply}
        disabled={isApplying}
      >
        {t("bargaining.button")}
      </button>

      {/* Loading state */}
      <p
        className={`bargaining__loading ${
          isApplying ? "visible" : ""
        }`}
      >
        {t("bargaining.loading")}
      </p>

      {/* Progress + processing feedback */}
      <div className="bargaining__down">
        <div
          className={`bargaining__track ${
            isApplying ? "visible" : ""
          }`}
        >
          <div
            className="bargaining__fill"
            style={{ width: progress + "%" }}
          />
        </div>

        <p
          className={`bargaining__processing ${
            showProcessing ? "visible" : ""
          }`}
        >
          {t("bargaining.processing")}
        </p>
      </div>
    </section>
  );
}
