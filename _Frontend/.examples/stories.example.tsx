// ui-kit/__stories__/InfoBlocks.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import "@ui-kit/info-blocks.scss";

const meta: Meta = {
  title: "4-UI-Kit/InfoBlocks",
  // component: "div",
  parameters: {
    docs: { disable: true }
  }
};

export default meta;
type Story = StoryObj;

// All info blocks story
export const AllInfoBlocks: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        padding: "16px"
      }}
    >
      <div className="info">Plain Info Block</div>
      <div className="info info--primary">Primary Info Block</div>
      <div className="info info--secondary">Secondary Info Block</div>
      <div className="info info--success">Success Info Block</div>
      <div className="info info--warning">Warning Info Block</div>
      <div className="info info--danger">Danger Info Block</div>
      <div className="info info--light">Light Info Block</div>
      <div className="info info--dark">Dark Info Block</div>
    </div>
  )
};


// ui-kit/__stories__/TextStyles.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import "@ui-kit/text-styles.scss";

const meta: Meta = {
  title: "4-UI-Kit/TextStyles",
  // component: "p",
  parameters: {
    docs: { disable: true }
  }
};

export default meta;
type Story = StoryObj;

// All text styles story
export const AllTextStyles: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        padding: "16px"
      }}
    >
      <h3>Colors:</h3>
      <p className="info text text--primary">Primary Text</p>
      <p className="info text text--secondary">Secondary Text</p>
      <p className="info text text--success">Success Text</p>
      <p className="info text text--warning">Warning Text</p>
      <p className="info text text--danger">Danger Text</p>
      <p className="info text text--info">Info Text</p>
      <p className="info info--dark text text--light">Light Text</p>
      <p className="info text text--dark">Dark Text</p>

      <h3>Sizes:</h3>
      <p className="info text text--primary text--small">Small Primary Text</p>
      <p className="info text text--secondary text--medium">
        Medium Secondary Text
      </p>
      <p className="info text text--success text--large">Large Success Text</p>

      <h3>Combinations:</h3>
      <h4>Small Text:</h4>
      <p className="info text text--primary text--small">
        Small Primary Text: In a world where technology is constantly evolving,
        staying updated with the latest trends is crucial for success.
      </p>
      <p className="info text text--secondary text--small">
        Small Secondary Text: The quick brown fox jumps over the lazy dog.
      </p>
      <p className="info text text--success text--small">
        Small Success Text: Success is not the key to happiness.
      </p>
      <p className="info text text--warning text--small">
        Small Warning Text: Warning! This action cannot be undone.
      </p>
      <p className="info text text--danger text--small">
        Small Danger Text: Please proceed with caution.
      </p>
      <p className="info text text--info text--small">
        Small Info Text: Ensure that you have saved all necessary data.
      </p>
      <p className="info text text--dark text--small">
        Small Light Text: Light text on a dark background.
      </p>
      <p className="info text text--dark text--small">
        Small Dark Text: Dark text on a light background.
      </p>

      <h4>Medium Text:</h4>
      <p className="info text text--primary text--medium">
        Medium Primary Text: In a world where technology is constantly evolving,
        staying updated with the latest trends is crucial for success.
      </p>
      <p className="info text text--secondary text--medium">
        Medium Secondary Text: The quick brown fox jumps over the lazy dog.
      </p>
      <p className="info text text--success text--medium">
        Medium Success Text: Success is not the key to happiness.
      </p>
      <p className="info text text--warning text--medium">
        Medium Warning Text: Warning! This action cannot be undone.
      </p>
      <p className="info text text--danger text--medium">
        Medium Danger Text: Please proceed with caution.
      </p>
      <p className="info text text--info text--medium">
        Medium Info Text: Ensure that you have saved all necessary data.
      </p>
      <p className="info info--dark text text--light text--medium">
        Medium Light Text: Light text on a dark background.
      </p>
      <p className="info text text--dark text--medium">
        Medium Dark Text: Dark text on a light background.
      </p>

      <h4>Large Text:</h4>
      <p className="info text text--primary text--large">
        Large Primary Text: In a world where technology is constantly evolving,
        staying updated with the latest trends is crucial for success.
      </p>
      <p className="info text text--secondary text--large">
        Large Secondary Text: The quick brown fox jumps over the lazy dog.
      </p>
      <p className="info text text--success text--large">
        Large Success Text: Success is not the key to happiness.
      </p>
      <p className="info text text--warning text--large">
        Large Warning Text: Warning! This action cannot be undone.
      </p>
      <p className="info text text--danger text--large">
        Large Danger Text: Please proceed with caution.
      </p>
      <p className="info text text--info text--large">
        Large Info Text: Ensure that you have saved all necessary data.
      </p>
      <p className="info info--dark text text--light text--large">
        Large Light Text: Light text on a dark background.
      </p>
      <p className="info text text--dark text--large">
        Large Dark Text: Dark text on a light background.
      </p>
    </div>
  )
};


// ui-kit/__stories__/FormInputs.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import "@ui-kit/form-inputs.scss";
import "@ui-kit/spaces.scss";
import AppIcon from "@components/AppIcon";

const meta: Meta = {
  title: "4-UI-Kit/FormInputs",
  // component: "input",
  parameters: {
    docs: { disable: true }
  }
};

export default meta;
type Story = StoryObj;

