import { render, screen, fireEvent } from "@testing-library/react";
import WelcomeMessageView from "../WelcomeMessageView";
import { TestWrapper } from "@test/testUtils";
import i18n from "@i18n/index";

describe("WelcomeMessageView", () => {
  const mockAccept = jest.fn();
  const mockDecline = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    i18n.changeLanguage("en");
  });

  it("renders welcome message with all content", () => {
    render(
      <WelcomeMessageView onAccept={mockAccept} onDecline={mockDecline} />,
      { wrapper: TestWrapper }
    );

    // Check title and subtitle
    expect(screen.getByText("Hello!")).toBeInTheDocument();
    expect(
      screen.getByText(
        "This application is a convenient and reliable password manager."
      )
    ).toBeInTheDocument();

    // Check features
    expect(
      screen.getByText("Store passwords from all services in one place.")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Add important ones to favorites.")
    ).toBeInTheDocument();
    expect(screen.getByText("Group for quick access.")).toBeInTheDocument();
    expect(screen.getByText("Use search.")).toBeInTheDocument();

    // Check security section
    expect(screen.getByText("Your data is secure")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Each user gets a separate database, and all passwords are stored in encrypted form."
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText("You can download all your passwords at any time.")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Once a month, you receive a backup reminder.")
    ).toBeInTheDocument();

    // Check call to action
    expect(screen.getByText("Try for free")).toBeInTheDocument();
  });

  it("calls onAccept when accept button is clicked", () => {
    render(
      <WelcomeMessageView onAccept={mockAccept} onDecline={mockDecline} />,
      { wrapper: TestWrapper }
    );

    const acceptButton = screen.getByText("Yes, I want to try");
    fireEvent.click(acceptButton);

    expect(mockAccept).toHaveBeenCalledTimes(1);
    expect(mockDecline).not.toHaveBeenCalled();
  });

  it("calls onDecline when decline button is clicked", () => {
    render(
      <WelcomeMessageView onAccept={mockAccept} onDecline={mockDecline} />,
      { wrapper: TestWrapper }
    );

    const declineButton = screen.getByText("No, thanks");
    fireEvent.click(declineButton);

    expect(mockDecline).toHaveBeenCalledTimes(1);
    expect(mockAccept).not.toHaveBeenCalled();
  });
});
