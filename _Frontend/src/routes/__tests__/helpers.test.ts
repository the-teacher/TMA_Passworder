import {
  indexPath,
  createPath,
  searchPath,
  favoritesPath,
  logoutPath,
  settingsPath,
  aboutPath,
  passwordEntryPath,
  editPasswordEntryPath,
  showPasswordEntryPath,
  apiPasswordEntriesPath,
  apiPasswordEntryPath
} from "../helpers";

describe("Route Helpers", () => {
  // Static paths
  describe("Static paths", () => {
    it("should return correct index path", () => {
      expect(indexPath()).toBe("/");
    });

    it("should return correct create path", () => {
      expect(createPath()).toBe("/create");
    });

    it("should return correct search path", () => {
      expect(searchPath()).toBe("/search");
    });

    it("should return correct favorites path", () => {
      expect(favoritesPath()).toBe("/favorites");
    });

    it("should return correct logout path", () => {
      expect(logoutPath()).toBe("/logout");
    });

    it("should return correct settings path", () => {
      expect(settingsPath()).toBe("/settings");
    });

    it("should return correct about path", () => {
      expect(aboutPath()).toBe("/about");
    });
  });

  // Dynamic paths
  describe("Dynamic paths", () => {
    const testId = "123";

    it("should return correct password entry path", () => {
      expect(passwordEntryPath(testId)).toBe("/passwords/123");
    });

    it("should return correct edit password entry path", () => {
      expect(editPasswordEntryPath(testId)).toBe("/passwords/123/edit");
    });

    it("should return correct show password entry path", () => {
      expect(showPasswordEntryPath(testId)).toBe("/passwords/123");
    });
  });

  // API paths
  describe("API paths", () => {
    it("should return correct API password entries path", () => {
      expect(apiPasswordEntriesPath()).toBe("/api/v1/password_entries");
    });

    it("should return correct API password entry path", () => {
      const testId = "456";
      expect(apiPasswordEntryPath(testId)).toBe("/api/v1/password_entries/456");
    });
  });
});
