import { Suspense } from "react";
import { BrowserRouter, useRoutes } from "react-router";
import { routes } from "./routes";

import Navigation from "./components/Navigation";
import { HolyGrailLayoutWithParams } from "./components/HolyGrailLayout";
import FooterNavigation from "./components/FooterNavigation/FooterNavigation";

import "./globalStyles.scss";

const AppRoutes = () => {
  return useRoutes(routes);
};

const App = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <BrowserRouter>
      <HolyGrailLayoutWithParams
        header={<h1>My Application</h1>}
        leftSidebar={<Navigation />}
        content={<AppRoutes />}
        footer={<FooterNavigation />}
      />
    </BrowserRouter>
  </Suspense>
);

export default App;
