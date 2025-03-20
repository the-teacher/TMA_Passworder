import { render, screen, fireEvent } from "@testing-library/react";
import CreateAccountForm from "../CreateAccountForm";
import { TestWrapper } from "@test/testUtils";
import i18n from "@i18n/index";

// Mock the EmailInput component
jest.mock("../inputs/EmailInput", () => ({
  __esModule: true,
  default: () => (
    <div className="form-group" data-testid="email-input-mock">
      <label htmlFor="email" className="form--label">
        Email Address
      </label>
      <input
        id="email"
        type="email"
        className="form-input"
        placeholder="your.email@example.com"
      />
    </div>
  )
}));

jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  Link: ({ to, children }: { to: string; children: React.ReactNode }) => (
    <a href={to} data-testid="mock-link">
      {children}
    </a>
  )
}));

describe("CreateAccountForm", () => {
  const mockOnSubmit = jest.fn();
  const mockOnCancel = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    i18n.changeLanguage("en");
  });

  it("renders the form correctly", () => {
    render(
      <CreateAccountForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />,
      { wrapper: TestWrapper }
    );

    expect(
      screen.getByRole("heading", { name: "Create Account" })
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        "Please enter your email address to create a new account."
      )
    ).toBeInTheDocument();
    expect(screen.getByTestId("email-input-mock")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Create Account" })
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Cancel" })).toBeInTheDocument();
  });

  it("calls onCancel when cancel button is clicked", () => {
    render(
      <CreateAccountForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />,
      { wrapper: TestWrapper }
    );

    const cancelButton = screen.getByRole("button", { name: "Cancel" });
    fireEvent.click(cancelButton);

    expect(mockOnCancel).toHaveBeenCalledTimes(1);
  });

  it("shows loading state when isSubmitting is true", () => {
    render(
      <CreateAccountForm
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
        isSubmitting={true}
      />,
      { wrapper: TestWrapper }
    );

    expect(
      screen.getByRole("button", { name: "Creating..." })
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Creating..." })).toBeDisabled();
  });
});
