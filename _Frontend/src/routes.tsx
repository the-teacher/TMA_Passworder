import { Suspense, lazy, ReactNode } from "react";
import { Routes, Route } from "react-router";
import LoadingFallback from "./components/LoadingFallback";

const IndexPage = lazy(() => import("./pages/IndexPage"));
const SettingsPage = lazy(() => import("./pages/SettingsPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

const SuspenseWrapper = ({ children }: { children: ReactNode }) => (
  <Suspense fallback={<LoadingFallback />}>{children}</Suspense>
);

const AppRoutes = () => (
  <Routes>
    <Route
      index
      element={
        <SuspenseWrapper>
          <IndexPage />
        </SuspenseWrapper>
      }
    />
    <Route
      path="settings"
      element={
        <SuspenseWrapper>
          <SettingsPage />
        </SuspenseWrapper>
      }
    />
    <Route
      path="about"
      element={
        <SuspenseWrapper>
          <AboutPage />
        </SuspenseWrapper>
      }
    />
    <Route
      path="*"
      element={
        <SuspenseWrapper>
          <NotFoundPage />
        </SuspenseWrapper>
      }
    />
  </Routes>
);

export default AppRoutes;
