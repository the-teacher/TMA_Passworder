import { render, screen, fireEvent } from "@testing-library/react";
import AppButton from "../AppButton";

describe("AppButton", () => {
  it("renders button with icon", () => {
    render(<AppButton icon="home" aria-label="Home" />);
    const icon = screen.getByAltText("Home");
    expect(icon).toBeInTheDocument();
  });

  it("applies variant class correctly", () => {
    render(<AppButton icon="home" variant="secondary" aria-label="Home" />);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("btn--secondary");
  });

  it("applies size class correctly", () => {
    render(<AppButton icon="home" size="small" aria-label="Home" />);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("btn--small");
  });

  it("uses correct icon size", () => {
    render(
      <AppButton icon="home" iconParams={{ iconSize: 24 }} aria-label="Home" />
    );
    const icon = screen.getByAltText("Home");
    expect(icon).toHaveAttribute("width", "24");
    expect(icon).toHaveAttribute("height", "24");
  });

  it("uses alt text from props when provided", () => {
    render(<AppButton icon="home" alt="Custom Alt Text" />);
    expect(screen.getByAltText("Custom Alt Text")).toBeInTheDocument();
  });

  it("uses alt text from iconParams when provided", () => {
    render(
      <AppButton
        icon="home"
        iconParams={{ alt: "Icon Alt Text" }}
        alt="Button Alt Text"
      />
    );
    // iconParams.alt should take precedence
    expect(screen.getByAltText("Icon Alt Text")).toBeInTheDocument();
  });

  it("sets title attribute on button", () => {
    render(<AppButton icon="home" title="Button Title" />);
    expect(screen.getByRole("button")).toHaveAttribute("title", "Button Title");
  });

  it("uses aria-label as title when title not provided", () => {
    render(<AppButton icon="home" aria-label="Home Button" />);
    expect(screen.getByRole("button")).toHaveAttribute("title", "Home Button");
  });

  it("uses alt as title when title and aria-label not provided", () => {
    render(<AppButton icon="home" alt="Home Button Alt" />);
    expect(screen.getByRole("button")).toHaveAttribute(
      "title",
      "Home Button Alt"
    );
  });

  it("passes additional icon props to AppIcon", () => {
    render(
      <AppButton
        icon="home"
        iconParams={{
          className: "custom-icon-class",
          "data-testid": "icon-element"
        }}
        aria-label="Home"
      />
    );
    const icon = screen.getByTestId("icon-element");
    expect(icon).toHaveClass("custom-icon-class");
  });

  it("calls onClick handler when clicked", () => {
    const handleClick = jest.fn();
    render(<AppButton icon="home" onClick={handleClick} aria-label="Home" />);

    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("can be disabled", () => {
    render(<AppButton icon="home" disabled aria-label="Home" />);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("does not call onClick when disabled", () => {
    const handleClick = jest.fn();
    render(
      <AppButton icon="home" onClick={handleClick} disabled aria-label="Home" />
    );

    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("passes additional props to button element", () => {
    render(
      <AppButton icon="home" data-testid="custom-button" aria-label="Home" />
    );
    expect(screen.getByTestId("custom-button")).toBeInTheDocument();
  });

  it("applies custom className to button", () => {
    render(
      <AppButton
        icon="home"
        className="custom-button-class"
        aria-label="Home"
      />
    );
    expect(screen.getByRole("button")).toHaveClass("custom-button-class");
  });

  it("uses default icon when none provided", () => {
    // @ts-ignore - Testing default value
    render(<AppButton aria-label="Default Icon" />);
    const icon = screen.getByAltText("Default Icon");
    expect(icon).toHaveAttribute("src", "/icons/star.svg");
  });

  it("overrides icon with iconParams.iconType", () => {
    render(
      <AppButton
        icon="home"
        iconParams={{ iconType: "search" }}
        aria-label="Search"
      />
    );
    const icon = screen.getByAltText("Search");
    expect(icon).toHaveAttribute("src", "/icons/search.svg");
  });
});
