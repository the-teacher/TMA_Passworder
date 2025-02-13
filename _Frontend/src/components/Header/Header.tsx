import { NavLink } from "react-router";
import { useTranslation } from "react-i18next";
import "./styles.scss";

const Header = () => {
  const { t } = useTranslation();

  return (
    <header className="app-header">
      <h1 className="app-header__title">{t("app.name")}</h1>
      <NavLink to="/settings" className="app-header__settings">
        <img
          className="app-header__settings-icon"
          src="/icons/settings.svg"
          alt={t("app.settings")}
        />
      </NavLink>
    </header>
  );
};

export default Header;
