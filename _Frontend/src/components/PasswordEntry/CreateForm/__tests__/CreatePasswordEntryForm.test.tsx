import { render, screen, fireEvent } from "@testing-library/react";
import CreatePasswordEntryForm from "@components/PasswordEntry/CreateForm";
import { TestWrapper } from "@test/testUtils";

describe("CreatePasswordEntryForm", () => {
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
    render(<CreatePasswordEntryForm />, {
      wrapper: TestWrapper
    });
  };

  it("renders all form fields", () => {
    setup();
    expect(screen.getByLabelText(/service name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^url$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/notes/i)).toBeInTheDocument();
  });

  it("submits form data with all fields", () => {
    setup();
    const serviceNameInput = screen.getByLabelText(/service name/i);
    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const urlInput = screen.getByLabelText(/^url$/i);
    const notesInput = screen.getByLabelText(/notes/i);

    fireEvent.change(serviceNameInput, { target: { value: "Test Service" } });
    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "TestPassword123" } });
    fireEvent.change(urlInput, {
      target: { value: "https://test.com" }
    });
    fireEvent.change(notesInput, { target: { value: "Some notes" } });

    fireEvent.click(screen.getByRole("button", { name: /save/i }));

    expect(mockOnSubmit).toHaveBeenCalledWith({
      serviceName: "Test Service",
      username: "testuser",
      password: "TestPassword123",
      serviceUrl: "https://test.com",
      notes: "Some notes"
    });
  });

  it("resets all form fields", () => {
    setup();
    const serviceNameInput = screen.getByLabelText(/service name/i);
    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const urlInput = screen.getByLabelText(/^url$/i);
    const notesInput = screen.getByLabelText(/notes/i);

    // Fill in all fields
    fireEvent.change(serviceNameInput, { target: { value: "Test Service" } });
    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "TestPassword123" } });
    fireEvent.change(urlInput, {
      target: { value: "https://test.com" }
    });
    fireEvent.change(notesInput, { target: { value: "Some notes" } });

    // Reset the form
    fireEvent.click(screen.getByRole("button", { name: /reset/i }));

    // Verify all fields are empty
    expect(serviceNameInput).toHaveValue("");
    expect(usernameInput).toHaveValue("");
    expect(passwordInput).toHaveValue("");
    expect(urlInput).toHaveValue("");
    expect(notesInput).toHaveValue("");
  });

  it("validates required fields", async () => {
    setup();
    const form = screen.getByRole("create-password-form");

    // Trigger validation
    await fireEvent.submit(form);

    // Now check invalid states
    expect(screen.getByLabelText("Service Name")).toBeInvalid();
    expect(screen.getByLabelText("Username")).toBeInvalid();
    expect(screen.getByLabelText("Password")).toBeInvalid();

    // Service URL and notes are optional
    expect(screen.getByLabelText(/^url$/i)).not.toBeInvalid();
    expect(screen.getByLabelText(/notes/i)).not.toBeInvalid();
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
    const passwordInput = screen.getByLabelText(
      /password/i
    ) as HTMLInputElement;
    const generateButton = screen.getByTitle(/generate password/i);

    fireEvent.click(generateButton);

    const passwordValue = passwordInput.value;
    expect(passwordValue).toHaveLength(10);
    expect(passwordValue).toMatch(/^[a-zA-Z0-9!@#$%^&*]+$/);
  });

  it("copies password to clipboard", async () => {
    setup();
    const passwordInput = screen.getByLabelText(
      /password/i
    ) as HTMLInputElement;
    const generateButton = screen.getByTitle(/generate password/i);
    const copyButton = screen.getByTitle(/copy password/i);

    fireEvent.click(generateButton);
    const password = passwordInput.value;

    fireEvent.click(copyButton);

    expect(mockClipboard.writeText).toHaveBeenCalledWith(password);
  });

  it("handles clipboard error gracefully", async () => {
    setup();
    const generateButton = screen.getByTitle(/generate password/i);
    const copyButton = screen.getByTitle(/copy password/i);

    mockClipboard.writeText.mockRejectedValueOnce(new Error("Clipboard error"));

    fireEvent.click(generateButton);
    await fireEvent.click(copyButton);

    expect(mockConsoleError).toHaveBeenCalledWith(
      "Failed to copy password:",
      expect.any(Error)
    );
  });
});
