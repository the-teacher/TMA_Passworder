import type { Meta, StoryObj } from "@storybook/react";
import {
  withRouter,
  reactRouterParameters
} from "storybook-addon-remix-react-router";
import CreatePasswordForm from "@components/CreatePasswordForm";
import i18n from "@story/i18next";

const meta: Meta<typeof CreatePasswordForm> = {
  title: "3-Components/3-CreatePasswordForm",
  component: CreatePasswordForm,
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
type Story = StoryObj<typeof CreatePasswordForm>;

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
