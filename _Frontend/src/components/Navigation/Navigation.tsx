import "./styles.scss";

const Navigation = () => (
  <nav className="nav">
    <a className="nav--link" href="/">
      Home
    </a>
    <a className="nav--link" href="/settings">
      Settings
    </a>
    <a className="nav--link" href="/about">
      About
    </a>
  </nav>
);

export default Navigation;
