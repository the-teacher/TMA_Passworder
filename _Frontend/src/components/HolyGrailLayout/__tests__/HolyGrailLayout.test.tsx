import { render, screen } from "@testing-library/react";
import HolyGrailLayout from "../HolyGrailLayout";

describe("HolyGrailLayout", () => {
  it("should render children correctly", () => {
    const testContent = "Test Content";
    render(<HolyGrailLayout>{testContent}</HolyGrailLayout>);

    expect(screen.getByText(testContent)).toBeInTheDocument();
  });

  it("should have correct CSS class and display style", () => {
    const { container } = render(<HolyGrailLayout>Content</HolyGrailLayout>);

    const layoutElement = container.firstChild as HTMLElement;
    expect(layoutElement).toHaveClass("holy-grail");
    expect(layoutElement).toHaveStyle({ display: "contents" });
  });

  it("should render multiple children correctly", () => {
    render(
      <HolyGrailLayout>
        <div>Child 1</div>
        <div>Child 2</div>
      </HolyGrailLayout>
    );

    expect(screen.getByText("Child 1")).toBeInTheDocument();
    expect(screen.getByText("Child 2")).toBeInTheDocument();
  });
});
