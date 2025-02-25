import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TestWrapper } from "@test/testUtils";
import CreatePasswordEntryForm from "../CreatePasswordEntryForm";

// 1. Mock validation schema
// Simplifies validation by just returning the input data
jest.mock("../validationSchema", () => ({
  validationSchema: {
    parse: jest.fn((data) => data)
  }
}));

// 2. Form values storage and helper functions
// Storage for form field values
const mockFormValues: Record<string, string> = {};
// Sets a field value programmatically
const mockSetValue = jest.fn((name: string, value: string) => {
  mockFormValues[name] = value;
});
// Returns current field value or empty string
const mockWatch = jest.fn((name: string) => mockFormValues[name] || "");

// 3. Mock react-hook-form
// Provides a mock implementation of the useForm hook
jest.mock("react-hook-form", () => ({
  useForm: () => ({
    // Register form field with onChange handler
    register: jest.fn((name) => ({
      name,
      onChange: (e: { target: { value: string } }) => {
        mockFormValues[name] = e.target.value; // Updates value on change
      },
      onBlur: jest.fn(),
      value: mockFormValues[name]
    })),
    // Form submission handler that calls callback with current values
    handleSubmit: jest.fn((cb) => (e: React.FormEvent) => {
      e?.preventDefault();
      return cb(mockFormValues);
    }),
    setValue: mockSetValue, // Set value programmatically
    watch: mockWatch, // Watch field values
    // Reset all form values to empty strings
    reset: jest.fn(() => {
      Object.keys(mockFormValues).forEach((key) => {
        mockFormValues[key] = "";
      });
    }),
    setError: jest.fn(), // Set form errors
    clearErrors: jest.fn(), // Clear form errors
    formState: {
      errors: {},
      touchedFields: {}
    }
  })
}));

// 4. Mock form view component
// Provides a simplified version of the form for testing
jest.mock("../CreatePasswordEntryFormView", () => ({
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
      // Handle form submission with type conversion
      const handleSubmit = (e: React.MouseEvent) => {
        e.preventDefault();
        onSubmit(e as unknown as React.FormEvent);
      };

      // Return simplified form structure with test ids
      return (
        <div data-testid="mocked-form">
          {/* Input fields with test ids */}
          <input
            type="text"
            {...register("serviceName")}
            data-testid="service-name"
          />
          <input type="text" {...register("username")} data-testid="username" />
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

          {/* Control buttons with handlers */}
          <button
            type="button"
            onClick={onTogglePassword}
            data-testid="toggle-password"
          >
            Toggle
          </button>
          <button
            type="button"
            onClick={onGeneratePassword}
            data-testid="generate-password"
          >
            Generate
          </button>
          <button
            type="button"
            onClick={onCopyPassword}
            data-testid="copy-password"
          >
            Copy
          </button>
          <button type="button" onClick={onReset} data-testid="reset">
            Reset
          </button>
          <button type="button" onClick={handleSubmit} data-testid="submit">
            Submit
          </button>

          {/* State indicators */}
          {formError && <div data-testid="form-error">{formError}</div>}
          {isSubmitting && <div data-testid="submitting">Submitting...</div>}
        </div>
      );
    }
  )
}));

// 5. Mock clipboard API
// Provides mock implementation of clipboard functionality
Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn() // Mock copy to clipboard function
  }
});

// 6. Mock fetch API
// Provides successful response for API calls
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ success: true })
  })
) as jest.Mock;

// 7. Mock useSubmitForm hook
// Provides mock implementation of form submission logic
const mockSubmitForm = jest.fn();
jest.mock("../hooks/useSubmitForm", () => ({
  useSubmitForm: () => ({
    submitForm: mockSubmitForm, // Mock submit function
    formError: "", // No errors by default
    isSubmitting: false // Not submitting by default
  })
}));

// 8. Mock copyToClipboard utility
jest.mock("../utils/copyToClipboard", () => ({
  copyToClipboard: jest.fn().mockImplementation(async (text) => {
    try {
      await navigator.clipboard.writeText(text || "");
    } catch (err) {
      console.error("Failed to copy text to clipboard:", err);
    }
  })
}));

// 9. Mock generatePassword utility
jest.mock("../utils/generatePassword", () => ({
  generatePassword: jest.fn(() => "generated-password-123")
}));

/**
 * These mocks allow us to:
 * - Test form without real validation
 * - Track and control field values
 * - Simulate all react-hook-form functions
 * - Test view interactions
 * - Verify clipboard operations
 * - Test form submission
 * - Control submission state and errors
 *
 * This approach makes tests:
 * - Isolated from real dependencies
 * - Predictable
 * - Fast
 * - Easy to debug
 */

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

    fireEvent.click(generateButton);

    // Check that the mocked generatePassword function was called
    expect(
      require("../utils/generatePassword").generatePassword
    ).toHaveBeenCalled();

    // Check that setValue was called with the mocked password
    expect(mockSetValue).toHaveBeenCalledWith(
      "password",
      "generated-password-123",
      {
        shouldValidate: true
      }
    );
  });

  it("should copy password to clipboard", async () => {
    renderComponent();
    const copyButton = screen.getByTestId("copy-password");

    // Set password value directly in mock
    mockFormValues.password = "test-password";

    fireEvent.click(copyButton);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith("test-password");
  });

  it("should handle form submission", async () => {
    renderComponent();

    // Fill form using mock values
    mockFormValues.serviceName = "GitHub";
    mockFormValues.username = "testuser";
    mockFormValues.password = "password123";
    mockFormValues.serviceUrl = "https://github.com";
    mockFormValues.notes = "Test notes";

    // Submit form
    await userEvent.click(screen.getByTestId("submit"));

    // Verify submitForm was called with correct data
    expect(mockSubmitForm).toHaveBeenCalledWith(
      {
        serviceName: "GitHub",
        username: "testuser",
        password: "password123",
        serviceUrl: "https://github.com",
        notes: "Test notes"
      },
      expect.any(Function),
      expect.any(Function)
    );
  });

  it("should reset form", async () => {
    renderComponent();

    // Fill form using mock values
    mockFormValues.serviceName = "GitHub";
    mockFormValues.username = "testuser";

    // Force re-render to show values
    fireEvent.change(screen.getByTestId("service-name"), {
      target: { value: "GitHub" }
    });
    fireEvent.change(screen.getByTestId("username"), {
      target: { value: "testuser" }
    });

    // Reset form
    fireEvent.click(screen.getByTestId("reset"));

    // Verify reset
    expect(mockFormValues.serviceName).toBe("");
    expect(mockFormValues.username).toBe("");
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
        "Failed to copy text to clipboard:",
        expect.any(Error)
      );
    });

    consoleSpy.mockRestore();
  });
});
