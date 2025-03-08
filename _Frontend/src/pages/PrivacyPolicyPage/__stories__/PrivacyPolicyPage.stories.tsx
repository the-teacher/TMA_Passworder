import type { Meta, StoryObj } from "@storybook/react";
import { I18nextProvider } from "react-i18next";
import i18n from "@i18n/index";
import PrivacyPolicyPage from "../PrivacyPolicyPage";

const meta: Meta<typeof PrivacyPolicyPage> = {
  title: "Pages/PrivacyPolicyPage",
  component: PrivacyPolicyPage,
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
type Story = StoryObj<typeof PrivacyPolicyPage>;

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
