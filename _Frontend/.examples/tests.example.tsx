// components/HolyGrailLayout/__tests__/HolyGrailLayout.test.tsx
import { render, screen } from "@testing-library/react";
import HolyGrailLayout from "@components/HolyGrailLayout";

describe("HolyGrailLayout", () => {
  const mockConsoleWarn = jest.spyOn(console, "warn").mockImplementation();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render children correctly", () => {
    const testContent = "Test Content";
    render(<HolyGrailLayout>{testContent}</HolyGrailLayout>);

    expect(screen.getByText(testContent)).toBeInTheDocument();
  });

  it("should render multiple children correctly", () => {
    render(
      <HolyGrailLayout>
        <div>Child 1</div>
        <div>Child 2</div>
      </HolyGrailLayout>
    );

    expect(screen.getByText("Child 1")).toBeInTheDocument();
    expect(screen.getByText("Child 2")).toBeInTheDocument();
  });

  it("should add holy-grail class to layoutRoot element", () => {
    // Create a div to serve as layoutRoot
    const layoutRoot = document.createElement("div");
    layoutRoot.id = "test-root";
    document.body.appendChild(layoutRoot);

    render(<HolyGrailLayout layoutRoot="#test-root">Content</HolyGrailLayout>);

    expect(layoutRoot).toHaveClass("holy-grail");

    // Cleanup
    document.body.removeChild(layoutRoot);
  });

  it("should warn when layoutRoot element is not found", () => {
    const nonExistentSelector = "#non-existent-element";
    render(
      <HolyGrailLayout layoutRoot={nonExistentSelector}>
        Content
      </HolyGrailLayout>
    );

    expect(mockConsoleWarn).toHaveBeenCalledWith(
      `Element with selector "${nonExistentSelector}" not found`
    );
  });
});


// components/HolyGrailLayout/__tests__/HolyGrailLayoutWithParams.test.tsx
import { render, screen } from "@testing-library/react";
import HolyGrailLayoutWithParams from "@components/HolyGrailLayout/HolyGrailLayoutWithParams";

describe("HolyGrailLayoutWithParams", () => {
  it("should render only required content when optional props are not provided", () => {
    const content = "Main Content";
    render(<HolyGrailLayoutWithParams content={content} />);

    expect(screen.getByText(content)).toBeInTheDocument();
    expect(screen.queryByRole("banner")).not.toBeInTheDocument(); // header
    expect(screen.queryByRole("complementary")).not.toBeInTheDocument(); // asides
    expect(screen.queryByRole("contentinfo")).not.toBeInTheDocument(); // footer
  });

  it("should render all sections when all props are provided", () => {
    const props = {
      header: "Header Content",
      leftSidebar: "Left Sidebar",
      content: "Main Content",
      rightSidebar: "Right Sidebar",
      footer: "Footer Content"
    };

    render(<HolyGrailLayoutWithParams {...props} />);

    expect(screen.getByText(props.header)).toBeInTheDocument();
    expect(screen.getByText(props.leftSidebar)).toBeInTheDocument();
    expect(screen.getByText(props.content)).toBeInTheDocument();
    expect(screen.getByText(props.rightSidebar)).toBeInTheDocument();
    expect(screen.getByText(props.footer)).toBeInTheDocument();
  });

  it("should add holy-grail class to layoutRoot element", () => {
    // Create a div to serve as layoutRoot
    const layoutRoot = document.createElement("div");
    layoutRoot.id = "test-root";
    document.body.appendChild(layoutRoot);

    render(
      <HolyGrailLayoutWithParams
        layoutRoot="#test-root"
        content="Test Content"
      />
    );

    expect(layoutRoot).toHaveClass("holy-grail");

    // Cleanup
    document.body.removeChild(layoutRoot);
  });

  it("should render complex content in each section", () => {
    const complexContent = {
      header: <div data-testid="complex-header">Complex Header</div>,
      leftSidebar: <div data-testid="complex-left">Complex Left</div>,
      content: <div data-testid="complex-main">Complex Main</div>,
      rightSidebar: <div data-testid="complex-right">Complex Right</div>,
      footer: <div data-testid="complex-footer">Complex Footer</div>
    };

    render(<HolyGrailLayoutWithParams {...complexContent} />);

    expect(screen.getByTestId("complex-header")).toBeInTheDocument();
    expect(screen.getByTestId("complex-left")).toBeInTheDocument();
    expect(screen.getByTestId("complex-main")).toBeInTheDocument();
    expect(screen.getByTestId("complex-right")).toBeInTheDocument();
    expect(screen.getByTestId("complex-footer")).toBeInTheDocument();
  });
});


// components/WelcomeMessage/__tests__/WelcomeMessage.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import WelcomeMessage from "../WelcomeMessage";
import { TestWrapper } from "@test/testUtils";

// Mock WelcomeMessageView component
jest.mock("../WelcomeMessageView", () => ({
  __esModule: true,
  default: ({
    onAccept,
    onDecline
  }: {
    onAccept: () => void;
    onDecline: () => void;
  }) => (
    <div data-testid="welcome-message-view">
      <button onClick={onAccept} data-testid="accept-button">
        Accept
      </button>
      <button onClick={onDecline} data-testid="decline-button">
        Decline
      </button>
    </div>
  )
}));

describe("WelcomeMessage", () => {
  const setUserAccepted = jest.fn();
  const setUserDeclined = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders WelcomeMessageView component", () => {
    render(
      <WelcomeMessage
        setUserAccepted={setUserAccepted}
        setUserDeclined={setUserDeclined}
      />,
      { wrapper: TestWrapper }
    );

    expect(screen.getByTestId("welcome-message-view")).toBeInTheDocument();
  });

  it("calls setUserAccepted when accept button is clicked", () => {
    render(
      <WelcomeMessage
        setUserAccepted={setUserAccepted}
        setUserDeclined={setUserDeclined}
      />,
      { wrapper: TestWrapper }
    );

    const acceptButton = screen.getByTestId("accept-button");
    fireEvent.click(acceptButton);

    expect(setUserAccepted).toHaveBeenCalledWith(true);
    expect(setUserDeclined).not.toHaveBeenCalled();
  });

  it("calls setUserDeclined when decline button is clicked", () => {
    render(
      <WelcomeMessage
        setUserAccepted={setUserAccepted}
        setUserDeclined={setUserDeclined}
      />,
      { wrapper: TestWrapper }
    );

    const declineButton = screen.getByTestId("decline-button");
    fireEvent.click(declineButton);

    expect(setUserDeclined).toHaveBeenCalledWith(true);
    expect(setUserAccepted).not.toHaveBeenCalled();
  });
});


// components/WelcomeMessage/__tests__/WelcomeMessageView.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import WelcomeMessageView from "../WelcomeMessageView";
import { TestWrapper } from "@test/testUtils";
import i18n from "@i18n/index";

describe("WelcomeMessageView", () => {
  const mockAccept = jest.fn();
  const mockDecline = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    i18n.changeLanguage("en");
  });

  it("renders welcome message with all content", () => {
    render(
      <WelcomeMessageView onAccept={mockAccept} onDecline={mockDecline} />,
      { wrapper: TestWrapper }
    );

    // Check title and subtitle
    expect(screen.getByText("Hello!")).toBeInTheDocument();
    expect(
      screen.getByText(
        "This application is a convenient and reliable password manager."
      )
    ).toBeInTheDocument();

    // Check features
    expect(
      screen.getByText("Store passwords from all services in one place.")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Add important ones to favorites.")
    ).toBeInTheDocument();
    expect(screen.getByText("Group for quick access.")).toBeInTheDocument();
    expect(screen.getByText("Use search.")).toBeInTheDocument();

    // Check security section
    expect(screen.getByText("Your data is secure")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Each user gets a separate database, and all passwords are stored in encrypted form."
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText("You can download all your passwords at any time.")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Once a month, you receive a backup reminder.")
    ).toBeInTheDocument();

    // Check call to action
    expect(screen.getByText("Try for free")).toBeInTheDocument();
  });

  it("calls onAccept when accept button is clicked", () => {
    render(
      <WelcomeMessageView onAccept={mockAccept} onDecline={mockDecline} />,
      { wrapper: TestWrapper }
    );

    const acceptButton = screen.getByText("Yes, I want to try");
    fireEvent.click(acceptButton);

    expect(mockAccept).toHaveBeenCalledTimes(1);
    expect(mockDecline).not.toHaveBeenCalled();
  });

  it("calls onDecline when decline button is clicked", () => {
    render(
      <WelcomeMessageView onAccept={mockAccept} onDecline={mockDecline} />,
      { wrapper: TestWrapper }
    );

    const declineButton = screen.getByText("No, thanks");
    fireEvent.click(declineButton);

    expect(mockDecline).toHaveBeenCalledTimes(1);
    expect(mockAccept).not.toHaveBeenCalled();
  });
});


