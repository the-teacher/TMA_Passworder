import { Resource } from "i18next";

// Helper to merge nested objects
const mergeDeep = (target: any, source: any) => {
  for (const key in source) {
    if (typeof source[key] === "object" && !Array.isArray(source[key])) {
      if (!target[key]) Object.assign(target, { [key]: {} });
      mergeDeep(target[key], source[key]);
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

      // Get namespace from path
      let namespace = "translations";
      const componentMatch = path.match(/components\/(.+?)\/__locales__/);
      if (componentMatch) {
        namespace = componentMatch[1].toLowerCase();
      }

      resources[lang] = mergeDeep(resources[lang], {
        [namespace]: (module as any).default
      });
    }
  );

  return resources;
};
