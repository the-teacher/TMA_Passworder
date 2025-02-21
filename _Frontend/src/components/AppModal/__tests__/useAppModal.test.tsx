import { renderHook, act } from "@testing-library/react";
import { useAppModal } from "../hooks/useAppModal";

describe("useAppModal", () => {
  const createPortalRoot = (id: string = "app-modal-root") => {
    const element = document.createElement("div");
    element.setAttribute("id", id);
    document.body.appendChild(element);
    return element;
  };

  const cleanupPortals = () => {
    document
      .querySelectorAll("[id$=modal-root], [id=custom-container]")
      .forEach((el) => {
        if (el.parentNode) {
          el.parentNode.removeChild(el);
        }
      });
  };

  beforeEach(() => {
    cleanupPortals(); // Ensure clean state
    createPortalRoot(); // Just call without assignment
  });

  afterEach(() => {
    cleanupPortals();
  });

  const defaultOptions = {
    title: "Test Modal",
    children: <div>Modal Content</div>
  };

  it("returns open, close and modal functions", () => {
    const { result } = renderHook(() => useAppModal(defaultOptions));

    expect(result.current).toHaveProperty("open");
    expect(result.current).toHaveProperty("close");
    expect(result.current).toHaveProperty("modal");
  });

  it("initially renders with modal closed", () => {
    const { result } = renderHook(() => useAppModal(defaultOptions));
    expect(result.current.modal).toBeNull();
  });

  it("opens and closes modal", () => {
    const { result } = renderHook(() => useAppModal(defaultOptions));

    act(() => {
      result.current.open();
    });
    expect(result.current.modal).not.toBeNull();

    act(() => {
      result.current.close();
    });
    expect(result.current.modal).toBeNull();
  });

  it("uses custom container id", () => {
    cleanupPortals(); // Clean before test
    const customId = "custom-modal-root";
    renderHook(() => useAppModal({ ...defaultOptions, containerId: customId }));

    expect(document.getElementById(customId)).toBeInTheDocument();
  });

  it("uses custom container element", () => {
    cleanupPortals(); // Clean before test
    const customElement = document.createElement("div");
    customElement.setAttribute("id", "custom-container");
    document.body.appendChild(customElement);

    renderHook(() =>
      useAppModal({ ...defaultOptions, containerElement: customElement })
    );

    // Verify that default container was not created
    const defaultContainer = document.getElementById("app-modal-root");
    expect(defaultContainer).not.toBeInTheDocument();
  });

  it("supports render function as children", () => {
    const { result } = renderHook(() =>
      useAppModal({
        title: "Test",
        children: ({ close }) => (
          <button onClick={close}>Close from children</button>
        )
      })
    );

    act(() => {
      result.current.open();
    });
    expect(result.current.modal).not.toBeNull();
  });
});
