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
    layout: "fullscreen"
  }
};

export default meta;
type Story = StoryObj<typeof FooterNavigation>;

export const Default: Story = {};
