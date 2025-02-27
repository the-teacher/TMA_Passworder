import { render, screen, fireEvent } from "@testing-library/react";
import CopyButton from "../CopyButton";

describe("CopyButton", () => {
  const mockOnClick = jest.fn();

  it("should render copy button", () => {
    render(<CopyButton onClick={mockOnClick} />);

    expect(screen.getByTitle(/copy password/i)).toBeInTheDocument();
  });

  it("should call onClick when clicked", () => {
    render(<CopyButton onClick={mockOnClick} />);

    fireEvent.click(screen.getByRole("button"));
    expect(mockOnClick).toHaveBeenCalled();
  });
});
