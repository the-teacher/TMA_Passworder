import { NavLink } from "react-router";
import { useTranslation } from "react-i18next";
import { newPasswordEntryPath } from "@routes/helpers";
import "./styles.scss";

interface ImageProps {
  src: string;
  alt: string;
  className?: string;
}

interface ImageTitleProps {
  children: React.ReactNode;
  className?: string;
}

const Image = ({
  src,
  alt,
  className = "footer-navigation__icon"
}: ImageProps) => <img className={className} src={src} alt={alt} />;

const ImageTitle = ({
  children,
  className = "footer-navigation__text"
}: ImageTitleProps) => <span className={className}>{children}</span>;

const FooterNavigation = () => {
  const { t } = useTranslation("footerNavigation");

  return (
    <nav className="footer-navigation">
      <NavLink to="/" className="footer-navigation__item">
        <Image src="/icons/home.svg" alt={t("home")} />
        <ImageTitle>{t("home")}</ImageTitle>
      </NavLink>
      <NavLink to={newPasswordEntryPath()} className="footer-navigation__item">
        <Image src="/icons/circle-plus.svg" alt={t("create")} />
        <ImageTitle>{t("create")}</ImageTitle>
      </NavLink>
      <NavLink to="/favorites" className="footer-navigation__item">
        <Image src="/icons/star.svg" alt={t("favorites")} />
        <ImageTitle>{t("favorites")}</ImageTitle>
      </NavLink>
      <NavLink to="/logout" className="footer-navigation__item">
        <Image src="/icons/square-x.svg" alt={t("logout")} />
        <ImageTitle>{t("logout")}</ImageTitle>
      </NavLink>
    </nav>
  );
};

export default FooterNavigation;