// All form inputs story
export const AllFormInputs: Story = {
  render: () => (
    <div className="p16">
      <div className="mb32">
        <h3>Text Input</h3>
        <div className="mb16">
          <h4>Default</h4>
          <input className="form-input" placeholder="Default Input" />
        </div>
        <div className="mb16">
          <h4>Error</h4>
          <input
            className="form-input form-input--error"
            placeholder="Error Input"
          />
        </div>
        <div className="mb16">
          <h4>Success</h4>
          <input
            className="form-input form-input--success"
            placeholder="Success Input"
          />
        </div>
        <div className="mb16">
          <h4>Disabled</h4>
          <input className="form-input" placeholder="Disabled Input" disabled />
        </div>
      </div>

      <div className="mb32">
        <h3>Select Input</h3>
        <div className="mb16">
          <h4>Default</h4>
          <select className="form-select">
            <option value="">Select an option</option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
        </div>
        <div className="mb16">
          <h4>Error</h4>
          <select className="form-select form-input--error">
            <option value="">Select an option</option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
        </div>
        <div className="mb16">
          <h4>Success</h4>
          <select className="form-select form-input--success">
            <option value="">Select an option</option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
        </div>
        <div className="mb16">
          <h4>Disabled</h4>
          <select className="form-select" disabled>
            <option value="">Select an option</option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
        </div>
      </div>

      <div className="mb32">
        <h3>Textarea Input</h3>
        <div className="mb16">
          <h4>Default</h4>
          <textarea
            className="form-textarea"
            placeholder="Enter text here"
            rows={4}
          />
        </div>
        <div className="mb16">
          <h4>Error</h4>
          <textarea
            className="form-textarea form-input--error"
            placeholder="Error Textarea"
            rows={4}
          />
        </div>
        <div className="mb16">
          <h4>Success</h4>
          <textarea
            className="form-textarea form-input--success"
            placeholder="Success Textarea"
            rows={4}
          />
        </div>
        <div className="mb16">
          <h4>Disabled</h4>
          <textarea
            className="form-textarea"
            placeholder="Disabled Textarea"
            rows={4}
            disabled
          />
        </div>
      </div>

      <div className="mb32">
        <h3>Search Input</h3>
        <div className="mb16">
          <h4>Default Search</h4>
          <input
            className="form-input form-input__search"
            placeholder="Search..."
          />
        </div>
        <div className="mb16">
          <h4>Error Search</h4>
          <input
            className="form-input form-input__search form-input--error"
            placeholder="Error Search Input"
          />
        </div>
        <div className="mb16">
          <h4>Success Search</h4>
          <input
            className="form-input form-input__search form-input--success"
            placeholder="Success Search Input"
          />
        </div>
        <div className="mb16">
          <h4>Disabled Search</h4>
          <input
            className="form-input form-input__search"
            placeholder="Disabled Search Input"
            disabled
          />
        </div>
      </div>
    </div>
  )
};

// Form input with icon story
export const FormInputWithIcon: Story = {
  render: () => (
    <div className="p16">
      <div className="form-group mb24">
        <label className="form-group--label text--dark" htmlFor="icon-input">
          Input with Icon
        </label>
        <div className="form-group--input form-group__with-icon">
          <input
            className="form-input"
            id="icon-input"
            type="text"
            placeholder="Enter text"
          />
          <div className="form-group--icon">
            <AppIcon size={24} type="search" alt="search" />
          </div>
        </div>
      </div>

      <div className="form-group mb24">
        <label className="form-group--label text--dark" htmlFor="icon-input">
          Input with Icon
        </label>
        <div className="form-group--input form-group__with-icon">
          <div className="form-group--icon">
            <AppIcon size={24} type="search" alt="search" />
          </div>
          <input
            className="form-input"
            id="icon-input"
            type="text"
            placeholder="Enter text"
          />
        </div>
      </div>

      <div className="form-group mb24">
        <label className="form-group--label text--dark" htmlFor="icon-input">
          Input with Icon
        </label>
        <div className="form-group--input form-group__with-icon">
          <div className="form-group--icon">
            <AppIcon size={24} type="search" alt="search" />
          </div>
          <div className="form-group--icon">
            <AppIcon size={24} type="search" alt="search" />
          </div>
          <input
            className="form-input"
            id="icon-input"
            type="text"
            placeholder="Enter text"
          />
          <div className="form-group--icon">
            <AppIcon size={24} type="search" alt="search" />
          </div>
        </div>
      </div>
    </div>
  )
};


// ui-kit/__stories__/FormGroups.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import "@ui-kit/form-groups.scss";
import "@ui-kit/form-inputs.scss";
import "@ui-kit/text-styles.scss"; // Assuming text styles are defined here
import AppIcon from "@components/AppIcon"; // Import AppIcon

const meta: Meta = {
  title: "4-UI-Kit/FormGroups",
  // component: "div",
  parameters: {
    docs: { disable: true }
  }
};

export default meta;
type Story = StoryObj;

// Form group story
export const FormGroupExample: Story = {
  render: () => (
    <div style={{ padding: "16px", maxWidth: "400px" }}>
      <div className="form-group">
        <label className="form-group--label text--dark" htmlFor="username">
          Username
          <AppIcon size={16} type="eye" alt="eye" />
        </label>
        <div className="form-group--input form-group__with-icon">
          <input
            className="form-input"
            id="username"
            type="text"
            placeholder="Enter your username"
          />
          <div className="form-group--icon">
            <AppIcon size={24} type="search" alt="search" />
          </div>
        </div>
        <div className="form-group--info text--info text--small">
          <AppIcon size={12} type="refresh" alt="refresh" /> Please enter a
          unique username.
        </div>
      </div>

      <div className="form-group">
        <label className="form-group--label text--dark" htmlFor="email">
          <AppIcon size={16} type="search" alt="search" /> Email
        </label>
        <div className="form-group--input form-group__with-icon">
          <input
            className="form-input"
            id="email"
            type="email"
            placeholder="Enter your email"
          />
          <div className="form-group--icon">
            <AppIcon size={24} type="search" alt="search" />
          </div>
        </div>
        <div className="form-group--info text--danger text--small">
          Please enter a valid email address.
        </div>
      </div>

      <div className="form-group">
        <label className="form-group--label text--dark" htmlFor="password">
          <AppIcon size={16} type="eye-off" alt="eye-off" /> Password
        </label>
        <div className="form-group--input form-group__with-icon">
          <input
            className="form-input"
            id="password"
            type="password"
            placeholder="Enter your password"
          />
          <div className="form-group--icon">
            <AppIcon size={24} type="search" alt="search" />
          </div>
        </div>
        <div className="form-group--info text--success text--small">
          Your password is strong.
        </div>
      </div>
    </div>
  )
};


