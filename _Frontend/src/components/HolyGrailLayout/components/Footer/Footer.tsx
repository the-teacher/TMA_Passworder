import { type ReactNode } from "react";

type FooterProps = {
  children: ReactNode;
};

const Footer = ({ children }: FooterProps) => (
  <footer className="holy-grail--footer">
    <div className="holy-grail--container">{children}</div>
  </footer>
);

export default Footer;
