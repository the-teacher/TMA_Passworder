import { Suspense } from "react";
import { BrowserRouter } from "react-router";
import AppRoutes from "./routes";

// import Navigation from "./components/Navigation";
import Header from "./components/Header";
import { HolyGrailLayoutWithParams } from "./components/HolyGrailLayout";
import FooterNavigation from "./components/FooterNavigation/FooterNavigation";

import "./globalStyles.scss";

const App = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <BrowserRouter>
      <HolyGrailLayoutWithParams
        header={<Header />}
        // leftSidebar={<Navigation />}
        content={<AppRoutes />}
        footer={<FooterNavigation />}
      />
    </BrowserRouter>
  </Suspense>
);

export default App;
