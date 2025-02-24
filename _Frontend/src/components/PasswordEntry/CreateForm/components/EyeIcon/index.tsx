import { useTranslation } from "react-i18next";
import AppIcon from "@components/AppIcon";

type Props = {
  showPassword: boolean;
  onClick: () => void;
};

const EyeIcon = ({ showPassword, onClick }: Props) => {
  const { t } = useTranslation("CreatePasswordEntryForm");

  return (
    <AppIcon
      size={16}
      type={showPassword ? "eye-off" : "eye"}
      onClick={onClick}
      title={t(showPassword ? "actions.hidePassword" : "actions.showPassword")}
      alt={t(showPassword ? "actions.hidePassword" : "actions.showPassword")}
    />
  );
};

export default EyeIcon;
