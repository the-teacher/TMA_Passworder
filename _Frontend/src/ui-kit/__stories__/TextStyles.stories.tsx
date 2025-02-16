import type { Meta, StoryObj } from "@storybook/react";
import "../text-styles.scss";

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

      <h3>Combinations:</h3>
      <h4>Small Text:</h4>
      <p className="info text text--primary text--small">
        Small Primary Text: In a world where technology is constantly evolving,
        staying updated with the latest trends is crucial for success.
      </p>
      <p className="info text text--secondary text--small">
        Small Secondary Text: The quick brown fox jumps over the lazy dog.
      </p>
      <p className="info text text--success text--small">
        Small Success Text: Success is not the key to happiness.
      </p>
      <p className="info text text--warning text--small">
        Small Warning Text: Warning! This action cannot be undone.
      </p>
      <p className="info text text--danger text--small">
        Small Danger Text: Please proceed with caution.
      </p>
      <p className="info text text--info text--small">
        Small Info Text: Ensure that you have saved all necessary data.
      </p>
      <p className="info info--dark text text--dark text--small">
        Small Light Text: Light text on a dark background.
      </p>
      <p className="info text text--dark text--small">
        Small Dark Text: Dark text on a light background.
      </p>

      <h4>Medium Text:</h4>
      <p className="info text text--primary text--medium">
        Medium Primary Text: In a world where technology is constantly evolving,
        staying updated with the latest trends is crucial for success.
      </p>
      <p className="info text text--secondary text--medium">
        Medium Secondary Text: The quick brown fox jumps over the lazy dog.
      </p>
      <p className="info text text--success text--medium">
        Medium Success Text: Success is not the key to happiness.
      </p>
      <p className="info text text--warning text--medium">
        Medium Warning Text: Warning! This action cannot be undone.
      </p>
      <p className="info text text--danger text--medium">
        Medium Danger Text: Please proceed with caution.
      </p>
      <p className="info text text--info text--medium">
        Medium Info Text: Ensure that you have saved all necessary data.
      </p>
      <p className="info info--dark text text--light text--medium">
        Medium Light Text: Light text on a dark background.
      </p>
      <p className="info text text--dark text--medium">
        Medium Dark Text: Dark text on a light background.
      </p>

      <h4>Large Text:</h4>
      <p className="info text text--primary text--large">
        Large Primary Text: In a world where technology is constantly evolving,
        staying updated with the latest trends is crucial for success.
      </p>
      <p className="info text text--secondary text--large">
        Large Secondary Text: The quick brown fox jumps over the lazy dog.
      </p>
      <p className="info text text--success text--large">
        Large Success Text: Success is not the key to happiness.
      </p>
      <p className="info text text--warning text--large">
        Large Warning Text: Warning! This action cannot be undone.
      </p>
      <p className="info text text--danger text--large">
        Large Danger Text: Please proceed with caution.
      </p>
      <p className="info text text--info text--large">
        Large Info Text: Ensure that you have saved all necessary data.
      </p>
      <p className="info info--dark text text--light text--large">
        Large Light Text: Light text on a dark background.
      </p>
      <p className="info text text--dark text--large">
        Large Dark Text: Dark text on a light background.
      </p>
    </div>
  )
};
