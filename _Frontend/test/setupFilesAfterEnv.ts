import "@testing-library/jest-dom";
import "@testing-library/dom";
import i18next from "i18next";
import { initReactI18next } from "react-i18next";

// Import base locales
import enBase from "../src/i18n/locales.schema.en.json";
import ruBase from "../src/i18n/locales.schema.ru.json";

const DEFAULT_LANGUAGE = "en";

type LocaleSchema = typeof enBase;
type Resources = Record<string, LocaleSchema>;

const resources: Resources = {
  en: enBase,
  ru: ruBase
};

const Namespaces = Object.keys(
  resources[DEFAULT_LANGUAGE as keyof Resources] || {}
);

const i18n = i18next.createInstance();

i18n.use(initReactI18next).init({
  fallbackLng: DEFAULT_LANGUAGE,
  lng: DEFAULT_LANGUAGE,
  resources,
  defaultNS: "translations",
  fallbackNS: Namespaces,
  interpolation: {
    escapeValue: false
  }
});

i18n.languages = ["en", "ru"];

export default i18n;
