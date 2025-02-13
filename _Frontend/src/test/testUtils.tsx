import { ReactNode } from "react";
import { BrowserRouter } from "react-router";

export const TestWrapper = ({ children }: { children: ReactNode }) => {
  return <BrowserRouter>{children}</BrowserRouter>;
};
