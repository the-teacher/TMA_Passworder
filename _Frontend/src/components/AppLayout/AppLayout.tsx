import { ReactNode, useEffect } from "react";
import Header from "@components/Header";
import FooterNavigation from "@components/FooterNavigation";
import { HolyGrailLayoutWithParams } from "@components/HolyGrailLayout";
import "./styles.scss";

// cspell:ignore Toastr
import toastr from "@lib/Toastr";
import { EventEmitter } from "@lib/EventEmitter";

const showToastr = (message: string) => {
  toastr.success(message);
};

const showWarning = (message: string) => {
  toastr.warning(message);
};

const AppLayout = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    toastr.initialize(".app-header");
    // @ts-ignore
    window.EventEmitter = EventEmitter;

    EventEmitter.on("NOTIFICATION", showToastr);
    EventEmitter.on("WARNING", showWarning);

    return () => {
      EventEmitter.off("NOTIFICATION", showToastr);
      EventEmitter.off("WARNING", showWarning);
    };
  }, []);

  return (
    <HolyGrailLayoutWithParams
      header={<Header />}
      content={children}
      footer={<FooterNavigation />}
    />
  );
};

export default AppLayout;
