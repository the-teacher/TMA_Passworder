import type { Meta, StoryObj } from "@storybook/react";
import HolyGrailLayout, {
  Header,
  Footer,
  AsideLeft,
  AsideRight,
  MainContent,
  MainColumns,
  HolyGrailLayoutWithParams
} from "./";

const meta: Meta<typeof HolyGrailLayout> = {
  title: "Layouts/HolyGrailLayout",
  component: HolyGrailLayout,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen"
  }
};

export default meta;
type Story = StoryObj<typeof HolyGrailLayout>;

// Component Composition approach
export const Default: Story = {
  render: () => (
    <div
      className="layout__body"
      style={{ width: "100%", height: "100%", border: "1px solid red" }}
    >
      <div id="root">
        <HolyGrailLayout>
          <Header>
            <h1>Header</h1>
          </Header>
          <MainColumns>
            <AsideLeft>
              <h2>Left Sidebar</h2>
              <p>Navigation links could go here</p>
            </AsideLeft>
            <MainContent>
              <h2>Main Content</h2>
              <p>This is the main content area of the layout.</p>
            </MainContent>
            <AsideRight>
              <h2>Right Sidebar</h2>
              <p>Additional information could go here</p>
            </AsideRight>
          </MainColumns>
          <Footer>
            <p>Footer content</p>
          </Footer>
        </HolyGrailLayout>
      </div>
    </div>
  )
};

// Props-based approach
export const WithParams: Story = {
  render: () => (
    <HolyGrailLayoutWithParams
      header={<h1>Header</h1>}
      leftSidebar={
        <>
          <h2>Left Sidebar</h2>
          <p>Navigation links could go here</p>
        </>
      }
      content={
        <>
          <h2>Main Content</h2>
          <p>This is the main content area of the layout.</p>
        </>
      }
      rightSidebar={
        <>
          <h2>Right Sidebar</h2>
          <p>Additional information could go here</p>
        </>
      }
      footer={<p>Footer content</p>}
    />
  )
};

// Without sidebars
export const NoSidebars: Story = {
  render: () => (
    <HolyGrailLayoutWithParams
      header={<h1>Header</h1>}
      content={
        <>
          <h2>Main Content Only</h2>
          <p>A simpler layout without sidebars</p>
        </>
      }
      footer={<p>Footer content</p>}
    />
  )
};

// Mobile view
export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: "mobile1"
    }
  },
  render: () => (
    <HolyGrailLayout>
      <Header>
        <h1>Header</h1>
      </Header>
      <MainColumns>
        <AsideLeft>
          <h2>Left Sidebar</h2>
          <p>Will stack on mobile</p>
        </AsideLeft>
        <MainContent>
          <h2>Main Content</h2>
          <p>Mobile-friendly layout</p>
        </MainContent>
        <AsideRight>
          <h2>Right Sidebar</h2>
          <p>Will stack on mobile</p>
        </AsideRight>
      </MainColumns>
      <Footer>
        <p>Footer content</p>
      </Footer>
    </HolyGrailLayout>
  )
};
