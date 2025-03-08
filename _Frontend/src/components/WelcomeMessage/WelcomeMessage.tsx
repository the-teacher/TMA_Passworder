import { useTranslation } from "react-i18next";

import "@ui-kit/card.scss";
import "@ui-kit/text-styles.scss";
import "@ui-kit/margins.scss";
import "@ui-kit/info-blocks.scss";
import "@ui-kit/data-display.scss";
import "@ui-kit/form-groups.scss";
import "@ui-kit/buttons.scss";
import "./styles.scss";

type WelcomeMessageProps = {
  onAccept: () => void;
  onDecline: () => void;
};

const WelcomeMessage = ({ onAccept, onDecline }: WelcomeMessageProps) => {
  const { t } = useTranslation("WelcomeMessage");

  return (
    <div className="card card__centered">
      <div className="card--container">
        <div className="card--header">
          <h2 className="card--title">{t("title")}</h2>
          <p className="card--subtitle">{t("subtitle")}</p>
        </div>

        <div className="card--content">
          <div className="info mb20">
            <p className="text mb8">
              <span className="feature-icon">✔️</span>{" "}
              {t("features.storePasswords")}
            </p>
            <p className="text mb8">
              <span className="feature-icon">⭐</span>{" "}
              {t("features.addFavorites")}
            </p>
            <p className="text mb8">
              <span className="feature-icon">📂</span>{" "}
              {t("features.groupForAccess")}
            </p>
            <p className="text mb8">
              <span className="feature-icon">🔍</span> {t("features.useSearch")}
            </p>
          </div>

          <div className="info info--primary mb20">
            <h3 className="text text--large mb8">
              <span className="feature-icon">🔒</span> {t("security.title")}
            </h3>
            <p className="text mb8">{t("security.separateDatabase")}</p>
            <p className="text mb8">
              <span className="feature-icon">📥</span>{" "}
              {t("security.downloadPasswords")}
            </p>
            <p className="text mb8">
              <span className="feature-icon">⏳</span>{" "}
              {t("security.backupReminder")}
            </p>
          </div>

          <p className="text mb16">{t("disclaimer")}</p>
        </div>
        <p className="text mb16 text--center">{t("tryFree")}</p>

        <div className="card--footer">
          <button
            type="button"
            className="btn btn--secondary btn--large"
            onClick={onDecline}
          >
            {t("actions.decline")}
          </button>

          <button
            type="button"
            className="btn btn--primary btn--large"
            onClick={onAccept}
          >
            {t("actions.accept")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeMessage;
