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


// components/PasswordEntry/Item/__tests__/PasswordEntry.test.tsx
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router";
import PasswordEntry from "@components/PasswordEntry/Item";

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
      `/password-entry/${mockProps.id}`
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
        `/password-entry/entry-${index + 1}`
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

// Mock Header, FooterNavigation, and HolyGrailLayoutWithParams components
jest.mock("@components/Header", () => () => <div>Mock Header</div>);
jest.mock("@components/FooterNavigation", () => () => <div>Mock Footer</div>);
jest.mock("@components/HolyGrailLayout", () => ({
  HolyGrailLayoutWithParams: ({ header, content, footer }: any) => (
    <div>
      {header}
      {content}
      {footer}
    </div>
  )
}));

describe("AppLayout", () => {
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
});


// __tests__/App.test.tsx
import { render, screen } from "@testing-library/react";
import App from "../App";

// Mock the router component
jest.mock("react-router", () => ({
  BrowserRouter: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="browser-router">{children}</div>
  )
}));

// Mock the routes component
jest.mock("@routes/index", () => {
  const MockRoutes = () => <div data-testid="app-routes">Routes Content</div>;
  return MockRoutes;
});

// Mock the global styles import
jest.mock("./globalStyles.scss", () => ({}));

describe("App", () => {
  it("renders with router and routes", () => {
    render(<App />);

    // Should find the router wrapper
    expect(screen.getByTestId("browser-router")).toBeInTheDocument();

    // Should find the routes content
    expect(screen.getByTestId("app-routes")).toBeInTheDocument();

    // Should contain the routes content text
    expect(screen.getByText("Routes Content")).toBeInTheDocument();
  });

  it("has correct component structure", () => {
    const { container } = render(<App />);

    // Check that router contains routes
    const router = screen.getByTestId("browser-router");
    const routes = screen.getByTestId("app-routes");
    expect(router).toContainElement(routes);

    // Verify there's only one root element in the container
    expect(container.childNodes).toHaveLength(1);
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


// pages/PasswordEntries/NewPage/__tests__/NewPage.test.tsx
import { render, screen } from "@testing-library/react";
import CreatePasswordPage from "@pages/PasswordEntries/NewPage";
import { TestWrapper } from "@test/testUtils";
import "@test/setupFilesAfterEnv";
import type { PasswordEntryData } from "@pages/PasswordEntries/NewPage/types";

// Mock AppLayout
jest.mock("@components/AppLayout", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="app-layout">{children}</div>
  )
}));

// Mock CreatePasswordEntryForm using a more type-safe approach
let mockSubmitHandler: ((data: PasswordEntryData) => void) | null = null;

jest.mock("@components/PasswordEntry/CreateForm", () => ({
  __esModule: true,
  default: ({ onSubmit }: { onSubmit: (data: PasswordEntryData) => void }) => {
    mockSubmitHandler = onSubmit;
    return <div data-testid="create-password-form" />;
  }
}));

describe("CreatePasswordPage", () => {
  const mockConsoleLog = jest.spyOn(console, "log").mockImplementation();

  beforeEach(() => {
    jest.clearAllMocks();
    mockSubmitHandler = null;
  });

  it("renders within AppLayout with CreatePasswordEntryForm", () => {
    render(<CreatePasswordPage />, { wrapper: TestWrapper });

    expect(screen.getByTestId("app-layout")).toBeInTheDocument();
    expect(screen.getByTestId("create-password-form")).toBeInTheDocument();
  });

  it("handles form submission from CreatePasswordEntryForm", () => {
    render(<CreatePasswordPage />, { wrapper: TestWrapper });

    const testData: PasswordEntryData = {
      serviceName: "Test Service",
      username: "testuser",
      password: "TestPassword123",
      serviceUrl: "https://test.com",
      notes: "Test Notes"
    };

    // Trigger mock form submission using the mockSubmitHandler
    expect(mockSubmitHandler).toBeTruthy();
    mockSubmitHandler?.(testData);

    expect(mockConsoleLog).toHaveBeenCalledWith("Form submitted:", testData);
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


