import type { Meta, StoryObj } from "@storybook/react";
import "@ui-kit/form-inputs.scss";
import "@ui-kit/spaces.scss";

const meta: Meta = {
  title: "4-UI-Kit/FormInputs",
  component: "input",
  parameters: {
    docs: { disable: true }
  }
};

export default meta;
type Story = StoryObj;

// All form inputs story
export const AllFormInputs: Story = {
  render: () => (
    <div className="p16">
      <div className="mb32">
        <h3>Text Input</h3>
        <div className="mb16">
          <h4>Default</h4>
          <input className="form-input" placeholder="Default Input" />
        </div>
        <div className="mb16">
          <h4>Error</h4>
          <input
            className="form-input form-input--error"
            placeholder="Error Input"
          />
        </div>
        <div className="mb16">
          <h4>Success</h4>
          <input
            className="form-input form-input--success"
            placeholder="Success Input"
          />
        </div>
        <div className="mb16">
          <h4>Disabled</h4>
          <input className="form-input" placeholder="Disabled Input" disabled />
        </div>
      </div>

      <div className="mb32">
        <h3>Select Input</h3>
        <div className="mb16">
          <h4>Default</h4>
          <select className="form-select">
            <option value="">Select an option</option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
        </div>
        <div className="mb16">
          <h4>Error</h4>
          <select className="form-select form-input--error">
            <option value="">Select an option</option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
        </div>
        <div className="mb16">
          <h4>Success</h4>
          <select className="form-select form-input--success">
            <option value="">Select an option</option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
        </div>
        <div className="mb16">
          <h4>Disabled</h4>
          <select className="form-select" disabled>
            <option value="">Select an option</option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
        </div>
      </div>

      <div className="mb32">
        <h3>Textarea Input</h3>
        <div className="mb16">
          <h4>Default</h4>
          <textarea
            className="form-textarea"
            placeholder="Enter text here"
            rows={4}
          />
        </div>
        <div className="mb16">
          <h4>Error</h4>
          <textarea
            className="form-textarea form-input--error"
            placeholder="Error Textarea"
            rows={4}
          />
        </div>
        <div className="mb16">
          <h4>Success</h4>
          <textarea
            className="form-textarea form-input--success"
            placeholder="Success Textarea"
            rows={4}
          />
        </div>
        <div className="mb16">
          <h4>Disabled</h4>
          <textarea
            className="form-textarea"
            placeholder="Disabled Textarea"
            rows={4}
            disabled
          />
        </div>
      </div>
    </div>
  )
};
