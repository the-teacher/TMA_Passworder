import type { Meta, StoryObj } from "@storybook/react";
import "@ui-kit/buttons.scss";

const meta: Meta = {
  title: "4-UI-Kit/Buttons",
  component: "button",
  parameters: {
    docs: { disable: true },
    layout: "fullscreen"
  }
};

export default meta;
type Story = StoryObj;

// All buttons story
export const AllButtons: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "16px",
        padding: "16px"
      }}
    >
      <button className="btn btn--primary">Primary Button</button>
      <button className="btn btn--secondary">Secondary Button</button>
      <button className="btn btn--success">Success Button</button>
      <button className="btn btn--warning">Warning Button</button>
      <button className="btn btn--danger">Danger Button</button>
      <button className="btn btn--info">Info Button</button>
      <button className="btn" disabled>
        Disabled Button
      </button>
      <button className="btn btn--small">Small Button</button>
      <button className="btn btn--medium">Medium Button</button>
      <button className="btn btn--large">Large Button</button>
      <button className="btn btn--icon">
        <img src="/icons/eye.svg" alt="Icon" />
      </button>
      <button className="btn btn--icon-text">
        <img src="/icons/clipboard-check.svg" alt="Icon" />
        <span>Text</span>
      </button>
    </div>
  )
};
