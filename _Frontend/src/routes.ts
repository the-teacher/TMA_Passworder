import { type RouteObject } from "react-router";

// Lazy loading of pages for optimization
const IndexPage = () => import("./pages/IndexPage/IndexPage");
const SettingsPage = () => import("./pages/SettingsPage/SettingsPage");
const AboutPage = () => import("./pages/AboutPage/AboutPage");

export const routes: RouteObject[] = [
  {
    path: "/",
    async lazy() {
      const { default: Component } = await IndexPage();
      return { Component };
    },
  },
  {
    path: "/settings",
    async lazy() {
      const { default: Component } = await SettingsPage();
      return { Component };
    },
  },
  {
    path: "/about",
    async lazy() {
      const { default: Component } = await AboutPage();
      return { Component };
    },
  },
];
