import ReactDOM from "react-dom/client";
import { router } from "./components/AppRouter";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import { i18next } from "./i18n/config";

const currentLang = localStorage.getItem("lang") || "en";

i18next.changeLanguage(currentLang);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <I18nextProvider i18n={i18next}>
    <RouterProvider router={router} />
  </I18nextProvider>
);
