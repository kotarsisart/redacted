import { useEffect } from "react";

/**
 * Reveals elements on scroll using IntersectionObserver.
 * Adds "visible" class when element enters viewport.
 */
export default function useScrollReveal() {
  useEffect(() => {
    // Observe elements and trigger animation when they enter viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.2 }
    );

    // Select all elements that should have scroll-based animations
    const elements = document.querySelectorAll(
      ".fade-up,.fade-down, .fade-left, .fade-right, .zoom-in, .zoom-out"
    );
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
}
