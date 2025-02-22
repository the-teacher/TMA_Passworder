import { render, screen, fireEvent, act } from "@testing-library/react";
import SearchField from "@components/SearchField";
import { TestWrapper } from "@test/testUtils";

describe("SearchField", () => {
  const mockOnSearch = jest.fn();

  beforeEach(() => {
    jest.useFakeTimers();
    mockOnSearch.mockClear();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("renders search field with placeholder", () => {
    render(<SearchField onSearch={mockOnSearch} />, { wrapper: TestWrapper });

    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();
    expect(input).toHaveClass("form-input__search");
    expect(input).toHaveAttribute("placeholder", "Search passwords...");
  });

  it("calls onSearch with debounce", () => {
    render(<SearchField onSearch={mockOnSearch} debounceMs={300} />, {
      wrapper: TestWrapper
    });

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "test" } });

    expect(mockOnSearch).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(mockOnSearch).toHaveBeenCalledWith("test");
  });

  it("shows clear button disabled when input is empty", () => {
    render(<SearchField onSearch={mockOnSearch} />, { wrapper: TestWrapper });

    const clearButton = screen.getByRole("button");
    expect(clearButton).toBeDisabled();
  });

  it("enables clear button when input has enough characters", () => {
    render(<SearchField onSearch={mockOnSearch} />, { wrapper: TestWrapper });

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "test" } });

    const clearButton = screen.getByRole("button");
    expect(clearButton).toBeEnabled();
  });

  it("clears input when clear button is clicked", () => {
    render(<SearchField onSearch={mockOnSearch} />, { wrapper: TestWrapper });

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "test" } });

    const clearButton = screen.getByRole("button");
    fireEvent.click(clearButton);

    expect(input).toHaveValue("");
    expect(mockOnSearch).toHaveBeenCalledWith("");
  });
});
