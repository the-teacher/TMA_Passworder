import type { Meta, StoryObj } from "@storybook/react";
import {
  withRouter,
  reactRouterParameters
} from "storybook-addon-remix-react-router";
import PasswordEntryForm from "@components/PasswordEntryForm";
import i18n from "@storybook/i18next";

const meta: Meta<typeof PasswordEntryForm> = {
  title: "3-Components/3-PasswordEntryForm",
  component: PasswordEntryForm,
  decorators: [withRouter],
  parameters: {
    docs: { disable: true },
    viewport: {
      defaultViewport: "mobile"
    },
    reactRouter: reactRouterParameters({
      location: {
        path: "/password-entry"
      },
      routing: {
        path: "/password-entry"
      }
    })
  }
};

export default meta;
type Story = StoryObj<typeof PasswordEntryForm>;

// Basic version with default functionality
export const Default: Story = {
  args: {
    onSubmit: (data) => {
      console.log("Form submitted with data:", data);
    }
  },
  play: async () => {
    await i18n.changeLanguage("en");
  }
};

// Russian version
export const Russian: Story = {
  args: {
    onSubmit: (data) => {
      console.log("Form submitted with data:", data);
    }
  },
  play: async () => {
    await i18n.changeLanguage("ru");
  }
};
