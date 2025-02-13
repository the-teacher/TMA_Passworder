import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/blocks",
    "@storybook/addon-viewport",
    "storybook-addon-remix-react-router"
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {}
  },
  core: {
    disableTelemetry: true,
    builder: "@storybook/builder-vite"
  }
};

export default config;
