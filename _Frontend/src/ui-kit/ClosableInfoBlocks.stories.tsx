import type { Meta, StoryObj } from "@storybook/react";
import "./info-blocks.scss";

const meta: Meta = {
  title: "4-UI-Kit/InfoBlocks",
  component: "div",
  parameters: {
    docs: { disable: true },
    layout: "fullscreen"
  }
};

export default meta;
type Story = StoryObj;

// Closable info blocks story
export const ClosableInfoBlocks: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        padding: "16px"
      }}
    >
      <div className="info info--primary info--closable">
        Primary Info Block
        <button className="info__close" aria-label="Close">
          &times;
        </button>
      </div>
      <div className="info info--secondary info--closable">
        Secondary Info Block
        <button className="info__close" aria-label="Close">
          &times;
        </button>
      </div>
      <div className="info info--success info--closable">
        Success Info Block
        <button className="info__close" aria-label="Close">
          &times;
        </button>
      </div>
      <div className="info info--warning info--closable">
        Warning Info Block
        <button className="info__close" aria-label="Close">
          &times;
        </button>
      </div>
      <div className="info info--danger info--closable">
        Danger Info Block
        <button className="info__close" aria-label="Close">
          &times;
        </button>
      </div>
      <div className="info info--light info--closable">
        Light Info Block
        <button className="info__close" aria-label="Close">
          &times;
        </button>
      </div>
      <div className="info info--dark info--closable">
        Dark Info Block
        <button className="info__close" aria-label="Close">
          &times;
        </button>
      </div>

      <div className="info info--light info--closable">
        {/* Add a long text to see if the close button is still visible */}
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
        <button className="info__close" aria-label="Close">
          &times;
        </button>
      </div>
    </div>
  )
};
