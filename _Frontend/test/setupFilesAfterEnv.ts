import "@testing-library/jest-dom";
import "@testing-library/dom";
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import en from "../src/i18n/locales/en.json";
import ru from "../src/i18n/locales/ru.json";

const defaultLanguage = "en";

const i18n = i18next.createInstance();

i18n.use(initReactI18next).init({
  lng: defaultLanguage,
  fallbackLng: defaultLanguage,
  ns: ["translations"],
  defaultNS: "translations",
  resources: {
    en,
    ru
  },
  interpolation: {
    escapeValue: false
  }
});

export default i18n;
