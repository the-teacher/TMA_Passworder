import type { Meta, StoryObj } from "@storybook/react";
import "./text-styles.scss";

const meta: Meta = {
  title: "4-UI-Kit/TextStyles",
  component: "p",
  parameters: {
    docs: { disable: true },
    layout: "fullscreen"
  }
};

export default meta;
type Story = StoryObj;

// All text styles story
export const AllTextStyles: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        padding: "16px"
      }}
    >
      <h3>Colors:</h3>
      <p className="info text text--primary">Primary Text</p>
      <p className="info text text--secondary">Secondary Text</p>
      <p className="info text text--success">Success Text</p>
      <p className="info text text--warning">Warning Text</p>
      <p className="info text text--danger">Danger Text</p>
      <p className="info text text--info">Info Text</p>
      <p className="info info--dark text text--light">Light Text</p>
      <p className="info text text--dark">Dark Text</p>

      <h3>Sizes:</h3>
      <p className="info text text--primary text--small">Small Primary Text</p>
      <p className="info text text--secondary text--medium">
        Medium Secondary Text
      </p>
      <p className="info text text--success text--large">Large Success Text</p>
    </div>
  )
};
