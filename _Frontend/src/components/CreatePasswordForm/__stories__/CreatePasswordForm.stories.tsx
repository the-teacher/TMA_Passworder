import type { Meta, StoryObj } from "@storybook/react";
import type { StoryFn } from "@storybook/react";
import {
  withRouter,
  reactRouterParameters
} from "storybook-addon-remix-react-router";
import CreatePasswordForm from "@components/CreatePasswordForm";
import i18n from "@story/i18next";
import { within } from "@storybook/testing-library";
import userEvent from "@testing-library/user-event";
import type { CreatePasswordFormData } from "../types";

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
    onSubmit: (data: CreatePasswordFormData) => {
      console.log("Form submitted with data:", data);
    }
  },
  play: async () => {
    await i18n.changeLanguage("en");
  }
};

// Pre-filled version
export const PreFilled: Story = {
  args: {
    onSubmit: (data: CreatePasswordFormData) => {
      console.log("Form submitted with data:", data);
    }
  },
  play: async ({ canvasElement }) => {
    await i18n.changeLanguage("en");
    const canvas = within(canvasElement);

    await userEvent.type(canvas.getByLabelText(/service name/i), "GitHub");
    await userEvent.type(canvas.getByLabelText(/username/i), "johndoe");
    await userEvent.type(canvas.getByLabelText(/password/i), "SecurePass123!");
    await userEvent.type(
      canvas.getByLabelText(/service url/i),
      "https://github.com"
    );
    await userEvent.type(canvas.getByLabelText(/notes/i), "Work account");
  }
};

// With validation errors
export const WithValidationErrors: Story = {
  args: {
    onSubmit: (data: CreatePasswordFormData) => {
      console.log("Form submitted with data:", data);
    }
  },
  play: async ({ canvasElement }) => {
    await i18n.changeLanguage("en");
    const canvas = within(canvasElement);

    // Try to submit empty form to trigger validation
    const submitButton = canvas.getByRole("button", { name: /save/i });
    await userEvent.click(submitButton);
  }
};

// Russian version
export const Russian: Story = {
  args: {
    onSubmit: (data: CreatePasswordFormData) => {
      console.log("Form submitted with data:", data);
    }
  },
  play: async () => {
    await i18n.changeLanguage("ru");
  }
};
