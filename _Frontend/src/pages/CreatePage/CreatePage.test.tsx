import { render, screen } from "@testing-library/react";
import { I18nextProvider } from "react-i18next";
import i18n from "../../i18n";

import CreatePage from "./CreatePage";

describe("CreatePage", () => {
  it("renders create page content", () => {
    render(
      <I18nextProvider i18n={i18n}>
        <CreatePage />
      </I18nextProvider>
    );

    expect(screen.getByText("Create Password Entry")).toBeInTheDocument();
  });
});
