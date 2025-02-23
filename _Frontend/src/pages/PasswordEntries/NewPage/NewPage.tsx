import CreatePasswordEntryForm from "@components/PasswordEntry/CreateForm";
import AppLayout from "@components/AppLayout";
import type { PasswordEntryData } from "./types";
import "@ui-kit/common.scss";

const NewPage = () => {
  const handleSubmit = (data: PasswordEntryData) => {
    // Handle form submission
    console.log("Form submitted:", data);
  };

  return (
    <AppLayout>
      <CreatePasswordEntryForm onSubmit={handleSubmit} />
    </AppLayout>
  );
};

export default NewPage;
