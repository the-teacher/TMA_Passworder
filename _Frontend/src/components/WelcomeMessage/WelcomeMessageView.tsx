import { useTranslation, Trans } from "react-i18next";
import { Link } from "react-router";

import "@ui-kit/card.scss";
import "@ui-kit/text-styles.scss";
import "@ui-kit/margins.scss";
import "@ui-kit/info-blocks.scss";
import "@ui-kit/data-display.scss";
import "@ui-kit/form-groups.scss";
import "@ui-kit/buttons.scss";
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
    <div className="card__centered">
      <div className="card--container">
        <div className="card--header">
          <img
            width={200}
            height={200}
            className="m20 card--logo"
            src="/brand/icons/HamsterLogoHeart.svg"
            alt="Hamster Logo Heart"
          />
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

          <p className="text mb16">
            <Trans
              i18nKey="WelcomeMessage:disclaimer"
              components={{
                RulesLink: <Link to="/rules" />,
                PolicyLink: <Link to="/privacy-policy" />
              }}
            />
          </p>
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
            onClick={onConfirm}
          >
            {t("actions.accept")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeMessageView;
