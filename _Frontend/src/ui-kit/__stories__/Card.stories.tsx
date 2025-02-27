import type { Meta, StoryObj } from "@storybook/react";
import "@ui-kit/card.scss";
import "@ui-kit/buttons.scss";
import "@ui-kit/text-styles.scss";
import "@ui-kit/margins.scss";

const meta: Meta = {
  title: "4-UI-Kit/Card",
  parameters: {
    docs: { disable: true }
  }
};

export default meta;
type Story = StoryObj;

export const CardExample: Story = {
  render: () => (
    <div style={{ padding: "16px" }}>
      <div className="card card__centered">
        <div className="card--container">
          <div className="card--header">
            <h2 className="card--title">Card Title</h2>
            <p className="card--subtitle">Card subtitle or description</p>
          </div>

          <div className="card--content">
            <p className="text">
              This is the main content of the card. You can put any content
              here. The card component provides a consistent container with
              proper spacing and styling for various types of content.
            </p>
          </div>

          <div className="card--footer">
            <button className="btn btn--primary">Primary Action</button>
            <button className="btn btn--secondary">Secondary Action</button>
          </div>
        </div>
      </div>
    </div>
  )
};

export const SimpleCard: Story = {
  render: () => (
    <div style={{ padding: "16px" }}>
      <div className="card" style={{ maxWidth: "400px" }}>
        <div className="card--container">
          <h3 className="text text--large mb16">Simple Card</h3>
          <p className="text mb16">
            A simple card without header and footer sections. Just container
            with some content.
          </p>
          <button className="btn btn--primary">Action</button>
        </div>
      </div>
    </div>
  )
};
