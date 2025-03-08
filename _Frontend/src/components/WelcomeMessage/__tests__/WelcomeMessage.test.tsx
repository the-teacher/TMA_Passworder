import { render, screen, fireEvent } from "@testing-library/react";
import WelcomeMessage from "../WelcomeMessage";
import { TestWrapper } from "@test/testUtils";

// Mock WelcomeMessageView component
jest.mock("../WelcomeMessageView", () => ({
  __esModule: true,
  default: ({
    onAccept,
    onDecline
  }: {
    onAccept: () => void;
    onDecline: () => void;
  }) => (
    <div data-testid="welcome-message-view">
      <button onClick={onAccept} data-testid="accept-button">
        Accept
      </button>
      <button onClick={onDecline} data-testid="decline-button">
        Decline
      </button>
    </div>
  )
}));

describe("WelcomeMessage", () => {
  const setUserAccepted = jest.fn();
  const setUserDeclined = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders WelcomeMessageView component", () => {
    render(
      <WelcomeMessage
        setUserAccepted={setUserAccepted}
        setUserDeclined={setUserDeclined}
      />,
      { wrapper: TestWrapper }
    );

    expect(screen.getByTestId("welcome-message-view")).toBeInTheDocument();
  });

  it("calls setUserAccepted when accept button is clicked", () => {
    render(
      <WelcomeMessage
        setUserAccepted={setUserAccepted}
        setUserDeclined={setUserDeclined}
      />,
      { wrapper: TestWrapper }
    );

    const acceptButton = screen.getByTestId("accept-button");
    fireEvent.click(acceptButton);

    expect(setUserAccepted).toHaveBeenCalledWith(true);
    expect(setUserDeclined).not.toHaveBeenCalled();
  });

  it("calls setUserDeclined when decline button is clicked", () => {
    render(
      <WelcomeMessage
        setUserAccepted={setUserAccepted}
        setUserDeclined={setUserDeclined}
      />,
      { wrapper: TestWrapper }
    );

    const declineButton = screen.getByTestId("decline-button");
    fireEvent.click(declineButton);

    expect(setUserDeclined).toHaveBeenCalledWith(true);
    expect(setUserAccepted).not.toHaveBeenCalled();
  });
});
