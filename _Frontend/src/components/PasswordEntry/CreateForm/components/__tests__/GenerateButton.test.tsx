import { render, screen, fireEvent } from "@testing-library/react";
import GenerateButton from "../GenerateButton";

describe("GenerateButton", () => {
  const mockOnClick = jest.fn();

  it("should render generate button", () => {
    render(<GenerateButton onClick={mockOnClick} />);

    expect(screen.getByTitle(/generate password/i)).toBeInTheDocument();
  });

  it("should call onClick when clicked", () => {
    render(<GenerateButton onClick={mockOnClick} />);

    fireEvent.click(screen.getByRole("button"));
    expect(mockOnClick).toHaveBeenCalled();
  });
});
