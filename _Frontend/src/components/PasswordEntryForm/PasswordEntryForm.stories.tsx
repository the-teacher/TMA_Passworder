import type { Meta, StoryObj } from "@storybook/react";
import PasswordEntryForm from "./PasswordEntryForm";

const meta: Meta<typeof PasswordEntryForm> = {
  title: "3-Components/3-PasswordEntryForm",
  component: PasswordEntryForm,
  parameters: {
    docs: { disable: true },
    layout: "fullscreen",
    viewport: {
      defaultViewport: "mobile"
    }
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
  }
};
