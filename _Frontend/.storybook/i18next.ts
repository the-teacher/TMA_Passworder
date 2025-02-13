import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "../src/i18n/locales/en.json";
import ru from "../src/i18n/locales/ru.json";

const ns = Object.keys(en);
const supportedLngs = ["en", "ru"];

i18n.use(initReactI18next).init({
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false
  },
  defaultNS: "translations",
  ns,
  supportedLngs,
  resources: {
    en,
    ru
  }
});

export default i18n;
