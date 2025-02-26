import { render, screen } from "@testing-library/react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import ServiceUrlInput from "../ServiceUrlInput";
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
    message: "Valid URL"
  })
}));

describe("ServiceUrlInput", () => {
  const mockSetValue = jest.fn();
  const mockRegister = jest.fn().mockReturnValue({});
  const mockWatch = jest.fn().mockReturnValue("https://example.com");

  const mockTranslation = {
    t: jest.fn((key: "fields.url") => {
      const translations = {
        "fields.url": "URL"
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

  it("renders service URL input with label", () => {
    render(<ServiceUrlInput />);

    const input = screen.getByLabelText("URL");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("type", "url");
    expect(input).toHaveAttribute("placeholder", "https://");
  });

  it("registers serviceUrl field with form context", () => {
    render(<ServiceUrlInput />);

    expect(mockRegister).toHaveBeenCalledWith("serviceUrl", {
      onChange: expect.any(Function),
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
          serviceUrl: { type: "pattern", message: "Invalid URL format" }
        },
        dirtyFields: {}
      }
    });

    render(<ServiceUrlInput />);

    const input = screen.getByLabelText("URL");
    expect(input).toHaveAttribute("aria-invalid", "true");
  });

  it("applies correct CSS classes", () => {
    render(<ServiceUrlInput />);

    const input = screen.getByLabelText("URL");
    expect(input).toHaveClass("form-input");
    expect(screen.getByText("URL").closest("label")).toHaveClass(
      "form-group--label"
    );
  });

  it("displays field status message", () => {
    render(<ServiceUrlInput />);

    // Check that getFieldStatus was called
    expect(getFieldStatus).toHaveBeenCalled();

    // Check that status message is displayed
    expect(screen.getByText("Valid URL")).toBeInTheDocument();

    // Check that status container has the correct classes
    const statusContainer = screen.getByText("Valid URL").closest("div");
    expect(statusContainer).toHaveClass("form-group--info", "info--success");
  });

  it("handles null value in watch", () => {
    // Test with null value from watch
    (mockWatch as jest.Mock).mockReturnValueOnce(null);

    render(<ServiceUrlInput />);

    // Should still call getFieldStatus with empty string
    expect(getFieldStatus).toHaveBeenCalledWith(
      "serviceUrl",
      "",
      expect.anything(),
      expect.anything(),
      expect.anything()
    );
  });
});
