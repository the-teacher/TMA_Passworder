import { useState, FormEvent } from "react";
import { useTranslation } from "react-i18next";
import "@ui-kit/form-inputs.scss";
import "@ui-kit/buttons.scss";
import "@ui-kit/form-groups.scss";
import "./styles.scss";
import AppIcon from "@components/AppIcon";

const PASSWORD_LENGTH = 10;
const PASSWORD_CHARS =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";

type CreatePasswordFormData = {
  serviceName: string;
  username: string;
  password: string;
  serviceUrl: string;
  notes: string;
};

type CreatePasswordFormProps = {
  onSubmit: (data: CreatePasswordFormData) => void;
};

const CreatePasswordForm = ({ onSubmit }: CreatePasswordFormProps) => {
  const { t } = useTranslation("passwordEntry");
  const [formData, setFormData] = useState<CreatePasswordFormData>({
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
    (field: keyof CreatePasswordFormData) =>
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
    <form className="password-entry-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="form-group--label" htmlFor="serviceName">
          {t("serviceName")}
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
          {t("username")}
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
          {t("serviceUrl")}
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
          {t("password")}

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
            <img src="/icons/refresh.svg" alt={t("actions.generatePassword")} />
          </button>
        </div>
      </div>

      <div className="form-group">
        <label className="form-group--label" htmlFor="notes">
          {t("notes")}
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
          {t("actions.save")}
        </button>
        <button
          type="button"
          className="btn btn--secondary"
          onClick={handleReset}
        >
          {t("actions.reset")}
        </button>
      </div>
    </form>
  );
};

export default CreatePasswordForm;
