import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { editPasswordEntryPath } from "@routes/helpers";
import "@ui-kit/card.scss";
import "@ui-kit/data-display.scss";
import "@ui-kit/buttons.scss";
import "@ui-kit/text-styles.scss";
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
    <div className="card card__centered show-password-entry">
      <div className="card--container">
        <div className="card--header">
          <h2 className="card--title">{t("title")}</h2>
        </div>

        <div className="card--content">
          <div className="data-display--container">
            <div className="data-display--field">
              <div className="data-display--label">
                {t("fields.serviceName")}
              </div>
              <div className="data-display--value">{serviceName}</div>
            </div>

            <div className="data-display--field">
              <div className="data-display--label">{t("fields.username")}</div>
              <div className="data-display--value">{username}</div>
            </div>

            <div className="data-display--field">
              <div className="data-display--label">{t("fields.password")}</div>
              <div className="data-display--value data-display__with-action">
                <span className="data-display__monospace">{password}</span>
                <button
                  className="btn btn--small btn--secondary"
                  onClick={() => navigator.clipboard.writeText(password)}
                  title={t("copyPassword")}
                >
                  {t("copy")}
                </button>
              </div>
            </div>

            {serviceUrl && (
              <div className="data-display--field">
                <div className="data-display--label">
                  {t("fields.serviceUrl")}
                </div>
                <div className="data-display--value">
                  <a
                    href={serviceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="data-display__link"
                  >
                    {serviceUrl}
                  </a>
                </div>
              </div>
            )}

            {notes && (
              <div className="data-display--field">
                <div className="data-display--label">{t("fields.notes")}</div>
                <div className="data-display--value data-display__multiline">
                  {notes}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="data-display--actions">
          <Link to={editPasswordEntryPath(id)} className="btn btn--primary">
            {t("edit")}
          </Link>

          {onBack && (
            <button className="btn btn--secondary" onClick={onBack}>
              {t("back")}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShowPasswordEntry;
