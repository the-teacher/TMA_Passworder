import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router";
import FooterNavigation from "@components/FooterNavigation";

describe("FooterNavigation", () => {
  const renderComponent = () =>
    render(
      <BrowserRouter>
        <FooterNavigation />
      </BrowserRouter>
    );

  it("renders all navigation items", () => {
    renderComponent();

    expect(screen.getByAltText("Home")).toBeInTheDocument();
    expect(screen.getByAltText("Create")).toBeInTheDocument();
    expect(screen.getByAltText("Search")).toBeInTheDocument();
    expect(screen.getByAltText("Favorites")).toBeInTheDocument();
    expect(screen.getByAltText("Logout")).toBeInTheDocument();
  });

  it("renders correct navigation links", () => {
    renderComponent();

    expect(screen.getByText("Home").closest("a")).toHaveAttribute("href", "/");
    expect(screen.getByText("Create").closest("a")).toHaveAttribute(
      "href",
      "/create"
    );
    expect(screen.getByText("Search").closest("a")).toHaveAttribute(
      "href",
      "/search"
    );
    expect(screen.getByText("Favorites").closest("a")).toHaveAttribute(
      "href",
      "/favorites"
    );
    expect(screen.getByText("Logout").closest("a")).toHaveAttribute(
      "href",
      "/logout"
    );
  });

  it("applies correct CSS classes", () => {
    renderComponent();

    const nav = screen.getByRole("navigation");
    expect(nav).toHaveClass("footer-navigation");

    const links = screen.getAllByRole("link");
    links.forEach((link) => {
      expect(link).toHaveClass("footer-navigation__item");
    });

    const icons = screen.getAllByRole("img");
    icons.forEach((icon) => {
      expect(icon).toHaveClass("footer-navigation__icon");
    });

    const texts = screen.getAllByText(/(Home|Create|Search|Favorites|Logout)/);
    texts.forEach((text) => {
      expect(text).toHaveClass("footer-navigation__text");
    });
  });
});
