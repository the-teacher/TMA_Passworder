import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useSubmitForm } from "./hooks/useSubmitForm";
import { formSchema, type FormData } from "./validationSchema";
import { getFieldStatus } from "./utils/getFieldStatus";

import AppIcon from "@components/AppIcon";

import "@ui-kit/form-inputs.scss";
import "@ui-kit/buttons.scss";
import "@ui-kit/form-groups.scss";
import "@ui-kit/text-styles.scss";
import "@ui-kit/info-blocks.scss";
import "@ui-kit/common.scss";
import "@ui-kit/spaces.scss";

import "./styles.scss";

const PASSWORD_LENGTH = 10;
const PASSWORD_CHARS =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";

type CreatePasswordEntryFormProps = {
  onSubmit: (data: FormData) => void;
};

type EyeIconProps = {
  showPassword: boolean;
  onClick: () => void;
};

const EyeIcon = ({ showPassword, onClick }: EyeIconProps) => {
  const { t } = useTranslation("CreatePasswordEntryForm");

  return (
    <AppIcon
      size={16}
      type={showPassword ? "eye-off" : "eye"}
      onClick={onClick}
      title={t(showPassword ? "actions.hidePassword" : "actions.showPassword")}
      alt={t(showPassword ? "actions.hidePassword" : "actions.showPassword")}
    />
  );
};

const CreatePasswordEntryForm = ({
  onSubmit
}: CreatePasswordEntryFormProps) => {
  const { t } = useTranslation("CreatePasswordEntryForm");
  const { t: c } = useTranslation("common");
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    setError,
    clearErrors,
    formState: { errors, touchedFields }
  } = useForm<FormData>({
    mode: "onChange",
    resolver: zodResolver(formSchema)
  });

  const { submitForm, formError, isSubmitting } = useSubmitForm();

  // Watch form fields
  const serviceNameValue = watch("serviceName");
  const usernameValue = watch("username");
  const passwordValue = watch("password");
  const serviceUrlValue = watch("serviceUrl");

  // Get field statuses
  const serviceNameStatus = getFieldStatus(
    "serviceName",
    serviceNameValue,
    errors,
    touchedFields
  );
  const usernameStatus = getFieldStatus(
    "username",
    usernameValue,
    errors,
    touchedFields
  );
  const passwordStatus = getFieldStatus(
    "password",
    passwordValue,
    errors,
    touchedFields
  );
  const serviceUrlStatus = getFieldStatus(
    "serviceUrl",
    serviceUrlValue,
    errors,
    touchedFields
  );

  const generatePassword = () => {
    const password = Array.from(
      { length: PASSWORD_LENGTH },
      () => PASSWORD_CHARS[Math.floor(Math.random() * PASSWORD_CHARS.length)]
    ).join("");
    setValue("password", password, { shouldValidate: true });
  };

  const copyPassword = async () => {
    try {
      await navigator.clipboard.writeText(passwordValue || "");
    } catch (err) {
      console.error("Failed to copy password:", err);
    }
  };

  const handleFormSubmit = handleSubmit((data) => {
    submitForm(data, setError, clearErrors);
    onSubmit(data);
  });

  return (
    <>
      <h2 className="text-center">{t("title")}</h2>

      {formError && <div className="info info--danger mb20">{formError}</div>}

      <form
        className="create-password-form"
        onSubmit={handleFormSubmit}
        role="create-password-form"
      >
        <div className="form-group">
          <label className="form-group--label" htmlFor="serviceName">
            {t("fields.serviceName")}
          </label>
          <input
            className="form-input"
            id="serviceName"
            type="text"
            {...register("serviceName")}
          />
          <div className={`form-group--info ${serviceNameStatus.className}`}>
            {serviceNameStatus.message}
          </div>
        </div>

        <div className="form-group">
          <label className="form-group--label" htmlFor="username">
            {t("fields.username")}
          </label>
          <input
            className="form-input"
            id="username"
            type="text"
            {...register("username")}
          />
          <div className={`form-group--info ${usernameStatus.className}`}>
            {usernameStatus.message}
          </div>
        </div>

        <div className="form-group">
          <label className="form-group--label" htmlFor="serviceUrl">
            {t("fields.url")}
          </label>
          <input
            className="form-input"
            id="serviceUrl"
            type="url"
            placeholder="https://"
            {...register("serviceUrl")}
          />
          <div className={`form-group--info ${serviceUrlStatus.className}`}>
            {serviceUrlStatus.message}
          </div>
        </div>

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
              {...register("password")}
            />
            <button
              type="button"
              className="btn btn--icon"
              onClick={copyPassword}
              title={t("actions.copyPassword")}
            >
              <img
                src="/icons/clipboard-check.svg"
                alt={t("actions.copyPassword")}
              />
            </button>
            <button
              type="button"
              className="btn btn--icon"
              onClick={generatePassword}
              title={t("actions.generatePassword")}
            >
              <img
                src="/icons/refresh.svg"
                alt={t("actions.generatePassword")}
              />
            </button>
          </div>
          <div className={`form-group--info ${passwordStatus.className}`}>
            {passwordStatus.message}
          </div>
        </div>

        <div className="form-group">
          <label className="form-group--label" htmlFor="notes">
            {t("fields.notes")}
          </label>
          <textarea
            className="form-input"
            id="notes"
            rows={4}
            {...register("notes")}
          />
        </div>

        <div className="form-group--actions">
          <button
            type="submit"
            className="btn btn--primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : c("save")}
          </button>
          <button
            type="button"
            className="btn btn--secondary"
            onClick={() => reset()}
          >
            {c("reset")}
          </button>
        </div>
      </form>
    </>
  );
};

export default CreatePasswordEntryForm;
