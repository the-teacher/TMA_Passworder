import { render, screen } from "@testing-library/react";
import FavoritesPage from "./FavoritesPage";
import { TestWrapper } from "../../test/testUtils";

// Mock AppLayout
jest.mock("../../components/AppLayout", () => ({
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
});
