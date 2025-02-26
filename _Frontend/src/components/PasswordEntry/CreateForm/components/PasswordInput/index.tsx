import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useFormContext } from "react-hook-form";
import type { FormData } from "../../validationSchema";
import {
  createHandleTrim,
  createHandleNoSpaces
} from "../../utils/handleSpacesUtils";
import { getFieldStatus } from "../../utils/getFieldStatus";
import { generatePassword } from "../../utils/generatePassword";
import { copyToClipboard } from "../../utils/copyToClipboard";
import EyeIcon from "../EyeIcon";
import CopyButton from "../CopyButton";
import GenerateButton from "../GenerateButton";

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

  const handleGeneratePassword = () => {
    const password = generatePassword();
    setValue("password", password, { shouldValidate: true });
  };

  const handleCopyPassword = async () => {
    await copyToClipboard(value || "");
  };

  return (
    <div className="form-group">
      <label className="form-group--label" htmlFor="password">
        {t("fields.password")}
        <EyeIcon
          showPassword={showPassword}
          onClick={() => setShowPassword(!showPassword)}
        />
      </label>
      <div className="form-group--input form-group--with-icon">
        <input
          className="form-input"
          id="password"
          type={showPassword ? "text" : "password"}
          aria-invalid={!!errors.password}
          {...register("password", {
            onChange: handleNoSpaces,
            onBlur: handleTrim
          })}
        />
        <CopyButton onClick={handleCopyPassword} />
        <GenerateButton onClick={handleGeneratePassword} />
      </div>
      <div className={`form-group--info ${status.className}`}>
        {status.message}
      </div>
    </div>
  );
};

export default PasswordInput;
