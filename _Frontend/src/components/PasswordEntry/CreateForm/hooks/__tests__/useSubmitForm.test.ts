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

// Mock useNavigate
const mockNavigate = jest.fn();
jest.mock("react-router", () => ({
  useNavigate: () => mockNavigate
}));

describe("useSubmitForm", () => {
  const mockData = {
    serviceName: "test",
    username: "user",
    password: "pass123"
  };
  const mockEntryId = "entry-123";

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("should handle successful submission", async () => {
    const onSuccess = jest.fn();
    const onError = jest.fn();
    (submitPasswordEntry as jest.Mock).mockResolvedValue({ success: true });

    const { result } = renderHook(() => useSubmitForm());

    await act(async () => {
      result.current.submitForm(mockEntryId, mockData, onSuccess, onError);
      // Resolve all promises
      await Promise.resolve();
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
      result.current.submitForm(mockEntryId, mockData, onSuccess, onError);
      // Resolve all promises
      await Promise.resolve();
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
      result.current.submitForm(mockEntryId, mockData, onSuccess, onError);
      // Resolve all promises
      await Promise.resolve();
    });

    expect(EventEmitter.emit).toHaveBeenCalledWith("ERROR", `Error: ${error}`);
    expect(result.current.formError).toBe(`Error: ${error}`);
    expect(result.current.isSubmitting).toBe(false);
    expect(onSuccess).not.toHaveBeenCalled();
    expect(onError).not.toHaveBeenCalled();
  });

  it("should manage loading state correctly", async () => {
    // Mock submitPasswordEntry to return a promise that doesn't resolve immediately
    (submitPasswordEntry as jest.Mock).mockImplementation(
      () =>
        new Promise((resolve) => {
          setTimeout(() => resolve({ success: true }), 50);
        })
    );

    const { result } = renderHook(() => useSubmitForm());

    // Start the submission
    act(() => {
      result.current.submitForm(mockEntryId, mockData, jest.fn(), jest.fn());
    });

    // Check that isSubmitting is true immediately after starting
    expect(result.current.isSubmitting).toBe(true);

    // Fast-forward time to resolve the promise
    await act(async () => {
      jest.advanceTimersByTime(100);
      // Allow any pending promises to resolve
      await Promise.resolve();
    });

    // Check that isSubmitting is false after the promise resolves
    expect(result.current.isSubmitting).toBe(false);
  });

  it("should navigate to show password entry page after submission", async () => {
    const onSuccess = jest.fn();
    const onError = jest.fn();
    (submitPasswordEntry as jest.Mock).mockResolvedValue({ success: true });

    const { result } = renderHook(() => useSubmitForm());

    await act(async () => {
      result.current.submitForm(mockEntryId, mockData, onSuccess, onError);
      // Resolve all promises
      await Promise.resolve();
    });

    // Fast-forward timer to trigger navigation
    act(() => {
      jest.advanceTimersByTime(2000);
    });

    // Check if navigate was called with the correct path
    expect(mockNavigate).toHaveBeenCalled();
  });
});
