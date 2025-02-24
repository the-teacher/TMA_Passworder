import { render, screen, fireEvent } from "@testing-library/react";
import { TestWrapper } from "@test/testUtils";
import CreatePasswordEntryFormView from "../CreatePasswordEntryFormView";

// Mock sub-components
jest.mock("../components/EyeIcon", () => ({
  __esModule: true,
  default: jest.fn(() => <div data-testid="eye-icon">Eye Icon</div>)
}));

jest.mock("../components/CopyButton", () => ({
  __esModule: true,
  default: jest.fn(() => <div data-testid="copy-button">Copy Button</div>)
}));

jest.mock("../components/GenerateButton", () => ({
  __esModule: true,
  default: jest.fn(() => (
    <div data-testid="generate-button">Generate Button</div>
  ))
}));

jest.mock("../components/FormError", () => ({
  __esModule: true,
  default: jest.fn(({ children }) => (
    <div data-testid="form-error">{children}</div>
  ))
}));

// Mock getFieldStatus utility
jest.mock("../utils/getFieldStatus", () => ({
  getFieldStatus: jest.fn(() => ({
    message: "Test message",
    className: "test-class"
  }))
}));

describe("CreatePasswordEntryFormView", () => {
  const defaultProps = {
    register: jest.fn((name) => ({
      name,
      onChange: jest.fn(),
      onBlur: jest.fn(),
      ref: jest.fn()
    })),
    errors: {},
    watch: jest.fn(),
    touchedFields: {},
    isSubmitting: false,
    showPassword: false,
    formError: "",
    onTogglePassword: jest.fn(),
    onGeneratePassword: jest.fn(),
    onCopyPassword: jest.fn(),
    onSubmit: jest.fn(),
    onReset: jest.fn()
  };

  const renderComponent = (props = {}) => {
    return render(
      <CreatePasswordEntryFormView {...defaultProps} {...props} />,
      {
        wrapper: TestWrapper
      }
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render form with all fields", () => {
    renderComponent();

    expect(screen.getByRole("heading")).toHaveTextContent(
      "Create Password Entry"
    );
    expect(screen.getByLabelText(/service name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/url/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/notes/i)).toBeInTheDocument();
  });

  it("should render all buttons", () => {
    renderComponent();

    expect(screen.getByTestId("eye-icon")).toBeInTheDocument();
    expect(screen.getByTestId("copy-button")).toBeInTheDocument();
    expect(screen.getByTestId("generate-button")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /save/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /reset/i })).toBeInTheDocument();
  });

  it("should show form error when provided", () => {
    const formError = "Test error message";
    renderComponent({ formError });

    expect(screen.getByTestId("form-error")).toHaveTextContent(formError);
  });

  it("should show saving state when submitting", () => {
    renderComponent({ isSubmitting: true });

    expect(screen.getByRole("button", { name: /saving/i })).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /save/i })
    ).not.toBeInTheDocument();
  });

  it("should render password field based on showPassword prop", () => {
    const { rerender } = renderComponent({ showPassword: false });
    expect(screen.getByLabelText(/password/i)).toHaveAttribute(
      "type",
      "password"
    );

    rerender(
      <CreatePasswordEntryFormView {...defaultProps} showPassword={true} />
    );
    expect(screen.getByLabelText(/password/i)).toHaveAttribute("type", "text");
  });

  it("should show field status messages", () => {
    renderComponent();

    const statusMessages = screen.getAllByText("Test message");
    expect(statusMessages).toHaveLength(4);
    statusMessages.forEach((message) => {
      expect(message.className).toMatch(/form-group--info.*test-class/);
    });
  });

  it("should handle form submission", () => {
    const onSubmit = jest.fn((e) => {
      e.preventDefault();
    });
    renderComponent({ onSubmit });

    fireEvent.click(screen.getByRole("button", { name: /save/i }));

    expect(onSubmit).toHaveBeenCalled();
  });

  it("should handle form reset", () => {
    const onReset = jest.fn();
    renderComponent({ onReset });

    screen.getByRole("button", { name: /reset/i }).click();

    expect(onReset).toHaveBeenCalled();
  });
});
