import { render, screen, fireEvent } from "@testing-library/react";
import WelcomeMessageView from "../WelcomeMessageView";
import { TestWrapper } from "@test/testUtils";
import i18n from "@i18n/index";

describe("WelcomeMessageView", () => {
  const mockOnConfirm = jest.fn();
  const mockOnDecline = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    i18n.changeLanguage("en");
  });

  it("renders the component with correct content", () => {
    render(
      <WelcomeMessageView
        onConfirm={mockOnConfirm}
        onDecline={mockOnDecline}
      />,
      { wrapper: TestWrapper }
    );

    expect(screen.getByText("Hello!")).toBeInTheDocument();
    expect(
      screen.getByText(
        "This application is a convenient and reliable password manager."
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText("Store passwords from all services in one place.")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Add important ones to favorites.")
    ).toBeInTheDocument();
  });

  it("calls onConfirm when accept button is clicked", () => {
    render(
      <WelcomeMessageView
        onConfirm={mockOnConfirm}
        onDecline={mockOnDecline}
      />,
      { wrapper: TestWrapper }
    );

    const acceptButton = screen.getByText("Yes, I want to try");
    fireEvent.click(acceptButton);

    expect(mockOnConfirm).toHaveBeenCalledTimes(1);
    expect(mockOnDecline).not.toHaveBeenCalled();
  });

  it("calls onDecline when decline button is clicked", () => {
    render(
      <WelcomeMessageView
        onConfirm={mockOnConfirm}
        onDecline={mockOnDecline}
      />,
      { wrapper: TestWrapper }
    );

    const declineButton = screen.getByText("No, thanks");
    fireEvent.click(declineButton);

    expect(mockOnDecline).toHaveBeenCalledTimes(1);
    expect(mockOnConfirm).not.toHaveBeenCalled();
  });
});
