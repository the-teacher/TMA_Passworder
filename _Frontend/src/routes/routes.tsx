import { Suspense, lazy, ReactNode } from "react";
import { Routes, Route } from "react-router";
import LoadingFallback from "@components/LoadingFallback";

// Main pages
const IndexPage = lazy(() => import("@pages/IndexPage"));
const FavoritesPage = lazy(() => import("@pages/FavoritesPage"));
const LogoutPage = lazy(() => import("@pages/LogoutPage"));
const SettingsPage = lazy(() => import("@pages/SettingsPage"));
const AboutPage = lazy(() => import("@pages/AboutPage"));
const NotFoundPage = lazy(() => import("@pages/NotFoundPage"));

// PasswordEntry CRUD pages
const PasswordEntriesIndexPage = lazy(
  () => import("@pages/PasswordEntries/IndexPage")
);
const PasswordEntriesNewPage = lazy(
  () => import("@pages/PasswordEntries/NewPage")
);
const PasswordEntriesShowPage = lazy(
  () => import("@pages/PasswordEntries/ShowPage")
);
const PasswordEntriesEditPage = lazy(
  () => import("@pages/PasswordEntries/EditPage")
);

const SuspenseWrapper = ({ children }: { children: ReactNode }) => (
  <Suspense fallback={<LoadingFallback />}>{children}</Suspense>
);

export const routesConfig = [
  // Main routes
  { index: true, element: <IndexPage /> },
  { path: "favorites", element: <FavoritesPage /> },
  { path: "logout", element: <LogoutPage /> },
  { path: "settings", element: <SettingsPage /> },
  { path: "about", element: <AboutPage /> },

  // RESTful routes for PasswordEntries
  { path: "password_entries", element: <PasswordEntriesIndexPage /> },
  { path: "password_entries/new", element: <PasswordEntriesNewPage /> },
  { path: "password_entries/:id", element: <PasswordEntriesShowPage /> },
  { path: "password_entries/:id/edit", element: <PasswordEntriesEditPage /> },

  // 404 route
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
