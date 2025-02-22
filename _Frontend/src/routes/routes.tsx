import { Suspense, lazy, ReactNode } from "react";
import { Routes, Route } from "react-router";
import LoadingFallback from "@components/LoadingFallback";

const IndexPage = lazy(() => import("@pages/IndexPage"));
const CreatePasswordPage = lazy(() => import("@pages/CreatePasswordPage"));
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
