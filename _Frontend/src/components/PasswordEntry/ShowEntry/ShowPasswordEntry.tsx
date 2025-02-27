import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { editPasswordEntryPath, indexPath } from "@routes/helpers";
import { useParams } from "react-router";
import CopyButton from "../CreateForm/components/CopyButton";
import { copyToClipboard } from "../CreateForm/utils/copyToClipboard";
import EventEmitter from "@lib/EventEmitter";
import "@ui-kit/card.scss";
import "@ui-kit/data-display.scss";
import "@ui-kit/buttons.scss";
import "@ui-kit/text-styles.scss";

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
};

const ShowPasswordEntry = ({ data }: ShowPasswordEntryProps) => {
  const { id } = useParams();
  const { t } = useTranslation("ShowPasswordEntry");

  const { serviceName, username, password, serviceUrl, notes } = data;

  const handleCopy = (text: string, fieldName: string) => async () => {
    await copyToClipboard(text);
    EventEmitter.emit(
      "NOTIFICATION",
      t("notifications.copied", { field: t(`fields.${fieldName}`) })
    );
  };

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
              <div className="data-display--value data-display__with-action">
                <span>{serviceName}</span>
                <CopyButton
                  data-testid="copy-service-name"
                  onClick={handleCopy(serviceName, "serviceName")}
                />
              </div>
            </div>

            <div className="data-display--field">
              <div className="data-display--label">{t("fields.username")}</div>
              <div className="data-display--value data-display__with-action">
                <span>{username}</span>
                <CopyButton
                  data-testid="copy-username"
                  onClick={handleCopy(username, "username")}
                />
              </div>
            </div>

            <div className="data-display--field">
              <div className="data-display--label">{t("fields.password")}</div>
              <div className="data-display--value data-display__with-action">
                <span className="data-display__monospace">{password}</span>
                <CopyButton
                  data-testid="copy-password"
                  onClick={handleCopy(password, "password")}
                />
              </div>
            </div>

            {serviceUrl && (
              <div className="data-display--field">
                <div className="data-display--label">
                  {t("fields.serviceUrl")}
                </div>
                <div className="data-display--value data-display__with-action">
                  <a
                    href={serviceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="data-display__link"
                  >
                    {serviceUrl}
                  </a>
                  <CopyButton
                    data-testid="copy-service-url"
                    onClick={handleCopy(serviceUrl, "serviceUrl")}
                  />
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

          <Link className="btn btn--secondary" to={indexPath()}>
            {t("back")}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ShowPasswordEntry;
