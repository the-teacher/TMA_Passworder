import {
  createHandleGeneratePassword,
  createHandleCopyPassword,
  createHandleTogglePassword
} from "../passwordUtils";
import { generatePassword } from "../generatePassword";
import { copyToClipboard } from "../copyToClipboard";
import EventEmitter from "@lib/EventEmitter";
import type { TFunction } from "i18next";
import type { UseFormSetValue } from "react-hook-form";
import type { FormData } from "../../validationSchema";

// Mock dependencies
jest.mock("../generatePassword", () => ({
  generatePassword: jest.fn().mockReturnValue("generated-password")
}));

jest.mock("../copyToClipboard", () => ({
  copyToClipboard: jest.fn().mockResolvedValue(undefined)
}));

jest.mock("@lib/EventEmitter", () => ({
  emit: jest.fn()
}));

describe("passwordUtils", () => {
  // Common test variables
  const mockSetValue = jest.fn() as jest.MockedFunction<
    UseFormSetValue<FormData>
  >;
  const mockTranslate = jest.fn(
    (key) => `translated-${key}`
  ) as unknown as TFunction;
  const mockSetShowPassword = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("createHandleGeneratePassword", () => {
    it("should generate password and update form value", () => {
      const handleGeneratePassword = createHandleGeneratePassword(
        mockSetValue,
        mockTranslate
      );

      handleGeneratePassword();

      expect(generatePassword).toHaveBeenCalled();
      expect(mockSetValue).toHaveBeenCalledWith(
        "password",
        "generated-password",
        { shouldValidate: true }
      );
      expect(EventEmitter.emit).toHaveBeenCalledWith(
        "SUCCESS",
        "translated-messages.passwordGenerated"
      );
    });
  });

  describe("createHandleCopyPassword", () => {
    it("should copy password to clipboard when value exists", async () => {
      const handleCopyPassword = createHandleCopyPassword(
        "test-password",
        mockTranslate
      );

      await handleCopyPassword();

      expect(copyToClipboard).toHaveBeenCalledWith("test-password");
      expect(EventEmitter.emit).toHaveBeenCalledWith(
        "NOTIFICATION",
        "translated-messages.passwordCopied"
      );
    });

    it("should show warning when password is empty", async () => {
      const handleCopyPassword = createHandleCopyPassword("", mockTranslate);

      await handleCopyPassword();

      expect(copyToClipboard).not.toHaveBeenCalled();
      expect(EventEmitter.emit).toHaveBeenCalledWith(
        "WARNING",
        "translated-messages.setPasswordFirst"
      );
    });
  });

  describe("createHandleTogglePassword", () => {
    it("should toggle password visibility when password exists", () => {
      // Test showing password
      const handleTogglePassword = createHandleTogglePassword(
        false,
        mockSetShowPassword,
        "test-password",
        mockTranslate
      );

      handleTogglePassword();

      expect(mockSetShowPassword).toHaveBeenCalledWith(true);
      expect(EventEmitter.emit).toHaveBeenCalledWith(
        "ERROR",
        "translated-messages.passwordShown"
      );

      // Reset mocks
      jest.clearAllMocks();

      // Test hiding password
      const handleTogglePasswordHide = createHandleTogglePassword(
        true,
        mockSetShowPassword,
        "test-password",
        mockTranslate
      );

      handleTogglePasswordHide();

      expect(mockSetShowPassword).toHaveBeenCalledWith(false);
      expect(EventEmitter.emit).toHaveBeenCalledWith(
        "SUCCESS",
        "translated-messages.passwordHidden"
      );
    });

    it("should show warning when password is empty", () => {
      const handleTogglePassword = createHandleTogglePassword(
        false,
        mockSetShowPassword,
        "",
        mockTranslate
      );

      handleTogglePassword();

      // It should still toggle the state
      expect(mockSetShowPassword).toHaveBeenCalledWith(true);

      // But it should show a warning instead of the normal notification
      expect(EventEmitter.emit).toHaveBeenCalledWith(
        "WARNING",
        "translated-messages.setPasswordFirst"
      );

      // And it should not emit any other events
      expect(EventEmitter.emit).toHaveBeenCalledTimes(1);
    });
  });
});
