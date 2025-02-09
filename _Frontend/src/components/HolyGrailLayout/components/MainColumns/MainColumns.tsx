import { type ReactNode } from "react";

type MainColumnsProps = {
  children: ReactNode;
};

const MainColumns = ({ children }: MainColumnsProps) => (
  <div className="holy-grail--main">
    <div className="holy-grail--container holy-grail--main-columns">
      {children}
    </div>
  </div>
);

export default MainColumns;