// ui-kit/__stories__/Buttons.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import "@ui-kit/buttons.scss";

const meta: Meta = {
  title: "4-UI-Kit/Buttons",
  // component: "button",
  parameters: {
    docs: { disable: true }
  }
};

export default meta;
type Story = StoryObj;

// All buttons story
export const AllButtons: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "16px",
        padding: "16px"
      }}
    >
      <button className="btn btn--primary">Primary Button</button>
      <button className="btn btn--secondary">Secondary Button</button>
      <button className="btn btn--success">Success Button</button>
      <button className="btn btn--warning">Warning Button</button>
      <button className="btn btn--danger">Danger Button</button>
      <button className="btn btn--info">Info Button</button>
      <button className="btn" disabled>
        Disabled Button
      </button>
      <button className="btn btn--small">Small Button</button>
      <button className="btn btn--medium">Medium Button</button>
      <button className="btn btn--large">Large Button</button>
      <button className="btn btn--icon">
        <img src="/icons/eye.svg" alt="Icon" />
      </button>
      <button className="btn btn--icon-text">
        <img src="/icons/clipboard-check.svg" alt="Icon" />
        <span>Text</span>
      </button>
    </div>
  )
};


// ui-kit/__stories__/ClosableInfoBlocks.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import "@ui-kit/info-blocks.scss";

const meta: Meta = {
  title: "4-UI-Kit/InfoBlocks",
  // component: "div",
  parameters: {
    docs: { disable: true }
  }
};

export default meta;
type Story = StoryObj;

// Closable info blocks story
export const ClosableInfoBlocks: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        padding: "16px"
      }}
    >
      <div className="info info--primary info--closable">
        Primary Info Block
        <button className="info__close" aria-label="Close">
          &times;
        </button>
      </div>
      <div className="info info--secondary info--closable">
        Secondary Info Block
        <button className="info__close" aria-label="Close">
          &times;
        </button>
      </div>
      <div className="info info--success info--closable">
        Success Info Block
        <button className="info__close" aria-label="Close">
          &times;
        </button>
      </div>
      <div className="info info--warning info--closable">
        Warning Info Block
        <button className="info__close" aria-label="Close">
          &times;
        </button>
      </div>
      <div className="info info--danger info--closable">
        Danger Info Block
        <button className="info__close" aria-label="Close">
          &times;
        </button>
      </div>
      <div className="info info--light info--closable">
        Light Info Block
        <button className="info__close" aria-label="Close">
          &times;
        </button>
      </div>
      <div className="info info--dark info--closable">
        Dark Info Block
        <button className="info__close" aria-label="Close">
          &times;
        </button>
      </div>

      <div className="info info--light info--closable">
        {/* Add a long text to see if the close button is still visible */}
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
        <button className="info__close" aria-label="Close">
          &times;
        </button>
      </div>
    </div>
  )
};


// components/HolyGrailLayout/__stories__/HolyGrailLayout.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import HolyGrailLayout, {
  Header,
  Footer,
  AsideLeft,
  AsideRight,
  MainContent,
  MainColumns
} from "..";
import "./stories.scss";

const meta: Meta<typeof HolyGrailLayout> = {
  title: "1-Layouts/1-HolyGrailLayout",
  component: HolyGrailLayout,
  parameters: {
    docs: { disable: true }
  }
};

export default meta;
type Story = StoryObj<typeof HolyGrailLayout>;

// Basic layout without sidebars
export const Default: Story = {
  render: () => (
    <HolyGrailLayout layoutRoot="#storybook-root">
      <Header>
        <h1 className="holy-grail--text">Header</h1>
      </Header>
      <MainColumns>
        <MainContent>
          <h2 className="holy-grail--text">Main Content</h2>
          <p className="holy-grail--text">Basic layout without sidebars</p>
        </MainContent>
      </MainColumns>
      <Footer>
        <p className="holy-grail--text">Footer content</p>
      </Footer>
    </HolyGrailLayout>
  )
};

// Layout with left sidebar
export const WithLeftSidebar: Story = {
  render: () => (
    <HolyGrailLayout layoutRoot="#storybook-root">
      <Header>
        <h1 className="holy-grail--text">Header</h1>
      </Header>
      <MainColumns>
        <AsideLeft>
          <h2 className="holy-grail--text">Left Sidebar</h2>
          <p className="holy-grail--text">Navigation menu</p>
        </AsideLeft>
        <MainContent>
          <h2 className="holy-grail--text">Main Content</h2>
          <p className="holy-grail--text">Layout with left sidebar</p>
        </MainContent>
      </MainColumns>
      <Footer>
        <p className="holy-grail--text">Footer content</p>
      </Footer>
    </HolyGrailLayout>
  )
};

