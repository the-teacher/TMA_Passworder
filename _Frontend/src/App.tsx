import "react";
import { HolyGrailLayoutWithParams } from "./components/HolyGrailLayout";

const App = () => {
  return (
    <HolyGrailLayoutWithParams
      header={<h1>Header Content</h1>}
      leftSidebar={
        <>
          <h2>Left Sidebar</h2>
          <p>Navigation menu could be here</p>
        </>
      }
      content={
        <>
          <h2>Main Content</h2>
          <p>This is the main content area of the Holy Grail Layout</p>
        </>
      }
      rightSidebar={
        <>
          <h2>Right Sidebar</h2>
          <p>Additional information could be here</p>
        </>
      }
      footer={<p>Footer Content © 2024</p>}
    />
  );
};

export default App;
