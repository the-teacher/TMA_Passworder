import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";

const DEFAULT_LANGUAGE = "ru";
const IS_DEV = false; //import.meta.env.DEV;

const COOKIE_DOMAIN = "localhost:4000";
const COOKIE_EXPIRATION_MINUTES = 60 * 24 * 30; // 30 days

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: DEFAULT_LANGUAGE,
    supportedLngs: ["en", "ru"],
    debug: IS_DEV,

    lng: DEFAULT_LANGUAGE,

    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json"
    },

    detection: {
      order: ["cookie", "localStorage", "navigator"],
      caches: ["cookie"],
      cookieMinutes: COOKIE_EXPIRATION_MINUTES,
      cookieDomain: COOKIE_DOMAIN
    },

    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
