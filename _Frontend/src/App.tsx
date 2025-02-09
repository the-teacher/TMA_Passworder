import { RouterProvider, createBrowserRouter } from "react-router";
import { routes } from "./routes";
import { HolyGrailLayoutWithParams } from "./components/HolyGrailLayout";
import { Suspense } from "react";
import Navigation from "./components/Navigation";
import "./globalStyles.scss";

const router = createBrowserRouter(routes);

const App = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <HolyGrailLayoutWithParams
      header={<h1>My Application</h1>}
      leftSidebar={<Navigation />}
      content={<RouterProvider router={router} />}
      footer={<p>Footer Content © 2024</p>}
    />
  </Suspense>
);

export default App;
