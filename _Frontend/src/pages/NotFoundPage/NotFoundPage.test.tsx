import { render, screen } from "@testing-library/react";
import NotFoundPage from "./NotFoundPage";
import { TestWrapper } from "../../test/testUtils";

// Mock AppLayout
jest.mock("../../components/AppLayout", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>
}));

describe("NotFoundPage", () => {
  it("renders not found page content", () => {
    render(<NotFoundPage />, { wrapper: TestWrapper });

    expect(screen.getByText("404")).toBeInTheDocument();
    expect(screen.getByText("Not Found")).toBeInTheDocument();
  });

  it("applies correct CSS classes", () => {
    const { container } = render(<NotFoundPage />, { wrapper: TestWrapper });

    expect(
      container.querySelector(".not-found--container")
    ).toBeInTheDocument();
    expect(container.querySelector(".not-found--title")).toBeInTheDocument();
    expect(container.querySelector(".not-found--text")).toBeInTheDocument();
  });
});
