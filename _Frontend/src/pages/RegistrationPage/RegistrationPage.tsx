import { useState } from "react";
import WelcomeMessage from "@components/WelcomeMessage";
import SorryAboutDecline from "@components/SorryAboutDecline";
import UserRegistrationData from "@components/UserRegistrationData";
import "@ui-kit/margins.scss";

type RegistrationState =
  | "welcomeMessage"
  | "sorryAboutDecline"
  | "userRegistrationData"
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
    <div className="m20">
      <WelcomeMessage
        onConfirm={() => setRegState("userRegistrationData")}
        onDecline={() => setRegState("sorryAboutDecline")}
      />
    </div>
  );
};

export default RegistrationPage;
