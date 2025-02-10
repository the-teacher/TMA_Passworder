import { render, screen } from "@testing-library/react";
import IndexPage from "./IndexPage";

// Mock the PasswordEntryList component
jest.mock("../../components/PasswordEntryList", () => ({
  __esModule: true,
  default: () => (
    <div data-testid="mocked-password-entry-list">Mocked Password List</div>
  )
}));

describe("IndexPage", () => {
  it("renders index page content", () => {
    render(<IndexPage />);

    expect(
      screen.getByTestId("mocked-password-entry-list")
    ).toBeInTheDocument();
  });
});
