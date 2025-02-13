import { render, screen } from "@testing-library/react";
import SettingsPage from "./SettingsPage";
import { TestWrapper } from "../../../test/testUtils";

// Mock AppLayout
jest.mock("../../components/AppLayout", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>
}));

describe("SettingsPage", () => {
  it("renders settings page content", () => {
    render(<SettingsPage />, { wrapper: TestWrapper });

    expect(screen.getByText("Settings Page")).toBeInTheDocument();
    expect(
      screen.getByText("Manage your application settings here.")
    ).toBeInTheDocument();
  });
});
