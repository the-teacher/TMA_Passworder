import { render, screen, fireEvent } from "@testing-library/react";
import CreatePasswordEntryFormView from "../CreatePasswordEntryFormView";
import type { Props } from "../CreatePasswordEntryFormView";
import type {
  UseFormRegister,
  UseFormRegisterReturn,
  ChangeHandler,
  UseFormSetValue
} from "react-hook-form";
import type { FormData } from "../validationSchema";

// Mock sub-components
jest.mock("../components/EyeIcon", () => ({
  __esModule: true,
  default: jest.fn(() => <div data-testid="eye-icon">Eye Icon</div>)
}));

jest.mock("../components/CopyButton", () => ({
  __esModule: true,
  default: jest.fn(() => <div data-testid="copy-button">Copy Button</div>)
}));

jest.mock("../components/GenerateButton", () => ({
  __esModule: true,
  default: jest.fn(() => (
    <div data-testid="generate-button">Generate Button</div>
  ))
}));

jest.mock("../components/FormError", () => ({
  __esModule: true,
  default: jest.fn(({ children }) => (
    <div data-testid="form-error">{children}</div>
  ))
}));

// Mock getFieldStatus utility
jest.mock("../utils/getFieldStatus", () => ({
  getFieldStatus: jest.fn(() => ({
    message: "Test message",
    className: "test-class"
  }))
}));

// Mock i18next
jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { changeLanguage: jest.fn() }
  })
}));

