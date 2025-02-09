import { type ReactNode } from "react";
import "./layout.scss";

type ChildrenProps = {
  children: ReactNode;
};

const Header = ({ children }: ChildrenProps) => (
  <header className="holy-grail--header">
    <div className="holy-grail--container">{children}</div>
  </header>
);

const MainColumns = ({ children }: ChildrenProps) => (
  <div className="holy-grail--main">
    <div className="holy-grail--container holy-grail--main-columns">
      {children}
    </div>
  </div>
);

const AsideLeft = ({ children }: ChildrenProps) => (
  <aside className="holy-grail--aside">{children}</aside>
);

const MainContent = ({ children }: ChildrenProps) => (
  <main className="holy-grail--content">{children}</main>
);

const AsideRight = ({ children }: ChildrenProps) => (
  <aside className="holy-grail--aside">{children}</aside>
);

const Footer = ({ children }: ChildrenProps) => (
  <footer className="holy-grail--footer">
    <div className="holy-grail--container">{children}</div>
  </footer>
);

const HolyGrailLayout = ({ children }: ChildrenProps) => (
  <div className="holy-grail" style={{ display: "contents" }}>
    {children}
  </div>
);

export {
  HolyGrailLayout,
  Header,
  MainColumns,
  AsideLeft,
  MainContent,
  AsideRight,
  Footer,
};
