import { useState, useEffect } from "react";
import { useI18n } from "../../data/I18nProvider";
import "../styles/sections/_depression.scss";

type ElementKey =
  | "circle"
  | "square"
  | "apply"
  | "anger"
  | "text1"
  | "text2"
  | "text3"
  | "text4"
  | "text5"
  | "text6"
  | "text7"
  | "text8"
  | "text9";

/**
 * Depression
 *
 * Passive, non-interactive state driven by randomness and absence of control.
 *
 * Elements appear and disappear unpredictably,
 * never forming a stable or meaningful structure.
 *
 * The system loops endlessly, reinforcing stagnation and detachment.
 */
export default function Depression() {
  const { t } = useI18n();

  const [visible, setVisible] = useState<ElementKey[]>([]); // currently visible elements

  // All possible elements that can appear
  const elements: ElementKey[] = [
    "circle",
    "square",
    "apply",
    "anger",
    "text1",
    "text2",
    "text3",
    "text4",
    "text5",
    "text6",
    "text7",
    "text8",
    "text9",
  ];

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    // Main loop: clears state → randomly shows elements → repeats
    const loop = () => {
      setVisible([]);

      const ELEMENT_LIFE_TIME = 3000; // how long elements stay visible
      const DELAY_BEFORE_NEXT = 1200; // pause before next appearance

      timeout = setTimeout(() => {
        // Occasionally show two elements instead of one
        const showTwo = Math.random() < 0.2;

        // Randomize order
        const shuffled = [...elements].sort(() => Math.random() - 0.5);

        const next = showTwo
          ? [shuffled[0], shuffled[1]]
          : [shuffled[0]];

        setVisible(next);

        // Schedule next loop
        timeout = setTimeout(loop, ELEMENT_LIFE_TIME);
      }, DELAY_BEFORE_NEXT);
    };

    loop();

    return () => clearTimeout(timeout);
  }, []);

  // Helper to apply visibility class
  const isVisible = (key: ElementKey) =>
    visible.includes(key) ? "visible" : "";

  return (
    <section className="depression">
      {/* Section title */}
      <h2 className="depression__title zoom-out delay-600">
        {t("depression.title")}
      </h2>

      {/* Fragmented layout blocks with independent visibility */}
      <div className="depression__first-container">
        <p className={`depression__text depression-element ${isVisible("text1")}`}>
          {t("depression.text1")}
        </p>

        <div
          className={`depression__circle depression-element ${isVisible("circle")}`}
        />

        <p className={`depression__text depression-element ${isVisible("text2")}`}>
          {t("depression.text2")}
        </p>
      </div>

      <div className="depression__third-container">
        <p className={`depression__text depression-element ${isVisible("text3")}`}>
          {t("depression.text3")}
        </p>

        <div
          className={`depression__square depression-element ${isVisible("square")}`}
        />

        <p className={`depression__text depression-element ${isVisible("text4")}`}>
          {t("depression.text4")}
        </p>

        <div
          className={`depression__apply depression-element ${isVisible("apply")}`}
        >
          <p className="depression__apply-text">
            {t("depression.apply")}
          </p>
        </div>
      </div>

      <div className="depression__fourth-container">
        <div
          className={`depression__anger depression-element ${isVisible("anger")}`}
        >
          <p className="depression__anger-text">
            {t("depression.anger")}
          </p>
        </div>
      </div>

      <div className="depression__fifth-container">
        <p className={`depression__text depression-element ${isVisible("text5")}`}>
          {t("depression.text5")}
        </p>
        <p className={`depression__text depression-element ${isVisible("text6")}`}>
          {t("depression.text6")}
        </p>
        <p className={`depression__text depression-element ${isVisible("text7")}`}>
          {t("depression.text7")}
        </p>
      </div>

      <div className="depression__sixth-container">
        <p className={`depression__text depression-element ${isVisible("text8")}`}>
          {t("depression.text8")}
        </p>
        <p className={`depression__text depression-element ${isVisible("text9")}`}>
          {t("depression.text9")}
        </p>
      </div>
    </section>
  );
}
