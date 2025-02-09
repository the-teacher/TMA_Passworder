import { type ReactNode } from "react";
import "./layout.scss";

type HolyGrailLayoutProps = {
  children: ReactNode;
};

const HolyGrailLayout = ({ children }: HolyGrailLayoutProps) => (
  <div className="holy-grail" style={{ display: "contents" }}>
    {children}
  </div>
);

export default HolyGrailLayout;
