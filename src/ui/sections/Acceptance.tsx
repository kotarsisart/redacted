import { useMemo } from "react";
import { useI18n } from "../../data/I18nProvider";
import "../styles/sections/_acceptance.scss";

/**
 * Acceptance
 *
 * Final narrative section of the experience.
 *
 * Presents structured facts, a reflective note,
 * and a concluding statement — reinforcing the theme of acceptance.
 *
 * Content is fully driven by i18n and reacts to locale changes.
 */
export default function Acceptance({
  onRestart,
}: {
  onRestart?: () => void; // optional restart handler to replay the experience
}) {
  const { t, locale } = useI18n();

  // Left column facts (recomputed only on locale change)
  const factsLeft = useMemo(() => {
    return t("acceptance.factsLeft") as unknown as string[];
  }, [locale]);

  // Right column facts (mirrors left for visual balance)
  const factsRight = useMemo(() => {
    return t("acceptance.factsRight") as unknown as string[];
  }, [locale]);

  // Multi-line reflective note
  const noteLines = useMemo(() => {
    return t("acceptance.note") as unknown as string[];
  }, [locale]);

  return (
    <section className="acceptance">
      {/* Section title */}
      <h2 className="acceptance__title zoom-out">
        {t("acceptance.title")}
      </h2>

      {/* Two-column facts layout */}
      <div className="acceptance__facts">
        <div className="acceptance__facts-left">
          {factsLeft.map((line, i) => (
            <p key={i} className="acceptance__fact fade-left delay-600">
              {line}
            </p>
          ))}
        </div>

        <div className="acceptance__facts-right">
          {factsRight.map((line, i) => (
            <p key={i} className="acceptance__fact fade-right delay-600">
              {line}
            </p>
          ))}
        </div>
      </div>

      {/* Core message block */}
      <div className="acceptance__project">
        {/* Narrative note */}
        <div className="acceptance__note fade-up delay-1200">
          {noteLines.map((line, i) => (
            <p key={i} className="acceptance__note-text">
              {line}
            </p>
          ))}
        </div>

        {/* Final contrast: rejection → acceptance */}
        <div className="acceptance__conclusion">
          <p className="acceptance__conclusion-text acceptance__conclusion-crossed">
            {t("acceptance.conclusion.crossed")}
          </p>
          <p className="acceptance__conclusion-text acceptance__conclusion-underline">
            {t("acceptance.conclusion.underline")}
          </p>
        </div>
      </div>

      {/* Restart interaction */}
      <p
        className="acceptance__restart"
        onClick={onRestart}
      >
        {t("acceptance.restart")}
      </p>
    </section>
  );
}
