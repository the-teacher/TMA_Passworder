import React from "react";
import "./layout.css";

export const Header = ({ children }) => (
  <header className="layout__header">
    <div className="layout__content-container">{children}</div>
  </header>
);

export const MainColumns = ({ children }) => (
  <div className="layout__main">
    <div className="layout__content-container layout__main-columns">
      {children}
    </div>
  </div>
);

export const AsideLeft = ({ children }) => (
  <aside className="layout__aside">{children}</aside>
);

export const MainContent = ({ children }) => (
  <main className="layout__main-content">{children}</main>
);

export const AsideRight = ({ children }) => (
  <aside className="layout__aside">{children}</aside>
);

export const Footer = ({ children }) => (
  <footer className="layout__footer">
    <div className="layout__content-container">{children}</div>
  </footer>
);

const HolyGrailLayout = ({ children }) => (
  <div id="root" style={{ display: "contents" }} className="layout__body">
    {children}
  </div>
);

export default HolyGrailLayout;
