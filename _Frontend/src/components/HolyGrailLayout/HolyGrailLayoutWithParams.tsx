import { type ReactNode } from "react";
import "./layout.scss";
import {
  Header,
  MainColumns,
  AsideLeft,
  MainContent,
  AsideRight,
  Footer
} from "./";
import HolyGrailLayout from "./HolyGrailLayout";

type HolyGrailLayoutWithParamsProps = {
  header?: ReactNode;
  leftSidebar?: ReactNode;
  content: ReactNode;
  rightSidebar?: ReactNode;
  footer?: ReactNode;
  layoutRoot?: string;
};

const HolyGrailLayoutWithParams = ({
  header,
  leftSidebar,
  content,
  rightSidebar,
  footer,
  layoutRoot
}: HolyGrailLayoutWithParamsProps) => (
  <HolyGrailLayout layoutRoot={layoutRoot}>
    {header && <Header>{header}</Header>}

    <MainColumns>
      {leftSidebar && <AsideLeft>{leftSidebar}</AsideLeft>}
      <MainContent>{content}</MainContent>
      {rightSidebar && <AsideRight>{rightSidebar}</AsideRight>}
    </MainColumns>

    {footer && <Footer>{footer}</Footer>}
  </HolyGrailLayout>
);

export default HolyGrailLayoutWithParams;
