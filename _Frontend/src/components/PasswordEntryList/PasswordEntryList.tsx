import PasswordEntry from "@components/PasswordEntry";
import "./styles.scss";

type PasswordEntryType = {
  id: string;
  name: string;
};

// Mock data - 30 popular services
const popularServices = [
  "Google",
  "Facebook",
  "Twitter",
  "Instagram",
  "LinkedIn",
  "Amazon",
  "Netflix",
  "Spotify",
  "Dropbox",
  "Slack",
  "GitHub",
  "Reddit",
  "Pinterest",
  "Snapchat",
  "WhatsApp",
  "YouTube",
  "Zoom",
  "Microsoft",
  "Apple",
  "Adobe",
  "PayPal",
  "eBay",
  "Airbnb",
  "Uber",
  "Lyft",
  "Twitch",
  "Discord",
  "TikTok",
  "Shopify",
  "Salesforce"
];

const mockEntries: PasswordEntryType[] = popularServices.map(
  (service, index) => ({
    id: `entry-${index + 1}`,
    name: service
  })
);

const PasswordEntryList = () => (
  <div className="password-entry-list">
    {mockEntries.map((entry) => (
      <PasswordEntry key={entry.id} {...entry} />
    ))}
  </div>
);

export default PasswordEntryList;
