import ReactDOM from "react-dom/client";
import Router from "./router/router";
import { I18nProvider } from "./data/I18nProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <I18nProvider>
    <Router />
  </I18nProvider>
);
