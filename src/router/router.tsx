import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import App from "../App";
import HomePage from "../pages/HomePage";
import CrashPage from "../pages/CrashPage";

function RoutesWrapper() {
  
  // Redirect root to last selected language (persisted in localStorage)
  const savedLang =
    (localStorage.getItem("lang") as string | null) || "en";

  return (
    <Routes>
      <Route
        index
        element={<Navigate to={savedLang} replace />}
      />

      <Route path=":lang" element={<App />}>
        <Route index element={<CrashPage />} />
        <Route path="home" element={<HomePage />} />
      </Route>
    </Routes>
  );
}

export default function Router() {
  return (
    <BrowserRouter basename="/redacted">
      <RoutesWrapper />
    </BrowserRouter>
  );
}
