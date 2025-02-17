import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import AppRoutes from "../routes";
import { routesConfig } from "../routes";

const mockComponent = (name: string) => ({
  __esModule: true,
  default: () => <div>{name}</div>
});

jest.mock("@pages/IndexPage", () => mockComponent("Index Page"));
jest.mock("@pages/CreatePage", () => mockComponent("Create Page"));
jest.mock("@pages/SearchPage", () => mockComponent("Search Page"));
jest.mock("@pages/FavoritesPage", () => mockComponent("Favorites Page"));
jest.mock("@pages/LogoutPage", () => mockComponent("Logout Page"));
jest.mock("@pages/SettingsPage", () => mockComponent("Settings Page"));
jest.mock("@pages/AboutPage", () => mockComponent("About Page"));
jest.mock("@pages/NotFoundPage", () => mockComponent("Not Found Page"));
jest.mock("@pages/ShowPage", () => mockComponent("Show Page"));

jest.mock("react", () => {
  const originalModule = jest.requireActual("react");
  return {
    ...originalModule,
    Suspense: ({ children }: { children: React.ReactNode }) => <>{children}</>
  };
});

jest.mock("@components/LoadingFallback", () => ({
  __esModule: true,
  default: () => <div data-testid="loading-fallback">Loading...</div>
}));

const ensureAbsolutePath = (path: string) =>
  path.startsWith("/") ? path : `/${path}`;

const renderWithRouter = (initialEntry = "/") => {
  return render(
    <MemoryRouter initialEntries={[ensureAbsolutePath(initialEntry)]}>
      <AppRoutes />
    </MemoryRouter>
  );
};

describe("AppRoutes", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render index page for root path", async () => {
    renderWithRouter("/");
    expect(await screen.findByText("Index Page")).toBeInTheDocument();
  });

  it("should render create page", async () => {
    renderWithRouter("/create");
    expect(await screen.findByText("Create Page")).toBeInTheDocument();
  });

  it("should render search page", async () => {
    renderWithRouter("/search");
    expect(await screen.findByText("Search Page")).toBeInTheDocument();
  });

  it("should render favorites page", async () => {
    renderWithRouter("/favorites");
    expect(await screen.findByText("Favorites Page")).toBeInTheDocument();
  });

  it("should render logout page", async () => {
    renderWithRouter("/logout");
    expect(await screen.findByText("Logout Page")).toBeInTheDocument();
  });

  it("should render settings page", async () => {
    renderWithRouter("/settings");
    expect(await screen.findByText("Settings Page")).toBeInTheDocument();
  });

  it("should render about page", async () => {
    renderWithRouter("/about");
    expect(await screen.findByText("About Page")).toBeInTheDocument();
  });

  it("should render show page with id parameter", async () => {
    renderWithRouter("/passwords/123");
    expect(await screen.findByText("Show Page")).toBeInTheDocument();
  });

  it("should render not found page for unknown routes", async () => {
    renderWithRouter("/unknown-route");
    expect(await screen.findByText("Not Found Page")).toBeInTheDocument();
  });

  describe("Route configuration", () => {
    it("should have correct routes configuration", () => {
      expect(routesConfig).toEqual([
        { index: true, element: expect.any(Object) },
        { path: "create", element: expect.any(Object) },
        { path: "search", element: expect.any(Object) },
        { path: "favorites", element: expect.any(Object) },
        { path: "logout", element: expect.any(Object) },
        { path: "settings", element: expect.any(Object) },
        { path: "about", element: expect.any(Object) },
        { path: "passwords/:id", element: expect.any(Object) },
        { path: "*", element: expect.any(Object) }
      ]);
    });

    it("should render all routes without crashing", async () => {
      const routeTests = [
        { path: "/", expectedText: "Index Page" },
        { path: "/create", expectedText: "Create Page" },
        { path: "/search", expectedText: "Search Page" },
        { path: "/favorites", expectedText: "Favorites Page" },
        { path: "/logout", expectedText: "Logout Page" },
        { path: "/settings", expectedText: "Settings Page" },
        { path: "/about", expectedText: "About Page" },
        { path: "/passwords/123", expectedText: "Show Page" },
        { path: "/non-existent", expectedText: "Not Found Page" }
      ];

      for (const { path, expectedText } of routeTests) {
        document.body.innerHTML = "";

        renderWithRouter(path);
        expect(await screen.findByText(expectedText)).toBeInTheDocument();
      }
    });
  });
});
