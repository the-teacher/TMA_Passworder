import { type ReactNode } from "react";
import "./layout.scss";
import {
  Header,
  MainColumns,
  AsideLeft,
  MainContent,
  AsideRight,
  Footer,
} from "./";

type HolyGrailLayoutWithParamsProps = {
  header?: ReactNode;
  leftSidebar?: ReactNode;
  content: ReactNode;
  rightSidebar?: ReactNode;
  footer?: ReactNode;
};

const HolyGrailLayoutWithParams = ({
  header,
  leftSidebar,
  content,
  rightSidebar,
  footer,
}: HolyGrailLayoutWithParamsProps) => (
  <div className="holy-grail" style={{ display: "contents" }}>
    {header && <Header>{header}</Header>}

    <MainColumns>
      {leftSidebar && <AsideLeft>{leftSidebar}</AsideLeft>}
      <MainContent>{content}</MainContent>
      {rightSidebar && <AsideRight>{rightSidebar}</AsideRight>}
    </MainColumns>

    {footer && <Footer>{footer}</Footer>}
  </div>
);

export default HolyGrailLayoutWithParams;
