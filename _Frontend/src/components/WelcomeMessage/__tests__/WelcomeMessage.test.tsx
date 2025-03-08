import { render, screen, fireEvent } from "@testing-library/react";
import WelcomeMessage from "../WelcomeMessage";

// Mock the translation hook
jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        title: "Hello!",
        subtitle:
          "This application is a convenient and reliable password manager.",
        "features.storePasswords":
          "Store passwords from all services in one place.",
        "features.addFavorites": "Add important ones to favorites.",
        "features.groupForAccess": "Group for quick access.",
        "features.useSearch": "Use search.",
        "security.title": "Your data is secure",
        "security.separateDatabase":
          "Each user gets a separate database, and all passwords are stored in encrypted form.",
        "security.downloadPasswords":
          "You can download all your passwords at any time.",
        "security.backupReminder":
          "Once a month, you receive a backup reminder.",
        disclaimer:
          "Before you start, please review the rules and data processing policy.",
        tryFree: "Try for free",
        "actions.accept": "Yes",
        "actions.decline": "No",
        "actions.acceptAlt": "Accept and start",
        "actions.declineAlt": "Decline"
      };
      return translations[key] || key;
    }
  })
}));

describe("WelcomeMessage", () => {
  const mockAccept = jest.fn();
  const mockDecline = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders welcome message with all content", () => {
    render(<WelcomeMessage onAccept={mockAccept} onDecline={mockDecline} />);

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
    render(<WelcomeMessage onAccept={mockAccept} onDecline={mockDecline} />);

    const acceptButton = screen.getByTitle("Yes");
    fireEvent.click(acceptButton);

    expect(mockAccept).toHaveBeenCalledTimes(1);
    expect(mockDecline).not.toHaveBeenCalled();
  });

  it("calls onDecline when decline button is clicked", () => {
    render(<WelcomeMessage onAccept={mockAccept} onDecline={mockDecline} />);

    const declineButton = screen.getByTitle("No");
    fireEvent.click(declineButton);

    expect(mockDecline).toHaveBeenCalledTimes(1);
    expect(mockAccept).not.toHaveBeenCalled();
  });
});
