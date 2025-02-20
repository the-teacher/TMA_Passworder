import { initReactI18next } from "react-i18next";
import enBase from "../locales.schema.en.json";
import ruBase from "../locales.schema.ru.json";

// Mock i18next
const mockI18n = {
  use: jest.fn().mockReturnThis(),
  init: jest.fn(),
  createInstance: jest.fn().mockReturnThis(),
  languages: [],
  changeLanguage: jest.fn()
};

jest.mock("i18next", () => mockI18n);

describe("i18n configuration", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should initialize i18next with correct configuration", async () => {
    const expectedConfig = {
      fallbackLng: "en",
      lng: "en", // From importMetaTransformer
      resources: {
        en: enBase,
        ru: ruBase
      },
      defaultNS: "translations",
      interpolation: {
        escapeValue: false
      }
    };

    await import("../index");

    expect(mockI18n.use).toHaveBeenCalledWith(initReactI18next);
    expect(mockI18n.init).toHaveBeenCalledWith(expectedConfig);
  });

  it("should set available languages", async () => {
    const i18n = (await import("../index")).default;
    expect(i18n.languages).toEqual(["en", "ru"]);
  });

  it("should handle language change", async () => {
    const i18n = (await import("../index")).default;
    await i18n.changeLanguage("ru");
    expect(mockI18n.changeLanguage).toHaveBeenCalledWith("ru");
  });
});
