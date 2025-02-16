import type { Meta, StoryObj } from "@storybook/react";
import AppIcon, { IconSize, IconType } from "./AppIcon";
import "@ui-kit/spaces.scss";

const meta: Meta<typeof AppIcon> = {
  title: "3-Components/4-AppIcon",
  component: AppIcon,
  parameters: {
    docs: { disable: true },
    layout: "tablet",
    viewport: {
      defaultViewport: "tablet"
    }
  }
};

export default meta;
type Story = StoryObj<typeof AppIcon>;

const iconTypes: IconType[] = [
  "circle-plus",
  "clipboard-check",
  "eye-off",
  "eye",
  "home",
  "refresh",
  "search",
  "settings",
  "square-x",
  "star"
];

// Default story for AppIcon with all sizes
export const Default: Story = {
  render: () => (
    <div
      className="m16"
      style={{ display: "flex", flexDirection: "column", gap: "32px" }}
    >
      {[12, 16, 20, 24, 28, 32].map((size) => (
        <div key={size}>
          <h3>Size {size}</h3>
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            {iconTypes.map((iconType) => (
              <div key={iconType} style={{ textAlign: "center" }}>
                <AppIcon size={size as IconSize} type={iconType} />
                <div style={{ marginTop: "8px" }}>{iconType}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
};