// Layout with right sidebar
export const WithRightSidebar: Story = {
  render: () => (
    <HolyGrailLayout layoutRoot="#storybook-root">
      <Header>
        <h1 className="holy-grail--text">Header</h1>
      </Header>
      <MainColumns>
        <MainContent>
          <h2 className="holy-grail--text">Main Content</h2>
          <p className="holy-grail--text">Layout with right sidebar</p>
        </MainContent>
        <AsideRight>
          <h2 className="holy-grail--text">Right Sidebar</h2>
          <p className="holy-grail--text">Additional info</p>
        </AsideRight>
      </MainColumns>
      <Footer>
        <p className="holy-grail--text">Footer content</p>
      </Footer>
    </HolyGrailLayout>
  )
};

// Layout with both sidebars
export const WithBothSidebars: Story = {
  render: () => (
    <HolyGrailLayout layoutRoot="#storybook-root">
      <Header>
        <h1 className="holy-grail--text">Header</h1>
      </Header>
      <MainColumns>
        <AsideLeft>
          <h2 className="holy-grail--text">Left Sidebar</h2>
          <p className="holy-grail--text">Navigation menu</p>
        </AsideLeft>
        <MainContent>
          <h2 className="holy-grail--text">Main Content</h2>
          <p className="holy-grail--text">Layout with both sidebars</p>
        </MainContent>
        <AsideRight>
          <h2 className="holy-grail--text">Right Sidebar</h2>
          <p className="holy-grail--text">Additional info</p>
        </AsideRight>
      </MainColumns>
      <Footer>
        <p className="holy-grail--text">Footer content</p>
      </Footer>
    </HolyGrailLayout>
  )
};


// components/HolyGrailLayout/__stories__/HolyGrailLayoutWithParams.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { HolyGrailLayoutWithParams } from "@components/HolyGrailLayout";
import "./stories.scss";

const meta: Meta<typeof HolyGrailLayoutWithParams> = {
  title: "1-Layouts/2-HolyGrailLayoutWithParams",
  component: HolyGrailLayoutWithParams,
  parameters: {
    docs: { disable: true }
  }
};

export default meta;
type Story = StoryObj<typeof HolyGrailLayoutWithParams>;

// Basic layout without sidebars
export const Default: Story = {
  render: () => (
    <HolyGrailLayoutWithParams
      layoutRoot="#storybook-root"
      header={<h1 className="holy-grail--text">Header</h1>}
      content={
        <>
          <h2 className="holy-grail--text">Main Content</h2>
          <p className="holy-grail--text">Basic layout without sidebars</p>
        </>
      }
      footer={<p className="holy-grail--text">Footer content</p>}
    />
  )
};

// Layout with left sidebar
export const WithLeftSidebar: Story = {
  render: () => (
    <HolyGrailLayoutWithParams
      layoutRoot="#storybook-root"
      header={<h1 className="holy-grail--text">Header</h1>}
      leftSidebar={
        <>
          <h2 className="holy-grail--text">Left Sidebar</h2>
          <p className="holy-grail--text">Navigation menu</p>
        </>
      }
      content={
        <>
          <h2 className="holy-grail--text">Main Content</h2>
          <p className="holy-grail--text">Layout with left sidebar</p>
        </>
      }
      footer={<p className="holy-grail--text">Footer content</p>}
    />
  )
};

// Layout with right sidebar
export const WithRightSidebar: Story = {
  render: () => (
    <HolyGrailLayoutWithParams
      layoutRoot="#storybook-root"
      header={<h1 className="holy-grail--text">Header</h1>}
      content={
        <>
          <h2 className="holy-grail--text">Main Content</h2>
          <p className="holy-grail--text">Layout with right sidebar</p>
        </>
      }
      rightSidebar={
        <>
          <h2 className="holy-grail--text">Right Sidebar</h2>
          <p className="holy-grail--text">Additional info</p>
        </>
      }
      footer={<p className="holy-grail--text">Footer content</p>}
    />
  )
};

// Layout with both sidebars
export const WithBothSidebars: Story = {
  render: () => (
    <HolyGrailLayoutWithParams
      layoutRoot="#storybook-root"
      header={<h1 className="holy-grail--text">Header</h1>}
      leftSidebar={
        <>
          <h2 className="holy-grail--text">Left Sidebar</h2>
          <p className="holy-grail--text">Navigation menu</p>
        </>
      }
      content={
        <>
          <h2 className="holy-grail--text">Main Content</h2>
          <p className="holy-grail--text">Layout with both sidebars</p>
        </>
      }
      rightSidebar={
        <>
          <h2 className="holy-grail--text">Right Sidebar</h2>
          <p className="holy-grail--text">Additional info</p>
        </>
      }
      footer={<p className="holy-grail--text">Footer content</p>}
    />
  )
};


// components/AppModal/__stories__/AppModal.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { useAppModal } from "@components/AppModal/hooks/useAppModal";
import "@ui-kit/form-inputs.scss";
import "@ui-kit/buttons.scss";
import "@ui-kit/form-groups.scss";
import "@ui-kit/info-blocks.scss";
import "@ui-kit/spaces.scss";
import React, { useState } from "react";
import i18n from "@story/i18next";

const meta: Meta = {
  title: "3-Components/6-AppModal",
  parameters: {
    docs: { disable: true }
  }
};

export default meta;
type Story = StoryObj;

// Basic Modal Example with English locale
const BasicExample = () => {
  const { open, modal } = useAppModal({
    title: "Basic Modal",
    children: (
      <div>
        <p>This is a basic modal with some content.</p>
        <p>Click outside, press ESC, or click the X to close.</p>
      </div>
    )
  });

  return (
    <div>
      <button className="btn btn--primary" onClick={open}>
        Open Basic Modal
      </button>
      {modal}
    </div>
  );
};

