import { useEffect, useState } from "react";
import redacted from "../../../assets/icons/logos/redacted-preloader.svg";
import BasePreloader from "./BasePreloader";

/**
 * Preloader (Redacted)
 *
 * Controls when the preloader should be displayed.
 *
 * Logic is based on:
 * - tab identity (to detect reload vs new tab)
 * - time since last visit (timeout system)
 * - session flag (to avoid repeating within same session)
 *
 * Ensures the preloader feels intentional, not intrusive.
 */
export default function Preloader() {
  const [hide, setHide] = useState(false);
  const PRELOADER_DURATION = 2600;

  useEffect(() => {
    const TAB_KEY = "kotarsis_tab_id";
    const LAST_TAB_KEY = "last_active_tab";
    const LAST_SEEN_KEY = "lastSeen";

    // Assign unique ID per browser tab (session-scoped)
    if (!sessionStorage.getItem(TAB_KEY)) {
      sessionStorage.setItem(TAB_KEY, crypto.randomUUID());
    }

    const tabId = sessionStorage.getItem(TAB_KEY)!;
    const lastTabId = localStorage.getItem(LAST_TAB_KEY);

    // Detect reload (same tab reopened)
    const isReload = lastTabId === tabId;

    // Time-based visibility control
    const now = Date.now();
    const lastSeen = Number(localStorage.getItem(LAST_SEEN_KEY));
    const TIMEOUT = 30 * 60 * 1000; // 30 minutes
    const timeoutExpired = !lastSeen || now - lastSeen > TIMEOUT;

    // Prevent multiple runs within the same session
    const hasShown = sessionStorage.getItem("preloaderShown") === "true";

    const shouldShow =
      timeoutExpired ||
      isReload ||
      !hasShown;

    if (shouldShow) {
      // Update tracking state
      localStorage.setItem(LAST_TAB_KEY, tabId);
      localStorage.setItem(LAST_SEEN_KEY, String(now));
      sessionStorage.setItem("preloaderShown", "true");

      // Hide after cinematic duration
      const timeout = setTimeout(() => {
        setHide(true);
      }, PRELOADER_DURATION);

      return () => clearTimeout(timeout);
    }

    // Skip animation and hide immediately
    requestAnimationFrame(() => setHide(true));
  }, []);

  return (
    <BasePreloader
      hide={hide}
      projectContent={
        <img
          src={redacted}
          className="preloader__project-icon fade-up-4"
          alt="Redacted logo"
        />
      }
    />
  );
}
