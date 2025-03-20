import { useTranslation, Trans } from "react-i18next";
import { Link } from "react-router";

import "@ui-kit/card.scss";
import "@ui-kit/text-styles.scss";
import "@ui-kit/margins.scss";
import "@ui-kit/data-display.scss";
import "@ui-kit/buttons.scss";
import "./styles.scss";

import CreateAccountForm from "@components/UserRegistration/CreateAccountForm";

type UserData = {
  id: number;
  username?: string;
  first_name?: string;
  last_name?: string;
};

type UserRegistrationDataProps = {
  userData: UserData;
  onConfirm: () => void;
  onDecline: () => void;
};

const UserRegistrationData = ({
  userData,
  onConfirm,
  onDecline
}: UserRegistrationDataProps) => {
  const { t } = useTranslation("UserRegistrationData");
  const test = true;

  if (test) {
    return (
      <CreateAccountForm
        onSubmit={() => {}}
        onCancel={() => {}}
        isSubmitting={false}
      />
    );
  }

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
          <div className="data-display--container">
            {userData.username && (
              <div className="data-display--field">
                <div className="data-display--label">
                  {t("fields.username")}
                </div>
                <div className="data-display--value">{userData.username}</div>
              </div>
            )}

            <div className="data-display--field">
              <div className="data-display--label">{t("fields.userId")}</div>
              <div className="data-display--value">{userData.id}</div>
            </div>

            {userData.first_name && (
              <div className="data-display--field">
                <div className="data-display--label">
                  {t("fields.firstName")}
                </div>
                <div className="data-display--value">{userData.first_name}</div>
              </div>
            )}

            {userData.last_name && (
              <div className="data-display--field">
                <div className="data-display--label">
                  {t("fields.lastName")}
                </div>
                <div className="data-display--value">{userData.last_name}</div>
              </div>
            )}
          </div>

          <p className="text mb16">
            <Trans
              i18nKey="UserRegistrationData:disclaimer"
              components={{
                RulesLink: <Link to="/rules" />,
                PolicyLink: <Link to="/privacy-policy" />
              }}
            />
          </p>
        </div>

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
            {t("actions.confirm")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserRegistrationData;
