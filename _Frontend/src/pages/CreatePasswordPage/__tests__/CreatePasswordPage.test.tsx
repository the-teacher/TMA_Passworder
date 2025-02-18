import { render, screen, fireEvent } from "@testing-library/react";
import CreatePasswordPage from "@pages/CreatePasswordPage";
import { TestWrapper } from "@test/testUtils";
import "@test/setupFilesAfterEnv";

// Mock AppLayout
jest.mock("@components/AppLayout", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>
}));

describe("CreatePasswordPage", () => {
  const mockConsoleLog = jest.spyOn(console, "log").mockImplementation();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders create page content", () => {
    render(<CreatePasswordPage />, { wrapper: TestWrapper });
    expect(screen.getByText("Create Password Entry")).toBeInTheDocument();
  });

  it("handles form submission correctly", () => {
    render(<CreatePasswordPage />);

    // Fill in form fields
    fireEvent.change(screen.getByLabelText(/service name/i), {
      target: { value: "Test Service" }
    });
    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: "testuser" }
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "TestPassword123" }
    });
    fireEvent.change(screen.getByLabelText(/^url$/i), {
      target: { value: "https://test.com" }
    });
    fireEvent.change(screen.getByLabelText(/notes/i), {
      target: { value: "Test Notes" }
    });

    // Submit form
    fireEvent.click(screen.getByRole("button", { name: /save/i }));

    // Verify console.log was called with correct data
    expect(mockConsoleLog).toHaveBeenCalledWith("Form submitted:", {
      serviceName: "Test Service",
      username: "testuser",
      password: "TestPassword123",
      serviceUrl: "https://test.com",
      notes: "Test Notes"
    });
  });
});
