import { type ReactNode } from "react";
import "./styles.scss";

const Header = ({ children }: { children?: ReactNode }) => (
  <header className="app-header">
    <div className="app-header__container">
      <h1 className="app-header__title">Password Manager</h1>
      {children}
    </div>
  </header>
);

export default Header;
