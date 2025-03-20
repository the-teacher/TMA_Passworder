import { render, screen } from "@testing-library/react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import ServiceNameInput from "../ServiceNameInput";
import { getFieldStatus } from "@utils/forms";

jest.mock("react-hook-form", () => ({
  useFormContext: jest.fn()
}));

jest.mock("react-i18next", () => ({
  useTranslation: jest.fn()
}));

// Mock getFieldStatus at file level
jest.mock("@utils/forms/getFieldStatus", () => ({
  getFieldStatus: jest.fn().mockReturnValue({
    className: "info--success",
    message: "Valid service name"
  })
}));

describe("ServiceNameInput", () => {
  const mockSetValue = jest.fn();
  const mockRegister = jest.fn().mockReturnValue({});
  const mockWatch = jest.fn().mockReturnValue("test-service");

  const mockTranslation = {
    t: jest.fn((key: "fields.serviceName") => {
      const translations = {
        "fields.serviceName": "Service Name"
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

  it("renders service name input with label", () => {
    render(<ServiceNameInput />);

    const input = screen.getByTestId("service-name-input");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("type", "text");
  });

  it("registers service name field with form context", () => {
    render(<ServiceNameInput />);

    expect(mockRegister).toHaveBeenCalledWith("serviceName", {
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
          serviceName: { type: "required", message: "Service name is required" }
        },
        dirtyFields: {}
      }
    });

    render(<ServiceNameInput />);

    const input = screen.getByTestId("service-name-input");
    expect(input).toHaveAttribute("aria-invalid", "true");
  });

  it("applies correct CSS classes", () => {
    render(<ServiceNameInput />);

    const input = screen.getByTestId("service-name-input");
    expect(input).toHaveClass("form-input");
    expect(screen.getByText("Service Name").closest("label")).toHaveClass(
      "form-group--label"
    );
  });

  it("displays field status message", () => {
    render(<ServiceNameInput />);

    // Check that getFieldStatus was called
    expect(getFieldStatus).toHaveBeenCalled();

    // Check that status message is displayed
    expect(screen.getByText("Valid service name")).toBeInTheDocument();

    // Check that status container has the correct classes
    const statusContainer = screen
      .getByText("Valid service name")
      .closest("div");
    expect(statusContainer).toHaveClass("form-group--info", "info--success");
  });
});
