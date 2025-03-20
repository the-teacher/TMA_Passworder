import { useTranslation } from "react-i18next";
import { useFormContext } from "react-hook-form";
import type { FormData } from "../../validationSchema";
import { getFieldStatus, createHandleTrim } from "@utils/forms";

const UsernameInput = () => {
  const { t } = useTranslation("CreatePasswordEntryForm");
  const {
    register,
    setValue,
    formState: { errors, dirtyFields },
    watch
  } = useFormContext<FormData>();

  const handleTrim = createHandleTrim(setValue);

  const value = watch("username");
  const status = getFieldStatus("username", value, errors, dirtyFields, t);

  return (
    <div className="form-group">
      <label className="form-group--label" htmlFor="username">
        {t("fields.username")}
      </label>
      <input
        className={`form-input ${status.inputClassName}`}
        id="username"
        data-testid="username-input"
        type="text"
        aria-invalid={!!errors.username}
        {...register("username", {
          onBlur: handleTrim
        })}
      />
      <div className={`form-group--info ${status.className}`}>
        {status.message}
      </div>
    </div>
  );
};

export default UsernameInput;