// components/AppModal/__tests__/useAppModal.test.tsx
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


// components/AppModal/__tests__/useBodyScrollLock.test.tsx
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


// components/AppModal/__tests__/useAppModalRoot.test.tsx
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


// components/AppModal/__tests__/AppModal.test.tsx
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


// components/AppModal/__tests__/useEscapeKey.test.tsx
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


// components/AppButton/__tests__/AppButton.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import AppButton from "../AppButton";

describe("AppButton", () => {
  it("renders button with icon", () => {
    render(<AppButton icon="home" aria-label="Home" />);
    const icon = screen.getByAltText("Home");
    expect(icon).toBeInTheDocument();
  });

  it("applies variant class correctly", () => {
    render(<AppButton icon="home" variant="secondary" aria-label="Home" />);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("btn--secondary");
  });

  it("applies size class correctly", () => {
    render(<AppButton icon="home" size="small" aria-label="Home" />);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("btn--small");
  });

  it("uses correct icon size", () => {
    render(
      <AppButton icon="home" iconParams={{ iconSize: 24 }} aria-label="Home" />
    );
    const icon = screen.getByAltText("Home");
    expect(icon).toHaveAttribute("width", "24");
    expect(icon).toHaveAttribute("height", "24");
  });

  it("uses alt text from props when provided", () => {
    render(<AppButton icon="home" alt="Custom Alt Text" />);
    expect(screen.getByAltText("Custom Alt Text")).toBeInTheDocument();
  });

  it("uses alt text from iconParams when provided", () => {
    render(
      <AppButton
        icon="home"
        iconParams={{ alt: "Icon Alt Text" }}
        alt="Button Alt Text"
      />
    );
    // iconParams.alt should take precedence
    expect(screen.getByAltText("Icon Alt Text")).toBeInTheDocument();
  });

  it("sets title attribute on button", () => {
    render(<AppButton icon="home" title="Button Title" />);
    expect(screen.getByRole("button")).toHaveAttribute("title", "Button Title");
  });

  it("uses aria-label as title when title not provided", () => {
    render(<AppButton icon="home" aria-label="Home Button" />);
    expect(screen.getByRole("button")).toHaveAttribute("title", "Home Button");
  });

  it("uses alt as title when title and aria-label not provided", () => {
    render(<AppButton icon="home" alt="Home Button Alt" />);
    expect(screen.getByRole("button")).toHaveAttribute(
      "title",
      "Home Button Alt"
    );
  });

  it("passes additional icon props to AppIcon", () => {
    render(
      <AppButton
        icon="home"
        iconParams={{
          className: "custom-icon-class",
          "data-testid": "icon-element"
        }}
        aria-label="Home"
      />
    );
    const icon = screen.getByTestId("icon-element");
    expect(icon).toHaveClass("custom-icon-class");
  });

  it("calls onClick handler when clicked", () => {
    const handleClick = jest.fn();
    render(<AppButton icon="home" onClick={handleClick} aria-label="Home" />);

    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("can be disabled", () => {
    render(<AppButton icon="home" disabled aria-label="Home" />);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("does not call onClick when disabled", () => {
    const handleClick = jest.fn();
    render(
      <AppButton icon="home" onClick={handleClick} disabled aria-label="Home" />
    );

    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("passes additional props to button element", () => {
    render(
      <AppButton icon="home" data-testid="custom-button" aria-label="Home" />
    );
    expect(screen.getByTestId("custom-button")).toBeInTheDocument();
  });

  it("applies custom className to button", () => {
    render(
      <AppButton
        icon="home"
        className="custom-button-class"
        aria-label="Home"
      />
    );
    expect(screen.getByRole("button")).toHaveClass("custom-button-class");
  });

  it("uses default icon when none provided", () => {
    // @ts-ignore - Testing default value
    render(<AppButton aria-label="Default Icon" />);
    const icon = screen.getByAltText("Default Icon");
    expect(icon).toHaveAttribute("src", "/icons/star.svg");
  });

  it("overrides icon with iconParams.iconType", () => {
    render(
      <AppButton
        icon="home"
        iconParams={{ iconType: "search" }}
        aria-label="Search"
      />
    );
    const icon = screen.getByAltText("Search");
    expect(icon).toHaveAttribute("src", "/icons/search.svg");
  });
});


// components/LoadingFallback/__tests__/LoadingFallback.test.tsx
import { render, screen } from "@testing-library/react";
import LoadingFallback from "@components/LoadingFallback";

describe("LoadingFallback", () => {
  it("renders loading text", () => {
    render(<LoadingFallback />);
    const loadingText = screen.getByText("Loading...");
    expect(loadingText).toBeInTheDocument();
  });

  it("applies correct CSS classes", () => {
    const { container } = render(<LoadingFallback />);
    const containerDiv = container.firstChild as HTMLElement;
    expect(containerDiv).toHaveClass("loading-fallback--container");

    const textDiv = screen.getByText("Loading...");
    expect(textDiv).toHaveClass("loading-fallback--text");
  });
});


// components/FooterNavigation/__tests__/FooterNavigation.test.tsx
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router";
import FooterNavigation from "@components/FooterNavigation";

describe("FooterNavigation", () => {
  const renderComponent = () =>
    render(
      <BrowserRouter>
        <FooterNavigation />
      </BrowserRouter>
    );

  it("renders all navigation items", () => {
    renderComponent();

    expect(screen.getByAltText("Home")).toBeInTheDocument();
    expect(screen.getByAltText("Create")).toBeInTheDocument();
    expect(screen.getByAltText("Favorites")).toBeInTheDocument();
    expect(screen.getByAltText("Logout")).toBeInTheDocument();
  });

  it("renders correct navigation links", () => {
    renderComponent();

    expect(screen.getByText("Home").closest("a")).toHaveAttribute("href", "/");
    expect(screen.getByText("Create").closest("a")).toHaveAttribute(
      "href",
      "/password_entries/new"
    );
    expect(screen.getByText("Favorites").closest("a")).toHaveAttribute(
      "href",
      "/favorites"
    );
    expect(screen.getByText("Logout").closest("a")).toHaveAttribute(
      "href",
      "/logout"
    );
  });

  it("applies correct CSS classes", () => {
    renderComponent();

    const nav = screen.getByRole("navigation");
    expect(nav).toHaveClass("footer-navigation");

    const links = screen.getAllByRole("link");
    links.forEach((link) => {
      expect(link).toHaveClass("footer-navigation__item");
    });

    const icons = screen.getAllByRole("img");
    icons.forEach((icon) => {
      expect(icon).toHaveClass("footer-navigation__icon");
    });

    const texts = screen.getAllByText(/(Home|Create|Search|Favorites|Logout)/);
    texts.forEach((text) => {
      expect(text).toHaveClass("footer-navigation__text");
    });
  });
});


// components/AppIcon/__tests__/AppIcon.test.tsx
import { render, screen } from "@testing-library/react";
import AppIcon, { IconType, IconSize } from "@components/AppIcon";

describe("AppIcon", () => {
  const iconTypes: IconType[] = [
    "circle-plus",
    "clipboard-check",
    "eye-off",
    "eye",
    "home",
    "refresh",
    "search",
    "settings",
    "square-x",
    "star"
  ];

  const iconSizes: IconSize[] = [12, 16, 20, 24, 28, 32];

  iconTypes.forEach((iconType) => {
    iconSizes.forEach((iconSize) => {
      it(`renders ${iconType} icon with size ${iconSize} correctly`, () => {
        render(<AppIcon size={iconSize} type={iconType} alt={iconType} />);
        const icon = screen.getByAltText(iconType);
        expect(icon).toBeInTheDocument();
        expect(icon).toHaveAttribute("src", `/icons/${iconType}.svg`);
        expect(icon).toHaveAttribute("width", iconSize.toString());
        expect(icon).toHaveAttribute("height", iconSize.toString());
      });
    });
  });

  it("applies additional props to the img element", () => {
    render(<AppIcon size={24} type="home" alt="home" data-testid="app-icon" />);
    const icon = screen.getByTestId("app-icon");
    expect(icon).toBeInTheDocument();
  });
});


// components/SearchField/__tests__/SearchField.test.tsx
import { render, screen, fireEvent, act } from "@testing-library/react";
import SearchField from "@components/SearchField";
import { TestWrapper } from "@test/testUtils";

describe("SearchField", () => {
  const mockOnSearch = jest.fn();

  beforeEach(() => {
    jest.useFakeTimers();
    mockOnSearch.mockClear();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("renders search field with placeholder", () => {
    render(<SearchField onSearch={mockOnSearch} />, { wrapper: TestWrapper });

    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();
    expect(input).toHaveClass("form-input__search");
    expect(input).toHaveAttribute("placeholder", "Search passwords...");
  });

  it("calls onSearch with debounce", () => {
    render(<SearchField onSearch={mockOnSearch} debounceMs={300} />, {
      wrapper: TestWrapper
    });

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "test" } });

    expect(mockOnSearch).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(mockOnSearch).toHaveBeenCalledWith("test");
  });

  it("shows clear button disabled when input is empty", () => {
    render(<SearchField onSearch={mockOnSearch} />, { wrapper: TestWrapper });

    const clearButton = screen.getByRole("button");
    expect(clearButton).toBeDisabled();
  });

  it("enables clear button when input has enough characters", () => {
    render(<SearchField onSearch={mockOnSearch} />, { wrapper: TestWrapper });

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "test" } });

    const clearButton = screen.getByRole("button");
    expect(clearButton).toBeEnabled();
  });

  it("clears input when clear button is clicked", () => {
    render(<SearchField onSearch={mockOnSearch} />, { wrapper: TestWrapper });

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "test" } });

    const clearButton = screen.getByRole("button");
    fireEvent.click(clearButton);

    expect(input).toHaveValue("");
    expect(mockOnSearch).toHaveBeenCalledWith("");
  });
});


