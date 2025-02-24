import { useTranslation } from "react-i18next";

type Props = {
  onClick: () => void;
};

const GenerateButton = ({ onClick }: Props) => {
  const { t } = useTranslation("CreatePasswordEntryForm");

  return (
    <button
      type="button"
      className="btn btn--icon"
      onClick={onClick}
      title={t("actions.generatePassword")}
    >
      <img src="/icons/refresh.svg" alt={t("actions.generatePassword")} />
    </button>
  );
};

export default GenerateButton;
