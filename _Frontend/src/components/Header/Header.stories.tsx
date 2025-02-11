import type { Meta, StoryObj } from "@storybook/react";
import Header from "./";

const meta: Meta<typeof Header> = {
  title: "Components/Header",
  component: Header,
  // tags: ["autodocs"],
  parameters: {
    layout: "fullscreen"
  }
};

export default meta;
type Story = StoryObj<typeof Header>;

// Basic version with title only
export const Default: Story = {};

// Version with additional content
export const WithContent: Story = {
  args: {
    children: <div style={{ color: "#666" }}>Additional header content</div>
  }
};

// Mobile version
export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: "mobile1"
    }
  }
};

// Version with complex content
export const WithComplexContent: Story = {
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
