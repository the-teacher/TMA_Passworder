import { Link } from "react-router";
import "./styles.scss";

const PasswordEntry = ({ id, name }: { id: string; name: string }) => (
  <div className="password-entry">
    <span className="password-entry--name">{name}</span>
    <Link to={`/entry/${id}`} className="password-entry--view-btn">
      View
    </Link>
  </div>
);

export default PasswordEntry;
