import WelcomeMessage from "@components/WelcomeMessage";
import { useState } from "react";
import "@ui-kit/margins.scss";

const RegistrationPage = () => {
  const [userAccepted, setUserAccepted] = useState(false);
  const [userDeclined, setUserDeclined] = useState(false);

  if (userAccepted) {
    return <div>We are going to register you</div>;
  }

  if (userDeclined) {
    return <div>See you next time!</div>;
  }

  return (
    <div className="m20">
      <WelcomeMessage
        setUserAccepted={setUserAccepted}
        setUserDeclined={setUserDeclined}
      />
    </div>
  );
};

export default RegistrationPage;
