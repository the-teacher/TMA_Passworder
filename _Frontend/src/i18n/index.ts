import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enSchema from "./locales.schema.en.json";
import ruSchema from "./locales.schema.ru.json";

const DEFAULT_LANGUAGE = import.meta.env.VITE_DEFAULT_LANGUAGE || "ru";

type LocaleSchema = typeof enSchema;
type Resources = Record<string, LocaleSchema>;

const resources: Resources = {
  en: enSchema,
  ru: ruSchema
};

i18n.use(initReactI18next).init({
  fallbackLng: DEFAULT_LANGUAGE,
  lng: DEFAULT_LANGUAGE,
  resources,
  defaultNS: "translations",
  fallbackNS: Object.keys(resources[DEFAULT_LANGUAGE as keyof Resources] || {}),
  interpolation: {
    escapeValue: false
  }
});

i18n.languages = ["en", "ru"];

export default i18n;
