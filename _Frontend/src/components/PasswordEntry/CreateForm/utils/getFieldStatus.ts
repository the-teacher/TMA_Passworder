import type { FieldErrors } from "react-hook-form";
import type { FormData } from "../validationSchema";

// errors: { form_error: string, errors: { fieldName: { message: string } } }
export type ServerErrors = {
  form_error: string;
  errors: Record<string, { message: string }>;
};

export const getFieldStatus = (
  fieldName: keyof FormData,
  value: string | undefined,
  errors: FieldErrors<FormData> | ServerErrors | undefined,
  touchedFields: Record<string, boolean>
): { message: string; className: string } => {
  if (!touchedFields[fieldName]) {
    return {
      message: "Заполните поле",
      className: "text--warning text--small"
    };
  }

  // Handle react-hook-form errors
  if (errors && "root" in errors && errors[fieldName]?.message) {
    return {
      message: errors[fieldName]?.message as string,
      className: "text--danger text--small"
    };
  }

  // Handle server errors
  if (errors && "errors" in errors && errors.errors?.[fieldName]?.message) {
    return {
      message: errors.errors[fieldName].message,
      className: "text--danger text--small"
    };
  }

  if (value) {
    return {
      message: "Заполнено корректно",
      className: "text--success text--small"
    };
  }

  return { message: "", className: "" };
};
