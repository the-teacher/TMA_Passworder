import { render, screen, fireEvent } from "@testing-library/react";
import CreatePasswordEntryFormView, {
  Props
} from "../CreatePasswordEntryFormView";

// Mock all input components
jest.mock("../inputs/ServiceNameInput", () => () => (
  <div data-testid="service-name-input">ServiceNameInput</div>
));
jest.mock("../inputs/UsernameInput", () => () => (
  <div data-testid="username-input">UsernameInput</div>
));
jest.mock("../inputs/ServiceUrlInput", () => () => (
  <div data-testid="service-url-input">ServiceUrlInput</div>
));
jest.mock("../inputs/PasswordInput", () => () => (
  <div data-testid="password-input">PasswordInput</div>
));
jest.mock("../inputs/NotesInput", () => () => (
  <div data-testid="notes-input">NotesInput</div>
));
jest.mock("../inputs/FormActions", () => () => (
  <div data-testid="form-actions">FormActions</div>
));

describe("CreatePasswordEntryFormView", () => {
  const defaultProps: Props = {
    onSubmit: jest.fn()
  };

  const renderComponent = (props: Partial<Props> = {}) => {
    return render(<CreatePasswordEntryFormView {...defaultProps} {...props} />);
  };

  it("renders the form with all input components", () => {
    renderComponent();

    // Check if the form is rendered
    const form = screen.getByRole("create-password-form");
    expect(form).toBeInTheDocument();

    // Check if all input components are rendered
    expect(screen.getByTestId("service-name-input")).toBeInTheDocument();
    expect(screen.getByTestId("username-input")).toBeInTheDocument();
    expect(screen.getByTestId("service-url-input")).toBeInTheDocument();
    expect(screen.getByTestId("password-input")).toBeInTheDocument();
    expect(screen.getByTestId("notes-input")).toBeInTheDocument();
    expect(screen.getByTestId("form-actions")).toBeInTheDocument();
  });

  it("calls onSubmit when form is submitted", () => {
    const onSubmitMock = jest.fn();
    renderComponent({ onSubmit: onSubmitMock });

    const form = screen.getByRole("create-password-form");
    fireEvent.submit(form);

    expect(onSubmitMock).toHaveBeenCalledTimes(1);
  });

  it("applies the correct CSS class to the form", () => {
    renderComponent();

    const form = screen.getByRole("create-password-form");
    expect(form).toHaveClass("create-password-form");
  });
});
