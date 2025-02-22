import {
  // RESTful route helpers
  passwordEntriesPath,
  newPasswordEntryPath,
  editPasswordEntryPath,
  passwordEntryPath,
  // Page paths
  indexPath,
  favoritesPath,
  logoutPath,
  settingsPath,
  aboutPath,
  // API paths
  apiPasswordEntriesPath,
  apiPasswordEntryPath
} from "../helpers";

describe("Route Helpers", () => {
  // RESTful routes
  describe("RESTful routes for PasswordEntries", () => {
    it("should return correct password entries index path", () => {
      expect(passwordEntriesPath()).toBe("/password_entries");
    });

    it("should return correct new password entry path", () => {
      expect(newPasswordEntryPath()).toBe("/password_entries/new");
    });

    it("should return correct edit password entry path", () => {
      expect(editPasswordEntryPath("123")).toBe("/password_entries/123/edit");
    });

    it("should return correct show password entry path", () => {
      expect(passwordEntryPath("123")).toBe("/password_entries/123");
    });
  });

  // Static paths
  describe("Static paths", () => {
    it("should return correct index path", () => {
      expect(indexPath()).toBe("/");
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

  // API paths
  describe("API paths", () => {
    it("should return correct API password entries path", () => {
      expect(apiPasswordEntriesPath()).toBe("/api/v1/password_entries");
    });

    it("should return correct API password entry path", () => {
      expect(apiPasswordEntryPath("123")).toBe("/api/v1/password_entries/123");
    });
  });
});
