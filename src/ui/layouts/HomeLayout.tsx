import { type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Preloader from "../elements/preloader/Preloader";
import Header from "./Header";
import Footer from "./Footer";
import LanguagePage from "../modals/LanguagePage";
import '../styles/layout/_app-layout.scss'
interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const [isLangOpen, setLangOpen] = useState(false);
  const navigate = useNavigate();

  function handleSelectLanguage(newLang: string) {
    navigate(`/${newLang}`, { replace: true });

    setLangOpen(false);
  }

  return (
    <>
      <Preloader />

      <Header onOpenLanguages={() => setLangOpen(true)} />

      <main>{children}</main>

      <Footer />

      {isLangOpen && (
        <LanguagePage
          onClose={() => setLangOpen(false)}
          onSelect={handleSelectLanguage}
        />
      )}
    </>
  );
}
