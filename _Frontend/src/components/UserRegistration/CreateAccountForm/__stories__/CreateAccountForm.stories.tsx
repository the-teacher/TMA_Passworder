import type { Meta, StoryObj } from "@storybook/react";
import { BrowserRouter } from "react-router";
import CreateAccountForm from "../CreateAccountForm";
import i18n from "@story/i18next";

const meta: Meta<typeof CreateAccountForm> = {
  title: "3-Components/UserRegistration/CreateAccountForm",
  component: CreateAccountForm,
  parameters: {
    viewport: {
      defaultViewport: "tablet"
    }
  },
  argTypes: {
    onSubmit: { action: "submitted" },
    onCancel: { action: "cancelled" }
  },
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    )
  ]
};

export default meta;
type Story = StoryObj<typeof CreateAccountForm>;

export const Default: Story = {
  args: {
    onSubmit: (data) => console.log("Form submitted with:", data),
    onCancel: () => console.log("Form cancelled"),
    isSubmitting: false
  },
  play: async () => {
    await i18n.changeLanguage("en");
  }
};

export const Submitting: Story = {
  args: {
    onSubmit: (data) => console.log("Form submitted with:", data),
    onCancel: () => console.log("Form cancelled"),
    isSubmitting: true
  },
  play: async () => {
    await i18n.changeLanguage("en");
  }
};

export const Russian: Story = {
  args: {
    onSubmit: (data) => console.log("Form submitted with:", data),
    onCancel: () => console.log("Form cancelled"),
    isSubmitting: false
  },
  play: async () => {
    await i18n.changeLanguage("ru");
  }
};
