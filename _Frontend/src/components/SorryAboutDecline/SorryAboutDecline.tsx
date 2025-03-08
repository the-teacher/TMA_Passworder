import { useTranslation } from "react-i18next";
import "@ui-kit/card.scss";
import "@ui-kit/text-styles.scss";
import "@ui-kit/margins.scss";
import "@ui-kit/buttons.scss";
import "@ui-kit/utils.scss";
import "./styles.scss";

type SorryAboutDeclineProps = {
  buttonHandler: () => void;
};

const SorryAboutDecline = ({ buttonHandler }: SorryAboutDeclineProps) => {
  const { t } = useTranslation("SorryAboutDecline");

  return (
    <div className="card__centered">
      <div className="card--container">
        <div className="card--header">
          <h2 className="card--title">{t("title")}</h2>
        </div>

        <div className="card--content">
          <p className="text mb16">{t("sorryMessage")}</p>
          <p className="text mb16">{t("reconsiderMessage")}</p>
          <p className="text mb16">{t("benefitsMessage")}</p>
        </div>

        <div className="card--footer align-center">
          <button
            type="button"
            className="btn btn--primary btn--large"
            onClick={buttonHandler}
          >
            {t("tryAgainButton")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SorryAboutDecline;
