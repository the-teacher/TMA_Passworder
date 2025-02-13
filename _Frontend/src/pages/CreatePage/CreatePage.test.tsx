import { render, screen } from "@testing-library/react";
import CreatePage from "./CreatePage";
import { TestWrapper } from "@test/testUtils";
import "../../../test/setupFilesAfterEnv";

// Mock AppLayout
jest.mock("../../components/AppLayout", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>
}));

describe("CreatePage", () => {
  it("renders create page content", () => {
    render(<CreatePage />, { wrapper: TestWrapper });
    expect(screen.getByText("Create a Password Entry")).toBeInTheDocument();
  });
});
