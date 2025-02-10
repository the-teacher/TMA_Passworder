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

  it("renders view buttons with correct links", () => {
    renderWithRouter();

    const viewButtons = screen.getAllByText("View");
    expect(viewButtons).toHaveLength(30);

    viewButtons.forEach((button, index) => {
      expect(button.closest("a")).toHaveAttribute(
        "href",
        `/entry/entry-${index + 1}`
      );
    });
  });
});
