import type { Meta, StoryObj } from "@storybook/react";
import { BrowserRouter } from "react-router";
import WelcomeMessageView from "../WelcomeMessageView";
import i18n from "@story/i18next";

const meta: Meta<typeof WelcomeMessageView> = {
  title: "3-Components/WelcomeMessage/WelcomeMessageView",
  component: WelcomeMessageView,
  parameters: {
    viewport: {
      defaultViewport: "tablet"
    }
  },
  argTypes: {
    onAccept: { action: "accepted" },
    onDecline: { action: "declined" }
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
type Story = StoryObj<typeof WelcomeMessageView>;

export const English: Story = {
  args: {
    onAccept: () => console.log("User accepted"),
    onDecline: () => console.log("User declined")
  },
  play: async () => {
    await i18n.changeLanguage("en");
  }
};

export const Russian: Story = {
  args: {
    onAccept: () => console.log("User accepted"),
    onDecline: () => console.log("User declined")
  },
  play: async () => {
    await i18n.changeLanguage("ru");
  }
};
