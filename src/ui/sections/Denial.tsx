import {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
} from "react";
import { useI18n } from "../../data/I18nProvider";
import "../styles/sections/_denial.scss";

type CheckItem = {
  id: string;
  title: string;
  result: string;
};

type CheckboxProps = {
  title: string;
  result: string;
  index: number;
  isSectionVisible: boolean;
  onComplete: () => void;
  isInconsistent?: boolean;
};

/**
 * Checkbox
 *
 * Simulates a verification process with a progress bar.
 *
 * Each item progresses independently with a delay,
 * then reveals a result once completed.
 *
 * Can enter an "inconsistent" state where progress never fully reaches 100%.
 */
function Checkbox({
  title,
  result,
  index,
  isSectionVisible,
  onComplete,
  isInconsistent = false,
}: CheckboxProps) {
  const [progress, setProgress] = useState(0); // progress percentage (0–100)
  const [showResult, setShowResult] = useState(false); // reveals result text after completion

  const delay = 600 + index * 200; // staggered start for each checkbox

  useEffect(() => {
    if (!isSectionVisible) return;

    let interval: ReturnType<typeof setInterval> | null = null;

    // Delay before starting progress (creates sequential flow)
    const startTimer = setTimeout(() => {
      let value = 0;

      interval = setInterval(() => {
        value = Math.min(value + 1, 100);
        setProgress(value);

        if (value >= 100) {
          if (interval) clearInterval(interval);

          // Slight delay before revealing result
          setTimeout(() => {
            setShowResult(true);
            onComplete();
          }, 300);
        }
      }, 20);
    }, delay);

    return () => {
      clearTimeout(startTimer);
      if (interval) clearInterval(interval);
    };
  }, [isSectionVisible, delay, onComplete]);

  // Force inconsistency: never allow full completion
  useEffect(() => {
    if (isInconsistent && progress === 100) {
      setProgress(99);
    }
  }, [isInconsistent, progress]);

  return (
    <div
      className={`
        denial__checkbox
        fade-left
        ${isSectionVisible ? "visible" : ""}
      `}
    >
      <div className="denial__checkbox-up">
        <p className="denial__checkbox-title">{title}</p>

        {/* Progress visualization */}
        <div className="denial__checkbox-track">
          <div
            className="denial__checkbox-fill"
            style={{ width: progress + "%" }}
          />
          <p className="denial__checkbox-percent">
            {progress}%
          </p>
        </div>
      </div>

      {/* Result appears after completion */}
      <p
        className={`denial__checkbox-result ${
          showResult ? "is-visible" : ""
        }`}
      >
        {result}
      </p>
    </div>
  );
}

/**
 * Denial
 *
 * Represents a false sense of verification and control.
 *
 * Multiple checks appear to validate something,
 * progressing sequentially and completing successfully.
 *
 * After completion, a glitch introduces inconsistency,
 * breaking the illusion of reliability.
 */
export default function Denial() {
  const { t, locale } = useI18n();

  const sectionRef = useRef<HTMLElement | null>(null);

  const [isVisible, setIsVisible] = useState(false); // triggered when section enters viewport
  const [completedCount, setCompletedCount] = useState(0); // number of finished checkboxes

  const [isGlitching, setIsGlitching] = useState(false); // visual glitch state
  const [hasGlitched, setHasGlitched] = useState(false); // ensures glitch runs only once
  const [isInconsistent, setIsInconsistent] = useState(false); // forces broken logic in checkboxes

  // Trigger section when visible in viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Localized checkbox data
  const data = useMemo(() => {
    return (t("denial.checks") as unknown as CheckItem[]) || [];
  }, [locale]);

  // Increment completion count from child components
  const handleComplete = useCallback(() => {
    setCompletedCount((prev) => prev + 1);
  }, []);

  // Trigger glitch after all checks complete
  useEffect(() => {
    if (
      completedCount === data.length &&
      isVisible &&
      !hasGlitched
    ) {
      const timer = setTimeout(() => {
        setIsGlitching(true);
        setHasGlitched(true);

        // Transition into inconsistent state
        setTimeout(() => {
          setIsGlitching(false);
          setIsInconsistent(true);
        }, 300);
      }, 1200);

      return () => clearTimeout(timer);
    }
  }, [completedCount, data.length, isVisible, hasGlitched]);

  const outroVisible =
    completedCount === data.length && isVisible;

  return (
    <section className="denial" ref={sectionRef}>
      {/* Section title */}
      <h2 className="denial__title zoom-out">
        {t("denial.title")}
      </h2>

      {/* Verification checks */}
      <div className="denial__checkboxes">
        {data.map((item, index) => (
          <Checkbox
            key={item.id}
            title={item.title}
            result={item.result}
            index={index}
            isSectionVisible={isVisible}
            onComplete={handleComplete}
            isInconsistent={isInconsistent && index < 2} // only first items break
          />
        ))}
      </div>

      {/* Outro message with glitch effect */}
      <p
        className={`
          denial__outro
          ${outroVisible ? "is-visible" : ""}
          ${isGlitching ? "is-glitching" : ""}
        `}
      >
        {t("denial.outro")}
      </p>
    </section>
  );
}
