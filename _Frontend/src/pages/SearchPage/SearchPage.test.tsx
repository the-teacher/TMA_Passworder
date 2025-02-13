import { render, screen } from "@testing-library/react";
import SearchPage from "./SearchPage";
import { TestWrapper } from "@test/testUtils";

// Mock AppLayout
jest.mock("../../components/AppLayout", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>
}));

describe("SearchPage", () => {
  it("renders search page content", () => {
    render(<SearchPage />, { wrapper: TestWrapper });

    expect(screen.getByText("Search Page")).toBeInTheDocument();
    expect(screen.getByText("Search for content here.")).toBeInTheDocument();
  });
});
