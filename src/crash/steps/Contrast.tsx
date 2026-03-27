import { useState } from "react";
import { useI18n } from "../../data/I18nProvider";
import '../../ui/crash/_contrast.scss';

type Props = {
  onComplete: () => void;
};

/**
 * Contrast interaction component.
 *
 * User adjusts contrast via slider to reach a "correct" visual range.
 * Once the value falls within the target range, the action becomes available.
 */
export default function Contrast({ onComplete }: Props) {
  const { t } = useI18n();

  const [value, setValue] = useState(30);

  // Defines acceptable contrast range where interaction is considered "fixed"
  const isFixed = value >= 100 && value <= 120;

  return (
    <section
      className="contrast"
      style={{ filter: `contrast(${value}%)` }}
    >
      <h2 className="contrast__title">
        {t("contrast.title")}
      </h2>

      <p className="contrast__text">
        {t("contrast.text")}
      </p>

      <div className="contrast__rgb" />

      <input
        className="contrast-slider"
        type="range"
        min={0}
        max={400}
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        style={{
          '--value': `${value}%`,
        } as React.CSSProperties}
      />

      <button
        className={`contrast__button ${
          isFixed ? "contrast__button--visible" : ""
        }`}
        onClick={onComplete}
      >
        {t("contrast.button")}
      </button>
    </section>
  );
}
