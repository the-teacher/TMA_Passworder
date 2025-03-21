import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router";
import PasswordEntryList from "@components/PasswordEntry/List";
import popularServices from "@mocks/popularServices";

describe("PasswordEntryList", () => {
  const renderWithRouter = () => {
    render(
      <BrowserRouter>
        <PasswordEntryList />
      </BrowserRouter>
    );
  };

  it("renders all 30 popular service entries", () => {
    renderWithRouter();

    popularServices.forEach((service) => {
      expect(screen.getByText(service)).toBeInTheDocument();
    });
  });

  it("renders entries with correct links", () => {
    renderWithRouter();

    popularServices.forEach((service, index) => {
      const entry = screen.getByText(service);
      expect(entry.closest("a")).toHaveAttribute(
        "href",
        `/password_entries/${index + 1}`
      );
    });
  });
});
