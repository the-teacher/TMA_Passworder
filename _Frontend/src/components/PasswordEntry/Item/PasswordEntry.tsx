import { Link } from "react-router";
import "./styles.scss";
import { showPasswordEntryPath } from "@routes/helpers";

const PasswordEntry = ({ id, name }: { id: string; name: string }) => (
  <Link to={showPasswordEntryPath(id)} className="password-entry">
    <span className="password-entry--name">{name}</span>
  </Link>
);

export default PasswordEntry;
