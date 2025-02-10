import { Suspense } from "react";
import { BrowserRouter } from "react-router";
import AppRoutes from "./routes";

import Navigation from "./components/Navigation";
import { HolyGrailLayoutWithParams } from "./components/HolyGrailLayout";
import FooterNavigation from "./components/FooterNavigation/FooterNavigation";

import "./globalStyles.scss";

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
