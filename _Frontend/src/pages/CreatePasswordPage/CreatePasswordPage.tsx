import CreatePasswordForm from "@components/CreatePasswordForm";
import AppLayout from "@components/AppLayout";
import type { PasswordEntryData } from "./types";
import "@ui-kit/common.scss";

const CreatePasswordPage = () => {
  const handleSubmit = (data: PasswordEntryData) => {
    // Handle form submission
    console.log("Form submitted:", data);
  };

  return (
    <AppLayout>
      <CreatePasswordForm onSubmit={handleSubmit} />
    </AppLayout>
  );
};

export default CreatePasswordPage;
