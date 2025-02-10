import { render, screen } from "@testing-library/react";
import SearchPage from "./SearchPage";

describe("SearchPage", () => {
  it("renders search page content", () => {
    render(<SearchPage />);

    expect(screen.getByText("Search Page")).toBeInTheDocument();
    expect(screen.getByText("Search for content here.")).toBeInTheDocument();
  });
});
