import { useEffect, useRef, useState } from "react";
import { useI18n } from "../../data/I18nProvider";
import "../../ui/crash/_focus.scss";

type ButtonItem = {
  id: number;
  isCorrect: boolean;
  x: number;
  y: number;
  vx: number;
  vy: number;
};

const BUTTON_SIZE = 100;
const RADIUS = BUTTON_SIZE / 2;

/**
 * Focus interaction component.
 *
 * Multiple moving buttons simulate a chaotic environment.
 * User must identify and click the correct one while others move and collide.
 *
 * Buttons bounce off walls and each other, creating a dynamic "focus challenge".
 */
export default function Focus({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const { t } = useI18n();

  const boardRef = useRef<HTMLDivElement | null>(null);
  const raf = useRef<number | null>(null);

  const [buttons, setButtons] = useState<ButtonItem[]>([]);

  const isTouch =
    typeof window !== "undefined" &&
    window.matchMedia("(pointer: coarse)").matches;

  const BASE_SPEED = 1.5;
  const MOBILE_MULTIPLIER = 3;
  const SPEED = isTouch
    ? BASE_SPEED * MOBILE_MULTIPLIER
    : BASE_SPEED;

  // Initialize buttons with random positions and velocities
  useEffect(() => {
    if (!boardRef.current) return;

    const { clientWidth, clientHeight } = boardRef.current;

    setButtons(
      Array.from({ length: 8 }).map((_, i) => ({
        id: i,
        isCorrect: i === 0,
        x: Math.random() * (clientWidth - BUTTON_SIZE),
        y: Math.random() * (clientHeight - BUTTON_SIZE),
        vx: (Math.random() - 0.5) * SPEED,
        vy: (Math.random() - 0.5) * SPEED,
      }))
    );
  }, [SPEED]);

  // Animation loop: movement, wall bounce, and collision handling
  useEffect(() => {
    function animate() {
      if (!boardRef.current) return;

      const { clientWidth, clientHeight } = boardRef.current;

      setButtons((prev) => {
        const updated = prev.map((b) => ({ ...b }));

        // Move buttons and handle wall collisions
        for (let b of updated) {
          b.x += b.vx;
          b.y += b.vy;

          if (b.x <= 0 || b.x >= clientWidth - BUTTON_SIZE) {
            b.vx *= -1;
            b.x = Math.max(0, Math.min(b.x, clientWidth - BUTTON_SIZE));
          }

          if (b.y <= 0 || b.y >= clientHeight - BUTTON_SIZE) {
            b.vy *= -1;
            b.y = Math.max(0, Math.min(b.y, clientHeight - BUTTON_SIZE));
          }
        }

        // Handle simple elastic collisions between buttons
        for (let i = 0; i < updated.length; i++) {
          for (let j = i + 1; j < updated.length; j++) {
            const a = updated[i];
            const b = updated[j];

            const dx = a.x + RADIUS - (b.x + RADIUS);
            const dy = a.y + RADIUS - (b.y + RADIUS);

            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < BUTTON_SIZE) {
              // Swap velocities (basic elastic collision)
              const tempVx = a.vx;
              const tempVy = a.vy;

              a.vx = b.vx;
              a.vy = b.vy;

              b.vx = tempVx;
              b.vy = tempVy;

              // Separate overlapping buttons
              const overlap = (BUTTON_SIZE - distance) / 2;

              const nx = dx / distance;
              const ny = dy / distance;

              a.x += nx * overlap;
              a.y += ny * overlap;

              b.x -= nx * overlap;
              b.y -= ny * overlap;
            }
          }
        }

        return updated;
      });

      raf.current = requestAnimationFrame(animate);
    }

    raf.current = requestAnimationFrame(animate);

    return () => {
      if (raf.current !== null) {
        cancelAnimationFrame(raf.current);
      }
    };
  }, []);

  // Handle user interaction: correct button completes, wrong removes distraction
  function handleClick(btn: ButtonItem) {
    if (btn.isCorrect) {
      onComplete();
    } else {
      setButtons((prev) =>
        prev.filter((b) => b.id !== btn.id)
      );
    }
  }

  return (
    <section className="focus">
      <div className="focus__hint">
        <p className="focus__title">
          {t("focus.title")}
        </p>
        <p className="focus__subline">
          {t("focus.subline")}
        </p>
      </div>

      <div className="focus__board" ref={boardRef}>
        {buttons.map((b) => (
          <button
            key={b.id}
            className={`focus__button ${
              b.isCorrect ? "is-correct" : "is-wrong"
            }`}
            style={{
              transform: `translate(${b.x}px, ${b.y}px)`,
            }}
            onClick={() => handleClick(b)}
          >
            {t("focus.button")}
          </button>
        ))}
      </div>
    </section>
  );
}