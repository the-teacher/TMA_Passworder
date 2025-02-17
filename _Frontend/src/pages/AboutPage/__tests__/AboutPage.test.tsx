import { render, screen } from "@testing-library/react";
import AboutPage from "@pages/AboutPage";
import { TestWrapper } from "@test/testUtils";

// Mock AppLayout
jest.mock("@components/AppLayout", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>
}));

describe("AboutPage", () => {
  it("renders about page content", () => {
    render(<AboutPage />, { wrapper: TestWrapper });

    expect(screen.getByText("About Page")).toBeInTheDocument();
    expect(
      screen.getByText("Learn more about our application.")
    ).toBeInTheDocument();
  });

  it("renders with correct layout", () => {
    render(<AboutPage />, { wrapper: TestWrapper });

    const layoutContent = screen.getByText("About Page").closest("div");
    expect(layoutContent).toBeInTheDocument();
    expect(layoutContent).toHaveTextContent(
      "Learn more about our application."
    );
  });
});
