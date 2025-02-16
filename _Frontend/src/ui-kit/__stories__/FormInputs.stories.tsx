import type { Meta, StoryObj } from "@storybook/react";
import "@ui-kit/form-inputs.scss";

const meta: Meta = {
  title: "4-UI-Kit/FormInputs",
  component: "input",
  parameters: {
    docs: { disable: true },
    layout: "fullscreen"
  }
};

export default meta;
type Story = StoryObj;

// All form inputs story
export const AllFormInputs: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        padding: "16px",
        maxWidth: "400px"
      }}
    >
      <h3>Default Input:</h3>
      <input className="form-input" placeholder="Default Input" />
      <input className="form-input" placeholder="Focused Input" autoFocus />
      <input
        className="form-input form-input--error"
        placeholder="Error Input"
      />
      <input
        className="form-input form-input--success"
        placeholder="Success Input"
      />
      <input
        className="form-input form-input--disabled"
        placeholder="Disabled Input"
        disabled
      />
    </div>
  )
};
