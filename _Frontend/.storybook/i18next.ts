import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enSchema from "../src/i18n/locales.schema.en.json";
import ruSchema from "../src/i18n/locales.schema.ru.json";

const DEFAULT_LANGUAGE = import.meta.env.VITE_DEFAULT_LANGUAGE || "en";

type LocaleSchema = typeof enSchema;
type Resources = Record<string, LocaleSchema>;

const resources: Resources = {
  en: enSchema,
  ru: ruSchema
};

const Namespaces = Object.keys(
  resources[DEFAULT_LANGUAGE as keyof Resources] || {}
);

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
