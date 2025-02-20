import i18next from "i18next";
import { initReactI18next } from "react-i18next";

// Import base locales
import enBase from "./locales.schema.en.json";
import ruBase from "./locales.schema.ru.json";

const DEFAULT_LANGUAGE = import.meta.env.VITE_DEFAULT_LANGUAGE || "en";

const resources = {
  en: enBase,
  ru: ruBase
};

const i18n = i18next.createInstance();

i18n.use(initReactI18next).init({
  fallbackLng: "en",
  lng: DEFAULT_LANGUAGE,
  resources,
  defaultNS: "translations",
  interpolation: {
    escapeValue: false
  }
});

i18n.languages = ["en", "ru"];

export default i18n;
