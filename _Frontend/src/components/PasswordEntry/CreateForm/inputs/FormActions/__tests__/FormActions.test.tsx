import { render, screen, fireEvent } from "@testing-library/react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import FormActions from "../FormActions";

jest.mock("react-hook-form", () => ({
  useFormContext: jest.fn()
}));

jest.mock("react-i18next", () => ({
  useTranslation: jest.fn()
}));

describe("FormActions", () => {
  const mockReset = jest.fn();
  const mockTranslation = {
    t: jest.fn((key: "save" | "saving" | "reset") => {
      const translations = {
        save: "Save",
        saving: "Saving...",
        reset: "Reset"
      };
      return translations[key];
    })
  };

  beforeEach(() => {
    (useFormContext as jest.Mock).mockReturnValue({
      formState: {
        isValid: true,
        isSubmitting: false
      },
      reset: mockReset
    });

    (useTranslation as jest.Mock).mockReturnValue(mockTranslation);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders submit and reset buttons", () => {
    render(<FormActions />);

    expect(screen.getByRole("button", { name: "Save" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Reset" })).toBeInTheDocument();
  });

  it("disables submit button when form is invalid", () => {
    (useFormContext as jest.Mock).mockReturnValue({
      formState: {
        isValid: false,
        isSubmitting: false
      },
      reset: mockReset
    });

    render(<FormActions />);

    expect(screen.getByRole("button", { name: "Save" })).toBeDisabled();
  });

  it("disables submit button and shows loading state when submitting", () => {
    (useFormContext as jest.Mock).mockReturnValue({
      formState: {
        isValid: true,
        isSubmitting: true
      },
      reset: mockReset
    });

    render(<FormActions />);

    const submitButton = screen.getByRole("button", { name: "Saving..." });
    expect(submitButton).toBeDisabled();
  });

  it("calls reset when clicking reset button", () => {
    render(<FormActions />);

    fireEvent.click(screen.getByRole("button", { name: "Reset" }));
    expect(mockReset).toHaveBeenCalledTimes(1);
  });
});
