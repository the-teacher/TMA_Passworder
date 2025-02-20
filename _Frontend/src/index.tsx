import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { I18nextProvider } from "react-i18next";
import i18n from "@i18n/index";

export const render = () => {
  const rootElement = document.getElementById("root");

  if (!rootElement) {
    console.error("Unable to find root element");
    return;
  }

  createRoot(rootElement).render(
    <StrictMode>
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
    </StrictMode>
  );
};

render();
