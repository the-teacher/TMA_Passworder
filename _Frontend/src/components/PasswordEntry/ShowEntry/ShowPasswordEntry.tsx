import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { editPasswordEntryPath } from "@routes/helpers";
import "./styles.scss";

export type PasswordEntryData = {
  id: string;
  serviceName: string;
  username: string;
  password: string;
  serviceUrl: string;
  notes: string;
};

type ShowPasswordEntryProps = {
  data: PasswordEntryData;
  onBack?: () => void;
};

const ShowPasswordEntry = ({ data, onBack }: ShowPasswordEntryProps) => {
  const { t } = useTranslation("ShowPasswordEntry");

  const { id, serviceName, username, password, serviceUrl, notes } = data;

  return (
    <div className="show-password-entry">
      <h2 className="show-password-entry__title">{t("title")}</h2>

      <div className="show-password-entry__content">
        <div className="show-password-entry__field">
          <div className="show-password-entry__label">
            {t("fields.serviceName")}
          </div>
          <div className="show-password-entry__value">{serviceName}</div>
        </div>

        <div className="show-password-entry__field">
          <div className="show-password-entry__label">
            {t("fields.username")}
          </div>
          <div className="show-password-entry__value">{username}</div>
        </div>

        <div className="show-password-entry__field">
          <div className="show-password-entry__label">
            {t("fields.password")}
          </div>
          <div className="show-password-entry__value show-password-entry__password">
            <span className="show-password-entry__password-value">
              {password}
            </span>
            <button
              className="show-password-entry__copy-button"
              onClick={() => navigator.clipboard.writeText(password)}
              title={t("copyPassword")}
            >
              {t("copy")}
            </button>
          </div>
        </div>

        {serviceUrl && (
          <div className="show-password-entry__field">
            <div className="show-password-entry__label">
              {t("fields.serviceUrl")}
            </div>
            <div className="show-password-entry__value">
              <a
                href={serviceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="show-password-entry__link"
              >
                {serviceUrl}
              </a>
            </div>
          </div>
        )}

        {notes && (
          <div className="show-password-entry__field">
            <div className="show-password-entry__label">
              {t("fields.notes")}
            </div>
            <div className="show-password-entry__value show-password-entry__notes">
              {notes}
            </div>
          </div>
        )}
      </div>

      <div className="show-password-entry__actions">
        <Link
          to={editPasswordEntryPath(id)}
          className="show-password-entry__edit-button"
        >
          {t("edit")}
        </Link>

        {onBack && (
          <button className="show-password-entry__back-button" onClick={onBack}>
            {t("back")}
          </button>
        )}
      </div>
    </div>
  );
};

export default ShowPasswordEntry;
