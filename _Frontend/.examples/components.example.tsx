// index.tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { I18nextProvider } from "react-i18next";
import i18n from "@i18n/index";

export const render = () => {
  const rootElement = document.getElementById("root");

  if (!rootElement) {
    console.error("Unable to find root element");
    return;
  }

  createRoot(rootElement).render(
    <StrictMode>
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
    </StrictMode>
  );
};

render();

// App.tsx
import { Suspense } from "react";
import { BrowserRouter } from "react-router";
import AppRoutes from "@routes/index";
import "./globalStyles.scss";

const App = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </Suspense>
);

export default App;

// components/HolyGrailLayout/HolyGrailLayoutWithParams.tsx
import { type ReactNode } from "react";
import "./layout.scss";
import {
  Header,
  MainColumns,
  AsideLeft,
  MainContent,
  AsideRight,
  Footer
} from "./";
import HolyGrailLayout from "./HolyGrailLayout";

type HolyGrailLayoutWithParamsProps = {
  header?: ReactNode;
  leftSidebar?: ReactNode;
  content: ReactNode;
  rightSidebar?: ReactNode;
  footer?: ReactNode;
  layoutRoot?: string;
};

const HolyGrailLayoutWithParams = ({
  header,
  leftSidebar,
  content,
  rightSidebar,
  footer,
  layoutRoot
}: HolyGrailLayoutWithParamsProps) => (
  <HolyGrailLayout layoutRoot={layoutRoot}>
    {header && <Header>{header}</Header>}

    <MainColumns>
      {leftSidebar && <AsideLeft>{leftSidebar}</AsideLeft>}
      <MainContent>{content}</MainContent>
      {rightSidebar && <AsideRight>{rightSidebar}</AsideRight>}
    </MainColumns>

    {footer && <Footer>{footer}</Footer>}
  </HolyGrailLayout>
);

export default HolyGrailLayoutWithParams;

// components/HolyGrailLayout/HolyGrailLayout.tsx
import { type ReactNode, useEffect } from "react";
import "./layout.scss";

const LAYOUT_CLASS = "holy-grail";
const DEFAULT_ROOT = "body";

type HolyGrailLayoutProps = {
  children: ReactNode;
  layoutRoot?: string;
};

const HolyGrailLayout = ({
  children,
  layoutRoot = DEFAULT_ROOT
}: HolyGrailLayoutProps) => {
  useEffect(() => {
    const element = document.querySelector(layoutRoot);
    if (!element) {
      console.warn(`Element with selector "${layoutRoot}" not found`);
      return;
    }

    element.classList.add(LAYOUT_CLASS);

    return () => {
      element.classList.remove(LAYOUT_CLASS);
    };
  }, [layoutRoot]);

  return <>{children}</>;
};

export default HolyGrailLayout;

// components/HolyGrailLayout/components/Footer/Footer.tsx
import { type ReactNode } from "react";

const Footer = ({ children }: { children: ReactNode }) => (
  <footer className="holy-grail--footer">
    <div className="holy-grail--container">{children}</div>
  </footer>
);

export default Footer;

// components/HolyGrailLayout/components/MainColumns/MainColumns.tsx
import { type ReactNode } from "react";

const MainColumns = ({ children }: { children: ReactNode }) => (
  <div className="holy-grail--main">
    <div className="holy-grail--container holy-grail--main-columns">
      {children}
    </div>
  </div>
);

export default MainColumns;

// components/HolyGrailLayout/components/AsideLeft/AsideLeft.tsx
import { type ReactNode } from "react";

const AsideLeft = ({ children }: { children: ReactNode }) => (
  <aside className="holy-grail--aside">{children}</aside>
);

export default AsideLeft;

// components/HolyGrailLayout/components/AsideRight/AsideRight.tsx
import { type ReactNode } from "react";

const AsideRight = ({ children }: { children: ReactNode }) => (
  <aside className="holy-grail--aside">{children}</aside>
);

export default AsideRight;

// components/HolyGrailLayout/components/MainContent/MainContent.tsx
import { type ReactNode } from "react";

const MainContent = ({ children }: { children: ReactNode }) => (
  <main className="holy-grail--content">{children}</main>
);

export default MainContent;

// components/HolyGrailLayout/components/Header/Header.tsx
import { type ReactNode } from "react";

