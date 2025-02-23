import { render, screen } from "@testing-library/react";
import CreatePasswordPage from "@pages/PasswordEntries/NewPage";
import { TestWrapper } from "@test/testUtils";
import "@test/setupFilesAfterEnv";
import type { PasswordEntryData } from "@pages/PasswordEntries/NewPage/types";

// Mock AppLayout
jest.mock("@components/AppLayout", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="app-layout">{children}</div>
  )
}));

// Mock CreatePasswordEntryForm using a more type-safe approach
let mockSubmitHandler: ((data: PasswordEntryData) => void) | null = null;

jest.mock("@components/CreatePasswordEntryForm", () => ({
  __esModule: true,
  default: ({ onSubmit }: { onSubmit: (data: PasswordEntryData) => void }) => {
    mockSubmitHandler = onSubmit;
    return <div data-testid="create-password-form" />;
  }
}));

describe("CreatePasswordPage", () => {
  const mockConsoleLog = jest.spyOn(console, "log").mockImplementation();

  beforeEach(() => {
    jest.clearAllMocks();
    mockSubmitHandler = null;
  });

  it("renders within AppLayout with CreatePasswordEntryForm", () => {
    render(<CreatePasswordPage />, { wrapper: TestWrapper });

    expect(screen.getByTestId("app-layout")).toBeInTheDocument();
    expect(screen.getByTestId("create-password-form")).toBeInTheDocument();
  });

  it("handles form submission from CreatePasswordEntryForm", () => {
    render(<CreatePasswordPage />, { wrapper: TestWrapper });

    const testData: PasswordEntryData = {
      serviceName: "Test Service",
      username: "testuser",
      password: "TestPassword123",
      serviceUrl: "https://test.com",
      notes: "Test Notes"
    };

    // Trigger mock form submission using the mockSubmitHandler
    expect(mockSubmitHandler).toBeTruthy();
    mockSubmitHandler?.(testData);

    expect(mockConsoleLog).toHaveBeenCalledWith("Form submitted:", testData);
  });
});
