import CreatePasswordForm from "@components/CreatePasswordForm";
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
