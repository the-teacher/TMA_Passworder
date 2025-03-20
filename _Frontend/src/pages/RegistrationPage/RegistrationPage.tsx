import { useState } from "react";
import WelcomeMessage from "@components/WelcomeMessage";
import SorryAboutDecline from "@components/SorryAboutDecline";
import UserRegistrationData from "@components/UserRegistration/UserRegistrationData";
import CreateAccountForm from "@components/UserRegistration/CreateAccountForm";
import "@ui-kit/margins.scss";

type RegistrationState =
  | "welcomeMessage"
  | "sorryAboutDecline"
  | "userRegistrationData"
  | "createAccountForm"
  | "registrationConfirmed";

const mockUserData = {
  id: 1232344123345,
  username: "the-teacher",
  first_name: "Ilya",
  last_name: "Nikolaevich"
};

const RegistrationPage = () => {
  const [regState, setRegState] = useState<RegistrationState>("welcomeMessage");

  if (regState === "registrationConfirmed") {
    return <div>Registration confirmed! Redirecting...</div>;
  }

  if (regState === "createAccountForm") {
    return (
      <CreateAccountForm
        onSubmit={() => setRegState("registrationConfirmed")}
        onCancel={() => setRegState("welcomeMessage")}
      />
    );
  }

  if (regState === "userRegistrationData") {
    return (
      <UserRegistrationData
        userData={mockUserData}
        onConfirm={() => setRegState("registrationConfirmed")}
        onDecline={() => setRegState("welcomeMessage")}
      />
    );
  }

  if (regState === "sorryAboutDecline") {
    return (
      <SorryAboutDecline buttonHandler={() => setRegState("welcomeMessage")} />
    );
  }

  return (
    <WelcomeMessage
      onConfirm={() => setRegState("createAccountForm")}
      onDecline={() => setRegState("sorryAboutDecline")}
    />
  );
};

export default RegistrationPage;
