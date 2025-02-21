import { renderHook } from "@testing-library/react";
import { useBodyScrollLock } from "../hooks/useBodyScrollLock";

describe("useBodyScrollLock", () => {
  const originalStyle = document.body.style.overflow;

  afterEach(() => {
    document.body.style.overflow = originalStyle;
  });

  it("locks body scroll when isLocked is true", () => {
    renderHook(() => useBodyScrollLock(true));
    expect(document.body.style.overflow).toBe("hidden");
  });

  it("unlocks body scroll when isLocked is false", () => {
    renderHook(() => useBodyScrollLock(false));
    expect(document.body.style.overflow).toBe("auto");
  });

  it("restores original overflow on unmount", () => {
    const { unmount } = renderHook(() => useBodyScrollLock(true));
    expect(document.body.style.overflow).toBe("hidden");

    unmount();
    expect(document.body.style.overflow).toBe("auto");
  });

  it("handles multiple instances correctly", () => {
    const { unmount: unmount1 } = renderHook(() => useBodyScrollLock(true));
    const { unmount: unmount2 } = renderHook(() => useBodyScrollLock(true));

    expect(document.body.style.overflow).toBe("hidden");

    unmount1();
    expect(document.body.style.overflow).toBe("auto");

    unmount2();
    expect(document.body.style.overflow).toBe("auto");
  });
});
