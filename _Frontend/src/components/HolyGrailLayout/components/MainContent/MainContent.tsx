import { type ReactNode } from "react";
import "@ui-kit/spaces.scss";

const MainContent = ({ children }: { children: ReactNode }) => (
  <main className="holy-grail--content pt0">{children}</main>
);

export default MainContent;
