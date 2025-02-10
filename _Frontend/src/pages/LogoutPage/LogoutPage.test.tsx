import { render, screen } from "@testing-library/react";
import LogoutPage from "./LogoutPage";

describe("LogoutPage", () => {
  it("renders logout page content", () => {
    render(<LogoutPage />);

    expect(screen.getByText("Logging out...")).toBeInTheDocument();
    expect(
      screen.getByText("You will be redirected shortly.")
    ).toBeInTheDocument();
  });
});
