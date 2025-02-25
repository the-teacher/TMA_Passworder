import type { TFunction } from "i18next";
import type { FieldErrors } from "react-hook-form";
import type { FormData } from "../validationSchema";

// errors: { form_error: string, errors: { fieldName: { message: string } } }
export type ServerErrors = {
  form_error?: string;
  errors?: Record<string, { message: string }>;
};

export const getFieldStatus = (
  fieldName: string,
  value: string,
  errors: FieldErrors,
  dirtyFields: Record<string, boolean>,
  t: TFunction
) => {
  // Show validation message as soon as field is dirty (changed)
  if (dirtyFields[fieldName]) {
    if (errors[fieldName]) {
      return {
        message: errors[fieldName]?.message as string,
        className: "text--danger text--small"
      };
    }

    if (value) {
      return {
        message: t("validation.filledCorrectly"),
        className: "text--success text--small"
      };
    }
  }

  // Show hint for empty untouched fields
  if (!value) {
    return {
      message: t("validation.pleaseEnterField"),
      className: "text--warning text--small"
    };
  }

  return {
    message: "",
    className: ""
  };
};
