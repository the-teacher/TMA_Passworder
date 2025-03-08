import { useTranslation } from "react-i18next";
import RulesPageEn from "./RulesPageEn";
import RulesPageRu from "./RulesPageRu";

const RulesPage = () => {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;

  return currentLanguage === "ru" ? <RulesPageRu /> : <RulesPageEn />;
};

export default RulesPage;
