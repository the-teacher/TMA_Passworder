import { render, screen } from "@testing-library/react";
import CreatePage from "./CreatePage";

describe("CreatePage", () => {
  it("renders create page content", () => {
    render(<CreatePage />);

    expect(screen.getByText("Create Page")).toBeInTheDocument();
    expect(screen.getByText("Create new content here.")).toBeInTheDocument();
  });
});
