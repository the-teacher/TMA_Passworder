import { Link } from "react-router";
import "./styles.scss";

const PasswordEntry = ({ id, name }: { id: string; name: string }) => (
  <Link to={`/password-entry/${id}`} className="password-entry">
    <span className="password-entry--name">{name}</span>
  </Link>
);

export default PasswordEntry;
