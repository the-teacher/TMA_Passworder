import { type ReactNode } from "react";

type MainContentProps = {
  children: ReactNode;
};

const MainContent = ({ children }: MainContentProps) => (
  <main className="holy-grail--content">{children}</main>
);

export default MainContent;