const Header = ({ children }: { children: ReactNode }) => (
  <header className="holy-grail--header">
    <div className="holy-grail--container">{children}</div>
  </header>
);

export default Header;

// components/PasswordEntryList/PasswordEntryList.tsx
import PasswordEntry from "@components/PasswordEntry";
import popularServices from "@mocks/popularServices"; // Import the mock data
import "./styles.scss";

type PasswordEntryType = {
  id: string;
  name: string;
};

const mockEntries: PasswordEntryType[] = popularServices.map(
  (service, index) => ({
    id: `entry-${index + 1}`,
    name: service
  })
);

const PasswordEntryList = () => (
  <div className="password-entry-list">
    {mockEntries.map((entry) => (
      <PasswordEntry key={entry.id} {...entry} />
    ))}
  </div>
);

export default PasswordEntryList;

// components/LoadingFallback/LoadingFallback.tsx
import "./styles.scss";

const LoadingFallback = () => (
  <div className="loading-fallback--container">
    <div className="loading-fallback--text">Loading...</div>
  </div>
);

export default LoadingFallback;

// components/FooterNavigation/FooterNavigation.tsx
import { NavLink } from "react-router";
import { useTranslation } from "react-i18next";
import "./styles.scss";

interface ImageProps {
  src: string;
  alt: string;
  className?: string;
}

interface ImageTitleProps {
  children: React.ReactNode;
  className?: string;
}

const Image = ({
  src,
  alt,
  className = "footer-navigation__icon"
}: ImageProps) => <img className={className} src={src} alt={alt} />;

const ImageTitle = ({
  children,
  className = "footer-navigation__text"
}: ImageTitleProps) => <span className={className}>{children}</span>;

const FooterNavigation = () => {
  const { t } = useTranslation("footerNavigation");

  return (
    <nav className="footer-navigation">
      <NavLink to="/" className="footer-navigation__item">
        <Image src="/icons/home.svg" alt={t("home")} />
        <ImageTitle>{t("home")}</ImageTitle>
      </NavLink>
      <NavLink to="/create" className="footer-navigation__item">
        <Image src="/icons/circle-plus.svg" alt={t("create")} />
        <ImageTitle>{t("create")}</ImageTitle>
      </NavLink>
      <NavLink to="/search" className="footer-navigation__item">
        <Image src="/icons/search.svg" alt={t("search")} />
        <ImageTitle>{t("search")}</ImageTitle>
      </NavLink>
      <NavLink to="/favorites" className="footer-navigation__item">
        <Image src="/icons/star.svg" alt={t("favorites")} />
        <ImageTitle>{t("favorites")}</ImageTitle>
      </NavLink>
      <NavLink to="/logout" className="footer-navigation__item">
        <Image src="/icons/square-x.svg" alt={t("logout")} />
        <ImageTitle>{t("logout")}</ImageTitle>
      </NavLink>
    </nav>
  );
};

export default FooterNavigation;

// components/AppIcon/AppIcon.tsx
import React from "react";

export type IconSize = 12 | 16 | 20 | 24 | 28 | 32;
export type IconType =
  | "circle-plus"
  | "clipboard-check"
  | "eye-off"
  | "eye"
  | "home"
  | "refresh"
  | "search"
  | "settings"
  | "square-x"
  | "star";

type AppIconProps = {
  size: IconSize;
  type: IconType;
  alt: string;
} & React.HTMLAttributes<HTMLElement>;

function AppIcon({ size, type, alt, ...props }: AppIconProps) {
  const iconPath = `/icons/${type}.svg`;

  return <img src={iconPath} width={size} height={size} alt={alt} {...props} />;
}

export default AppIcon;

// components/PasswordEntry/PasswordEntry.tsx
import { Link } from "react-router";
import "./styles.scss";

const PasswordEntry = ({ id, name }: { id: string; name: string }) => (
  <Link to={`/password-entry/${id}`} className="password-entry">
    <span className="password-entry--name">{name}</span>
  </Link>
);

export default PasswordEntry;

// components/CreatePasswordForm/CreatePasswordForm.tsx
import { useState, FormEvent } from "react";
import { useTranslation } from "react-i18next";
import "@ui-kit/form-inputs.scss";
import "@ui-kit/buttons.scss";
import "@ui-kit/form-groups.scss";
import "@ui-kit/common.scss";
import "./styles.scss";
import AppIcon from "@components/AppIcon";

