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


// components/PasswordEntryList/__tests__/PasswordEntryList.test.tsx
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router";
import PasswordEntryList from "@components/PasswordEntryList";
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
    expect(screen.getByAltText("Search")).toBeInTheDocument();
    expect(screen.getByAltText("Favorites")).toBeInTheDocument();
    expect(screen.getByAltText("Logout")).toBeInTheDocument();
  });

  it("renders correct navigation links", () => {
    renderComponent();

    expect(screen.getByText("Home").closest("a")).toHaveAttribute("href", "/");
    expect(screen.getByText("Create").closest("a")).toHaveAttribute(
      "href",
      "/create"
    );
    expect(screen.getByText("Search").closest("a")).toHaveAttribute(
      "href",
      "/search"
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


// components/PasswordEntryForm/__tests__/PasswordEntryForm.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import PasswordEntryForm from "@components/PasswordEntryForm";

describe("PasswordEntryForm", () => {
  const mockOnSubmit = jest.fn();
  const mockClipboard = {
    writeText: jest.fn()
  };
  const mockConsoleError = jest.spyOn(console, "error").mockImplementation();

  beforeAll(() => {
    Object.defineProperty(navigator, "clipboard", {
      value: mockClipboard,
      configurable: true
    });
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const setup = () => {
    render(<PasswordEntryForm onSubmit={mockOnSubmit} />);
  };

  it("renders form fields", () => {
    setup();
    expect(screen.getByLabelText(/service name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/notes/i)).toBeInTheDocument();
  });

  it("submits form data", () => {
    setup();
    const serviceNameInput = screen.getByLabelText(/service name/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const notesInput = screen.getByLabelText(/notes/i);

    fireEvent.change(serviceNameInput, { target: { value: "Test Service" } });
    fireEvent.change(passwordInput, { target: { value: "TestPassword123" } });
    fireEvent.change(notesInput, { target: { value: "Some notes" } });

    fireEvent.click(screen.getByRole("button", { name: /save/i }));

    expect(mockOnSubmit).toHaveBeenCalledWith({
      serviceName: "Test Service",
      password: "TestPassword123",
      notes: "Some notes"
    });
  });

  it("resets form fields", () => {
    setup();
    const serviceNameInput = screen.getByLabelText(/service name/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const notesInput = screen.getByLabelText(/notes/i);

    fireEvent.change(serviceNameInput, { target: { value: "Test Service" } });
    fireEvent.change(passwordInput, { target: { value: "TestPassword123" } });
    fireEvent.change(notesInput, { target: { value: "Some notes" } });

    fireEvent.click(screen.getByRole("button", { name: /reset/i }));

    expect(serviceNameInput).toHaveValue("");
    expect(passwordInput).toHaveValue("");
    expect(notesInput).toHaveValue("");
  });

  it("toggles password visibility", () => {
    setup();
    const passwordInput = screen.getByLabelText(/password/i);
    const toggleButton = screen.getByTitle(/show password/i);

    expect(passwordInput).toHaveAttribute("type", "password");

    fireEvent.click(toggleButton);

    expect(passwordInput).toHaveAttribute("type", "text");
  });

  it("generates password with correct length and characters", () => {
    setup();
    const passwordInput = screen.getByLabelText(/password/i);
    const generateButton = screen.getByTitle(/generate password/i);

    fireEvent.click(generateButton);

    const generatedPassword = passwordInput.getAttribute("value");
    expect(generatedPassword).toHaveLength(10);
    expect(generatedPassword).toMatch(/^[a-zA-Z0-9!@#$%^&*]+$/);
  });

  it("copies password to clipboard", async () => {
    setup();
    const passwordInput = screen.getByLabelText(/password/i);
    const generateButton = screen.getByTitle(/generate password/i);
    const copyButton = screen.getByTitle(/copy password/i);

    fireEvent.click(generateButton);
    const generatedPassword = passwordInput.getAttribute("value");

    fireEvent.click(copyButton);

    expect(mockClipboard.writeText).toHaveBeenCalledWith(generatedPassword);
  });

  it("handles clipboard error gracefully", async () => {
    setup();
    const generateButton = screen.getByTitle(/generate password/i);
    const copyButton = screen.getByTitle(/copy password/i);

    // Setup clipboard to throw error
    mockClipboard.writeText.mockRejectedValueOnce(new Error("Clipboard error"));

    fireEvent.click(generateButton);
    await fireEvent.click(copyButton);

    await expect(mockConsoleError).toHaveBeenCalledWith(
      "Failed to copy password:",
      expect.any(Error)
    );
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


// components/PasswordEntry/__tests__/PasswordEntry.test.tsx
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router";
import PasswordEntry from "@components/PasswordEntry";

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

jest.mock("../i18n", () => ({
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


// pages/SearchPage/__tests__/SearchPage.test.tsx
import { render, screen } from "@testing-library/react";
import SearchPage from "@pages/SearchPage";
import { TestWrapper } from "@test/testUtils";

// Mock AppLayout
jest.mock("@components/AppLayout", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>
}));

describe("SearchPage", () => {
  it("renders search page content", () => {
    render(<SearchPage />, { wrapper: TestWrapper });

    expect(screen.getByText("Search Page")).toBeInTheDocument();
    expect(screen.getByText("Search for content here.")).toBeInTheDocument();
  });
});


// pages/CreatePage/__tests__/CreatePage.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import CreatePage from "@pages/CreatePage";
import { TestWrapper } from "@test/testUtils";
import "@test/setupFilesAfterEnv";

// Mock AppLayout
jest.mock("@components/AppLayout", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>
}));

describe("CreatePage", () => {
  const mockConsoleLog = jest.spyOn(console, "log").mockImplementation();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders create page content", () => {
    render(<CreatePage />, { wrapper: TestWrapper });
    expect(screen.getByText("Create a Password Entry")).toBeInTheDocument();
  });

  it("handles form submission correctly", () => {
    render(<CreatePage />, { wrapper: TestWrapper });

    // Fill in the form
    const serviceNameInput = screen.getByLabelText(/service name/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const notesInput = screen.getByLabelText(/notes/i);

    fireEvent.change(serviceNameInput, { target: { value: "Test Service" } });
    fireEvent.change(passwordInput, { target: { value: "TestPassword123" } });
    fireEvent.change(notesInput, { target: { value: "Test Notes" } });

    // Submit the form
    const submitButton = screen.getByRole("button", { name: /save/i });
    fireEvent.click(submitButton);

    // Verify console.log was called with correct data
    expect(mockConsoleLog).toHaveBeenCalledWith("Form submitted:", {
      serviceName: "Test Service",
      password: "TestPassword123",
      notes: "Test Notes"
    });
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
import { render, screen } from "@testing-library/react";
import IndexPage from "@pages/IndexPage";
import { TestWrapper } from "@test/testUtils";

// Mock AppLayout
jest.mock("@components/AppLayout", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>
}));

// Mock the PasswordEntryList component
jest.mock("@components/PasswordEntryList", () => ({
  __esModule: true,
  default: () => (
    <div data-testid="mocked-password-entry-list">Mocked Password List</div>
  )
}));

describe("IndexPage", () => {
  it("renders index page content", () => {
    render(<IndexPage />, { wrapper: TestWrapper });
    expect(
      screen.getByTestId("mocked-password-entry-list")
    ).toBeInTheDocument();
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


// routes/__tests__/routes.test.tsx
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import AppRoutes from "../routes";
import { routesConfig } from "../routes";

const mockComponent = (name: string) => ({
  __esModule: true,
  default: () => <div>{name}</div>
});

jest.mock("@pages/IndexPage", () => mockComponent("Index Page"));
jest.mock("@pages/CreatePage", () => mockComponent("Create Page"));
jest.mock("@pages/SearchPage", () => mockComponent("Search Page"));
jest.mock("@pages/FavoritesPage", () => mockComponent("Favorites Page"));
jest.mock("@pages/LogoutPage", () => mockComponent("Logout Page"));
jest.mock("@pages/SettingsPage", () => mockComponent("Settings Page"));
jest.mock("@pages/AboutPage", () => mockComponent("About Page"));
jest.mock("@pages/NotFoundPage", () => mockComponent("Not Found Page"));
jest.mock("@pages/ShowPage", () => mockComponent("Show Page"));

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

  it("should render create page", async () => {
    renderWithRouter("/create");
    expect(await screen.findByText("Create Page")).toBeInTheDocument();
  });

  it("should render search page", async () => {
    renderWithRouter("/search");
    expect(await screen.findByText("Search Page")).toBeInTheDocument();
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

  it("should render show page with id parameter", async () => {
    renderWithRouter("/passwords/123");
    expect(await screen.findByText("Show Page")).toBeInTheDocument();
  });

  it("should render not found page for unknown routes", async () => {
    renderWithRouter("/unknown-route");
    expect(await screen.findByText("Not Found Page")).toBeInTheDocument();
  });

  describe("Route configuration", () => {
    it("should have correct routes configuration", () => {
      expect(routesConfig).toEqual([
        { index: true, element: expect.any(Object) },
        { path: "create", element: expect.any(Object) },
        { path: "search", element: expect.any(Object) },
        { path: "favorites", element: expect.any(Object) },
        { path: "logout", element: expect.any(Object) },
        { path: "settings", element: expect.any(Object) },
        { path: "about", element: expect.any(Object) },
        { path: "passwords/:id", element: expect.any(Object) },
        { path: "*", element: expect.any(Object) }
      ]);
    });

    it("should render all routes without crashing", async () => {
      const routeTests = [
        { path: "/", expectedText: "Index Page" },
        { path: "/create", expectedText: "Create Page" },
        { path: "/search", expectedText: "Search Page" },
        { path: "/favorites", expectedText: "Favorites Page" },
        { path: "/logout", expectedText: "Logout Page" },
        { path: "/settings", expectedText: "Settings Page" },
        { path: "/about", expectedText: "About Page" },
        { path: "/passwords/123", expectedText: "Show Page" },
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