export const English: Story = {
  render: () => <BasicExample />,
  play: async () => {
    await i18n.changeLanguage("en");
  }
};

// Basic Modal Example with Russian locale
const RussianExample = () => {
  const { open, modal } = useAppModal({
    title: "Базовое модальное окно",
    children: (
      <div>
        <p>Это базовое модальное окно с контентом.</p>
        <p>Нажмите снаружи, нажмите ESC или нажмите X, чтобы закрыть.</p>
      </div>
    )
  });

  return (
    <div>
      <button className="btn btn--primary" onClick={open}>
        Открыть модальное окно
      </button>
      {modal}
    </div>
  );
};

export const Russian: Story = {
  render: () => <RussianExample />,
  play: async () => {
    await i18n.changeLanguage("ru");
  }
};

// Different Sizes Example
const SizesExample = () => {
  const smallModal = useAppModal({
    title: "Small Modal",
    size: "small",
    children: ({ close }) => (
      <div>
        <p>This is a small modal with minimal content.</p>
        <button className="btn btn--secondary mt16" onClick={close}>
          Close Modal
        </button>
      </div>
    )
  });

  const mediumModal = useAppModal({
    title: "Medium Modal",
    size: "medium",
    children: ({ close }) => (
      <div>
        <p>
          This is a medium modal (default size) with a moderate amount of
          content. It's suitable for most use cases.
        </p>
        <button className="btn btn--secondary mt16" onClick={close}>
          Close Modal
        </button>
      </div>
    )
  });

  const largeModal = useAppModal({
    title: "Large Modal",
    size: "large",
    children: ({ close }) => (
      <div>
        <p>This is a large modal suitable for complex content.</p>
        <p>
          It can accommodate more content and is useful for forms, tables, or
          other complex UI elements that need more space.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <button className="btn btn--secondary mt16" onClick={close}>
          Close Modal
        </button>
      </div>
    )
  });

  return (
    <div style={{ display: "flex", gap: "16px" }}>
      <button className="btn btn--primary" onClick={smallModal.open}>
        Small Modal
      </button>
      <button className="btn btn--primary" onClick={mediumModal.open}>
        Medium Modal
      </button>
      <button className="btn btn--primary" onClick={largeModal.open}>
        Large Modal
      </button>
      {smallModal.modal}
      {mediumModal.modal}
      {largeModal.modal}
    </div>
  );
};

export const Sizes: Story = {
  render: () => <SizesExample />
};

// Form Component
const ModalForm = ({ onClose }: { onClose: () => void }) => (
  <form className="form-group">
    <div className="form-group">
      <label className="form-group--label" htmlFor="name">
        Name
      </label>
      <input
        className="form-input"
        id="name"
        type="text"
        placeholder="Enter your name"
      />
    </div>
    <div className="form-group">
      <label className="form-group--label" htmlFor="email">
        Email
      </label>
      <input
        className="form-input"
        id="email"
        type="email"
        placeholder="Enter your email"
      />
    </div>
    <div className="form-group">
      <label className="form-group--label" htmlFor="message">
        Message
      </label>
      <textarea
        className="form-textarea"
        id="message"
        rows={4}
        placeholder="Enter your message"
      />
    </div>
    <div className="form-group--actions">
      <button type="button" className="btn btn--secondary" onClick={onClose}>
        Cancel
      </button>
      <button type="submit" className="btn btn--primary">
        Submit
      </button>
    </div>
  </form>
);

// Form Example
const FormExample = () => {
  const { open, modal } = useAppModal({
    title: "Form Example",
    size: "medium",
    children: ({ close }) => <ModalForm onClose={close} />
  });

  return (
    <div>
      <button className="btn btn--primary" onClick={open}>
        Open Form Modal
      </button>
      {modal}
    </div>
  );
};

export const WithForm: Story = {
  render: () => <FormExample />
};

// Long Content Example
const LongContentExample = () => {
  const { open, modal } = useAppModal({
    title: "Scrollable Content",
    size: "medium",
    children: (
      <div>
        {Array.from({ length: 20 }, (_, i) => (
          <p key={i}>
            This is paragraph {i + 1} demonstrating scrollable content in the
            modal. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        ))}
      </div>
    )
  });

  return (
    <div>
      <button className="btn btn--primary" onClick={open}>
        Open Scrollable Modal
      </button>
      {modal}
    </div>
  );
};

export const ScrollableContent: Story = {
  render: () => <LongContentExample />
};

// Custom Container Example
const CustomContainerExample = () => {
  const containerRef = React.useRef<HTMLDivElement>(null);

  const { open, modal } = useAppModal({
    title: "Custom Container Modal",
    size: "medium",
    containerElement: containerRef.current ?? undefined,
    children: ({ close }) => (
      <div>
        <p>This modal is rendered in a custom container.</p>
        <p>Check the DOM to see that it's not in the default root.</p>
        <button className="btn btn--secondary mt16" onClick={close}>
          Close Modal
        </button>
      </div>
    )
  });

  return (
    <div>
      <div className="info info--primary mb16">
        <p>The modal will be rendered inside this custom container:</p>
      </div>

      <div
        ref={containerRef}
        className="info info--secondary mb16"
        style={{ minHeight: "200px" }}
      >
        <p>Custom Modal Container</p>
      </div>

      <button className="btn btn--primary" onClick={open}>
        Open Modal in Custom Container
      </button>
      {modal}
    </div>
  );
};

export const CustomContainer: Story = {
  render: () => <CustomContainerExample />
};

