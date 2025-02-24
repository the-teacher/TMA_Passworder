import { renderHook, act } from "@testing-library/react";
import { useDebounce } from "../useDebounce";

describe("useDebounce", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("should debounce callback execution", () => {
    const callback = jest.fn();
    const delay = 500;

    const { result } = renderHook(() => useDebounce(callback, delay));
    const debouncedFn = result.current;

    // First call
    act(() => {
      debouncedFn("test1");
    });
    expect(callback).not.toHaveBeenCalled();

    // Second call before delay
    act(() => {
      debouncedFn("test2");
    });
    expect(callback).not.toHaveBeenCalled();

    // Advance timer by delay
    act(() => {
      jest.advanceTimersByTime(delay);
    });

    // Callback should be called once with latest value
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith("test2");
  });

  it("should clear previous timeout on new call", () => {
    const callback = jest.fn();
    const delay = 500;

    const { result } = renderHook(() => useDebounce(callback, delay));
    const debouncedFn = result.current;

    // First call
    act(() => {
      debouncedFn("test1");
    });

    // Advance timer partially
    act(() => {
      jest.advanceTimersByTime(200);
    });

    // Second call
    act(() => {
      debouncedFn("test2");
    });

    // Advance timer to first call's delay
    act(() => {
      jest.advanceTimersByTime(300);
    });

    // Callback should not be called yet
    expect(callback).not.toHaveBeenCalled();

    // Advance timer to second call's delay
    act(() => {
      jest.advanceTimersByTime(200);
    });

    // Callback should be called once with latest value
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith("test2");
  });

  it("should maintain callback reference", () => {
    const callback = jest.fn();
    const delay = 500;

    const { result, rerender } = renderHook(
      (props) => useDebounce(props.callback, props.delay),
      {
        initialProps: { callback, delay }
      }
    );

    const initialDebouncedFn = result.current;

    // Rerender with same props
    rerender({ callback, delay });

    // Function reference should be the same
    expect(result.current).toBe(initialDebouncedFn);
  });
});