// components/PasswordEntry/CreateForm/__tests__/CreatePasswordEntryForm.test.tsx
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import CreatePasswordEntryForm from "../CreatePasswordEntryForm";
import { useSubmitForm } from "../hooks/useSubmitForm";
import EventEmitter from "@lib/EventEmitter";
import { validationSchema } from "../validationSchema";
import type { ServerErrors } from "../utils/getFieldStatus";

// Mock dependencies
jest.mock("react-hook-form", () => ({
  useForm: jest.fn(),
  FormProvider: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  )
}));

jest.mock("@hookform/resolvers/zod", () => ({
  zodResolver: jest.fn()
}));

jest.mock("react-i18next", () => ({
  useTranslation: jest.fn()
}));

jest.mock("../hooks/useSubmitForm", () => ({
  useSubmitForm: jest.fn()
}));

jest.mock("@lib/EventEmitter", () => ({
  emit: jest.fn()
}));

jest.mock("../validationSchema", () => ({
  validationSchema: {}
}));

jest.mock("react-router", () => ({
  useParams: () => ({ id: "test-id" })
}));

jest.mock("../CreatePasswordEntryFormView", () => ({
  __esModule: true,
  default: ({ onSubmit }: { onSubmit: () => void }) => (
    <form data-testid="password-entry-form" onSubmit={onSubmit}>
      <button type="submit">Submit</button>
    </form>
  )
}));

jest.mock("../components/FormError/FormError", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="form-error">{children}</div>
  )
}));

describe("CreatePasswordEntryForm", () => {
  const mockReset = jest.fn();
  const mockSetError = jest.fn();
  const mockHandleSubmit = jest.fn();
  const mockSubmitForm = jest.fn();
  const mockTranslate = jest.fn((key) => key);
  const mockEntryId = "test-id";

  beforeEach(() => {
    jest.clearAllMocks();

    // Setup useForm mock
    (useForm as jest.Mock).mockReturnValue({
      handleSubmit: mockHandleSubmit.mockImplementation((callback) => {
        return (e: React.FormEvent) => {
          e?.preventDefault?.();
          return callback({ serviceName: "Test Service" });
        };
      }),
      reset: mockReset,
      setError: mockSetError,
      formState: { errors: {} }
    });

    // Setup useTranslation mock
    (useTranslation as jest.Mock).mockReturnValue({
      t: mockTranslate
    });

    // Setup useSubmitForm mock
    (useSubmitForm as jest.Mock).mockReturnValue({
      submitForm: mockSubmitForm,
      formError: "",
      isSubmitting: false
    });

    // Setup zodResolver mock
    (zodResolver as jest.Mock).mockReturnValue(() => ({ values: {} }));
  });

  it("renders the form with title", () => {
    render(<CreatePasswordEntryForm />);

    expect(screen.getByText("title")).toBeInTheDocument();
    expect(screen.getByTestId("password-entry-form")).toBeInTheDocument();
  });

  it("initializes form with correct configuration", () => {
    render(<CreatePasswordEntryForm />);

    expect(useForm).toHaveBeenCalledWith({
      mode: "onChange",
      reValidateMode: "onChange",
      criteriaMode: "all",
      resolver: expect.any(Function),
      defaultValues: {
        serviceName: "",
        username: "",
        password: "",
        serviceUrl: "",
        notes: ""
      }
    });

    expect(zodResolver).toHaveBeenCalledWith(validationSchema);
  });

  it("submits the form with correct data", async () => {
    render(<CreatePasswordEntryForm />);

    fireEvent.submit(screen.getByTestId("password-entry-form"));

    expect(mockHandleSubmit).toHaveBeenCalled();
    expect(mockSubmitForm).toHaveBeenCalledWith(
      mockEntryId,
      { serviceName: "Test Service" },
      expect.any(Function),
      expect.any(Function)
    );
  });

  it("handles successful form submission", async () => {
    // Setup submitForm to call success callback
    mockSubmitForm.mockImplementation((_id, _data, onSuccess) => {
      onSuccess();
    });

    render(<CreatePasswordEntryForm />);

    fireEvent.submit(screen.getByTestId("password-entry-form"));

    await waitFor(() => {
      expect(EventEmitter.emit).toHaveBeenCalledWith(
        "NOTIFICATION",
        "messages.formSubmitted"
      );
      expect(mockReset).toHaveBeenCalled();
    });
  });

  it("displays form error when present", async () => {
    // Setup useState to return form error
    jest
      .spyOn(React, "useState")
      .mockImplementationOnce(() => ["Server error", jest.fn()]);

    render(<CreatePasswordEntryForm />);

    expect(screen.getByTestId("form-error")).toHaveTextContent("Server error");
  });

  it("handles server validation errors", async () => {
    const serverErrors: ServerErrors = {
      form_error: "Form has errors",
      errors: {
        serviceName: { message: "Service name is required" }
      }
    };

    // Setup submitForm to call error callback
    mockSubmitForm.mockImplementation((_id, _data, _onSuccess, onError) => {
      onError(serverErrors);
    });

    render(<CreatePasswordEntryForm />);

    fireEvent.submit(screen.getByTestId("password-entry-form"));

    await waitFor(() => {
      expect(mockSetError).toHaveBeenCalledWith("serviceName", {
        type: "server",
        message: "Service name is required"
      });
    });
  });
});


// components/PasswordEntry/CreateForm/__tests__/CreatePasswordEntryFormView.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import CreatePasswordEntryFormView, {
  Props
} from "../CreatePasswordEntryFormView";

// Mock all input components
jest.mock("../inputs/ServiceNameInput", () => () => (
  <div data-testid="service-name-input">ServiceNameInput</div>
));
jest.mock("../inputs/UsernameInput", () => () => (
  <div data-testid="username-input">UsernameInput</div>
));
jest.mock("../inputs/ServiceUrlInput", () => () => (
  <div data-testid="service-url-input">ServiceUrlInput</div>
));
jest.mock("../inputs/PasswordInput", () => () => (
  <div data-testid="password-input">PasswordInput</div>
));
jest.mock("../inputs/NotesInput", () => () => (
  <div data-testid="notes-input">NotesInput</div>
));
jest.mock("../inputs/FormActions", () => () => (
  <div data-testid="form-actions">FormActions</div>
));

