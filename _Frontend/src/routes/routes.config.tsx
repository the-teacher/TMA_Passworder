import { lazy } from "react";
import { newPasswordEntryPath } from "./helpers";

// Main pages
const IndexPage = lazy(() => import("@pages/IndexPage"));
const FavoritesPage = lazy(() => import("@pages/FavoritesPage"));
const LogoutPage = lazy(() => import("@pages/LogoutPage"));
const SettingsPage = lazy(() => import("@pages/SettingsPage"));
const AboutPage = lazy(() => import("@pages/AboutPage"));
const NotFoundPage = lazy(() => import("@pages/NotFoundPage"));
const PasswordEntriesNewPage = lazy(
  () => import("@pages/PasswordEntries/NewPage")
);

// RESTful routes for PasswordEntries
// { path: "password_entries", element: <PasswordEntriesIndexPage /> },
// { path: "password_entries/:id", element: <PasswordEntriesShowPage /> },
// { path: "password_entries/:id/edit", element: <PasswordEntriesEditPage /> },

export const routesConfig = [
  // Main routes
  { index: true, element: <IndexPage /> },
  { path: "favorites", element: <FavoritesPage /> },
  { path: "logout", element: <LogoutPage /> },
  { path: "settings", element: <SettingsPage /> },
  { path: "about", element: <AboutPage /> },

  // RESTful routes for PasswordEntries
  { path: newPasswordEntryPath(), element: <PasswordEntriesNewPage /> },

  // 404 route
  { path: "*", element: <NotFoundPage /> }
];
