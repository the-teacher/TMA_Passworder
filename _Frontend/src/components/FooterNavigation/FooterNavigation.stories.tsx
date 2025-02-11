import type { Meta, StoryObj } from "@storybook/react";
import { BrowserRouter } from "react-router";
import FooterNavigation from "./FooterNavigation";

const meta: Meta<typeof FooterNavigation> = {
  title: "2-Core/2-FooterNavigation",
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
