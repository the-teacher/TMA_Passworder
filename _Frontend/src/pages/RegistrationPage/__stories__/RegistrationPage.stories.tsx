import type { Meta, StoryObj } from "@storybook/react";
import { BrowserRouter } from "react-router";
import { I18nextProvider } from "react-i18next";
import i18n from "@i18n/index";
import RegistrationPage from "../RegistrationPage";

const meta: Meta<typeof RegistrationPage> = {
  title: "Pages/RegistrationPage",
  component: RegistrationPage,
  parameters: {
    layout: "fullscreen"
  },
  decorators: [
    (Story) => (
      <BrowserRouter>
        <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
          <Story />
        </div>
      </BrowserRouter>
    )
  ]
};

export default meta;
type Story = StoryObj<typeof RegistrationPage>;

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
