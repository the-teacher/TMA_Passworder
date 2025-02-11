import { useState, FormEvent } from "react";
import "./styles.scss";

const PASSWORD_LENGTH = 7;
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

  return (
    <div className={`${BLOCK_NAME}--container`}>
      <form className={BLOCK_NAME} onSubmit={handleSubmit}>
        <div className={getElementClass("field")}>
          <label className={getElementClass("label")} htmlFor="serviceName">
            Service Name
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
            Password
          </label>
          <div className={getElementClass("password-container")}>
            <input
              className={getElementClass("input")}
              id="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleInputChange("password")}
              required
            />
            <button
              type="button"
              className={getElementClass("icon-button")}
              onClick={() => setShowPassword(!showPassword)}
            >
              <img
                className={getElementClass("icon")}
                src={`/icons/${showPassword ? "eye-off" : "eye"}.svg`}
                alt={showPassword ? "Hide password" : "Show password"}
              />
            </button>
            <button
              type="button"
              className={getElementClass("icon-button")}
              onClick={generatePassword}
            >
              <img
                className={getElementClass("icon")}
                src="/icons/refresh.svg"
                alt="Generate password"
              />
            </button>
          </div>
        </div>

        <div className={getElementClass("field")}>
          <label className={getElementClass("label")} htmlFor="notes">
            Notes
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
            Save
          </button>
          <button
            type="button"
            className={getElementClass("button-reset")}
            onClick={handleReset}
          >
            Back
          </button>
        </div>
      </form>
    </div>
  );
};

export default PasswordEntryForm;
