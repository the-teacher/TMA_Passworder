import type { Meta, StoryObj } from "@storybook/react";
import { BrowserRouter } from "react-router";
import UserRegistrationData from "../UserRegistrationData";
import i18n from "@story/i18next";

const meta: Meta<typeof UserRegistrationData> = {
  title: "3-Components/UserRegistrationData",
  component: UserRegistrationData,
  parameters: {
    viewport: {
      defaultViewport: "tablet"
    }
  },
  argTypes: {
    onConfirm: { action: "confirmed" },
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
type Story = StoryObj<typeof UserRegistrationData>;

export const English: Story = {
  args: {
    userData: {
      id: 12345,
      username: "johndoe",
      first_name: "John",
      last_name: "Doe"
    },
    onConfirm: () => console.log("User confirmed"),
    onDecline: () => console.log("User declined")
  },
  play: async () => {
    await i18n.changeLanguage("en");
  }
};

export const Russian: Story = {
  args: {
    userData: {
      id: 12345,
      username: "johndoe",
      first_name: "John",
      last_name: "Doe"
    },
    onConfirm: () => console.log("User confirmed"),
    onDecline: () => console.log("User declined")
  },
  play: async () => {
    await i18n.changeLanguage("ru");
  }
};

export const MinimalData: Story = {
  args: {
    userData: {
      id: 12345
    },
    onConfirm: () => console.log("User confirmed"),
    onDecline: () => console.log("User declined")
  },
  play: async () => {
    await i18n.changeLanguage("en");
  }
};