// Custom ID Example
const CustomIdExample = () => {
  const { open: openFirst, modal: firstModal } = useAppModal({
    title: "First Modal",
    containerId: "first-modal-root",
    children: ({ close }) => (
      <div>
        <p>This modal is rendered in container with ID: first-modal-root</p>
        <button className="btn btn--secondary mt16" onClick={close}>
          Close Modal
        </button>
      </div>
    )
  });

  const { open: openSecond, modal: secondModal } = useAppModal({
    title: "Second Modal",
    containerId: "second-modal-root",
    children: ({ close }) => (
      <div>
        <p>This modal is rendered in container with ID: second-modal-root</p>
        <button className="btn btn--secondary mt16" onClick={close}>
          Close Modal
        </button>
      </div>
    )
  });

  return (
    <div>
      <div className="info info--primary mb16">
        <p>
          These modals will be rendered in different containers with custom IDs.
          Check the DOM to see the different root elements.
        </p>
      </div>

      <div style={{ display: "flex", gap: "16px" }}>
        <button className="btn btn--primary" onClick={openFirst}>
          Open First Modal
        </button>
        <button className="btn btn--primary" onClick={openSecond}>
          Open Second Modal
        </button>
      </div>
      {firstModal}
      {secondModal}
    </div>
  );
};

export const CustomIds: Story = {
  render: () => <CustomIdExample />
};

// Multiple Containers Example
const MultipleContainersExample = () => {
  // Default container
  const defaultModal = useAppModal({
    title: "Default Container Modal",
    children: ({ close }) => (
      <div>
        <p>This modal uses the default app-modal-root container</p>
        <button className="btn btn--secondary mt16" onClick={close}>
          Close Modal
        </button>
      </div>
    )
  });

  // Custom ID container
  const customIdModal = useAppModal({
    title: "Custom ID Modal",
    containerId: "custom-modal-root",
    children: ({ close }) => (
      <div>
        <p>This modal uses a container with ID: custom-modal-root</p>
        <button className="btn btn--secondary mt16" onClick={close}>
          Close Modal
        </button>
      </div>
    )
  });

  // Custom element container
  const containerRef = React.useRef<HTMLDivElement>(null);
  const customElementModal = useAppModal({
    title: "Custom Element Modal",
    containerElement: containerRef.current ?? undefined,
    children: ({ close }) => (
      <div>
        <p>This modal is rendered in the custom element container below</p>
        <button className="btn btn--secondary mt16" onClick={close}>
          Close Modal
        </button>
      </div>
    )
  });

  return (
    <div>
      <div className="info info--primary mb16">
        <p>This example demonstrates all three container options:</p>
        <ul>
          <li>Default container (app-modal-root)</li>
          <li>Custom ID container (custom-modal-root)</li>
          <li>Custom element container (ref-based)</li>
        </ul>
      </div>

      <div
        ref={containerRef}
        className="info info--secondary mb16"
        style={{ minHeight: "100px" }}
      >
        <p>Custom Element Container</p>
      </div>

      <div style={{ display: "flex", gap: "16px" }}>
        <button className="btn btn--primary" onClick={defaultModal.open}>
          Default Container
        </button>
        <button className="btn btn--primary" onClick={customIdModal.open}>
          Custom ID Container
        </button>
        <button className="btn btn--primary" onClick={customElementModal.open}>
          Custom Element Container
        </button>
      </div>

      {defaultModal.modal}
      {customIdModal.modal}
      {customElementModal.modal}
    </div>
  );
};

export const MultipleContainers: Story = {
  render: () => <MultipleContainersExample />
};

// Alert Example
const AlertExample = () => {
  const { open, modal } = useAppModal({
    title: "Alert",
    size: "small",
    children: ({ close }) => (
      <div className="text-center">
        <p>This is an alert message!</p>
        <button className="btn btn--primary mt16" onClick={close}>
          OK
        </button>
      </div>
    )
  });

  return (
    <div>
      <button className="btn btn--primary" onClick={open}>
        Show Alert
      </button>
      {modal}
    </div>
  );
};

export const Alert: Story = {
  render: () => <AlertExample />
};

// Confirm Example
const ConfirmExample = () => {
  const { open, close, modal } = useAppModal({
    title: "Confirm Action",
    size: "small",
    children: ({ close }) => (
      <div>
        <p>Are you sure you want to perform this action?</p>
        <div className="form-group--actions mt16">
          <button className="btn btn--secondary" onClick={close}>
            Cancel
          </button>
          <button
            className="btn btn--primary"
            onClick={() => {
              console.log("Action confirmed!");
              close();
            }}
          >
            Confirm
          </button>
        </div>
      </div>
    )
  });

  return (
    <div>
      <button className="btn btn--primary" onClick={open}>
        Show Confirm
      </button>
      {modal}
    </div>
  );
};

export const Confirm: Story = {
  render: () => <ConfirmExample />
};

// Reusable Alert/Confirm Hooks Example
const useAlert = (message: string) => {
  return useAppModal({
    title: "Alert",
    size: "small",
    children: ({ close }) => (
      <div className="text-center">
        <p>{message}</p>
        <button className="btn btn--primary mt16" onClick={close}>
          OK
        </button>
      </div>
    )
  });
};

const useConfirm = (message: string, onConfirm: () => void) => {
  return useAppModal({
    title: "Confirm",
    size: "small",
    children: ({ close }) => (
      <div>
        <p>{message}</p>
        <div className="form-group--actions mt16">
          <button className="btn btn--secondary" onClick={close}>
            Cancel
          </button>
          <button
            className="btn btn--primary"
            onClick={() => {
              onConfirm();
              close();
            }}
          >
            Confirm
          </button>
        </div>
      </div>
    )
  });
};

