import { Resource } from "i18next";

export type LocaleObject = {
  [key: string]: string | LocaleObject;
};

// Helper to merge nested objects
export const mergeDeep = (
  target: LocaleObject,
  source: LocaleObject
): LocaleObject => {
  for (const key in source) {
    if (typeof source[key] === "object" && !Array.isArray(source[key])) {
      if (!target[key]) Object.assign(target, { [key]: {} });
      mergeDeep(target[key] as LocaleObject, source[key] as LocaleObject);
    } else {
      Object.assign(target, { [key]: source[key] });
    }
  }
  return target;
};

// Load all locales from the app
export const loadAppLocales = async () => {
  const resources: Resource = {};

  // Load base locales
  const baseLocales = import.meta.glob("./locales/*.json", { eager: true });

  // Load component locales
  const componentLocales = import.meta.glob(
    "../components/**/__locales__/*.json",
    { eager: true }
  );

  // Process all locale files
  [...Object.entries(baseLocales), ...Object.entries(componentLocales)].forEach(
    ([path, module]) => {
      const lang = path.match(/\/([a-z]{2})\.json$/)?.[1];
      if (!lang) return;

      if (!resources[lang]) {
        resources[lang] = {};
      }

      const moduleData = (module as { default: LocaleObject }).default;

      // Merge module data with existing resources
      resources[lang] = mergeDeep(resources[lang], moduleData);
    }
  );

  return resources;
};