const PASSWORD_LENGTH = 10;
const PASSWORD_CHARS =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";

type CreatePasswordFormData = {
  serviceName: string;
  username: string;
  password: string;
  serviceUrl: string;
  notes: string;
};

type CreatePasswordFormProps = {
  onSubmit: (data: CreatePasswordFormData) => void;
};

const CreatePasswordForm = ({ onSubmit }: CreatePasswordFormProps) => {
  const { t } = useTranslation("CreatePasswordForm");
  const { t: c } = useTranslation("common");

  const [formData, setFormData] = useState<CreatePasswordFormData>({
    serviceName: "",
    username: "",
    password: "",
    serviceUrl: "",
    notes: ""
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleReset = () => {
    setFormData({
      serviceName: "",
      username: "",
      password: "",
      serviceUrl: "",
      notes: ""
    });
  };

  const generatePassword = () => {
    const password = Array.from(
      { length: PASSWORD_LENGTH },
      () => PASSWORD_CHARS[Math.floor(Math.random() * PASSWORD_CHARS.length)]
    ).join("");

    setFormData((prev) => ({ ...prev, password }));
  };

  const handleInputChange =
    (field: keyof CreatePasswordFormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const copyPassword = async () => {
    try {
      await navigator.clipboard.writeText(formData.password);
    } catch (err) {
      console.error("Failed to copy password:", err);
    }
  };

  return (
    <>
      <h2 className="text-center">{t("title")}</h2>

      <form
        className="create-password-form"
        onSubmit={handleSubmit}
        role="create-password-form"
      >
        <div className="form-group">
          <label className="form-group--label" htmlFor="serviceName">
            {t("fields.serviceName")}
          </label>
          <input
            className="form-input"
            id="serviceName"
            type="text"
            value={formData.serviceName}
            onChange={handleInputChange("serviceName")}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-group--label" htmlFor="username">
            {t("fields.username")}
          </label>
          <input
            className="form-input"
            id="username"
            type="text"
            value={formData.username}
            onChange={handleInputChange("username")}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-group--label" htmlFor="serviceUrl">
            {t("fields.url")}
          </label>
          <input
            className="form-input"
            id="serviceUrl"
            type="url"
            value={formData.serviceUrl}
            onChange={handleInputChange("serviceUrl")}
            placeholder="https://"
          />
        </div>

        <div className="form-group">
          <label className="form-group--label" htmlFor="password">
            {t("fields.password")}

            <AppIcon
              size={16}
              type={showPassword ? "eye-off" : "eye"}
              onClick={() => setShowPassword(!showPassword)}
              title={t(
                showPassword ? "actions.hidePassword" : "actions.showPassword"
              )}
              alt={t(
                showPassword ? "actions.hidePassword" : "actions.showPassword"
              )}
            />
          </label>
          <div className="form-group--input form-group--with-icon">
            <input
              className="form-input"
              id="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleInputChange("password")}
              required
            />

            <button
              type="button"
              className="btn btn--icon"
              onClick={copyPassword}
              title={t("actions.copyPassword")}
            >
              <img
                src="/icons/clipboard-check.svg"
                alt={t("actions.copyPassword")}
              />
            </button>

            <button
              type="button"
              className="btn btn--icon"
              onClick={generatePassword}
              title={t("actions.generatePassword")}
            >
              <img
                src="/icons/refresh.svg"
                alt={t("actions.generatePassword")}
              />
            </button>
          </div>
        </div>

        <div className="form-group">
          <label className="form-group--label" htmlFor="notes">
            {t("fields.notes")}
          </label>
          <textarea
            className="form-input"
            id="notes"
            value={formData.notes}
            onChange={handleInputChange("notes")}
            rows={4}
          />
        </div>

        <div className="form-group--actions">
          <button type="submit" className="btn btn--primary">
            {c("save")}
          </button>
          <button
            type="button"
            className="btn btn--secondary"
            onClick={handleReset}
          >
            {c("reset")}
          </button>
        </div>
      </form>
    </>
  );
};

export default CreatePasswordForm;

// components/Header/Header.tsx
import { NavLink } from "react-router";
import { useTranslation } from "react-i18next";
import { settingsPath } from "@routes/helpers";
import "./styles.scss";

const Header = () => {
  const { t } = useTranslation();

  return (
    <div className="app-header">
      <h1 className="app-header__title">{t("app.name")}</h1>
      <NavLink to={settingsPath()} className="app-header__settings">
        <img
          className="app-header__settings-icon"
          src="/icons/settings.svg"
          alt={t("app.settings")}
        />
      </NavLink>
    </div>
  );
};

export default Header;

// components/AppLayout/AppLayout.tsx
import { ReactNode } from "react";
import Header from "@components/Header";
import FooterNavigation from "@components/FooterNavigation";
import { HolyGrailLayoutWithParams } from "@components/HolyGrailLayout";

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <HolyGrailLayoutWithParams
      header={<Header />}
      content={children}
      footer={<FooterNavigation />}
    />
  );
};

export default AppLayout;

// pages/ShowPage/ShowPage.tsx
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import AppLayout from "@components/AppLayout";
import "./styles.scss";

// Mock data for now
const mockPasswordEntry = {
  id: "123",
  title: "Gmail Account",
  username: "user@gmail.com",
  password: "securePassword123",
  url: "https://gmail.com",
  notes: "Work email account\nBackup email: backup@gmail.com"
};

const ShowPage = () => {
  const { t } = useTranslation("passwordEntry");
  const { t: c } = useTranslation("common");

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // TODO: Add toast notification
  };

  return (
    <AppLayout>
      <div className="show-page">
        <div className="show-page__header">
          <h1 className="show-page__title">{mockPasswordEntry.title}</h1>
          <Link
            to={`/passwords/${mockPasswordEntry.id}/edit`}
            className="show-page__edit-button"
          >
            {c("edit")}
          </Link>
        </div>

        <div className="show-page__content">
          <div className="show-page__field">
            <label className="show-page__label">{t("username")}</label>
            <div className="show-page__value-container">
              <span className="show-page__value">
                {mockPasswordEntry.username}
              </span>
              <button
                className="show-page__copy-button"
                onClick={() => copyToClipboard(mockPasswordEntry.username)}
                aria-label={t("copy")}
              >
                <img src="/icons/clipboard-check.svg" alt={c("copy")} />
              </button>
            </div>
          </div>

          <div className="show-page__field">
            <label className="show-page__label">{t("password")}</label>
            <div className="show-page__value-container">
              <span className="show-page__value">
                {isPasswordVisible ? mockPasswordEntry.password : "••••••••"}
              </span>
              <button
                className="show-page__visibility-button"
                onClick={togglePasswordVisibility}
                aria-label={c(isPasswordVisible ? "hide" : "show")}
              >
                <img
                  src={`/icons/${isPasswordVisible ? "eye-off" : "eye"}.svg`}
                  alt={c(isPasswordVisible ? "hide" : "show")}
                />
              </button>
              <button
                className="show-page__copy-button"
                onClick={() => copyToClipboard(mockPasswordEntry.password)}
                aria-label={c("copy")}
              >
                <img src="/icons/clipboard-check.svg" alt={c("copy")} />
              </button>
            </div>
          </div>

          {mockPasswordEntry.url && (
            <div className="show-page__field">
              <label className="show-page__label">{t("url")}</label>
              <div className="show-page__value-container">
                <a
                  href={mockPasswordEntry.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="show-page__value show-page__link"
                >
                  {mockPasswordEntry.url}
                </a>
                <button
                  className="show-page__copy-button"
                  onClick={() => copyToClipboard(mockPasswordEntry.url)}
                  aria-label={t("common.copy")}
                >
                  <img src="/icons/clipboard-check.svg" alt={c("copy")} />
                </button>
              </div>
            </div>
          )}

          {mockPasswordEntry.notes && (
            <div className="show-page__field">
              <label className="show-page__label">{t("notes")}</label>
              <div className="show-page__notes">
                {mockPasswordEntry.notes.split("\n").map((line, index) => (
                  <p key={index}>{line}</p>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default ShowPage;

// pages/LogoutPage/LogoutPage.tsx
import AppLayout from "@components/AppLayout";

const LogoutPage = () => {
  // В реальном приложении здесь будет логика выхода
  return (
    <AppLayout>
      <div>
        <h2>Logging out...</h2>
        <p>You will be redirected shortly.</p>
      </div>
    </AppLayout>
  );
};

export default LogoutPage;

// pages/SearchPage/SearchPage.tsx
import AppLayout from "@components/AppLayout";

const SearchPage = () => (
  <AppLayout>
    <div>
      <h2>Search Page</h2>
      <p>Search for content here.</p>
    </div>
  </AppLayout>
);

export default SearchPage;

// pages/SettingsPage/SettingsPage.tsx
import AppLayout from "@components/AppLayout";

const SettingsPage = () => (
  <AppLayout>
    <div>
      <h2>Settings Page</h2>
      <p>Manage your application settings here.</p>
    </div>
  </AppLayout>
);

export default SettingsPage;

// pages/IndexPage/IndexPage.tsx
import AppLayout from "@components/AppLayout";
import PasswordEntryList from "@components/PasswordEntryList";

const IndexPage = () => (
  <AppLayout>
    <PasswordEntryList />
  </AppLayout>
);

export default IndexPage;

// pages/NotFoundPage/NotFoundPage.tsx
import AppLayout from "@components/AppLayout";
import "./styles.scss";

const NotFoundPage = () => (
  <AppLayout>
    <div className="not-found--container">
      <h1 className="not-found--title">404</h1>
      <p className="not-found--text">Not Found</p>
    </div>
  </AppLayout>
);

export default NotFoundPage;

// pages/FavoritesPage/FavoritesPage.tsx
import AppLayout from "@components/AppLayout";

const FavoritesPage = () => (
  <AppLayout>
    <div>
      <h2>Favorites Page</h2>
      <p>View your favorite items here.</p>
    </div>
  </AppLayout>
);

export default FavoritesPage;

// pages/AboutPage/AboutPage.tsx
import AppLayout from "@components/AppLayout";

const AboutPage = () => (
  <AppLayout>
    <div>
      <h2>About Page</h2>
      <p>Learn more about our application.</p>
    </div>
  </AppLayout>
);

export default AboutPage;

// pages/CreatePasswordPage/CreatePasswordPage.tsx
import CreatePasswordForm from "@components/CreatePasswordForm";
import AppLayout from "@components/AppLayout";
import type { PasswordEntryData } from "./types";
import "@ui-kit/common.scss";

const CreatePasswordPage = () => {
  const handleSubmit = (data: PasswordEntryData) => {
    // Handle form submission
    console.log("Form submitted:", data);
  };

  return (
    <AppLayout>
      <CreatePasswordForm onSubmit={handleSubmit} />
    </AppLayout>
  );
};

export default CreatePasswordPage;

// routes/routes.tsx
import { Suspense, lazy, ReactNode } from "react";
import { Routes, Route } from "react-router";
import LoadingFallback from "@components/LoadingFallback";

const IndexPage = lazy(() => import("@pages/IndexPage"));
const CreatePasswordPage = lazy(() => import("@pages/CreatePasswordPage"));
const SearchPage = lazy(() => import("@pages/SearchPage"));
const FavoritesPage = lazy(() => import("@pages/FavoritesPage"));
const LogoutPage = lazy(() => import("@pages/LogoutPage"));
const SettingsPage = lazy(() => import("@pages/SettingsPage"));
const AboutPage = lazy(() => import("@pages/AboutPage"));
const NotFoundPage = lazy(() => import("@pages/NotFoundPage"));
const ShowPage = lazy(() => import("@pages/ShowPage"));

const SuspenseWrapper = ({ children }: { children: ReactNode }) => (
  <Suspense fallback={<LoadingFallback />}>{children}</Suspense>
);

export const routesConfig = [
  { index: true, element: <IndexPage /> },
  { path: "create", element: <CreatePasswordPage /> },
  { path: "search", element: <SearchPage /> },
  { path: "favorites", element: <FavoritesPage /> },
  { path: "logout", element: <LogoutPage /> },
  { path: "settings", element: <SettingsPage /> },
  { path: "about", element: <AboutPage /> },
  { path: "passwords/:id", element: <ShowPage /> },
  { path: "*", element: <NotFoundPage /> }
];

const AppRoutes = () => (
  <Routes>
    {routesConfig.map(({ element, ...routeProps }, index) => (
      <Route
        key={index}
        {...routeProps}
        element={<SuspenseWrapper>{element}</SuspenseWrapper>}
      />
    ))}
  </Routes>
);

export default AppRoutes;