describe("CreatePasswordEntryFormView", () => {
  const defaultProps: Props = {
    onSubmit: jest.fn()
  };

  const renderComponent = (props: Partial<Props> = {}) => {
    return render(<CreatePasswordEntryFormView {...defaultProps} {...props} />);
  };

  it("renders the form with all input components", () => {
    renderComponent();

    // Check if the form is rendered
    const form = screen.getByRole("create-password-form");
    expect(form).toBeInTheDocument();

    // Check if all input components are rendered
    expect(screen.getByTestId("service-name-input")).toBeInTheDocument();
    expect(screen.getByTestId("username-input")).toBeInTheDocument();
    expect(screen.getByTestId("service-url-input")).toBeInTheDocument();
    expect(screen.getByTestId("password-input")).toBeInTheDocument();
    expect(screen.getByTestId("notes-input")).toBeInTheDocument();
    expect(screen.getByTestId("form-actions")).toBeInTheDocument();
  });

  it("calls onSubmit when form is submitted", () => {
    const onSubmitMock = jest.fn();
    renderComponent({ onSubmit: onSubmitMock });

    const form = screen.getByRole("create-password-form");
    fireEvent.submit(form);

    expect(onSubmitMock).toHaveBeenCalledTimes(1);
  });

  it("applies the correct CSS class to the form", () => {
    renderComponent();

    const form = screen.getByRole("create-password-form");
    expect(form).toHaveClass("create-password-form");
  });
});


// components/PasswordEntry/CreateForm/inputs/ServiceNameInput/__tests__/ServiceNameInput.test.tsx
import { render, screen } from "@testing-library/react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import ServiceNameInput from "../ServiceNameInput";
import { getFieldStatus } from "../../../utils/getFieldStatus";

jest.mock("react-hook-form", () => ({
  useFormContext: jest.fn()
}));

jest.mock("react-i18next", () => ({
  useTranslation: jest.fn()
}));

// Mock getFieldStatus at file level
jest.mock("../../../utils/getFieldStatus", () => ({
  getFieldStatus: jest.fn().mockReturnValue({
    className: "info--success",
    message: "Valid service name"
  })
}));

describe("ServiceNameInput", () => {
  const mockSetValue = jest.fn();
  const mockRegister = jest.fn().mockReturnValue({});
  const mockWatch = jest.fn().mockReturnValue("test-service");

  const mockTranslation = {
    t: jest.fn((key: "fields.serviceName") => {
      const translations = {
        "fields.serviceName": "Service Name"
      };
      return translations[key] || key;
    })
  };

  beforeEach(() => {
    (useFormContext as jest.Mock).mockReturnValue({
      register: mockRegister,
      setValue: mockSetValue,
      watch: mockWatch,
      formState: {
        errors: {},
        dirtyFields: {}
      }
    });

    (useTranslation as jest.Mock).mockReturnValue(mockTranslation);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders service name input with label", () => {
    render(<ServiceNameInput />);

    const input = screen.getByTestId("service-name-input");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("type", "text");
  });

  it("registers service name field with form context", () => {
    render(<ServiceNameInput />);

    expect(mockRegister).toHaveBeenCalledWith("serviceName", {
      onChange: expect.any(Function),
      onBlur: expect.any(Function)
    });
  });

  it("marks input as invalid when there are errors", () => {
    (useFormContext as jest.Mock).mockReturnValue({
      register: mockRegister,
      setValue: mockSetValue,
      watch: mockWatch,
      formState: {
        errors: {
          serviceName: { type: "required", message: "Service name is required" }
        },
        dirtyFields: {}
      }
    });

    render(<ServiceNameInput />);

    const input = screen.getByTestId("service-name-input");
    expect(input).toHaveAttribute("aria-invalid", "true");
  });

  it("applies correct CSS classes", () => {
    render(<ServiceNameInput />);

    const input = screen.getByTestId("service-name-input");
    expect(input).toHaveClass("form-input");
    expect(screen.getByText("Service Name").closest("label")).toHaveClass(
      "form-group--label"
    );
  });

  it("displays field status message", () => {
    render(<ServiceNameInput />);

    // Check that getFieldStatus was called
    expect(getFieldStatus).toHaveBeenCalled();

    // Check that status message is displayed
    expect(screen.getByText("Valid service name")).toBeInTheDocument();

    // Check that status container has the correct classes
    const statusContainer = screen
      .getByText("Valid service name")
      .closest("div");
    expect(statusContainer).toHaveClass("form-group--info", "info--success");
  });
});


// components/PasswordEntry/CreateForm/inputs/UsernameInput/__tests__/UsernameInput.test.tsx
import { render, screen } from "@testing-library/react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import UsernameInput from "../UsernameInput";
import { getFieldStatus } from "../../../utils/getFieldStatus";

jest.mock("react-hook-form", () => ({
  useFormContext: jest.fn()
}));

jest.mock("react-i18next", () => ({
  useTranslation: jest.fn()
}));

// Mock getFieldStatus at file level
jest.mock("../../../utils/getFieldStatus", () => ({
  getFieldStatus: jest.fn().mockReturnValue({
    className: "info--success",
    message: "Valid username"
  })
}));

describe("UsernameInput", () => {
  const mockSetValue = jest.fn();
  const mockRegister = jest.fn().mockReturnValue({});
  const mockWatch = jest.fn().mockReturnValue("testuser");

  const mockTranslation = {
    t: jest.fn((key: "fields.username") => {
      const translations = {
        "fields.username": "Username"
      };
      return translations[key] || key;
    })
  };

  beforeEach(() => {
    (useFormContext as jest.Mock).mockReturnValue({
      register: mockRegister,
      setValue: mockSetValue,
      watch: mockWatch,
      formState: {
        errors: {},
        dirtyFields: {}
      }
    });

    (useTranslation as jest.Mock).mockReturnValue(mockTranslation);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders username input with label", () => {
    render(<UsernameInput />);

    const input = screen.getByLabelText("Username");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("type", "text");
  });

  it("registers username field with form context", () => {
    render(<UsernameInput />);

    expect(mockRegister).toHaveBeenCalledWith("username", {
      onBlur: expect.any(Function)
    });
  });

  it("marks input as invalid when there are errors", () => {
    (useFormContext as jest.Mock).mockReturnValue({
      register: mockRegister,
      setValue: mockSetValue,
      watch: mockWatch,
      formState: {
        errors: {
          username: { type: "required", message: "Username is required" }
        },
        dirtyFields: {}
      }
    });

    render(<UsernameInput />);

    const input = screen.getByLabelText("Username");
    expect(input).toHaveAttribute("aria-invalid", "true");
  });

  it("applies correct CSS classes", () => {
    render(<UsernameInput />);

    const input = screen.getByLabelText("Username");
    expect(input).toHaveClass("form-input");
    expect(screen.getByText("Username").closest("label")).toHaveClass(
      "form-group--label"
    );
  });

  it("displays field status message", () => {
    render(<UsernameInput />);

    // Check that getFieldStatus was called
    expect(getFieldStatus).toHaveBeenCalled();

    // Check that status message is displayed
    expect(screen.getByText("Valid username")).toBeInTheDocument();

    // Check that status container has the correct classes
    const statusContainer = screen.getByText("Valid username").closest("div");
    expect(statusContainer).toHaveClass("form-group--info", "info--success");
  });
});


// components/PasswordEntry/CreateForm/inputs/NotesInput/__tests__/NotesInput.test.tsx
import { render, screen } from "@testing-library/react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import NotesInput from "../NotesInput";

jest.mock("react-hook-form", () => ({
  useFormContext: jest.fn()
}));

jest.mock("react-i18next", () => ({
  useTranslation: jest.fn()
}));

describe("NotesInput", () => {
  const mockSetValue = jest.fn();
  const mockRegister = jest.fn().mockReturnValue({});
  const mockTranslation = {
    t: jest.fn((key: "fields.notes") => {
      const translations = {
        "fields.notes": "Notes"
      };
      return translations[key];
    })
  };

  beforeEach(() => {
    (useFormContext as jest.Mock).mockReturnValue({
      register: mockRegister,
      setValue: mockSetValue,
      formState: {
        errors: {}
      }
    });

    (useTranslation as jest.Mock).mockReturnValue(mockTranslation);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders notes textarea with label", () => {
    render(<NotesInput />);

    expect(screen.getByLabelText("Notes")).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toHaveAttribute("rows", "4");
  });

  it("registers notes field with form context", () => {
    render(<NotesInput />);

    expect(mockRegister).toHaveBeenCalledWith("notes", {
      onBlur: expect.any(Function)
    });
  });

  it("marks textarea as invalid when there are errors", () => {
    (useFormContext as jest.Mock).mockReturnValue({
      register: mockRegister,
      setValue: mockSetValue,
      formState: {
        errors: {
          notes: { type: "required", message: "Notes is required" }
        }
      }
    });

    render(<NotesInput />);

    expect(screen.getByRole("textbox")).toHaveAttribute("aria-invalid", "true");
  });

  it("applies correct CSS classes", () => {
    render(<NotesInput />);

    expect(screen.getByRole("textbox")).toHaveClass("form-input");
    expect(screen.getByText("Notes").closest("label")).toHaveClass(
      "form-group--label"
    );
  });
});


