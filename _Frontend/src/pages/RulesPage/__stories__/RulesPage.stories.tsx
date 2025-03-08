import type { Meta, StoryObj } from "@storybook/react";
import { I18nextProvider } from "react-i18next";
import i18n from "@i18n/index";
import RulesPage from "../RulesPage";

// Метаданные для Storybook
const meta: Meta<typeof RulesPage> = {
  title: "Pages/RulesPage",
  component: RulesPage,
  parameters: {
    layout: "fullscreen"
  },
  decorators: [
    (Story) => (
      <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
        <Story />
      </div>
    )
  ]
};

export default meta;
type Story = StoryObj<typeof RulesPage>;

// История для английской версии
export const English: Story = {
  decorators: [
    (Story) => {
      i18n.changeLanguage("en");
      return (
        <I18nextProvider i18n={i18n}>
          <Story />
        </I18nextProvider>
      );
    }
  ]
};

// История для русской версии
export const Russian: Story = {
  decorators: [
    (Story) => {
      i18n.changeLanguage("ru");
      return (
        <I18nextProvider i18n={i18n}>
          <Story />
        </I18nextProvider>
      );
    }
  ]
};
