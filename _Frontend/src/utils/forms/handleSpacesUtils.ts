import type { UseFormSetValue, Path, PathValue } from "react-hook-form";
import { normalizeSpaces, trimValue } from "@utils/forms";

// Make the functions generic to work with any form schema
export const createHandleSpaces = <T extends Record<string, unknown>>(
  setValue: UseFormSetValue<T>
) => {
  return (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = event.target.value;
    const fieldName = event.target.name as Path<T>;
    setValue(
      fieldName,
      normalizeSpaces(value) as unknown as PathValue<T, Path<T>>,
      {
        shouldValidate: true
      }
    );
  };
};

export const createHandleTrim = <T extends Record<string, unknown>>(
  setValue: UseFormSetValue<T>
) => {
  return (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = event.target.value;
    const fieldName = event.target.name as Path<T>;
    setValue(fieldName, trimValue(value) as unknown as PathValue<T, Path<T>>, {
      shouldValidate: true,
      shouldDirty: true
    });
  };
};

export const createHandleNoSpaces = <T extends Record<string, unknown>>(
  setValue: UseFormSetValue<T>
) => {
  return (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = event.target.value;
    const fieldName = event.target.name as Path<T>;
    setValue(
      fieldName,
      value.replace(/\s/g, "") as unknown as PathValue<T, Path<T>>,
      {
        shouldValidate: true
      }
    );
  };
};
