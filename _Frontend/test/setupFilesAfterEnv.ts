import "@testing-library/jest-dom";
import "@testing-library/dom";
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import en from "../src/i18n/locales/en.json";
import ru from "../src/i18n/locales/ru.json";

// Импортируем локали компонентов
import enCreatePasswordForm from "../src/components/CreatePasswordForm/__locales__/en.json";
import ruCreatePasswordForm from "../src/components/CreatePasswordForm/__locales__/ru.json";

const defaultLanguage = "en";

const i18n = i18next.createInstance();

i18n.use(initReactI18next).init({
  lng: defaultLanguage,
  fallbackLng: defaultLanguage,
  ns: ["translations", "CreatePasswordForm", "common"],
  defaultNS: "translations",
  resources: {
    en: {
      ...en,
      ...enCreatePasswordForm
    },
    ru: {
      ...ru,
      ...ruCreatePasswordForm
    }
  },
  interpolation: {
    escapeValue: false
  }
});

export default i18n;
