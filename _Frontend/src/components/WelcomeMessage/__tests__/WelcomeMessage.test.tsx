import { render, screen } from "@testing-library/react";
import WelcomeMessage from "../WelcomeMessage";
import WelcomeMessageView from "../WelcomeMessageView";
import { TestWrapper } from "@test/testUtils";

// Mock WelcomeMessageView component
jest.mock("../WelcomeMessageView", () => ({
  __esModule: true,
  default: jest.fn(() => <div>Mocked WelcomeMessageView</div>)
}));

describe("WelcomeMessage", () => {
  const mockOnConfirm = jest.fn();
  const mockOnDecline = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders WelcomeMessageView with correct props", () => {
    render(
      <WelcomeMessage onConfirm={mockOnConfirm} onDecline={mockOnDecline} />,
      { wrapper: TestWrapper }
    );

    expect(WelcomeMessageView).toHaveBeenCalledWith(
      {
        onConfirm: mockOnConfirm,
        onDecline: mockOnDecline
      },
      expect.anything()
    );
    expect(screen.getByText("Mocked WelcomeMessageView")).toBeInTheDocument();
  });
});
