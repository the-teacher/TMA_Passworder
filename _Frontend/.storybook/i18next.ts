import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { loadAppLocales } from "../src/i18n/utils";

const DEFAULT_LANGUAGE = "en"; // For Storybook we'll default to English

const initI18n = async () => {
  const resources = await loadAppLocales();

  await i18n.use(initReactI18next).init({
    lng: DEFAULT_LANGUAGE,
    fallbackLng: DEFAULT_LANGUAGE,
    interpolation: {
      escapeValue: false
    },
    resources,
    supportedLngs: ["en", "ru"]
  });
};

// Initialize i18n
initI18n();

export default i18n;
