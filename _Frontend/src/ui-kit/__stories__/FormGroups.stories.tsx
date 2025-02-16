import type { Meta, StoryObj } from "@storybook/react";
import "@ui-kit/form-groups.scss";
import "@ui-kit/form-inputs.scss";
import "@ui-kit/text-styles.scss"; // Assuming text styles are defined here

const meta: Meta = {
  title: "4-UI-Kit/FormGroups",
  component: "div",
  parameters: {
    docs: { disable: true },
    layout: "fullscreen"
  }
};

export default meta;
type Story = StoryObj;

// Form group story
export const FormGroupExample: Story = {
  render: () => (
    <div className="p16">
      <div className="form-group">
        <label className="form-group__label text--dark" htmlFor="username">
          Username
          <img src="/icons/eye.svg" alt="Icon" />
        </label>
        <input
          className="form-group__input form-input"
          id="username"
          type="text"
          placeholder="Enter your username"
        />
        <div className="form-group__info text--info text--small">
          Please enter a unique username.
        </div>
      </div>

      <div className="form-group">
        <label className="form-group__label text--dark" htmlFor="email">
          Email
          <img src="/icons/home.svg" alt="Icon" />
        </label>
        <input
          className="form-group__input form-input"
          id="email"
          type="email"
          placeholder="Enter your email"
        />
        <div className="form-group__info text--danger text--small">
          Please enter a valid email address.
        </div>
      </div>

      <div className="form-group">
        <label className="form-group__label text--dark" htmlFor="password">
          Password
        </label>
        <input
          className="form-group__input form-input"
          id="password"
          type="password"
          placeholder="Enter your password"
        />
        <div className="form-group__info text--success text--small">
          Your password is strong.
        </div>
      </div>
    </div>
  )
};
