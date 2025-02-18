import type { Meta, StoryObj } from "@storybook/react";
import toastr from "@lib/Toastr";
import "../toastr.scss";
import "@ui-kit/info-blocks.scss";

const meta = {
  title: "3-Components/5-Toastr",
  parameters: {
    docs: { disable: true },
    viewport: {
      defaultViewport: "tablet"
    }
  }
} satisfies Meta;

export default meta;
type Story = StoryObj;

// Basic usage
export const Default: Story = {
  render: () => (
    <div className="p16">
      <h3>Basic Toasts</h3>
      <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
        <button
          className="btn btn--primary"
          onClick={() => toastr.info("Info message")}
        >
          Show Info
        </button>
        <button
          className="btn btn--success"
          onClick={() => toastr.success("Success message")}
        >
          Show Success
        </button>
        <button
          className="btn btn--warning"
          onClick={() => toastr.warning("Warning message")}
        >
          Show Warning
        </button>
        <button
          className="btn btn--danger"
          onClick={() => toastr.danger("Danger message")}
        >
          Show Danger
        </button>
      </div>

      <h3>Custom Options</h3>
      <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
        <button
          className="btn btn--primary"
          onClick={() =>
            toastr.show("Non-closable toast", "primary", { closable: false })
          }
        >
          Non-closable
        </button>
        <button
          className="btn btn--primary"
          onClick={() =>
            toastr.show("Long duration toast", "primary", { duration: 5000 })
          }
        >
          5s Duration
        </button>
        <button
          className="btn btn--primary"
          onClick={() =>
            toastr.show("Persistent toast", "primary", { duration: 0 })
          }
        >
          Persistent
        </button>
      </div>

      <h3>Multiple Toasts</h3>
      <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
        <button
          className="btn btn--primary"
          onClick={() => {
            toastr.info("First message");
            toastr.success("Second message");
            toastr.warning("Third message");
          }}
        >
          Show Multiple
        </button>
        <button className="btn btn--danger" onClick={() => toastr.clear()}>
          Clear All
        </button>
      </div>

      <h3>Custom Container</h3>
      <div
        id="custom-container"
        style={{
          position: "relative",
          height: "200px",
          border: "1px dashed #ccc",
          padding: "16px",
          marginBottom: "16px"
        }}
      >
        <button
          className="btn btn--primary"
          onClick={() => {
            toastr.initialize("#custom-container");
            toastr.info("Toast in custom container");
          }}
        >
          Show in Container
        </button>
      </div>
    </div>
  )
};
