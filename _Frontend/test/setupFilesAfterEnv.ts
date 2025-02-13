import "@testing-library/jest-dom";
import "@testing-library/dom";
import i18next from "i18next";
import { initReactI18next } from "react-i18next";

const defaultLanguage = "en";

const i18n = i18next.createInstance();

i18n.use(initReactI18next).init({
  lng: defaultLanguage,
  fallbackLng: defaultLanguage,
  ns: ["translations"],
  defaultNS: "translations",
  resources: {
    en: {
      translations: {
        "createPage.title": "Hello World"
      }
    },
    ru: {
      translations: {
        "createPage.title": "Привет Мир"
      }
    }
  },
  interpolation: {
    escapeValue: false
  }
});

export default i18n;
