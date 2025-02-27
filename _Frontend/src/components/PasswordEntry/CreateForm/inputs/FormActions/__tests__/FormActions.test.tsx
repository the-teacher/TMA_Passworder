import { render, screen, fireEvent } from "@testing-library/react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useAppModal } from "@components/AppModal";
import FormActions from "../FormActions";

jest.mock("react-hook-form", () => ({
  useFormContext: jest.fn()
}));

jest.mock("react-i18next", () => ({
  useTranslation: jest.fn()
}));

jest.mock("@components/AppModal", () => ({
  useAppModal: jest.fn()
}));

describe("FormActions", () => {
  const mockReset = jest.fn();
  const mockClose = jest.fn();
  const mockOpen = jest.fn();

  // Mock translations
  const commonTranslations = {
    reset: "Reset",
    saving: "Saving..."
  };

  const formTranslations = {
    "actions.save": "Save",
    "modals.resetForm.title": "Reset Form",
    "modals.resetForm.message": "Are you sure?",
    "modals.resetForm.cancel": "Cancel",
    "modals.resetForm.confirm": "Confirm"
  };

  beforeEach(() => {
    jest.clearAllMocks();

    // Mock form context
    (useFormContext as jest.Mock).mockReturnValue({
      formState: {
        isValid: true,
        isSubmitting: false
      },
      reset: mockReset
    });

    // Mock translations
    (useTranslation as jest.Mock).mockImplementation((ns) => {
      if (ns === "common") {
        return {
          t: (key: string) =>
            commonTranslations[key as keyof typeof commonTranslations] || key
        };
      }
      return {
        t: (key: string) =>
          formTranslations[key as keyof typeof formTranslations] || key
      };
    });

    // Mock modal
    (useAppModal as jest.Mock).mockReturnValue({
      open: mockOpen,
      modal: <div data-testid="reset-modal">Modal Content</div>,
      close: mockClose
    });
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

  it("opens confirmation modal when clicking reset button", () => {
    render(<FormActions />);

    fireEvent.click(screen.getByRole("button", { name: "Reset" }));
    expect(mockOpen).toHaveBeenCalledTimes(1);
    expect(screen.getByTestId("reset-modal")).toBeInTheDocument();
  });

  it("doesn't show reset button for Edit form type", () => {
    render(<FormActions formType="Edit" />);

    expect(screen.getByRole("button", { name: "Save" })).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Reset" })
    ).not.toBeInTheDocument();
  });
});
