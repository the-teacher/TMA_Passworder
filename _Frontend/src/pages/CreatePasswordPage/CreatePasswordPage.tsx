import CreatePasswordForm from "@components/CreatePasswordForm";
import { useTranslation } from "react-i18next";
import AppLayout from "@components/AppLayout";
import "@ui-kit/common.scss";

type PasswordEntryData = {
  serviceName: string;
  username: string;
  password: string;
  serviceUrl: string;
  notes: string;
};

const CreatePasswordPage = () => {
  const { t } = useTranslation();

  const handleSubmit = (data: PasswordEntryData) => {
    // Handle form submission
    console.log("Form submitted:", data);
  };

  return (
    <AppLayout>
      <h2 className="text-center">{t("CreatePasswordPage.title")}</h2>
      <CreatePasswordForm onSubmit={handleSubmit} />
    </AppLayout>
  );
};

export default CreatePasswordPage;
