import { render, screen } from "@testing-library/react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import UsernameInput from "../UsernameInput";
import { getFieldStatus } from "../../../utils/getFieldStatus";

jest.mock("react-hook-form", () => ({
  useFormContext: jest.fn()
}));

jest.mock("react-i18next", () => ({
  useTranslation: jest.fn()
}));

// Mock getFieldStatus at file level
jest.mock("../../../utils/getFieldStatus", () => ({
  getFieldStatus: jest.fn().mockReturnValue({
    className: "info--success",
    message: "Valid username"
  })
}));

describe("UsernameInput", () => {
  const mockSetValue = jest.fn();
  const mockRegister = jest.fn().mockReturnValue({});
  const mockWatch = jest.fn().mockReturnValue("testuser");

  const mockTranslation = {
    t: jest.fn((key: "fields.username") => {
      const translations = {
        "fields.username": "Username"
      };
      return translations[key] || key;
    })
  };

  beforeEach(() => {
    (useFormContext as jest.Mock).mockReturnValue({
      register: mockRegister,
      setValue: mockSetValue,
      watch: mockWatch,
      formState: {
        errors: {},
        dirtyFields: {}
      }
    });

    (useTranslation as jest.Mock).mockReturnValue(mockTranslation);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders username input with label", () => {
    render(<UsernameInput />);

    const input = screen.getByLabelText("Username");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("type", "text");
  });

  it("registers username field with form context", () => {
    render(<UsernameInput />);

    expect(mockRegister).toHaveBeenCalledWith("username", {
      onBlur: expect.any(Function)
    });
  });

  it("marks input as invalid when there are errors", () => {
    (useFormContext as jest.Mock).mockReturnValue({
      register: mockRegister,
      setValue: mockSetValue,
      watch: mockWatch,
      formState: {
        errors: {
          username: { type: "required", message: "Username is required" }
        },
        dirtyFields: {}
      }
    });

    render(<UsernameInput />);

    const input = screen.getByLabelText("Username");
    expect(input).toHaveAttribute("aria-invalid", "true");
  });

  it("applies correct CSS classes", () => {
    render(<UsernameInput />);

    const input = screen.getByLabelText("Username");
    expect(input).toHaveClass("form-input");
    expect(screen.getByText("Username").closest("label")).toHaveClass(
      "form-group--label"
    );
  });

  it("displays field status message", () => {
    render(<UsernameInput />);

    // Check that getFieldStatus was called
    expect(getFieldStatus).toHaveBeenCalled();

    // Check that status message is displayed
    expect(screen.getByText("Valid username")).toBeInTheDocument();

    // Check that status container has the correct classes
    const statusContainer = screen.getByText("Valid username").closest("div");
    expect(statusContainer).toHaveClass("form-group--info", "info--success");
  });
});
