import { render, screen, fireEvent } from "@testing-library/react";
import RegistrationPage from "../RegistrationPage";
import { TestWrapper } from "@test/testUtils";

// Mock components
jest.mock("@components/WelcomeMessage", () => ({
  __esModule: true,
  default: ({
    onConfirm,
    onDecline
  }: {
    onConfirm: () => void;
    onDecline: () => void;
  }) => (
    <div data-testid="welcome-message">
      Welcome Message Component
      <button data-testid="accept-button" onClick={onConfirm}>
        Accept
      </button>
      <button data-testid="decline-button" onClick={onDecline}>
        Decline
      </button>
    </div>
  )
}));

jest.mock("@components/SorryAboutDecline", () => ({
  __esModule: true,
  default: ({ buttonHandler }: { buttonHandler: () => void }) => (
    <div data-testid="sorry-about-decline">
      Sorry About Decline Component
      <button data-testid="try-again-button" onClick={buttonHandler}>
        Try Again
      </button>
    </div>
  )
}));

jest.mock("@components/UserRegistrationData", () => ({
  __esModule: true,
  default: ({
    onConfirm,
    onDecline
  }: {
    onConfirm: () => void;
    onDecline: () => void;
  }) => (
    <div data-testid="user-registration-data">
      User Registration Data Component
      <button data-testid="confirm-button" onClick={onConfirm}>
        Confirm
      </button>
      <button data-testid="back-button" onClick={onDecline}>
        Back
      </button>
    </div>
  )
}));

describe("RegistrationPage", () => {
  it("initially renders the WelcomeMessage component", () => {
    render(<RegistrationPage />, { wrapper: TestWrapper });

    expect(screen.getByTestId("welcome-message")).toBeInTheDocument();
    expect(screen.queryByTestId("sorry-about-decline")).not.toBeInTheDocument();
    expect(
      screen.queryByTestId("user-registration-data")
    ).not.toBeInTheDocument();
  });

  it("shows UserRegistrationData when WelcomeMessage is accepted", () => {
    render(<RegistrationPage />, { wrapper: TestWrapper });

    // Click accept in welcome message
    fireEvent.click(screen.getByTestId("accept-button"));

    // Should show registration data component
    expect(screen.getByTestId("user-registration-data")).toBeInTheDocument();
    expect(screen.queryByTestId("welcome-message")).not.toBeInTheDocument();
  });

  it("shows SorryAboutDecline when WelcomeMessage is declined", () => {
    render(<RegistrationPage />, { wrapper: TestWrapper });

    // Click decline in welcome message
    fireEvent.click(screen.getByTestId("decline-button"));

    // Should show sorry component
    expect(screen.getByTestId("sorry-about-decline")).toBeInTheDocument();
    expect(screen.queryByTestId("welcome-message")).not.toBeInTheDocument();
  });

  it("returns to WelcomeMessage when SorryAboutDecline try again is clicked", () => {
    render(<RegistrationPage />, { wrapper: TestWrapper });

    // Navigate to sorry screen
    fireEvent.click(screen.getByTestId("decline-button"));

    // Click try again
    fireEvent.click(screen.getByTestId("try-again-button"));

    // Should return to welcome message
    expect(screen.getByTestId("welcome-message")).toBeInTheDocument();
    expect(screen.queryByTestId("sorry-about-decline")).not.toBeInTheDocument();
  });

  it("shows confirmation when UserRegistrationData is confirmed", () => {
    render(<RegistrationPage />, { wrapper: TestWrapper });

    // Navigate to registration data
    fireEvent.click(screen.getByTestId("accept-button"));

    // Confirm registration
    fireEvent.click(screen.getByTestId("confirm-button"));

    // Should show confirmation
    expect(
      screen.getByText("Registration confirmed! Redirecting...")
    ).toBeInTheDocument();
    expect(
      screen.queryByTestId("user-registration-data")
    ).not.toBeInTheDocument();
  });

  it("returns to WelcomeMessage when UserRegistrationData is declined", () => {
    render(<RegistrationPage />, { wrapper: TestWrapper });

    // Navigate to registration data
    fireEvent.click(screen.getByTestId("accept-button"));

    // Decline registration
    fireEvent.click(screen.getByTestId("back-button"));

    // Should return to welcome message
    expect(screen.getByTestId("welcome-message")).toBeInTheDocument();
    expect(
      screen.queryByTestId("user-registration-data")
    ).not.toBeInTheDocument();
  });
});
