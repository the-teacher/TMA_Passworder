import ShowPasswordEntry from "@components/PasswordEntry/ShowEntry";
import AppLayout from "@components/AppLayout";

const NewPage = () => {
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
      <ShowPasswordEntry data={data} />
    </AppLayout>
  );
};

export default NewPage;
