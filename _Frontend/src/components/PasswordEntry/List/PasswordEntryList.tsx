import PasswordEntry from "@components/PasswordEntry/Item";
import popularServices from "@mocks/popularServices"; // Import the mock data
import "./styles.scss";

type PasswordEntryType = {
  id: string;
  name: string;
};

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
