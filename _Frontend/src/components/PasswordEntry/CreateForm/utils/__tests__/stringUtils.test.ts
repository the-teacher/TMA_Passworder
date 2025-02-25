import { normalizeSpaces, trimValue } from "../stringUtils";

describe("stringUtils", () => {
  describe("normalizeSpaces", () => {
    it("should replace multiple spaces with single space", () => {
      expect(normalizeSpaces("hello   world")).toBe("hello world");
      expect(normalizeSpaces(" hello  world ")).toBe(" hello world ");
    });
  });

  describe("trimValue", () => {
    it("should remove spaces from start and end", () => {
      expect(trimValue("  hello world  ")).toBe("hello world");
      expect(trimValue("hello world")).toBe("hello world");
    });
  });
});
