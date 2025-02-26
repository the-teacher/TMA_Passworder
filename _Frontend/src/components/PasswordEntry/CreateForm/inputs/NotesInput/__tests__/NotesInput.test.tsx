import { render, screen } from "@testing-library/react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import NotesInput from "../NotesInput";

jest.mock("react-hook-form", () => ({
  useFormContext: jest.fn()
}));

jest.mock("react-i18next", () => ({
  useTranslation: jest.fn()
}));

describe("NotesInput", () => {
  const mockSetValue = jest.fn();
  const mockRegister = jest.fn().mockReturnValue({});
  const mockTranslation = {
    t: jest.fn((key: "fields.notes") => {
      const translations = {
        "fields.notes": "Notes"
      };
      return translations[key];
    })
  };

  beforeEach(() => {
    (useFormContext as jest.Mock).mockReturnValue({
      register: mockRegister,
      setValue: mockSetValue,
      formState: {
        errors: {}
      }
    });

    (useTranslation as jest.Mock).mockReturnValue(mockTranslation);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders notes textarea with label", () => {
    render(<NotesInput />);

    expect(screen.getByLabelText("Notes")).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toHaveAttribute("rows", "4");
  });

  it("registers notes field with form context", () => {
    render(<NotesInput />);

    expect(mockRegister).toHaveBeenCalledWith("notes", {
      onBlur: expect.any(Function)
    });
  });

  it("marks textarea as invalid when there are errors", () => {
    (useFormContext as jest.Mock).mockReturnValue({
      register: mockRegister,
      setValue: mockSetValue,
      formState: {
        errors: {
          notes: { type: "required", message: "Notes is required" }
        }
      }
    });

    render(<NotesInput />);

    expect(screen.getByRole("textbox")).toHaveAttribute("aria-invalid", "true");
  });

  it("applies correct CSS classes", () => {
    render(<NotesInput />);

    expect(screen.getByRole("textbox")).toHaveClass("form-input");
    expect(screen.getByText("Notes").closest("label")).toHaveClass(
      "form-group--label"
    );
  });
});
