import { Suspense } from "react";
import { BrowserRouter } from "react-router";
import AppRoutes from "@routes/index";
import "./globalStyles.scss";

const App = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </Suspense>
);

export default App;
