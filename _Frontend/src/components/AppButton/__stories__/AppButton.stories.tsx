import type { Meta, StoryObj } from "@storybook/react";
import AppButton from "../AppButton";
import { IconType, IconSize } from "@components/AppIcon";
import "@ui-kit/margins.scss";
import "@ui-kit/colors.scss";

const meta: Meta<typeof AppButton> = {
  title: "3-Components/5-AppButton",
  component: AppButton,
  parameters: {
    viewport: {
      defaultViewport: "tablet"
    }
  }
};

export default meta;
type Story = StoryObj<typeof AppButton>;

export const Default: Story = {
  args: {
    icon: "home",
    variant: "default",
    size: "medium",
    title: "Home Button",
    alt: "Home",
    disabled: false
  }
};

export const IconVariations: Story = {
  render: () => {
    const icons: IconType[] = [
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

    const iconSizes = [12, 16, 20, 24, 32];

    const variants = [
      "primary",
      "secondary",
      "success",
      "warning",
      "danger",
      "info"
    ] as const;

    return (
      <div>
        <h3 className="mb16">Icons of Different Types</h3>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "16px",
            marginBottom: "32px"
          }}
        >
          {icons.map((iconType) => (
            <AppButton
              key={iconType}
              icon={iconType}
              variant="icon"
              title={iconType}
              alt={iconType}
            />
          ))}
        </div>

        <h3 className="mb16">Icons of Different Sizes</h3>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "16px",
            marginBottom: "32px"
          }}
        >
          {iconSizes.map((size) => (
            <AppButton
              key={`size-${size}`}
              icon="home"
              variant="icon"
              iconParams={{ iconSize: size as IconSize }}
              title={`Size ${size}px`}
              alt={`Icon size ${size}px`}
            />
          ))}
        </div>

        <h3 className="mb16">Icons with Different Colors (Button Variants)</h3>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "16px",
            marginBottom: "32px"
          }}
        >
          {variants.map((variant) => (
            <AppButton
              key={`variant-${variant}`}
              icon="home"
              variant={variant}
              title={variant}
              alt={`${variant} variant`}
            />
          ))}
        </div>

        <h3 className="mb16">Icons with Custom Colors</h3>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "16px",
            marginBottom: "32px"
          }}
        >
          <AppButton
            icon="home"
            variant="icon"
            iconParams={{
              style: {
                filter:
                  "invert(27%) sepia(51%) saturate(2878%) hue-rotate(346deg) brightness(104%) contrast(97%)"
              }
            }}
            title="Custom Red"
            alt="Custom red color"
          />
          <AppButton
            icon="home"
            variant="icon"
            iconParams={{
              style: {
                filter:
                  "invert(73%) sepia(61%) saturate(5752%) hue-rotate(122deg) brightness(95%) contrast(101%)"
              }
            }}
            title="Custom Green"
            alt="Custom green color"
          />
          <AppButton
            icon="home"
            variant="icon"
            iconParams={{
              style: {
                filter:
                  "invert(8%) sepia(100%) saturate(6481%) hue-rotate(246deg) brightness(102%) contrast(143%)"
              }
            }}
            title="Custom Blue"
            alt="Custom blue color"
          />
          <AppButton
            icon="home"
            variant="icon"
            iconParams={{
              style: {
                filter:
                  "invert(77%) sepia(72%) saturate(878%) hue-rotate(359deg) brightness(103%) contrast(104%)"
              }
            }}
            title="Custom Yellow"
            alt="Custom yellow color"
          />
          <AppButton
            icon="home"
            variant="icon"
            iconParams={{
              style: {
                filter:
                  "invert(10%) sepia(100%) saturate(5268%) hue-rotate(297deg) brightness(89%) contrast(112%)"
              }
            }}
            title="Custom Purple"
            alt="Custom purple color"
          />
        </div>

        <h3 className="mb16">Buttons of Different Sizes</h3>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "16px",
            marginBottom: "32px"
          }}
        >
          <AppButton
            size="small"
            variant="default"
            title="Small Button"
            alt="Small button"
            icon="home"
          />
          <AppButton
            size="medium"
            variant="default"
            title="Medium Button"
            alt="Medium button"
            icon="eye"
          />
          <AppButton
            size="large"
            variant="default"
            title="Large Button"
            alt="Large button"
            icon="star"
          />
          <AppButton
            size="jumbo"
            variant="default"
            title="Large Button"
            alt="Large button"
            icon="circle-plus"
            iconParams={{ iconSize: 32 }}
          />
        </div>
      </div>
    );
  }
};
