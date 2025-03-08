import type { Meta, StoryObj } from "@storybook/react";
import WelcomeMessage from "../WelcomeMessage";
import i18n from "@story/i18next";

const meta: Meta<typeof WelcomeMessage> = {
  title: "3-Components/WelcomeMessage",
  component: WelcomeMessage,
  parameters: {
    viewport: {
      defaultViewport: "tablet"
    }
  }
};

export default meta;
type Story = StoryObj<typeof WelcomeMessage>;

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
