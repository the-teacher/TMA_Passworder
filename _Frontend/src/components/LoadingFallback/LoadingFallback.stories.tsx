import type { Meta, StoryObj } from "@storybook/react";
import LoadingFallback from "./LoadingFallback";

const meta: Meta<typeof LoadingFallback> = {
  title: "3-Components/LoadingFallback",
  component: LoadingFallback,
  parameters: {
    docs: { disable: true },
    layout: "fullscreen"
  }
};

export default meta;
type Story = StoryObj<typeof LoadingFallback>;

// Default loading state
export const Default: Story = {};

// Custom styling example
export const CustomStyling: Story = {
  decorators: [
    (Story) => (
      <div style={{ height: "50vh" }}>
        <Story />
      </div>
    )
  ]
};

// With background color
export const WithBackground: Story = {
  decorators: [
    (Story) => (
      <div style={{ backgroundColor: "#f5f5f5", height: "100vh" }}>
        <Story />
      </div>
    )
  ]
};
