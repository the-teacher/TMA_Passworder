import type { Meta, StoryObj } from "@storybook/react";
import { BrowserRouter } from "react-router";
import FooterNavigation from "./FooterNavigation";

const meta: Meta<typeof FooterNavigation> = {
  title: "Components/FooterNavigation",
  component: FooterNavigation,
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    )
  ],
  parameters: {
    docs: { disable: true },
    layout: "fullscreen",
    viewport: {
      defaultViewport: "mobile1"
    }
  }
};

export default meta;
type Story = StoryObj<typeof FooterNavigation>;

export const Default: Story = {};

export const Mobile: Story = {
  parameters: {
    docs: { disable: true },
    viewport: {
      defaultViewport: "mobile1"
    }
  }
};
