import { useTranslation, Trans } from "react-i18next";

import "@ui-kit/card.scss";
import "@ui-kit/text-styles.scss";
import "@ui-kit/margins.scss";
import "@ui-kit/info-blocks.scss";
import "@ui-kit/data-display.scss";
import "@ui-kit/form-groups.scss";
import "@ui-kit/buttons.scss";
import "@ui-kit/flex.scss";
import "@ui-kit/brand.scss";
import "./styles.scss";

type WelcomeMessageViewProps = {
  onConfirm: () => void;
  onDecline: () => void;
};

const WelcomeMessageView = ({
  onConfirm,
  onDecline
}: WelcomeMessageViewProps) => {
  const { t } = useTranslation("WelcomeMessage");

  return (
    <div className="card card__centered mt20 mb20">
      <div className="card--container">
        <div className="card--header flex--col flex--center">
          <img
            className="m20 brand--logo"
            src="/brand/icons/HamsterLogoHeart.svg"
            alt="Hamster Logo Heart"
          />
          <h2 className="card--title">{t("title")}</h2>
          <p className="card--subtitle">{t("subtitle")}</p>
        </div>

        <div className="card--content flex--col gap20">
          <p className="text text--bold text--center">{t("tryFree")}</p>

          <button
            type="button"
            className="btn btn--primary btn--jumbo"
            onClick={onConfirm}
          >
            {t("actions.accept")}
          </button>

          <button
            type="button"
            className="btn btn--secondary btn--large"
            onClick={onDecline}
          >
            {t("actions.decline")}
          </button>
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
        </div>
      </div>
    </div>
  );
};

export default WelcomeMessageView;
