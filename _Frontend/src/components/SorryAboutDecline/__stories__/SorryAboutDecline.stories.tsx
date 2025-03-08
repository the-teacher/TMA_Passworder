import type { Meta, StoryObj } from "@storybook/react";
import SorryAboutDecline from "../SorryAboutDecline";
import i18n from "@story/i18next";

const meta: Meta<typeof SorryAboutDecline> = {
  title: "3-Components/SorryAboutDecline",
  component: SorryAboutDecline,
  parameters: {
    viewport: {
      defaultViewport: "tablet"
    }
  },
  argTypes: {
    setUserDeclined: { action: "setUserDeclined" }
  }
};

export default meta;
type Story = StoryObj<typeof SorryAboutDecline>;

export const English: Story = {
  args: {
    setUserDeclined: () => console.log("User wants to try again")
  },
  play: async () => {
    await i18n.changeLanguage("en");
  }
};

export const Russian: Story = {
  args: {
    setUserDeclined: () => console.log("User wants to try again")
  },
  play: async () => {
    await i18n.changeLanguage("ru");
  }
};
