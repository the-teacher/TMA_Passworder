# HolyGrailLayout Component

This component implements the Holy Grail Layout using React. It is broken down into subcomponents to allow for easy customization and insertion of content.

## Usage

```jsx
import React from "react";
import ReactDOM from "react-dom";
import HolyGrailLayout, {
  Header,
  Footer,
  AsideLeft,
  AsideRight,
  MainContent,
  MainColumns,
} from "./HolyGrailLayout.jsx";

ReactDOM.render(
  <HolyGrailLayout>
    <Header>Header Content</Header>
    <MainColumns>
      <AsideLeft>Sidebar</AsideLeft>
      <MainContent>Main Content</MainContent>
      <AsideRight>Sidebar</AsideRight>
    </MainColumns>
    <Footer>Footer Content</Footer>
  </HolyGrailLayout>,
  document.getElementById("root")
);
```

## Components

- `HolyGrailLayout`: The main layout component.
- `Header`: The header component.
- `Footer`: The footer component.
- `AsideLeft`: The left sidebar component.
- `AsideRight`: The right sidebar component.
- `MainContent`: The main content component.
- `MainColumns`: The main columns container component.

Each component accepts `children` as props to allow for the insertion of custom content.
