import { render, screen } from "@testing-library/react";
import Header from "./Header";

describe("Header", () => {
  it("renders children correctly", () => {
    const testContent = "Test Header";
    render(<Header>{testContent}</Header>);

    expect(screen.getByText(testContent)).toBeInTheDocument();
  });

  it("has correct CSS classes", () => {
    const { container } = render(<Header>Content</Header>);

    const headerElement = container.firstChild as HTMLElement;
    expect(headerElement).toHaveClass("app-header");
    expect(headerElement.firstChild).toHaveClass("app-header__container");
  });

  it("renders complex content", () => {
    render(
      <Header>
        <h1>Title</h1>
        <div>Subtitle</div>
      </Header>
    );

    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("Subtitle")).toBeInTheDocument();
  });
});
