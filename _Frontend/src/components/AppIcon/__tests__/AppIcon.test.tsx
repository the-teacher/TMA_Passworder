import { render, screen } from "@testing-library/react";
import AppIcon, { IconType, IconSize } from "@components/AppIcon";

describe("AppIcon", () => {
  const iconTypes: IconType[] = [
    "circle-plus",
    "clipboard-check",
    "eye-off",
    "eye",
    "home",
    "refresh",
    "search",
    "settings",
    "square-x",
    "star"
  ];

  const iconSizes: IconSize[] = [12, 16, 20, 24, 28, 32];

  iconTypes.forEach((iconType) => {
    iconSizes.forEach((iconSize) => {
      it(`renders ${iconType} icon with size ${iconSize} correctly`, () => {
        render(<AppIcon size={iconSize} type={iconType} alt={iconType} />);
        const icon = screen.getByAltText(iconType);
        expect(icon).toBeInTheDocument();
        expect(icon).toHaveAttribute("src", `/icons/${iconType}.svg`);
        expect(icon).toHaveAttribute("width", iconSize.toString());
        expect(icon).toHaveAttribute("height", iconSize.toString());
      });
    });
  });

  it("applies additional props to the img element", () => {
    render(<AppIcon size={24} type="home" alt="home" data-testid="app-icon" />);
    const icon = screen.getByTestId("app-icon");
    expect(icon).toBeInTheDocument();
  });
});