// Reusable Hooks Usage Example
const ReusableDialogsExample = () => {
  const alert = useAlert("This is a reusable alert message!");
  const confirm = useConfirm("Are you sure?", () => {
    console.log("Action confirmed!");
    // Show alert after confirmation
    alert.open();
  });

  return (
    <div style={{ display: "flex", gap: "16px" }}>
      <button className="btn btn--primary" onClick={alert.open}>
        Show Alert
      </button>
      <button className="btn btn--primary" onClick={confirm.open}>
        Show Confirm
      </button>
      {alert.modal}
      {confirm.modal}
    </div>
  );
};

export const ReusableDialogs: Story = {
  render: () => <ReusableDialogsExample />
};

// Async Confirm Example
const AsyncConfirmModal = ({
  onConfirm,
  onCancel
}: {
  onConfirm: () => void;
  onCancel: () => void;
}) => {
  const { open, modal } = useAppModal({
    title: "Confirm Action",
    size: "small",
    children: ({ close }) => (
      <div>
        <p>Are you sure you want to proceed?</p>
        <div className="form-group--actions mt16">
          <button
            className="btn btn--secondary"
            onClick={() => {
              onCancel();
              close();
            }}
          >
            Cancel
          </button>
          <button
            className="btn btn--primary"
            onClick={() => {
              onConfirm();
              close();
            }}
          >
            Confirm
          </button>
        </div>
      </div>
    )
  });

  React.useEffect(() => {
    open();
  }, [open]);

  return modal;
};

const AsyncConfirmExample = () => {
  const [result, setResult] = useState<string>("");
  const [isConfirming, setIsConfirming] = useState(false);

  const handleConfirm = () => {
    setResult("Action was confirmed!");
    setIsConfirming(false);
  };

  const handleCancel = () => {
    setResult("Action was cancelled.");
    setIsConfirming(false);
  };

  return (
    <div>
      <button
        className="btn btn--primary"
        onClick={() => setIsConfirming(true)}
      >
        Show Async Confirm
      </button>
      {isConfirming && (
        <AsyncConfirmModal onConfirm={handleConfirm} onCancel={handleCancel} />
      )}
      {result && <p className="info info--primary mt16">Result: {result}</p>}
    </div>
  );
};

export const AsyncConfirm: Story = {
  render: () => <AsyncConfirmExample />
};


// components/LoadingFallback/__stories__/LoadingFallback.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import LoadingFallback from "@components/LoadingFallback";

const meta: Meta<typeof LoadingFallback> = {
  title: "3-Components/LoadingFallback",
  component: LoadingFallback,
  parameters: {
    docs: { disable: true }
  }
};

export default meta;
type Story = StoryObj<typeof LoadingFallback>;

// Default loading state
export const Default: Story = {};

// With background color
export const WithBackground: Story = {
  decorators: [
    (Story) => (
      <div style={{ backgroundColor: "#f5f5f5", height: "100vh" }}>
        <Story />
      </div>
    )
  ]
};


// components/FooterNavigation/__stories__/FooterNavigation.stories.tsx
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


// components/AppIcon/__stories__/AppIcon.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import AppIcon, { IconSize, IconType } from "@components/AppIcon";
import "@ui-kit/spaces.scss";

const meta: Meta<typeof AppIcon> = {
  title: "3-Components/4-AppIcon",
  component: AppIcon,
  parameters: {
    docs: { disable: true },
    viewport: {
      defaultViewport: "tablet"
    }
  }
};

export default meta;
type Story = StoryObj<typeof AppIcon>;

