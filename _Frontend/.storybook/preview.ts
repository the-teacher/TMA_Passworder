import type { Preview } from "@storybook/react";

export const parameters = {
  docs: { disable: true }
};

const preview: Preview = {
  parameters: {
    docs: { disable: true },
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    }
  }
};

export default preview;
