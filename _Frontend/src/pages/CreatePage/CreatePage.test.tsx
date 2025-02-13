import { render, screen } from "@testing-library/react";
import CreatePage from "./CreatePage";
import "../../../test/setupFilesAfterEnv";

describe("CreatePage", () => {
  it("renders create page content", () => {
    render(<CreatePage />);
    expect(screen.getByText("Hello World")).toBeInTheDocument();
  });
});
