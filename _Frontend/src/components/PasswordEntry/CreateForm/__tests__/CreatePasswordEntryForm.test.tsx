import { render, screen } from "@testing-library/react";
import CreatePasswordEntryForm from "../CreatePasswordEntryForm";
import { TestWrapper } from "@test/testUtils";

describe("CreatePasswordEntryForm", () => {
  const renderComponent = () => {
    return render(<CreatePasswordEntryForm />, {
      wrapper: TestWrapper
    });
  };

  it("should render the form with correct title", () => {
    renderComponent();

    const title = screen.getByRole("heading", { level: 2 });
    expect(title).toHaveTextContent("Create Password Entry");
  });
});
