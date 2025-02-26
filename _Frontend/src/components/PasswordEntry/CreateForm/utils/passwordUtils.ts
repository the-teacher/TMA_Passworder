import { generatePassword } from "./generatePassword";
import { copyToClipboard } from "./copyToClipboard";
import EventEmitter from "@lib/EventEmitter";
import type { TFunction } from "i18next";
import type { UseFormSetValue } from "react-hook-form";
import type { FormData } from "../validationSchema";

/**
 * Creates a handler for generating a password
 * @param setValue - React Hook Form setValue function
 * @param t - i18next translation function
 * @returns A function that generates a password and updates the form
 */
export const createHandleGeneratePassword = (
  setValue: UseFormSetValue<FormData>,
  t: TFunction
) => {
  return () => {
    const password = generatePassword();
    setValue("password", password, { shouldValidate: true });
    EventEmitter.emit("SUCCESS", t("messages.passwordGenerated"));
  };
};

/**
 * Creates a handler for copying a password to clipboard
 * @param value - The password value to copy
 * @param t - i18next translation function
 * @returns A function that copies the password to clipboard
 */
export const createHandleCopyPassword = (value: string, t: TFunction) => {
  return async () => {
    if (!value) {
      EventEmitter.emit("WARNING", t("messages.setPasswordFirst"));
      return;
    }

    await copyToClipboard(value);
    EventEmitter.emit("NOTIFICATION", t("messages.passwordCopied"));
  };
};

/**
 * Creates a handler for toggling password visibility
 * @param showPassword - Current password visibility state
 * @param setShowPassword - Function to update password visibility
 * @param value - The password value
 * @param t - i18next translation function
 * @returns A function that toggles password visibility
 */
export const createHandleTogglePassword = (
  showPassword: boolean,
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>,
  value: string,
  t: TFunction
) => {
  return () => {
    const newShowPassword = !showPassword;
    setShowPassword(newShowPassword);

    if (!value) {
      EventEmitter.emit("WARNING", t("messages.setPasswordFirst"));
      return;
    }

    if (newShowPassword) {
      EventEmitter.emit("ERROR", t("messages.passwordShown"));
    } else {
      EventEmitter.emit("SUCCESS", t("messages.passwordHidden"));
    }
  };
};
