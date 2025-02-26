import { useTranslation } from "react-i18next";
import type { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  onClick: () => void;
};

const CopyButton = ({ onClick, ...props }: Props) => {
  const { t } = useTranslation("CreatePasswordEntryForm");

  return (
    <button
      type="button"
      className="btn btn--icon"
      onClick={onClick}
      title={t("actions.copyPassword")}
      {...props}
    >
      <img src="/icons/clipboard-check.svg" alt={t("actions.copyPassword")} />
    </button>
  );
};

export default CopyButton;
