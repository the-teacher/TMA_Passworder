import { Suspense, ReactNode } from "react";
import { Routes, Route } from "react-router";
import LoadingFallback from "@components/LoadingFallback";
import { routesConfig } from "./routes.config";

const SuspenseWrapper = ({ children }: { children: ReactNode }) => (
  <Suspense fallback={<LoadingFallback />}>{children}</Suspense>
);

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