// components/PasswordEntry/CreateForm/inputs/PasswordInput/__tests__/PasswordInput.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { generatePassword } from "../../../utils/generatePassword";
import { copyToClipboard } from "../../../utils/copyToClipboard";
import PasswordInput from "../PasswordInput";

jest.mock("react-hook-form", () => ({
  useFormContext: jest.fn()
}));

jest.mock("react-i18next", () => ({
  useTranslation: jest.fn()
}));

jest.mock("../../../utils/generatePassword", () => ({
  generatePassword: jest.fn().mockReturnValue("generated-password")
}));

jest.mock("../../../utils/copyToClipboard", () => ({
  copyToClipboard: jest.fn()
}));

describe("PasswordInput", () => {
  const mockSetValue = jest.fn();
  const mockRegister = jest.fn().mockReturnValue({});
  const mockWatch = jest.fn().mockReturnValue("test-password");

  const mockTranslation = {
    t: jest.fn(
      (
        key:
          | "fields.password"
          | "actions.generatePassword"
          | "actions.copyPassword"
      ) => {
        const translations = {
          "fields.password": "Password",
          "actions.generatePassword": "Generate Password",
          "actions.copyPassword": "Copy Password"
        };
        return translations[key] || key;
      }
    )
  };

  beforeEach(() => {
    (useFormContext as jest.Mock).mockReturnValue({
      register: mockRegister,
      setValue: mockSetValue,
      watch: mockWatch,
      formState: {
        errors: {},
        dirtyFields: {}
      }
    });

    (useTranslation as jest.Mock).mockReturnValue(mockTranslation);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders password input with label", () => {
    render(<PasswordInput />);

    const input = screen.getByTestId("password-input");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("type", "password");
  });

  it("toggles password visibility", () => {
    render(<PasswordInput />);

    const input = screen.getByTestId("password-input");
    const toggleButton = screen.getByTestId("toggle-password");

    expect(input).toHaveAttribute("type", "password");
    fireEvent.click(toggleButton);
    expect(input).toHaveAttribute("type", "text");
  });

  it("generates new password", () => {
    render(<PasswordInput />);

    const generateButton = screen.getByTestId("generate-password");
    fireEvent.click(generateButton);

    expect(generatePassword).toHaveBeenCalled();
    expect(mockSetValue).toHaveBeenCalledWith(
      "password",
      "generated-password",
      { shouldValidate: true }
    );
  });

  it("copies password to clipboard", async () => {
    render(<PasswordInput />);

    const copyButton = screen.getByTestId("copy-password");
    await fireEvent.click(copyButton);

    expect(copyToClipboard).toHaveBeenCalledWith("test-password");
  });

  it("marks input as invalid when there are errors", () => {
    (useFormContext as jest.Mock).mockReturnValue({
      register: mockRegister,
      setValue: mockSetValue,
      watch: mockWatch,
      formState: {
        errors: {
          password: { type: "required", message: "Password is required" }
        },
        dirtyFields: {}
      }
    });

    render(<PasswordInput />);

    const input = screen.getByTestId("password-input");
    expect(input).toHaveAttribute("aria-invalid", "true");
  });
});


// components/PasswordEntry/CreateForm/inputs/ServiceUrlInput/__tests__/ServiceUrlInput.test.tsx
import { render, screen } from "@testing-library/react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import ServiceUrlInput from "../ServiceUrlInput";
import { getFieldStatus } from "../../../utils/getFieldStatus";

jest.mock("react-hook-form", () => ({
  useFormContext: jest.fn()
}));

jest.mock("react-i18next", () => ({
  useTranslation: jest.fn()
}));

// Mock getFieldStatus at file level
jest.mock("../../../utils/getFieldStatus", () => ({
  getFieldStatus: jest.fn().mockReturnValue({
    className: "info--success",
    message: "Valid URL"
  })
}));

describe("ServiceUrlInput", () => {
  const mockSetValue = jest.fn();
  const mockRegister = jest.fn().mockReturnValue({});
  const mockWatch = jest.fn().mockReturnValue("https://example.com");

  const mockTranslation = {
    t: jest.fn((key: "fields.url") => {
      const translations = {
        "fields.url": "URL"
      };
      return translations[key] || key;
    })
  };

  beforeEach(() => {
    (useFormContext as jest.Mock).mockReturnValue({
      register: mockRegister,
      setValue: mockSetValue,
      watch: mockWatch,
      formState: {
        errors: {},
        dirtyFields: {}
      }
    });

    (useTranslation as jest.Mock).mockReturnValue(mockTranslation);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders service URL input with label", () => {
    render(<ServiceUrlInput />);

    const input = screen.getByLabelText("URL");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("type", "url");
    expect(input).toHaveAttribute("placeholder", "https://");
  });

  it("registers serviceUrl field with form context", () => {
    render(<ServiceUrlInput />);

    expect(mockRegister).toHaveBeenCalledWith("serviceUrl", {
      onChange: expect.any(Function),
      onBlur: expect.any(Function)
    });
  });

  it("marks input as invalid when there are errors", () => {
    (useFormContext as jest.Mock).mockReturnValue({
      register: mockRegister,
      setValue: mockSetValue,
      watch: mockWatch,
      formState: {
        errors: {
          serviceUrl: { type: "pattern", message: "Invalid URL format" }
        },
        dirtyFields: {}
      }
    });

    render(<ServiceUrlInput />);

    const input = screen.getByLabelText("URL");
    expect(input).toHaveAttribute("aria-invalid", "true");
  });

  it("applies correct CSS classes", () => {
    render(<ServiceUrlInput />);

    const input = screen.getByLabelText("URL");
    expect(input).toHaveClass("form-input");
    expect(screen.getByText("URL").closest("label")).toHaveClass(
      "form-group--label"
    );
  });

  it("displays field status message", () => {
    render(<ServiceUrlInput />);

    // Check that getFieldStatus was called
    expect(getFieldStatus).toHaveBeenCalled();

    // Check that status message is displayed
    expect(screen.getByText("Valid URL")).toBeInTheDocument();

    // Check that status container has the correct classes
    const statusContainer = screen.getByText("Valid URL").closest("div");
    expect(statusContainer).toHaveClass("form-group--info", "info--success");
  });

  it("handles null value in watch", () => {
    // Test with null value from watch
    (mockWatch as jest.Mock).mockReturnValueOnce(null);

    render(<ServiceUrlInput />);

    // Should still call getFieldStatus with empty string
    expect(getFieldStatus).toHaveBeenCalledWith(
      "serviceUrl",
      "",
      expect.anything(),
      expect.anything(),
      expect.anything()
    );
  });
});


// components/PasswordEntry/CreateForm/inputs/FormActions/__tests__/FormActions.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useAppModal } from "@components/AppModal";
import FormActions from "../FormActions";

jest.mock("react-hook-form", () => ({
  useFormContext: jest.fn()
}));

jest.mock("react-i18next", () => ({
  useTranslation: jest.fn()
}));

jest.mock("@components/AppModal", () => ({
  useAppModal: jest.fn()
}));

