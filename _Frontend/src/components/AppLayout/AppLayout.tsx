import { ReactNode } from "react";
import Header from "@components/Header";
import FooterNavigation from "@components/FooterNavigation";
import { HolyGrailLayoutWithParams } from "@components/HolyGrailLayout";
import "./styles.scss";

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <HolyGrailLayoutWithParams
      header={<Header />}
      content={children}
      footer={<FooterNavigation />}
    />
  );
};

export default AppLayout;
