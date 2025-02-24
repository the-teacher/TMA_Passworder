import { useTranslation } from "react-i18next";

type Props = {
  onClick: () => void;
};

const CopyButton = ({ onClick }: Props) => {
  const { t } = useTranslation("CreatePasswordEntryForm");

  return (
    <button
      type="button"
      className="btn btn--icon"
      onClick={onClick}
      title={t("actions.copyPassword")}
    >
      <img src="/icons/clipboard-check.svg" alt={t("actions.copyPassword")} />
    </button>
  );
};

export default CopyButton;
