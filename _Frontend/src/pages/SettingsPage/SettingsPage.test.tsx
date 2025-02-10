import { render, screen } from "@testing-library/react";
import SettingsPage from "./SettingsPage";

describe("SettingsPage", () => {
  it("renders settings page content", () => {
    render(<SettingsPage />);

    expect(screen.getByText("Settings Page")).toBeInTheDocument();
    expect(
      screen.getByText("Manage your application settings here.")
    ).toBeInTheDocument();
  });
});
