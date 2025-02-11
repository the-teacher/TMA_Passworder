import PasswordEntry from "../PasswordEntry";
import "./styles.scss";

type PasswordEntryType = {
  id: string;
  name: string;
};

// Mock data - 30 entries
const mockEntries: PasswordEntryType[] = Array.from(
  { length: 30 },
  (_, index) => ({
    id: `entry-${index + 1}`,
    name: `Password Entry ${index + 1}`
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
