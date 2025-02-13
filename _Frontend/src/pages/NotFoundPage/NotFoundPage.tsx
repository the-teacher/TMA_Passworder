import AppLayout from "../../components/AppLayout";
import "./styles.scss";

const NotFoundPage = () => (
  <AppLayout>
    <div className="not-found--container">
      <h1 className="not-found--title">404</h1>
      <p className="not-found--text">Not Found</p>
    </div>
  </AppLayout>
);

export default NotFoundPage;
