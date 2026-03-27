import { useEffect, useRef, useState } from "react";
import { useI18n } from "../../data/I18nProvider";
import "../../ui/crash/_clarity.scss";

type Phase = "drifting" | "stabilizing" | "stable";

/**
 * Clarity interaction component.
 *
 * A small interactive mechanic where the user must hold input
 * (mouse or touch) to stabilize the state.
 *
 * Stability increases while holding and decreases otherwise,
 * directly affecting visual clarity (blur, spacing, opacity).
 *
 * Once fully stabilized, the flow completes automatically.
 */
export default function Clarity({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const { t } = useI18n();

  const [phase, setPhase] = useState<Phase>("drifting");
  const [stability, setStability] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [showSubHint, setShowSubHint] = useState(false);

  const holdRef = useRef(false);
  const idleTimer = useRef<number | null>(null);
  const subHintTimer = useRef<number | null>(null);

  // Handles idle detection and progressive hint system
  function resetIdleTimer() {
    const FIRST_HINT_TIMER = 8000;
    const SECOND_HINT_TIMER = 5000;

    if (idleTimer.current !== null) clearTimeout(idleTimer.current);
    if (subHintTimer.current !== null) clearTimeout(subHintTimer.current);

    setShowHint(false);
    setShowSubHint(false);

    idleTimer.current = window.setTimeout(() => {
      setShowHint(true);

      subHintTimer.current = window.setTimeout(() => {
        setShowSubHint(true);
      }, SECOND_HINT_TIMER);

    }, FIRST_HINT_TIMER);
  }

  useEffect(() => {
    resetIdleTimer();

    return () => {
      if (idleTimer.current !== null) clearTimeout(idleTimer.current);
      if (subHintTimer.current !== null) clearTimeout(subHintTimer.current);
    };
  }, []);

  // Core loop: stability increases when holding, decreases otherwise
  useEffect(() => {
    if (phase === "stable") return;

    const interval = setInterval(() => {
      setStability((prev) =>
        holdRef.current
          ? Math.min(prev + 0.04, 1)
          : Math.max(prev - 0.03, 0)
      );
    }, 50);

    return () => clearInterval(interval);
  }, [phase]);

  // Phase transitions based on stability level
  useEffect(() => {
    if (stability > 0 && phase === "drifting") {
      setPhase("stabilizing");
    }

    if (stability === 0 && phase === "stabilizing") {
      setPhase("drifting");
    }

    if (stability >= 1 && phase !== "stable") {
      setPhase("stable");
    }
  }, [stability, phase]);

  // Complete flow after reaching stable state
  useEffect(() => {
    if (phase === "stable") {
      const timer = setTimeout(() => {
        onComplete();
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [phase, onComplete]);

  // Map stability to visual feedback
  const blur = phase === "stable" ? 0 : (1 - stability) * 7;
  const letterSpacing = phase === "stable" ? 0 : (1 - stability) * 2;
  const opacity = phase === "stable" ? 1 : 0.6 + stability * 0.4;

  return (
    <section
      className="clarity"
      onMouseDown={() => {
        holdRef.current = true;
        resetIdleTimer();
      }}
      onMouseUp={() => {
        holdRef.current = false;
        resetIdleTimer();
      }}
      onMouseLeave={() => {
        holdRef.current = false;
      }}
      onTouchStart={() => {
        holdRef.current = true;
        resetIdleTimer();
      }}
      onTouchEnd={() => {
        holdRef.current = false;
        resetIdleTimer();
      }}
    >
      <p
        className="clarity__phrase"
        style={{
          filter: `blur(${blur}px)`,
          letterSpacing: `${letterSpacing}px`,
          opacity,
        }}
      >
        {t("clarity.phrase")}
      </p>

      {showHint && (
        <div className="clarity__hint">
          <p className="clarity__hint-text">
            {t("clarity.hint")}
          </p>

          {showSubHint && (
            <p className="clarity__hint-text next-hint">
              {t("clarity.subHint")}
            </p>
          )}
        </div>
      )}
    </section>
  );
}