describe("FormActions", () => {
  const mockReset = jest.fn();
  const mockClose = jest.fn();
  const mockOpen = jest.fn();

  // Mock translations
  const commonTranslations = {
    reset: "Reset",
    saving: "Saving..."
  };

  const formTranslations = {
    "actions.save": "Save",
    "modals.resetForm.title": "Reset Form",
    "modals.resetForm.message": "Are you sure?",
    "modals.resetForm.cancel": "Cancel",
    "modals.resetForm.confirm": "Confirm"
  };

  beforeEach(() => {
    jest.clearAllMocks();

    // Mock form context
    (useFormContext as jest.Mock).mockReturnValue({
      formState: {
        isValid: true,
        isSubmitting: false
      },
      reset: mockReset
    });

    // Mock translations
    (useTranslation as jest.Mock).mockImplementation((ns) => {
      if (ns === "common") {
        return {
          t: (key: string) =>
            commonTranslations[key as keyof typeof commonTranslations] || key
        };
      }
      return {
        t: (key: string) =>
          formTranslations[key as keyof typeof formTranslations] || key
      };
    });

    // Mock modal
    (useAppModal as jest.Mock).mockReturnValue({
      open: mockOpen,
      modal: <div data-testid="reset-modal">Modal Content</div>,
      close: mockClose
    });
  });

  it("renders submit and reset buttons", () => {
    render(<FormActions />);

    expect(screen.getByRole("button", { name: "Save" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Reset" })).toBeInTheDocument();
  });

  it("disables submit button when form is invalid", () => {
    (useFormContext as jest.Mock).mockReturnValue({
      formState: {
        isValid: false,
        isSubmitting: false
      },
      reset: mockReset
    });

    render(<FormActions />);

    expect(screen.getByRole("button", { name: "Save" })).toBeDisabled();
  });

  it("disables submit button and shows loading state when submitting", () => {
    (useFormContext as jest.Mock).mockReturnValue({
      formState: {
        isValid: true,
        isSubmitting: true
      },
      reset: mockReset
    });

    render(<FormActions />);

    const submitButton = screen.getByRole("button", { name: "Saving..." });
    expect(submitButton).toBeDisabled();
  });

  it("opens confirmation modal when clicking reset button", () => {
    render(<FormActions />);

    fireEvent.click(screen.getByRole("button", { name: "Reset" }));
    expect(mockOpen).toHaveBeenCalledTimes(1);
    expect(screen.getByTestId("reset-modal")).toBeInTheDocument();
  });

  it("doesn't show reset button for Edit form type", () => {
    render(<FormActions formType="Edit" />);

    expect(screen.getByRole("button", { name: "Save" })).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Reset" })
    ).not.toBeInTheDocument();
  });
});


// components/PasswordEntry/Item/__tests__/PasswordEntry.test.tsx
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router";
import PasswordEntry from "@components/PasswordEntry/Item";
import { showPasswordEntryPath } from "@routes/helpers";

describe("PasswordEntry", () => {
  const mockProps = {
    id: "test-1",
    name: "Test Entry"
  };

  const renderWithRouter = () => {
    render(
      <BrowserRouter>
        <PasswordEntry {...mockProps} />
      </BrowserRouter>
    );
  };

  it("renders entry name", () => {
    renderWithRouter();
    expect(screen.getByText(mockProps.name)).toBeInTheDocument();
  });

  it("renders entry link with correct href", () => {
    renderWithRouter();
    const entryLink = screen.getByText(mockProps.name).closest("a");
    expect(entryLink).toHaveAttribute(
      "href",
      showPasswordEntryPath(mockProps.id)
    );
  });
});


// components/PasswordEntry/List/__tests__/PasswordEntryList.test.tsx
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router";
import PasswordEntryList from "@components/PasswordEntry/List";
import popularServices from "@mocks/popularServices";

describe("PasswordEntryList", () => {
  const renderWithRouter = () => {
    render(
      <BrowserRouter>
        <PasswordEntryList />
      </BrowserRouter>
    );
  };

  it("renders all 30 popular service entries", () => {
    renderWithRouter();

    popularServices.forEach((service) => {
      expect(screen.getByText(service)).toBeInTheDocument();
    });
  });

  it("renders entries with correct links", () => {
    renderWithRouter();

    popularServices.forEach((service, index) => {
      const entry = screen.getByText(service);
      expect(entry.closest("a")).toHaveAttribute(
        "href",
        `/password_entries/${index + 1}`
      );
    });
  });
});


// components/Header/__tests__/Header.test.tsx
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router";
import Header from "@components/Header";

// Mock react-i18next
jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: { [key: string]: string } = {
        "app.name": "HamsterPass",
        "app.settings": "Settings"
      };
      return translations[key] || key;
    }
  })
}));

const renderWithRouter = (component: React.ReactNode) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe("Header", () => {
  it("renders app name", () => {
    renderWithRouter(<Header />);
    expect(screen.getByText("HamsterPass")).toBeInTheDocument();
  });

  it("has correct CSS classes", () => {
    const { container } = renderWithRouter(<Header />);

    const headerElement = container.firstChild as HTMLElement;
    expect(headerElement).toHaveClass("app-header");
    expect(
      headerElement.querySelector(".app-header__title")
    ).toBeInTheDocument();
    expect(
      headerElement.querySelector(".app-header__settings")
    ).toBeInTheDocument();
  });

  it("renders settings link with icon", () => {
    renderWithRouter(<Header />);

    const settingsLink = screen.getByRole("link", { name: /settings/i });
    expect(settingsLink).toHaveAttribute("href", "/settings");

    const settingsIcon = screen.getByAltText("Settings");
    expect(settingsIcon).toHaveAttribute("src", "/icons/settings.svg");
  });
});


// components/AppLayout/__tests__/AppLayout.test.tsx
import { render, screen } from "@testing-library/react";
import AppLayout from "@components/AppLayout";
import { BrowserRouter } from "react-router";
import { useNotifications } from "../hooks/useNotifications";

// Mock hooks
jest.mock("../hooks/useNotifications");

// Mock components
jest.mock("@components/Header", () => () => <div>Mock Header</div>);
jest.mock("@components/FooterNavigation", () => () => <div>Mock Footer</div>);
jest.mock("@components/HolyGrailLayout", () => ({
  HolyGrailLayoutWithParams: ({
    header,
    content,
    footer
  }: {
    header: React.ReactNode;
    content: React.ReactNode;
    footer: React.ReactNode;
  }) => (
    <div>
      {header}
      {content}
      {footer}
    </div>
  )
}));

describe("AppLayout", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderWithRouter = (children: React.ReactNode) => {
    return render(
      <BrowserRouter>
        <AppLayout>{children}</AppLayout>
      </BrowserRouter>
    );
  };

  it("renders header, content, and footer", () => {
    const content = "Main Content";
    renderWithRouter(<div>{content}</div>);

    expect(screen.getByText("Mock Header")).toBeInTheDocument();
    expect(screen.getByText(content)).toBeInTheDocument();
    expect(screen.getByText("Mock Footer")).toBeInTheDocument();
  });

  it("initializes notifications", () => {
    renderWithRouter(<div>Content</div>);

    expect(useNotifications).toHaveBeenCalledTimes(1);
  });
});


// components/SorryAboutDecline/__tests__/SorryAboutDecline.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import SorryAboutDecline from "../SorryAboutDecline";
import { TestWrapper } from "@test/testUtils";
import i18n from "@i18n/index";

describe("SorryAboutDecline", () => {
  const setUserDeclined = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    i18n.changeLanguage("en");
  });

  it("renders the component with correct content", () => {
    render(<SorryAboutDecline setUserDeclined={setUserDeclined} />, {
      wrapper: TestWrapper
    });

    expect(screen.getByText("We're Sorry to See You Go")).toBeInTheDocument();
    expect(
      screen.getByText(
        "We're sorry that you've decided not to use our application at this time."
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "However, if you change your mind, you can always come back and give it a try — we're always happy to welcome new users!"
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText("I'd like to try it after all")
    ).toBeInTheDocument();
  });

  it("calls setUserDeclined(false) when try again button is clicked", () => {
    render(<SorryAboutDecline setUserDeclined={setUserDeclined} />, {
      wrapper: TestWrapper
    });

    const tryAgainButton = screen.getByText("I'd like to try it after all");
    fireEvent.click(tryAgainButton);

    expect(setUserDeclined).toHaveBeenCalledWith(false);
  });
});


// __tests__/App.test.tsx
import { render, screen } from "@testing-library/react";
import App from "../App";
import { useUserExists } from "../hooks/useUserExists";
import { I18nextProvider } from "react-i18next";
import i18n from "@i18n/index";

// Create a custom wrapper without BrowserRouter
const CustomWrapper = ({ children }: { children: React.ReactNode }) => (
  <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
);

// Mock dependencies
jest.mock("../hooks/useUserExists");
jest.mock("@pages/RegistrationPage", () => ({
  __esModule: true,
  default: () => <div data-testid="registration-page">Registration Page</div>
}));
jest.mock("@components/LoadingFallback", () => ({
  __esModule: true,
  default: () => <div data-testid="loading-fallback">Loading...</div>
}));
jest.mock("react-router", () => ({
  BrowserRouter: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="browser-router">{children}</div>
  )
}));
jest.mock("@routes/index", () => ({
  __esModule: true,
  default: () => <div data-testid="app-routes">App Routes</div>
}));

describe("App", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders without crashing", () => {
    // Mock user exists to show main app
    (useUserExists as jest.Mock).mockReturnValue({
      isLoading: false,
      userExists: true,
      error: null
    });

    render(<App />, { wrapper: CustomWrapper });
    expect(screen.getByTestId("browser-router")).toBeInTheDocument();
  });

  it("has correct component structure", () => {
    // Mock user exists to show main app
    (useUserExists as jest.Mock).mockReturnValue({
      isLoading: false,
      userExists: true,
      error: null
    });

    render(<App />, { wrapper: CustomWrapper });

    // Check that router contains routes
    const router = screen.getByTestId("browser-router");
    const routes = screen.getByTestId("app-routes");
    expect(router).toContainElement(routes);
  });
});


