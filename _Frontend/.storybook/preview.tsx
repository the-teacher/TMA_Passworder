import type { Preview } from "@storybook/react";
import { I18nextProvider } from "react-i18next";
import React from "react";
import i18n from "./i18next";
import "../src/globalStyles.scss";

const customViewports = {
  mobile: {
    name: "Mobile (iPhone)",
    styles: {
      width: "390px",
      height: "724px"
    }
  },
  tablet: {
    name: "Tablet",
    styles: {
      width: "840px",
      height: "100%"
    }
  },
  desktop: {
    name: "Desktop",
    styles: {
      width: "1200px",
      height: "100%"
    }
  },
  largeDesktop: {
    name: "Large Desktop",
    styles: {
      width: "1440px",
      height: "100%"
    }
  }
};

const preview: Preview = {
  decorators: [
    (Story) => (
      <I18nextProvider i18n={i18n}>
        <Story />
      </I18nextProvider>
    )
  ],
  parameters: {
    docs: { disable: true },
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/
      }
    },
    viewport: {
      viewports: customViewports,
      defaultViewport: "mobile"
    },
    options: {
      storySort: {
        order: ["1-Layout", "2-Components"],
        method: "alphabetical"
      }
    }
  }
};

export default preview;
