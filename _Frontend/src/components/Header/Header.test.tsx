import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router";
import Header from "./Header";

// Mock react-i18next
jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: { [key: string]: string } = {
        "app.name": "HamsterPass",
        "app.settings": "Settings"
      };
      return translations[key] || key;
    }
  })
}));

const renderWithRouter = (component: React.ReactNode) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe("Header", () => {
  it("renders app name", () => {
    renderWithRouter(<Header />);
    expect(screen.getByText("HamsterPass")).toBeInTheDocument();
  });

  it("has correct CSS classes", () => {
    const { container } = renderWithRouter(<Header />);

    const headerElement = container.firstChild as HTMLElement;
    expect(headerElement).toHaveClass("app-header");
    expect(
      headerElement.querySelector(".app-header__title")
    ).toBeInTheDocument();
    expect(
      headerElement.querySelector(".app-header__settings")
    ).toBeInTheDocument();
  });

  it("renders settings link with icon", () => {
    renderWithRouter(<Header />);

    const settingsLink = screen.getByRole("link", { name: /settings/i });
    expect(settingsLink).toHaveAttribute("href", "/settings");

    const settingsIcon = screen.getByAltText("Settings");
    expect(settingsIcon).toHaveAttribute("src", "/icons/settings.svg");
  });
});
