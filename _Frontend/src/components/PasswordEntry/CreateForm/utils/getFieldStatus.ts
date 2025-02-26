import type { TFunction } from "i18next";
import type { FieldErrors } from "react-hook-form";

// errors: { form_error: string, errors: { fieldName: { message: string } } }
export type ServerErrors = {
  form_error?: string;
  errors?: Record<string, { message: string }>;
};

type FieldStatus = {
  message: string;
  className: string;
  inputClassName: string;
};

const isServerError = (
  errors: FieldErrors | ServerErrors,
  fieldName: string
): errors is ServerErrors => {
  const serverErrors = errors as ServerErrors;
  return (
    "errors" in errors &&
    !!serverErrors.errors &&
    fieldName in serverErrors.errors
  );
};

const getServerErrorStatus = (
  errors: ServerErrors,
  fieldName: string
): FieldStatus => ({
  message: errors.errors![fieldName].message,
  className: "text--danger text--small",
  inputClassName: "form-input--error"
});

const getFormErrorStatus = (
  errors: FieldErrors,
  fieldName: string
): FieldStatus => ({
  message: errors[fieldName]?.message as string,
  className: "text--danger text--small",
  inputClassName: "form-input--error"
});

const getSuccessStatus = (t: TFunction): FieldStatus => ({
  message: t("validation.filledCorrectly"),
  className: "text--success text--small",
  inputClassName: "form-input--success"
});

const getWarningStatus = (t: TFunction): FieldStatus => ({
  message: t("validation.pleaseEnterField"),
  className: "text--warning text--small",
  inputClassName: "form-input--warning"
});

const getEmptyStatus = (): FieldStatus => ({
  message: "",
  className: "",
  inputClassName: ""
});

export const getFieldStatus = (
  fieldName: string,
  value: string | undefined,
  errors: FieldErrors | ServerErrors,
  dirtyFields: Record<string, boolean>,
  t: TFunction
): FieldStatus => {
  if (!dirtyFields[fieldName] && !value) {
    return getWarningStatus(t);
  }

  if (!dirtyFields[fieldName]) {
    return getEmptyStatus();
  }

  if (isServerError(errors, fieldName)) {
    return getServerErrorStatus(errors, fieldName);
  }

  if (fieldName in errors) {
    return getFormErrorStatus(errors as FieldErrors, fieldName);
  }

  if (value) {
    return getSuccessStatus(t);
  }

  return getEmptyStatus();
};
