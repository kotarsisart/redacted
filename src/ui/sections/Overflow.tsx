import { useMemo } from "react";
import { useI18n } from "../../data/I18nProvider";
import "../styles/sections/_overflow.scss";
import triangle from "../../assets/icons/overflow/triangle.svg";

/**
 * Overflow
 *
 * Represents cognitive overload through geometric metaphors.
 *
 * Each figure (square, triangle, circle) contains structured content
 * that visually and semantically "overflows" its boundaries.
 *
 * Layout and text density together create a sense of pressure and excess.
 */
export default function Overflow() {
  const { t, locale } = useI18n();

  // Multi-line title (split for controlled layout and animation)
  const title = useMemo(
    () => t("overflow.title") as unknown as string[],
    [locale]
  );

  // Text mapped inside triangle (layered, directional)
  const triangleLines = useMemo(
    () => t("overflow.triangle") as unknown as string[],
    [locale]
  );

  // Text mapped inside circle (expanding / spreading)
  const circleLines = useMemo(
    () => t("overflow.circle") as unknown as string[],
    [locale]
  );

  return (
    <section className="overflow">
      {/* Title rendered line-by-line for layout control */}
      <h3 className="overflow__title fade-left">
        {title.map((line, i) => (
          <div key={i}>{line}</div>
        ))}
      </h3>

      {/* Geometric containers representing different types of overload */}
      <div className="overflow__figures">

        {/* Square — rigid structure, constrained space */}
        <div className="overflow__figure overflow__square">
          <p className="overflow__square-text zoom-in delay-400">
            {t("overflow.square")}
          </p>
        </div>

        {/* Triangle — directional pressure / narrowing focus */}
        <div className="overflow__figure overflow__triangle">
          <img
            src={triangle}
            alt=""
            className="overflow__triangle-icon"
          />

          {triangleLines.map((line, i) => (
            <p
              key={i}
              className="overflow__triangle-text zoom-in delay-800"
            >
              {line}
            </p>
          ))}
        </div>

        {/* Circle — accumulation / spreading thoughts */}
        <div className="overflow__figure overflow__circle">
          {circleLines.map((line, i) => (
            <p
              key={i}
              className={`overflow__circle-text zoom-out delay-1600 ${
                i > 0 ? "overflow__text-visible" : ""
              }`}
            >
              {line}
            </p>
          ))}
        </div>

      </div>
    </section>
  );
}
