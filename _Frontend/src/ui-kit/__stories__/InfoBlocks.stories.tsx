import type { Meta, StoryObj } from "@storybook/react";
import "@ui-kit/info-blocks.scss";

const meta: Meta = {
  title: "4-UI-Kit/InfoBlocks",
  component: "div",
  parameters: {
    docs: { disable: true }
  }
};

export default meta;
type Story = StoryObj;

// All info blocks story
export const AllInfoBlocks: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        padding: "16px"
      }}
    >
      <div className="info">Plain Info Block</div>
      <div className="info info--primary">Primary Info Block</div>
      <div className="info info--secondary">Secondary Info Block</div>
      <div className="info info--success">Success Info Block</div>
      <div className="info info--warning">Warning Info Block</div>
      <div className="info info--danger">Danger Info Block</div>
      <div className="info info--light">Light Info Block</div>
      <div className="info info--dark">Dark Info Block</div>
    </div>
  )
};
