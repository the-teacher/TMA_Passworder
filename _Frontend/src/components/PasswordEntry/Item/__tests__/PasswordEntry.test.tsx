import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router";
import PasswordEntry from "@components/PasswordEntry/Item";
import { showPasswordEntryPath } from "@routes/helpers";

describe("PasswordEntry", () => {
  const mockProps = {
    id: "test-1",
    name: "Test Entry"
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

  it("renders entry link with correct href", () => {
    renderWithRouter();
    const entryLink = screen.getByText(mockProps.name).closest("a");
    expect(entryLink).toHaveAttribute(
      "href",
      showPasswordEntryPath(mockProps.id)
    );
  });
});
