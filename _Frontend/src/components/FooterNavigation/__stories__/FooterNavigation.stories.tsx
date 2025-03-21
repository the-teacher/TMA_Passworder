import type { Meta, StoryObj } from "@storybook/react";
import { BrowserRouter } from "react-router";
import FooterNavigation from "@components/FooterNavigation";

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
    docs: { disable: true }
  }
};

export default meta;
type Story = StoryObj<typeof FooterNavigation>;

export const Default: Story = {};
