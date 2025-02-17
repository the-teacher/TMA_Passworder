import { render, screen } from "@testing-library/react";
import App from "../App";

// Mock the router component
jest.mock("react-router", () => ({
  BrowserRouter: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="browser-router">{children}</div>
  )
}));

// Mock the routes component
jest.mock("@routes/index", () => {
  const MockRoutes = () => <div data-testid="app-routes">Routes Content</div>;
  return MockRoutes;
});

// Mock the global styles import
jest.mock("./globalStyles.scss", () => ({}));

describe("App", () => {
  it("renders with router and routes", () => {
    render(<App />);

    // Should find the router wrapper
    expect(screen.getByTestId("browser-router")).toBeInTheDocument();

    // Should find the routes content
    expect(screen.getByTestId("app-routes")).toBeInTheDocument();

    // Should contain the routes content text
    expect(screen.getByText("Routes Content")).toBeInTheDocument();
  });

  it("has correct component structure", () => {
    const { container } = render(<App />);

    // Check that router contains routes
    const router = screen.getByTestId("browser-router");
    const routes = screen.getByTestId("app-routes");
    expect(router).toContainElement(routes);

    // Verify there's only one root element in the container
    expect(container.childNodes).toHaveLength(1);
  });
});
