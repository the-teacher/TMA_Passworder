import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { loadAppLocales } from "./utils";

const DEFAULT_LANGUAGE = import.meta.env.VITE_DEFAULT_LANGUAGE || "ru";

const initI18n = async () => {
  const resources = await loadAppLocales();

  await i18n.use(initReactI18next).init({
    fallbackLng: DEFAULT_LANGUAGE,
    lng: DEFAULT_LANGUAGE,
    resources,
    defaultNS: "translations",
    fallbackNS: Object.keys(resources[DEFAULT_LANGUAGE] || {}),
    interpolation: {
      escapeValue: false
    }
  });

  i18n.languages = ["en", "ru"];
};

initI18n();

export default i18n;
