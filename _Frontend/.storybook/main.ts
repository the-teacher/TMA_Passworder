import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: ["@storybook/blocks"],
  framework: {
    name: "@storybook/react-vite",
    options: {}
  },
  // docs: {
  //   autodocs: true
  // },
  core: {
    disableTelemetry: true,
    builder: "@storybook/builder-vite"
  }
};

export default config;
