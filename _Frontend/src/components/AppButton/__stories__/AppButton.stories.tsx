import type { Meta, StoryObj } from "@storybook/react";
import AppButton from "../AppButton";
import { IconType } from "@components/AppIcon";

const meta: Meta<typeof AppButton> = {
  title: "3-Components/5-AppButton",
  component: AppButton,
  parameters: {
    viewport: {
      defaultViewport: "tablet"
    }
  },
  argTypes: {
    variant: {
      control: { type: "select" },
      options: [
        "primary",
        "secondary",
        "success",
        "warning",
        "danger",
        "info",
        "icon"
      ]
    },
    size: {
      control: { type: "select" },
      options: ["small", "medium", "large", "jumbo"]
    },
    icon: {
      control: { type: "select" },
      options: [
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
      ]
    },
    iconParams: {
      control: "object"
    },
    title: {
      control: "text"
    },
    alt: {
      control: "text"
    },
    disabled: {
      control: { type: "boolean" }
    }
  }
};

export default meta;
type Story = StoryObj<typeof AppButton>;

// Mock translation function
const mockT = (key: string) => `Translated: ${key}`;

export const Default: Story = {
  args: {
    icon: "home",
    variant: "primary",
    size: "medium",
    title: "Home Button",
    alt: "Home",
    disabled: false
  }
};

export const WithIconParams: Story = {
  args: {
    icon: "home",
    iconParams: {
      iconSize: 24,
      alt: "Custom Icon Alt"
    },
    title: "Button with Custom Icon Params",
    variant: "primary"
  }
};

export const WithTranslation: Story = {
  args: {
    translationKey: "button.submit",
    t: mockT,
    variant: "primary",
    icon: "clipboard-check"
  }
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
      <AppButton icon="home" variant="primary" title="Primary" alt="Primary" />
      <AppButton
        icon="home"
        variant="secondary"
        title="Secondary"
        alt="Secondary"
      />
      <AppButton icon="home" variant="success" title="Success" alt="Success" />
      <AppButton icon="home" variant="warning" title="Warning" alt="Warning" />
      <AppButton icon="home" variant="danger" title="Danger" alt="Danger" />
      <AppButton icon="home" variant="info" title="Info" alt="Info" />
      <AppButton icon="home" variant="icon" title="Icon" alt="Icon" />
    </div>
  )
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
      <AppButton icon="home" size="small" title="Small" alt="Small" />
      <AppButton icon="home" size="medium" title="Medium" alt="Medium" />
      <AppButton icon="home" size="large" title="Large" alt="Large" />
      <AppButton icon="home" size="jumbo" title="Jumbo" alt="Jumbo" />
    </div>
  )
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

    return (
      <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
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
    );
  }
};

export const CustomIconProps: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "16px" }}>
      <AppButton
        icon="home"
        iconParams={{
          iconSize: 24,
          className: "custom-icon-class",
          style: { opacity: 0.7 }
        }}
        title="Custom Icon Props"
        alt="Custom Icon"
        variant="primary"
      />
    </div>
  )
};

export const InteractiveStates: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <div>
        <h3>Normal</h3>
        <div style={{ display: "flex", gap: "16px" }}>
          <AppButton icon="home" title="Normal Button" alt="Normal" />
        </div>
      </div>

      <div>
        <h3>Disabled</h3>
        <div style={{ display: "flex", gap: "16px" }}>
          <AppButton
            icon="home"
            disabled
            title="Disabled Button"
            alt="Disabled"
          />
        </div>
      </div>

      <div>
        <h3>With onClick handler</h3>
        <div style={{ display: "flex", gap: "16px" }}>
          <AppButton
            icon="home"
            onClick={() => alert("Button clicked!")}
            title="Click me"
            alt="Clickable"
          />
        </div>
      </div>
    </div>
  )
};

export const OverridingIconType: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <div>
        <h3>Default icon</h3>
        <AppButton icon="home" title="Home icon" alt="Home" />
      </div>

      <div>
        <h3>Override with iconParams.iconType</h3>
        <AppButton
          icon="home"
          iconParams={{ iconType: "search" }}
          title="Search icon (overridden)"
          alt="Search"
        />
      </div>
    </div>
  )
};

export const AccessibilityExamples: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <div>
        <h3>With title</h3>
        <AppButton icon="home" title="Home Button" alt="Home" />
      </div>

      <div>
        <h3>With aria-label</h3>
        <AppButton icon="home" aria-label="Navigate to home page" />
      </div>

      <div>
        <h3>With aria-labelledby</h3>
        <div>
          <span id="button-label">Settings Button</span>
          <AppButton icon="settings" aria-labelledby="button-label" />
        </div>
      </div>
    </div>
  )
};
