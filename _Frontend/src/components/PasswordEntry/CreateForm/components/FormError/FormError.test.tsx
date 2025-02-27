import { render, screen } from "@testing-library/react";
import FormError from "../FormError/FormError";

describe("FormError", () => {
  it("should render error message", () => {
    const errorMessage = "Test error message";
    render(<FormError>{errorMessage}</FormError>);

    const errorElement = screen.getByText(errorMessage);
    expect(errorElement).toBeInTheDocument();
    expect(errorElement).toHaveClass("info", "info--danger", "mb20");
  });

  it("should render empty message when empty string provided", () => {
    const { container } = render(<FormError>{""}</FormError>);

    const errorElement = container.firstChild;
    expect(errorElement).toHaveClass("info", "info--danger", "mb20");
    expect(errorElement).toHaveTextContent("");
  });
});
