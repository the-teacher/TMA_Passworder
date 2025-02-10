import { render, screen } from "@testing-library/react";
import NotFoundPage from "./NotFoundPage";

describe("NotFoundPage", () => {
  it("renders not found page content", () => {
    render(<NotFoundPage />);

    expect(screen.getByText("404")).toBeInTheDocument();
    expect(screen.getByText("Not Found")).toBeInTheDocument();
  });

  it("applies correct CSS classes", () => {
    const { container } = render(<NotFoundPage />);

    expect(
      container.querySelector(".not-found--container")
    ).toBeInTheDocument();
    expect(container.querySelector(".not-found--title")).toBeInTheDocument();
    expect(container.querySelector(".not-found--text")).toBeInTheDocument();
  });
});
