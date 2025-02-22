import type { Meta, StoryObj } from "@storybook/react";
import SearchField from "@components/SearchField";
import "@ui-kit/form-inputs.scss";
import "@ui-kit/form-groups.scss";

const meta: Meta<typeof SearchField> = {
  title: "3-Components/SearchField",
  component: SearchField,
  parameters: {
    docs: { disable: true },
    viewport: {
      defaultViewport: "tablet"
    }
  }
};

export default meta;
type Story = StoryObj<typeof SearchField>;

export const Default: Story = {
  args: {
    onSearch: (query: string) => console.log("Search query:", query),
    placeholder: "Search passwords..."
  }
};

export const WithCustomDebounce: Story = {
  args: {
    onSearch: (query: string) => console.log("Search query:", query),
    placeholder: "Search with 1s debounce...",
    debounceMs: 1000
  }
};
