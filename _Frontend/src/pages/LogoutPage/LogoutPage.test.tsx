import { render, screen } from "@testing-library/react";
import LogoutPage from "./LogoutPage";
import { TestWrapper } from "../../../test/testUtils";

// Mock AppLayout
jest.mock("../../components/AppLayout", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>
}));

describe("LogoutPage", () => {
  it("renders logout page content", () => {
    render(<LogoutPage />, { wrapper: TestWrapper });

    expect(screen.getByText("Logging out...")).toBeInTheDocument();
    expect(
      screen.getByText("You will be redirected shortly.")
    ).toBeInTheDocument();
  });
});
