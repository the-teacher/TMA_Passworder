import CreatePasswordEntryForm from "@components/PasswordEntry/CreateForm";
import AppLayout from "@components/AppLayout";
import type { PasswordEntryData } from "./types";
import "@ui-kit/common.scss";

const NewPage = () => {
  return (
    <AppLayout>
      <CreatePasswordEntryForm />
    </AppLayout>
  );
};

export default NewPage;
