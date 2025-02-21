import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { AppModal } from "../AppModal";

describe("AppModal", () => {
  const mockClose = jest.fn();
  let portalRoot: HTMLElement;
  let defaultProps: {
    title: string;
    children: React.ReactNode;
    close: () => void;
    portalElement: HTMLElement;
  };

  beforeEach(() => {
    // Create portal root element and add to body
    portalRoot = document.createElement("div");
    portalRoot.setAttribute("id", "portal-root");
    document.body.appendChild(portalRoot);

    defaultProps = {
      title: "Test Modal",
      children: <div>Modal Content</div>,
      close: mockClose,
      portalElement: portalRoot
    };

    jest.clearAllMocks();
  });

  afterEach(() => {
    cleanup(); // Cleanup after each test
    if (portalRoot.parentNode) {
      portalRoot.parentNode.removeChild(portalRoot);
    }
  });

  const renderModal = (props = {}) => {
    cleanup(); // Ensure clean DOM before each render
    return render(<AppModal {...defaultProps} {...props} />);
  };

  it("renders modal with title and content", () => {
    renderModal();

    expect(
      screen.getByRole("heading", { name: "Test Modal" })
    ).toBeInTheDocument();
    expect(screen.getByText("Modal Content")).toBeInTheDocument();
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("renders modal without title", () => {
    renderModal({ title: undefined });

    expect(screen.queryByRole("heading")).not.toBeInTheDocument();
    expect(screen.getByText("Modal Content")).toBeInTheDocument();
  });

  it("closes modal when clicking close button", () => {
    renderModal();

    const closeButton = screen.getByRole("button", { name: /close modal/i });
    fireEvent.click(closeButton);

    expect(mockClose).toHaveBeenCalledTimes(1);
  });

  it("closes modal when clicking overlay", () => {
    renderModal();

    const overlay = screen.getByTestId("modal-overlay");
    fireEvent.click(overlay);

    expect(mockClose).toHaveBeenCalledTimes(1);
  });

  it("doesn't close modal when clicking content", () => {
    renderModal();

    const content = screen.getByText("Modal Content");
    fireEvent.click(content);

    expect(mockClose).not.toHaveBeenCalled();
  });

  it("renders with different sizes", () => {
    const sizes: Array<"small" | "medium" | "large"> = [
      "small",
      "medium",
      "large"
    ];

    sizes.forEach((size) => {
      cleanup(); // Cleanup before each iteration
      renderModal({ size });

      const modalContent = screen.getByTestId("modal-content");
      expect(modalContent).toHaveClass(
        `app-modal--content`,
        `app-modal--${size}`
      );
    });
  });

  it("warns and returns null when portalElement is not provided", () => {
    const consoleSpy = jest.spyOn(console, "warn").mockImplementation();

    const { container } = renderModal({ portalElement: null });

    expect(consoleSpy).toHaveBeenCalledWith(
      "AppModal: No portal element found, rendering inline"
    );
    expect(container.firstChild).toBeNull();

    consoleSpy.mockRestore();
  });

  it("applies correct CSS classes", () => {
    renderModal();

    expect(screen.getByRole("dialog")).toHaveClass("app-modal");
    expect(screen.getByRole("heading")).toHaveClass("app-modal--title");
    expect(screen.getByRole("button", { name: /close modal/i })).toHaveClass(
      "btn",
      "btn--icon",
      "app-modal--close"
    );
  });
});
