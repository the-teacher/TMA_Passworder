import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import AppLayout from "@components/AppLayout";
import "./styles.scss";

// Mock data for now
const mockPasswordEntry = {
  id: "123",
  title: "Gmail Account",
  username: "user@gmail.com",
  password: "securePassword123",
  url: "https://gmail.com",
  notes: "Work email account\nBackup email: backup@gmail.com"
};

const ShowPage = () => {
  const { t } = useTranslation("passwordEntry");
  const { t: c } = useTranslation("common");

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // TODO: Add toast notification
  };

  return (
    <AppLayout>
      <div className="show-page">
        <div className="show-page__header">
          <h1 className="show-page__title">{mockPasswordEntry.title}</h1>
          <Link
            to={`/passwords/${mockPasswordEntry.id}/edit`}
            className="show-page__edit-button"
          >
            {c("edit")}
          </Link>
        </div>

        <div className="show-page__content">
          <div className="show-page__field">
            <label className="show-page__label">{t("username")}</label>
            <div className="show-page__value-container">
              <span className="show-page__value">
                {mockPasswordEntry.username}
              </span>
              <button
                className="show-page__copy-button"
                onClick={() => copyToClipboard(mockPasswordEntry.username)}
                aria-label={t("copy")}
              >
                <img src="/icons/clipboard-check.svg" alt={c("copy")} />
              </button>
            </div>
          </div>

          <div className="show-page__field">
            <label className="show-page__label">{t("password")}</label>
            <div className="show-page__value-container">
              <span className="show-page__value">
                {isPasswordVisible ? mockPasswordEntry.password : "••••••••"}
              </span>
              <button
                className="show-page__visibility-button"
                onClick={togglePasswordVisibility}
                aria-label={c(isPasswordVisible ? "hide" : "show")}
              >
                <img
                  src={`/icons/${isPasswordVisible ? "eye-off" : "eye"}.svg`}
                  alt={c(isPasswordVisible ? "hide" : "show")}
                />
              </button>
              <button
                className="show-page__copy-button"
                onClick={() => copyToClipboard(mockPasswordEntry.password)}
                aria-label={c("copy")}
              >
                <img src="/icons/clipboard-check.svg" alt={c("copy")} />
              </button>
            </div>
          </div>

          {mockPasswordEntry.url && (
            <div className="show-page__field">
              <label className="show-page__label">{t("url")}</label>
              <div className="show-page__value-container">
                <a
                  href={mockPasswordEntry.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="show-page__value show-page__link"
                >
                  {mockPasswordEntry.url}
                </a>
                <button
                  className="show-page__copy-button"
                  onClick={() => copyToClipboard(mockPasswordEntry.url)}
                  aria-label={t("common.copy")}
                >
                  <img src="/icons/clipboard-check.svg" alt={c("copy")} />
                </button>
              </div>
            </div>
          )}

          {mockPasswordEntry.notes && (
            <div className="show-page__field">
              <label className="show-page__label">{t("notes")}</label>
              <div className="show-page__notes">
                {mockPasswordEntry.notes.split("\n").map((line, index) => (
                  <p key={index}>{line}</p>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default ShowPage;
