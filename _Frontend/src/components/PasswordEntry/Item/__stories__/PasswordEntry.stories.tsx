import type { Meta, StoryObj } from "@storybook/react";
import { BrowserRouter } from "react-router";
import PasswordEntry from "@components/PasswordEntry/Item";

const meta = {
  title: "3-Components/2-PasswordEntry",
  component: PasswordEntry,
  parameters: {
    viewport: {
      defaultViewport: "mobile"
    }
  },
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    )
  ]
} satisfies Meta<typeof PasswordEntry>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: "entry-1",
    name: "Password Entry 1"
  }
};

export const LongName: Story = {
  args: {
    id: "entry-2",
    name: "Very Long Password Entry Name That Should Still Look Good in the UI"
  }
};
