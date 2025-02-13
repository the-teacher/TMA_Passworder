import PasswordEntryForm from "@components/PasswordEntryForm";
import { useTranslation } from "react-i18next";
import AppLayout from "@components/AppLayout";
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
    <AppLayout>
      <div className="create-page--container">
        <h2 className="create-page--title">{t("createPage.title")}</h2>
        <PasswordEntryForm onSubmit={handleSubmit} />
      </div>
    </AppLayout>
  );
};

export default CreatePage;
