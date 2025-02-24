import { renderHook, act } from "@testing-library/react";
import { useSubmitForm } from "../useSubmitForm";
import { submitPasswordEntry } from "../../api/submitPasswordEntry";
import EventEmitter from "@lib/EventEmitter";

// Mock dependencies
jest.mock("../../api/submitPasswordEntry");
jest.mock("@lib/EventEmitter");
jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string, params?: Record<string, unknown>) =>
      params?.error ? `Error: ${params.error}` : key
  })
}));

describe("useSubmitForm", () => {
  const mockData = {
    serviceName: "test",
    username: "user",
    password: "pass123"
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should handle successful submission", async () => {
    const onSuccess = jest.fn();
    const onError = jest.fn();
    (submitPasswordEntry as jest.Mock).mockResolvedValue({ success: true });

    const { result } = renderHook(() => useSubmitForm());

    await act(async () => {
      await result.current.submitForm(mockData, onSuccess, onError);
    });

    expect(submitPasswordEntry).toHaveBeenCalledWith(mockData);
    expect(onSuccess).toHaveBeenCalled();
    expect(onError).not.toHaveBeenCalled();
    expect(result.current.formError).toBe("");
    expect(result.current.isSubmitting).toBe(false);
  });

  it("should handle validation errors", async () => {
    const onSuccess = jest.fn();
    const onError = jest.fn();
    const errors = {
      form_error: "Invalid data",
      errors: { username: { message: "Required" } }
    };
    (submitPasswordEntry as jest.Mock).mockResolvedValue({
      success: false,
      errors
    });

    const { result } = renderHook(() => useSubmitForm());

    await act(async () => {
      await result.current.submitForm(mockData, onSuccess, onError);
    });

    expect(onError).toHaveBeenCalledWith(errors);
    expect(onSuccess).not.toHaveBeenCalled();
    expect(result.current.isSubmitting).toBe(false);
  });

  it("should handle network errors", async () => {
    const onSuccess = jest.fn();
    const onError = jest.fn();
    const error = new Error("Network error");
    (submitPasswordEntry as jest.Mock).mockRejectedValue(error);

    const { result } = renderHook(() => useSubmitForm());

    await act(async () => {
      await result.current.submitForm(mockData, onSuccess, onError);
    });

    expect(EventEmitter.emit).toHaveBeenCalledWith("ERROR", `Error: ${error}`);
    expect(result.current.formError).toBe(`Error: ${error}`);
    expect(result.current.isSubmitting).toBe(false);
    expect(onSuccess).not.toHaveBeenCalled();
    expect(onError).not.toHaveBeenCalled();
  });

  it("should manage loading state correctly", async () => {
    const { result } = renderHook(() => useSubmitForm());
    (submitPasswordEntry as jest.Mock).mockImplementation(
      () => new Promise((resolve) => setTimeout(resolve, 100))
    );

    act(() => {
      result.current.submitForm(mockData, jest.fn(), jest.fn());
    });

    expect(result.current.isSubmitting).toBe(true);

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 150));
    });

    expect(result.current.isSubmitting).toBe(false);
  });
});
