import { renderHook } from "@testing-library/react";
import { useNotifications } from "../useNotifications";
import toastr from "@lib/Toastr";
import EventEmitter from "@lib/EventEmitter";

// Mock dependencies
jest.mock("@lib/Toastr", () => ({
  initialize: jest.fn(),
  success: jest.fn(),
  warning: jest.fn(),
  danger: jest.fn()
}));

jest.mock("@lib/EventEmitter", () => ({
  on: jest.fn(),
  off: jest.fn()
}));

describe("useNotifications", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should initialize toastr and setup event listeners", () => {
    renderHook(() => useNotifications());

    // Check toastr initialization
    expect(toastr.initialize).toHaveBeenCalledWith(".app-header");

    // Check event listeners setup
    expect(EventEmitter.on).toHaveBeenCalledTimes(3);
    expect(EventEmitter.on).toHaveBeenCalledWith(
      "NOTIFICATION",
      expect.any(Function)
    );
    expect(EventEmitter.on).toHaveBeenCalledWith(
      "WARNING",
      expect.any(Function)
    );
    expect(EventEmitter.on).toHaveBeenCalledWith("ERROR", expect.any(Function));
  });

  it("should cleanup event listeners on unmount", () => {
    const { unmount } = renderHook(() => useNotifications());

    unmount();

    // Check event listeners cleanup
    expect(EventEmitter.off).toHaveBeenCalledTimes(3);
    expect(EventEmitter.off).toHaveBeenCalledWith(
      "NOTIFICATION",
      expect.any(Function)
    );
    expect(EventEmitter.off).toHaveBeenCalledWith(
      "WARNING",
      expect.any(Function)
    );
    expect(EventEmitter.off).toHaveBeenCalledWith(
      "ERROR",
      expect.any(Function)
    );
  });

  it("should handle notification events correctly", () => {
    renderHook(() => useNotifications());

    // Get event handlers
    const [[, notificationHandler], [, warningHandler], [, errorHandler]] = (
      EventEmitter.on as jest.Mock
    ).mock.calls;

    // Simulate events
    notificationHandler("Success message");
    warningHandler("Warning message");
    errorHandler("Error message");

    // Check toastr calls
    expect(toastr.success).toHaveBeenCalledWith("Success message");
    expect(toastr.warning).toHaveBeenCalledWith("Warning message");
    expect(toastr.danger).toHaveBeenCalledWith("Error message");
  });
});
