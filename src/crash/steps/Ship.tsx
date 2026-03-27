import { useEffect, useRef, useState } from "react";
import { useI18n } from "../../data/I18nProvider";

import cupHint from "../../assets/icons/ship/cup-hint.svg";
import cupMove from "../../assets/icons/ship/cup-move.svg";

import "../../ui/crash/_ship.scss";

type State = "idle" | "moving" | "accepted";

type Props = {
  onComplete: () => void;
};

/**
 * Ship interaction component.
 *
 * User must drag the movable object to align it with the target.
 * Completion is based on proximity between centers (not exact overlap),
 * creating a more natural and forgiving interaction.
 */
export default function Ship({ onComplete }: Props) {
  const { t } = useI18n();

  const containerRef = useRef<HTMLDivElement | null>(null);
  const cupRef = useRef<HTMLDivElement | null>(null);
  const targetRef = useRef<HTMLImageElement | null>(null);

  const [state, setState] = useState<State>("idle");
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const bounds = useRef({ maxX: 0, maxY: 0 });
  const dragOffset = useRef({ x: 0, y: 0 });

  // Calculate movement bounds based on container and element sizes
  useEffect(() => {
    function recalc() {
      const container = containerRef.current;
      const cup = cupRef.current;
      if (!container || !cup) return;

      const cw = container.clientWidth;
      const ch = container.clientHeight;
      const bw = cup.clientWidth;
      const bh = cup.clientHeight;

      bounds.current = {
        maxX: cw - bw,
        maxY: ch - bh,
      };
    }

    recalc();
    window.addEventListener("resize", recalc);
    return () => window.removeEventListener("resize", recalc);
  }, []);

  function clamp(v: number, min: number, max: number) {
    return Math.max(min, Math.min(max, v));
  }

  // Check if movable element is close enough to target (center distance)
  function isGoodEnough() {
    if (!cupRef.current || !targetRef.current) return false;

    const cupRect = cupRef.current.getBoundingClientRect();
    const targetRect = targetRef.current.getBoundingClientRect();

    const cupCenterX = cupRect.left + cupRect.width / 2;
    const cupCenterY = cupRect.top + cupRect.height / 2;

    const targetCenterX = targetRect.left + targetRect.width / 2;
    const targetCenterY = targetRect.top + targetRect.height / 2;

    const dx = cupCenterX - targetCenterX;
    const dy = cupCenterY - targetCenterY;

    const distance = Math.sqrt(dx * dx + dy * dy);

    return distance < 25;
  }

  // Start dragging and capture pointer for consistent interaction
  function onPointerDown(e: React.PointerEvent) {
    if (!cupRef.current || state === "accepted") return;

    const rect = cupRef.current.getBoundingClientRect();

    dragOffset.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };

    e.currentTarget.setPointerCapture(e.pointerId);
    setState("moving");
  }

  // Update position within bounds while dragging
  function onPointerMove(e: React.PointerEvent) {
    if (state !== "moving" || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();

    const x = clamp(
      e.clientX - rect.left - dragOffset.current.x,
      0,
      bounds.current.maxX
    );

    const y = clamp(
      e.clientY - rect.top - dragOffset.current.y,
      0,
      bounds.current.maxY
    );

    setPos({ x, y });

    if (isGoodEnough()) {
      setState("accepted");
    }
  }

  function onPointerUp(e: React.PointerEvent) {
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {}

    if (state !== "accepted") {
      setState("idle");
    }
  }

  // Complete flow after successful alignment
  useEffect(() => {
    if (state === "accepted") {
      const tmr = setTimeout(onComplete, 3000);
      return () => clearTimeout(tmr);
    }
  }, [state, onComplete]);

  return (
    <section
      ref={containerRef}
      className={`ship ship--${state}`}
    >
      <div className="ship__target">
        <img
          ref={targetRef}
          src={cupHint}
          alt={t("ship.cupHintAlt")}
          className="ship__target-icon"
        />
      </div>

      <div
        ref={cupRef}
        className="ship__movable"
        style={{
          transform: `translate(${pos.x}px, ${pos.y}px)`,
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
      >
        <img
          src={cupMove}
          alt={t("ship.cupMoveAlt")}
          className="ship__movable-icon"
        />
      </div>

      <p className="ship__text">
        {t("ship.text")}
      </p>
    </section>
  );
}