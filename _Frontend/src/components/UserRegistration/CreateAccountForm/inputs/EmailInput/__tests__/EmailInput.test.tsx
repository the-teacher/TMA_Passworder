import { render, screen } from "@testing-library/react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import EmailInput from "../EmailInput";
import { getFieldStatus } from "@utils/forms";

// Mock dependencies
jest.mock("react-hook-form", () => ({
  useFormContext: jest.fn()
}));

jest.mock("react-i18next", () => ({
  useTranslation: jest.fn()
}));

jest.mock("@utils/forms/getFieldStatus", () => ({
  getFieldStatus: jest.fn()
}));

describe("EmailInput", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    // Setup useFormContext mock
    (useFormContext as jest.Mock).mockReturnValue({
      register: jest.fn().mockReturnValue({}),
      setValue: jest.fn(),
      formState: { errors: {}, dirtyFields: {} },
      watch: jest.fn().mockReturnValue("test@example.com")
    });

    // Setup useTranslation mock
    (useTranslation as jest.Mock).mockReturnValue({
      t: (key: string) => {
        const translations: Record<string, string> = {
          "fields.email": "Email Address",
          "placeholders.email": "your.email@example.com",
          "validation.generic.valid": "Valid email",
          "validation.generic.error": "Invalid email"
        };
        return translations[key] || key;
      }
    });

    // Setup getFieldStatus mock
    (getFieldStatus as jest.Mock).mockReturnValue({
      className: "",
      inputClassName: "",
      message: ""
    });
  });

  it("renders email input correctly", () => {
    render(<EmailInput />);

    const emailInput = screen.getByTestId("email-input");
    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveAttribute("type", "email");
    expect(emailInput).toHaveAttribute("placeholder", "your.email@example.com");
    expect(emailInput).toHaveAttribute("autocomplete", "email");
  });

  it("displays success state when field is valid", () => {
    (getFieldStatus as jest.Mock).mockReturnValue({
      className: "form-group--success",
      inputClassName: "form-input--success",
      message: "Valid email"
    });

    render(<EmailInput />);

    expect(screen.getByText("Valid email")).toBeInTheDocument();
    expect(screen.getByTestId("email-input")).toHaveClass(
      "form-input--success"
    );
  });

  it("displays error state when field has error", () => {
    const errorMessage = "Invalid email format";

    (getFieldStatus as jest.Mock).mockReturnValue({
      className: "form-group--error",
      inputClassName: "form-input--error",
      message: errorMessage
    });

    render(<EmailInput />);

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
    expect(screen.getByTestId("email-input")).toHaveClass("form-input--error");
  });
});
