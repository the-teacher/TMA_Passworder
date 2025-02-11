import type { Meta, StoryObj } from "@storybook/react";
import Navigation from "./Navigation";

const meta: Meta<typeof Navigation> = {
  title: "2-Core/3-Navigation",
  component: Navigation,
  parameters: {
    docs: { disable: true },
    layout: "fullscreen",
    viewport: {
      defaultViewport: "mobile"
    }
  }
};

export default meta;
type Story = StoryObj<typeof Navigation>;

// Default navigation view
export const Default: Story = {};

// Navigation in a container
export const InContainer: Story = {
  decorators: [
    (Story) => (
      <div style={{ maxWidth: "1440px", margin: "0 auto", padding: "16px" }}>
        <Story />
      </div>
    )
  ]
};

// Navigation with custom background
export const WithBackground: Story = {
  decorators: [
    (Story) => (
      <div style={{ backgroundColor: "#f5f5f5", padding: "16px" }}>
        <Story />
      </div>
    )
  ]
};
