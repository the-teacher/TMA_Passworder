import { render, screen, fireEvent, act } from "@testing-library/react";
import IndexPage from "@pages/IndexPage";
import { TestWrapper } from "@test/testUtils";

// Mock AppLayout
jest.mock("@components/AppLayout", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>
}));

// Mock the PasswordEntryList component
jest.mock("@components/PasswordEntryList", () => ({
  __esModule: true,
  default: () => (
    <div data-testid="mocked-password-entry-list">Mocked Password List</div>
  )
}));

// Mock the SearchField component
jest.mock("@components/SearchField", () => ({
  __esModule: true,
  default: ({ onSearch }: { onSearch: (query: string) => void }) => (
    <div data-testid="mocked-search-field">
      <input
        type="text"
        onChange={(e) => onSearch(e.target.value)}
        data-testid="search-input"
      />
    </div>
  )
}));

describe("IndexPage", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("renders search field and password list", () => {
    render(<IndexPage />, { wrapper: TestWrapper });

    expect(screen.getByTestId("mocked-search-field")).toBeInTheDocument();
    expect(
      screen.getByTestId("mocked-password-entry-list")
    ).toBeInTheDocument();
  });

  it("handles search input", () => {
    const consoleSpy = jest.spyOn(console, "log").mockImplementation();
    render(<IndexPage />, { wrapper: TestWrapper });

    const searchInput = screen.getByTestId("search-input");
    fireEvent.change(searchInput, { target: { value: "test" } });

    act(() => {
      jest.runAllTimers();
    });

    expect(consoleSpy).toHaveBeenCalledWith(
      "Searching for:",
      "test",
      expect.any(String)
    );

    consoleSpy.mockRestore();
  });
});
