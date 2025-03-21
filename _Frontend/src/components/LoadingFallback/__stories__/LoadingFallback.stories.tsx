import type { Meta, StoryObj } from "@storybook/react";
import LoadingFallback from "@components/LoadingFallback";

const meta: Meta<typeof LoadingFallback> = {
  title: "3-Components/LoadingFallback",
  component: LoadingFallback,
  parameters: {
    docs: { disable: true }
  }
};

export default meta;
type Story = StoryObj<typeof LoadingFallback>;

// Default loading state
export const Default: Story = {};

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