describe("CreatePasswordEntryFormView", () => {
  // Создаем мок для register с правильными типами
  const createRegisterMock = (props: Partial<Props>) => {
    return jest.fn((name: keyof FormData) => {
      const handler = {
        name,
        ref: jest.fn(),
        onChange: (async (event: any) => {
          // Создаем правильный объект события
          const syntheticEvent = {
            ...event,
            preventDefault: () => {},
            stopPropagation: () => {},
            nativeEvent: new Event("change"),
            currentTarget: event.target,
            target: event.target,
            bubbles: true,
            cancelable: true,
            defaultPrevented: false,
            isDefaultPrevented: () => false,
            isPropagationStopped: () => false,
            isTrusted: true,
            persist: () => {},
            timeStamp: Date.now(),
            type: "change"
          };

          if (name === "serviceName") {
            props.handleSpaces?.(syntheticEvent);
          }
          if (name === "password" || name === "serviceUrl") {
            props.handleNoSpaces?.(syntheticEvent);
          }
          return true;
        }) as ChangeHandler,
        onBlur: (async (event: any) => {
          // Создаем правильный объект события для blur
          const syntheticEvent = {
            ...event,
            preventDefault: () => {},
            stopPropagation: () => {},
            nativeEvent: new Event("blur"),
            currentTarget: event.target,
            target: event.target,
            relatedTarget: null,
            bubbles: true,
            cancelable: true,
            defaultPrevented: false,
            isDefaultPrevented: () => false,
            isPropagationStopped: () => false,
            isTrusted: true,
            persist: () => {},
            timeStamp: Date.now(),
            type: "blur"
          };

          props.handleTrim?.(syntheticEvent);
          return true;
        }) as ChangeHandler
      };
      return handler as unknown as UseFormRegisterReturn<keyof FormData>;
    }) as unknown as UseFormRegister<FormData>;
  };

  const defaultProps: Props = {
    register: jest.fn() as UseFormRegister<FormData>,
    setValue: jest.fn() as UseFormSetValue<FormData>,
    errors: {},
    watch: jest.fn(),
    dirtyFields: {},
    isValid: true,
    isSubmitting: false,
    showPassword: false,
    formError: "",
    handleSpaces: jest.fn(),
    handleTrim: jest.fn(),
    handleNoSpaces: jest.fn(),
    onTogglePassword: jest.fn(),
    onGeneratePassword: jest.fn(),
    onCopyPassword: jest.fn(),
    onSubmit: jest.fn(),
    onReset: jest.fn()
  };

  const renderComponent = (props: Partial<Props> = {}) => {
    const mergedProps = { ...defaultProps, ...props };
    // Используем новый мок для register
    mergedProps.register = createRegisterMock(mergedProps);
    return render(<CreatePasswordEntryFormView {...mergedProps} />);
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders form with all fields", () => {
    renderComponent();

    expect(screen.getByRole("heading")).toHaveTextContent("title");
    expect(screen.getByLabelText(/fields.serviceName/)).toBeInTheDocument();
    expect(screen.getByLabelText(/fields.username/)).toBeInTheDocument();
    expect(screen.getByLabelText(/fields.url/)).toBeInTheDocument();
    expect(screen.getByLabelText(/fields.password/)).toBeInTheDocument();
    expect(screen.getByLabelText(/fields.notes/)).toBeInTheDocument();
  });

  it("renders all buttons", () => {
    renderComponent();

    expect(screen.getByTestId("eye-icon")).toBeInTheDocument();
    expect(screen.getByTestId("copy-button")).toBeInTheDocument();
    expect(screen.getByTestId("generate-button")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /save/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /reset/i })).toBeInTheDocument();
  });

  it("shows form error when provided", () => {
    const formError = "Test error message";
    renderComponent({ formError });

    expect(screen.getByTestId("form-error")).toHaveTextContent(formError);
  });

  it("shows saving state when submitting", () => {
    renderComponent({ isSubmitting: true });

    expect(screen.getByRole("button", { name: /saving/i })).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /save/i })
    ).not.toBeInTheDocument();
  });

  it("renders password field based on showPassword prop", () => {
    const { rerender } = renderComponent({ showPassword: false });
    const passwordInput = screen.getByLabelText(
      /fields.password/
    ) as HTMLInputElement;

    expect(passwordInput.type).toBe("password");

    rerender(
      <CreatePasswordEntryFormView {...defaultProps} showPassword={true} />
    );
    expect(passwordInput.type).toBe("text");
  });

  it("shows field status messages", () => {
    renderComponent();

    const statusMessages = screen.getAllByText("Test message");
    expect(statusMessages).toHaveLength(4);
    statusMessages.forEach((message) => {
      expect(message.className).toMatch(/form-group--info.*test-class/);
    });
  });

  it("handles form submission", () => {
    const onSubmit = jest.fn((e) => e.preventDefault());
    renderComponent({ onSubmit });

    fireEvent.submit(screen.getByRole("create-password-form"));

    expect(onSubmit).toHaveBeenCalled();
  });

  it("handles form reset", () => {
    const onReset = jest.fn();
    renderComponent({ onReset });

    fireEvent.click(screen.getByRole("button", { name: /reset/i }));

    expect(onReset).toHaveBeenCalled();
  });

  it("calls setValue with normalized spaces on serviceName input change", () => {
    const setValue = jest.fn();
    renderComponent({ setValue });

    const input = screen.getByLabelText(/fields.serviceName/);
    fireEvent.change(input, {
      target: { value: "test  spaces", name: "serviceName" }
    });

    expect(setValue).toHaveBeenCalledWith("serviceName", "test spaces", {
      shouldValidate: true
    });
  });

  it("calls handleTrim on serviceName input blur", () => {
    const handleTrim = jest.fn();
    renderComponent({ handleTrim });

    const input = screen.getByLabelText(/fields.serviceName/);
    fireEvent.blur(input, {
      target: { value: "  test  ", name: "serviceName" }
    });

    expect(handleTrim).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({
          value: "  test  ",
          name: "serviceName"
        })
      })
    );
  });

  it("calls handleNoSpaces on password input change", () => {
    const handleNoSpaces = jest.fn();
    renderComponent({ handleNoSpaces });

    const input = screen.getByLabelText(/fields.password/);
    fireEvent.change(input, {
      target: { value: "test spaces", name: "password" }
    });

    expect(handleNoSpaces).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({
          value: "test spaces",
          name: "password"
        })
      })
    );
  });
});
