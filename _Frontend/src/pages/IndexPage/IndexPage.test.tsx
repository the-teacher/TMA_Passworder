import { render, screen } from "@testing-library/react";
import IndexPage from "./IndexPage";

describe("IndexPage", () => {
  it("renders index page content", () => {
    render(<IndexPage />);

    expect(screen.getByText("Home Page")).toBeInTheDocument();
    expect(screen.getByText("Welcome to the home page!")).toBeInTheDocument();
  });
});
