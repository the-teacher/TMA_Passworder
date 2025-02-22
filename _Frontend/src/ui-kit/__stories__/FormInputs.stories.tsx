import type { Meta, StoryObj } from "@storybook/react";
import "@ui-kit/form-inputs.scss";
import "@ui-kit/spaces.scss";
import AppIcon from "@components/AppIcon";

const meta: Meta = {
  title: "4-UI-Kit/FormInputs",
  // component: "input",
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

      <div className="mb32">
        <h3>Search Input</h3>
        <div className="mb16">
          <h4>Default Search</h4>
          <input
            className="form-input form-input__search"
            placeholder="Search..."
          />
        </div>
        <div className="mb16">
          <h4>Error Search</h4>
          <input
            className="form-input form-input__search form-input--error"
            placeholder="Error Search Input"
          />
        </div>
        <div className="mb16">
          <h4>Success Search</h4>
          <input
            className="form-input form-input__search form-input--success"
            placeholder="Success Search Input"
          />
        </div>
        <div className="mb16">
          <h4>Disabled Search</h4>
          <input
            className="form-input form-input__search"
            placeholder="Disabled Search Input"
            disabled
          />
        </div>
      </div>
    </div>
  )
};

// Form input with icon story
export const FormInputWithIcon: Story = {
  render: () => (
    <div className="p16">
      <div className="form-group mb24">
        <label className="form-group--label text--dark" htmlFor="icon-input">
          Input with Icon
        </label>
        <div className="form-group--input form-group__with-icon">
          <input
            className="form-input"
            id="icon-input"
            type="text"
            placeholder="Enter text"
          />
          <div className="form-group--icon">
            <AppIcon size={24} type="search" alt="search" />
          </div>
        </div>
      </div>

      <div className="form-group mb24">
        <label className="form-group--label text--dark" htmlFor="icon-input">
          Input with Icon
        </label>
        <div className="form-group--input form-group__with-icon">
          <div className="form-group--icon">
            <AppIcon size={24} type="search" alt="search" />
          </div>
          <input
            className="form-input"
            id="icon-input"
            type="text"
            placeholder="Enter text"
          />
        </div>
      </div>

      <div className="form-group mb24">
        <label className="form-group--label text--dark" htmlFor="icon-input">
          Input with Icon
        </label>
        <div className="form-group--input form-group__with-icon">
          <div className="form-group--icon">
            <AppIcon size={24} type="search" alt="search" />
          </div>
          <div className="form-group--icon">
            <AppIcon size={24} type="search" alt="search" />
          </div>
          <input
            className="form-input"
            id="icon-input"
            type="text"
            placeholder="Enter text"
          />
          <div className="form-group--icon">
            <AppIcon size={24} type="search" alt="search" />
          </div>
        </div>
      </div>
    </div>
  )
};
