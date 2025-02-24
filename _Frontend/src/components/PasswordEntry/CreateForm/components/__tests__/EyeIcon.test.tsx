import { render, screen, fireEvent } from "@testing-library/react";
import EyeIcon from "../EyeIcon";

describe("EyeIcon", () => {
  const mockOnClick = jest.fn();

  it("should render eye icon with correct title when hidden", () => {
    render(<EyeIcon showPassword={false} onClick={mockOnClick} />);

    expect(screen.getByTitle(/show password/i)).toBeInTheDocument();
  });

  it("should render eye icon with correct title when shown", () => {
    render(<EyeIcon showPassword={true} onClick={mockOnClick} />);

    expect(screen.getByTitle(/hide password/i)).toBeInTheDocument();
  });

  it("should call onClick when clicked", () => {
    render(<EyeIcon showPassword={false} onClick={mockOnClick} />);

    fireEvent.click(screen.getByTitle(/show password/i));
    expect(mockOnClick).toHaveBeenCalled();
  });
});
