import PasswordEntryForm from "../../components/PasswordEntryForm";
import { useTranslation } from "react-i18next";
import "./styles.scss";

type PasswordEntryData = {
  serviceName: string;
  password: string;
  notes: string;
};

const CreatePage = () => {
  const { t } = useTranslation();

  const handleSubmit = (data: PasswordEntryData) => {
    // Handle form submission
    console.log("Form submitted:", data);
  };

  return (
    <div className="create-page--container">
      <h2 className="create-page--title">{t("createPage.title")}</h2>
      <PasswordEntryForm onSubmit={handleSubmit} />
    </div>
  );
};

export default CreatePage;
