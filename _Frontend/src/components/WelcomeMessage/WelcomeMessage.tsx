import { useTranslation } from "react-i18next";
import AppButton from "@components/AppButton";
import "@ui-kit/card.scss";
import "@ui-kit/text-styles.scss";
import "@ui-kit/margins.scss";
import "@ui-kit/info-blocks.scss";
import "@ui-kit/data-display.scss";
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
          <AppButton
            icon="circle-plus"
            variant="success"
            title={t("actions.accept")}
            alt={t("actions.acceptAlt")}
            onClick={onAccept}
          />
          <AppButton
            icon="square-x"
            variant="danger"
            title={t("actions.decline")}
            alt={t("actions.declineAlt")}
            onClick={onDecline}
          />
        </div>
      </div>
    </div>
  );
};

export default WelcomeMessage;
