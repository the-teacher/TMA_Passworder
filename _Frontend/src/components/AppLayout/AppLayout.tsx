import { ReactNode } from "react";
import Header from "../Header";
import FooterNavigation from "../FooterNavigation/FooterNavigation";
import { HolyGrailLayoutWithParams } from "../HolyGrailLayout";

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
