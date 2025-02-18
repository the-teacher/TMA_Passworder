interface ImportMeta {
  glob(pattern: string, options?: { eager: boolean }): Record<string, any>;
  env: {
    VITE_DEFAULT_LANGUAGE: string;
    [key: string]: string;
  };
}

// Mock import.meta.glob
(global as any).import = {
  meta: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    glob: (pattern: string, _options?: { eager: boolean }) => {
      // Возвращаем моковые данные в зависимости от паттерна
      if (pattern === "./locales/*.json") {
        return {
          "./locales/en.json": {
            default: require("../../src/i18n/locales/en.json")
          },
          "./locales/ru.json": {
            default: require("../../src/i18n/locales/ru.json")
          }
        };
      }
      if (pattern === "../components/**/__locales__/*.json") {
        return {
          "../components/CreatePasswordForm/__locales__/en.json": {
            default: require("../../src/components/CreatePasswordForm/__locales__/en.json")
          },
          "../components/CreatePasswordForm/__locales__/ru.json": {
            default: require("../../src/components/CreatePasswordForm/__locales__/ru.json")
          }
        };
      }
      return {};
    },
    env: {
      VITE_DEFAULT_LANGUAGE: "ru"
    }
  }
};
