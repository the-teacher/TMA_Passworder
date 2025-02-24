import { type ReactNode } from "react";
import Header from "@components/Header";
import FooterNavigation from "@components/FooterNavigation";
import { HolyGrailLayoutWithParams } from "@components/HolyGrailLayout";
import { useNotifications } from "./hooks/useNotifications";
import "./styles.scss";
import "@ui-kit/info-blocks.scss";

const AppLayout = ({ children }: { children: ReactNode }) => {
  useNotifications();

  return (
    <HolyGrailLayoutWithParams
      header={<Header />}
      content={children}
      footer={<FooterNavigation />}
    />
  );
};

export default AppLayout;
