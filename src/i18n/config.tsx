import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import app_EN from "../i18n/en/app.json";
import app_DE from "../i18n/de/app.json";
import app_FR from "../i18n/fr/app.json";
import app_SP from "../i18n/sp/app.json";

i18next.use(initReactI18next).init({
  lng: "en",
  fallbackLng: "en",
  debug: true,
  interpolation: {
    escapeValue: false,
  },
  resources: {
    en: { app: app_EN },
    fr: { app: app_FR },
    de: { app: app_DE },
    es: { app: app_SP },
  },
  defaultNS: "app",
});

export { i18next };
