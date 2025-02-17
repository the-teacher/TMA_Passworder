import type { Meta, StoryObj } from "@storybook/react";
import { BrowserRouter } from "react-router";
import Header from "./";

const meta: Meta<typeof Header> = {
  title: "2-Core/1-Header",
  component: Header,
  parameters: {
    docs: { disable: true }
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
type Story = StoryObj<typeof Header>;

// Basic version with title only
export const Default: Story = {};

// Version with additional content
export const WithContent: Story = {
  args: {
    children: (
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <button>Button 1</button>
        <button>Button 2</button>
        <span>Text</span>
      </div>
    )
  }
};
