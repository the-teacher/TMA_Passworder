import { useState, FormEvent } from "react";
import { useTranslation } from "react-i18next";
import "./styles.scss";
import "@ui-kit//buttons.scss";

const PASSWORD_LENGTH = 10;
const PASSWORD_CHARS =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";

type PasswordEntryFormData = {
  serviceName: string;
  password: string;
  notes: string;
};

type PasswordEntryFormProps = {
  onSubmit: (data: PasswordEntryFormData) => void;
};

const PasswordEntryForm = ({ onSubmit }: PasswordEntryFormProps) => {
  const { t } = useTranslation("passwordEntry");
  const [formData, setFormData] = useState<PasswordEntryFormData>({
    serviceName: "",
    password: "",
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
      password: "",
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
    (field: keyof PasswordEntryFormData) =>
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
    <div className="password-entry-form--container">
      <form className="password-entry-form" onSubmit={handleSubmit}>
        <div className="password-entry-form--field">
          <label className="password-entry-form--label" htmlFor="serviceName">
            {t("serviceName")}
          </label>
          <input
            className="password-entry-form--input"
            id="serviceName"
            type="text"
            value={formData.serviceName}
            onChange={handleInputChange("serviceName")}
            required
          />
        </div>

        <div className="password-entry-form--field">
          <label className="password-entry-form--label" htmlFor="password">
            {t("password")}
          </label>
          <input
            className="password-entry-form--input"
            id="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleInputChange("password")}
            required
          />
          <div className="password-entry-form--password-actions">
            <button
              type="button"
              className="btn btn--icon"
              onClick={() => setShowPassword(!showPassword)}
              title={t(
                showPassword ? "actions.hidePassword" : "actions.showPassword"
              )}
            >
              <img
                className="password-entry-form--icon"
                src={`/icons/${showPassword ? "eye-off" : "eye"}.svg`}
                alt={t(
                  showPassword ? "actions.hidePassword" : "actions.showPassword"
                )}
              />
            </button>
            <button
              type="button"
              className="btn btn--icon"
              onClick={copyPassword}
              title={t("actions.copyPassword")}
            >
              <img
                className="password-entry-form--icon"
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
                className="password-entry-form--icon"
                src="/icons/refresh.svg"
                alt={t("actions.generatePassword")}
              />
            </button>
          </div>
        </div>

        <div className="password-entry-form--field">
          <label className="password-entry-form--label" htmlFor="notes">
            {t("notes")}
          </label>
          <textarea
            className="password-entry-form--textarea"
            id="notes"
            value={formData.notes}
            onChange={handleInputChange("notes")}
            rows={4}
          />
        </div>

        <div className="password-entry-form--actions">
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
    </div>
  );
};

export default PasswordEntryForm;
