import WelcomeMessageView from "./WelcomeMessageView";

const WelcomeMessage = ({
  onConfirm,
  onDecline
}: {
  onConfirm: () => void;
  onDecline: () => void;
}) => {
  return <WelcomeMessageView onConfirm={onConfirm} onDecline={onDecline} />;
};

export default WelcomeMessage;
