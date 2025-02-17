import { render, screen, fireEvent } from "@testing-library/react";
import ShowPage from "@pages/ShowPage";
import { TestWrapper } from "@test/testUtils";

// Mock AppLayout
jest.mock("@components/AppLayout", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>
}));

// Mock the clipboard API
beforeAll(() => {
  Object.defineProperty(navigator, "clipboard", {
    value: {
      writeText: jest.fn(),
      readText: jest.fn().mockResolvedValue("user@gmail.com")
    },
    configurable: true
  });
});

describe("ShowPage", () => {
  it("renders show page content", () => {
    render(<ShowPage />, { wrapper: TestWrapper });

    // Check for main content elements
    expect(screen.getByText("Gmail Account")).toBeInTheDocument();
    expect(screen.getByText("user@gmail.com")).toBeInTheDocument();
    expect(screen.getByText(/work email account/i)).toBeInTheDocument();
    expect(screen.getByText(/backup email:/i)).toBeInTheDocument();
  });

  it("toggles password visibility", () => {
    render(<ShowPage />, { wrapper: TestWrapper });

    const toggleButton = screen.getByLabelText(/show/i);
    const passwordValue = screen.getByText("••••••••");

    // Initially, the password should be hidden
    expect(passwordValue).toBeInTheDocument();

    // Click to show password
    fireEvent.click(toggleButton);
    expect(screen.getByText("securePassword123")).toBeInTheDocument();

    // Click to hide password
    fireEvent.click(toggleButton);
    expect(passwordValue).toBeInTheDocument();
  });

  it("copies username to clipboard", async () => {
    render(<ShowPage />, { wrapper: TestWrapper });

    const copyButtons = screen.getAllByLabelText(/copy/i);
    const usernameCopyButton = copyButtons[0]; // First copy button is for username
    fireEvent.click(usernameCopyButton);

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
      "user@gmail.com"
    );
  });

  it("copies password to clipboard", async () => {
    render(<ShowPage />, { wrapper: TestWrapper });

    const copyButtons = screen.getAllByLabelText(/copy/i);
    const passwordCopyButton = copyButtons[1]; // Second copy button is for password
    fireEvent.click(passwordCopyButton);

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
      "securePassword123"
    );
  });
});
