import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router";
import PasswordEntry from "./PasswordEntry";

describe("PasswordEntry", () => {
  const mockProps = {
    id: "test-1",
    name: "Test Entry",
  };

  const renderWithRouter = () => {
    render(
      <BrowserRouter>
        <PasswordEntry {...mockProps} />
      </BrowserRouter>
    );
  };

  it("renders entry name", () => {
    renderWithRouter();
    expect(screen.getByText(mockProps.name)).toBeInTheDocument();
  });

  it("renders view button with correct link", () => {
    renderWithRouter();
    const viewButton = screen.getByText("View");
    expect(viewButton.closest("a")).toHaveAttribute(
      "href",
      `/entry/${mockProps.id}`
    );
  });
});
