import { useTranslation } from "react-i18next";
import type { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  onClick: () => void;
};

const GenerateButton = ({ onClick, ...props }: Props) => {
  const { t } = useTranslation("CreatePasswordEntryForm");

  return (
    <button
      type="button"
      className="btn btn--icon"
      onClick={onClick}
      title={t("actions.generatePassword")}
      {...props}
    >
      <img src="/icons/refresh.svg" alt={t("actions.generatePassword")} />
    </button>
  );
};

export default GenerateButton;
