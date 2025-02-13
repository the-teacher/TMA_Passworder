import type { Meta, StoryObj } from "@storybook/react";
import { BrowserRouter } from "react-router";
import PasswordEntryList from "@components/PasswordEntryList";

const meta = {
  title: "3-Components/1-PasswordEntryList",
  component: PasswordEntryList,
  parameters: {
    layout: "centered",
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
} satisfies Meta<typeof PasswordEntryList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
