import { render, screen } from "@testing-library/react";
import AppLayout from "@components/AppLayout";
import { BrowserRouter } from "react-router";
import { useNotifications } from "../hooks/useNotifications";

// Mock hooks
jest.mock("../hooks/useNotifications");

// Mock components
jest.mock("@components/Header", () => () => <div>Mock Header</div>);
jest.mock("@components/FooterNavigation", () => () => <div>Mock Footer</div>);
jest.mock("@components/HolyGrailLayout", () => ({
  HolyGrailLayoutWithParams: ({
    header,
    content,
    footer
  }: {
    header: React.ReactNode;
    content: React.ReactNode;
    footer: React.ReactNode;
  }) => (
    <div>
      {header}
      {content}
      {footer}
    </div>
  )
}));

describe("AppLayout", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderWithRouter = (children: React.ReactNode) => {
    return render(
      <BrowserRouter>
        <AppLayout>{children}</AppLayout>
      </BrowserRouter>
    );
  };

  it("renders header, content, and footer", () => {
    const content = "Main Content";
    renderWithRouter(<div>{content}</div>);

    expect(screen.getByText("Mock Header")).toBeInTheDocument();
    expect(screen.getByText(content)).toBeInTheDocument();
    expect(screen.getByText("Mock Footer")).toBeInTheDocument();
  });

  it("initializes notifications", () => {
    renderWithRouter(<div>Content</div>);

    expect(useNotifications).toHaveBeenCalledTimes(1);
  });
});
