import { render, screen } from "@testing-library/react";
import AboutPage from "./AboutPage";

describe("AboutPage", () => {
  it("renders about page content", () => {
    render(<AboutPage />);

    expect(screen.getByText("About Page")).toBeInTheDocument();
    expect(
      screen.getByText("Learn more about our application.")
    ).toBeInTheDocument();
  });
});
