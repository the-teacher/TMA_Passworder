import { render, screen, fireEvent } from "@testing-library/react";
import UserRegistrationData from "../UserRegistrationData";
import { TestWrapper } from "@test/testUtils";
import i18n from "@i18n/index";

jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  Link: ({ to, children }: { to: string; children: React.ReactNode }) => (
    <a href={to} data-testid="mock-link">
      {children}
    </a>
  )
}));

describe("UserRegistrationData", () => {
  const mockUserData = {
    id: 12345,
    username: "johndoe",
    first_name: "John",
    last_name: "Doe"
  };

  const mockOnConfirm = jest.fn();
  const mockOnDecline = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    i18n.changeLanguage("en");
  });

  it("renders user data correctly", () => {
    render(
      <UserRegistrationData
        userData={mockUserData}
        onConfirm={mockOnConfirm}
        onDecline={mockOnDecline}
      />,
      { wrapper: TestWrapper }
    );

    expect(screen.getByText("Account Creation")).toBeInTheDocument();
    expect(
      screen.getByText(
        "We will create a new account for you using the following data."
      )
    ).toBeInTheDocument();
    expect(screen.getByText("Unique User ID")).toBeInTheDocument();
    expect(screen.getByText("12345")).toBeInTheDocument();
    expect(screen.getByText("Username")).toBeInTheDocument();
    expect(screen.getByText("johndoe")).toBeInTheDocument();
    expect(screen.getByText("First Name")).toBeInTheDocument();
    expect(screen.getByText("John")).toBeInTheDocument();
    expect(screen.getByText("Last Name")).toBeInTheDocument();
    expect(screen.getByText("Doe")).toBeInTheDocument();
    expect(screen.getByText("Yes, create account")).toBeInTheDocument();
    expect(screen.getByText("No, I don't want to")).toBeInTheDocument();
  });

  it("renders only available user data", () => {
    const partialUserData = {
      id: 12345,
      first_name: "John"
    };

    render(
      <UserRegistrationData
        userData={partialUserData}
        onConfirm={mockOnConfirm}
        onDecline={mockOnDecline}
      />,
      { wrapper: TestWrapper }
    );

    expect(screen.getByText("12345")).toBeInTheDocument();
    expect(screen.getByText("John")).toBeInTheDocument();
    expect(screen.queryByText("Username")).not.toBeInTheDocument();
    expect(screen.queryByText("Last Name")).not.toBeInTheDocument();
  });

  it("calls onConfirm when confirm button is clicked", () => {
    render(
      <UserRegistrationData
        userData={mockUserData}
        onConfirm={mockOnConfirm}
        onDecline={mockOnDecline}
      />,
      { wrapper: TestWrapper }
    );

    const confirmButton = screen.getByText("Yes, create account");
    fireEvent.click(confirmButton);

    expect(mockOnConfirm).toHaveBeenCalledTimes(1);
    expect(mockOnDecline).not.toHaveBeenCalled();
  });

  it("calls onDecline when decline button is clicked", () => {
    render(
      <UserRegistrationData
        userData={mockUserData}
        onConfirm={mockOnConfirm}
        onDecline={mockOnDecline}
      />,
      { wrapper: TestWrapper }
    );

    const declineButton = screen.getByText("No, I don't want to");
    fireEvent.click(declineButton);

    expect(mockOnDecline).toHaveBeenCalledTimes(1);
    expect(mockOnConfirm).not.toHaveBeenCalled();
  });

  it("renders disclaimer text with links", () => {
    render(
      <UserRegistrationData
        userData={mockUserData}
        onConfirm={mockOnConfirm}
        onDecline={mockOnDecline}
      />,
      { wrapper: TestWrapper }
    );

    const links = screen.getAllByTestId("mock-link");
    expect(links.length).toBe(2);
    expect(links[0]).toHaveAttribute("href", "/rules");
    expect(links[1]).toHaveAttribute("href", "/privacy-policy");
  });
});
