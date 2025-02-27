import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import CreatePasswordEntryForm from "../CreatePasswordEntryForm";
import { useSubmitForm } from "../hooks/useSubmitForm";
import EventEmitter from "@lib/EventEmitter";
import { validationSchema } from "../validationSchema";
import type { ServerErrors } from "../utils/getFieldStatus";

// Mock dependencies
jest.mock("react-hook-form", () => ({
  useForm: jest.fn(),
  FormProvider: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  )
}));

jest.mock("@hookform/resolvers/zod", () => ({
  zodResolver: jest.fn()
}));

jest.mock("react-i18next", () => ({
  useTranslation: jest.fn()
}));

jest.mock("../hooks/useSubmitForm", () => ({
  useSubmitForm: jest.fn()
}));

jest.mock("@lib/EventEmitter", () => ({
  emit: jest.fn()
}));

jest.mock("../validationSchema", () => ({
  validationSchema: {}
}));

jest.mock("react-router", () => ({
  useParams: () => ({ id: "test-id" })
}));

jest.mock("../CreatePasswordEntryFormView", () => ({
  __esModule: true,
  default: ({ onSubmit }: { onSubmit: () => void }) => (
    <form data-testid="password-entry-form" onSubmit={onSubmit}>
      <button type="submit">Submit</button>
    </form>
  )
}));

jest.mock("../components/FormError/FormError", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="form-error">{children}</div>
  )
}));

describe("CreatePasswordEntryForm", () => {
  const mockReset = jest.fn();
  const mockSetError = jest.fn();
  const mockHandleSubmit = jest.fn();
  const mockSubmitForm = jest.fn();
  const mockTranslate = jest.fn((key) => key);
  const mockEntryId = "test-id";

  beforeEach(() => {
    jest.clearAllMocks();

    // Setup useForm mock
    (useForm as jest.Mock).mockReturnValue({
      handleSubmit: mockHandleSubmit.mockImplementation((callback) => {
        return (e: React.FormEvent) => {
          e?.preventDefault?.();
          return callback({ serviceName: "Test Service" });
        };
      }),
      reset: mockReset,
      setError: mockSetError,
      formState: { errors: {} }
    });

    // Setup useTranslation mock
    (useTranslation as jest.Mock).mockReturnValue({
      t: mockTranslate
    });

    // Setup useSubmitForm mock
    (useSubmitForm as jest.Mock).mockReturnValue({
      submitForm: mockSubmitForm,
      formError: "",
      isSubmitting: false
    });

    // Setup zodResolver mock
    (zodResolver as jest.Mock).mockReturnValue(() => ({ values: {} }));
  });

  it("renders the form with title", () => {
    render(<CreatePasswordEntryForm />);

    expect(screen.getByText("title")).toBeInTheDocument();
    expect(screen.getByTestId("password-entry-form")).toBeInTheDocument();
  });

  it("initializes form with correct configuration", () => {
    render(<CreatePasswordEntryForm />);

    expect(useForm).toHaveBeenCalledWith({
      mode: "onChange",
      reValidateMode: "onChange",
      criteriaMode: "all",
      resolver: expect.any(Function),
      defaultValues: {
        serviceName: "",
        username: "",
        password: "",
        serviceUrl: "",
        notes: ""
      }
    });

    expect(zodResolver).toHaveBeenCalledWith(validationSchema);
  });

  it("submits the form with correct data", async () => {
    render(<CreatePasswordEntryForm />);

    fireEvent.submit(screen.getByTestId("password-entry-form"));

    expect(mockHandleSubmit).toHaveBeenCalled();
    expect(mockSubmitForm).toHaveBeenCalledWith(
      mockEntryId,
      { serviceName: "Test Service" },
      expect.any(Function),
      expect.any(Function)
    );
  });

  it("handles successful form submission", async () => {
    // Setup submitForm to call success callback
    mockSubmitForm.mockImplementation((_id, _data, onSuccess) => {
      onSuccess();
    });

    render(<CreatePasswordEntryForm />);

    fireEvent.submit(screen.getByTestId("password-entry-form"));

    await waitFor(() => {
      expect(EventEmitter.emit).toHaveBeenCalledWith(
        "NOTIFICATION",
        "messages.formSubmitted"
      );
      expect(mockReset).toHaveBeenCalled();
    });
  });

  it("displays form error when present", async () => {
    // Setup useState to return form error
    jest
      .spyOn(React, "useState")
      .mockImplementationOnce(() => ["Server error", jest.fn()]);

    render(<CreatePasswordEntryForm />);

    expect(screen.getByTestId("form-error")).toHaveTextContent("Server error");
  });

  it("handles server validation errors", async () => {
    const serverErrors: ServerErrors = {
      form_error: "Form has errors",
      errors: {
        serviceName: { message: "Service name is required" }
      }
    };

    // Setup submitForm to call error callback
    mockSubmitForm.mockImplementation((_id, _data, _onSuccess, onError) => {
      onError(serverErrors);
    });

    render(<CreatePasswordEntryForm />);

    fireEvent.submit(screen.getByTestId("password-entry-form"));

    await waitFor(() => {
      expect(mockSetError).toHaveBeenCalledWith("serviceName", {
        type: "server",
        message: "Service name is required"
      });
    });
  });
});
