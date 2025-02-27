import { render, screen } from "@testing-library/react";
import EditPage from "../EditPage";
import { TestWrapper } from "@test/testUtils";

// Mock components
jest.mock("@components/AppLayout", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="app-layout">{children}</div>
  )
}));

jest.mock("@components/PasswordEntry/EditForm", () => ({
  __esModule: true,
  default: () => <div data-testid="edit-password-form" />
}));

describe("EditPage", () => {
  it("should render page with layout and form", () => {
    render(<EditPage />, { wrapper: TestWrapper });

    expect(screen.getByTestId("app-layout")).toBeInTheDocument();
    expect(screen.getByTestId("edit-password-form")).toBeInTheDocument();
  });
});
