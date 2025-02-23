import { useState, FormEvent } from "react";
import { useTranslation } from "react-i18next";
import "@ui-kit/form-inputs.scss";
import "@ui-kit/buttons.scss";
import "@ui-kit/form-groups.scss";
import "@ui-kit/common.scss";
import "./styles.scss";
import AppIcon from "@components/AppIcon";

const PASSWORD_LENGTH = 10;
const PASSWORD_CHARS =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";

type CreatePasswordEntryFormData = {
  serviceName: string;
  username: string;
  password: string;
  serviceUrl: string;
  notes: string;
};

type CreatePasswordEntryFormProps = {
  onSubmit: (data: CreatePasswordEntryFormData) => void;
};

const CreatePasswordEntryForm = ({
  onSubmit
}: CreatePasswordEntryFormProps) => {
  const { t } = useTranslation("CreatePasswordEntryForm");
  const { t: c } = useTranslation("common");

  const [formData, setFormData] = useState<CreatePasswordEntryFormData>({
    serviceName: "",
    username: "",
    password: "",
    serviceUrl: "",
    notes: ""
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleReset = () => {
    setFormData({
      serviceName: "",
      username: "",
      password: "",
      serviceUrl: "",
      notes: ""
    });
  };

  const generatePassword = () => {
    const password = Array.from(
      { length: PASSWORD_LENGTH },
      () => PASSWORD_CHARS[Math.floor(Math.random() * PASSWORD_CHARS.length)]
    ).join("");

    setFormData((prev) => ({ ...prev, password }));
  };

  const handleInputChange =
    (field: keyof CreatePasswordEntryFormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const copyPassword = async () => {
    try {
      await navigator.clipboard.writeText(formData.password);
    } catch (err) {
      console.error("Failed to copy password:", err);
    }
  };

  return (
    <>
      <h2 className="text-center">{t("title")}</h2>

      <form
        className="create-password-form"
        onSubmit={handleSubmit}
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
            value={formData.serviceName}
            onChange={handleInputChange("serviceName")}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-group--label" htmlFor="username">
            {t("fields.username")}
          </label>
          <input
            className="form-input"
            id="username"
            type="text"
            value={formData.username}
            onChange={handleInputChange("username")}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-group--label" htmlFor="serviceUrl">
            {t("fields.url")}
          </label>
          <input
            className="form-input"
            id="serviceUrl"
            type="url"
            value={formData.serviceUrl}
            onChange={handleInputChange("serviceUrl")}
            placeholder="https://"
          />
        </div>

        <div className="form-group">
          <label className="form-group--label" htmlFor="password">
            {t("fields.password")}

            <AppIcon
              size={16}
              type={showPassword ? "eye-off" : "eye"}
              onClick={() => setShowPassword(!showPassword)}
              title={t(
                showPassword ? "actions.hidePassword" : "actions.showPassword"
              )}
              alt={t(
                showPassword ? "actions.hidePassword" : "actions.showPassword"
              )}
            />
          </label>
          <div className="form-group--input form-group--with-icon">
            <input
              className="form-input"
              id="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleInputChange("password")}
              required
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
        </div>

        <div className="form-group">
          <label className="form-group--label" htmlFor="notes">
            {t("fields.notes")}
          </label>
          <textarea
            className="form-input"
            id="notes"
            value={formData.notes}
            onChange={handleInputChange("notes")}
            rows={4}
          />
        </div>

        <div className="form-group--actions">
          <button type="submit" className="btn btn--primary">
            {c("save")}
          </button>
          <button
            type="button"
            className="btn btn--secondary"
            onClick={handleReset}
          >
            {c("reset")}
          </button>
        </div>
      </form>
    </>
  );
};

export default CreatePasswordEntryForm;
