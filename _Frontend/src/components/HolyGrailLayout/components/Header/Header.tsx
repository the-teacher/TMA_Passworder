import { type ReactNode } from "react";

type HeaderProps = {
  children: ReactNode;
};

const Header = ({ children }: HeaderProps) => (
  <header className="holy-grail--header">
    <div className="holy-grail--container">{children}</div>
  </header>
);

export default Header;
