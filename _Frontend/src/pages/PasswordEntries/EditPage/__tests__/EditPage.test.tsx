import { render, screen } from "@testing-library/react";
import NewPage from "../EditPage";
import { TestWrapper } from "@test/testUtils";

// Mock components
jest.mock("@components/AppLayout", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="app-layout">{children}</div>
  )
}));

jest.mock("@components/PasswordEntry/CreateForm", () => ({
  __esModule: true,
  default: () => <div data-testid="create-password-form" />
}));

describe("NewPage", () => {
  it("should render page with layout and form", () => {
    render(<NewPage />, { wrapper: TestWrapper });

    expect(screen.getByTestId("app-layout")).toBeInTheDocument();
    expect(screen.getByTestId("create-password-form")).toBeInTheDocument();
  });
});
