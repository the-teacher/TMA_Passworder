import type { Meta, StoryObj } from "@storybook/react";
import { BrowserRouter } from "react-router";
import PasswordEntryList from "../PasswordEntryList";

const meta = {
  title: "3-Components/1-PasswordEntryList",
  component: PasswordEntryList,
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
} satisfies Meta<typeof PasswordEntryList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
