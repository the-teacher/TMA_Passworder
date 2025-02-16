import type { Meta, StoryObj } from "@storybook/react";
import "@ui-kit/form-groups.scss";
import "@ui-kit/form-inputs.scss";
import "@ui-kit/text-styles.scss"; // Assuming text styles are defined here
import AppIcon from "@components/AppIcon"; // Import AppIcon

const meta: Meta = {
  title: "4-UI-Kit/FormGroups",
  component: "div",
  parameters: {
    docs: { disable: true }
  }
};

export default meta;
type Story = StoryObj;

// Form group story
export const FormGroupExample: Story = {
  render: () => (
    <div style={{ padding: "16px", maxWidth: "400px" }}>
      <div className="form-group">
        <label className="form-group__label text--dark" htmlFor="username">
          Username
          <AppIcon size={16} type="eye" />
        </label>
        <input
          className="form-group__input form-input"
          id="username"
          type="text"
          placeholder="Enter your username"
        />
        <div className="form-group__info text--info text--small">
          <AppIcon size={12} type="refresh" /> Please enter a unique username.
        </div>
      </div>

      <div className="form-group">
        <label className="form-group__label text--dark" htmlFor="email">
          <AppIcon size={16} type="search" /> Email
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
          <AppIcon size={16} type="eye-off" /> Password
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
