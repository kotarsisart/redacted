import { useState } from "react";
import CrashFlow from "./crash/CrashFlow";
import HomePage from "./pages/HomePage";

import { useHead } from "./hooks/useHead";
import { useI18n } from "./data/I18nProvider";
import "./ui/styles/main.scss";

/**
 * Main application entry.
 * Controls initial "crash" experience and transitions to main content.
 * Also handles dynamic SEO/meta tags per locale.
 */
type Screen = "crash" | "home";

export default function App() {

  const { t, locale } = useI18n();

  // Controls app flow: initial crash experience → main homepage
  const [screen, setScreen] = useState<Screen>("crash");
  // const [screen, setScreen] = useState<Screen>("home"); // for develop

  const origin = window.location.origin;
  
  // Base path for assets and SEO (project is hosted under subpath)
  const base = `${origin}/redacted`;

  const currentUrl = `${base}/${locale}`;
  const previewUrl = `${base}/preview.jpg`;

  useHead({
    title: t("meta.title"),
    meta: [
      { name: "description", content: t("meta.description") },
      { name: "keywords", content: t("meta.keywords") },

      { property: "og:title", content: t("meta.title") },
      { property: "og:description", content: t("meta.description") },
      { property: "og:image", content: previewUrl },
      { property: "og:type", content: "website" },
      { property: "og:url", content: currentUrl },
      { property: "og:site_name", content: t("meta.siteName") },

      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: t("meta.title") },
      { name: "twitter:description", content: t("meta.description") },
      { name: "twitter:image", content: previewUrl },

      { name: "theme-color", content: "#0b297a" }
    ],
    link: [
      { rel: "icon", href: `${base}/favicon/favicon.ico` },
      { rel: "apple-touch-icon", href: `${base}/favicon/apple-touch-icon.png` },
      { rel: "manifest", href: `${base}/manifest.json` },
      { rel: "canonical", href: currentUrl }
    ]
  });

  if (screen === "home") {
    return <HomePage
      onRestart={() => {
        setScreen("crash");
      }}
    />;
  }

  return <CrashFlow onFinish={() => setScreen("home")} />;
}
