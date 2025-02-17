// components/HolyGrailLayout/__tests__/HolyGrailLayout.test.tsx
import { render, screen } from "@testing-library/react";
import HolyGrailLayout from "@components/HolyGrailLayout";

describe("HolyGrailLayout", () => {
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
});

// components/HolyGrailLayout/__tests__/HolyGrailLayoutWithParams.test.tsx
import { render, screen } from "@testing-library/react";
import HolyGrailLayoutWithParams from "@components/HolyGrailLayoutWithParams";

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

// pages/CreatePage/__tests__/CreatePage.test.tsx
import { render, screen } from "@testing-library/react";
import CreatePage from "@pages/CreatePage";
import { TestWrapper } from "@test/testUtils";
import "@test/setupFilesAfterEnv";

// Mock AppLayout
jest.mock("@components/AppLayout", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>
}));

describe("CreatePage", () => {
  it("renders create page content", () => {
    render(<CreatePage />, { wrapper: TestWrapper });
    expect(screen.getByText("Create a Password Entry")).toBeInTheDocument();
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
});