// __tests__/index.test.tsx
import { createRoot } from "react-dom/client";

// Mock dependencies
jest.mock("react-dom/client", () => ({
  createRoot: jest.fn(() => ({
    render: jest.fn()
  }))
}));

jest.mock("../App", () => ({
  __esModule: true,
  default: () => null
}));

jest.mock("@i18n/index", () => ({
  __esModule: true,
  default: {}
}));

jest.mock("react-i18next", () => ({
  I18nextProvider: ({ children }: { children: React.ReactNode }) => children
}));

describe("Index", () => {
  let consoleErrorSpy: jest.SpyInstance;
  let originalBody: HTMLElement;

  beforeAll(() => {
    originalBody = document.body.cloneNode(true) as HTMLElement;
  });

  beforeEach(() => {
    document.body.innerHTML = originalBody.innerHTML;
    consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
    jest.clearAllMocks();
  });

  const renderIndex = async () => {
    const { render } = await import("../index");
    return render?.();
  };

  it("should render app when root element exists", async () => {
    // Create root element
    const root = document.createElement("div");
    root.id = "root";
    document.body.appendChild(root);

    await renderIndex();

    expect(createRoot).toHaveBeenCalledWith(root);
    expect(consoleErrorSpy).not.toHaveBeenCalled();
  });

  it("should log error when root element is missing", async () => {
    await renderIndex();

    expect(consoleErrorSpy).toHaveBeenCalledWith("Unable to find root element");
    expect(createRoot).not.toHaveBeenCalled();
  });
});


// pages/ShowPage/__tests__/ShowPage.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import ShowPage from "@pages/ShowPage";
import { TestWrapper } from "@test/testUtils";

// Mock AppLayout
jest.mock("@components/AppLayout", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>
}));

// Mock the clipboard API
beforeAll(() => {
  Object.defineProperty(navigator, "clipboard", {
    value: {
      writeText: jest.fn(),
      readText: jest.fn().mockResolvedValue("user@gmail.com")
    },
    configurable: true
  });
});

describe("ShowPage", () => {
  it("renders show page content", () => {
    render(<ShowPage />, { wrapper: TestWrapper });

    // Check for main content elements
    expect(screen.getByText("Gmail Account")).toBeInTheDocument();
    expect(screen.getByText("user@gmail.com")).toBeInTheDocument();
    expect(screen.getByText(/work email account/i)).toBeInTheDocument();
    expect(screen.getByText(/backup email:/i)).toBeInTheDocument();
  });

  it("toggles password visibility", () => {
    render(<ShowPage />, { wrapper: TestWrapper });

    const toggleButton = screen.getByLabelText(/show/i);
    const passwordValue = screen.getByText("••••••••");

    // Initially, the password should be hidden
    expect(passwordValue).toBeInTheDocument();

    // Click to show password
    fireEvent.click(toggleButton);
    expect(screen.getByText("securePassword123")).toBeInTheDocument();

    // Click to hide password
    fireEvent.click(toggleButton);
    expect(passwordValue).toBeInTheDocument();
  });

  it("copies username to clipboard", async () => {
    render(<ShowPage />, { wrapper: TestWrapper });

    const copyButtons = screen.getAllByLabelText(/copy/i);
    const usernameCopyButton = copyButtons[0]; // First copy button is for username
    fireEvent.click(usernameCopyButton);

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
      "user@gmail.com"
    );
  });

  it("copies password to clipboard", async () => {
    render(<ShowPage />, { wrapper: TestWrapper });

    const copyButtons = screen.getAllByLabelText(/copy/i);
    const passwordCopyButton = copyButtons[1]; // Second copy button is for password
    fireEvent.click(passwordCopyButton);

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
      "securePassword123"
    );
  });

  it("copies URL to clipboard", async () => {
    render(<ShowPage />, { wrapper: TestWrapper });

    const copyButtons = screen.getAllByLabelText(/copy/i);
    const urlCopyButton = copyButtons[2]; // Third copy button is for URL
    fireEvent.click(urlCopyButton);

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
      "https://gmail.com"
    );
  });

  it("renders URL as clickable link", () => {
    render(<ShowPage />, { wrapper: TestWrapper });

    const urlLink = screen.getByText("https://gmail.com");
    expect(urlLink).toHaveAttribute("href", "https://gmail.com");
    expect(urlLink).toHaveAttribute("target", "_blank");
    expect(urlLink).toHaveAttribute("rel", "noopener noreferrer");
  });
});


// pages/LogoutPage/__tests__/LogoutPage.test.tsx
import { render, screen } from "@testing-library/react";
import LogoutPage from "@pages/LogoutPage";
import { TestWrapper } from "@test/testUtils";

// Mock AppLayout
jest.mock("@components/AppLayout", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>
}));

describe("LogoutPage", () => {
  it("renders logout page content", () => {
    render(<LogoutPage />, { wrapper: TestWrapper });

    expect(screen.getByText("Logging out...")).toBeInTheDocument();
    expect(
      screen.getByText("You will be redirected shortly.")
    ).toBeInTheDocument();
  });
});


// pages/SettingsPage/__tests__/SettingsPage.test.tsx
import { render, screen } from "@testing-library/react";
import SettingsPage from "@pages/SettingsPage";
import { TestWrapper } from "@test/testUtils";

// Mock AppLayout
jest.mock("@components/AppLayout", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>
}));

describe("SettingsPage", () => {
  it("renders settings page content", () => {
    render(<SettingsPage />, { wrapper: TestWrapper });

    expect(screen.getByText("Settings Page")).toBeInTheDocument();
    expect(
      screen.getByText("Manage your application settings here.")
    ).toBeInTheDocument();
  });
});


// pages/IndexPage/__tests__/IndexPage.test.tsx
import { render, screen, fireEvent, act } from "@testing-library/react";
import IndexPage from "@pages/IndexPage";
import { TestWrapper } from "@test/testUtils";

// Mock AppLayout
jest.mock("@components/AppLayout", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>
}));

// Mock the PasswordEntryList component
jest.mock("@components/PasswordEntry/List", () => ({
  __esModule: true,
  default: () => (
    <div data-testid="mocked-password-entry-list">Mocked Password List</div>
  )
}));

// Mock the SearchField component
jest.mock("@components/SearchField", () => ({
  __esModule: true,
  default: ({ onSearch }: { onSearch: (query: string) => void }) => (
    <div data-testid="mocked-search-field">
      <input
        type="text"
        onChange={(e) => onSearch(e.target.value)}
        data-testid="search-input"
      />
    </div>
  )
}));

describe("IndexPage", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("renders search field and password list", () => {
    render(<IndexPage />, { wrapper: TestWrapper });

    expect(screen.getByTestId("mocked-search-field")).toBeInTheDocument();
    expect(
      screen.getByTestId("mocked-password-entry-list")
    ).toBeInTheDocument();
  });

  it("handles search input", () => {
    const consoleSpy = jest.spyOn(console, "log").mockImplementation();
    render(<IndexPage />, { wrapper: TestWrapper });

    const searchInput = screen.getByTestId("search-input");
    fireEvent.change(searchInput, { target: { value: "test" } });

    act(() => {
      jest.runAllTimers();
    });

    expect(consoleSpy).toHaveBeenCalledWith(
      "Searching for:",
      "test",
      expect.any(String)
    );

    consoleSpy.mockRestore();
  });
});


// pages/FavoritesPage/__tests__/FavoritesPage.test.tsx
import { render, screen } from "@testing-library/react";
import FavoritesPage from "@pages/FavoritesPage";
import { TestWrapper } from "@test/testUtils";

// Mock AppLayout
jest.mock("@components/AppLayout", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>
}));

describe("FavoritesPage", () => {
  it("renders favorites page content", () => {
    render(<FavoritesPage />, { wrapper: TestWrapper });

    expect(screen.getByText("Favorites Page")).toBeInTheDocument();
    expect(
      screen.getByText("View your favorite items here.")
    ).toBeInTheDocument();
  });

  it("renders with correct layout", () => {
    render(<FavoritesPage />, { wrapper: TestWrapper });

    const layoutContent = screen.getByText("Favorites Page").closest("div");
    expect(layoutContent).toBeInTheDocument();
    expect(layoutContent).toHaveTextContent("View your favorite items here.");
  });
});


