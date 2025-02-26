import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useFormContext } from "react-hook-form";
import type { FormData } from "../../validationSchema";
import {
  createHandleTrim,
  createHandleNoSpaces
} from "../../utils/handleSpacesUtils";
import { getFieldStatus } from "../../utils/getFieldStatus";
import {
  createHandleGeneratePassword,
  createHandleCopyPassword,
  createHandleTogglePassword
} from "../../utils/passwordUtils";
import EyeIcon from "../../components/EyeIcon";
import CopyButton from "../../components/CopyButton";
import GenerateButton from "../../components/GenerateButton/GenerateButton";

const PasswordInput = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { t } = useTranslation("CreatePasswordEntryForm");
  const {
    register,
    setValue,
    formState: { errors, dirtyFields },
    watch
  } = useFormContext<FormData>();

  const handleTrim = createHandleTrim(setValue);
  const handleNoSpaces = createHandleNoSpaces(setValue);

  const value = watch("password");
  const status = getFieldStatus("password", value, errors, dirtyFields, t);

  const handleGeneratePassword = createHandleGeneratePassword(setValue, t);
  const handleCopyPassword = createHandleCopyPassword(value, t);
  const handleTogglePassword = createHandleTogglePassword(
    showPassword,
    setShowPassword,
    value,
    t
  );

  return (
    <div className="form-group">
      <label className="form-group--label" htmlFor="password">
        {t("fields.password")}
        <EyeIcon
          data-testid="toggle-password"
          showPassword={showPassword}
          onClick={handleTogglePassword}
        />
      </label>
      <div className="form-group--input form-group--with-icon">
        <input
          className={`form-input ${status.inputClassName}`}
          id="password"
          data-testid="password-input"
          type={showPassword ? "text" : "password"}
          aria-invalid={!!errors.password}
          {...register("password", {
            onChange: handleNoSpaces,
            onBlur: handleTrim
          })}
        />
        <CopyButton data-testid="copy-password" onClick={handleCopyPassword} />
        <GenerateButton
          data-testid="generate-password"
          onClick={handleGeneratePassword}
        />
      </div>
      <div className={`form-group--info ${status.className}`}>
        {status.message}
      </div>
    </div>
  );
};

export default PasswordInput;
