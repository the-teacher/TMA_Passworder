import type { Meta, StoryObj } from "@storybook/react";
import { BrowserRouter } from "react-router";
import FooterNavigation from "./FooterNavigation";

const meta: Meta<typeof FooterNavigation> = {
  title: "Components/FooterNavigation",
  component: FooterNavigation,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    )
  ],
  parameters: {
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
    viewport: {
      defaultViewport: "mobile1"
    }
  }
};