// pages/AboutPage/__tests__/AboutPage.test.tsx
import { render, screen } from "@testing-library/react";
import AboutPage from "@pages/AboutPage";
import { TestWrapper } from "@test/testUtils";

// Mock AppLayout
jest.mock("@components/AppLayout", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>
}));

describe("AboutPage", () => {
  it("renders about page content", () => {
    render(<AboutPage />, { wrapper: TestWrapper });

    expect(screen.getByText("About Page")).toBeInTheDocument();
    expect(
      screen.getByText("Learn more about our application.")
    ).toBeInTheDocument();
  });

  it("renders with correct layout", () => {
    render(<AboutPage />, { wrapper: TestWrapper });

    const layoutContent = screen.getByText("About Page").closest("div");
    expect(layoutContent).toBeInTheDocument();
    expect(layoutContent).toHaveTextContent(
      "Learn more about our application."
    );
  });
});


// pages/RegistrationPage/__tests__/RegistrationPage.test.tsx
import { render, screen } from "@testing-library/react";
import RegistrationPage from "@pages/RegistrationPage";
import { TestWrapper } from "@test/testUtils";

// Mock WelcomeMessage component
jest.mock("@components/WelcomeMessage", () => ({
  __esModule: true,
  default: () => (
    <div data-testid="welcome-message">Welcome Message Component</div>
  )
}));

describe("RegistrationPage", () => {
  it("renders the WelcomeMessage component", () => {
    render(<RegistrationPage />, { wrapper: TestWrapper });

    expect(screen.getByTestId("welcome-message")).toBeInTheDocument();
    expect(screen.getByText("Welcome Message Component")).toBeInTheDocument();
  });
});


// pages/PasswordEntries/EditPage/__tests__/EditPage.test.tsx
import { render, screen } from "@testing-library/react";
import EditPage from "../EditPage";
import { TestWrapper } from "@test/testUtils";

// Mock components
jest.mock("@components/AppLayout", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="app-layout">{children}</div>
  )
}));

jest.mock("@components/PasswordEntry/EditForm", () => ({
  __esModule: true,
  default: () => <div data-testid="edit-password-form" />
}));

describe("EditPage", () => {
  it("should render page with layout and form", () => {
    render(<EditPage />, { wrapper: TestWrapper });

    expect(screen.getByTestId("app-layout")).toBeInTheDocument();
    expect(screen.getByTestId("edit-password-form")).toBeInTheDocument();
  });
});


// pages/PasswordEntries/NewPage/__tests__/NewPage.test.tsx
import { render, screen } from "@testing-library/react";
import NewPage from "../NewPage";
import { TestWrapper } from "@test/testUtils";

// Mock components
jest.mock("@components/AppLayout", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="app-layout">{children}</div>
  )
}));

jest.mock("@components/PasswordEntry/CreateForm", () => ({
  __esModule: true,
  default: () => <div data-testid="create-password-form" />
}));

describe("NewPage", () => {
  it("should render page with layout and form", () => {
    render(<NewPage />, { wrapper: TestWrapper });

    expect(screen.getByTestId("app-layout")).toBeInTheDocument();
    expect(screen.getByTestId("create-password-form")).toBeInTheDocument();
  });
});


// routes/__tests__/routes.test.tsx
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import AppRoutes from "../routes";
import { routesConfig } from "../routes.config";

const mockComponent = (name: string) => ({
  __esModule: true,
  default: () => <div>{name}</div>
});

jest.mock("@pages/IndexPage", () => mockComponent("Index Page"));
jest.mock("@pages/FavoritesPage", () => mockComponent("Favorites Page"));
jest.mock("@pages/LogoutPage", () => mockComponent("Logout Page"));
jest.mock("@pages/SettingsPage", () => mockComponent("Settings Page"));
jest.mock("@pages/AboutPage", () => mockComponent("About Page"));
jest.mock("@pages/NotFoundPage", () => mockComponent("Not Found Page"));
jest.mock("@pages/ShowPage", () => mockComponent("Show Page"));

jest.mock("@pages/PasswordEntries/NewPage", () =>
  mockComponent("Password Entries Create Page")
);
jest.mock("@pages/PasswordEntries/ShowPage", () =>
  mockComponent("Password Entries Show Page")
);
jest.mock("@pages/PasswordEntries/EditPage", () =>
  mockComponent("Password Entries Edit Page")
);

jest.mock("react", () => {
  const originalModule = jest.requireActual("react");
  return {
    ...originalModule,
    Suspense: ({ children }: { children: React.ReactNode }) => <>{children}</>
  };
});

jest.mock("@components/LoadingFallback", () => ({
  __esModule: true,
  default: () => <div data-testid="loading-fallback">Loading...</div>
}));

const ensureAbsolutePath = (path: string) =>
  path.startsWith("/") ? path : `/${path}`;

const renderWithRouter = (initialEntry = "/") => {
  return render(
    <MemoryRouter initialEntries={[ensureAbsolutePath(initialEntry)]}>
      <AppRoutes />
    </MemoryRouter>
  );
};

describe("AppRoutes", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render index page for root path", async () => {
    renderWithRouter("/");
    expect(await screen.findByText("Index Page")).toBeInTheDocument();
  });

  it("should render favorites page", async () => {
    renderWithRouter("/favorites");
    expect(await screen.findByText("Favorites Page")).toBeInTheDocument();
  });

  it("should render logout page", async () => {
    renderWithRouter("/logout");
    expect(await screen.findByText("Logout Page")).toBeInTheDocument();
  });

  it("should render settings page", async () => {
    renderWithRouter("/settings");
    expect(await screen.findByText("Settings Page")).toBeInTheDocument();
  });

  it("should render about page", async () => {
    renderWithRouter("/about");
    expect(await screen.findByText("About Page")).toBeInTheDocument();
  });

  it("should render show new page", async () => {
    renderWithRouter("/password_entries/new");
    expect(
      await screen.findByText("Password Entries Create Page")
    ).toBeInTheDocument();
  });

  it("should render show entry page", async () => {
    renderWithRouter("/password_entries/123");
    expect(
      await screen.findByText("Password Entries Show Page")
    ).toBeInTheDocument();
  });

  it("should render edit entry page", async () => {
    renderWithRouter("/password_entries/123/edit");
    expect(
      await screen.findByText("Password Entries Edit Page")
    ).toBeInTheDocument();
  });

  it("should render not found page for unknown routes", async () => {
    renderWithRouter("/unknown-route");
    expect(await screen.findByText("Not Found Page")).toBeInTheDocument();
  });

  describe("Route configuration", () => {
    it("should have correct routes configuration", () => {
      expect(routesConfig).toEqual([
        { index: true, element: expect.any(Object) },
        { path: "favorites", element: expect.any(Object) },
        { path: "logout", element: expect.any(Object) },
        { path: "settings", element: expect.any(Object) },
        { path: "about", element: expect.any(Object) },
        { path: "/password_entries/new", element: expect.any(Object) },
        { path: "/password_entries/:id", element: expect.any(Object) },
        { path: "/password_entries/:id/edit", element: expect.any(Object) },
        { path: "*", element: expect.any(Object) }
      ]);
    });

    it("should render all routes without crashing", async () => {
      const routeTests = [
        { path: "/", expectedText: "Index Page" },
        { path: "/favorites", expectedText: "Favorites Page" },
        { path: "/logout", expectedText: "Logout Page" },
        { path: "/settings", expectedText: "Settings Page" },
        { path: "/about", expectedText: "About Page" },
        {
          path: "/password_entries/new",
          expectedText: "Password Entries Create Page"
        },
        {
          path: "/password_entries/123",
          expectedText: "Password Entries Show Page"
        },
        {
          path: "/password_entries/123/edit",
          expectedText: "Password Entries Edit Page"
        },
        { path: "/non-existent", expectedText: "Not Found Page" }
      ];

      for (const { path, expectedText } of routeTests) {
        document.body.innerHTML = "";

        renderWithRouter(path);
        expect(await screen.findByText(expectedText)).toBeInTheDocument();
      }
    });
  });
});


// routes/__tests__/index.test.tsx
import AppRoutes from "../routes";
import RoutesExport from "../index";

jest.mock("../routes", () => ({
  __esModule: true,
  default: "mocked-routes"
}));

describe("Routes index", () => {
  it("should re-export AppRoutes component as default", () => {
    expect(RoutesExport).toBe(AppRoutes);
  });

  it("should maintain the same reference as the original export", () => {
    expect(RoutesExport).toBe("mocked-routes");
  });
});


