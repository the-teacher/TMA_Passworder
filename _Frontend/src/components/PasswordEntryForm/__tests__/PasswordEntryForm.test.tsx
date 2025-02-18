import { render, screen, fireEvent } from "@testing-library/react";
import PasswordEntryForm from "@components/PasswordEntryForm";

describe("PasswordEntryForm", () => {
  const mockOnSubmit = jest.fn();
  const mockClipboard = {
    writeText: jest.fn()
  };
  const mockConsoleError = jest.spyOn(console, "error").mockImplementation();

  beforeAll(() => {
    Object.defineProperty(navigator, "clipboard", {
      value: mockClipboard,
      configurable: true
    });
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const setup = () => {
    render(<PasswordEntryForm onSubmit={mockOnSubmit} />);
  };

  it("renders form fields", () => {
    setup();
    expect(screen.getByLabelText(/service name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/notes/i)).toBeInTheDocument();
  });

  it("submits form data", () => {
    setup();
    const serviceNameInput = screen.getByLabelText(/service name/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const notesInput = screen.getByLabelText(/notes/i);

    fireEvent.change(serviceNameInput, { target: { value: "Test Service" } });
    fireEvent.change(passwordInput, { target: { value: "TestPassword123" } });
    fireEvent.change(notesInput, { target: { value: "Some notes" } });

    fireEvent.click(screen.getByRole("button", { name: /save/i }));

    expect(mockOnSubmit).toHaveBeenCalledWith({
      serviceName: "Test Service",
      password: "TestPassword123",
      notes: "Some notes"
    });
  });

  it("resets form fields", () => {
    setup();
    const serviceNameInput = screen.getByLabelText(/service name/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const notesInput = screen.getByLabelText(/notes/i);

    fireEvent.change(serviceNameInput, { target: { value: "Test Service" } });
    fireEvent.change(passwordInput, { target: { value: "TestPassword123" } });
    fireEvent.change(notesInput, { target: { value: "Some notes" } });

    fireEvent.click(screen.getByRole("button", { name: /reset/i }));

    expect(serviceNameInput).toHaveValue("");
    expect(passwordInput).toHaveValue("");
    expect(notesInput).toHaveValue("");
  });

  it("toggles password visibility", () => {
    setup();
    const passwordInput = screen.getByLabelText(/password/i);
    const toggleButton = screen.getByTitle(/show password/i);

    expect(passwordInput).toHaveAttribute("type", "password");

    fireEvent.click(toggleButton);

    expect(passwordInput).toHaveAttribute("type", "text");
  });

  it("generates password with correct length and characters", () => {
    setup();
    const passwordInput = screen.getByLabelText(/password/i);
    const generateButton = screen.getByTitle(/generate password/i);

    fireEvent.click(generateButton);

    const generatedPassword = passwordInput.getAttribute("value");
    expect(generatedPassword).toHaveLength(10);
    expect(generatedPassword).toMatch(/^[a-zA-Z0-9!@#$%^&*]+$/);
  });

  it("copies password to clipboard", async () => {
    setup();
    const passwordInput = screen.getByLabelText(/password/i);
    const generateButton = screen.getByTitle(/generate password/i);
    const copyButton = screen.getByTitle(/copy password/i);

    fireEvent.click(generateButton);
    const generatedPassword = passwordInput.getAttribute("value");

    fireEvent.click(copyButton);

    expect(mockClipboard.writeText).toHaveBeenCalledWith(generatedPassword);
  });

  it("handles clipboard error gracefully", async () => {
    setup();
    const generateButton = screen.getByTitle(/generate password/i);
    const copyButton = screen.getByTitle(/copy password/i);

    // Setup clipboard to throw error
    mockClipboard.writeText.mockRejectedValueOnce(new Error("Clipboard error"));

    fireEvent.click(generateButton);
    await fireEvent.click(copyButton);

    await expect(mockConsoleError).toHaveBeenCalledWith(
      "Failed to copy password:",
      expect.any(Error)
    );
  });
});
