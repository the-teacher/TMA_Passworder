import { render, screen } from "@testing-library/react";
import LoadingFallback from "@components/LoadingFallback";

describe("LoadingFallback", () => {
  it("renders loading text", () => {
    render(<LoadingFallback />);
    const loadingText = screen.getByText("Loading...");
    expect(loadingText).toBeInTheDocument();
  });

  it("applies correct CSS classes", () => {
    const { container } = render(<LoadingFallback />);
    const containerDiv = container.firstChild as HTMLElement;
    expect(containerDiv).toHaveClass("loading-fallback--container");

    const textDiv = screen.getByText("Loading...");
    expect(textDiv).toHaveClass("loading-fallback--text");
  });
});
