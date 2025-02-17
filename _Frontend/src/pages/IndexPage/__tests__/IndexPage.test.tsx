import { render, screen } from "@testing-library/react";
import IndexPage from "@pages/IndexPage";
import { TestWrapper } from "@test/testUtils";

// Mock AppLayout
jest.mock("@components/AppLayout", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>
}));

// Mock the PasswordEntryList component
jest.mock("@components/PasswordEntryList", () => ({
  __esModule: true,
  default: () => (
    <div data-testid="mocked-password-entry-list">Mocked Password List</div>
  )
}));

describe("IndexPage", () => {
  it("renders index page content", () => {
    render(<IndexPage />, { wrapper: TestWrapper });
    expect(
      screen.getByTestId("mocked-password-entry-list")
    ).toBeInTheDocument();
  });
});
