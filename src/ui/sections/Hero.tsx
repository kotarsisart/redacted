import { useState } from "react";
import { useI18n } from "../../data/I18nProvider";
import "../styles/sections/_hero.scss";
import project from "../../assets/icons/hero/redacted-hero.svg";

/**
 * Hero
 *
 * Entry point of the experience.
 *
 * Introduces the project and presents the main call-to-action.
 * Interaction subtly adapts to device type (touch vs desktop),
 * creating a staged activation on mobile.
 */
export default function Hero() {
  const { t } = useI18n();

  const [activated, setActivated] = useState(false); // final state after user confirms action
  const [hovered, setHovered] = useState(false); // intermediate state (hover / first tap)

  // Detect touch devices to adjust interaction model
  const isTouch =
    typeof window !== "undefined" &&
    "ontouchstart" in window;

  // Handles activation logic with touch-specific flow
  function handleClick() {
    if (activated) return;

    if (isTouch) {
      // First tap simulates hover, second confirms
      if (!hovered) {
        setHovered(true);
        return;
      }
      setActivated(true);
    } else {
      setActivated(true);
    }
  }

  // Dynamic button text based on interaction state
  function getText() {
    if (activated) return t("hero.button.accepted");
    if (hovered) return t("hero.button.hover");
    return t("hero.button.default");
  }

  return (
    <section className="hero">
      {/* Project identity */}
      <div className="hero__project">
        <img
          src={project}
          alt={t("hero.projectAlt")}
          className="hero__project-icon"
        />
      </div>

      <div className="hero__content">
        <div className="hero__left">
          {/* Main title */}
          <h1 className="hero__title">
            {t("hero.title")}
          </h1>

          {/* Supporting text */}
          <p className="hero__subline">
            {t("hero.subline")}
          </p>

          {/* Primary interaction */}
          <button
            className={`hero__button ${activated ? "is-active" : ""}`}
            onMouseEnter={() => !isTouch && setHovered(true)}
            onMouseLeave={() => !isTouch && setHovered(false)}
            onClick={handleClick}
          >
            {getText()}
          </button>
        </div>

        {/* Ambient error messages (background narrative layer) */}
        <div className="hero__right">
          {(t("hero.errors") as unknown as string[]).map(
            (line: string, index: number) => (
              <p
                key={index}
                className={`hero__errors hero__errors--${index}`}
              >
                {line}
              </p>
            )
          )}
        </div>
      </div>
    </section>
  );
}
