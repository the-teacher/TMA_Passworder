import { render, screen } from "@testing-library/react";
import RegistrationPage from "@pages/RegistrationPage";
import { TestWrapper } from "@test/testUtils";

// Mock WelcomeMessage component
jest.mock("@components/WelcomeMessage", () => ({
  __esModule: true,
  default: () => (
    <div data-testid="welcome-message">Welcome Message Component</div>
  )
}));

describe("RegistrationPage", () => {
  it("renders the WelcomeMessage component", () => {
    render(<RegistrationPage />, { wrapper: TestWrapper });

    expect(screen.getByTestId("welcome-message")).toBeInTheDocument();
    expect(screen.getByText("Welcome Message Component")).toBeInTheDocument();
  });
});
