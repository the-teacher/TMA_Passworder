import {
  type UseFormRegister,
  type FieldErrors,
  type UseFormWatch
} from "react-hook-form";
import { useTranslation } from "react-i18next";
import { type FormData } from "./validationSchema";
import { getFieldStatus } from "./utils/getFieldStatus";

import EyeIcon from "./components/EyeIcon";
import CopyButton from "./components/CopyButton";
import GenerateButton from "./components/GenerateButton";
import FormError from "./components/FormError";

import "@ui-kit/form-inputs.scss";
import "@ui-kit/buttons.scss";
import "@ui-kit/form-groups.scss";
import "@ui-kit/text-styles.scss";
import "@ui-kit/info-blocks.scss";
import "@ui-kit/common.scss";
import "@ui-kit/spaces.scss";

import "./styles.scss";

type Props = {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
  watch: UseFormWatch<FormData>;
  touchedFields: Record<string, boolean>;
  isSubmitting: boolean;
  showPassword: boolean;
  formError?: string;
  onTogglePassword: () => void;
  onGeneratePassword: () => void;
  onCopyPassword: () => void;
  onSubmit: (e: React.FormEvent) => void;
  onReset: () => void;
};

const CreatePasswordEntryFormView = ({
  register,
  errors,
  watch,
  touchedFields,
  isSubmitting,
  showPassword,
  formError,
  onTogglePassword,
  onGeneratePassword,
  onCopyPassword,
  onSubmit,
  onReset
}: Props) => {
  const { t } = useTranslation("CreatePasswordEntryForm");
  const { t: c } = useTranslation("common");

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
    touchedFields,
    t
  );
  const usernameStatus = getFieldStatus(
    "username",
    usernameValue,
    errors,
    touchedFields,
    t
  );
  const passwordStatus = getFieldStatus(
    "password",
    passwordValue,
    errors,
    touchedFields,
    t
  );
  const serviceUrlStatus = getFieldStatus(
    "serviceUrl",
    serviceUrlValue,
    errors,
    touchedFields,
    t
  );

  return (
    <>
      <h2 className="text-center">{t("title")}</h2>

      {formError && <FormError>{formError}</FormError>}

      <form
        className="create-password-form"
        onSubmit={onSubmit}
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
            aria-invalid={!!errors.serviceName}
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
            aria-invalid={!!errors.username}
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
            <EyeIcon showPassword={showPassword} onClick={onTogglePassword} />
          </label>
          <div className="form-group--input form-group--with-icon">
            <input
              className="form-input"
              id="password"
              type={showPassword ? "text" : "password"}
              aria-invalid={!!errors.password}
              {...register("password")}
            />
            <CopyButton onClick={onCopyPassword} />
            <GenerateButton onClick={onGeneratePassword} />
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
            {isSubmitting ? c("saving") : c("save")}
          </button>
          <button
            type="button"
            className="btn btn--secondary"
            onClick={onReset}
          >
            {c("reset")}
          </button>
        </div>
      </form>
    </>
  );
};

export default CreatePasswordEntryFormView;
