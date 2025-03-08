import { Suspense } from "react";
import { BrowserRouter } from "react-router";
import AppRoutes from "@routes/index";
import RegistrationPage from "@pages/RegistrationPage";
import LoadingFallback from "@components/LoadingFallback";
import { useUserExists } from "@hooks/useUserExists";
import "./globalStyles.scss";

const App = () => {
  const { isLoading, userExists } = useUserExists();

  // Show loading state while checking user existence
  if (isLoading) {
    return <LoadingFallback />;
  }

  // Show registration page if user doesn't exist
  if (!userExists) {
    return <RegistrationPage />;
  }

  // Show main application if user exists
  return (
    <Suspense fallback={<LoadingFallback />}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </Suspense>
  );
};

export default App;
