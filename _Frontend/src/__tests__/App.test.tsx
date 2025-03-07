import { render, screen } from "@testing-library/react";
import App from "../App";
import { useUserExists } from "../hooks/useUserExists";
import { I18nextProvider } from "react-i18next";
import i18n from "@i18n/index";

// Create a custom wrapper without BrowserRouter
const CustomWrapper = ({ children }: { children: React.ReactNode }) => (
  <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
);

// Mock dependencies
jest.mock("../hooks/useUserExists");
jest.mock("@pages/RegistrationPage", () => ({
  __esModule: true,
  default: () => <div data-testid="registration-page">Registration Page</div>
}));
jest.mock("@components/LoadingFallback", () => ({
  __esModule: true,
  default: () => <div data-testid="loading-fallback">Loading...</div>
}));
jest.mock("react-router", () => ({
  BrowserRouter: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="browser-router">{children}</div>
  )
}));
jest.mock("@routes/index", () => ({
  __esModule: true,
  default: () => <div data-testid="app-routes">App Routes</div>
}));

describe("App", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders without crashing", () => {
    // Mock user exists to show main app
    (useUserExists as jest.Mock).mockReturnValue({
      isLoading: false,
      userExists: true,
      error: null
    });

    render(<App />, { wrapper: CustomWrapper });
    expect(screen.getByTestId("browser-router")).toBeInTheDocument();
  });

  it("has correct component structure", () => {
    // Mock user exists to show main app
    (useUserExists as jest.Mock).mockReturnValue({
      isLoading: false,
      userExists: true,
      error: null
    });

    render(<App />, { wrapper: CustomWrapper });

    // Check that router contains routes
    const router = screen.getByTestId("browser-router");
    const routes = screen.getByTestId("app-routes");
    expect(router).toContainElement(routes);
  });
});
