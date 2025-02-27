import ShowPasswordEntry from "@components/PasswordEntry/ShowEntry";
import AppLayout from "@components/AppLayout";
import { useNavigate } from "react-router";
import { listPasswordEntriesPath } from "@routes/helpers";

const NewPage = () => {
  const navigate = useNavigate();

  const data = {
    id: "1",
    serviceName: "Google",
    username: "john.doe",
    password: "password123",
    serviceUrl: "https://www.google.com",
    notes: "This is a note"
  };

  return (
    <AppLayout>
      <ShowPasswordEntry
        data={data}
        onBack={() => navigate(listPasswordEntriesPath())}
      />
    </AppLayout>
  );
};

export default NewPage;
