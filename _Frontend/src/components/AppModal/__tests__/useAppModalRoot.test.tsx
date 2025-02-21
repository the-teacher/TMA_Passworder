import { renderHook } from "@testing-library/react";
import { useAppModalRoot } from "../hooks/useAppModalRoot";

describe("useAppModalRoot", () => {
  const cleanupElements = () => {
    document.querySelectorAll("[id$=modal-root]").forEach((el) => {
      el.parentNode?.removeChild(el);
    });
  };

  beforeEach(() => {
    cleanupElements();
  });

  afterEach(() => {
    cleanupElements();
  });

  it("creates default modal root element", () => {
    const { result } = renderHook(() => useAppModalRoot());

    expect(result.current).toBeInstanceOf(HTMLElement);
    expect(result.current?.id).toBe("app-modal-root");
    expect(document.getElementById("app-modal-root")).toBe(result.current);
  });

  it("uses custom container id", () => {
    const customId = "custom-modal-root";
    const { result } = renderHook(() =>
      useAppModalRoot({ containerId: customId })
    );

    expect(result.current?.id).toBe(customId);
    expect(document.getElementById(customId)).toBe(result.current);
  });

  it("uses provided container element", () => {
    const customElement = document.createElement("div");
    customElement.id = "custom-element";
    document.body.appendChild(customElement);

    const { result } = renderHook(() =>
      useAppModalRoot({ containerElement: customElement })
    );

    expect(result.current).toBe(customElement);
    expect(document.getElementById("app-modal-root")).not.toBeInTheDocument();

    document.body.removeChild(customElement);
  });

  it("removes created element on unmount", () => {
    const { unmount } = renderHook(() => useAppModalRoot());

    expect(document.getElementById("app-modal-root")).toBeInTheDocument();

    unmount();
    expect(document.getElementById("app-modal-root")).not.toBeInTheDocument();
  });

  it("doesn't remove provided container element on unmount", () => {
    const customElement = document.createElement("div");
    customElement.id = "custom-element";
    document.body.appendChild(customElement);

    const { unmount } = renderHook(() =>
      useAppModalRoot({ containerElement: customElement })
    );

    unmount();
    expect(customElement).toBeInTheDocument();

    document.body.removeChild(customElement);
  });

  it("reuses existing element with same id", () => {
    const existingElement = document.createElement("div");
    existingElement.id = "app-modal-root";
    document.body.appendChild(existingElement);

    const { result } = renderHook(() => useAppModalRoot());

    expect(result.current).toBe(existingElement);
    expect(document.querySelectorAll("#app-modal-root")).toHaveLength(1);
  });
});
