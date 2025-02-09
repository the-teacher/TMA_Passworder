import { type ReactNode } from "react";

type AsideLeftProps = {
  children: ReactNode;
};

const AsideLeft = ({ children }: AsideLeftProps) => (
  <aside className="holy-grail--aside">{children}</aside>
);

export default AsideLeft;
