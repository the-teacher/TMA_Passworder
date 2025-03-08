import WelcomeMessageView from "./WelcomeMessageView";

const WelcomeMessage = ({
  setUserAccepted,
  setUserDeclined
}: {
  setUserAccepted: (accepted: boolean) => void;
  setUserDeclined: (declined: boolean) => void;
}) => {
  return (
    <WelcomeMessageView
      onAccept={() => setUserAccepted(true)}
      onDecline={() => setUserDeclined(true)}
    />
  );
};

export default WelcomeMessage;
