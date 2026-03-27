import { useEffect, useState } from "react";
import useTypewriter from "../hooks/useTypeWriter";
import BasePreloader from "../ui/elements/preloader/BasePreloader";

type Props = {
  onComplete: () => void;
};

type Phase = "normal" | "invert" | "invert-final";

/**
 * Intro preloader for crash experience.
 *
 * Simulates a visual "glitch / instability" using phase-based inversion
 * and distorted typewriter text before transitioning into the main flow.
 */
export default function CrashPreloader({ onComplete }: Props) {
  const [hide, setHide] = useState(false);
  const [phase, setPhase] = useState<Phase>("normal");

  // Control visual glitch phases over time
  useEffect(() => {
    const t1 = setTimeout(() => setPhase("invert"), 2000);
    const t2 = setTimeout(() => setPhase("normal"), 2800);
    const t3 = setTimeout(() => setPhase("invert-final"), 3000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  // Distorted project title using typewriter effect
  const typedProject = useTypewriter(
    "Redacteeøπæ…¬eeeddddd œ∑®†¥¨ˆ˚∆©ƒ∂ß≈√∫˜µ≤≥«•§ªº≠∞",
    { delay: 1800, speed: 1, variance: 50 }
  );

  useEffect(() => {
    const TOTAL_DURATION = 4400;
    const HIDE_AT = 4600;

    const hideTimer = setTimeout(() => {
      setHide(true);
    }, HIDE_AT);

    const finishTimer = setTimeout(() => {
      onComplete();
    }, TOTAL_DURATION);

    return () => {
      clearTimeout(hideTimer);
      clearTimeout(finishTimer);
    };
  }, [onComplete]);

  return (
    <BasePreloader
      hide={hide}
      className={`preloader--${phase}`}
      projectContent={
        <p className="preloader__project-title fade-up-4">
          {typedProject}
        </p>
      }
    />
  );
}
