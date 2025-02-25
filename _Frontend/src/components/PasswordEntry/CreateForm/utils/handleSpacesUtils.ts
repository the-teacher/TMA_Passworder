import type { UseFormSetValue } from "react-hook-form";
import type { FormData } from "../validationSchema";
import { normalizeSpaces, trimValue } from "./stringUtils";

export const createHandleSpaces = (setValue: UseFormSetValue<FormData>) => {
  return (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = event.target.value;
    const fieldName = event.target.name as keyof FormData;
    setValue(fieldName, normalizeSpaces(value), { shouldValidate: true });
  };
};

export const createHandleTrim = (setValue: UseFormSetValue<FormData>) => {
  return (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = event.target.value;
    const fieldName = event.target.name as keyof FormData;
    setValue(fieldName, trimValue(value), { shouldValidate: true });
  };
};

export const createHandleNoSpaces = (setValue: UseFormSetValue<FormData>) => {
  return (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = event.target.value;
    const fieldName = event.target.name as keyof FormData;
    setValue(fieldName, value.replace(/\s/g, ""), { shouldValidate: true });
  };
};
