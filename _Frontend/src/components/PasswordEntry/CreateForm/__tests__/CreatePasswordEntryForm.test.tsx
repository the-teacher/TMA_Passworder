import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TestWrapper } from "@test/testUtils";
import CreatePasswordEntryForm from "../CreatePasswordEntryForm";

jest.mock("../CreatePasswordEntryFormView", () => {
  return {
    __esModule: true,
    default: jest.fn(
      ({
        register,
        isSubmitting,
        showPassword,
        formError,
        onTogglePassword,
        onGeneratePassword,
        onCopyPassword,
        onSubmit,
        onReset
      }) => {
        const handleReset = (e: React.MouseEvent) => {
          e.preventDefault();
          const form = e.currentTarget.closest("form");
          if (form) {
            form.reset();
          }
          onReset();
        };

        return (
          <div data-testid="mocked-form">
            <form>
              <input
                type="text"
                {...register("serviceName")}
                data-testid="service-name"
              />
              <input
                type="text"
                {...register("username")}
                data-testid="username"
              />
              <input
                type={showPassword ? "text" : "password"}
                {...register("password")}
                data-testid="password"
              />
              <input
                type="url"
                {...register("serviceUrl")}
                data-testid="service-url"
              />
              <textarea {...register("notes")} data-testid="notes" />

              <button onClick={onTogglePassword} data-testid="toggle-password">
                Toggle
              </button>
              <button
                onClick={onGeneratePassword}
                data-testid="generate-password"
              >
                Generate
              </button>
              <button onClick={onCopyPassword} data-testid="copy-password">
                Copy
              </button>
              <button onClick={handleReset} data-testid="reset">
                Reset
              </button>
              <button onClick={onSubmit} data-testid="submit">
                Submit
              </button>

              {formError && <div data-testid="form-error">{formError}</div>}
              {isSubmitting && (
                <div data-testid="submitting">Submitting...</div>
              )}
            </form>
          </div>
        );
      }
    )
  };
});

Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn()
  }
});

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ success: true })
  })
) as jest.Mock;

describe("CreatePasswordEntryForm", () => {
  const renderComponent = () => {
    return render(<CreatePasswordEntryForm />, {
      wrapper: TestWrapper
    });
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should toggle password visibility", () => {
    renderComponent();
    const toggleButton = screen.getByTestId("toggle-password");

    fireEvent.click(toggleButton);
    expect(screen.getByTestId("password")).toHaveAttribute("type", "text");

    fireEvent.click(toggleButton);
    expect(screen.getByTestId("password")).toHaveAttribute("type", "password");
  });

  it("should generate password", () => {
    renderComponent();
    const generateButton = screen.getByTestId("generate-password");
    const passwordInput = screen.getByTestId("password");

    fireEvent.click(generateButton);
    expect((passwordInput as HTMLInputElement).value).toMatch(
      /^[A-Za-z0-9!@#$%^&*]{10}$/
    );
  });

  it("should copy password to clipboard", async () => {
    renderComponent();
    const copyButton = screen.getByTestId("copy-password");
    const passwordInput = screen.getByTestId("password");

    // Set password value
    await userEvent.type(passwordInput, "test-password");

    fireEvent.click(copyButton);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith("test-password");
  });

  it("should handle form submission", async () => {
    renderComponent();

    // Fill form
    await userEvent.type(screen.getByTestId("service-name"), "GitHub");
    await userEvent.type(screen.getByTestId("username"), "testuser");
    await userEvent.type(screen.getByTestId("password"), "password123");
    await userEvent.type(
      screen.getByTestId("service-url"),
      "https://github.com"
    );
    await userEvent.type(screen.getByTestId("notes"), "Test notes");

    // Submit form
    await userEvent.click(screen.getByTestId("submit"));

    // Verify fetch was called
    expect(fetch).toHaveBeenCalledWith(
      "https://api.example.com/submit",
      expect.any(Object)
    );
  });

  it("should reset form", async () => {
    renderComponent();
    const serviceNameInput = screen.getByTestId("service-name");
    const usernameInput = screen.getByTestId("username");

    // Fill form
    await userEvent.type(serviceNameInput, "GitHub");
    await userEvent.type(usernameInput, "testuser");

    // Verify initial values
    expect(serviceNameInput).toHaveValue("GitHub");
    expect(usernameInput).toHaveValue("testuser");

    // Reset form
    const resetButton = screen.getByTestId("reset");
    await userEvent.click(resetButton);

    // Wait for reset and verify
    await waitFor(() => {
      expect(serviceNameInput).not.toHaveValue("GitHub");
      expect(usernameInput).not.toHaveValue("testuser");
    });
  });

  it("should handle clipboard error", async () => {
    // Mock clipboard error
    (navigator.clipboard.writeText as jest.Mock).mockRejectedValueOnce(
      new Error("Clipboard error")
    );

    renderComponent();
    const copyButton = screen.getByTestId("copy-password");
    const consoleSpy = jest.spyOn(console, "error").mockImplementation();

    fireEvent.click(copyButton);

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(
        "Failed to copy password:",
        expect.any(Error)
      );
    });

    consoleSpy.mockRestore();
  });
});