const iconTypes: IconType[] = [
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

// Default story for AppIcon with all sizes
export const Default: Story = {
  render: () => (
    <div
      className="m16"
      style={{ display: "flex", flexDirection: "column", gap: "32px" }}
    >
      {[12, 16, 20, 24, 28, 32].map((size) => (
        <div key={size}>
          <h3>Size {size}</h3>
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            {iconTypes.map((iconType) => (
              <div key={iconType} style={{ textAlign: "center" }}>
                <AppIcon
                  size={size as IconSize}
                  type={iconType}
                  alt={iconType}
                />
                <div style={{ marginTop: "8px" }}>{iconType}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
};


// components/SearchField/__stories__/SearchField.stories.tsx
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


// components/PasswordEntry/CreateForm/__stories__/CreatePasswordEntryForm.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import {
  withRouter,
  reactRouterParameters
} from "storybook-addon-remix-react-router";
import CreatePasswordEntryForm from "@components/PasswordEntry/CreateForm";
import i18n from "@story/i18next";
import { within } from "@storybook/testing-library";
import userEvent from "@testing-library/user-event";
import type { CreatePasswordEntryFormData } from "../types";

const meta: Meta<typeof CreatePasswordEntryForm> = {
  title: "3-Components/3-CreatePasswordEntryForm",
  component: CreatePasswordEntryForm,
  decorators: [withRouter],
  parameters: {
    docs: { disable: true },
    viewport: {
      defaultViewport: "mobile"
    },
    reactRouter: reactRouterParameters({
      location: {
        path: "/password-entry"
      },
      routing: {
        path: "/password-entry"
      }
    })
  }
};

export default meta;
type Story = StoryObj<typeof CreatePasswordEntryForm>;

// Basic version with default functionality
export const Default: Story = {
  args: {
    onSubmit: (data: CreatePasswordEntryFormData) => {
      console.log("Form submitted with data:", data);
    }
  },
  play: async () => {
    await i18n.changeLanguage("en");
  }
};

// Pre-filled version
export const PreFilled: Story = {
  args: {
    onSubmit: (data: CreatePasswordEntryFormData) => {
      console.log("Form submitted with data:", data);
    }
  },
  play: async ({ canvasElement }) => {
    await i18n.changeLanguage("en");
    const canvas = within(canvasElement);

    await userEvent.type(canvas.getByLabelText(/service name/i), "GitHub");
    await userEvent.type(canvas.getByLabelText(/username/i), "johndoe");
    await userEvent.type(canvas.getByLabelText(/password/i), "SecurePass123!");
    await userEvent.type(
      canvas.getByLabelText(/service url/i),
      "https://github.com"
    );
    await userEvent.type(canvas.getByLabelText(/notes/i), "Work account");
  }
};

// With validation errors
export const WithValidationErrors: Story = {
  args: {
    onSubmit: (data: CreatePasswordEntryFormData) => {
      console.log("Form submitted with data:", data);
    }
  },
  play: async ({ canvasElement }) => {
    await i18n.changeLanguage("en");
    const canvas = within(canvasElement);

    // Try to submit empty form to trigger validation
    const submitButton = canvas.getByRole("button", { name: /save/i });
    await userEvent.click(submitButton);
  }
};

// Russian version
export const Russian: Story = {
  args: {
    onSubmit: (data: CreatePasswordEntryFormData) => {
      console.log("Form submitted with data:", data);
    }
  },
  play: async () => {
    await i18n.changeLanguage("ru");
  }
};


// components/PasswordEntry/Item/__stories__/PasswordEntry.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { BrowserRouter } from "react-router";
import PasswordEntry from "@components/PasswordEntry/Item";

const meta = {
  title: "3-Components/2-PasswordEntry",
  component: PasswordEntry,
  parameters: {
    viewport: {
      defaultViewport: "mobile"
    }
  },
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    )
  ]
} satisfies Meta<typeof PasswordEntry>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: "entry-1",
    name: "Password Entry 1"
  }
};

export const LongName: Story = {
  args: {
    id: "entry-2",
    name: "Very Long Password Entry Name That Should Still Look Good in the UI"
  }
};


// components/PasswordEntry/List/__stories__/PasswordEntryList.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { BrowserRouter } from "react-router";
import PasswordEntryList from "@components/PasswordEntry/List";

const meta = {
  title: "3-Components/1-PasswordEntryList",
  component: PasswordEntryList,
  parameters: {
    viewport: {
      defaultViewport: "mobile"
    }
  },
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    )
  ]
} satisfies Meta<typeof PasswordEntryList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};


// components/Header/__stories__/Header.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { BrowserRouter } from "react-router";
import Header from "../";

const meta: Meta<typeof Header> = {
  title: "2-Core/1-Header",
  component: Header,
  parameters: {
    docs: { disable: true }
  },
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    )
  ]
};

export default meta;
type Story = StoryObj<typeof Header>;

// Basic version with title only
export const Default: Story = {};

// Version with additional content
export const WithContent: Story = {
  args: {
    children: (
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <button>Button 1</button>
        <button>Button 2</button>
        <span>Text</span>
      </div>
    )
  }
};


// lib/Toastr/__stories__/Toastr.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import toastr from "@lib/Toastr";
import "@ui-kit/info-blocks.scss";
import "@ui-kit/spaces.scss";
// Add custom styles for demo
import "../toastr.scss";
import "./toastr.stories.scss";

const meta = {
  title: "3-Components/5-Toastr",
  parameters: {
    docs: { disable: true },
    viewport: {
      defaultViewport: "tablet"
    }
  }
} satisfies Meta;

export default meta;
type Story = StoryObj;

// Basic usage
export const Default: Story = {
  render: () => (
    <div className="p16">
      <h3>Basic Toasts</h3>
      <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
        <button
          className="btn btn--primary"
          onClick={() => toastr.info("Info message")}
        >
          Show Info
        </button>
        <button
          className="btn btn--success"
          onClick={() => toastr.success("Success message")}
        >
          Show Success
        </button>
        <button
          className="btn btn--warning"
          onClick={() => toastr.warning("Warning message")}
        >
          Show Warning
        </button>
        <button
          className="btn btn--danger"
          onClick={() => toastr.danger("Danger message")}
        >
          Show Danger
        </button>
      </div>

      <h3>Custom Options</h3>
      <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
        <button
          className="btn btn--primary"
          onClick={() =>
            toastr.show("Non-closable toast", "primary", { closable: false })
          }
        >
          Non-closable
        </button>
        <button
          className="btn btn--primary"
          onClick={() =>
            toastr.show("Long duration toast", "primary", { duration: 5000 })
          }
        >
          5s Duration
        </button>
        <button
          className="btn btn--primary"
          onClick={() =>
            toastr.show("Persistent toast", "primary", { duration: 0 })
          }
        >
          Persistent
        </button>
      </div>

      <h3>Multiple Toasts</h3>
      <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
        <button
          className="btn btn--primary"
          onClick={() => {
            toastr.info("First message");
            toastr.success("Second message");
            toastr.warning("Third message");
          }}
        >
          Show Multiple
        </button>
        <button className="btn btn--danger" onClick={() => toastr.clear()}>
          Clear All
        </button>
      </div>

      <h3>Custom Container</h3>
      <div
        id="custom-container"
        style={{
          position: "relative",
          border: "1px dashed #ccc",
          padding: "16px",
          marginBottom: "16px"
        }}
      >
        <div className="mb20">
          <button
            className="btn btn--primary"
            onClick={() => {
              toastr.initialize("#custom-container");
              toastr.info("Toast in custom container");
            }}
          >
            Show in Container
          </button>
        </div>
      </div>
    </div>
  )
};


