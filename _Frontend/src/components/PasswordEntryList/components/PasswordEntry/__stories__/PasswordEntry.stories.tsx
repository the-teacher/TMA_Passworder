import type { Meta, StoryObj } from "@storybook/react";
import { BrowserRouter } from "react-router";
import PasswordEntry from "../PasswordEntry";

const meta = {
  title: "3-Components/1-PasswordEntryList/1-PasswordEntry",
  component: PasswordEntry,
  parameters: {
    layout: "centered",
    viewport: {
      defaultViewport: "iphone12"
    }
  },
  decorators: [
    (Story) => (
      <BrowserRouter>
        <div style={{ width: "390px" }}>
          <Story />
        </div>
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
