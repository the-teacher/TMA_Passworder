import "react";

import {
  HolyGrailLayout,
  Header,
  MainColumns,
  AsideLeft,
  MainContent,
  AsideRight,
  Footer,
} from "./components/HolyGrailLayout/HolyGrailLayout.tsx";

const App = () => {
  return (
    <HolyGrailLayout>
      <Header>
        <h1>Header Content</h1>
      </Header>

      <MainColumns>
        <AsideLeft>
          <h2>Left Sidebar</h2>
          <p>Navigation menu could be here</p>
        </AsideLeft>

        <MainContent>
          <h2>Main Content</h2>
          <p>This is the main content area of the Holy Grail Layout</p>
        </MainContent>

        <AsideRight>
          <h2>Right Sidebar</h2>
          <p>Additional information could be here</p>
        </AsideRight>
      </MainColumns>

      <Footer>
        <p>Footer Content © 2024</p>
      </Footer>
    </HolyGrailLayout>
  );
};

export default App;
