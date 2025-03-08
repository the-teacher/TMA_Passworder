import { render, screen } from "@testing-library/react";
import App from "./App";
import { useUserExists } from "@hooks/useUserExists";
import { I18nextProvider } from "react-i18next";
import i18n from "@i18n/index";

// Create a custom wrapper without BrowserRouter
const CustomWrapper = ({ children }: { children: React.ReactNode }) => (
  <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
);

// Mock dependencies
jest.mock("@hooks/useUserExists");
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

  it("should show loading state while checking user existence", () => {
    (useUserExists as jest.Mock).mockReturnValue({
      isLoading: true,
      userExists: false,
      error: null
    });

    render(<App />, { wrapper: CustomWrapper });
    expect(screen.getByTestId("loading-fallback")).toBeInTheDocument();
  });

  it("should show registration page if user doesn't exist", () => {
    (useUserExists as jest.Mock).mockReturnValue({
      isLoading: false,
      userExists: false,
      error: null
    });

    render(<App />, { wrapper: CustomWrapper });
    expect(screen.getByTestId("registration-page")).toBeInTheDocument();
  });

  it("should show main app if user exists", () => {
    (useUserExists as jest.Mock).mockReturnValue({
      isLoading: false,
      userExists: true,
      error: null
    });

    render(<App />, { wrapper: CustomWrapper });
    expect(screen.getByTestId("app-routes")).toBeInTheDocument();
    expect(screen.getByTestId("browser-router")).toBeInTheDocument();
    expect(screen.getByTestId("browser-router")).toContainElement(
      screen.getByTestId("app-routes")
    );
  });
});
