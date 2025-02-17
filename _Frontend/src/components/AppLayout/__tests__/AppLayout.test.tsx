import { render, screen } from "@testing-library/react";
import AppLayout from "@components/AppLayout";
import { BrowserRouter } from "react-router";

// Mock Header, FooterNavigation, and HolyGrailLayoutWithParams components
jest.mock("@components/Header", () => () => <div>Mock Header</div>);
jest.mock("@components/FooterNavigation", () => () => <div>Mock Footer</div>);
jest.mock("@components/HolyGrailLayout", () => ({
  HolyGrailLayoutWithParams: ({ header, content, footer }: any) => (
    <div>
      {header}
      {content}
      {footer}
    </div>
  )
}));

describe("AppLayout", () => {
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
});
