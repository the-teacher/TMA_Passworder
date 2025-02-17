import { render, screen } from "@testing-library/react";
import FavoritesPage from "@pages/FavoritesPage";
import { TestWrapper } from "@test/testUtils";

// Mock AppLayout
jest.mock("@components/AppLayout", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>
}));

describe("FavoritesPage", () => {
  it("renders favorites page content", () => {
    render(<FavoritesPage />, { wrapper: TestWrapper });

    expect(screen.getByText("Favorites Page")).toBeInTheDocument();
    expect(
      screen.getByText("View your favorite items here.")
    ).toBeInTheDocument();
  });

  it("renders with correct layout", () => {
    render(<FavoritesPage />, { wrapper: TestWrapper });

    const layoutContent = screen.getByText("Favorites Page").closest("div");
    expect(layoutContent).toBeInTheDocument();
    expect(layoutContent).toHaveTextContent("View your favorite items here.");
  });
});
