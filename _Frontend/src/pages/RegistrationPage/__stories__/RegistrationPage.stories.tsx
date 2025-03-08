import type { Meta, StoryObj } from "@storybook/react";
import RegistrationPage from "../RegistrationPage";

const meta: Meta<typeof RegistrationPage> = {
  title: "4-Pages/RegistrationPage",
  component: RegistrationPage,
  parameters: {
    layout: "fullscreen"
  }
};

export default meta;
type Story = StoryObj<typeof RegistrationPage>;

export const Default: Story = {};
