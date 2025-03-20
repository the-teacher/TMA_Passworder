import { useTranslation } from "react-i18next";
import { useFormContext } from "react-hook-form";
import type { CreateAccountValidationSchemaType } from "../../validations";
import {
  createHandleTrim,
  createHandleNoSpaces,
  getFieldStatus
} from "@utils/forms";

const EmailInput = () => {
  const { t } = useTranslation("CreateAccountForm");
  const {
    register,
    setValue,
    formState: { errors, dirtyFields },
    watch
  } = useFormContext<CreateAccountValidationSchemaType>();

  const handleTrim = createHandleTrim(setValue);
  const handleNoSpaces = createHandleNoSpaces(setValue);

  const value = watch("email");
  const status = getFieldStatus("email", value || "", errors, dirtyFields, t);

  return (
    <div className="form-group">
      <label className="form-label" htmlFor="email">
        {t("fields.email")}
      </label>
      <input
        id="email"
        type="email"
        className={`form-input ${status.inputClassName}`}
        placeholder={t("placeholders.email")}
        aria-invalid={!!errors.email}
        data-testid="email-input"
        {...register("email", {
          onChange: handleNoSpaces,
          onBlur: handleTrim
        })}
        autoComplete="email"
      />
      <div className={`form-group--info ${status.className}`}>
        {status.message}
      </div>
    </div>
  );
};

export default EmailInput;
