import { NavLink } from "react-router";
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
  className = "footer-navigation__icon",
}: ImageProps) => <img className={className} src={src} alt={alt} />;

const ImageTitle = ({
  children,
  className = "footer-navigation__text",
}: ImageTitleProps) => <span className={className}>{children}</span>;

const FooterNavigation = () => (
  <nav className="footer-navigation">
    <NavLink to="/" className="footer-navigation__item">
      <Image src="/icons/home.svg" alt="Home" />
      <ImageTitle>Home</ImageTitle>
    </NavLink>
    <NavLink to="/create" className="footer-navigation__item">
      <Image src="/icons/circle-plus.svg" alt="Create" />
      <ImageTitle>Create</ImageTitle>
    </NavLink>
    <NavLink to="/search" className="footer-navigation__item">
      <Image src="/icons/search.svg" alt="Search" />
      <ImageTitle>Search</ImageTitle>
    </NavLink>
    <NavLink to="/favorites" className="footer-navigation__item">
      <Image src="/icons/star.svg" alt="Favorites" />
      <ImageTitle>Favorites</ImageTitle>
    </NavLink>
    <NavLink to="/logout" className="footer-navigation__item">
      <Image src="/icons/square-x.svg" alt="Logout" />
      <ImageTitle>Logout</ImageTitle>
    </NavLink>
  </nav>
);

export default FooterNavigation;
