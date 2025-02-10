import { render, screen } from "@testing-library/react";
import FavoritesPage from "./FavoritesPage";

describe("FavoritesPage", () => {
  it("renders favorites page content", () => {
    render(<FavoritesPage />);

    expect(screen.getByText("Favorites Page")).toBeInTheDocument();
    expect(
      screen.getByText("View your favorite items here.")
    ).toBeInTheDocument();
  });
});
