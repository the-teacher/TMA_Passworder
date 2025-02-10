import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router";
import PasswordEntryList from "./PasswordEntryList";

describe("PasswordEntryList", () => {
  const renderWithRouter = () => {
    render(
      <BrowserRouter>
        <PasswordEntryList />
      </BrowserRouter>
    );
  };

  it("renders all 30 password entries", () => {
    renderWithRouter();

    const entries = screen.getAllByText(/Password Entry \d+/);
    expect(entries).toHaveLength(30);
  });

  it("renders entries with correct links", () => {
    renderWithRouter();

    const entries = screen.getAllByText(/Password Entry \d+/);
    expect(entries).toHaveLength(30);

    entries.forEach((entry, index) => {
      expect(entry.closest("a")).toHaveAttribute(
        "href",
        `/password-entry/entry-${index + 1}`
      );
    });
  });
});
