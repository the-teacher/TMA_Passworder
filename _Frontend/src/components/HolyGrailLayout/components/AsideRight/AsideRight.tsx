import { type ReactNode } from "react";

type AsideRightProps = {
  children: ReactNode;
};

const AsideRight = ({ children }: AsideRightProps) => (
  <aside className="holy-grail--aside">{children}</aside>
);

export default AsideRight;
