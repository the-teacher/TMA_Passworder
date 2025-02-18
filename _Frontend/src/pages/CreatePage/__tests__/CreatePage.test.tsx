import { render, screen, fireEvent } from "@testing-library/react";
import CreatePage from "@pages/CreatePage";
import { TestWrapper } from "@test/testUtils";
import "@test/setupFilesAfterEnv";

// Mock AppLayout
jest.mock("@components/AppLayout", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>
}));

describe("CreatePage", () => {
  const mockConsoleLog = jest.spyOn(console, "log").mockImplementation();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders create page content", () => {
    render(<CreatePage />, { wrapper: TestWrapper });
    expect(screen.getByText("Create a Password Entry")).toBeInTheDocument();
  });

  it("handles form submission correctly", () => {
    render(<CreatePage />, { wrapper: TestWrapper });

    // Fill in the form
    const serviceNameInput = screen.getByLabelText(/service name/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const notesInput = screen.getByLabelText(/notes/i);

    fireEvent.change(serviceNameInput, { target: { value: "Test Service" } });
    fireEvent.change(passwordInput, { target: { value: "TestPassword123" } });
    fireEvent.change(notesInput, { target: { value: "Test Notes" } });

    // Submit the form
    const submitButton = screen.getByRole("button", { name: /save/i });
    fireEvent.click(submitButton);

    // Verify console.log was called with correct data
    expect(mockConsoleLog).toHaveBeenCalledWith("Form submitted:", {
      serviceName: "Test Service",
      password: "TestPassword123",
      notes: "Test Notes"
    });
  });
});
