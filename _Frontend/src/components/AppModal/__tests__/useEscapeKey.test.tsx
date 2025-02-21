import { renderHook } from "@testing-library/react";
import { useEscapeKey } from "../hooks/useEscapeKey";

describe("useEscapeKey", () => {
  const mockCallback = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("adds event listener when active", () => {
    const addEventListenerSpy = jest.spyOn(document, "addEventListener");
    renderHook(() => useEscapeKey(mockCallback, true));

    expect(addEventListenerSpy).toHaveBeenCalledWith(
      "keydown",
      expect.any(Function)
    );
  });

  it("removes event listener when inactive", () => {
    const removeEventListenerSpy = jest.spyOn(document, "removeEventListener");
    const { unmount } = renderHook(() => useEscapeKey(mockCallback, true));

    unmount();
    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "keydown",
      expect.any(Function)
    );
  });

  it("calls callback on Escape key press", () => {
    renderHook(() => useEscapeKey(mockCallback, true));

    const escapeEvent = new KeyboardEvent("keydown", { key: "Escape" });
    document.dispatchEvent(escapeEvent);

    expect(mockCallback).toHaveBeenCalled();
  });

  it("doesn't call callback on other key press", () => {
    renderHook(() => useEscapeKey(mockCallback, true));

    const enterEvent = new KeyboardEvent("keydown", { key: "Enter" });
    document.dispatchEvent(enterEvent);

    expect(mockCallback).not.toHaveBeenCalled();
  });

  it("doesn't add listener when inactive", () => {
    const addEventListenerSpy = jest.spyOn(document, "addEventListener");
    renderHook(() => useEscapeKey(mockCallback, false));

    expect(addEventListenerSpy).not.toHaveBeenCalled();
  });
});
