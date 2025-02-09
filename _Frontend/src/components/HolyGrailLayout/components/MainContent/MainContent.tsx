import { type ReactNode } from "react";

const MainContent = ({ children }: { children: ReactNode }) => (
  <main className="holy-grail--content">{children}</main>
);

export default MainContent;
