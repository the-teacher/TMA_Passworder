import { render, screen, fireEvent } from "@testing-library/react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { generatePassword } from "../../../utils/generatePassword";
import { copyToClipboard } from "../../../utils/copyToClipboard";
import PasswordInput from "../PasswordInput";

jest.mock("react-hook-form", () => ({
  useFormContext: jest.fn()
}));

jest.mock("react-i18next", () => ({
  useTranslation: jest.fn()
}));

jest.mock("../../../utils/generatePassword", () => ({
  generatePassword: jest.fn().mockReturnValue("generated-password")
}));

jest.mock("../../../utils/copyToClipboard", () => ({
  copyToClipboard: jest.fn()
}));

describe("PasswordInput", () => {
  const mockSetValue = jest.fn();
  const mockRegister = jest.fn().mockReturnValue({});
  const mockWatch = jest.fn().mockReturnValue("test-password");

  const mockTranslation = {
    t: jest.fn(
      (
        key:
          | "fields.password"
          | "actions.generatePassword"
          | "actions.copyPassword"
      ) => {
        const translations = {
          "fields.password": "Password",
          "actions.generatePassword": "Generate Password",
          "actions.copyPassword": "Copy Password"
        };
        return translations[key] || key;
      }
    )
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

  it("renders password input with label", () => {
    render(<PasswordInput />);

    const input = screen.getByTestId("password-input");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("type", "password");
  });

  it("toggles password visibility", () => {
    render(<PasswordInput />);

    const input = screen.getByTestId("password-input");
    const toggleButton = screen.getByTestId("toggle-password");

    expect(input).toHaveAttribute("type", "password");
    fireEvent.click(toggleButton);
    expect(input).toHaveAttribute("type", "text");
  });

  it("generates new password", () => {
    render(<PasswordInput />);

    const generateButton = screen.getByTestId("generate-password");
    fireEvent.click(generateButton);

    expect(generatePassword).toHaveBeenCalled();
    expect(mockSetValue).toHaveBeenCalledWith(
      "password",
      "generated-password",
      { shouldValidate: true }
    );
  });

  it("copies password to clipboard", async () => {
    render(<PasswordInput />);

    const copyButton = screen.getByTestId("copy-password");
    await fireEvent.click(copyButton);

    expect(copyToClipboard).toHaveBeenCalledWith("test-password");
  });

  it("marks input as invalid when there are errors", () => {
    (useFormContext as jest.Mock).mockReturnValue({
      register: mockRegister,
      setValue: mockSetValue,
      watch: mockWatch,
      formState: {
        errors: {
          password: { type: "required", message: "Password is required" }
        },
        dirtyFields: {}
      }
    });

    render(<PasswordInput />);

    const input = screen.getByTestId("password-input");
    expect(input).toHaveAttribute("aria-invalid", "true");
  });
});
