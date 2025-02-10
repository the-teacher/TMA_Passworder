import { Suspense, lazy, ReactNode } from "react";
import { Routes, Route, RouteProps } from "react-router";
import LoadingFallback from "./components/LoadingFallback";

const IndexPage = lazy(() => import("./pages/IndexPage"));
const CreatePage = lazy(() => import("./pages/CreatePage"));
const SearchPage = lazy(() => import("./pages/SearchPage"));
const FavoritesPage = lazy(() => import("./pages/FavoritesPage"));
const LogoutPage = lazy(() => import("./pages/LogoutPage"));
const SettingsPage = lazy(() => import("./pages/SettingsPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

const SuspenseWrapper = ({ children }: { children: ReactNode }) => (
  <Suspense fallback={<LoadingFallback />}>{children}</Suspense>
);

const AppRoute = ({
  element,
  ...props
}: {
  element: ReactNode;
  path?: string;
  index?: boolean;
}) => (
  <Route {...props} element={<SuspenseWrapper>{element}</SuspenseWrapper>} />
);

const routesConfig = [
  { index: true, element: <IndexPage /> },
  { path: "create", element: <CreatePage /> },
  { path: "search", element: <SearchPage /> },
  { path: "favorites", element: <FavoritesPage /> },
  { path: "logout", element: <LogoutPage /> },
  { path: "settings", element: <SettingsPage /> },
  { path: "about", element: <AboutPage /> },
  { path: "*", element: <NotFoundPage /> },
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
