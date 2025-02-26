import { lazy } from "react";
import { newPasswordEntryPath, editPasswordEntryPath } from "./helpers";

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

const PasswordEntriesEditPage = lazy(
  () => import("@pages/PasswordEntries/EditPage")
);

// RESTful routes for PasswordEntries
// { path: "password_entries", element: <PasswordEntriesIndexPage /> },
// { path: "password_entries/:id", element: <PasswordEntriesShowPage /> },

export const routesConfig = [
  // Main routes
  { index: true, element: <IndexPage /> },
  { path: "favorites", element: <FavoritesPage /> },
  { path: "logout", element: <LogoutPage /> },
  { path: "settings", element: <SettingsPage /> },
  { path: "about", element: <AboutPage /> },

  // RESTful routes for PasswordEntries
  { path: newPasswordEntryPath(), element: <PasswordEntriesNewPage /> },
  { path: editPasswordEntryPath(), element: <PasswordEntriesEditPage /> },

  // 404 route
  { path: "*", element: <NotFoundPage /> }
];
