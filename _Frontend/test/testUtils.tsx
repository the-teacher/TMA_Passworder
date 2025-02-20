import { ReactNode } from "react";
import { BrowserRouter } from "react-router";
import { I18nextProvider } from "react-i18next";
import i18n from "./setupFilesAfterEnv";

export const TestWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <I18nextProvider i18n={i18n}>
      <BrowserRouter>{children}</BrowserRouter>
    </I18nextProvider>
  );
};
