import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import ru from "./locales/ru.json";

const DEFAULT_LANGUAGE = import.meta.env.VITE_DEFAULT_LANGUAGE || "ru";

i18n.use(initReactI18next).init({
  fallbackLng: DEFAULT_LANGUAGE,
  lng: DEFAULT_LANGUAGE,
  resources: {
    en,
    ru
  },
  ns: ["translations"],
  defaultNS: "translations",
  interpolation: {
    escapeValue: false
  }
});

i18n.languages = ["en", "ru"];

export default i18n;
