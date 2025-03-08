import { useTranslation } from "react-i18next";
import PrivacyPolicyPageEn from "./PrivacyPolicyPageEn";
import PrivacyPolicyPageRu from "./PrivacyPolicyPageRu";

const PrivacyPolicyPage = () => {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;

  return currentLanguage === "ru" ? (
    <PrivacyPolicyPageRu />
  ) : (
    <PrivacyPolicyPageEn />
  );
};

export default PrivacyPolicyPage;
