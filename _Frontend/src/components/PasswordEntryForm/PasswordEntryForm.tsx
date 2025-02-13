import { useState, FormEvent } from "react";
import { useTranslation } from "react-i18next";
import "./styles.scss";

const PASSWORD_LENGTH = 10;
const PASSWORD_CHARS =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
const BLOCK_NAME = "password-entry-form";

type PasswordEntryFormData = {
  serviceName: string;
  password: string;
  notes: string;
};

type PasswordEntryFormProps = {
  onSubmit: (data: PasswordEntryFormData) => void;
};

const getElementClass = (element: string) => `${BLOCK_NAME}--${element}`;

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
    <div className={`${BLOCK_NAME}--container`}>
      <form className={BLOCK_NAME} onSubmit={handleSubmit}>
        <div className={getElementClass("field")}>
          <label className={getElementClass("label")} htmlFor="serviceName">
            {t("serviceName")}
          </label>
          <input
            className={getElementClass("input")}
            id="serviceName"
            type="text"
            value={formData.serviceName}
            onChange={handleInputChange("serviceName")}
            required
          />
        </div>

        <div className={getElementClass("field")}>
          <label className={getElementClass("label")} htmlFor="password">
            {t("password")}
          </label>
          <input
            className={getElementClass("input")}
            id="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleInputChange("password")}
            required
          />
          <div className={getElementClass("password-actions")}>
            <button
              type="button"
              className={getElementClass("icon-button")}
              onClick={() => setShowPassword(!showPassword)}
              title={t(
                showPassword ? "actions.hidePassword" : "actions.showPassword"
              )}
            >
              <img
                className={getElementClass("icon")}
                src={`/icons/${showPassword ? "eye-off" : "eye"}.svg`}
                alt={t(
                  showPassword ? "actions.hidePassword" : "actions.showPassword"
                )}
              />
            </button>
            <button
              type="button"
              className={getElementClass("icon-button")}
              onClick={copyPassword}
              title={t("actions.copyPassword")}
            >
              <img
                className={getElementClass("icon")}
                src="/icons/clipboard-check.svg"
                alt={t("actions.copyPassword")}
              />
            </button>
            <button
              type="button"
              className={getElementClass("icon-button")}
              onClick={generatePassword}
              title={t("actions.generatePassword")}
            >
              <img
                className={getElementClass("icon")}
                src="/icons/refresh.svg"
                alt={t("actions.generatePassword")}
              />
            </button>
          </div>
        </div>

        <div className={getElementClass("field")}>
          <label className={getElementClass("label")} htmlFor="notes">
            {t("notes")}
          </label>
          <textarea
            className={getElementClass("textarea")}
            id="notes"
            value={formData.notes}
            onChange={handleInputChange("notes")}
            rows={4}
          />
        </div>

        <div className={getElementClass("actions")}>
          <button type="submit" className={getElementClass("button-submit")}>
            {t("actions.save")}
          </button>
          <button
            type="button"
            className={getElementClass("button-reset")}
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
